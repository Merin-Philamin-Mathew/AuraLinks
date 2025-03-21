

# AuraLinks  

AuraLinks is a web application built with **Django** (backend) and **React** (frontend). It includes features like **OAuth authentication (Google/Microsoft), an AI-powered chatbot, weather updates, and a custom URL shortener.**  

## Features  
- **OAuth Authentication**: Google and Microsoft login using Django Allauth/Social Auth.  
- **ChatGPT/Gemini API Integration**: AI chatbot with conversation history storage.  
- **Weather API Integration**: Fetches weather data from OpenWeatherMap and updates hourly using Celery.  
- **Custom URL Shortener**: Create short URLs and track analytics.  

## Requirements  
Before running the project, ensure you have the following installed:  
- Python (>= 3.8)  
- Node.js (>= 16)  
- PostgreSQL  
- Redis (for Celery)  
- AWS credentials (if using AWS services)  

## Installation  

### 1. Backend Setup (Django)  
```bash
# Clone the repository
git clone https://github.com/your-repo/auralinks.git
cd auralinks/backend

# Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env  # Update with your actual credentials

# Run database migrations
python manage.py migrate

# Create a superuser (optional for admin access)
python manage.py createsuperuser

# Start the Django server
python manage.py runserver
```

### 2. Frontend Setup (React)  
```bash
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env  # Update with your actual API keys

# Start the React development server
npm run dev
```

### 3. Celery (for background tasks)  
```bash
# Start Redis server
redis-server

# Run Celery worker
celery -A backend worker --loglevel=info

# Run Celery Beat (if scheduled tasks are used)
celery -A backend beat --loglevel=info
```

### 4. Running with Docker (Optional)  
If you prefer using Docker, follow these steps:  
```bash
# Build and start the containers
docker-compose up --build -d
```

## Additional Notes  
- Make sure **PostgreSQL** is running with the correct database credentials.  
- **CORS and CSRF settings** are configured to allow frontend-backend communication.  
- Update **Google API keys** and **AWS credentials** in `.env`.  
- If deploying, use **DEBUG=False** in `.env` and set up proper security configurations.  

