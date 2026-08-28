import React, { useState } from 'react'

export default function Projects(){
  const list = [
    {id:'maryland-homes',title:'MaryLand Homes RIVERVIEW', position:'Additional Director', url:'https://maryland.city'},
    {id:'time-and-technology',title:'Time and Technology', position:'CEO', url:'https://timeandtechnology.cloud/'},
    {id:'qubit-cloud',title:'Qubit Cloud', position:'Chairman', url:'https://qubitcloudit.com/'}
  ]
  const [activeId, setActiveId] = useState(list[0].id)

  return (
    <div className="container project-index">
      <h2 className="section-title">Connected Companies</h2>
      <div className="project-stage">
        <div className={`project-art project-art-${activeId}`} aria-hidden="true">
          <span className="art-orbit art-orbit-one" />
          <span className="art-orbit art-orbit-two" />
          <span className="art-core" />
        </div>
        <div className="project-list" aria-label="Connected companies">
          {list.map((item, index) => (
            <a
              key={item.id}
              className={`project-row${activeId === item.id ? ' active' : ''}`}
              onMouseEnter={() => setActiveId(item.id)}
              onFocus={() => setActiveId(item.id)}
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="project-number">0{index + 1}</span>
              <span className="project-name">{item.title}<small>{item.position}</small></span>
              <span className="project-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
