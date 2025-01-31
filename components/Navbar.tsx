import Image from "next/image"
import Link from "next/link"
import { auth, signOut, signIn } from "@/auth"
import { BadgePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-6 py-2 bg-white shadow-sm sticky top-0 z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="rounded-lg"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-black">
          {session && session.user ? (
            <>
              {/* Create Story Link */}
              <Link
                href="/story/create"
                className="flex items-center gap-2 text-md font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                <span className="max-sm:hidden">Create Story</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              {/* Logout Button */}
              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}>
                <button
                  type="submit"
                  className="text-md font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 max-sm:hidden"
                >
                  Logout
                </button>
              </form>

              {/* User Avatar */}
              <Link href={`/user/${session?.id}`} className="hover:opacity-80 transition-opacity duration-300">
                <Avatar className="size-10 border-0 hover:border-2 border-blue-600">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {session?.user?.name?.charAt(0) || "AV"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            // Login Button
            <form action={async () => {
              "use server";
              await signIn("github");
            }}>
              <button
                type="submit"
                className="text-md font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 max-sm:hidden"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar
