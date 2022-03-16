import { ContactType } from 'types/enums'
import { information } from 'data/information'

import { ReactComponent as IconGithub } from 'assets/svg/github.svg'
import { ReactComponent as IconLinkedIn } from 'assets/svg/linkedin.svg'

export const Contacts: React.FC = () => {
  const contacts = [
    {
      type: ContactType.Github,
      Component: IconGithub,
      tooltip: information.profile.github.label,
      href: information.profile.github.url,
    },
    {
      type: ContactType.LinkedIn,
      Component: IconLinkedIn,
      tooltip: information.profile.linkedIn.label,
      href: information.profile.linkedIn.url,
    },
  ]

  return (
    <div className="pointer-events-none container fixed bottom-[20px] md:top-[40%] inset-x-0 z-10 mx-auto px-[16px] transition-all">
      <div className="pointer-events-auto w-full md:w-[70px] flex md:flex-col justify-end items-center gap-[20px]">
        {contacts.map(({ type, Component, tooltip, href }) => (
          <a
            className="cursor-pointer w-[40px] h-[40px] flex justify-center items-center text-white hover:text-gray-300"
            key={type}
            title={tooltip}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Component className="transition-all" width={30} height={30} />
          </a>
        ))}
      </div>
    </div>
  )
}
