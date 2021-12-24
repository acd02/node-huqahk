import { LoaderFunction, MetaFunction, NavLink, Outlet, useLoaderData } from 'remix'

import type { User } from '~types/user'

const meta: MetaFunction = () => {
  return {
    title: 'users',
  }
}

type LoaderData = User[]

const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const data = (await (
    await fetch('https://jsonplaceholder.typicode.com/users')
  ).json()) as User[]

  return data
}

export default function Users() {
  const data = useLoaderData<LoaderData>()

  const userLinks = data.map(({ name, id }) => (
    <li key={id} className="block mb-2 w-[fit-content]">
      <NavLink
        prefetch="intent"
        className={({ isActive }) =>
          isActive
            ? 'border-b border-b-purple-400 text-purple-400'
            : 'border-b border-b-transparent'
        }
        to={String(id)}
      >
        {name}
      </NavLink>
    </li>
  ))

  return (
    <>
      <ul>{userLinks}</ul>
      <Outlet />
    </>
  )
}

export { meta, loader }
