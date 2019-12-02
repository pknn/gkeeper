# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
ADD ./nginx.conf /etc/nginx/nginx.conf 
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
RUN apk add --no-cache bash
COPY ./wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
CMD ["/wait-for-it.sh", "api:8081", "--", "nginx", "-g", "daemon off;"]