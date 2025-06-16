import React from 'react'

const Header = () => {
  return (
    <header className="w-full z-50 fixed top-0 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-white text-2xl font-bold tracking-wide">
          Path<span className="text-indigo-400">Pilot</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 text-white text-sm font-medium">
          <Link href="#features" className="hover:text-indigo-300 transition">Features</Link>
          <Link href="#analyze" className="hover:text-indigo-300 transition">Resume Analyzer</Link>
          <Link href="#about" className="hover:text-indigo-300 transition">About</Link>
          <Link href="#contact" className="hover:text-indigo-300 transition">Contact</Link>
        </nav>

        {/* CTA + Dark Mode */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button asChild className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-md rounded-full px-6">
            <Link href="/analyze">Try Now</Link>
          </Button>
        </div>

        {/* Mobile Menu (Optional) */}
        <div className="md:hidden text-white">
          <Menu size={24} />
        </div>
      </div>
    </header>
  )
}

export default Header
