'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  PUBLIC_NAV_LOGGED_OUT,
  PUBLIC_NAV_LOGGED_IN,
  PUBLIC_NAV_HELP,
} from '@/lib/navigation'

interface HeaderContentProps {
  isLoggedIn: boolean
}

export function HeaderContent({ isLoggedIn }: HeaderContentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = isLoggedIn ? PUBLIC_NAV_LOGGED_IN : PUBLIC_NAV_LOGGED_OUT

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0a0d1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold" style={{ letterSpacing: '-0.01em' }}>
              <span className="text-foreground">USVisa</span>
              <span className="text-primary">Bridge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Main nav links */}
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Help dropdown (logged-in only) */}
              {isLoggedIn && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Help
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {PUBLIC_NAV_HELP.map((link) => (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link href={link.href}>{link.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Auth actions */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <form action="/api/auth/signout" method="post">
                  <Button
                    type="submit"
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sign Out
                  </Button>
                </form>
              ) : (
                <Button asChild variant="default">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {!isLoggedIn && (
              <Button asChild variant="default" size="sm">
                <Link href="/auth/login">Sign In</Link>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col gap-4">
            {/* Main nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Help links (logged-in only) */}
            {isLoggedIn && (
              <>
                <div className="pt-2 border-t border-border">
                  <div className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                    Help
                  </div>
                  {PUBLIC_NAV_HELP.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base font-medium text-foreground hover:text-primary transition-colors mb-3"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Sign out (mobile, logged-in only) */}
            {isLoggedIn && (
              <div className="pt-4 border-t border-border">
                <form action="/api/auth/signout" method="post">
                  <Button
                    type="submit"
                    variant="ghost"
                    className="w-full justify-start text-base"
                  >
                    Sign Out
                  </Button>
                </form>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

