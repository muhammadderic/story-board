import Image from "next/image"
import Link from "next/link"
import { auth, signOut, signIn } from "@/auth"
import { BadgePlus } from "lucide-react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="border hover:border-2 border-black-800"
          />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {
            session && session.user ? (
              <>
                <Link href="/story/create" className="max-sm:hidden py-2 px-4 border hover:border-2 border-black-800 rounded-md">
                  <span>Create</span>
                  <BadgePlus className="size-6 sm:hidden" />
                </Link>

                <form action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }} className="max-sm:hidden py-2 px-4 border hover:border-2 border-black-800 rounded-md">
                  <button type="submit">
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <form action={async () => {
                "use server";

                await signIn("github");
              }} className="max-sm:hidden py-2 px-4 border hover:border-2 border-black-800 rounded-md">
                <button type="submit">
                  Login
                </button>
              </form>
            )
          }
        </div>
      </nav>

    </header>
  )
}

export default Navbar
