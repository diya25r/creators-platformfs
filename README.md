# MERN Creator Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for creators to showcase their work and connect with audiences.

## Project Structure

```
creators-platform/
├── client/                 # React frontend application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components (Header, Footer)
│   │   ├── pages/          # Page components (Home, Login, Register, Dashboard, NotFound)
│   │   ├── App.js          # Main app component with routing
│   │   └── App.css         # Global styles
│   └── package.json        # Frontend dependencies
├── server/                 # Backend Node.js/Express API
│   ├── config/
│   │   └── database.js     # MongoDB connection configuration
│   ├── controllers/
│   │   └── userController.js # User management logic
│   ├── models/
│   │   └── User.js         # User data model with Mongoose
│   ├── routes/
│   │   └── userRoutes.js   # API routes for users
│   ├── .env                # Environment variables
│   ├── .gitignore          # Git ignore rules
│   ├── package.json        # Dependencies and scripts
│   └── server.js           # Main server file
└── README.md               # This file
```

## Backend Features

### Server Setup
- **Express.js** server with middleware for CORS, JSON parsing
- **Environment configuration** using dotenv
- **Health check endpoint** at `/api/health`

### Database
- **MongoDB** with **Mongoose** ODM
- **Connection handling** with error logging
- **Environment-based URI** configuration

### User Management API
Complete CRUD operations for users with authentication-ready structure:

#### Endpoints
- `POST /api/users/register` - Register new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

#### User Model
```javascript
{
  name: String (required, min 2 chars),
  email: String (required, unique, lowercase, validated),
  password: String (required, min 6 chars, hashed with bcrypt),
  timestamps: true
}
```

### Security Features
- **Password hashing** with bcrypt (10 salt rounds)
- **Input validation** and sanitization
- **Error handling** with appropriate HTTP status codes
- **Password exclusion** from API responses

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or cloud service)
- npm or yarn

### Installation

1. **Backend Setup**
   ```bash
   cd server
   npm install
   ```

2. **Create backend `.env` file**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/creators-platform
   JWT_SECRET=your_jwt_secret_here
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

4. **Start MongoDB**
   Make sure MongoDB is running locally or update the `MONGODB_URI` to use a cloud-hosted database.

5. **Run the applications**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm start

   # Terminal 2 - Frontend
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Testing the API

Use Postman, Insomnia, or curl to test endpoints.

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Register User:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

## API Response Examples

### Successful Registration
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "60d5ecb74b24c72b8c8b4567",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

## API Integration

The frontend is ready to integrate with the backend API:

- **Registration**: POST `/api/users/register`
- **Login**: (To be implemented with JWT)
- **Get Users**: GET `/api/users`
- **User Dashboard**: (To be implemented)

## Development

- **Backend**: `cd server && npm run dev` (with nodemon)
- **Frontend**: `cd client && npm start`
- **Production builds**: `cd server && npm run build` and `cd client && npm run build`

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Security:** bcrypt for password hashing
- **Environment:** dotenv
- **Middleware:** CORS, body-parser

## Future Enhancements

- JWT authentication
- React frontend implementation
- User profiles and content management
- Social features
- Payment integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC Lisence