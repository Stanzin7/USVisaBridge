'use client'

import { usePathname } from 'next/navigation'
import { Footer } from './Footer'

export function FooterWrapper() {
  const pathname = usePathname()
  
  // Hide footer on auth pages
  if (pathname?.startsWith('/auth')) {
    return null
  }
  
  return <Footer />
}

