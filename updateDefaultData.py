# https://pyinstaller.readthedocs.io/en/stable/
import base64
import json

with open("defaultData.json") as file:
    data = json.load(file)
    data = json.dumps(data)
    file.close()

data_bytes = data.encode("ascii")
encoded_bytes = base64.b64encode(data_bytes)
encoded_data = encoded_bytes.decode("ascii")

print(encoded_data)

with open("files/defaultData.txt", "w") as file:
    file.write(encoded_data)
    file.close()