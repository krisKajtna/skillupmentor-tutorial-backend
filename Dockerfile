FROm node:22

#Create app directory
WORKDIR /kris/src/app

COPY package*.json ./

COPY . .

RUN npm run build

EXPOSE 8080
CMD ["node", "dist/main.js"]