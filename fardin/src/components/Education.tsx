import React from 'react'

export default function Education(){
  const edu = [
    {school:'American International University-Bangladesh', note:'Relevant coursework'},
    {school:'Cambrian College, Dhaka', note:'College coursework'}
  ]
  return (
    <div className="container">
      <h2 className="section-title">Education</h2>
      <div className="stack">
        {edu.map(e=> (
          <div key={e.school} className="card">
            <strong>{e.school}</strong>
            <div className="muted">{e.note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
