# Use the official Golang image as the base image

# Set the working directory inside the container

# Copy the main.go file to the working directory

# Expose the port that the API listens on

# Run the code when the container starts

# Build stage
FROM golang:1.22-alpine

WORKDIR /app

COPY main.go .

RUN go build -o shipping-service main.go

EXPOSE 8080

CMD ["./shipping-service"]


