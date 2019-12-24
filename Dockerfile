FROM node:12.10.0

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY build /app
COPY ./last_commit_message.txt /app/last_commit_message.txt

EXPOSE 8080
CMD [ "npm", "start" ]
