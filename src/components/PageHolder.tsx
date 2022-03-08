import { ReactComponent as PuffLoader } from 'assets/svg/puff.svg'

export const PageHolder: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-[#111a20]">
      <PuffLoader width={88} height={88} />
    </div>
  )
}
