# StudyNotion - Learning Management System

A full-stack Learning Management System (LMS) built with the MERN stack, featuring course management, user authentication, and payment integration.

## Features

- 🔐 User Authentication (Signup, Login, OTP Verification)
- 📚 Course Management
- 👨‍🏫 Instructor Dashboard
- 👨‍🎓 Student Dashboard
- 💳 Payment Integration (Razorpay)
- 📧 Email Notifications
- 🔍 Course Search and Filtering
- ⭐ Course Reviews and Ratings

## Tech Stack

- **Frontend:**
  - React.js
  - Redux Toolkit
  - Tailwind CSS
  - React Router DOM

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication

- **Payment:**
  - Razorpay Integration

- **Email:**
  - Nodemailer

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AdityaShukla2315/StudyNotion.git
   cd StudyNotion
   ```

2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../src
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the server directory with:
   ```
   # JWT Configuration
   JWT_SECRET=your_jwt_secret

   # MongoDB Configuration
   MONGODB_URL=mongodb://localhost:27017/studynotion

   # Node Environment
   NODE_ENV=development

   # Server Configuration
   PORT=4000

   # Razorpay Configuration
   RAZORPAY_KEY=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../src
   npm start
   ```

## Project Structure

```
StudyNotion/
├── server/                 # Backend code
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── utils/            # Utility functions
│
└── src/                   # Frontend code
    ├── components/        # React components
    ├── pages/            # Page components
    ├── services/         # API services
    └── store/            # Redux store
```

## API Endpoints

### Authentication
- POST `/api/v1/auth/signup` - User registration
- POST `/api/v1/auth/login` - User login
- POST `/api/v1/auth/sendotp` - Send OTP for verification

### Courses
- GET `/api/v1/course/showAllCategories` - Get all course categories
- GET `/api/v1/course/getReviews` - Get course reviews
- POST `/api/v1/course/createCourse` - Create new course (Instructor only)

### Payments
- POST `/api/v1/payment/capturePayment` - Capture payment
- POST `/api/v1/payment/verifyPayment` - Verify payment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Aditya Shukla - [@AdityaShukla2315](https://github.com/AdityaShukla2315)

Project Link: [https://github.com/AdityaShukla2315/StudyNotion](https://github.com/AdityaShukla2315/StudyNotion) 