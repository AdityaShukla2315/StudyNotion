import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import React, { useState } from "react"

import Sidebar from "../components/core/Dashboard/Sidebar"

const dummyLearningPath = [
  { name: "JavaScript Essentials", desc: "Start with the basics of JavaScript." },
  { name: "React Mastery", desc: "Advance to building modern web apps." },
  { name: "DSA Bootcamp", desc: "Sharpen your problem-solving skills." },
  { name: "Interview Preparation", desc: "Get ready for job interviews." },
]

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [learningPath] = useState(dummyLearningPath)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          {/* My Learning Path */}
          <div className="mb-8 bg-richblack-900 rounded p-6">
            <h2 className="text-xl font-bold text-yellow-50 mb-2">My Learning Path (AI Recommended)</h2>
            <ol className="list-decimal pl-6 space-y-2">
              {learningPath.map((step, i) => (
                <li key={i} className="text-richblack-5">
                  <span className="font-semibold text-yellow-50">{step.name}:</span> {step.desc}
                </li>
              ))}
            </ol>
            <div className="mt-3 text-sm text-richblack-200">Ask the AI Chatbot for a personalized path!</div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard