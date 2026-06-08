<div align="center">
  <h1>
    <a href="https://git.io/typing-svg">
      <img src="https://readme-typing-svg.herokuapp.com?font=Playfair+Display&size=35&duration=3000&pause=1000&color=C9A84C&center=true&vCenter=true&width=600&lines=MJ+Dance+Academy;Move+With+Purpose.;Dance+With+Passion.;Premium+MERN+Stack+App!" alt="Typing SVG">
    </a>
  </h1>
  <p>
    A premium, full-stack <strong>MERN application</strong> designed to manage a dance academy with a cinematic dark-themed UI and powerful administrative capabilities.
  </p>
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  </p>
</div>

---

### 🎯 Project Highlights

- 🎭 **Cinematic UI:** Beautiful dark theme with glowing gold accents (`#C9A84C`) and smooth hover animations.
- 🔒 **Secure Authentication:** Robust JWT-based auth, `bcryptjs` password hashing, and OTP-based password resets.
- 📧 **Automated Communication:** Integrated Nodemailer for personalized HTML emails on application updates and admin replies.
- ⚡ **Stateless Architecture:** Fully decoupled React frontend and Express REST API backend using centralized Axios interceptors.

---

### 🛠️ Tech Arsenal

<p align="center">Built using the following modern web technologies:</p>

<table align="center">
  <tr>
    <td align="center" width="96">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="48" height="48" alt="React" />
      <br>React
    </td>
    <td align="center" width="96">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" />
      <br>TypeScript
    </td>
    <td align="center" width="96">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="48" height="48" alt="Node.js" />
      <br>Node.js
    </td>
    <td align="center" width="96">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="48" height="48" alt="Express" />
      <br>Express
    </td>
    <td align="center" width="96">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="48" height="48" alt="MongoDB" />
      <br>MongoDB
    </td>
    <td align="center" width="96">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="48" height="48" alt="CSS3" />
      <br>CSS3
    </td>
    <td align="center" width="96">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="48" height="48" alt="HTML5" />
      <br>HTML5
    </td>
  </tr>
</table>

---

### 🚀 Core Modules & Features

<details open>
<summary><h2>👨‍🎓 Student Portal</h2></summary>
  
> A seamless, engaging interface for students to discover and enroll in dance courses.

- **🔑 Authentication:** Secure Login, Signup, and Forgot Password flow with 6-digit OTP verification.
- **📚 Course Catalog:** Browse available dance styles, filter by level, and search dynamically.
- **📝 Enrollment System:** Apply for specific courses directly from the platform.
- **✉️ Contact & Enquiries:** Send queries directly to the academy with a beautiful contact form.
- **📊 Personal Dashboard:** Track application status (Pending, Approved, Rejected) and upcoming class schedules.

</details>

<details>
<summary><h2>🛡️ Admin Dashboard</h2></summary>
  
> A powerful, protected control center for academy staff to manage operations.

- **📈 Stat Dashboard:** Real-time metrics for total users, active courses, pending applications, and new messages.
- **👥 User Management:** View all registered students and remove accounts if necessary.
- **🎭 Course Management (CRUD):** Add, edit, and delete courses dynamically. Changes reflect instantly on the student portal.
- **✅ Application Processing:** Approve or reject student applications with one click.
- **💬 Enquiry Management:** View and directly reply to student queries from the dashboard.

</details>

<details>
<summary><h2>🔌 RESTful Backend API</h2></summary>

> A highly secure, scalable Express.js API connected to MongoDB Atlas.

- **🛡️ JWT Middleware:** Intercepts and verifies tokens to protect admin and user-specific routes.
- **📧 Automated Emails:** Nodemailer triggers automated HTML emails when applications are updated or enquiries are replied to.
- **🔐 Password Hashing:** Uses `bcryptjs` in Mongoose pre-save hooks to secure user credentials.
- **🗄️ Axios Integration:** Frontend perfectly synced with backend endpoints using centralized API services and global interceptors.

</details>