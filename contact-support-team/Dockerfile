# Use the official Python image as the base image

# Set the working directory inside the container

# Copy the requirements file to the working directory

# Install the dependencies

# Copy the Flask application to the working directory

# Expose the port that the Flask application listens on

# Run the Flask application when the container starts

# Use the official Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose Flask port
EXPOSE 8000

# Run Flask app
CMD ["python", "app.py"]

