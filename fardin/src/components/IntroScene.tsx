import React, { useEffect, useRef, useState } from 'react'

type Point = { x: number; y: number; z: number; speed: number; size: number }

export default function IntroScene({ onEnter }: { onEnter: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [score, setScore] = useState(0)
  const [started, setStarted] = useState(false)
  const [lightsOut, setLightsOut] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    let width = 0
    let height = 0
    let frame = 0
    let animationFrame = 0
    let player = { x: 0, y: 0 }
    let target = { x: 0, y: 0 }
    let points: Point[] = []
    const keys = new Set<string>()
    let lightsOutMode = false

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.width = Math.floor(canvas.clientWidth * ratio)
      height = canvas.height = Math.floor(canvas.clientHeight * ratio)
      player = { x: width * 0.5, y: height * 0.52 }
      target = { ...player }
      points = Array.from({ length: 18 }, (_, index) => ({
        x: (0.12 + ((index * 0.31) % 0.76)) * width,
        y: (0.18 + ((index * 0.47) % 0.62)) * height,
        z: 0.2 + ((index * 0.17) % 0.8),
        speed: 0.001 + (index % 4) * 0.0006,
        size: 2 + (index % 3) * 1.5,
      }))
    }

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      target = {
        x: (event.clientX - rect.left) * (width / rect.width),
        y: (event.clientY - rect.top) * (height / rect.height),
      }
      setStarted(true)
    }

    const keyDown = (event: KeyboardEvent) => {
      keys.add(event.key)
      if (event.key === 'Shift' && !event.repeat) {
        lightsOutMode = !lightsOutMode
        setLightsOut(lightsOutMode)
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) event.preventDefault()
      setStarted(true)
    }

    const keyUp = (event: KeyboardEvent) => keys.delete(event.key)

    const draw = () => {
      frame += 1
      context.clearRect(0, 0, width, height)
      const horizon = height * 0.56
      const centerX = width * 0.5

      context.fillStyle = lightsOutMode ? '#000000' : '#07101d'
      context.fillRect(0, 0, width, height)

      const glow = context.createRadialGradient(centerX, horizon, 0, centerX, horizon, width * 0.72)
      glow.addColorStop(0, 'rgba(53, 215, 201, .16)')
      glow.addColorStop(0.5, 'rgba(16, 85, 113, .08)')
      glow.addColorStop(1, 'rgba(3, 8, 18, 0)')
      context.globalAlpha = lightsOutMode ? 0.42 : 1
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)
      context.globalAlpha = 1

      context.strokeStyle = 'rgba(98, 218, 207, .16)'
      context.lineWidth = 1
      for (let line = -12; line <= 12; line += 1) {
        context.beginPath()
        context.moveTo(centerX, horizon)
        context.lineTo(centerX + line * width * 0.14, height)
        context.stroke()
      }
      for (let row = 0; row < 9; row += 1) {
        const y = horizon + Math.pow(row / 9, 1.8) * height * 0.54
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y)
        context.stroke()
      }

      const speed = Math.max(2, width * 0.003)
      if (keys.has('ArrowLeft')) target.x -= speed * 2
      if (keys.has('ArrowRight')) target.x += speed * 2
      if (keys.has('ArrowUp')) target.y -= speed * 2
      if (keys.has('ArrowDown')) target.y += speed * 2
      target.x = Math.max(30, Math.min(width - 30, target.x))
      target.y = Math.max(30, Math.min(height - 30, target.y))
      player.x += (target.x - player.x) * 0.08
      player.y += (target.y - player.y) * 0.08

      points.forEach((point) => {
        point.z -= point.speed
        if (point.z < 0.04) {
          point.z = 1
          point.x = Math.random() * width
          point.y = horizon + Math.random() * height * 0.35
        }
        const scale = 0.55 + point.z
        const x = centerX + (point.x - centerX) * scale
        const y = horizon + (point.y - horizon) * scale
        const radius = point.size * scale
        const pointGlow = context.createRadialGradient(x, y, 0, x, y, radius * 8)
        pointGlow.addColorStop(0, 'rgba(255, 222, 130, .9)')
        pointGlow.addColorStop(0.25, 'rgba(255, 136, 94, .38)')
        pointGlow.addColorStop(1, 'rgba(255, 136, 94, 0)')
        context.fillStyle = pointGlow
        context.beginPath()
        context.arc(x, y, radius * 8, 0, Math.PI * 2)
        context.fill()
        context.fillStyle = '#ffe29a'
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()

        if (Math.hypot(player.x - x, player.y - y) < 24 && point.z > 0.45) {
          point.z = 0.02
          setScore((value) => Math.min(value + 1, 8))
        }
      })

      const playerGlow = context.createRadialGradient(player.x, player.y, 0, player.x, player.y, 55)
      playerGlow.addColorStop(0, 'rgba(102, 240, 220, .9)')
      playerGlow.addColorStop(0.25, 'rgba(54, 199, 196, .42)')
      playerGlow.addColorStop(1, 'rgba(54, 199, 196, 0)')
      context.fillStyle = playerGlow
      context.beginPath()
      context.arc(player.x, player.y, 55, 0, Math.PI * 2)
      context.fill()
      context.fillStyle = '#d6fff3'
      context.beginPath()
      context.arc(player.x, player.y, 7 + Math.sin(frame * 0.08) * 2, 0, Math.PI * 2)
      context.fill()

      animationFrame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', move)
    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)
    animationFrame = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', move)
      window.removeEventListener('keydown', keyDown)
      window.removeEventListener('keyup', keyUp)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <section className={`intro-scene${lightsOut ? ' lights-out' : ''}`} aria-label="Fardin interactive introduction">
      <canvas ref={canvasRef} aria-label="Interactive 3D-inspired playground" />
      <div className="intro-topline">
        <span>FARDIN / PLAYGROUND</span>
        <span>NODE FIELD 01</span>
      </div>
      <div className="intro-copy">
        <p className="intro-kicker">AI creative portfolio / interactive field</p>
        <h1>Enter the<br /><em>Fardin world.</em></h1>
        <p>Navigate the field. Find the signal.<br />Then step inside the studio.</p>
      </div>
      <div className="intro-status">
        <span>COLLECTED {String(score).padStart(2, '0')} / 08</span>
        <span className={started ? 'status-live' : ''}>{lightsOut ? 'LIGHTS OUT' : started ? 'SIGNAL ACTIVE' : 'PRESS SHIFT TO START'}</span>
      </div>
      <div className="intro-actions">
        <button className="intro-enter" onClick={onEnter}>Visit Portfolio <span>↗</span></button>
        <span className="intro-hint">Move with pointer or arrow keys</span>
      </div>
    </section>
  )
}
