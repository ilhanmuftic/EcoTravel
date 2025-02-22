# Use multi-stage builds for efficiency
FROM python:3.9-slim AS backend

# Install system dependencies for Django
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    python3-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Set backend working directory
WORKDIR /app/backend
COPY backend/requirements.txt backend/.env /app/backend/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django application
COPY backend /app/backend/

# Expose Django port
EXPOSE 8000

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use entrypoint script to start the app
ENTRYPOINT ["/entrypoint.sh"]

# ---------- Frontend Build Stage ----------
FROM node:18 AS frontend

# Set frontend working directory
WORKDIR /app/frontend

# Copy package files first
COPY frontend/package.json frontend/package-lock.json ./

# Install frontend dependencies
RUN npm ci

# Copy frontend application
COPY frontend /app/frontend/

# Expose React port
EXPOSE 3000

# ---------- Final Container ----------
FROM python:3.9-slim

# Copy backend from the first stage
COPY --from=backend /app/backend /app/backend

# Copy frontend from the second stage
COPY --from=frontend /app/frontend /app/frontend

# Set workdir to backend
WORKDIR /app/backend

# Run the Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
