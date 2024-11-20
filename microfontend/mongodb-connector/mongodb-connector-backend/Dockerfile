# Stage 1: Build
FROM gradle:8.5-jdk21 AS builder
WORKDIR /app
COPY build.gradle settings.gradle ./
COPY src/ src/
RUN gradle clean build --no-daemon

# Stage 2: Run
FROM openjdk:21-jdk-slim
EXPOSE 8088
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
