import lottie from 'lottie-web'

import { information } from 'data/information'
import eyeLoader from 'assets/lottie/white-eye.json'

export class SixthPath extends HTMLElement {
  constructor() {
    super()
  }

  public connectedCallback() {
    const anim = lottie.loadAnimation({
      container: this,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: eyeLoader,
    })

    if (Math.random() < 0.3) {
      anim.play()
    } else {
      this.innerHTML = `<${information.tagName} />`
    }
  }

  public disconnectedCallback() {}
}
