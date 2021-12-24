import { NavLink } from 'remix'

export function Nav() {
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-purple-400 border-transparent whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium border-b border-b-purple-400'
      : 'text-gray-900 border-transparent whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'

  return (
    <nav className="mx-4 text-center border-b border-gray-200">
      <div className="-mb-px flex gap-x-4 justify-center px-4">
        <NavLink className={linkClassName} to="/">
          home
        </NavLink>
        <NavLink className={linkClassName} to="users">
          users
        </NavLink>
      </div>
    </nav>
  )
}
