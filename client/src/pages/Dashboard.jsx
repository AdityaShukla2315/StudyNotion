import { useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import React, { useState } from "react"

import Sidebar from "../components/core/Dashboard/Sidebar"

const dummyLearningPath = [
  {
    name: "1. Core Programming Foundations",
    desc: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Master a language (JavaScript, Python, or Java): syntax, data types, functions, OOP, error handling.</li>
          <li>Recommended: <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer" className="text-yellow-100 underline">freeCodeCamp</a>, <a href="https://www.codecademy.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-100 underline">Codecademy</a></li>
          <li>Build: Calculator, To-Do App, Weather App</li>
        </ul>
      </>
    )
  },
  {
    name: "2. Version Control & Collaboration",
    desc: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Learn Git & GitHub: branching, pull requests, resolving conflicts.</li>
          <li>Contribute to open source or collaborate on group projects.</li>
          <li>Recommended: <a href="https://learngitbranching.js.org/" target="_blank" rel="noopener noreferrer" className="text-yellow-100 underline">Learn Git Branching</a></li>
        </ul>
      </>
    )
  },
  {
    name: "3. Frontend & UI Engineering",
    desc: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Deep dive into HTML, CSS, Responsive Design, Accessibility.</li>
          <li>Master React (or Angular/Vue): hooks, state, routing, context, testing.</li>
          <li>Build: Portfolio, Blog, E-commerce UI</li>
          <li>Recommended: <a href="https://react.dev/learn" target="_blank" rel="noopener noreferrer" className="text-yellow-100 underline">React Docs</a>, <a href="https://css-tricks.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-100 underline">CSS-Tricks</a></li>
        </ul>
      </>
    )
  },
  {
    name: "4. Backend & APIs",
    desc: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Learn Node.js/Express, Python/Django, or Java/Spring Boot.</li>
          <li>Design RESTful APIs, connect to databases (MongoDB, PostgreSQL).</li>
          <li>Build: REST API, Authentication, CRUD App</li>
          <li>Recommended: <a href="https://roadmap.sh/backend" target="_blank" rel="noopener noreferrer" className="text-yellow-100 underline">Backend Roadmap</a></li>
        </ul>
      </>
    )
  },
  {
    name: "5. Data Structures, Algorithms & Problem Solving",
    desc: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Practice on LeetCode, HackerRank, or CodeSignal.</li>
          <li>Focus: arrays, strings, trees, graphs, recursion, sorting, searching.</li>
          <li>Join a study group or participate in weekly coding challenges.</li>
        </ul>
      </>
    )
  },
  {
    name: "6. DevOps & Deployment",
    desc: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Learn basics of CI/CD, Docker, and cloud deployment (Vercel, Netlify, AWS).</li>
          <li>Automate testing and deployment pipelines.</li>
          <li>Recommended: <a href="https://roadmap.sh/devops" target="_blank" rel="noopener noreferrer" className="text-yellow-100 underline">DevOps Roadmap</a></li>
        </ul>
      </>
    )
  },
  {
    name: "7. Interview & Career Prep",
    desc: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Prepare for behavioral and technical interviews.</li>
          <li>Practice mock interviews, refine your resume, and network with professionals.</li>
          <li>Recommended: <a href="https://www.pramp.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-100 underline">Pramp</a>, <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-100 underline">LinkedIn</a></li>
        </ul>
      </>
    )
  },
]

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [learningPath] = useState(dummyLearningPath)
  const location = useLocation();

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
          {/* Show Roadmap only on /dashboard/roadmap */}
          {location.pathname === "/dashboard/roadmap" && (
            <section className="mb-10 bg-gradient-to-br from-yellow-50/10 to-richblack-900 rounded-2xl shadow-lg p-8 border border-yellow-100 flex flex-col items-center">
              <h2 className="text-3xl font-extrabold text-yellow-50 mb-4 tracking-tight text-center flex items-center gap-2">
                <span role="img" aria-label="roadmap">🗺️</span> Your Personalized Roadmap
              </h2>
              <p className="text-richblack-200 text-center mb-6 max-w-2xl mx-auto text-lg">
                Follow this expert-recommended path to master your skills step by step. You can always ask the AI Chatbot for a custom journey!
              </p>
              <ol className="relative border-l-2 border-yellow-100 pl-8 space-y-8 w-full max-w-xl mx-auto">
                {learningPath.map((step, i) => (
                  <li key={i} className="group flex flex-col gap-1 relative">
                    <div className="absolute -left-5 top-1.5 w-4 h-4 rounded-full bg-yellow-50 border-2 border-yellow-200 group-hover:scale-110 transition-transform"></div>
                    <span className="font-bold text-yellow-50 text-lg">{step.name}</span>
                    <span className="text-richblack-100 text-base">{step.desc}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-col items-center">
                <button
                  className="bg-yellow-50 text-richblack-900 font-semibold px-6 py-2 rounded-lg shadow hover:bg-yellow-100 transition"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Ask AI Chatbot for a Personalized Path
                </button>
                <span className="mt-2 text-xs text-richblack-300">Powered by AI</span>
              </div>
            </section>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard