# Checks the integrity of teilnehmer.json and protokolle.json
# assumes to be called from the root directory:
# python3 ./scripts/integrity.py

import json
import ast
from datetime import datetime

DATE_FORMAT = "%Y-%m-%d"

def js_obj_to_py_dict(file_path, start_line, end_line):
    """Reads a JS object from a file and converts it into a Python dictionary."""
    js_data = ''
    with open(file_path, 'r', encoding='utf-8') as file:
        for i, line in enumerate(file, 1):
            if start_line <= i <= end_line:
                js_data += line
    py_data = js_data.replace("let semester_titles =", "").replace("\n", "").replace(";","")
    try:
        py_dict = ast.literal_eval(py_data)
        return py_dict
    except SyntaxError as e:
        print(f"Error converting JS object to Python dict: {e}")
        return {}



def is_valid_date(date_string):
    try:
        datetime.strptime(date_string, DATE_FORMAT)
        return True
    except ValueError:
        return False

def read_json_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data
    except FileNotFoundError:
        print("The file could not be found.")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e.msg}")
        print(f"Error is at line {e.lineno}, column {e.colno}")
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                error_line = lines[e.lineno - 1]  # Adjusting for zero-indexing
                print("Error line in JSON:", error_line.strip())
        except Exception as e:
            print("Additionally, there was an error showing the problem line: ", e)

        return None

def test_speakers_exist_in_participants(prot_data, teil_data, errors):
    teilnehmer_ids = set(map(int, teil_data.keys()))

    for protokoll in prot_data:
        for speaker in protokoll['speaker']:
            if speaker not in teilnehmer_ids:
                errors.append(f"Speaker ID {speaker} in protocol {protokoll['id']} not found in IDs of teilnehmer.json.")

def test_unique_protocol_ids(prot_data, errors):
    prot_id_counts = {}
    for prot in prot_data:
        prot_id = prot["id"]
        if prot_id in prot_id_counts:
            prot_id_counts[prot_id] += 1
        else:
            prot_id_counts[prot_id] = 1

    duplicate_ids = [id for id, count in prot_id_counts.items() if count > 1]
    if duplicate_ids:
        errors.append(f"Duplicate protocol IDs found: {', '.join(map(str, duplicate_ids))}")

def test_valid_speaker_protocol_ids(prot_data, teil_data, errors):
    prot_ids = [str(prot["id"]) for prot in prot_data]

    for speaker, data in teil_data.items():
        if 'ids_to_signatures' not in data:
            errors.append(f"missing ids_to_signature for speaker {speaker}")
        else:
            ids = list(map(int, data['ids_to_signatures'].keys()))
            if len(ids) != len(set(ids)):
                errors.append(f"Duplicate IDs found for speaker {speaker}.")

            for single_id in ids:
                if str(single_id) not in prot_ids:
                    errors.append(f"Invalid protocol ID {single_id} found for speaker {speaker}.")

def get_sns(prot_data, prot_ids):
    def get_sn(prot_data, prot_id):
        proto=  prot_data[int(prot_id)-1]
        assert prot_id != (proto["id"])
        return proto["sn"]
    return list(map(lambda x: get_sn(prot_data, x), prot_ids))

def test_valid_seminar_numbers(teil_data, prot_data, errors):
    semester_dict = js_obj_to_py_dict('./js/globalData.js', 2, 87)
    for teilnehmer_key, teilnehmer in teil_data.items():
        if "ids_to_signatures" in teilnehmer:

            if sorted(teilnehmer["sns"]) != teilnehmer["sns"]:
                errors.append(f"sns not sorted for teilnehmer {teilnehmer_key}: {teilnehmer['sns']}")
            if len(set(teilnehmer["sns"])) < len(teilnehmer["sns"]):
                errors.append(f"sns contains duplicate entries for teilnehmer {teilnehmer_key}: {teilnehmer['sns']}")
            sns = get_sns(prot_data, list(teilnehmer["ids_to_signatures"].keys()))
            if not set(sns) <= set(teilnehmer["sns"]):
                errors.append(
                    f"not enough seminar numbers for teilnehmer {teilnehmer_key} : {sns} versus {teilnehmer['sns']}")
            for sn in teilnehmer["sns"]:
                if str(sn) not in semester_dict:
                      errors.append(f"unknown seminar number for teilnehmer {teilnehmer_key}: {sn=}")

