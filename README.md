# StudyNotion - EdTech Platform 🚀

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Website-blue?style=for-the-badge&logo=vercel)](https://StudyNotion-frontend.vercel.app/)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-MERN%20Stack-green?style=for-the-badge&logo=javascript)](https://github.com/AdityaShukla2315/StudyNotion)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

![Main Page](images/mainpage.png)

## 📖 Overview

StudyNotion is a fully functional EdTech platform that enables users to create, consume, and rate educational content. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), it provides a comprehensive learning management system for both students and instructors.

## 🏗️ System Architecture

![System Architecture](images/architecture.png)

## 🗄️ Database Schema

![Database Schema](images/schema.png)


## ✨ Key Features & Modern UI


### 🎓 For Students
- **Modern Course Catalog**: Browse a visually rich, responsive grid of expertly designed course cards
- **Wishlist Management**: Save courses for later purchase with interactive heart icons
- **Progress Tracking**: Monitor learning progress with detailed analytics
- **Interactive Learning**: Video lessons, assignments, and assessments
- **Community Features**: Q&A forums, reviews, and ratings
- **In-app Video Playback**: Watch YouTube playlists and course videos directly in the app
- **AI Chatbot**: Get instant help and learning guidance
- **Badge System**: Earn achievements for completing milestones


### 👨‍🏫 For Instructors
- **Course Creation**: Comprehensive course builder with multimedia support
- **Analytics Dashboard**: Detailed insights into course performance
- **Student Management**: Track enrollments, progress, and feedback
- **Content Management**: Upload videos, documents, and assignments
- **Revenue Tracking**: Monitor earnings and payment history


### 🔧 Technical & UI/UX Features
- **Authentication**: JWT-based secure authentication with OTP verification
- **Payment Integration**: Razorpay payment gateway for course purchases
- **Media Management**: Cloudinary integration for file storage
- **Modern Responsive Design**: Mobile-first, dark theme, and expert-level UI with Tailwind CSS
- **Wishlist & Cart**: Add/remove courses to wishlist with instant feedback
- **In-app Modals**: Full-screen modals for video playback and course details
- **Real-time Updates**: Live progress tracking and notifications
- **Expertly Designed Footer**: Modern, accessible, and information-rich footer with social links

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### External Services
- **Cloudinary** - Media storage
- **Razorpay** - Payment processing
- **Nodemailer** - Email services

## 📁 Project Structure

```
StudyNotion/
├── 📁 client/                    # React Frontend
│   ├── 📁 public/               # Static assets
│   ├── 📁 src/                  # Source code
│   │   ├── 📁 components/       # React components
│   │   ├── 📁 pages/           # Page components
│   │   ├── 📁 services/        # API services
│   │   ├── 📁 slices/          # Redux slices
│   │   └── 📁 utils/           # Utility functions
│   └── package.json
├── 📁 backend/                   # Node.js Server
│   ├── 📁 config/              # Configuration files
│   ├── 📁 controllers/         # Route handlers
│   ├── 📁 models/              # Database models
│   ├── 📁 routes/              # API routes
│   ├── 📁 middlewares/         # Express middlewares
│   └── 📁 utils/               # Utility functions
├── 📁 docs/                     # Documentation
├── 📁 images/                   # Project images
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdityaShukla2315/StudyNotion.git
   cd StudyNotion
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

4. **Run the application**
   ```bash
   # Start backend server
   cd backend
   npm start
   
   # Start frontend (in new terminal)
   cd client
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000


## 📱 Screenshots

### Main Dashboard
![Dashboard](images/mainpage.png)

### Modern Course Catalog
![Course Catalog](images/mainpage.png)

### Course Details Page
![Course Details](images/architecture.png)

### Database Schema
![Database](images/schema.png)

## 🔗 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/forgot-password` - Password reset

### Courses
- `GET /api/v1/courses` - Get all courses
- `POST /api/v1/courses` - Create new course
- `GET /api/v1/courses/:id` - Get course details
- `PUT /api/v1/courses/:id` - Update course
- `DELETE /api/v1/courses/:id` - Delete course

### User Management
- `GET /api/v1/profile` - Get user profile
- `PUT /api/v1/profile` - Update profile
- `POST /api/v1/profile/change-password` - Change password


## 💡 Recent Improvements

- Redesigned Courses and CourseDetails pages for a modern, expert look
- Added interactive wishlist and in-app video playback
- Footer redesigned for clarity, accessibility, and visual polish
- Improved responsiveness and mobile experience

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aditya Shukla**
- GitHub: [@AdityaShukla2315](https://github.com/AdityaShukla2315)
- LinkedIn: [Aditya Shukla](https://linkedin.com/in/aditya-shukla)

## 🙏 Acknowledgments

- [React.js](https://reactjs.org/) - Frontend framework
- [Node.js](https://nodejs.org/) - Backend runtime
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Razorpay](https://razorpay.com/) - Payment gateway
- [Cloudinary](https://cloudinary.com/) - Media management

---

<div align="center">
  <p>Made with ❤️ by Aditya Shukla</p>
  <p>If you find this project helpful, please give it a ⭐</p>
</div> 