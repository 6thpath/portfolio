import { Background } from 'components/Background'
import { NavBar } from 'components/Navbar'
import { Section } from 'components/Section'
import { Sections } from 'types/enums'

const App: React.FC = () => {
  return (
    <div className="relative">
      <Background />

      <NavBar />

      <main>
        <Section id={Sections.About} />
        <Section id={Sections.Projects} />
        <Section id={Sections.Resume} />
        <Section id={Sections.Contact} />
      </main>
    </div>
  )
}

export default App
