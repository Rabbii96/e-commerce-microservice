# Use the official Python image as the base image

# Set the working directory inside the container

# Copy the requirements file to the working directory

# Install the dependencies

# Copy the rest of the application source code

# Expose the port that the API listens on

# Run the Flask application when the container starts

FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 3002

CMD ["python", "app.py"]

