import { useEffect, useRef } from 'react'
import {
  Link,
  LoaderFunction,
  MetaFunction,
  Outlet,
  useLoaderData,
  useLocation,
  useOutletContext,
} from 'remix'

import { disableScrollRestoration } from '~handles'
import type { User } from '~types/user'

const handle = disableScrollRestoration.handle
const meta: MetaFunction = ({ data }) => {
  return {
    title: data?.name ?? 'user not found',
  }
}

type LoaderData = User
type UseUserInfos = { email: string; name: string; id: string }

const loader: LoaderFunction = async ({ params }): Promise<LoaderData | null> => {
  console.log('loader called with params.userId -> ✅ ', params.userId)

  const data = (await (
    await fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`)
  ).json()) as User

  return data
}

function User() {
  const { id, name, email, phone } = useLoaderData<LoaderData>()

  const rootRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const isOnEditPage = pathname.includes('edit')

  useEffect(() => {
    rootRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [pathname])

  const GridRow = ({ label, value }: { label: string; value: string }) => (
    <div>
      <span className="block text-sm font-medium text-gray-500">{label}</span>
      <span className="block mt-1 text-sm text-gray-900">{value}</span>
    </div>
  )

  const userDetailsBlock = (
    <div ref={rootRef}>
      <h4 className="my-4 text-2xl font-bold text-gray-900">User details:</h4>
      <div className="grid grid-cols-[1fr_1fr] max-w-[30rem] gap-4 break-all">
        <GridRow label="Name" value={name} />
        <GridRow label="Email" value={email} />
        <GridRow label="Phone" value={phone} />
        <Link
          className="[grid-column:1_/_1] row text-center rounded-md px-4 py-2 font-medium bg-purple-400"
          to="edit"
        >
          edit user email
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {isOnEditPage ? null : userDetailsBlock}
      <Outlet context={{ email, id, name }} />
    </>
  )
}

function ErrorBoundary() {
  return <h4 className="my-4 text-2xl font-bold text-gray-900">User not found</h4>
}

function useUserInfos() {
  return useOutletContext<UseUserInfos>()
}

export default User
export { loader, meta, handle, ErrorBoundary, useUserInfos }
