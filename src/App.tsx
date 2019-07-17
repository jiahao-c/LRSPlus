import * as _ from "lodash"
import { Course } from "./Course"
import React, { useState, useMemo } from "react"

const renderCourse = (course: Course, i: number) => 
  <Course key={i} course={course} />

export function App({ courses }: { courses: Course[] }) {
  const subjects = useMemo(() => _.groupBy(courses, "subject"), [courses])

  const [subject, setSubject] = useState("_")
  const [number, setNumber] = useState("_")
  const [term, setTerm] = useState("_")
  const [showAll, setShowAll] = useState(false)

  const subjectList = _.keys(subjects).sort()
  const numberList = _.uniq(_.map(subjects[subject] || [], "number"))
  const termList = _.map(_.filter(courses, { subject, number }), "term")

  const _showAll = () => {
    setShowAll(cur => {
      if (!cur) {
        setSubject("_")
        setNumber("_")
        setTerm("_")
      }
      return !cur
    })
  }

  const matches = (course: Course) => 
    compare(course.subject, subject) &&
    compare(course.number, number) &&
    compare(course.term, term)

  return (
    <div>
      <form className="form-inline">
        <div className="form-group mr-4">
          <label className="mr-2">Subject:</label>
          <select className="form-control" value={subject} onChange={e => setSubject(e.target.value)}>
            <option value="_" disabled hidden>Choose a subject</option>
            { subjectList.map(sub => <option key={sub} value={sub}>{sub}</option>) }
          </select>
        </div>
        <div className="form-group mr-4">
          <label className="mr-2">Course Number:</label>
          <select className="form-control" value={number} onChange={e => setNumber(e.target.value)}>
            <option value="_" disabled hidden>Choose a course</option>
            {numberList.map(number =>
              <option key={number} value={number}>{number}</option>
            )}
          </select>
        </div>
        <div className="form-group mr-4">
          <label className="mr-2">Term:</label>
          <select className="form-control" value={term} onChange={e => setTerm(e.target.value)}>
            <option value="_" disabled hidden>Choose a term</option>
            { termList.map(t => <option key={t} value={t}>{t}</option>) }
          </select>
        </div>
      </form>

      <div className="row">
        { showAll ? courses.map(renderCourse)
          : !numberList.length ? courses.slice(0, 5).map(renderCourse)
          : courses.filter(matches).map(renderCourse) }

        <div className="col-xl-4 col-lg-6 mt-3">
          <button type="button" className="btn btn-outline-primary btn-block" onClick={_showAll}>
            Show All
          </button>
        </div>
      </div>
    </div>
  )
}

function compare(tag: string, selectedTag: string) {
  if (selectedTag === tag || !selectedTag) { return true };
  return false;
}
