# AuraLinks

AuraLinks is a full-stack web application built using **React** for the frontend and **Django** for the backend. It combines essential real-world integrations and intelligent features like OAuth login, weather updates, a ChatGPT-powered chatbot, and a URL shortener service. The project demonstrates seamless API integration, secure authentication, and user-centered design.

---

## 🚀 Features Implemented

### 1. 🔐 OAuth Authentication (Google/Microsoft)
- Implemented using **django-allauth**.
- Users can sign up or log in with Google or Microsoft accounts.
- After successful login, users are redirected to their profile page.
- User details are stored in a custom user model.

### 2. 💬 AI-Powered Chatbot (ChatGPT Integration)
- Chat interface built in the frontend using React.
- Connected to **OpenAI's ChatGPT** API via Django REST Framework.
- Stores and retrieves past conversations for each user.
- Chat history is saved in the database for continuity.

### 3. 🌤 Weather API Integration
- Integrated **OpenWeatherMap API** to fetch real-time weather data.
- Users can search for weather by entering a city name.
- Recent weather searches are stored in the database.
- Weather data auto-updates hourly using **Celery** and **Redis**.

### 4. 🔗 URL Shortener
- Custom URL shortening tool similar to Bit.ly.
- Users can create and manage short URLs.
- Tracks click count and provides basic analytics.

---

## 🛠️ Tech Stack

### Frontend
- React (with Tailwind CSS for styling)
- Axios for API requests

### Backend
- Django & Django REST Framework
- PostgreSQL Database
- Celery & Redis for background tasks

### Integrations
- OpenAI (ChatGPT API)
- OpenWeatherMap API
- Google/Microsoft OAuth via django-allauth

---

## 🔧 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/AuraLinks.git
cd AuraLinks
```

### 2. Backend Setup (Django)
```bash
cd auralink_backend
python -m venv env
source env/bin/activate  # or `env\Scripts\activate` on Windows
pip install -r requirements.txt

# Set up .env file with your credentials (example below)
SECRET_KEY=your_secret_key
DEBUG=True
POSTGRES_DB=your_db
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
OPENAI_API_KEY=your_openai_key
WEATHER_API_KEY=your_openweather_key

# Apply migrations
python manage.py migrate

# Start Celery (in a separate terminal)
celery -A auralink_backend worker -l info

# Start Celery Beat Scheduler (in another terminal)
celery -A auralink_backend beat -l info

# Run the Django server
python manage.py runserver
```

### 3. Frontend Setup (React)
```bash
cd auralink_frontend
npm install
npm run dev
```

---

## 📌 Future Scope (Optional Enhancements)
- Spotify API integration
- Web scraping and job listing
- Google Maps real-time tracking
- Two-Factor Authentication (TOTP)
- Telegram bot for form submissions

---

## 📬 Contact
For queries or collaborations:  
**Merin Mathew**  
[LinkedIn](https://www.linkedin.com/in/merin-mathew-180308222/) | merinphilaminmathew19@gmail.com

---

Feel free to fork the project, raise issues, or contribute!

