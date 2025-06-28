import React from "react";

const CommunitySupport = () => (
  <div className="min-h-screen bg-richblack-900 text-richblack-5 flex flex-col items-center justify-center p-8">
    <div className="bg-richblack-800 rounded-lg shadow-lg p-8 max-w-lg w-full">
      <h1 className="text-3xl font-bold text-yellow-50 mb-4">Community & Support</h1>
      <p className="mb-4 text-richblack-200">Need help or want to connect with other learners?</p>
      <ul className="mb-4 space-y-2">
        <li>
          <a href="https://discord.gg/yourdiscord" target="_blank" rel="noopener noreferrer" className="text-yellow-50 underline hover:text-yellow-100">Join our Discord Community</a>
        </li>
        <li>
          <a href="mailto:support@studynotion.com" className="text-yellow-50 underline hover:text-yellow-100">Email Support</a>
        </li>
      </ul>
      <form className="flex flex-col gap-2">
        <label htmlFor="support-msg" className="text-richblack-200">Send us a message:</label>
        <textarea id="support-msg" className="bg-richblack-900 border border-richblack-700 rounded p-2 text-richblack-5" rows={3} placeholder="Describe your issue or question..." />
        <button type="submit" className="bg-yellow-50 text-richblack-900 font-semibold px-4 py-2 rounded hover:bg-yellow-100 transition mt-2">Send</button>
      </form>
    </div>
  </div>
);

export default CommunitySupport; 