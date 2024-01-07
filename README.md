# Luxify Real Estate App 🔗 [LIVE DEMO](https://luxify.onrender.com)
 

Luxify is a sophisticated real estate application that allows users to explore, list, and manage properties seamlessly. This MERN (MongoDB, Express.js, React, Node.js) stack  comes equipped with features such as user authentication, Google sign-in, listing management (add, edit, delete), view all listings, search functionality, and profile updates.

## Features

- **User Authentication:**
  - Register with email and password.
  - Log in securely.

- **Social Sign-In:**
  - Authenticate using Google Sign-In.

- **Listing Management:**
  - Add new property listings.
  - Edit existing listings.
  - Delete listings.

- **View All Listings:**
  - Explore a comprehensive list of available properties.

- **Search Functionality:**
  - Easily find properties using search functionality.

- **Update Profile:**
  - Modify user profile details.

## Prerequisites

Before you get started, ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) and npm
- [MongoDB](https://www.mongodb.com/)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/luxify-real-estate-app.git

2. **Change to Project Directory**
cd luxify-real-estate-app

3. **Install Dependencies:**

bash
```
npm install
```
4. **Create Environment Variables:**

Create a .env file in the root directory for the API with the following variables:

env
bash
```
MONGO_URL=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000  // Update with your client URL
JWT_SECRET=your_jwt_secret
```
Additionally, create a .env file in the CLIENT folder for Firebase functionality:

env
bash
```
FIREBASE_API_KEY=your_firebase_api_key
```
Start MongoDB Server:

bash
```
mongodb
```

Start Backend Server:

bash
```
npm run server
```
Start Frontend:

bash
```
npm run client
```
Open Your Browser:

Navigate to http://localhost:3000 to use the Luxify Real Estate App.

Contributing
Feel free to contribute to the development of this project by opening issues or submitting pull requests. Follow the standard GitHub flow for contributions.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Note: Replace placeholder values such as your-username, your_mongodb_connection_string, your_jwt_secret, and your_firebase_api_key with your actual information. Additionally, update the CLIENT_URL variable in the .env file with the correct URL for your client application.



