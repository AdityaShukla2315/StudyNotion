import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import React from "react"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

const dummyBadges = [
  { name: "First Enrollment", icon: "🏅" },
  { name: "Quiz Master", icon: "🧠" },
  { name: "Active Learner", icon: "🔥" },
]

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="mb-10 text-4xl font-bold text-richblack-5 text-center tracking-tight">My Profile</h1>
      {/* Profile Card */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 rounded-2xl border border-richblack-700 bg-richblack-800 shadow-lg p-8 mb-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img
            src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.firstName || 'U')}&background=random`}
            alt={`profile-${user?.firstName}`}
            className="w-28 h-28 rounded-full object-cover border-4 border-yellow-100 shadow-md"
          />
          <div className="text-center md:text-left">
            <p className="text-2xl font-semibold text-richblack-5">{user?.firstName + " " + user?.lastName}</p>
            <p className="text-md text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit Profile"
          onclick={() => navigate("/dashboard/settings")}
          className="mt-4 md:mt-0"
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* About Section */}
      <div className="mb-10 rounded-xl border border-richblack-700 bg-richblack-900 p-8 flex flex-col gap-4 shadow">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💬</span>
            <p className="text-xl font-semibold text-richblack-5">About</p>
          </div>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <blockquote className={`pl-4 border-l-4 ${user?.additionalDetails?.about ? 'border-yellow-100 text-richblack-5' : 'border-richblack-600 text-richblack-400'} text-md font-medium`}>{user?.additionalDetails?.about ?? "Write Something About Yourself"}</blockquote>
      </div>

      {/* Personal Details Section */}
      <div className="mb-10 rounded-xl border border-richblack-700 bg-richblack-900 p-8 shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗂️</span>
            <p className="text-xl font-semibold text-richblack-5">Personal Details</p>
          </div>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-sm text-richblack-600 flex items-center gap-1">First Name</p>
              <p className="text-base font-medium text-richblack-5">{user?.firstName}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-richblack-600 flex items-center gap-1">Email</p>
              <p className="text-base font-medium text-richblack-5">{user?.email}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-richblack-600 flex items-center gap-1">Gender</p>
              <p className="text-base font-medium text-richblack-5">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-sm text-richblack-600 flex items-center gap-1">Last Name</p>
              <p className="text-base font-medium text-richblack-5">{user?.lastName}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-richblack-600 flex items-center gap-1">Phone Number</p>
              <p className="text-base font-medium text-richblack-5">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-richblack-600 flex items-center gap-1">Date Of Birth</p>
              <p className="text-base font-medium text-richblack-5">{formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="rounded-xl border border-richblack-700 bg-richblack-900 p-6 shadow">
        <h3 className="text-lg font-bold text-yellow-50 mb-4 flex items-center gap-2"><span>🏆</span>Your Badges</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {dummyBadges.map((badge) => (
            <div key={badge.name} className="flex flex-col items-center bg-richblack-800 rounded-lg p-4 min-w-[120px] shadow hover:scale-105 transition-transform" title={badge.name}>
              <span className="text-4xl mb-2">{badge.icon}</span>
              <span className="text-yellow-50 text-base font-semibold text-center">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}