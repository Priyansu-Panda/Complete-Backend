# 🎵 Complete-Backend — Music Streaming REST API

A fully-featured **RESTful backend** for a music streaming platform built with **Node.js**, **Express**, and **MongoDB**. Supports user authentication, role-based access control, music/album management, and cloud file storage via ImageKit.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express v5** | HTTP server & routing |
| **MongoDB + Mongoose** | Database & ODM |
| **JSON Web Tokens (JWT)** | Stateless authentication |
| **bcryptjs** | Password hashing |
| **Multer** | Multipart file upload handling (in-memory) |
| **ImageKit** | Cloud storage for music files |
| **cookie-parser** | Cookie-based token management |
| **dotenv** | Environment variable management |
| **nodemon** | Dev server with hot-reload |

---

## 📁 Project Structure

```
Back5/
├── server.js                  # Entry point — starts the server & connects DB
├── package.json
├── .env                       # Environment variables (not committed)
└── src/
    ├── app.js                 # Express app setup, middleware & route mounting
    ├── db/
    │   └── db.js              # MongoDB connection logic
    ├── models/
    │   ├── user.model.js      # User schema (username, email, password, role)
    │   ├── music.models.js    # Music schema (title, uri, artist ref)
    │   └── album.model.js     # Album schema (title, musics[], artist ref)
    ├── controllers/
    │   ├── auth.controller.js # Register, Login, Logout logic
    │   └── music.controller.js# Music & Album CRUD logic
    ├── routes/
    │   ├── auth.routes.js     # /api/auth routes
    │   └── music.routes.js    # /api/music routes
    ├── middlewares/
    │   └── auth.middleware.js # JWT auth guards (authUser, authArtist)
    └── services/
        └── storage.service.js # ImageKit file upload abstraction
```

---

## ✨ Features Implemented

### 🔐 Authentication & Authorization
- **User Registration** — Creates a new user with hashed password (`bcryptjs`). Issues a JWT stored in an HTTP cookie. Supports `user` and `artist` roles.
- **User Login** — Validates credentials, issues a new JWT cookie containing `id` and `role`.
- **User Logout** — Clears the JWT cookie server-side.
- **Role-Based Access Control (RBAC)** via two middleware guards:
  - `authUser` — Allows both `user` and `artist` roles. Protects read endpoints.
  - `authArtist` — Allows only the `artist` role. Protects write/upload endpoints.

### 🎵 Music Management
- **Upload Music** — Artists can upload a music file (`.mp3`) via `multipart/form-data`. The file is processed in-memory by Multer, encoded as Base64, and stored in ImageKit cloud under `yt-Backend/music/`. The returned CDN URL is saved in MongoDB.
- **Get All Music** — Returns a paginated list (limit 20, skip 0) of all music tracks with the artist's `username` and `email` populated.

### 💿 Album Management
- **Create Album** — Artists can create an album by providing a title and an array of music IDs.
- **Get All Albums** — Returns a list of all albums with the artist's details populated (without loading full music data for performance).
- **Get Album by ID** — Returns a single album with full artist details and all associated music tracks' titles populated.

### ☁️ Cloud Storage (ImageKit)
- A dedicated `storage.service.js` abstracts ImageKit file upload logic.
- Files are uploaded using the ImageKit Node.js SDK with configurable `publicKey`, `privateKey`, and `urlEndpoint` from environment variables.

---

## 🗄️ Data Models

### User
```js
{
  username: String,   // required
  email:    String,   // required, unique
  password: String,   // required, bcrypt-hashed
  role:     String    // enum: ["user", "artist"], default: "user"
}
```

### Music
```js
{
  title:  String,       // required
  uri:    String,       // required — ImageKit CDN URL
  artist: ObjectId(ref: "User")  // required
}
```

### Album
```js
{
  title:  String,               // required
  musics: [ObjectId(ref: "music")],
  artist: ObjectId(ref: "User")
}
```

---

## 🛣️ API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | ❌ Public | Register a new user or artist |
| `POST` | `/login` | ❌ Public | Login and receive JWT cookie |
| `POST` | `/logout` | ❌ Public | Clear the JWT cookie |

#### Register Request Body
```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "secret123",
  "role": "artist"
}
```

---

### Music Routes — `/api/music`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/upload` | ✅ | Artist only | Upload a music file |
| `POST` | `/album` | ✅ | Artist only | Create a new album |
| `GET` | `/` | ✅ | User / Artist | Get all music (paginated) |
| `GET` | `/albums` | ✅ | User / Artist | Get all albums |
| `GET` | `/albums/:albumId` | ✅ | User / Artist | Get a single album by ID |

#### Upload Music (`POST /api/music/upload`)
- **Content-Type:** `multipart/form-data`
- **Fields:** `music` (file), `title` (text)
- Requires artist JWT cookie

#### Create Album (`POST /api/music/album`)
```json
{
  "title": "My First Album",
  "musics": ["<musicId1>", "<musicId2>"]
}
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Back5
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the `Back5/` directory:
```env
PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_super_secret_key

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Run in production
```bash
npm start
```

---

## 🔒 How Authentication Works

1. User **registers** or **logs in** → server creates a JWT containing `{ id, role }` (and `username` for register) and sets it as an HTTP cookie named `token`.
2. Protected routes use the **`authUser`** or **`authArtist`** middleware, which reads the cookie, verifies the JWT, and attaches the decoded payload to `req.user`.
3. Controllers use `req.user.id` to associate resources with the authenticated user.
4. On **logout**, the server calls `res.clearCookie("token")` to invalidate the session.

---

## 📦 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `nodemon server.js` | Development server with hot-reload |
| `start` | `node server.js` | Production server |