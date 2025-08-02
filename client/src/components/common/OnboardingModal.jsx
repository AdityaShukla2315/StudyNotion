import React, { useEffect, useState, useRef } from "react";

const OnboardingModal = () => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const seen = localStorage.getItem("StudyNotion_onboarding_seen");
    if (!seen) setOpen(true);
  }, []);

  // Trap focus in modal
  useEffect(() => {
    if (!open) return;
    const focusable = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length) focusable[0].focus();
    const handleTab = (e) => {
      if (!open) return;
      if (e.key !== "Tab") return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("StudyNotion_onboarding_seen", "1");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fadeIn" aria-modal="true" role="dialog" aria-label="Onboarding modal">
      <div ref={modalRef} className="bg-richblack-900 rounded-lg shadow-2xl p-8 max-w-md w-full text-richblack-5 focus:outline-none" tabIndex={-1}>
        <h2 className="text-2xl font-bold mb-4 text-yellow-50">Welcome to StudyNotion!</h2>
        <p className="mb-6 text-richblack-200">We're excited to have you here. Here are a few tips to get started:</p>
        <ul className="list-disc pl-5 mb-6 text-richblack-200 space-y-2">
          <li>Browse and enroll in courses from the dashboard.</li>
          <li>Use the AI Chatbot (bottom-right) for instant help.</li>
          <li>Track your progress and earn badges as you learn.</li>
          <li>Visit the Community & Support page for help and discussion.</li>
        </ul>
        <button
          className="bg-yellow-50 text-richblack-900 font-semibold px-6 py-2 rounded hover:bg-yellow-100 transition w-full mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-50"
          onClick={handleClose}
          aria-label="Close onboarding modal"
        >
          Get Started
        </button>
      </div>
      <style>{`.animate-fadeIn{animation:fadeIn .3s ease}`}
      {`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
};

export default OnboardingModal; 