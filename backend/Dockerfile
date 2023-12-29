# Use the official Gradle image to create a build artifact.
FROM gradle:7.4.0-jdk17 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle clean build --no-daemon

# Use OpenJDK 17 for the runtime image
FROM openjdk:17-jdk-slim as runtime
EXPOSE 8080
COPY --from=build /home/gradle/src/build/libs/*.jar /app/application.jar
ENTRYPOINT ["java", "-jar", "/app/application.jar"]
