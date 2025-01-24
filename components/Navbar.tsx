import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <header className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>

        <div className="flex items-center gap-5 text-black">
          <button type="submit">
            Login
          </button>
        </div>
      </nav>

    </header>
  )
}

export default Navbar
