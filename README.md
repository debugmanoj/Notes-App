# Notes App – Full Stack Web Application

**Live Preview**: [Your live link here]  
**GitHub**: [Frontend Repo](#) | [Backend Repo](#)

---

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Authentication**: JWT, Bcrypt
- **Email Services**: Nodemailer, Mailtrap
- **Rich Text Editor**: TipTap
- **Deployment**: Vercel (Frontend), Render / Railway / Vercel (Backend)

---

## Features

### User Authentication
- Secure registration and login using hashed passwords and JWT tokens.
- Token-based session management stored in localStorage.

### Email Verification
- Email verification implemented using Nodemailer and Mailtrap.
- Users must verify their email before gaining access to the app.
- Token-based verification system with a secure backend.

### Notes Management
- Create, update, delete, and read rich-text notes.
- Notes can be categorized (Work, Personal, Ideas).
- Tags can be added to notes and used as filters.
- Pin notes to keep them at the top of the list.

### Filtering and Search
- Filter notes by:
  - Category
  - Tags
  - Search text
  - Start and end date
- Instant feedback with toast notifications for UX clarity.

### Offline Support
- Automatically caches notes in localStorage.
- Gracefully falls back to cached data when offline.
- Syncs back with the server once online.

### UI & UX
- Responsive layout for desktop and mobile.
- Clean form handling with validation.
- Sticky filters toolbar and modal-based note editing.

### Security
- JWT secret and SMTP credentials secured via environment variables.
- User verification and authorization handled in the backend.

---

## Learning Highlights

- Implemented a complete email verification system from scratch.
- Worked with protected routes using React Router and JWT.
- Used advanced React features like Context API, useCallback, and useEffect.
- Developed a real-world project with full-stack capabilities and best practices.

---

## Future Enhancements

- Public sharing of notes via a unique link.
- Export to PDF or Markdown format.
- Real-time collaboration using WebSockets.
- User profile and settings page.

---



