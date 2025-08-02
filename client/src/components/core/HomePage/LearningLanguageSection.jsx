import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../../../components/core/HomePage/Button";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";

const LearningLanguageSection = () => {
  return (
    <div>
        <div className="text-4xl font-semibold text-center my-10">
            Your swiss knife for
            <HighlightText text={"learning any language"} />
            <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0 gap-6 lg:gap-0">
              <img
                src={Know_your_progress}
                alt="Track your progress"
                className="object-contain w-[220px] h-[180px] lg:w-[260px] lg:h-[220px] lg:-mr-20 drop-shadow-xl rounded-xl border border-richblack-100 bg-white"
                draggable="false"
              />
              <img
                src={Compare_with_others}
                alt="Compare with others"
                className="object-contain w-[180px] h-[140px] lg:w-[220px] lg:h-[180px] mx-0 lg:mx-4 drop-shadow-xl rounded-xl border border-richblack-100 bg-white"
                draggable="false"
              />
              <img
                src={Plan_your_lessons}
                alt="Plan your lessons"
                className="object-contain w-[200px] h-[160px] lg:w-[240px] lg:h-[200px] lg:-ml-20 drop-shadow-xl rounded-xl border border-richblack-100 bg-white"
                draggable="false"
              />
            </div>
          </div>

          <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="">Learn More</div>
            </CTAButton>
          </div>
    </div>
  )
}

export default LearningLanguageSection