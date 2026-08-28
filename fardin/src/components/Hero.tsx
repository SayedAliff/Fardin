import React, { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const techs = ['Flutter', 'React', 'Laravel', 'WordPress']
  const [typed, setTyped] = useState('')
  const [index, setIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let raf = 0
    let width = 0
    let height = 0
    let nodes: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = []

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const rand = (min: number, max: number) => Math.random() * (max - min) + min

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.width = Math.floor(canvas.clientWidth * ratio)
      height = canvas.height = Math.floor(canvas.clientHeight * ratio)
      canvas.style.width = '100%'
      canvas.style.height = '100%'

      const count = prefersReduced || isTouch ? 10 : Math.max(18, Math.floor(width * 0.018))
      nodes = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-0.18, 0.18),
        vy: rand(-0.12, 0.12),
        r: rand(1.3, 3.2) * ratio,
      }))
    }

    const draw = () => {
      if (prefersReduced) return

      frame += 1
      ctx.clearRect(0, 0, width, height)

      const gridAlpha = 0.12
      ctx.strokeStyle = `rgba(102, 227, 255, ${gridAlpha})`
      ctx.lineWidth = 1
      const spacing = 64 * (window.devicePixelRatio || 1)

      for (let x = frame % spacing; x < width; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        if (node.x < -30) node.x = width + 30
        if (node.x > width + 30) node.x = -30
        if (node.y < -30) node.y = height + 30
        if (node.y > height + 30) node.y = -30

        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 14)
        glow.addColorStop(0, 'rgba(102, 227, 255, 0.22)')
        glow.addColorStop(0.4, 'rgba(139, 123, 255, 0.16)')
        glow.addColorStop(1, 'rgba(2, 6, 23, 0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r * 9, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < width * 0.13) {
            ctx.strokeStyle = `rgba(102, 227, 255, ${0.16 * (1 - distance / (width * 0.13))})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const current = techs[index % techs.length]

    const timer = window.setTimeout(() => {
      if (charIndex < current.length) {
        setTyped((value) => value + current.charAt(charIndex))
        setCharIndex((value) => value + 1)
        return
      }

      const resetTimer = window.setTimeout(() => {
        setTyped('')
        setCharIndex(0)
        setIndex((value) => value + 1)
      }, 1100)

      return () => window.clearTimeout(resetTimer)
    }, 96)

    return () => window.clearTimeout(timer)
  }, [charIndex, index, techs])

  return (
    <div className="hero container">
      <div>
        <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-inner">
            <div className="avatar-wrap">
              <img src="/profile.jpg" alt="Fardin" className="avatar" />
            </div>

            <div className="hero-text">
              <h1>Building Modern Digital Experiences with AI &amp; Technology</h1>
              <p className="hero-copy muted">
                I build polished digital portfolios, generative interfaces, and motion-led product stories that feel like a
                future-ready creative studio.
              </p>

              <div className="cta-row">
                <a className="btn" href="#projects">Explore Work</a>
                <a className="btn secondary" href="#contact">Start a Project</a>
              </div>

              <div className="tech-row">
                Current focus: <span className="typewriter">{typed || 'Python'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
