# استخدم نسخة Node.js خفيفة
FROM node:20-alpine

# أنشئ مجلد العمل
WORKDIR /app

# انسخ ملفات المشروع الأساسية لتثبيت الحزم
COPY package*.json ./

# ثبّت الحزم
RUN npm install

# انسخ باقي الملفات
COPY . .

# افتح البورت الذي يستخدمه التطبيق
EXPOSE 10000

# أمر التشغيل
CMD ["node", "server/index.js"]
