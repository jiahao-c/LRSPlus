import json
import csv

obj = json.loads(open("result.json").read())

with open('average.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
    for row in spamreader:
        subject = row[2]
        number = row[3]
        term = row[5]
        for index,_ in enumerate(obj["courses"]):
            course = obj["courses"][index]
            if subject == course["subject"] and number == course["number"] \
            and term[0] == course["term"][5] and term[1:5] == course["term"][0:4]:
                avg = row[7]
                obj["courses"][index]["average"] = avg
                break

for index,_ in enumerate(obj["courses"]):
    course = obj["courses"][index]
    if "average" not in course:
        obj["courses"][index]["average"] = "Info Not Available"
    if course["prof"] == "":
        obj["courses"][index]["average"] = "Info Not Available"

print(json.dumps(obj))

        
