import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

const dummyCourses = [
  {
    _id: "1",
    courseName: "JavaScript Essentials",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "John", lastName: "Doe" },
    price: 499,
  },
  {
    _id: "2",
    courseName: "React Mastery",
    thumbnail: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "Jane", lastName: "Smith" },
    price: 799,
  },
  {
    _id: "3",
    courseName: "Interview Preparation",
    thumbnail: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "Alex", lastName: "Johnson" },
    price: 999,
  },
  {
    _id: "4",
    courseName: "DSA Bootcamp",
    thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "Emily", lastName: "Williams" },
    price: 899,
  },
  {
    _id: "5",
    courseName: "Python for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "Chris", lastName: "Lee" },
    price: 599,
  },
];

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem("studynotion_theme") || "dark");
  const [fontSize, setFontSize] = useState(() => Number(localStorage.getItem("studynotion_fontsize") || 16));

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("studynotion_theme", theme);
    document.documentElement.style.fontSize = fontSize + "px";
    localStorage.setItem("studynotion_fontsize", fontSize);
  }, [theme, fontSize]);

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
      aria-label="Main navigation bar"
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[400px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[500px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        <div className="grid grid-cols-1 gap-3">
                          {dummyCourses.map((course) => (
                            <Link
                              to={`/courses/${course._id}`}
                              key={course._id}
                              className="flex items-center gap-3 rounded-lg p-2 hover:bg-richblack-100 transition"
                            >
                              <img
                                src={course.thumbnail}
                                alt={course.courseName}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <div className="font-semibold text-richblack-900 text-base">{course.courseName}</div>
                                <div className="text-xs text-richblack-600">By {course.instructor.firstName} {course.instructor.lastName}</div>
                              </div>
                              <div className="text-yellow-700 font-bold text-sm ml-2">₹{course.price}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Theme & Font Size Toggles */}
        <div className="flex items-center gap-2 mr-2">
          <button
            aria-label="Toggle dark/light theme"
            className="rounded-full p-2 bg-richblack-700 hover:bg-yellow-50 hover:text-richblack-900 transition"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <button
            aria-label="Decrease font size"
            className="rounded-full p-2 bg-richblack-700 hover:bg-yellow-50 hover:text-richblack-900 transition"
            onClick={() => setFontSize(f => Math.max(12, f - 2))}
          >
            A-
          </button>
          <button
            aria-label="Increase font size"
            className="rounded-full p-2 bg-richblack-700 hover:bg-yellow-50 hover:text-richblack-900 transition"
            onClick={() => setFontSize(f => Math.min(24, f + 2))}
          >
            A+
          </button>
        </div>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}

export default Navbar