import requests

url = "http://localhost:8001/parse"

files = {
    "file": open(
        "sample.pdf",
        "rb"
    )
}

response = requests.post(
    url,
    files=files
)

print(response.status_code)
print(response.json())