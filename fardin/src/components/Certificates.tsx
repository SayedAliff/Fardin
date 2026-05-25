import React from 'react'

export default function Certificates(){
  const certs = [
    {title:'React Basics', issuer:'Coursera', year:2023},
    {title:'Game Design Intro', issuer:'Udemy', year:2022}
  ]
  return (
    <div className="container">
      <h2 className="section-title">Certificates</h2>
      <div className="grid">
        {certs.map(c=> (
          <div key={c.title} className="card">
            <strong>{c.title}</strong>
            <div className="muted">{c.issuer} • {c.year}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
