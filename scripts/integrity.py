# Checks the integrity of teilnehmer.json and protokolle.json
# assumes to be called from the root directory:
# python3 ./scripts/integrity.py

import json

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
        ids = list(map(int, data['ids_to_signatures'].keys()))
        if len(ids) != len(set(ids)):
            errors.append(f"Duplicate IDs found for speaker {speaker}.")

        for single_id in ids:
            if str(single_id) not in prot_ids:
                errors.append(f"Invalid protocol ID {single_id} found for speaker {speaker}.")


def test_structure_teilnehmer_dict(teil_data, errors):
    # check that teilnehmer has expected structure
    for teilnehmer_key, teilnehmer in teil_data.items():
        if  not teilnehmer.keys() <= set(['name', 'ids_to_signatures', 'first', 'last', 'name_non_latin', 'origin', 'sources']):
            errors.append(f"unexpected keys in teilnehmer nr {teilnehmer_key}: {teilnehmer}")
        for key, val in teilnehmer.items():
            if key in ['name', 'first', 'last', 'origin', 'name_non_latin']:
                if type(val) != str:
                    errors.append(f"unexpected type: {val=}")
            elif key == 'ids_to_signatures':
                if type(val) != dict:
                    errors.append(f"ids_to_signaures not a list:{val}")
                for talk_key, talk_val in val.items():
                    if (type(talk_val) != str) or (type(talk_key) != str):
                        errors.append(f"unexpected type: {talk_val=} {talk_key=}")
            elif key == 'sources':
                if type(val)!= dict:
                    # TODO: check that links are not dead
                    errors.append(f"unexpected type: {val=}")

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

    if errors:
       print("Errors found during tests:")
       for error in errors:
           print(error)
       exit(1)
    else:
       print("All tests passed successfully.")
