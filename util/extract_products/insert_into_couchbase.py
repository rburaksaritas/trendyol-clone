import requests
import json

# Define the function to send POST requests for each product
def send_post_requests(json_file_path):
    # Endpoint URL
    url = 'http://localhost:8080/products'

    # Headers for the POST request
    headers = {
        'accept': '*/*',
        'Content-Type': 'application/json'
    }

    # Load the JSON file with product data
    with open(json_file_path, 'r') as file:
        products = json.load(file)

    # Iterate over each product and send a POST request
    for product in products:
        response = requests.post(url, headers=headers, json=product)
        # Print the response for each request (optional)
        print(f"Product ID {product['id']}: {response.status_code} {response.reason}")


import os

def send_post_requests_for_all_json_files(folder_path):
    # Endpoint URL
    url = 'http://localhost:8080/products'

    # Headers for the POST request
    headers = {
        'accept': '*/*',
        'Content-Type': 'application/json'
    }

    # Iterate over all files in the given folder
    for file_name in os.listdir(folder_path):
        # Check if the file is a JSON file
        if file_name.endswith('kadin_mapped_products.json'):
            file_path = os.path.join(folder_path, file_name)

            send_post_requests(file_path)

# Example usage with a folder path
folder_path = './mapped'  # Replace with the actual folder path
send_post_requests_for_all_json_files(folder_path)

