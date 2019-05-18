import json

obj = json.loads(open("result.json").read())

for index,_ in enumerate(obj["courses"]):
    c = obj["courses"][index]["courseNumber"]
    print(c)
    subj, number = c.split("-")
    obj["courses"][index]["subject"] = subj
    obj["courses"][index]["number"] = number
    del obj["courses"][index]["courseNumber"]

print(json.dumps(obj))