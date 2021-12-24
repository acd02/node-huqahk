import type { PropsWithChildren } from 'react'

import Footer from './components/Footer'
import { Nav } from './components/Nav'

export function MainLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="grid template grid-rows-[auto_1fr_auto] h-full">
      <Nav />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  )
}
