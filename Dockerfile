FROM node:20-alpine

WORKDIR /app

# Install a simple discussion forum
RUN npm init -y && npm install express body-parser

COPY forum.js /app/forum.js

EXPOSE 8000
CMD ["node", "forum.js"]
