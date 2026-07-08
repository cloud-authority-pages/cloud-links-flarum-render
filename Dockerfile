FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV PLATFORM_NAME="Cloud Links Flarum"
ENV PLATFORM_COLOR="#4d2c91"
ENV PLATFORM_ACCENT="#7c4dff"
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
