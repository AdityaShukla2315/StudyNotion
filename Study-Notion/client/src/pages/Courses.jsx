import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const dummyCourses = [
  {
    _id: "1",
    courseName: "JavaScript Essentials",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "John", lastName: "Doe" },
    price: 499,
  },
  {
    _id: "2",
    courseName: "React Mastery",
    thumbnail: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "Jane", lastName: "Smith" },
    price: 799,
  },
  {
    _id: "3",
    courseName: "Interview Preparation",
    thumbnail: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "Alex", lastName: "Johnson" },
    price: 999,
  },
  {
    _id: "4",
    courseName: "DSA Bootcamp",
    thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "Emily", lastName: "Williams" },
    price: 899,
  },
  {
    _id: "5",
    courseName: "Python for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
    instructor: { firstName: "Chris", lastName: "Lee" },
    price: 599,
  },
];

const Courses = () => {
  const [courses] = useState(dummyCourses);
  const [loading] = useState(false);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("studynotion_wishlist") || "[]"));
  const navigate = useNavigate();

  const toggleWishlist = (id) => {
    let newWishlist;
    if (wishlist.includes(id)) {
      newWishlist = wishlist.filter((wid) => wid !== id);
      toast("Removed from wishlist", { icon: "💔" });
    } else {
      newWishlist = [...wishlist, id];
      toast("Added to wishlist!", { icon: "❤️" });
    }
    setWishlist(newWishlist);
    localStorage.setItem("studynotion_wishlist", JSON.stringify(newWishlist));
  };

  const handleEnroll = async (course) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Razorpay's public test key
      amount: 100, // ₹1 in paise
      currency: "INR",
      name: "StudyNotion",
      description: `Enroll in ${course.courseName}`,
      image: course.thumbnail,
      handler: function (response) {
        toast.success("Payment Successful! You are enrolled.");
      },
      prefill: {
        name: "Student",
        email: "student@example.com",
      },
      theme: {
        color: "#FFD60A",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Payment failed");
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><div className="spinner"></div></div>;
  }

  return (
    <div className="min-h-screen bg-richblack-900 py-10 px-4">
      <h1 className="text-3xl font-bold text-richblack-5 mb-8 text-center">All Courses</h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {courses.length === 0 && <p className="text-richblack-200">No courses available.</p>}
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-richblack-800 rounded-lg shadow-lg w-80 flex flex-col overflow-hidden border border-richblack-700 relative"
          >
            <button
              className="absolute top-3 right-3 z-10 text-2xl"
              onClick={() => toggleWishlist(course._id)}
              aria-label={wishlist.includes(course._id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              {wishlist.includes(course._id) ? (
                <AiFillHeart className="text-red-500" />
              ) : (
                <AiOutlineHeart className="text-richblack-300" />
              )}
            </button>
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className="h-44 w-full object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-xl font-semibold text-richblack-5 mb-2">{course.courseName}</h2>
              <p className="text-richblack-200 mb-2">By {course.instructor?.firstName} {course.instructor?.lastName}</p>
              <p className="text-yellow-50 font-bold mb-4">₹{course.price}</p>
              <div className="mt-auto flex gap-2">
                <button
                  className="bg-yellow-50 text-richblack-900 font-semibold px-4 py-2 rounded-md hover:bg-yellow-100 transition"
                  onClick={() => navigate(`/courses/${course._id}`)}
                >
                  View Details
                </button>
                <button
                  className="bg-richblack-900 border border-yellow-50 text-yellow-50 font-semibold px-4 py-2 rounded-md hover:bg-yellow-900 transition"
                  onClick={() => handleEnroll(course)}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses; 