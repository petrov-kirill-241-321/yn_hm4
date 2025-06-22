# Иструкция по запуску

- зайти в папку frontend (cd frontend), написать в терминале команду npm run dev
- зайти в папку shri2025-back (cd shri2025-back), написать в терминале команду npm run start

# 📁 Архитектура фронтенда

```bash
frontend/
├── src/
│   ├── assets/            # 🎨 Статика: изображения, иконки, шрифты
│   ├── components/        # 🧩 Переиспользуемые UI-компоненты
│   ├── features/          # 🚀 Бизнес-логика + UI
│   ├── pages/             # 📄 Страницы
│   ├── services/          # 🔌 Сервисы
│   ├── App.tsx            # 🔌 Корневой компонент приложения
│   ├── main.tsx           # 🚪 Точка входа React-приложения
│   └── vite-env.d.ts      # ⚙️ Типы окружения Vite
├── store/                 # 🧠 Глобальное состояние
├── public/                # 🌐 Статические ресурсы
├── api/                   # 📡 Логика API-запросов
├── index.html             # 🏗️ HTML-шаблон для Vite
├── vite.config.ts         # 🔧 Конфигурация Vite
├── tsconfig.json          # 📘 Основной tsconfig
├── tsconfig.app.json      # 📘 tsconfig для приложения
├── tsconfig.node.json     # 📘 tsconfig для Node
```
