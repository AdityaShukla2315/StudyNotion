import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-hot-toast"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"

const dummyCourses = [
  {
    _id: "1",
    courseName: "JavaScript Essentials",
    courseDescription: "Learn the fundamentals of JavaScript, the most popular programming language for web development.",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "John", lastName: "Doe" },
    price: 499,
    whatYouWillLearn: "Variables, Functions, Loops, DOM Manipulation, and more.",
  },
  {
    _id: "2",
    courseName: "React Mastery",
    courseDescription: "Master React.js and build dynamic, modern web applications.",
    thumbnail: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "Jane", lastName: "Smith" },
    price: 799,
    whatYouWillLearn: "Components, State, Props, Hooks, Routing, and more.",
  },
  {
    _id: "3",
    courseName: "Interview Preparation",
    courseDescription: "Ace your tech interviews with confidence. Covers DSA, system design, and more.",
    thumbnail: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "Alex", lastName: "Johnson" },
    price: 999,
    whatYouWillLearn: "DSA, System Design, Behavioral Questions, Mock Interviews.",
  },
  {
    _id: "4",
    courseName: "DSA Bootcamp",
    courseDescription: "Comprehensive Data Structures and Algorithms course for all levels.",
    thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "Emily", lastName: "Williams" },
    price: 899,
    whatYouWillLearn: "Arrays, Linked Lists, Trees, Graphs, Sorting, Searching, and more.",
  },
  {
    _id: "5",
    courseName: "Python for Beginners",
    courseDescription: "Start your programming journey with Python. No prior experience needed!",
    thumbnail: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "Chris", lastName: "Lee" },
    price: 599,
    whatYouWillLearn: "Syntax, Data Types, Functions, OOP, and more.",
  },
];

const dummyDoubts = [
  { q: "What is the prerequisite for this course?", a: "Basic JavaScript knowledge." },
  { q: "How do I access assignments?", a: "Assignments are available in the course resources section." },
];

const dummyReviews = [
  { name: "Alice", rating: 5, comment: "Great course! Learned a lot." },
  { name: "Bob", rating: 4, comment: "Very helpful and well explained." },
  { name: "Charlie", rating: 5, comment: "Excellent content and instructor." },
];

const avatarColors = ["bg-yellow-50 text-richblack-900", "bg-blue-400 text-white", "bg-green-400 text-white", "bg-pink-400 text-white"];

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()
  const dummyCourse = dummyCourses.find((c) => c._id === courseId);

  // Declear a state to save the course details
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [doubts, setDoubts] = useState(dummyDoubts);
  const [doubtInput, setDoubtInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [answeringIdx, setAnsweringIdx] = useState(null);

  useEffect(() => {
    // Calling fetchCourseDetails fucntion to fetch the details
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        // console.log("course details res: ", res)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  // console.log("response: ", response)

  // Calculating Avg Review count
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])
  // console.log("avgReviewCount: ", avgReviewCount)

  // // Collapse all
  // const [collapse, setCollapse] = useState("")
  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  // Total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!response.success) {
    return <Error />
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    // console.log("payment loading")
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  // If dummy course, show dummy details
  if (dummyCourse) {
    return (
      <div className="min-h-screen bg-richblack-900 text-richblack-5 py-10 px-4 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-richblack-800 rounded-lg shadow-lg p-8">
          <img src={dummyCourse.thumbnail} alt={dummyCourse.courseName} className="w-full h-64 object-cover rounded mb-6" />
          <h1 className="text-3xl font-bold mb-2">{dummyCourse.courseName}</h1>
          <p className="text-lg text-richblack-200 mb-2">{dummyCourse.courseDescription}</p>
          <p className="mb-2">By <span className="font-semibold">{dummyCourse.instructor.firstName} {dummyCourse.instructor.lastName}</span></p>
          <p className="text-yellow-50 font-bold text-xl mb-4">₹{dummyCourse.price}</p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">What you'll learn</h2>
            <p>{dummyCourse.whatYouWillLearn}</p>
          </div>
          <button className="bg-yellow-50 text-richblack-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-100 transition w-full">Enroll Now (Demo)</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{response.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-richblack-900 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-yellow-50 mb-4">Doubt Box (Q&A)</h2>
        <div className="space-y-4 mb-4">
          {doubts.map((d, i) => (
            <div key={i} className="bg-richblack-800 rounded p-3">
              <div className="font-semibold text-yellow-50 mb-1">Q: {d.q}</div>
              <div className="text-richblack-200 mb-2">A: {d.a || "No answer yet."}</div>
              {answeringIdx === i ? (
                <form
                  className="flex gap-2"
                  onSubmit={e => {
                    e.preventDefault();
                    setDoubts(ds => ds.map((dd, idx) => idx === i ? { ...dd, a: answerInput } : dd));
                    setAnswerInput("");
                    setAnsweringIdx(null);
                    toast("Answer revealed!", { icon: "✅" });
                  }}
                >
                  <input
                    className="flex-1 bg-richblack-900 border border-richblack-700 rounded p-1 text-richblack-5"
                    value={answerInput}
                    onChange={e => setAnswerInput(e.target.value)}
                    placeholder="Your answer..."
                    required
                  />
                  <button type="submit" className="bg-yellow-50 text-richblack-900 px-3 py-1 rounded font-semibold">Submit</button>
                </form>
              ) : !d.a && (
                <button className="text-yellow-50 text-xs underline" onClick={() => setAnsweringIdx(i)}>Answer</button>
              )}
            </div>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={e => {
            e.preventDefault();
            setDoubts(ds => [...ds, { q: doubtInput, a: "" }]);
            setDoubtInput("");
          }}
        >
          <input
            className="flex-1 bg-richblack-800 border border-richblack-700 rounded p-2 text-richblack-5"
            value={doubtInput}
            onChange={e => setDoubtInput(e.target.value)}
            placeholder="Ask a question..."
            required
          />
          <button type="submit" className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded font-semibold">Post</button>
        </form>
      </div>
      <div className="mt-10 bg-richblack-900 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-yellow-50 mb-4">Reviews & Ratings</h2>
        <div className="space-y-3 mb-6">
          {ratingAndReviews.map((r, i) => (
            <div key={i} className="bg-richblack-800 rounded p-3 flex items-center gap-3" aria-label="Course review">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg ${avatarColors[i % avatarColors.length]}`}
                aria-label={`Avatar for ${r.reviewer.firstName} ${r.reviewer.lastName}`}
              >
                {r.reviewer.firstName[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-yellow-50">{r.reviewer.firstName} {r.reviewer.lastName}</span>
                  <span className="text-yellow-50">{"★".repeat(r.rating)}</span>
                </div>
                <div className="text-richblack-200">{r.comment}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded font-semibold"
          onClick={() => {
            toast.success("Review submitted!");
          }}
        >
          Submit Review
        </button>
      </div>
      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseDetails