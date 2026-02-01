# LifeFlow Blood Donation Management System

A complete blood donation camp management system with React frontend, PHP backend, and MySQL database.

## 🎯 Features

### For Public Users:
- **Donor Registration**: Easy registration form for new blood donors
- **Find Blood**: Search for available blood by blood group and location
- **Blood Camps**: View upcoming and ongoing blood donation camps
- **Feedback System**: Submit feedback and complaints
- **About & Services**: Information about the blood donation network

### For Administrators:
- **Secure Admin Panel**: Password-protected admin access
- **Donor Management**: View, edit, and delete donor records
- **Camp Management**: Create, update, and manage blood donation camps
- **Inventory Management**: Track blood availability across different locations
- **Feedback Management**: Review and respond to user feedback

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **XAMPP** (or WAMP/MAMP) - includes Apache and MySQL
   - Download from: https://www.apachefriends.org/download.html
   
2. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

3. **Code Editor** (VS Code recommended)
   - Download from: https://code.visualstudio.com/

## 🚀 Installation Guide

### Step 1: Setup Database

1. **Start XAMPP**
   - Open XAMPP Control Panel
   - Start **Apache** and **MySQL** modules

2. **Create Database**
   - Open browser and go to: `http://localhost/phpmyadmin`
   - Click on **"New"** in the left sidebar
   - Create database named: `blood_donation_db`
   - Click **"Create"**

3. **Import Database Schema**
   - Select `blood_donation_db` from the left sidebar
   - Click on **"SQL"** tab at the top
   - Open the file: `database/schema.sql`
   - Copy all content and paste into the SQL window
   - Click **"Go"** to execute

   **OR** use Import feature:
   - Click **"Import"** tab
   - Choose file: `database/schema.sql`
   - Click **"Go"**

4. **Verify Tables Created**
   - You should see these tables in the left sidebar:
     - admins
     - blood_inventory
     - camps
     - donors
     - feedback

### Step 2: Setup Backend (PHP)

1. **Copy Backend Files to XAMPP**
   ```bash
   # Windows
   Copy the entire 'backend' folder to: C:\xampp\htdocs\blood-donation-system\

   # Mac
   Copy the entire 'backend' folder to: /Applications/XAMPP/htdocs/blood-donation-system/

   # Linux
   Copy the entire 'backend' folder to: /opt/lampp/htdocs/blood-donation-system/
   ```

   **Final structure should be:**
   ```
   C:\xampp\htdocs\blood-donation-system\backend\
   ├── auth.php
   ├── camps.php
   ├── config.php
   ├── donors.php
   ├── feedback.php
   └── inventory.php
   ```

2. **Configure Database Connection** (if needed)
   - Open `backend/config.php`
   - Update these lines if your MySQL settings are different:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'root');
   define('DB_PASS', ''); // Add your MySQL password here if you have one
   define('DB_NAME', 'blood_donation_db');
   ```

3. **Test Backend**
   - Open browser and go to: `http://localhost/blood-donation-system/backend/donors.php`
   - You should see: `[]` (empty array) - this means backend is working!

### Step 3: Setup Frontend (React)

1. **Navigate to Frontend Directory**
   ```bash
   cd blood-donation-system/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This will install:
   - React & React DOM
   - React Router
   - Tailwind CSS
   - Vite (build tool)

3. **Configure API Endpoint** (if needed)
   - Open `frontend/src/services/api.js`
   - Verify the API_BASE_URL:
   ```javascript
   const API_BASE_URL = 'http://localhost/blood-donation-system/backend';
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   - The app should automatically open at: `http://localhost:5173`
   - If not, manually open this URL in your browser

## 🔐 Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

## 📱 Using the System

### For Donors:
1. Go to **"Donate"** page
2. Fill in registration form
3. Submit to register as a donor

### For People Needing Blood:
1. Go to **"Find Blood"** page
2. Select blood group
3. Optionally enter city
4. View available blood and contact details

### For Administrators:
1. Go to **"Admin"** link in navigation
2. Login with credentials above
3. Manage donors, camps, inventory, and feedback

## 🎨 Color Theme

The system uses a medical-professional color scheme:
- **Primary Red**: `#C62828` (Blood/Urgency)
- **Dark Red**: `#8E0000`
- **Light Red**: `#FF5F52`
- **White**: `#FFFFFF` (Clean/Pure)
- **Dark Gray**: `#333333` (Text)
- **Light Gray**: `#F5F5F5` (Sections)

## 🛠️ Troubleshooting

### Backend Issues:

**Error: "Connection failed"**
- Solution: Ensure MySQL is running in XAMPP
- Check database name is correct: `blood_donation_db`
- Verify database credentials in `config.php`

**Error: "CORS policy"**
- Solution: Already configured in `config.php`
- Verify the frontend URL matches in CORS headers

**Error: "404 Not Found"**
- Solution: Check backend files are in correct location
- Verify Apache is running in XAMPP

### Frontend Issues:

**Error: "npm command not found"**
- Solution: Install Node.js from nodejs.org

**Port 5173 already in use**
- Solution: Kill the process or change port in `vite.config.js`

**API calls failing**
- Solution: Check backend URL in `api.js`
- Ensure backend is accessible at the URL

