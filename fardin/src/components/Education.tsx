import React from 'react'

export default function Education(){
  const edu = [
    {
      school:'American International University-Bangladesh',
      qualification:'Bachelor of Science in Computer Science and Engineering (BSc CSE)',
      period:'2020 - 2024',
      detail:'Major in Software engineering'
    },
    {
      school:'Cambrian College, Dhaka',
      qualification:'Higher Secondary School Certificate (HSC)',
      period:'2017 - 2019',
      detail:'Science Group'
    },
    {
      school:'Cambrian College, Dhaka',
      qualification:'Secondary School Certificate (SSC)',
      period:'2017',
      detail:'Science Group'
    }
  ]
  return (
    <div className="container">
      <h2 className="section-title">Education</h2>
      <div className="stack">
        {edu.map(e=> (
          <div key={`${e.school}-${e.qualification}`} className="card">
            <strong>{e.school}</strong>
            <div className="muted">{e.qualification} • {e.period}</div>
            <div className="muted">{e.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
