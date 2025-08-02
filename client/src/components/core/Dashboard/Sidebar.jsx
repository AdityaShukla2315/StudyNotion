import { useState } from "react"
import { VscSignOut, VscMenu, VscChromeClose } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [open, setOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }


  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-richblack-800 p-2 rounded-full border border-richblack-700 text-yellow-50 shadow-lg"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close sidebar" : "Open sidebar"}
      >
        {open ? <VscChromeClose size={24} /> : <VscMenu size={24} />}
      </button>
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full min-w-[250px] z-40 bg-richblack-900 border-r border-richblack-700 py-8 px-4 md:rounded-tr-3xl md:rounded-br-3xl shadow-2xl transition-transform duration-300 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Sidebar navigation"
      >
        {/* User Profile Section */}
        <div className="flex flex-col items-center gap-2 mb-8 p-4 rounded-xl bg-richblack-800 shadow">
          <img
            src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.firstName || 'U')}&background=random`}
            alt="sidebar-profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-yellow-100 shadow"
          />
          <div className="text-center mt-2">
            <div className="text-base font-semibold text-richblack-5 truncate max-w-[180px]">{user?.firstName + " " + user?.lastName}</div>
            <div className="text-xs text-richblack-300 truncate max-w-[180px]">{user?.email}</div>
          </div>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </nav>
        <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700" />
        {/* Settings & Logout */}
        <div className="flex flex-col gap-1">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-800 rounded transition flex items-center gap-x-2"
            aria-label="Logout"
          >
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      {/* Overlay for mobile */}
      {open && <div className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden" onClick={() => setOpen(false)} aria-label="Close sidebar overlay"></div>}
    </>
  )
}