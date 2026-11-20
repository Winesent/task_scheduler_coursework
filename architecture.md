# Архитектурные требования (`architecture.md`)

**Тема курсовой работы:** Разработка планировщика задач на день с уведомлениями и регулярными повторами с использованием библиотеки React.

---

## 1. Структура проекта

Проект организован как монорепозиторий из двух самостоятельных пакетов на TypeScript (ES-модули, `"type": "module"`):

1. **`ui-library/` (`@my-app/ui-library`)** — библиотека переиспользуемых UI-компонентов, типов предметной области и общих стилей для планировщика задач. Собирается в ES-модуль (`dist/index.js`), файл стилей (`dist/index.css`) и файлы деклараций TypeScript (`dist/index.d.ts`).
2. **`frontend/` (`frontend`)** — основное клиентское веб-приложение (SPA) на React, которое реализует маршрутизацию, управление состоянием задач на день, страницы работы с повторами и уведомлениями, используя компоненты и типы из `@my-app/ui-library`.

### Структура папок и файлов

#### Корневая директория

```text
.
├── README.md          # Описание проекта, инструкция по запуску и скриншоты
├── architecture.md    # Архитектурные требования проекта
├── mvp.md             # Функциональные требования к MVP
├── .gitignore         # Исключение node_modules, dist, coverage, временных и служебных папок
├── images/            # Скриншоты работы приложения
├── ui-library/        # Пакет библиотеки общих компонентов
└── frontend/          # Пакет основного приложения
```

#### `ui-library/`

```text
ui-library/
├── eslint.config.js               # Конфигурация ESLint (flat config)
├── jest.config.ts                 # Конфигурация Jest + пороги покрытия
├── package.json                   # Зависимости и скрипты библиотеки
├── tsconfig.json                  # Конфигурация TypeScript для разработки и тестов
├── tsconfig.build.json            # Конфигурация TypeScript для сборки
├── vite.config.ts                 # Конфигурация Vite (режим library + vite-plugin-dts)
├── src/
│   ├── index.ts                   # Публичная точка входа (экспорт компонентов и типов)
│   ├── setupTests.ts              # Подключение матчеров @testing-library/jest-dom
│   ├── types.ts                   # Общие типы: Task, RepeatMode, NewTaskData
│   └── components/
│       ├── components.css         # Общие стили компонентов библиотеки
│       ├── NotificationBadge.tsx  # Индикатор статуса и счётчика уведомлений
│       ├── RepeatRulePreview.tsx  # Карточка предпросмотра правила регулярного повтора
│       ├── TaskForm.tsx           # Форма создания задачи с валидацией
│       └── TaskList.tsx           # Список задач с группировкой по часам
└── tests/
    ├── NotificationBadge.test.tsx # Юнит-тесты для NotificationBadge
    ├── RepeatRulePreview.test.tsx # Юнит-тесты для RepeatRulePreview
    ├── TaskForm.test.tsx          # Юнит-тесты для TaskForm
    └── TaskList.test.tsx          # Юнит-тесты для TaskList
```

#### `frontend/`

