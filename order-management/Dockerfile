# Use the official Maven runtime with JDK 17 as a base image

# Set the working directory inside the container

# Copy the project files

# Expose the port that the application listens on

## 5. Define the command to run when the container starts.


# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 9090

CMD ["java", "-jar", "app.jar"]

