# YourNote App 📝

A simple and elegant notes application built with React and Firebase. Create, edit, and manage your notes with ease using cloud-based storage and real-time authentication.

## 🌐 Live Demo

**[Visit YourNote App](https://yournote01.netlify.app/)**

---

## ✨ Features

- **📌 Add Notes** - Create new notes with a title and content
- **✏️ Edit Notes** - Update existing notes anytime
- **🗑️ Delete Notes** - Remove notes you no longer need
- **🔐 Authentication** - Secure login with Firebase Authentication
- **☁️ Cloud Storage** - All notes synced in real-time to Firebase
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **⚡ Fast & Lightweight** - Quick performance with minimal load times

---

## 🛠️ Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **React Router** - Client-side routing
- **CSS3** - Styling and responsive design

### Backend & Database
- **Firebase** - Backend as a service (BaaS)
  - **Firebase Authentication** - Secure user authentication
  - **Firestore** - Real-time cloud database
  - **Firebase Hosting** - App deployment (optional)

### Deployment
- **Netlify** - Hosting platform for the live demo

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- A **Firebase account** (free tier available at [firebase.google.com](https://firebase.google.com))

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Coder-Vinay-Arc/YourNote-app.git
cd YourNote-app
```

### 2. Install Dependencies

```bash
npm install
```

Or if using yarn:

```bash
yarn install
```

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firebase Authentication (Email/Password method)
4. Create a Firestore database
5. Get your Firebase configuration credentials

### 4. Add Firebase Configuration

Create a `.env.local` file in the project root and add your Firebase credentials:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 5. Start the Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 📖 Usage

### Creating a Note
1. Sign up or log in to your account
2. Click the "Add Note" button
3. Enter a title and content
4. Click "Save" to store your note

### Editing a Note
1. Click on a note to open it
2. Edit the title or content
3. Click "Update" to save changes

### Deleting a Note
1. Open a note or hover over it
2. Click the "Delete" button
3. Confirm the deletion

### Logging Out
1. Click the logout button in the navigation
2. You will be redirected to the login page

---

## 📁 Project Structure

```
YourNote-app/
├── public/
│   ├── index.html          # HTML template
│   └── favicon.ico         # App icon
├── src/
│   ├── components/         # React components
│   │   ├── NoteList.js
│   │   ├── NoteForm.js
│   │   ├── Auth.js
│   │   └── ...
│   ├── firebase/           # Firebase configuration
│   │   └── config.js       # Firebase initialization
│   ├── App.js              # Main App component
│   ├── App.css             # Global styles
│   └── index.js            # React DOM render
├── package.json            # Dependencies and scripts
├── README.md               # This file
└── .env.local              # Environment variables (not in repo)
```

---

## 🔐 Authentication

YourNote App uses Firebase Authentication to securely manage user accounts:

- **Sign Up** - Create a new account with email and password
- **Log In** - Access your account with credentials
- **Password Reset** - Reset forgotten passwords via email
- **Session Persistence** - Stay logged in between sessions

---

## 💾 Database Schema (Firestore)

### Notes Collection
```
{
  userId: "user_id",
  title: "Note Title",
  content: "Note Content",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## 🌍 Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

### Deploy to Firebase Hosting

```bash
npm run build
firebase deploy
```

---

## 🐛 Troubleshooting

### Issue: Firebase credentials not loading
- Ensure `.env.local` file is in the project root
- Restart the development server after adding environment variables

### Issue: Notes not saving
- Check Firebase Firestore rules allow read/write for authenticated users
- Verify Firebase is properly configured

### Issue: Authentication not working
- Enable Email/Password authentication in Firebase Console
- Check Firebase project ID matches your `.env.local` file

---

## 📝 Future Enhancements

- [ ] Dark mode support
- [ ] Note categories/tags
- [ ] Search functionality
- [ ] Rich text editor
- [ ] Note sharing
- [ ] Offline support
- [ ] Note history/versions
- [ ] Export notes as PDF

---

## 👨‍💻 Author

**Coder-Vinay-Arc**

- GitHub: [@Coder-Vinay-Arc](https://github.com/Coder-Vinay-Arc)
- Project Repository: [YourNote-app](https://github.com/Coder-Vinay-Arc/YourNote-app)

---

## 📄 License

This project is licensed under the MIT License - feel free to use it for personal and commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📧 Support

If you have any questions or need support, feel free to open an issue on the [GitHub repository](https://github.com/Coder-Vinay-Arc/YourNote-app/issues).

---

## 🎉 Acknowledgments

- React documentation and community
- Firebase by Google
- All contributors and users

---

**Happy Note Taking! 📝✨**
