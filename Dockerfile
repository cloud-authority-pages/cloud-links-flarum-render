FROM node:20-alpine
WORKDIR /app
RUN npm init -y && npm install express body-parser
COPY forum.js .
EXPOSE 8000
CMD ["node", "forum.js"]
