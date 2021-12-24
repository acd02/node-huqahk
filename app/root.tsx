import type { LinksFunction } from 'remix'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useMatches,
} from 'remix'

import { MainLayout } from '~components/layouts'

import tailwindStyles from './tailwind.css'

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  const matches = useMatches()
  const scrollRestorationIsDisabled = matches.some(
    match => match.handle?.scrollRestoration === false
  )

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        {!scrollRestorationIsDisabled && <ScrollRestoration />}
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

// https://remix.run/api/app#links
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStyles }]
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Document title="Error!">
      <MainLayout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your users to see.
          </p>
        </div>
      </MainLayout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch()

  const message = (() => {
    switch (caught.status) {
      case 401:
        return (
          <p>
            Oops! Looks like you tried to visit a page that you do not have access to.
          </p>
        )
        break
      case 404:
        return <p>Oops! Looks like you tried to visit a page that does not exist.</p>

      default:
        throw new Error(caught.data || caught.statusText)
    }
  })()

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <MainLayout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </MainLayout>
    </Document>
  )
}
