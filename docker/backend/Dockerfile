## Stage 1: Build
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /build
# Copy my pom.xml file to the current location (/build)
COPY pom.xml .
# Download all the dependencies (the required dependencies are downloaded only one time)
RUN mvn dependency:go-offline
# Copy the project (src folder) to src in the current location (/build/src)
COPY src ./src
# Build the application without running the tests
RUN mvn clean package -DskipTests

## Stage 2: Run
FROM amazoncorretto:17
# The profile by default will be dev and version will be 0.0.1 (if we don't pass the arguments)
ARG PROFILE=dev
ARG APP_VERSION=0.0.1-SNAPSHOT

WORKDIR /app
# Copy the .jar previusly generated in Stage 1 to my current location
COPY --from=build /build/target/book-network-*.jar /app/
EXPOSE 8088

# Docker container name instead of localhost (bc my database is in docker container)
ENV DB_URL=jdbc:postgresql://postgres-sql-bsn:5432/book_social_network
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} book-network-${JAR_VERSION}.jar

## Inside of our backend folder, run command:
# docker build -t bsn/bsn:0.0.1 -f ../docker/backend/Dockerfile .