import React, { useState } from 'react'
import Modal from './Modal'

export default function Projects(){
  const list = [
    {id:'synapse',title:'Synapse — AI Brand Studio', desc:'A cinematic concept for an AI-first creative portfolio with layered motion and modular storytelling.', details:'This concept focuses on premium presentation, AI-inspired visual rhythm, and a strong landing experience for creative clients.'},
    {id:'lumen',title:'Lumen Grid — Generative Showcase', desc:'An experimental showcase format for immersive work samples, capability cards, and case-study narratives.', details:'The layout is built to present projects like gallery pieces with crisp hierarchy, glass panels, and responsive emphasis states.'}
  ]
  const [open, setOpen] = useState(false)
  const [project, setProject] = useState<any | null>(null)
  const [activeId, setActiveId] = useState(list[0].id)

  function openProject(p:any){ setProject(p); setOpen(true) }

  return (
    <div className="container project-index">
      <h2 className="section-title">Selected Work</h2>
      <div className="project-stage">
        <div className={`project-art project-art-${activeId}`} aria-hidden="true">
          <span className="art-orbit art-orbit-one" />
          <span className="art-orbit art-orbit-two" />
          <span className="art-core" />
        </div>
        <div className="project-list" role="list" aria-label="Selected projects">
          {list.map((item, index) => (
            <button
              key={item.id}
              className={`project-row${activeId === item.id ? ' active' : ''}`}
              onMouseEnter={() => setActiveId(item.id)}
              onFocus={() => setActiveId(item.id)}
              onClick={() => openProject(item)}
              role="listitem"
              aria-haspopup="dialog"
            >
              <span className="project-number">0{index + 1}</span>
              <span className="project-name">{item.title}</span>
              <span className="project-arrow">↗</span>
            </button>
          ))}
        </div>
      </div>
      <Modal open={open} onClose={()=> setOpen(false)} title={project?.title}>
        <p>{project?.details}</p>
        <p className="muted">More details, screenshots and links can be added here.</p>
      </Modal>
    </div>
  )
}
