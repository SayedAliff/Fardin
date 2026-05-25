import React, { useState } from 'react'
import Modal from './Modal'

export default function Projects(){
  const list = [
    {id:'arenax',title:'ArenaX — Multiplayer Prototype', desc:'Unity prototype focused on fast-paced arena mechanics and networked play.', details:'Built with Unity networking. Features fast respawn and simple matchmaking.'},
    {id:'overlay',title:'StreamOverlay — Tools', desc:'Web-based overlay toolkit for streamers, OBS integrations and alerts.', details:'React-based overlay components, OBS websocket integration and alert handling.'}
  ]
  const [open, setOpen] = useState(false)
  const [project, setProject] = useState<any | null>(null)

  function openProject(p:any){ setProject(p); setOpen(true) }

  return (
    <div className="container">
      <h2 className="section-title">Projects</h2>
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