def test_dates(prot_data, errors):
    """
    Test that each protocol's date falls within the appropriate semester range.

    Each protocol in prot_data is expected to have a 'datum' (date), 'dok' (date ok) and 'sn' (semester number) field.
    """
    def get_start_and_end(semester_number):
        date_head = str(semester_number).split(".")[0]
        if str(semester_number).endswith(".0") or str(semester_number).endswith(".4"):
            return (datetime.strptime( date_head + "-04-01", DATE_FORMAT),
                    datetime.strptime( date_head + "-08-31", DATE_FORMAT))
        elif str(semester_number).endswith(".5") or str(semester_number).endswith(".9"):
            return (datetime.strptime( date_head + "-10-15", DATE_FORMAT),
                    datetime.strptime( str(int(date_head) + 1) + "-05-15", DATE_FORMAT))
        else:
            assert False, "semester_number should end in .0, .4, .5 or .9, but it is: " + str(semester_number)

    for protocol in prot_data:
        prot_date = protocol.get('datum')
        semester_number = protocol.get('sn')
        semester_start, semester_end = get_start_and_end(semester_number)
        if protocol.get('dok'):
            prot_date_parsed = datetime.strptime(prot_date, DATE_FORMAT)
            if not (semester_start <= prot_date_parsed <= semester_end):
                errors.append(f"Date {prot_date} for protocol {protocol['id']} does not fall within the semester range {semester_start} to {semester_end}.")

def test_structure_teilnehmer_dict(teil_data, errors):
    # check that teilnehmer has expected structure
    for teilnehmer_key, teilnehmer in teil_data.items():
        if not teilnehmer.keys() <= set(['name', 'ids_to_signatures', 'first', 'last', 'name_non_latin', 'pos', 'origin', 'birthplace', 'sources', 'sns']):
            errors.append(f"unexpected keys in teilnehmer nr {teilnehmer_key}: {teilnehmer}")
        if not set(['name', 'ids_to_signatures', 'first', 'last', 'sns']) <= teilnehmer.keys():
            errors.append(f"missing required key in teilnehmer nr {teilnehmer_key}: {teilnehmer}")
        for key, val in teilnehmer.items():
            if key in ['name', 'first', 'last', 'origin', 'name_non_latin']:
                if type(val) != str:
                    errors.append(f"unexpected type for teilnehmer {teilnehmer}: {val=}")
            elif key == 'ids_to_signatures':
                if type(val) != dict:
                    errors.append(f"ids_to_signatures not a list:{val}")
                for talk_key, talk_val in val.items():
                    if (type(talk_val) != str) or (type(talk_key) != str):
                        errors.append(f"unexpected type: {talk_val=} {talk_key=}")
            elif key == 'sources':
                if type(val)!= dict:
                    errors.append(f"unexpected type: {val=}")

def test_struture_protokolle_dict(prot_data, teil_data, errors):
    for prot in prot_data:
        id = prot["id"]
        band = prot["band"]
        datum = prot["datum"]
        datum_ok = prot["dok"]
        speaker = prot["speaker"]
        titel = prot["titel"]
        klein_titel = prot["ktitel"]

        if not (1 <= id <= 1204):
            errors.append(f"unexpected {id=}")
        if not (1 <= band <= 29):
            errors.append(f"unexpected {band=}")
        if datum_ok and not is_valid_date(datum):
            errors.append(f"invalid date in {id=}: {datum=}")
        for s in speaker:
            s = str(s)
            if s not in teil_data:
                errors.append(f"unkown speaker {s} in {id=}")
            else:
                teilnehmer = teil_data[s]
                if not str(id) in teilnehmer["ids_to_signatures"].keys():
                    errors.append(f"teilnehmer {s} in {id=} does not back-reference to prot")
                pass
        if not titel and not klein_titel:
            pass
            # errors.append(f"neither titel not klein_titel given in {id=}")

if __name__ == "__main__":
    prot_path = "./js/data/protokolle.json"
    teil_path = "./js/data/teilnehmer.json"

    prot_data = read_json_file(prot_path)
    teil_data = read_json_file(teil_path)
    errors = []

    # Check if the files were read successfully
    if prot_data is None:
        errors.append(f"Failed to read or parse {prot_path}.")
    if teil_data is None:
        errors.append(f"Failed to read or parse {teil_path}.")

    # Proceed with tests only if both files were read successfully
    if prot_data is not None and teil_data is not None:
        test_speakers_exist_in_participants(prot_data, teil_data, errors)
        test_unique_protocol_ids(prot_data, errors)
        test_valid_speaker_protocol_ids(prot_data, teil_data, errors)
        test_structure_teilnehmer_dict(teil_data, errors)
        test_struture_protokolle_dict(prot_data, teil_data, errors)
        test_valid_seminar_numbers(teil_data, prot_data, errors)
        test_dates(prot_data, errors)

    if errors:
       print("Errors found during tests:")
       for error in errors:
           print(error)
       exit(1)
    else:
       print("All tests passed successfully.")
