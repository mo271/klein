# Checks for dead links.
# Assumes to be called from the root directory:
# python3 ./scripts/dead_links.py

import json
import requests
import time

KNOWN_DEAD_LINKS = ['']

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

# Function to check URL


def is_url_reachable(url, max_retries=4, initial_delay=1):
    headers = {
        'User-Agent': 'curl/7.64.1'  # or another common user-agent
    }
    retries = 0
    while retries < max_retries:
        try:
            print(f'Checking {url} (Attempt {retries + 1}/{max_retries})...')
            response = requests.head(url, allow_redirects=True, headers=headers)

            if response.status_code >= 200 and response.status_code < 400:
                print('... success!')
                return True

        except requests.RequestException as e:
            print(f"Attempt {retries + 1} failed for URL {url}: {e}")

        retries += 1
        time.sleep(initial_delay * (2 ** retries))  # Exponential backoff

    print(f"Failed to reach {url} after {max_retries} attempts.")
    return False


if __name__ == "__main__":
    teil_path = "./js/data/teilnehmer.json"

    teil_data = read_json_file(teil_path)
    errors = []

    # Check if the files were read successfully
    if teil_data is None:
        errors.append(f"Failed to read or parse {teil_path}.")

    collect_links = []

    for key, _ in teil_data.items():
        if key in teil_data:
            teilnehmer = teil_data[key]
            for s in teilnehmer.get("sources", []):
                collect_links.append(teilnehmer["sources"][s])

    # Check each URL
    unreachable_urls = filter(
        lambda x: not is_url_reachable(x),  set(collect_links))

    if unreachable_urls:
        print("Some urls were not reachable:")
        for url in unreachable_urls:
            if url in KNOWN_DEAD_LINKS:
                print(f"known dead link {url}")
            else:
                errors.append(f"new dead link: {url}")

    if errors:
        print("Errors found during tests:")
        for error in errors:
            print(error)
        exit(1)
    else:
        print("All tests passed successfully.")
