import React, { useState } from 'react'

export default function Contact(){
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    setStatus('sending')
    try{
      // Attempt to POST to Formspree endpoint if provided, otherwise fallback to mailto
      const FORM_ENDPOINT = '' // add your Formspree endpoint here if available
      if(FORM_ENDPOINT){
        const res = await fetch(FORM_ENDPOINT, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email,message})})
        if(res.ok) setStatus('sent')
        else setStatus('error')
      } else {
        // fallback: open mail client
        const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`)
        window.location.href = `mailto:fardin@example.com?subject=${encodeURIComponent('Portfolio Contact')}&body=${body}`
        setStatus('sent')
      }
    }catch(err){
      console.error(err); setStatus('error')
    }
  }

  return (
    <div className="container">
      <h2 className="section-title">Contact</h2>
      <p className="muted">Email: fardin@example.com · Phone: +8801XXXXXXXXX</p>

      <form onSubmit={handleSubmit} style={{maxWidth:680,marginTop:8}} aria-label="Contact form">
        <label style={{display:'block',marginBottom:8}}>Name<br/>
          <input value={name} onChange={e=>setName(e.target.value)} required className="input" />
        </label>
        <label style={{display:'block',marginBottom:8}}>Email<br/>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="input" />
        </label>
        <label style={{display:'block',marginBottom:8}}>Message<br/>
          <textarea value={message} onChange={e=>setMessage(e.target.value)} required className="input" rows={6} />
        </label>
        <div>
          <button className="btn" type="submit" disabled={status==='sending'}>{status==='sending' ? 'Sending...' : 'Send Message'}</button>
          <a className="btn" style={{marginLeft:8}} href="/resume.pdf" download>Download Resume</a>
        </div>
        {status==='error' && <div style={{color:'salmon',marginTop:8}}>Error sending message. Try emailing directly.</div>}
      </form>
    </div>
  )
}

