#!/bin/bash

# Wait for PostgreSQL to be ready
#echo "Waiting for database to be ready..."
#while ! nc -z db 5432; do
#  sleep 0.1
#done
#echo "Database is up and running!"

# Apply database migrations
python manage.py migrate
python manage.py loaddata fixtures/initial_data.json

python manage.py collectstatic

# Start the Django development server
exec python manage.py runserver 0.0.0.0:8000
