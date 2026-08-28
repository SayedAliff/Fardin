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

    const catEdges: Array<[number, number, number, number]> = [
      [-0.56, -0.38, -0.78, -0.98], [-0.78, -0.98, -0.92, -0.48], [-0.92, -0.48, -0.56, -0.38],
      [0.56, -0.38, 0.78, -0.98], [0.78, -0.98, 0.92, -0.48], [0.92, -0.48, 0.56, -0.38],
      [-0.56, -0.38, 0, -0.5], [0, -0.5, 0.56, -0.38], [-0.56, -0.38, -0.72, 0.08],
      [-0.72, 0.08, -0.5, 0.66], [-0.5, 0.66, 0, 0.86], [0, 0.86, 0.5, 0.66],
      [0.5, 0.66, 0.72, 0.08], [0.72, 0.08, 0.56, -0.38], [-0.72, 0.08, 0, -0.02],
      [0, -0.02, 0.72, 0.08], [-0.5, 0.66, -0.25, 0.18], [-0.25, 0.18, 0, 0.86],
      [0, 0.86, 0.25, 0.18], [0.25, 0.18, 0.5, 0.66], [-0.25, 0.18, 0.25, 0.18],
      [-0.72, 0.08, -0.86, 0.52], [-0.86, 0.52, -0.64, 0.72], [0.72, 0.08, 0.86, 0.52],
      [0.86, 0.52, 0.64, 0.72], [-0.56, -0.38, -0.28, -0.18], [-0.28, -0.18, 0, -0.5],
      [0, -0.5, 0.28, -0.18], [0.28, -0.18, 0.56, -0.38], [-0.28, -0.18, -0.25, 0.18],
      [0.28, -0.18, 0.25, 0.18], [-0.72, 0.08, -0.25, 0.18], [0.72, 0.08, 0.25, 0.18],
      [-0.5, 0.66, -0.35, 0.42], [-0.35, 0.42, -0.25, 0.18],
      [0.5, 0.66, 0.35, 0.42], [0.35, 0.42, 0.25, 0.18],
      [-0.72, 0.08, -0.35, 0.42], [0.72, 0.08, 0.35, 0.42],
      [-0.35, 0.42, 0, 0.62], [0, 0.62, 0.35, 0.42],
      [-0.5, 0.66, 0, 0.62], [0, 0.62, 0.5, 0.66],
    ]

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
      const pointerX = (event.clientX - rect.left) / rect.width - 0.5
      const pointerY = (event.clientY - rect.top) / rect.height - 0.5
      target = {
        x: width * 0.5 + pointerX * width * 0.22,
        y: height * 0.52 + pointerY * height * 0.16,
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

      const catScale = Math.min(width, height) * 0.27
      const catTilt = (target.x - width * 0.5) / width * 0.12
      const catDepth = (target.y - height * 0.5) / height
      context.save()
      context.translate(player.x, player.y + Math.sin(frame * 0.025) * 3 + catDepth * 16)
      context.rotate(catTilt)
      context.lineCap = 'round'
      context.lineJoin = 'round'

      context.shadowColor = 'rgba(120, 234, 222, .82)'
      context.shadowBlur = 18
      context.strokeStyle = 'rgba(212, 255, 247, .94)'
      context.lineWidth = Math.max(1.2, catScale * 0.012)
      catEdges.forEach(([startX, startY, endX, endY]) => {
        context.beginPath()
        context.moveTo(startX * catScale, startY * catScale)
        context.lineTo(endX * catScale, endY * catScale)
        context.stroke()
      })

      context.shadowBlur = 0
      context.strokeStyle = '#ffca86'
      context.lineWidth = Math.max(1.8, catScale * 0.018)
      context.beginPath()
      context.moveTo(0.58 * catScale, 0.48 * catScale)
      context.bezierCurveTo(1.12 * catScale, 0.72 * catScale, 1.14 * catScale, 0.1 * catScale, 0.86 * catScale, -0.02 * catScale)
      context.stroke()

      context.fillStyle = '#ffca86'
      context.beginPath()
      context.arc(-0.27 * catScale, -0.19 * catScale, catScale * 0.026, 0, Math.PI * 2)
      context.arc(0.27 * catScale, -0.19 * catScale, catScale * 0.026, 0, Math.PI * 2)
      context.fill()
      context.restore()

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
