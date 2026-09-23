let animationId: number | null = null
let resizeHandler: (() => void) | null = null
let activeCanvas: HTMLCanvasElement | null = null

export function initMeteorEffect() {
  if (typeof window === 'undefined') return
  if (document.getElementById('meteor-canvas')) return

  const canvas = document.createElement('canvas')
  canvas.id = 'meteor-canvas'
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  // 放在视频背景之上 (-1) 但在内容之下
  // 视频背景通常也是 -1，但因为 canvas 是后添加的，所以会覆盖在视频上
  canvas.style.zIndex = '-1' 
  canvas.style.pointerEvents = 'none'
  document.body.appendChild(canvas)
  activeCanvas = canvas

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.remove()
    activeCanvas = null
    return
  }

  let width = window.innerWidth
  let height = window.innerHeight
  
  const resize = () => {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
  }
  window.addEventListener('resize', resize)
  resizeHandler = resize
  resize()

  // Full theme palette, weighted toward readable glow colors.
  const colors = [
    '#6ECC54',
    '#D34947',
    '#018B8D',
    '#002FA7',
    '#470125',
    '#F9D46C',
    '#71E2D1',
    '#C8161D',
    '#492D22',
    '#EB5C20',
    '#0D3A69',
  ]

  const parseHexColor = (hex: string) => {
    const value = Number.parseInt(hex.slice(1), 16)
    return {
      r: (value >> 16) & 255,
      g: (value >> 8) & 255,
      b: value & 255,
    }
  }

  const palette = colors.map(parseHexColor)

  const mixPaletteColor = (position: number) => {
    const wrapped = ((position % palette.length) + palette.length) % palette.length
    const currentIndex = Math.floor(wrapped)
    const nextIndex = (currentIndex + 1) % palette.length
    const mix = wrapped - currentIndex
    const current = palette[currentIndex]
    const next = palette[nextIndex]
    const r = Math.round(current.r + (next.r - current.r) * mix)
    const g = Math.round(current.g + (next.g - current.g) * mix)
    const b = Math.round(current.b + (next.b - current.b) * mix)
    return `rgb(${r}, ${g}, ${b})`
  }

  // 预计算星星顶点
  const STAR_VERTICES: {x: number, y: number}[] = []
  const angleStep = (Math.PI * 2) / 10
  const startAngle = -Math.PI / 2
  for (let i = 0; i < 10; i++) {
      const angle = startAngle + i * angleStep
      const radius = i % 2 === 0 ? 1.0 : 0.4
      STAR_VERTICES.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
      })
  }

  class Star {
    x: number
    y: number
    size: number
    hue: number
    alpha: number
    baseAlpha: number
    rotation: number
    rotationSpeed: number
    pulsePhase: number
    pulseSpeed: number
    colorSpeed: number
    
    constructor(x: number, y: number, size: number, hue: number, alpha: number = 1) {
      this.x = x
      this.y = y
      this.size = size
      this.hue = hue
      this.alpha = alpha
      this.baseAlpha = alpha
      this.rotation = Math.random() * Math.PI * 2
      this.rotationSpeed = (Math.random() - 0.5) * 0.035 // 自转速度
      this.pulsePhase = Math.random() * Math.PI * 2
      this.pulseSpeed = 0.008 + Math.random() * 0.012 // 呼吸速度
      this.colorSpeed = 0.004 + Math.random() * 0.006 // 颜色变化速度
    }

    update() {
      this.rotation += this.rotationSpeed
      this.pulsePhase += this.pulseSpeed
      this.hue += this.colorSpeed // 缓慢连续变色
      if (this.hue > palette.length) this.hue -= palette.length
    }

    draw(ctx: CanvasRenderingContext2D) {
      // 优化：移除 save/restore，使用 setTransform 重置
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotation)
      
      // 呼吸灯效果：透明度和发光强度随时间缓慢波动
      const pulse = (Math.sin(this.pulsePhase) + 1) / 2 // 0 到 1
      const currentAlpha = this.alpha * (0.72 + 0.28 * pulse)
      
      ctx.beginPath()
      // 优化：使用预计算顶点
      ctx.moveTo(STAR_VERTICES[0].x * this.size, STAR_VERTICES[0].y * this.size)
      for (let i = 1; i < STAR_VERTICES.length; i++) {
          ctx.lineTo(STAR_VERTICES[i].x * this.size, STAR_VERTICES[i].y * this.size)
      }
      ctx.closePath()
      
      const color = mixPaletteColor(this.hue)
      
      ctx.fillStyle = color
      ctx.globalAlpha = Math.max(0, currentAlpha)
      
      ctx.shadowBlur = this.size * (1.8 + 0.8 * pulse)
      ctx.shadowColor = color
      ctx.fill()
      
      ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
  }

  class Meteor {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    hue: number
    trail: Star[] = []
    dead = false
    head: Star

    constructor() {
      // 覆盖全屏的生成逻辑
      if (Math.random() < 0.6) {
          this.x = Math.random() * (width + height * 0.5) - height * 0.2
          this.y = -60
      } else {
          this.x = width + 60
          this.y = Math.random() * height
      }
      
      // 向左下方移动
      const speed = 3 + Math.random() * 4
      const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1) // 约45度
      this.vx = -Math.cos(angle) * speed
      this.vy = Math.sin(angle) * speed
      
      this.size = 8 + Math.random() * 8
      // 初始颜色随机，偏向粉色/紫色 (300度左右)，但也允许其他颜色
      this.hue = Math.random() * colors.length
      
      // 头部星星
      this.head = new Star(this.x, this.y, this.size, this.hue, 1)
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      const outOfBounds = this.y > height + 100 || this.x < -100
      
      // 更新头部位置和状态
      this.head.x = this.x
      this.head.y = this.y
      this.head.update()
      this.hue = this.head.hue // 同步颜色

      // 产生尾巴小星星
      if (!outOfBounds && Math.random() < 0.7) {
        const trailStar = new Star(
          this.x, 
          this.y, 
          this.size * (0.2 + Math.random() * 0.3), 
          this.hue, // 继承当前颜色
          0.6 // 初始透明度
        )
        // 尾巴星星也有轻微的自转
        trailStar.rotationSpeed = (Math.random() - 0.5) * 0.025
        this.trail.push(trailStar)
      }

      // 更新尾巴
      for (let i = this.trail.length - 1; i >= 0; i--) {
        const p = this.trail[i]
        p.update() // 更新自转、呼吸和颜色
        p.alpha -= 0.015 // 逐渐消失
        p.x += this.vx * 0.2 // 稍微跟随一点惯性
        p.y += this.vy * 0.2
        
        if (p.alpha <= 0) {
          this.trail.splice(i, 1)
        }
      }

      // 检查边界
      if (outOfBounds) {
        if (this.trail.length === 0) {
            this.dead = true
        }
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      // 绘制尾巴
      this.trail.forEach(t => t.draw(ctx))
      
      // 绘制头部
      this.head.draw(ctx)
    }
  }

  const meteors: Meteor[] = []

  function animate() {
    if (!ctx) return
    // Safety check: stop if canvas is removed from DOM
    if (!document.body.contains(canvas) || activeCanvas !== canvas) return

    ctx.clearRect(0, 0, width, height)
    
    // 增加流星出现频率 (0.015 -> 0.04)
    if (Math.random() < 0.04) { 
      meteors.push(new Meteor())
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i]
      m.update()
      m.draw(ctx)
      if (m.dead) {
        meteors.splice(i, 1)
      }
    }

    animationId = requestAnimationFrame(animate)
  }

  animate()
}

export function stopMeteorEffect() {
  if (typeof window === 'undefined') return
  
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }

  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }

  const canvas = document.getElementById('meteor-canvas')
  if (canvas) {
    canvas.remove()
  }
  activeCanvas = null
}

