# Paytmish - Digital Wallet Application

A full-stack digital wallet application built with React, Node.js, and MongoDB. This project demonstrates modern web development practices including JWT authentication, password hashing, transaction management, and responsive UI design.

## 🚀 Features

### Authentication & Security

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Input validation with Zod schemas
- Protected API endpoints

### Financial Operations

- Account balance management
- Money transfer between users
- Transaction history with detailed logs
- Atomic transactions using MongoDB sessions
- Real-time balance updates

### User Experience

- Responsive design with Tailwind CSS
- Loading states and error handling
- Form validation and user feedback
- Modern, clean UI components
- Transaction history visualization

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Zod** - Input validation
- **Jest** - Testing framework

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **Zustand** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm

### Quick Setup

1. **Install Backend Dependencies:**

```bash
cd Backend
npm install
```

2. **Create Backend Environment File:**
   Create a file named `.env` in the `Backend` folder with this content:

```env
DB_URI=hit me up
JWT_SECRET=hit me up
PORT=3000
NODE_ENV=development
```

3. **Install Frontend Dependencies:**

```bash
cd Frontend
npm install
```

4. **Create Frontend Environment File:**
   Create a file named `.env` in the `Frontend` folder with this content:

```env
VITE_APP_API_USER=http://localhost:3000/api/v1/user
VITE_APP_API_ACC=http://localhost:3000/api/v1/account
```

5. **Start the Application:**
   Open two terminal windows:

**Terminal 1 (Backend):**

```bash
cd Backend
npm run dev
```

**Terminal 2 (Frontend):**

```bash
cd Frontend
npm run dev
```

6. **Access the Application:**

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🧪 Testing

### Backend Tests

```bash
cd Backend
npm test
```

_Note: Tests are already set up with Jest. You can add more test cases in the `tests` folder._

## 📁 Project Structure

```
Paytmish/
├── Backend/
│   ├── routes/
│   │   ├── index.js          # Main router
│   │   ├── user.js           # User management routes
│   │   └── accounts.js       # Account/transaction routes
│   ├── zodSchema/
│   │   └── userSchema.js     # Input validation schemas
│   ├── tests/
│   │   └── user.test.js      # Test files
│   ├── auth.js               # JWT middleware
│   ├── db.js                 # Database configuration
│   ├── index.js              # Server entry point
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── store.js             # Zustand store
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication

- `POST /api/v1/user/addUser` - User registration
- `POST /api/v1/user/getUser` - User login
- `PUT /api/v1/user/updateUser` - Update user profile (protected)
- `GET /api/v1/user/` - Search users (protected)

### Account Management

- `GET /api/v1/account/balance` - Get account balance (protected)
- `PUT /api/v1/account/transaction` - Transfer money (protected)
- `GET /api/v1/account/transactions` - Get transaction history (protected)

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation using Zod schemas
- **Protected Routes**: API endpoints require valid JWT tokens
- **Transaction Safety**: Atomic transactions prevent data inconsistency

## 🎨 UI Components

- **Header**: Page titles and branding
- **Appbar**: Navigation with user info and logout
- **Balance**: Account balance display
- **Users**: User list for money transfers
- **TransactionHistory**: Transaction log with visual indicators
- **Inputbox**: Reusable form input component
- **Button**: Reusable button with loading states

## 🚀 Deployment

### Backend Deployment

1. Set up a MongoDB Atlas cluster or use a cloud MongoDB service
2. Update the `DB_URI` in your environment variables
3. Deploy to platforms like Heroku, Railway, or AWS

### Frontend Deployment

1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- [ ] Real-time notifications using WebSockets
- [ ] File upload for profile pictures
- [ ] Advanced transaction filtering and search
- [ ] Email notifications for transactions
- [ ] Mobile app using React Native
- [ ] Admin dashboard for user management
- [ ] Payment gateway integration
- [ ] Multi-currency support

## 📞 Support

If you have any questions or need help with the project, please open an issue on GitHub.

---

**Note**: This is a demonstration project. For production use, ensure proper security measures, environment configuration, and error handling are implemented.
