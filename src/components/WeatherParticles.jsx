import { useEffect, useRef } from "react"
import { ParticlesProvider, Particles } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"


function RainCanvas({ count, speed, lineLength }) {
    const canvasRef = useRef(null)
    const lenMin = lineLength.min
    const lenMax = lineLength.max

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        const drops = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            len: Math.random() * (lenMax - lenMin) + lenMin,
            speed: speed + Math.random() * 6,
            opacity: Math.random() * 0.35 + 0.45
        }))

        let animId

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.lineWidth = 1.5

            drops.forEach(drop => {
                ctx.beginPath()
                ctx.strokeStyle = `rgba(168, 212, 240, ${drop.opacity})`
                ctx.moveTo(drop.x, drop.y)
                ctx.lineTo(drop.x + drop.len * 0.45, drop.y + drop.len)
                ctx.stroke()

                drop.x += drop.speed * 0.45
                drop.y += drop.speed

                if (drop.y > canvas.height + drop.len) {
                    drop.y = -drop.len
                    drop.x = Math.random() * canvas.width
                }
                if (drop.x > canvas.width + drop.len) {
                    drop.x = -drop.len
                    drop.y = Math.random() * canvas.height
                }
            })

            animId = requestAnimationFrame(draw)
        }

        animId = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(animId)
    }, [count, speed, lenMin, lenMax])

    return (
        <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }}
        />
    )
}


const snowConfig = {
    fullScreen: { enable: false },
    particles: {
        number: { value: 220 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: { min: 0.4, max: 0.9 } },
        size: { value: { min: 1.5, max: 4 } },
        move: {
            enable: true,
            speed: 2.5,
            direction: "bottom",
            random: true,
            outModes: { default: "out" }
        }
    }
}

const fogConfig = {
    fullScreen: { enable: false },
    particles: {
        number: { value: 18 },
        color: { value: "#d0d0d0" },
        shape: { type: "circle" },
        opacity: { value: { min: 0.12, max: 0.28 } },
        size: { value: { min: 180, max: 360 } },
        move: {
            enable: true,
            speed: 0.4,
            direction: "right",
            random: true,
            outModes: { default: "out" }
        }
    }
}

async function initEngine(engine) {
    await loadSlim(engine)
}


export default function WeatherParticles({ icon, id = "weather-particles" }) {
    if (!icon) return null

    const code = icon.slice(0, 2)

    if (code === "09" || code === "10") {
        return <RainCanvas count={300} speed={22} lineLength={{ min: 12, max: 22 }} />
    }

    if (code === "11") {
        return <RainCanvas count={400} speed={32} lineLength={{ min: 14, max: 26 }} />
    }

    if (code === "13") {
        return (
            <ParticlesProvider init={initEngine}>
                <Particles
                    id={id}
                    style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}
                    options={snowConfig}
                />
            </ParticlesProvider>
        )
    }

    if (code === "50") {
        return (
            <ParticlesProvider init={initEngine}>
                <Particles
                    id={id}
                    style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", zIndex: 2, pointerEvents: "none", filter: "blur(60px)" }}
                    options={fogConfig}
                />
            </ParticlesProvider>
        )
    }

    return null
}
