import json
import pprint

with open("OW Notes.json") as ow:
    jsonow = json.load(ow)
    pprint.pprint(jsonow)