```text
frontend/
├── eslint.config.js               # Конфигурация ESLint (flat config)
├── index.html                     # HTML-шаблон приложения
├── jest.config.ts                 # Конфигурация Jest + маппинг @my-app/ui-library на исходники
├── package.json                   # Зависимости и скрипты приложения
├── tsconfig.json                  # Корневой tsconfig
├── tsconfig.app.json              # Конфигурация TypeScript для исходников приложения
├── tsconfig.node.json             # Конфигурация TypeScript для Vite
├── vite.config.ts                 # Конфигурация сборщика Vite
├── public/
│   └── vite.svg                   # Иконка приложения
├── src/
│   ├── main.tsx                   # Точка входа, подключение стилей библиотеки и рендер App
│   ├── App.tsx                    # Корневой компонент с TasksProvider и BrowserRouter
│   ├── AppRoutes.tsx              # Декларация дерева маршрутов приложения
│   ├── setupTests.ts              # Настройка окружения тестов (jest-dom, TextEncoder)
│   ├── styles.css                 # Стили макета, навигации и страниц приложения
│   ├── context/
│   │   ├── tasksContext.ts        # Контекст задач, начальные данные и хук useTasks
│   │   └── TasksProvider.tsx      # Провайдер состояния списка задач на день
│   ├── layouts/
│   │   └── MainLayout.tsx         # Общий каркас страниц (шапка, навигация, Outlet, подвал)
│   ├── components/
│   │   ├── AppNavigation.tsx      # Навигационное меню по маршрутам приложения
│   │   └── DaySummary.tsx         # Сводка дня (прогресс выполнения и статус уведомлений)
│   └── pages/
│       ├── TodayPage.tsx          # Главная страница: план на день и список задач
│       ├── CreateTaskPage.tsx     # Страница создания новой задачи
│       ├── TaskDetailsPage.tsx    # Страница карточки задачи (параметризованный маршрут)
│       ├── RepeatsPage.tsx        # Страница регулярных повторов
│       ├── NotificationsPage.tsx  # Страница центра уведомлений и настроек
│       └── NotFoundPage.tsx       # Страница ошибки 404
└── tests/
    └── App.test.tsx               # Интеграционные тесты маршрутизации и страниц приложения
```

---

## 2. Используемые библиотеки и инструменты

### Основные зависимости (`frontend`)

| Библиотека | Версия (`package.json`) | Назначение |
| --- | --- | --- |
| `react` | `^19.3.0` | Построение компонентного пользовательского интерфейса |
| `react-dom` | `^19.3.0` | Рендеринг React-приложения в DOM браузера |
| `react-router-dom` | `^7.18.5` | Клиентская маршрутизация, вложенные layout-маршруты и параметры URL |
| `@my-app/ui-library` | `file:../ui-library` (`1.0.0`) | Локальная библиотека общих UI-компонентов, типов и стилей |

### Инструменты разработки, сборки, линтинга и тестирования (`ui-library` и `frontend`)

| Пакет | Версия (`package.json`) | Назначение |
| --- | --- | --- |
| `typescript` | `~5.9.3` | Статическая типизация исходного кода и тестов |
| `vite` | `^7.1.11` (`frontend`), `^7.1.7` (`ui-library`) | Сборка приложения и библиотеки, dev-сервер |
| `@vitejs/plugin-react` | `^5.0.4` | Поддержка React Fast Refresh и JSX в Vite |
| `vite-plugin-dts` | `^5.1.2` (`ui-library`) | Генерация `.d.ts` файлов при сборке библиотеки |
| `eslint` | `^9.36.0` | Статический анализ и контроль стиля кода |
| `typescript-eslint` | `^8.45.0` | Правила ESLint для TypeScript |
| `eslint-plugin-import` | `^2.32.0` | Контроль порядка и группировки ES6-импортов |
| `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` | `^7.37.5`, `^7.1.1`, `^0.5.7` | Правила качества React-компонентов и хуков |
| `jest`, `jest-environment-jsdom`, `ts-jest` | `^30.2.0`, `^30.2.0`, `^29.4.5` | Среда запуска модульных и интеграционных тестов |
| `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` | `^16.3.0`, `~6.9.1`, `^14.6.1` | Тестирование компонентов с имитацией действий пользователя |
| `identity-obj-proxy` | `^3.0.0` | Мокирование импортов CSS-файлов в Jest |

---

## 3. Разрабатываемые компоненты

### В рамках `ui-library`

- **`TaskForm`** (`src/components/TaskForm.tsx`) — контролируемая форма создания задачи с полями названия, времени (`00:00–24:00`) и режима повтора (`none`, `daily`, `weekdays`, `weekly`), встроенной русскоязычной валидацией и очисткой после отправки.
- **`TaskList`** (`src/components/TaskList.tsx`) — список задач, сортирующий элементы по возрастанию времени, группирующий их по часам, отображающий чекбоксы выполнения, бейджи повтора и пустое состояние.
- **`NotificationBadge`** (`src/components/NotificationBadge.tsx`) — компактный индикатор состояния напоминаний (включены/отключены) и количества активных уведомлений.
- **`RepeatRulePreview`** (`src/components/RepeatRulePreview.tsx`) — карточка предпросмотра правила регулярного повтора с текстовым описанием расписания для задачи.

