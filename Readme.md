# Mytube (Backend)

A backend service for a YouTube-like application providing authentication, video management, and subscription features.

---

## Features
- User authentication (signup / login) with JWT
- Video upload metadata and retrieval
- Subscriptions between users
- Clean RESTful API design ready for frontend integration

---

## Quick Start
1. Clone the repo:
```bash
git clone https://github.com/yourusername/fullstack_project.git
cd fullstack_project
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` with required variables:
```bash
PORT=8000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
CORS_ORIGIN=*
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
```

4. Start the development server:
```bash
npm run dev
```

## Models (Mongoose)

### User
```js
{
  _id: ObjectId,
  username: String,
  email: String,
  fullName: String,
  avatar: String,
  coverImage: String,
  password: String,
  refreshToken: String,
}
```

## API Endpoints

### Auth & User Management
- `POST /api/v1/users/register` - Register new user (multipart/form-data)
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout (protected)
- `POST /api/v1/users/refresh-token` - Refresh access token
- `POST /api/v1/users/change-password` - Change password (protected)
- `GET /api/v1/users/current-user` - Get current user (protected)
- `PATCH /api/v1/users/update-account` - Update account details (protected)
- `PATCH /api/v1/users/avatar` - Update avatar (protected)
- `PATCH /api/v1/users/cover-image` - Update cover image (protected)
- `GET /api/v1/users/c/:username` - Get channel profile (protected)
- `GET /api/v1/users/history` - Get watch history (protected)


## Data Flow & Architecture


### High-level flowchart
```mermaid
flowchart LR
Client[Client / Frontend]
Auth[Auth Service]
API[Video & Subscription API]
DB[(MongoDB)]
Cloud[(Cloudinary / File Storage)]


Client -->|signup/login| Auth
Client -->|JWT| API
API --> DB
API -->|video file| Cloud
Cloud -->|file URL| API
API --> Client
```


### Sequence (Upload + Subscribe)
```mermaid
sequenceDiagram
participant C as Client
participant A as Auth
participant API as API Server
participant DB as MongoDB
participant CL as Cloudinary


C->>A: POST /users/login
A->>C: JWT
C->>API: POST /videos (JWT + metadata + file)
API->>CL: Upload file
CL-->>API: file URL
API->>DB: save video metadata
DB-->>API: video record
API-->>C: 201 Created (video id)


C->>API: POST /subscriptions (JWT, channelId)
API->>DB: create subscription
DB-->>API: subscription record
API-->>C: 201 Created
```


---

## Example Requests

Register (multipart/form-data):
```bash
curl -X POST http://localhost:8000/api/v1/users/register ^
  -F "fullName=Test User" ^
  -F "email=test@example.com" ^
  -F "username=testuser" ^
  -F "password=secret123" ^
  -F "avatar=@path/to/avatar.jpg"
```

Login:
```bash
curl -X POST http://localhost:8000/api/v1/users/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"secret123\"}"
```

---

## Testing & Docs
- Use Postman or Swagger to document endpoints.
- Add unit/integration tests (Jest + Supertest) for critical routes.

---

## Future work / Frontend
- Implement React frontend that consumes these APIs
- Add likes, comments, playlists, and search ranking
- Implement file uploads with signed URLs (S3 / Cloud Storage)

---

## License
MIT
