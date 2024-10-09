"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import logo from "@/public/logo.png"  // Assuming this is the correct path to your logo image
import { signIn ,signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import DropDownMenue from "@/app/components/DropDownMenue"
export function Navbar() {
  const { data: session ,status } = useSession()
  
  return (
    <nav className="fixed inset-x-1 top-0 z-50 bg-white shadow-sm ">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Recipe <span className="font-extralight">Share</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              href="/recipes/new"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Create
            </Link>
            <Link
              href="/recipes/explore"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Explore
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Search
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Profile
            </Link>
          </nav>
          <DropDownMenue/>
        </div>
      </div>
    </nav>
  )
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
