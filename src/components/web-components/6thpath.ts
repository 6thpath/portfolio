import { information } from 'data/information'

export class SixthPath extends HTMLElement {
  static get observedAttributes() {
    return ['onClick']
  }

  constructor() {
    super()

    const shadowDOM = this.attachShadow({ mode: 'closed' })
    shadowDOM.innerHTML = `<${information.tagName} />`
  }

  public connectedCallback() {}

  public disconnectedCallback() {}
}
