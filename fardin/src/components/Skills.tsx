import React from 'react'

export default function Skills(){
  const skills = [
    'Python',
    'JavaScript',
    'TypeScript',
    'C++',
    'Java',
    'R',
    'C#',
    '.NET',
    'Node.js',
    'PHP',
    'Laravel',
    'React',
    'Next.js',
    'MySQL',
    'Oracle SQL',
    'Linux',
    'Git',
  ]
  return (
    <div className="container">
      <h2 className="section-title">Skills</h2>
      <div className="chips">
        {skills.map(s=> <span key={s} className="chip">{s}</span>)}
      </div>
    </div>
  )
}
