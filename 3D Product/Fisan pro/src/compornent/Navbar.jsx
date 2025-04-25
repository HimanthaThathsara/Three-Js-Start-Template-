

const Navbar = () => (
  <nav className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-white text-xs z-40"  id="navbar">
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 bg-black rounded-full"></div>{" "}
      <span className="text-lg font-semibold">FF Product</span>
    </div>

    <div className="hidden md:flex space-x-8">
      <a href="#intro" className="text-black font-medium hover:text-gray-700 ">
        Intro
      </a>
      <a
        href="#experience"
        className="text-black font-medium hover:text-gray-700 "
      >
        Experience
      </a>
      <a href="#colors" className="text-black font-medium hover:text-gray-700 ">
        Colors
      </a>
      <a
        href="#tech-specs"
        className="text-black font-medium hover:text-gray-700 "
      >
        Tech Specs
      </a>
    </div>

    <div className="flex items-center space-x-4">
      <button aria-label="Search" className="text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.5-1.5 7.5 7.5 0 01-1.5 1.5z"
          />
        </svg>
      </button>
      <button className="px-4 py-2 text-white text-xs bg-black rounded-full hover:bg-gray-800">
        Buy
      </button>
    </div>
  </nav>
);

export default Navbar;