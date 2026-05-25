import React from 'react'

export default function Experience(){
  const items = [
    {role:'Frontend Developer', company:'Dot BD Solutions Limited', date:'2024 - Present', desc:'Working on web apps and frontend interfaces.'},
    {role:'Unit Lead', company:'ESAB AIUB Unit Face', date:'2023 - Present', desc:'Organizing unit activities and development.'}
  ]
  return (
    <div className="container">
      <h2 className="section-title">Experience</h2>
      <div className="stack">
        {items.map(i=> (
          <div key={i.role} className="card">
            <strong>{i.role} @ {i.company}</strong>
            <div className="muted">{i.date}</div>
            <p className="muted">{i.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
