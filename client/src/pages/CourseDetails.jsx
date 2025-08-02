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
      <div className="min-h-screen bg-gradient-to-br from-richblack-900 to-richblack-800 text-richblack-5 py-10 px-2 flex flex-col items-center">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img src={dummyCourse.thumbnail} alt={dummyCourse.courseName} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-3xl font-extrabold text-yellow-50 drop-shadow mb-2">{dummyCourse.courseName}</h1>
                <p className="text-lg text-richblack-200 mb-2 max-w-xl">{dummyCourse.courseDescription}</p>
                <p className="mb-2 text-sm">By <span className="font-semibold text-yellow-100">{dummyCourse.instructor.firstName} {dummyCourse.instructor.lastName}</span></p>
              </div>
            </div>
            <div className="bg-richblack-800 rounded-xl p-6 shadow flex flex-col gap-4">
              <h2 className="text-xl font-bold text-yellow-50 mb-2">What you'll learn</h2>
              <p className="text-richblack-100 text-base">{dummyCourse.whatYouWillLearn}</p>
            </div>
          </div>
          {/* Sidebar */}
          <div className="md:col-span-1 flex flex-col gap-6 sticky top-8 h-fit">
            <div className="bg-richblack-900 rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-yellow-100">
              <div className="text-yellow-50 font-bold text-2xl mb-2">₹{dummyCourse.price}</div>
              <button className="bg-yellow-50 text-richblack-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-100 transition w-full">Enroll Now (Demo)</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with overlay and sticky sidebar */}
      <div className="relative w-full bg-gradient-to-br from-richblack-900 to-richblack-800 pb-10">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10">
          {/* Main Content */}
          <div className="col-span-2 flex flex-col gap-8">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h1 className="text-4xl font-extrabold text-yellow-50 drop-shadow mb-2">{courseName}</h1>
                <p className="text-lg text-richblack-200 mb-2 max-w-2xl">{courseDescription}</p>
                <div className="flex flex-wrap items-center gap-4 text-md mb-2">
                  <span className="text-yellow-25 font-bold text-xl">{avgReviewCount}</span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                  <span className="text-richblack-200">{`(${ratingAndReviews.length} reviews)`}</span>
                  <span className="text-richblack-200">{`${studentsEnrolled.length} students enrolled`}</span>
                </div>
                <p className="text-sm text-richblack-100">Created By <span className="font-semibold text-yellow-100">{instructor.firstName} {instructor.lastName}</span></p>
                <div className="flex flex-wrap gap-5 text-base mt-2">
                  <p className="flex items-center gap-2">
                    <BiInfoCircle /> Created at {formatDate(createdAt)}
                  </p>
                  <p className="flex items-center gap-2">
                    <HiOutlineGlobeAlt /> English
                  </p>
                </div>
              </div>
            </div>
            {/* What you'll learn */}
            <div className="bg-richblack-800 rounded-xl p-8 shadow flex flex-col gap-4 border border-richblack-700">
              <h2 className="text-2xl font-bold text-yellow-50 mb-2">What you'll learn</h2>
              <div className="text-richblack-100 text-base mt-2">
                <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
              </div>
            </div>
            {/* Course Content Section */}
            <div className="bg-richblack-900 rounded-xl p-8 shadow border border-richblack-700">
              <div className="flex flex-col gap-3 mb-4">
                <p className="text-2xl font-bold text-yellow-50">Course Content</p>
                <div className="flex flex-wrap justify-between gap-2 text-richblack-200 text-sm">
                  <div className="flex gap-2">
                    <span>
                      {courseContent.length} section(s)
                    </span>
                    <span>
                      {totalNoOfLectures} lecture(s)
                    </span>
                    <span>{response.data?.totalDuration} total length</span>
                  </div>
                  <div>
                    <button
                      className="text-yellow-25 underline text-sm"
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
            </div>
            {/* Author Details */}
            <div className="bg-richblack-800 rounded-xl p-8 shadow border border-richblack-700 flex flex-col gap-4">
              <p className="text-2xl font-bold text-yellow-50">Author</p>
              <div className="flex items-center gap-4 py-2">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover border-2 border-yellow-100"
                />
                <p className="text-lg font-semibold text-richblack-50">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-100">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
          {/* Sidebar */}
          <div className="col-span-1 flex flex-col gap-8 sticky top-8 h-fit">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      {/* The modern layout is now the only Course Details section. */}
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