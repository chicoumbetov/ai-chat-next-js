# AI ChatBot

Проект доступен и тестируется по ссылке: [https://ai-chat-next-js-nu.vercel.app/](https://ai-chat-next-js-nu.vercel.app/)  
Репозиторий фронтенда: [https://github.com/chicoumbetov/ai-chat-next-js](https://github.com/chicoumbetov/ai-chat-next-js)

API документация бэкенда: [https://api-scs1.onrender.com/docs](https://api-scs1.onrender.com/docs)  
Репозиторий бэкенда: [https://github.com/chicoumbetov/api](https://github.com/chicoumbetov/api)

## Краткое описание проекта
Интеллектуальный ассистент с веб-интерфейсом для обмена сообщениями с языковой моделью через изолированный бэкенд-шлюз с персистентным сохранением истории диалогов в базе данных.

## Архитектура и структура папок
Применена модульная архитектура с разделением на изолированные слои (Clean Architecture / DDD principles):

### Бэкенд (`api`)

config.py          # Конфигурация и переменные окружения
database.py        # Инициализация Supabase клиента
modules/
chat/

main.py              # Точка входа FastAPI

Структура папок
backend/
  app/
    core/
      config.py
      database.py
    modules/
      chat/
        router.py        # Эндпоинты API (/chat, /health)
        service.py       # Бизнес-логика взаимодействия с Groq API
        repository.py    # Взаимодействие с Supabase (PostgreSQL)
        schemas.py       # Pydantic схемы валидации
      user/
    main.py
  tests/
  requirements.txt
  Dockerfile

### Фронтенд (`ai-chat-next-js`)

frontend/
  src/
    app/
      page.tsx
      layout.tsx
    components/
      ChatWindow.tsx
      MessageList.tsx
      MessageInput.tsx
      Sidebar.tsx
      ThemeToggle.tsx
    hooks/
      useChat.ts
    services/
      api.ts
    styles/
      globals.css
  package.json
  tailwind.config.js

## Технологический стек и обоснование
* **Фронтенд:** Next.js (App Router), TypeScript, Tailwind CSS, React Markdown. Выбран за быструю сборку, отличный Developer Experience и бесшовный деплой на Vercel.
* **Бэкенд:** Python FastAPI, Supabase (PostgreSQL). FastAPI обеспечивает высокую производительность и автодокументацию Swagger. Supabase гарантирует надежное персистентное хранение истории сообщений.
* **LLM Интеграция:** Groq API (`openai/gpt-oss-120b`), обеспечивающий высокую скорость генерации и минимальные задержки.

## Архитектура
Применение получила упрощенная modular clean architecture. Логика разделена на изолированные слои. Маршрутизаторы принимают запросы, сервисы инкапсулируют бизнес логику взаимодействия с моделью, а схемы валидируют данные на входе и выходе.

## Инструкции по установке и запуску

### Backend
1. Клонируйте репозиторий бэкенда.
2. Создайте и активируйте виртуальное окружение:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
3. Установите зависимости:
Bash
```pip install -r requirements.txt```

4. Создайте файл .env с переменными: GROQ_API_KEY, SUPABASE_URL, SUPABASE_KEY.

5. Запустите сервер:
Bash
```uvicorn main:app --reload --port 8000```

### Frontend

1. Клонируйте репозиторий фронтенда.

2. Установите зависимости:
Bash
```pnpm install```

3. Запустите клиент в режиме разработки:
Bash
```pnpm dev```

### Инструкции по установке и запуску
Клонируйте репозиторий на локальную машину.
Перейдите в папку бэкенда, создайте виртуальное окружение, установите зависимости из файла requirements.txt и запустите сервер командой uvicorn app.main:app reload.
Перейдите в папку фронтенда, установите зависимости командой npm install и запустите клиент командой npm run dev.
Создайте файл переменных окружения с ключом доступа к API модели.

### Процесс проектирования и разработки
Разработка велась итеративно. На первом этапе создан базовый интерфейс чата. На втором этапе подключен бэкенд на FastAPI и настроен защищенный вызов внешней языковой модели. На завершающем этапе добавлены переключение тем оформления и визуальные скелетоны загрузки.

### Ключевой функционал

  - Окно переписки со списком сообщений, автоскроллом и индикаторами загрузки.

  -  Персистентное сохранение истории диалогов в Supabase с автоматической загрузкой при старте.

  -  Рендеринг ответов LLM с поддержкой Markdown и блоков кода.

  -  Переключение тем оформления (светлая/темная) с минималистичными иконками солнца и луны.

  -  Health-check эндпоинт (/api/v1/health) с мониторингом через UptimeRobot для предотвращения засыпания сервера на бесплатном тарифе Render.

### Известные проблемы и компромиссы

  На бесплатном тарифе Render возможна задержка ответа при первом запросе («просыпание» сервера), которая нивелируется автоматическими пингами health-check эндпоинта.
