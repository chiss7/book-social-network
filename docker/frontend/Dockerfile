FROM node:18.20.4 as build-stage
WORKDIR /app
# Copy package*.json files to the current location (/app)
COPY package*.json .
RUN npm install
# Copy the project to /app
COPY . .
RUN npm run build --prod
# Nginx is used in several ways: 1. It serves static files (html, css, js) and Angular apps will generate static content
# when we build the application. 2. Nginx also serves as a reverse proxy to forward client requests to backend servers.
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/book-network-ui /usr/share/nginx/html
EXPOSE 80

## Inside of our frontend folder, run command:
# docker build -t bsn/bsn-ui:0.0.1 -f ../docker/frontend/Dockerfile .