import React from 'react'

export default function Skills(){
  const skills = ['Creative AI','Motion Design','Generative UI','React','TypeScript','Visual Systems','Art Direction','Prototyping']
  return (
    <div className="container">
      <h2 className="section-title">Skills</h2>
      <div className="chips">
        {skills.map(s=> <span key={s} className="chip">{s}</span>)}
      </div>
    </div>
  )
}
