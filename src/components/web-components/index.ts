import { SixthPath } from './6thpath'

const register = (elementTagName: string, constructor: CustomElementConstructor) => {
  if (!customElements.get(elementTagName)) {
    customElements.define(elementTagName, constructor)
  }
}

export const allWebComponents = <const>[{ tagName: 'sixth-path', component: SixthPath }]

export const registerAllWebComponents = () => {
  allWebComponents.forEach((element) => {
    register(element.tagName, element.component)
  })
}
