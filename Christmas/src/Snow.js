export default class Snow {
  constructor(el = 'body', flake = '❄') {
    this.stage = document.querySelector(el)
    this.snow = document.createElement('span')
    this.flake = flake
    this.color = '#fff'
    this.sizeRange = [20, 60]
    this.topRange = [-this.sizeRange[1], this.stage.clientHeight - this.sizeRange[1]]
    this.leftRange = [0, this.stage.clientWidth - this.sizeRange[1]]
    this.Xdirection = parseInt(Math.random() * 10) % 2
    this.speed = this.getRandom([1, 5])
    this.opacityRange = [0.4, 1]
    this.durationTime = this.getRandom([8000, 11000])
    this.render()
    this.autoDestroy()
  }
  style() {
    return `color: ${this.color};
            position: absolute;
            left: ${this.left}px;
            top: ${this.top}px;
            font-size: ${this.size}px;
            opacity: ${this.opacity};
            `
  }
  render() {
    this.left = this.getRandom(this.leftRange)
    this.top = this.topRange[0]
    this.size = this.getRandom(this.sizeRange)
    this.opacity = this.getRandom(this.opacityRange, 1)
    this.snow.style = this.style()
    this.snow.innerHTML = this.flake
    this.stage.append(this.snow)
    this.animate()
  }
  updateStyle() {
    if (this.top < this.topRange[1] && this.left > this.leftRange[0] && this.left < this.leftRange[1]) {
      this.left = this.Xdirection ? this.left + this.speed : this.left - this.speed
      this.top += this.speed
      if (this.snow) this.snow.style = this.style()
    } else {
      this.destroy()
    }
  }
  animate() {
    if (requestAnimationFrame) {
      this.updateStyle()
      this.snow && requestAnimationFrame(this.animate.bind(this))
    } else {
      let timer = setInterval(() => {
        this.updateStyle()
        if (!this.snow) clearTimeout(timer)
      }, 16)
    }
  }
  autoDestroy() {
    let timer = setTimeout(() => {
      this.snow && this.destroy()
      clearTimeout(timer)
    }, this.durationTime)
  }
  destroy() {
    if (this.snow)
      this.stage.removeChild(this.snow)
    this.snow = null
  }
  getRandom(rangeArray, toFixed) {
    let min = rangeArray[0]
    let max = rangeArray[1]
    let range = max - min
    let rand = Math.random()
    if (toFixed) {
      return Number((min + rand * range).toFixed(toFixed))
    } else {
      return min + Math.round(rand * range)
    }
  }
}