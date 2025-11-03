# استخدم Node 20
FROM node:20-alpine

# أنشئ مجلد العمل داخل الحاوية
WORKDIR /app

# انسخ ملفات الـ package أولًا لتسريع npm install
COPY package*.json ./

# ثبت الباكجات
RUN npm install

# انسخ باقي المشروع
COPY . .

# حدد المنفذ
EXPOSE 10000

# شغّل التطبيق
CMD ["node", "server/index.js"]
