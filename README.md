<h1>React-Template</h1>

##  Overview

Safeguard UI is the project responsible for creating, in a visual format, a simple and elegant way to manage your accounts and passwords through the Safeguard API.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Project Index](#project-index)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Building Static Application](#building-static-application)


##  Project Structure

```

┌── public
│   └── assets
├── src
│   ├── auth
│   ├── base-components
│   ├── components
│   ├── config
│   ├── dialogs
│   ├── interfaces
│   ├── pages
│   ├── routes
│   ├── schemas
│   ├── services
│   ├── slices
│   ├── utils
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   ├── environment.tsx
│   ├── index.css
│   └──  store.ts
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

##  Getting Started

###  Prerequisites

Before getting started with , ensure your runtime environment meets the following requirements:

- **Node.js 20.0:** https://nodejs.org/pt/blog/release/v20.0.0

###  Installation

Install  using one of the following methods:

**Build from source:**

Clone the  repository:
```sh
 git clone https://github.com/VictorAlvesFarias/Safeguard-Backend
```

### Run dev mode &nbsp; 

Install the project dependencies:

```sh
 npm i
 ```
```sh
 yarn i
 ```
```sh
 pnpm i
```

Run  using the following command:


```sh
 npm run dev
```
 
```sh
 yarn run dev
```

```sh
 pnpm run dev
```

## Building static application;


The build destination folder will be "dist".

```sh
 npm run build
```
 
```sh
 yarn run build
```

```sh
 pnpm run build
```

