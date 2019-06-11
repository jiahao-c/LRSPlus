'use strict';

/* Selections */
let courses;
$.get("result.json", function (data, status) {
    courses = data.courses;
    let subjects = {};
    $.each(courses, (_, course) => {
        subjects[course.subject] = course.subject;

    });
    $.each(subjects, (key, value) => {
        $('#subjectSelect')
            .append($('<option>', { value: key })
                .text(value));
    });
});

$("#showall").click(() => {
    filter();
    $("#showall").remove();
});

$('#subjectSelect').change(() => {
    $('#numberSelect').empty();
    $('#numberSelect')
        .append($('<option>', { value: "" })
            .text("Choose a number"));
    $('#termSelect').empty();
    let selectedSubject = $('#subjectSelect').val();
    let courseNumbers = {};
    $.each(courses, (_, course) => {
        if (course.subject == selectedSubject) {
            courseNumbers[course.number] = course.number;
        }
    });
    $.each(courseNumbers, (key, value) => {
        $('#numberSelect')
            .append($('<option>', { value: key })
                .text(value));
    });
    filter();
});

$('#numberSelect').change(() => {
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