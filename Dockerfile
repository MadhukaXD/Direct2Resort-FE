# stage 1
FROM node:10.15-alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2 
FROM nginx:alpine
COPY --from=node /app/dist/ivys-proj /usr/share/nginx/html

