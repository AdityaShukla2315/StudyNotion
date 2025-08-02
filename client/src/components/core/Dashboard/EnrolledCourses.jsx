import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";

// Hardcoded YouTube playlists
const youtubePlaylists = [
  // Core Programming
  {
    title: "C++ Full Course (Apna College)",
    thumbnail: "https://img.youtube.com/vi/z9bZufPHFLU/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ"
  },
  {
    title: "Java Programming (Apna College)",
    thumbnail: "https://img.youtube.com/vi/UmnCZ7-9yDY/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3"
  },
  {
    title: "Python for Beginners (Programming with Mosh)",
    thumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU"
  },
  // Web Development
  {
    title: "HTML, CSS, JavaScript (CodeWithHarry)",
    thumbnail: "https://img.youtube.com/vi/qz0aGYrrlhU/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agrsRZjFECeFuWY5ev2pQlk"
  },
  {
    title: "React JS Full Course (freeCodeCamp)",
    thumbnail: "https://img.youtube.com/vi/bMknfKXIFA8/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PLWKjhJtqVAbnSe1qUNMG7AbPmjIG54u88"
  },
  {
    title: "Node.js Crash Course (Traversy Media)",
    thumbnail: "https://img.youtube.com/vi/fBNz5xF-Kx4/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PLillGF-RfqbZ2ybcoD2OaabW2P7Ws8CWu"
  },
  // Backend & APIs
  {
    title: "Backend Development (freeCodeCamp)",
    thumbnail: "https://img.youtube.com/vi/SccSCuHhOw0/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PLWKjhJtqVAbkFiqHnNaxpOPhh9tSWMXIF"
  },
  // Data Structures & Algorithms
  {
    title: "DSA in Java (take U forward)",
    thumbnail: "https://img.youtube.com/vi/8hly31xKli0/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz"
  },
  {
    title: "DSA in C++ (CodeHelp - by Babbar)",
    thumbnail: "https://img.youtube.com/vi/zg9ih6SVACc/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA"
  },
  // DevOps & System Design
  {
    title: "DevOps Roadmap (TechWorld with Nana)",
    thumbnail: "https://img.youtube.com/vi/0yWAtQ6wYNM/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PLy7NrYWoggjziYQIDorlXjTvvwweTYoNC"
  },
  {
    title: "System Design (Gaurav Sen)",
    thumbnail: "https://img.youtube.com/vi/xpDnVSmNFX0/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX"
  },
  // Soft Skills & Interview Prep
  {
    title: "Communication Skills & Personal Development",
    thumbnail: "https://img.youtube.com/vi/2eCHD6f_phE/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PLAwxTw4SYaPnMwH6aeB3mgC8gQ1b1CkG2"
  },
  {
    title: "Android Development (CodeWithHarry)",
    thumbnail: "https://img.youtube.com/vi/mXjZQX3UzOs/hqdefault.jpg",
    url: "https://www.youtube.com/playlist?list=PLu0W_9lII9aiL0kysYlfSOUgY5rNlOhUd"
  }
];

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);

      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, [])

  // Modal state for embedded playlist
  const [openPlaylist, setOpenPlaylist] = useState(null);

  // Helper to extract playlistId from url
  const getPlaylistId = (url) => {
    const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  return (
    <>
      <div className="text-3xl text-richblack-50 mb-6">Enrolled Courses</div>

      {/* YouTube Playlists Section */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-yellow-100 mb-4">Recommended YouTube Playlists</h3>
        <div className="flex flex-wrap gap-6">
          {youtubePlaylists.map((playlist, idx) => (
            <button
              key={playlist.url}
              className="w-64 bg-richblack-800 rounded-lg shadow-lg hover:scale-105 transition-transform border border-yellow-100 flex flex-col items-center p-4 cursor-pointer focus:outline-none"
              onClick={() => setOpenPlaylist(playlist)}
              type="button"
            >
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-full h-36 object-cover rounded-md mb-3"
              />
              <div className="font-semibold text-lg text-yellow-50 text-center mb-1">{playlist.title}</div>
              <span className="text-xs text-richblack-300">YouTube Playlist</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal for embedded YouTube playlist */}
      {openPlaylist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="bg-richblack-900 w-full h-full flex flex-col items-center justify-center relative">
            <button
              className="absolute top-4 right-6 text-4xl text-yellow-100 hover:text-yellow-200 focus:outline-none z-10"
              onClick={() => setOpenPlaylist(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="w-full h-[60vh] md:h-[80vh] flex items-center justify-center">
              <iframe
                width="90%"
                height="100%"
                src={`https://www.youtube.com/embed/videoseries?list=${getPlaylistId(openPlaylist.url)}`}
                title={openPlaylist.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-2xl"
              ></iframe>
            </div>
            <div className="text-yellow-50 font-semibold text-2xl text-center mt-6 mb-2">{openPlaylist.title}</div>
            <a
              href={openPlaylist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-200 underline text-lg hover:text-yellow-100 mb-4"
            >
              Open on YouTube
            </a>
          </div>
        </div>
      )}

      {/* Existing enrolled courses logic */}
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map((course, i) => (
            <div
              key={i}
              className="bg-richblack-800 border border-yellow-100 rounded-2xl shadow-lg flex flex-col h-full hover:shadow-2xl transition-shadow"
            >
              <div
                className="cursor-pointer relative group"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="w-full h-40 object-cover rounded-t-2xl group-hover:brightness-90 transition"
                />
                <div className="absolute top-2 right-2 bg-yellow-100 text-richblack-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                  {course?.totalDuration || ""}
                </div>
              </div>
              <div className="flex flex-col flex-1 p-5 gap-2">
                <h3 className="text-lg font-bold text-yellow-50 mb-1 line-clamp-2">{course.courseName}</h3>
                <p className="text-richblack-200 text-sm mb-2 line-clamp-3">
                  {course.courseDescription.length > 80
                    ? `${course.courseDescription.slice(0, 80)}...`
                    : course.courseDescription}
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                    bgColor="#FFD60A"
                    baseBgColor="#22223b"
                    className="flex-1"
                  />
                  <span className="text-xs text-yellow-100 font-semibold ml-2">
                    {course.progressPercentage || 0}%
                  </span>
                </div>
                <button
                  className="mt-4 bg-yellow-100 text-richblack-900 font-semibold py-2 rounded-lg shadow hover:bg-yellow-200 transition"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}