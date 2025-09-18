'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
// import { Logo } from '@/components/Logo' // entfernt
import { Navigation } from '@/components/Navigation'
import { SectionProvider, type Section } from '@/components/SectionProvider'

// PNG-Logos (Default-Import, ohne geschweifte Klammern)
import LogoBlack from '@/images/logos/logo-black.png'
import LogoWhite from '@/images/logos/logo-white.png'

export function Layout({
  children,
  allSections,
}: {
  children: React.ReactNode
  allSections: Record<string, Array<Section>>
}) {
  const pathname = usePathname()

  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <div className="h-full lg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 xl:w-80 lg:dark:border-white/10">
            {/* Sidebar: Logo (Light=weißes PNG, Dark=schwarzes PNG) */}
            <div className="hidden lg:flex">
              <Link href="/" aria-label="Home" className="inline-flex items-center">
                <span className="sr-only">Home</span>
                {/* Light mode */}
                <Image
                  src={LogoWhite}
                  alt="Pipvaro"
                  className="h-6 h-13 w-auto dark:hidden"
                  priority
                />
                {/* Dark mode */}
                <Image
                  src={LogoBlack}
                  alt=""
                  className="hidden h-13 w-auto dark:block"
                  priority
                />
              </Link>
            </div>

            {/* Top header (zentral oben, mobil/desktop) */}
            <Header />

            {/* Sidebar-Navigation */}
            <Navigation className="hidden lg:mt-10 lg:block" />
          </div>
        </motion.header>

        {/* Content-Spalte rechts */}
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}
