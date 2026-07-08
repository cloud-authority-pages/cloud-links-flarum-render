FROM node:20-alpine
WORKDIR /app
RUN npm init -y && npm install express
COPY forum.js .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "forum.js"]