### В рамках `frontend`

- **`MainLayout`** (`src/layouts/MainLayout.tsx`) — общий каркас всех страниц с шапкой, навигацией, областью вывода дочерних маршрутов (`Outlet`) и подвалом.
- **`AppNavigation`** (`src/components/AppNavigation.tsx`) — панель ссылок (`NavLink`) для переключения между основными разделами планировщика.
- **`DaySummary`** (`src/components/DaySummary.tsx`) — сводка прогресса выполнения задач за день с прогресс-баром и индикатором `NotificationBadge`.
- **`TasksProvider`** (`src/context/TasksProvider.tsx`) — провайдер контекста состояния задач, обеспечивающий единое хранилище задач между всеми страницами приложения.
- **Страницы (`src/pages/`)**: `TodayPage`, `CreateTaskPage`, `TaskDetailsPage`, `RepeatsPage`, `NotificationsPage`, `NotFoundPage`.

---

## 4. Структура роутинга

Маршрутизация настроена с помощью `BrowserRouter`, `Routes` и `Route` в `AppRoutes.tsx`. Все страницы рендерятся внутри вложенного layout-маршрута `MainLayout`:

| Маршрут | Страница / компонент | Вложенность и параметры | Назначение |
| --- | --- | --- | --- |
| `/` | `TodayPage` | `index`-маршрут внутри `MainLayout` | Главная страница: сводка дня, расписание задач на сегодня, ссылки на детали |
| `/tasks/new` | `CreateTaskPage` | Дочерний маршрут внутри `MainLayout` | Страница создания новой задачи и настройки параметров напоминания |
| `/tasks/:taskId` | `TaskDetailsPage` | Параметризованный маршрут (`:taskId`) внутри `MainLayout` | Карточка конкретной задачи: статус, время, правило повтора, будущие настройки напоминаний |
| `/repeats` | `RepeatsPage` | Дочерний маршрут внутри `MainLayout` | Список повторяющихся задач и каркас управления регулярными сериями |
| `/notifications` | `NotificationsPage` | Дочерний маршрут внутри `MainLayout` | Центр напоминаний на день и заглушка настроек браузерных уведомлений |
| `*` | `NotFoundPage` | Fallback-маршрут внутри `MainLayout` | Обработка несуществующих адресов (страница 404) |

**Защищённые маршруты:** в рамках первой версии (MVP) приложение работает локально в браузере без серверной авторизации и учётных записей, поэтому маршруты, требующие аутентификации, не предусмотрены.

---

## 5. Использование библиотеки общих компонентов основным приложением

1. **Подключение пакета:** `frontend` подключает библиотеку `@my-app/ui-library` через локальную файловую зависимость `"@my-app/ui-library": "file:../ui-library"` в `frontend/package.json`.
2. **Стили:** в `frontend/src/main.tsx` импортируется собранный файл стилей библиотеки `@my-app/ui-library/style.css`.
3. **Компоненты и типы:**
   - `TodayPage` импортирует и отображает `TaskList`;
   - `CreateTaskPage` импортирует и отображает `TaskForm`;
   - `DaySummary` и `NotificationsPage` импортируют и отображают `NotificationBadge`;
   - `TaskDetailsPage` и `RepeatsPage` импортируют и отображают `RepeatRulePreview` и `NotificationBadge`;
   - модели `Task`, `NewTaskData` импортируются в `TasksProvider`, `tasksContext` и `DaySummary`.
4. **Тестирование:** в `frontend/jest.config.ts` импорт `@my-app/ui-library` направлен через `moduleNameMapper` на исходный файл `../ui-library/src/index.ts`, а алиасы `react` и `react-dom` — на единый экземпляр React в `frontend/node_modules`, что позволяет запускать интеграционные тесты без дублирования React и до пересборки `dist/`.
