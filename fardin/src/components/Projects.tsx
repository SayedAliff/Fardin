import React, { useState } from 'react'
import Modal from './Modal'

export default function Projects(){
  const list = [
    {id:'synapse',title:'Synapse — AI Brand Studio', desc:'A cinematic concept for an AI-first creative portfolio with layered motion and modular storytelling.', details:'This concept focuses on premium presentation, AI-inspired visual rhythm, and a strong landing experience for creative clients.'},
    {id:'lumen',title:'Lumen Grid — Generative Showcase', desc:'An experimental showcase format for immersive work samples, capability cards, and case-study narratives.', details:'The layout is built to present projects like gallery pieces with crisp hierarchy, glass panels, and responsive emphasis states.'}
  ]
  const [open, setOpen] = useState(false)
  const [project, setProject] = useState<any | null>(null)

  function openProject(p:any){ setProject(p); setOpen(true) }

  return (
    <div className="container">
      <h2 className="section-title">Selected Work</h2>
      <div className="grid">
        {list.map(i=> (
          <div key={i.id} className="card" role="button" tabIndex={0} onClick={()=> openProject(i)} onKeyDown={(e)=> e.key==='Enter' && openProject(i)} aria-haspopup="dialog" aria-controls={`project-${i.id}`}>
            <h3>{i.title}</h3>
            <p className="muted">{i.desc}</p>
            <div style={{marginTop:8}}><button className="btn" onClick={(ev)=>{ev.stopPropagation(); openProject(i)}}>Details</button></div>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={()=> setOpen(false)} title={project?.title}>
        <p>{project?.details}</p>
        <p className="muted">More details, screenshots and links can be added here.</p>
      </Modal>
    </div>
  )
}
