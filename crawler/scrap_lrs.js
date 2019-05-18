'use strict';
const puppeteer = require('puppeteer');

(async () => {
  console.error("Started");
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://lrs.mcgill.ca');
  console.error("Opened Page");
  const terms = await page.evaluate(() => {
    let data = [];
    let terms = document.querySelectorAll("#DropDownListSemesterID > option");
    terms.forEach(term => {
      let value = term.value;
      let name = term.innerText;
      if(value.startsWith('2'))
        data.push({value, name});
    });
    return data;
  });
  console.error("Finish saving Terms");

  let data = [];
  for (let idx in terms) {
    term = terms[idx];
    await page.select('select#DropDownListSemesterID', term.value);
    await page.waitFor(2000);
    console.error("Navgated to Semeter Page");
    let result = await page.evaluate(({term}) => {
      let courses = document.querySelectorAll("#DataList1 > tbody > tr");
      let data = [];
      courses.forEach(course => {
        let spans = course.querySelectorAll("span");
        let courseNumber = spans[0].innerText;
        let courseName = spans[1].innerText; 
        let courseLink = course.getElementsByTagName("a")[0].href;
        data.push({courseNumber, courseName, courseLink, term: term.name});
      });
      return data;
    }, {term});
    data = data.concat(result);
  };

  console.log(JSON.stringify(data));
  await browser.close(); 
})();