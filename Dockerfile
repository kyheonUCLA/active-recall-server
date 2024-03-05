# building correct node version with linux alpine distro
FROM node:20-alpine

WORKDIR /app

# copies files from local machine to image, excluding files specified in .dockerignore
COPY . .

# installs dev dependencies in image
RUN npm install

EXPOSE 5050

# runs only when container (instance of an image) is created
CMD ["npx", "nodemon", "server.ts"]

# build image: docker build -t <image_name> <path/to/Dockerfile>
# run container: docker run -d --name <container_name> 5050:5050 <image_name>
