# استخدم Node Alpine صغير وخفيف
FROM node:20-alpine

# أنشئ مجلد العمل
WORKDIR /app

# انسخ package.json و package-lock.json
COPY server/package*.json ./

# ثبّت الباكجات
RUN npm install

# انسخ باقي المشروع
COPY . .

# عرّف البورت
EXPOSE 5000

# شغّل السيرفر
CMD ["npm", "start"]
