import React, { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"


function CourseSubSectionAccordion({ subSec }) {
  return (
    <div className="w-full">
      <div
        className="flex items-center gap-4 px-4 py-3 rounded-lg bg-richblack-800 hover:bg-richblack-700 transition cursor-pointer group border border-transparent hover:border-yellow-100 shadow-sm mb-2"
        title={subSec?.title}
      >
        <span className="text-yellow-100 text-xl group-hover:scale-110 transition-transform">
          <HiOutlineVideoCamera />
        </span>
        <p className="flex-1 text-richblack-50 font-medium truncate group-hover:text-yellow-50">
          {subSec?.title}
        </p>
        {/* Optionally, add duration or other info here */}
      </div>
    </div>
  );
}

export default CourseSubSectionAccordion