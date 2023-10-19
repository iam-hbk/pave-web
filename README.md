<p align="center">
<a href=https://github.com/iam-hbk/pave-web target="_blank">
<img src='/public/assets/svgs/Pave_Logo.svg' width="100%" alt="Banner" />
</a>
</p>



<p align="center">
<img src="https://img.shields.io/github/languages/code-size/iam-hbk/pave-web" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/last-commit/iam-hbk/pave-web" alt="GitHub last commit" />
<img src="https://img.shields.io/github/commit-activity/m/iam-hbk/pave-web" alt="GitHub commit activity month" />
<img src="https://img.shields.io/github/license/iam-hbk/pave-web" alt="GitHub license" />
</p>

<p></p>
<p></p>

# 📌 Overview

pave-web is a project that relies on essential dependencies such as radix-ui/react-dialog, supabase/supabase-js, axios, daisyui, formik, framer-motion, langchain, next, next-qrcode, pdf-parse, react, react-dom, react-hook-form, react-icons, react-query, socket.io-client, sonner, yup, tailwindcss/typography, types/node, types/react, types/react-dom, autoprefixer, eslint, eslint-config-next, postcss, prettier, prettier-plugin-tailwindcss, tailwindcss, and typescript.

## 🔍 Table of Contents

* [📁 Project Structure](#project-structure)

* [📝 Project Summary](#project-summary)

* [💻 Stack](#stack)

* [⚙️ Setting Up](#setting-up)

* [🚀 Run Locally](#run-locally)

* [🙌 Contributors](#contributors)

* [☁️ Deploy](#deploy)

* [📄 License](#license)

## 📁 Project Structure

```bash
├── .env
├── .env.example
├── .eslintrc.json
├── .gitignore
├── LICENSE
├── README.md
├── next.config.js
├── package.json
├── postcss.config.js
├── prettier.config.js
├── public
│   ├── assets
│   │   └── svgs
│   │       ├── Education.svg
│   │       ├── Pave_Logo.svg
│   │       ├── arrow_change.svg
│   │       ├── building.svg
│   │       ├── bulb.svg
│   │       ├── contact.svg
│   │       ├── form.svg
│   │       ├── phone_features.svg
│   │       └── wizard.svg
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── app
│   │   ├── dashboard
│   │   │   ├── home
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── quiz
│   │   │       ├── form
│   │   │       │   └── page.tsx
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       └── wizard
│   │   │           └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── AttendanceRecord.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── ContactUs.tsx
│   │   ├── CurrentClassSessions.tsx
│   │   ├── CurrentQuizzes.tsx
│   │   ├── DisplayQuiz.tsx
│   │   ├── Dot.tsx
│   │   ├── Features.tsx
│   │   ├── Mission.tsx
│   │   ├── Navbar.tsx
│   │   ├── PublishQuizModal.tsx
│   │   ├── QRCodeModal.tsx
│   │   ├── QuizQRCodeModal.tsx
│   │   ├── RadixModal.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StudentList.tsx
│   │   └── Welcome.tsx
│   ├── hooks
│   │   └── useSocket.ts
│   └── utils
│       ├── apis
│       │   ├── index.ts
│       │   ├── quiz.ts
│       │   ├── sessions.ts
│       │   ├── socket.ts
│       │   └── supabase.ts
│       ├── helpers
│       │   └── index.ts
│       └── interfaces
│           ├── index.ts
│           └── socket.ts
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock
```

## 📝 Project Summary

- [**src**](src): Core source directory containing the main application code.
- [**src/app**](src/app): Houses the main application components and logic.
- [**src/utils**](src/utils): Contains utility functions and helper modules used throughout the project.
- [**src/components**](src/components): Collection of reusable UI components.
- [**src/hooks**](src/hooks): Custom React hooks for managing state and side effects.
- [**src/utils/apis**](src/utils/apis): Handles API communication and data fetching.
- [**src/utils/helpers**](src/utils/helpers): Provides helper functions for common tasks.
- [**src/utils/interfaces**](src/utils/interfaces): Stores TypeScript interfaces used for type checking.
- [**public**](public): Directory for static assets and entry point HTML file.
- [**public/assets**](public/assets): Holds static assets such as images and fonts.

## 💻 Stack

- [supabase/supabase-js](https://github.com/supabase/supabase-js): Provides a JavaScript client library for Supabase, an open-source Firebase alternative.
- [axios](https://github.com/axios/axios): A popular HTTP client library for making API requests.
- [formik](https://formik.org/): A library for building forms in React, providing form validation, error handling, and more.
- [react-query](https://react-query.tanstack.com/): A data-fetching library that simplifies and optimizes data fetching and caching in React applications.
- [next](https://nextjs.org/): A framework for building server-rendered React applications, providing features like server-side rendering, static site generation, and more.
- [react](https://reactjs.org/): A JavaScript library for building user interfaces.
- [react-dom](https://reactjs.org/docs/react-dom.html): Provides DOM-specific methods for React, allowing rendering React components in the browser.
- [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework for building responsive and customizable user interfaces.

## ⚙️ Setting Up

#### NEXT_PUBLIC_SUPABASE_URL
- Go to the Supabase website.
- Sign up for an account or log in if you already have one.
- Create a new project or select an existing project.
- In the project dashboard, navigate to the "Settings" tab.
- Copy the URL value provided under "API URL" and use it as the value for NEXT_PUBLIC_SUPABASE_URL.

#### NEXT_PUBLIC_SUPABASE_ANON_KEY
- Go to the Supabase website.
- Sign up for an account or log in if you already have one.
- Create a new project or select an existing project.
- In the project dashboard, navigate to the "Settings" tab.
- Under "API Keys", copy the value provided for "Anonymous Key" and use it as the value for NEXT_PUBLIC_SUPABASE_ANON_KEY.

## 🚀 Run Locally
1.Clone the pave-web repository:
```sh
git clone https://github.com/iam-hbk/pave-web
```
2.Install the dependencies with one of the package managers listed below:
```bash
pnpm install
bun install
npm install
yarn install
```
3.Start the development mode:
```bash
pnpm dev
bun dev
npm run dev
yarn dev
```

## 🙌 Contributors
<a href="https://github.com/iam-hbk/pave-web/graphs/contributors">
<img src="https://contrib.rocks/image?repo=iam-hbk/pave-web" />
</a>

## ☁️ Deploy

[PAVE](https://pave-web-lilac.vercel.app/)

## 📄 License

This project is licensed under the **GNU General Public License v3.0** - see the [**GNU General Public License v3.0**](https://github.com/iam-hbk/pave-web/blob/production/LICENSE) file for details.

