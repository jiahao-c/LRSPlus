import requests
import json
from bs4 import BeautifulSoup

courses = json.loads(open("result.json", "r").read())["courses"]

for index,_ in enumerate(courses):
    course = courses[index]
    link = course["link"]
    session = requests.session()
    try:
        page = session.get(link)
        soup = BeautifulSoup(page.text, "lxml")
        name = soup.find("span", {"class": "instructorname"}).text
    except:
        name = ""
    course["prof"] = name
    print(name+" saved")

    open("output.json", "w").write(json.dumps({"courses": courses}))