### Database Issues:

**Tables not created**
- Solution: Re-run the SQL schema
- Check for SQL errors in phpMyAdmin

**Sample data not appearing**
- Solution: Check if INSERT statements ran successfully
- Manually add test data through phpMyAdmin

## 📁 Project Structure

```
blood-donation-system/
│
├── database/
│   └── schema.sql                    # Database schema with sample data
│
├── backend/                          # PHP Backend API
│   ├── config.php                    # Database configuration
│   ├── auth.php                      # Admin authentication
│   ├── donors.php                    # Donor CRUD operations
│   ├── camps.php                     # Camp management
│   ├── inventory.php                 # Blood inventory
│   └── feedback.php                  # Feedback handling
│
└── frontend/                         # React Frontend
    ├── public/
    ├── src/
    │   ├── components/               # Reusable components
    │   │   ├── Header.jsx
    │   │   └── Footer.jsx
    │   ├── pages/                    # Page components
    │   │   ├── Home.jsx
    │   │   ├── AboutContact.jsx
    │   │   ├── DonatePage.jsx
    │   │   ├── FindBloodCamps.jsx
    │   │   └── AdminPanel.jsx
    │   ├── services/
    │   │   └── api.js                # API service layer
    │   ├── App.jsx                   # Main app component
    │   ├── main.jsx                  # Entry point
    │   └── index.css                 # Global styles
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## 🔄 Workflow: How Frontend and Backend Connect

1. **User Action** (Frontend)
   - User fills a form or clicks a button

2. **API Call** (Frontend → Backend)
   - React component calls function from `services/api.js`
   - Example: `api.createDonor(donorData)`

3. **HTTP Request** (Network)
   - Fetch API sends HTTP request to PHP backend
   - URL: `http://localhost/blood-donation-system/backend/donors.php`

4. **Backend Processing** (PHP)
   - `donors.php` receives the request
   - Validates data
   - Interacts with MySQL database
   - Returns JSON response

5. **Response Handling** (Frontend)
   - React component receives response
   - Updates UI accordingly
   - Shows success/error messages

## 🌐 API Endpoints

### Authentication
- `POST /auth.php` - Login
- `GET /auth.php?action=check` - Check auth status
- `POST /auth.php?action=logout` - Logout

### Donors
- `GET /donors.php` - Get all donors
- `GET /donors.php?id={id}` - Get specific donor
- `POST /donors.php` - Create donor
- `PUT /donors.php` - Update donor
- `DELETE /donors.php?id={id}` - Delete donor

### Camps
- `GET /camps.php` - Get all camps
- `GET /camps.php?id={id}` - Get specific camp
- `POST /camps.php` - Create camp (admin only)
- `PUT /camps.php` - Update camp (admin only)
- `DELETE /camps.php?id={id}` - Delete camp (admin only)

### Inventory
- `GET /inventory.php?search=true&blood_group={group}&city={city}` - Search blood
- `GET /inventory.php?camp_id={id}` - Get camp inventory
- `PUT /inventory.php` - Update inventory (admin only)

### Feedback
- `GET /feedback.php` - Get all feedback (admin only)
- `POST /feedback.php` - Submit feedback (public)
- `PUT /feedback.php` - Update feedback status (admin only)
- `DELETE /feedback.php?id={id}` - Delete feedback (admin only)

## 🎓 For Developers

### Adding a New Feature

**Example: Add "Emergency Requests" feature**

1. **Database** (`database/`)
   - Add new table in schema.sql
   ```sql
   CREATE TABLE emergency_requests (
       id INT PRIMARY KEY AUTO_INCREMENT,
       ...
   );
   ```

2. **Backend** (`backend/`)
   - Create `emergency.php` with CRUD operations
   - Use `config.php` for DB connection

3. **Frontend** (`frontend/src/`)
   - Add API methods in `services/api.js`
   - Create page component in `pages/EmergencyPage.jsx`
   - Add route in `App.jsx`
   - Add navigation link in `Header.jsx`

### Customization

**Change Colors:**
- Edit `frontend/tailwind.config.js`
- Update color values in the `extend.colors` section

**Change Fonts:**
- Edit Google Fonts import in `frontend/src/index.css`
- Update `fontFamily` in `tailwind.config.js`

**Modify Layout:**
- Edit components in `frontend/src/components/`
- Use Tailwind classes for styling

## 📝 Production Deployment

### For Production Server:

1. **Backend:**
   - Upload PHP files to web server
   - Update database credentials in `config.php`
   - Enable HTTPS
   - Update CORS settings for production domain

2. **Frontend:**
   - Build production version:
     ```bash
     npm run build
     ```
   - Upload `dist` folder contents to web server
   - Update API_BASE_URL in `api.js` to production URL

3. **Database:**
   - Export database from local phpMyAdmin
   - Import to production database
   - Update admin password for security

## 🔒 Security Notes

- Change admin password after installation
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Validate all user inputs
- Use prepared statements (already implemented)
- Regular database backups

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify all installation steps
3. Check browser console for errors
4. Check PHP error logs in XAMPP

## 📄 License

This project is created for educational purposes.

---

**Made with ❤️ for saving lives through blood donation**