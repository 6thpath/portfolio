import { SixthPath } from './6thpath'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['sixth-path']: React.DetailedHTMLProps<React.HTMLAttributes<SixthPath>, SixthPath>
    }
  }
}
