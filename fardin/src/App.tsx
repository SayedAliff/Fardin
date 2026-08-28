import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import IntroScene from './components/IntroScene'

export default function App(){
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState<string>('home')
  const [showIntro, setShowIntro] = useState(true)

  const sections = ['home','projects','skills','experience','certificates','education','contact']

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', 'dark')
  },[])

  useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const id = e.target.getAttribute('id') || ''
          setActive(id)
        }
      })
    },{threshold:0.52})
    sections.forEach(id=>{
      const el = document.getElementById(id)
      if(el) observer.observe(el)
    })
    return ()=> observer.disconnect()
  },[])

  useEffect(()=>{
    function onHash(){
      setMobileOpen(false)
    }
    window.addEventListener('hashchange', onHash)
    return ()=> window.removeEventListener('hashchange', onHash)
  },[])

  return (
    <div>
      {showIntro && <IntroScene onEnter={() => setShowIntro(false)} />}
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav className="nav container">
          <div className="logo">Fardin</div>

          <div className="links" role="navigation" aria-label="Primary">
            {sections.map(s=> (
              <a key={s} href={`#${s}`} className={active===s? 'active' : ''} onClick={(ev)=>{
                ev.preventDefault()
                const el = document.getElementById(s)
                if(el) el.scrollIntoView({behavior:'smooth',block:'start'})
                setMobileOpen(false)
              }}>{s[0].toUpperCase()+s.slice(1)}</a>
            ))}
          </div>

          <div className="controls">
            <button aria-controls="mobile-menu" aria-expanded={mobileOpen} className="btn" onClick={()=> setMobileOpen(!mobileOpen)} style={{marginLeft:8}}>Menu</button>
          </div>
        </nav>

        <div id="mobile-menu" className="mobile-menu container" aria-hidden={!mobileOpen} style={{display: mobileOpen ? 'block' : 'none'}}>
          {sections.map(s=> (
            <a key={s} href={`#${s}`} className={active===s? 'active' : ''} onClick={(ev)=>{
              ev.preventDefault(); const el = document.getElementById(s); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); setMobileOpen(false)
            }}>{s[0].toUpperCase()+s.slice(1)}</a>
          ))}
        </div>
      </header>

      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="projects"><Projects /></section>
        <section id="skills"><Skills /></section>
        <section id="experience"><Experience /></section>
        <section id="certificates"><Certificates /></section>
        <section id="education"><Education /></section>
        <section id="contact"><Contact /></section>
      </main>

      <footer className="py-8 text-center text-secondary">© 2026 All rights reserved.</footer>
    </div>
  )
}
