# Используем официальный образ Node.js для сборки
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код в контейнер
COPY . .

# Собираем React-приложение
RUN npm run build

# Используем Nginx для раздачи фронтенда
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 80 для работы Nginx
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
