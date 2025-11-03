FROM node:20-alpine

# مجلد العمل داخل الحاوية
WORKDIR /app

# انسخ ملفات package من server
COPY server/package*.json ./

# ثبت الباكجات
RUN npm install

# انسخ باقي المشروع كله
COPY . .

# حدد المنفذ
EXPOSE 10000

# شغّل التطبيق
CMD ["node", "server/index.js"]
