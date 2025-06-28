import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div
      className={`w-[360px] lg:w-[30%] ${
        currentCard === cardData?.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-richblack-800"
      }  text-richblack-25 h-[320px] box-border cursor-pointer rounded-xl transition-all duration-200 hover:scale-[1.03] hover:shadow-lg`}
      onClick={() => setCurrentCard(cardData?.heading)}
      aria-label={`Select course card: ${cardData?.heading}`}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-8 flex flex-col gap-4">
        <div
          className={` ${
            currentCard === cardData?.heading && "text-richblack-800"
          } font-bold text-[22px] leading-tight mb-1`}
        >
          {cardData?.heading}
        </div>

        <div className="text-richblack-400 text-base mb-2">{cardData?.description}</div>
      </div>

      <div
        className={`flex justify-between items-center ${
          currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
        } px-8 py-4 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
      <div className="flex justify-center gap-4 pb-4">
        <button
          className="bg-yellow-50 text-richblack-900 font-semibold px-5 py-2 rounded-md hover:bg-yellow-100 active:bg-yellow-200 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-50"
          aria-label="View Details"
        >
          View Details
        </button>
        <button
          className="bg-richblack-900 border border-yellow-50 text-yellow-50 font-semibold px-5 py-2 rounded-md hover:bg-yellow-900 active:bg-yellow-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-50"
          aria-label="Enroll Now"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;