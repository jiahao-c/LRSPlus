'use strict';

/*get building from URL query string*/
let urlParams = new URLSearchParams(window.location.search);
let subj = urlParams.get('subject');
let num = urlParams.get('number');

let subjValid = false;
let numValid = false;

console.log(`subject is ${subj}`);
console.log(`number is ${num}`);

/* Selections */
let courses;
$.get("https://cdn.jsdelivr.net/gh/jhcccc/LRSPlus@master/result.json", function (data, status) {
    courses = data.courses;
    let subjects = {};
    $.each(courses, (_, course) => {
        subjects[course.subject] = course.subject;
    });
    let subjectSelect = $('#subjectSelect');
    $.each(subjects, (key, value) => {
        if (subj == key) { //check whether subj param present in data
            subjValid = true;
            console.log("subject param valid")
        }
        subjectSelect
            .append($('<option>', { value: key })
                .text(value));

    });
    //sort options alphabetically
    subjectSelect.html(subjectSelect.find('option').sort(function (x, y) {
        return $(x).text() > $(y).text() ? 1 : -1;
    }));
    if(subjValid) { //if subj param is not the selected option
        console.log("setting sbuject with param")
        subjectSelect.val(subj)
        flushNumbers();
    }
    else{
        console.log("adding default option")
        //Add default option
        subjectSelect
            .prepend('<option selected value="">Choose a subject</option>');
    }
        
});

$("#showall").click(() => {
    filter();
    $("#showall").remove();
});

$('#subjectSelect').change(() => {
    flushNumbers();
});

$('#numberSelect').change(() => {
    flushTerms();
});

$('#termSelect').change(() => {
    filter();
});

/* Filter */
function filter() {
    $('#courseList').empty();
    let subject = $('#subjectSelect').val();
    let number = $('#numberSelect').val();
    let term = $('#termSelect').val();
    console.log(`subject:${subject}`);
    console.log(`subject:${number}`);
    console.log(`subject:${term}`);

    $.each(courses, (_, course) => {
        if (compare(course.subject, subject) &&
            compare(course.number, number) &&
            compare(course.term, term)) {
            $('#courseList')
                .append($(`<div class="col-xl-4 col-lg-6 mt-3"> <div class="card">
            <div class="card-body"> <h5 class="card-title">${course.subject} ${course.number} - ${course.term}</h5>
            <p class="card-text"> <b>${course.name}</b><br> Instructor: ${course.prof} <br>
            Class Average: ${course.average} </p> <a href="${course.link}"
            class="btn btn-primary">Watch Recordings</a> </div> </div> </div>`));
        }
    });
}

function compare(tag, selectedTag) {
    if (selectedTag == tag || selectedTag == "" || selectedTag == null) { return true };
    return false;
}

function flushNumbers(){
    $('#numberSelect').empty();
    $('#termSelect').empty();
    let selectedSubject = $('#subjectSelect').val();
    let courseNumbers = {};
    $.each(courses, (_, course) => {
        if (course.subject == selectedSubject) {
            courseNumbers[course.number] = course.number;
        }
    });
    $.each(courseNumbers, (key, value) => {
        if (num == key) { //check whether subj param present in data
            numValid = true;
            console.log("number param valid")
        }
        $('#numberSelect')
            .append($('<option>', { value: key })
                .text(value));
    });
    if (numValid) {
        $('#numberSelect').val(num);
        flushTerms();
    }
    else {
        $('#numberSelect').prepend('<option selected value="">Choose a number</option>');
    }
    filter();
}

function flushTerms(){
    $('#termSelect').empty();
    $('#termSelect')
        .append($('<option>', { value: "" })
            .text("Choose a term"));
    let selectedSubject = $('#subjectSelect').val();
    let selectedNumber = $('#numberSelect').val();
    let terms = {};
    $.each(courses, (_, course) => {
        if (course.subject == selectedSubject && course.number == selectedNumber) {
            terms[course.term] = course.term;
        }
    });
    $.each(terms, (key, value) => {
        $('#termSelect')
            .append($('<option>', { value: key })
                .text(value));
    });
    filter();
}