'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
  opacity: number
  size: number
  connections: number[]
  phase: 'dispersed' | 'connecting' | 'coalesced'
}

interface ParticlesBackgroundProps {
  className?: string
}

export function ParticlesBackground({ className = '' }: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = 50
      
      for (let i = 0; i < particleCount; i++) {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          targetX: centerX + (Math.random() - 0.5) * 200,
          targetY: centerY + (Math.random() - 0.5) * 100,
          opacity: Math.random() * 0.5 + 0.3,
          size: Math.random() * 3 + 1,
          connections: [],
          phase: 'dispersed'
        })
      }
      
      return particles
    }

    const drawParticle = (particle: Particle) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(37, 211, 102, ${particle.opacity})`
      ctx.fill()
    }

    const drawConnection = (p1: Particle, p2: Particle, opacity: number) => {
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.strokeStyle = `rgba(37, 211, 102, ${opacity * 0.3})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const applyEdgeRepulsion = (particle: Particle) => {
      const repulsionStrength = 0.5
      const edgeDistance = 80 // Distance from edge where repulsion starts
      
      // Left edge repulsion
      if (particle.x < edgeDistance) {
        const force = (edgeDistance - particle.x) / edgeDistance
        particle.vx += force * repulsionStrength
      }
      
      // Right edge repulsion
      if (particle.x > canvas.width - edgeDistance) {
        const force = (particle.x - (canvas.width - edgeDistance)) / edgeDistance
        particle.vx -= force * repulsionStrength
      }
      
      // Top edge repulsion
      if (particle.y < edgeDistance) {
        const force = (edgeDistance - particle.y) / edgeDistance
        particle.vy += force * repulsionStrength
      }
      
      // Bottom edge repulsion
      if (particle.y > canvas.height - edgeDistance) {
        const force = (particle.y - (canvas.height - edgeDistance)) / edgeDistance
        particle.vy -= force * repulsionStrength
      }
      
      // Dampen velocity to prevent excessive acceleration
      particle.vx *= 0.95
      particle.vy *= 0.95
    }

    const updateParticles = (elapsed: number) => {
      const particles = particlesRef.current
      
      particles.forEach((particle, i) => {
        if (elapsed < 5000) {
          // Gradual coalescence over 5 seconds
          const progress = Math.min(elapsed / 5000, 1)
          const easeInOut = 0.5 - 0.5 * Math.cos(progress * Math.PI)
          
          if (progress < 0.2) {
            particle.phase = 'dispersed'
            // Random movement in early phase
            particle.x += particle.vx * (1 - progress * 2)
            particle.y += particle.vy * (1 - progress * 2)
            
            // Soft boundary repulsion to keep particles in view
            const margin = 50
            if (particle.x < margin) {
              particle.vx = Math.abs(particle.vx) * 0.5 // gentle push right
            } else if (particle.x > canvas.width - margin) {
              particle.vx = -Math.abs(particle.vx) * 0.5 // gentle push left
            }
            
            if (particle.y < margin) {
              particle.vy = Math.abs(particle.vy) * 0.5 // gentle push down
            } else if (particle.y > canvas.height - margin) {
              particle.vy = -Math.abs(particle.vy) * 0.5 // gentle push up
            }
          } else {
            particle.phase = 'connecting'
          }
          
          // Gradually move towards final cloud positions
          const driftCenterX = canvas.width * (0.3 + 0.4 * Math.sin(elapsed / 20000))
          const driftCenterY = canvas.height * (0.3 + 0.4 * Math.cos(elapsed / 25000))
          
          const cloudWidth = canvas.width * 0.84
          const cloudHeight = canvas.height * 0.84
          
          const angle = (elapsed / 12000) + (i / particles.length) * Math.PI * 2
          const radiusX = (cloudWidth / 2) * (0.5 + Math.sin(elapsed / 4000 + i) * 0.5)
          const radiusY = (cloudHeight / 2) * (0.5 + Math.cos(elapsed / 3500 + i * 0.8) * 0.5)
          
          const finalX = driftCenterX + Math.cos(angle) * radiusX
          const finalY = driftCenterY + Math.sin(angle) * radiusY
          
          // Add slight randomness to prevent clustering - no hard boundaries
          const randomOffsetX = (Math.random() - 0.5) * 20
          const randomOffsetY = (Math.random() - 0.5) * 20
          
          particle.targetX = finalX + randomOffsetX
          particle.targetY = finalY + randomOffsetY
          
          // Slow gradual movement towards targets with slight variation
          const moveStrength = easeInOut * (0.015 + Math.random() * 0.005)
          particle.x = particle.x + (particle.targetX - particle.x) * moveStrength
          particle.y = particle.y + (particle.targetY - particle.y) * moveStrength
          
          // Apply edge repulsion to prevent clustering at edges
          applyEdgeRepulsion(particle)
          
          // Connections appear gradually
          particle.connections = []
          if (progress > 0.3) {
            particles.forEach((other, j) => {
              if (i !== j) {
                const dx = particle.x - other.x
                const dy = particle.y - other.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                
                const maxConnectionDistance = 280 * Math.min((progress - 0.3) / 0.7, 1)
                if (distance < maxConnectionDistance) {
                  particle.connections.push(j)
                }
              }
            })
          }
          
        } else {
          particle.phase = 'coalesced'
          
          // Cloud drifts around the entire div with large, open formation
          const driftCenterX = canvas.width * (0.3 + 0.4 * Math.sin(elapsed / 20000))
          const driftCenterY = canvas.height * (0.3 + 0.4 * Math.cos(elapsed / 25000))
          
          // Much larger cloud covering ~84% of the space (60% + 40% bigger)
          const cloudWidth = canvas.width * 0.84
          const cloudHeight = canvas.height * 0.84
          
          const angle = (elapsed / 12000) + (i / particles.length) * Math.PI * 2
          const radiusX = (cloudWidth / 2) * (0.5 + Math.sin(elapsed / 4000 + i) * 0.5)
          const radiusY = (cloudHeight / 2) * (0.5 + Math.cos(elapsed / 3500 + i * 0.8) * 0.5)
          
          // Add slight randomness to prevent clustering in coalesced phase - no hard boundaries
          const randomOffsetX2 = (Math.random() - 0.5) * 25
          const randomOffsetY2 = (Math.random() - 0.5) * 25
          
          particle.targetX = driftCenterX + Math.cos(angle) * radiusX + randomOffsetX2
          particle.targetY = driftCenterY + Math.sin(angle) * radiusY + randomOffsetY2
          
          particle.x = particle.x + (particle.targetX - particle.x) * (0.01 + Math.random() * 0.005)
          particle.y = particle.y + (particle.targetY - particle.y) * (0.01 + Math.random() * 0.005)
          
          // Apply edge repulsion in coalesced phase too
          applyEdgeRepulsion(particle)
          
          particle.connections = []
          particles.forEach((other, j) => {
            if (i !== j) {
              const dx = particle.x - other.x
              const dy = particle.y - other.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              
              // Even longer connections for the much larger cloud
              if (distance < 280) {
                particle.connections.push(j)
              }
            }
          })
        }
      })
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }
      
      const elapsed = currentTime - startTimeRef.current
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      updateParticles(elapsed)
      
      const particles = particlesRef.current
      
      particles.forEach((particle, i) => {
        particle.connections.forEach(connectionIndex => {
          const connectedParticle = particles[connectionIndex]
          if (connectedParticle && connectionIndex > i) {
            let opacity = 0.5
            if (elapsed < 5000) {
              // Gradual opacity increase over 5 seconds
              const progress = Math.max(0, (elapsed - 1500) / 3500)
              opacity = Math.min(0.5, progress)
            } else if (particle.phase === 'coalesced') {
              opacity = 0.6 + Math.sin(elapsed / 1000 + i * 0.1) * 0.1
            }
            drawConnection(particle, connectedParticle, opacity)
          }
        })
      })
      
      particles.forEach(particle => {
        drawParticle(particle)
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }

    const init = () => {
      resizeCanvas()
      particlesRef.current = createParticles()
      startTimeRef.current = 0
      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resizeCanvas)
    init()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  )
}