import * as React from "react";

export function Course({ course }: { course: Course }) {
  return (
    <div className="col-xl-4 col-lg-6 mt-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{course.subject} {course.number} - {course.term}</h5>
          <p className="card-text">
            <b>{course.name}</b><br/>
            Instructor: {course.prof} <br />
            Class Average: {course.average}
          </p>
          <a href={course.link} className="btn btn-primary">Watch Recordings</a>
        </div>
      </div>
    </div>
  )
}