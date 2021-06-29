FROM node:14 

COPY ["package.json", "package-lock.json", "/usr/src"]

WORKDIR /usr/src

RUN npm install --only=production

COPY [".", "/usr/src"] 

RUN npm install --only=development

EXPOSE 3003

CMD ["npx", "nodemon", "index.js"]
