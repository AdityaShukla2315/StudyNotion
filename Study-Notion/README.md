# StudyNotion - EdTech Platform 🚀

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Website-blue?style=for-the-badge&logo=vercel)](https://studynotion-frontend.vercel.app/)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-MERN%20Stack-green?style=for-the-badge&logo=javascript)](https://github.com/AdityaShukla2315/StudyNotion)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

![Main Page](images/mainpage.png)

## 📖 Overview

StudyNotion is a fully functional EdTech platform that enables users to create, consume, and rate educational content. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), it provides a comprehensive learning management system for both students and instructors.

## 🏗️ System Architecture

<div align="center">
  <img src="images/architecture.png" alt="System Architecture" width="600px" />
</div>

![Test Architecture](images/architecture.png)

## 🗄️ Database Schema

<div align="center">
  <img src="images/schema.png" alt="Database Schema" width="600px" />
</div>

## ✨ Key Features

### 🎓 For Students
- **Course Discovery**: Browse and search through a vast catalog of courses
- **Wishlist Management**: Save courses for later purchase
- **Progress Tracking**: Monitor learning progress with detailed analytics
- **Interactive Learning**: Video lessons, assignments, and assessments
- **Community Features**: Q&A forums, reviews, and ratings
- **AI Chatbot**: Get instant help and learning guidance
- **Badge System**: Earn achievements for completing milestones

### 👨‍🏫 For Instructors
- **Course Creation**: Comprehensive course builder with multimedia support
- **Analytics Dashboard**: Detailed insights into course performance
- **Student Management**: Track enrollments, progress, and feedback
- **Content Management**: Upload videos, documents, and assignments
- **Revenue Tracking**: Monitor earnings and payment history

### 🔧 Technical Features
- **Authentication**: JWT-based secure authentication with OTP verification
- **Payment Integration**: Razorpay payment gateway for course purchases
- **Media Management**: Cloudinary integration for file storage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live progress tracking and notifications

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
Study-Notion/
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

### Course Management
![Course Management](images/architecture.png)

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