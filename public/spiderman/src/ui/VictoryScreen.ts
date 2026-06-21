export class VictoryScreen {
  private screen: HTMLElement
  private timeEl: HTMLElement
  private restartBtn: HTMLElement
  private shareBtn: HTMLElement
  private onRestart: (() => void) | null = null

  constructor() {
    this.screen = document
      .getElementById('victory-screen')!
    this.timeEl = document
      .getElementById('victory-time')!
    this.restartBtn = document
      .getElementById('btn-restart')!
    this.shareBtn = document
      .getElementById('btn-share')!

    this.restartBtn.addEventListener('click', 
      () => this.onRestart?.())
    this.shareBtn.addEventListener('click', 
      () => this.share())
  }

  show(elapsedSeconds: number): void {
    const mins = Math.floor(elapsedSeconds / 60)
    const secs = Math.floor(elapsedSeconds % 60)
    const timeStr = 
      `${mins.toString().padStart(2,'0')}:${
        secs.toString().padStart(2,'0')}`

    this.timeEl.textContent = timeStr
    this.screen.style.display = 'block'
    this.shareText = timeStr
  }

  private shareText: string = ''

  private share(): void {
    const text = 
      `🕷 I collected all 10 Daily Bugle photos ` +
      `in ${this.shareText} playing ` +
      `Spider-Man Brand New Day!\n` +
      `spidey.growxlabs.tech`
    navigator.clipboard.writeText(text)
      .then(() => {
        this.shareBtn.textContent = 'COPIED! ✓'
        setTimeout(() => {
          this.shareBtn.textContent = 'SHARE SCORE'
        }, 2000)
      })
  }

  setOnRestart(cb: () => void): void {
    this.onRestart = cb
  }

  hide(): void {
    this.screen.style.display = 'none'
  }
}
