import React, { useEffect, useRef } from 'react'

export default function Hero(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const techs = ['React','TypeScript','Canvas','Unity','C#','Vite']
  const [txt, setTxt] = React.useState('')
  const [ti, setTi] = React.useState(0)
  const [char, setChar] = React.useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')!
    let w = canvas.width = canvas.clientWidth * devicePixelRatio
    let h = canvas.height = canvas.clientHeight * devicePixelRatio
    const TAU = Math.PI * 2
    let particles: any[] = []

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || localStorage.getItem('reduceMotion') === '1'
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    function rand(min: number, max: number){ return Math.random() * (max - min) + min }

    function Particle(){
      this.x = rand(0, w)
      this.y = rand(0, h)
      this.r = rand(1.2, 3) * devicePixelRatio
      this.vx = rand(-0.25, 0.25) * devicePixelRatio
      this.vy = rand(-0.15, 0.15) * devicePixelRatio
    }

    function resize(){
      w = canvas.width = canvas.clientWidth * devicePixelRatio
      h = canvas.height = canvas.clientHeight * devicePixelRatio
      particles = []
      const baseCount = Math.floor(w * 0.02)
      // reduce particles on small screens or touch devices
      const count = prefersReduced || isTouch ? Math.max(6, Math.floor(baseCount * 0.35)) : Math.max(18, baseCount)
      for(let i=0;i<count;i++) particles.push(new (Particle as any)())
    }

    function draw(){
      if(prefersReduced) return
      ctx.clearRect(0,0,w,h)
      for(const p of particles){
        p.x += p.vx; p.y += p.vy
        if(p.x < -20) p.x = w + 20
        if(p.x > w + 20) p.x = -20
        if(p.y < -20) p.y = h + 20
        if(p.y > h + 20) p.y = -20

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*8)
        g.addColorStop(0, 'rgba(124,58,237,0.14)')
        g.addColorStop(0.4, 'rgba(6,182,212,0.06)')
        g.addColorStop(1, 'rgba(2,6,23,0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r*6, 0, TAU); ctx.fill()
      }

      // lines
      ctx.lineWidth = 0.4 * devicePixelRatio
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.sqrt(dx*dx+dy*dy)
          if(d < (w * 0.12)){
            const alpha = 0.18 * (1 - d / (w * 0.12))
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke()
          }
        }
      }

      requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    const raf = requestAnimationFrame(draw)

    return ()=>{
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Simple typewriter for tech row
  useEffect(()=>{
    const interval = setInterval(()=>{
      const current = techs[ti % techs.length]
      if(char < current.length){
        setTxt(t=> t + current[char])
        setChar(c=> c+1)
      } else {
        // pause then clear
        setTimeout(()=>{
          setTxt('')
          setChar(0)
          setTi(i=> i+1)
        },800)
      }
    },120)
    return ()=> clearInterval(interval)
  },[char,ti])

  return (
    <div className="hero container">
      <div style={{position:'relative'}}>
        <canvas ref={canvasRef} style={{width:'100%',height:220,position:'absolute',left:0,top:0,zIndex:0}} />
        <div style={{position:'relative',zIndex:2,padding:28}}>
          <div className="hero-inner">
            <div className="avatar-wrap">
              <img src="/profile.jpg" alt="Fardin" className="avatar" />
            </div>
            <div className="hero-text">
              <h1>Fardin — Gaming Studio</h1>
              <p className="muted">Game dev · Startup founder · IT products for gamers</p>
              <p className="muted">This demo reproduces the portfolio structure as React + TypeScript components.</p>
              <div style={{marginTop:8}} className="tech-row">Tech: <span className="typewriter">{txt}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
