# YourCart
YourCart is a modern web application that allows users to securely track products in a personalized shopping list. Users can sign in using email/password or Google authentication, manage their products, and have their data persist across sessions using Firebase.
## Main Idea & Purpose

The main goal of YourCart is to provide users with a simple and secure way to manage and track products they care about, without losing data when they log out or refresh the page.

This project was built to practice and demonstrate real-world application development using React and Firebase, with a strong focus on authentication, data persistence, and security rules. It simulates how production applications handle user accounts, protected data, and cloud-based storage.
## Features

- User authentication with Email & Password
- Google Sign-In support
- Secure password reset via email
- Personalized shopping list for each user
- Persistent data storage using Firebase Firestore
- Data isolation so users can only access their own products
- Responsive UI for desktop and mobile
## Screenshots

### Login Page
<img src="./src/assets/login-screenshot.jpg" width="300" />

### Signup Page
<img src="./src/assets/signup-screenshot.jpg" width="300" />

### Dashboard

<img src="./src/assets/dashbaord-screenshot.jpg" width="300" />
## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend & Services
- Firebase Authentication
- Firebase Firestore

### Deployment
- Vercel

- ## Authentication

YourCart uses Firebase Authentication to securely manage users. Supported authentication methods include:

- Email and Password login
- Google OAuth login
- Password reset via email

Only authorized domains are allowed, and authentication state is managed using Firebase's `onAuthStateChanged` listener to ensure session persistence.

## Data Storage & Security

User data is stored in Firebase Firestore. Each user's products are saved under their unique user ID, ensuring complete data isolation.

Firestore security rules are configured so that:
- Users must be authenticated
- Users can only read and write their own data
- Unauthorized access is blocked

## How to Use

1. Create an account using email/password or Google
2. Log in to access your personal shopping list
3. Add products you want to track
4. Log out and log back in — your data remains saved
5. Use the password reset option if needed

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/yourcart.git](https://github.com/aliZnm/yourcart.git
2. Install dependencies:
   ```bash
   npm install
3. Create a Firebase project and enable:
   - Firebase Authentication
   - Firestore Database
4. Add your Firebase configuration to a .env file
5. Start the development server:
   ```bash
   npm run dev

---

## Future Improvements

```md
- Product price tracking and history
- Categories and tags for products
- Notifications for price changes
- Improved UI/UX and animations
- Mobile app version
```
## Author
Built by Abdulrahman Ali  
