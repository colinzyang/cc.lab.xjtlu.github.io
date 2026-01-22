CC Lab Website - Structural Bioinformatics & Molecular Dynamics
================================================================

[English](#english) | [中文](#中文)

---

## English

### Project Overview

CC Lab is a research laboratory website built with modern web technologies. The site showcases research in Structural Bioinformatics & Molecular Dynamics at Xi'an Jiaotong-Liverpool University (XJTLU).

Features:
* Static site hosted on GitHub Pages
* Responsive design with dark mode support
* Content management via Decap CMS
* Team member profiles and publication listings
* Dynamic data loading from JSON files

### Quick Start

Prerequisites:
* Node.js (v18 or higher)
* npm or yarn

Installation:

1. Clone the repository:
   $ git clone https://github.com/cc.lab.xjtlu.github.io.git
   $ cd cc.lab.xjtlu.github.io

2. Install dependencies:
   $ npm install

3. Start development server:
   $ npm run dev

   Open http://localhost:5173 in your browser

4. Build for production:
   $ npm run build

### Technology Stack

* React 18 - UI framework
* TypeScript - Type safety
* React Router v6 - Client-side routing with HashRouter
* Tailwind CSS - Utility-first CSS (loaded via CDN)
* Framer Motion - Animation library
* Lucide React - Icon library
* Vite - Build tool and dev server
* Decap CMS - Headless content management system

### Project Structure

```
.
├── components/            Page-level React components
├── src/
│   ├── context/          React Context for global state
│   └── lib/
│       └── dataLoader.ts Data fetching utilities
├── public/
│   ├── data/             JSON content files (managed by Decap CMS)
│   ├── admin/            CMS interface configuration
│   └── assets/images/    Team photos, publication thumbnails
├── App.tsx               Main app component and routing
├── index.html            HTML template with Tailwind config
├── vite.config.ts        Vite build configuration
└── tsconfig.json         TypeScript configuration
```

### Routes

* `/` - Home page with hero section and recent posts
* `/#/member` - Team members page
* `/#/publication` - Publications page
* `/#/news` - News and events page
* `/#/resources` - Resources page
* `/#/contact` - Contact information page

Note: Hash-based routing is used for GitHub Pages compatibility.

### Content Management

The site uses Decap CMS for content management. Non-technical users can edit content through a visual interface without modifying code.

Accessing CMS:
* Development: http://localhost:5173/admin/
* Production: https://your-domain.com/admin/

CMS collections:
* Members - Team member profiles
* Publications - Research papers organized by year
* News - News and event announcements
* Lab Info - Contact information and lab description

### Development

Key TypeScript configurations:
* Strict mode enabled
* No unused variables or parameters allowed
* No fallthrough switch cases

For detailed development guidelines, see [CLAUDE.md](./CLAUDE.md)

### Building for Production

$ npm run build

Output is generated in the `dist/` directory. The build includes:
* Optimized React code
* Inline Tailwind CSS
* Minified JavaScript bundle
* Decap CMS admin interface

### Deployment

The site is deployed to GitHub Pages:

1. Build the project:
   $ npm run build

2. Commit the dist/ folder:
   $ git add dist/
   $ git commit -m "Build: update production build"

3. Push to main branch:
   $ git push origin main

Note: Deployment process depends on your GitHub Pages configuration.
Some setups use automatic builds with GitHub Actions.

### Image Management

Images should be placed in `public/assets/images/`:
* `people/` - Team member photos (400x400px recommended)
* `papers/` - Publication thumbnails (500x300px recommended)
* `posts/` - News and blog images (800x600px or wider)

Use absolute paths starting with `/assets/`:
```
image: '/assets/images/people/bio-lastname.jpg'
```

### Browser Support

* Chrome (latest)
* Firefox (latest)
* Safari (latest)
* Edge (latest)

The site uses CSS Grid and Flexbox. Mobile-first responsive design with breakpoints at 768px (md) and 1024px (lg).

---

## 中文

### 项目概述

CC Lab 网站是使用现代网络技术构建的研究实验室网站。该网站展示了西交利物浦大学 (XJTLU) 结构生物信息学与分子动力学的研究工作。

功能特性:
* 部署在 GitHub Pages 上的静态网站
* 响应式设计并支持深色模式
* 通过 Decap CMS 进行内容管理
* 团队成员简介和论文列表
* 从 JSON 文件动态加载数据

### 快速开始

前置要求:
* Node.js (v18 或更高版本)
* npm 或 yarn

安装步骤:

1. 克隆仓库:
   $ git clone https://github.com/cc.lab.xjtlu.github.io.git
   $ cd cc.lab.xjtlu.github.io

2. 安装依赖:
   $ npm install

3. 启动开发服务器:
   $ npm run dev

   在浏览器中打开 http://localhost:5173

4. 构建生产版本:
   $ npm run build

### 技术栈

* React 18 - UI 框架
* TypeScript - 类型安全
* React Router v6 - 客户端路由 (使用 HashRouter)
* Tailwind CSS - 功能优先 CSS (通过 CDN 加载)
* Framer Motion - 动画库
* Lucide React - 图标库
* Vite - 构建工具和开发服务器
* Decap CMS - 无头内容管理系统

### 项目结构

```
.
├── components/            页面级 React 组件
├── src/
│   ├── context/          React Context 全局状态
│   └── lib/
│       └── dataLoader.ts 数据加载工具
├── public/
│   ├── data/             JSON 内容文件 (由 Decap CMS 管理)
│   ├── admin/            CMS 界面配置
│   └── assets/images/    团队照片、论文缩略图
├── App.tsx               主应用组件和路由
├── index.html            HTML 模板 (含 Tailwind 配置)
├── vite.config.ts        Vite 构建配置
└── tsconfig.json         TypeScript 配置
```

### 路由

* `/` - 首页 (包含 Hero 区域和最新文章)
* `/#/member` - 团队成员页面
* `/#/publication` - 论文发表页面
* `/#/news` - 新闻和事件页面
* `/#/resources` - 资源页面
* `/#/contact` - 联系方式页面

注意: 使用基于 Hash 的路由以兼容 GitHub Pages。

### 内容管理

该网站使用 Decap CMS 进行内容管理。非技术用户可以通过可视化界面编辑内容，无需修改代码。

访问 CMS:
* 开发环境: http://localhost:5173/admin/
* 生产环境: https://your-domain.com/admin/

CMS 集合:
* Members - 团队成员简介
* Publications - 按年份组织的研究论文
* News - 新闻和事件公告
* Lab Info - 联系方式和实验室描述

### 开发指南

TypeScript 配置关键点:
* 启用严格模式
* 禁止未使用的变量和参数
* 禁止 switch 语句中的贯穿情况

详细的开发指南请参考 [CLAUDE.md](./CLAUDE.md)

### 生产构建

$ npm run build

输出生成在 `dist/` 目录中。构建内容包括:
* 优化的 React 代码
* 内联 Tailwind CSS
* 最小化的 JavaScript 包
* Decap CMS 管理界面

### 部署

网站部署在 GitHub Pages:

1. 构建项目:
   $ npm run build

2. 提交 dist/ 文件夹:
   $ git add dist/
   $ git commit -m "Build: update production build"

3. 推送到主分支:
   $ git push origin main

注意: 部署过程取决于您的 GitHub Pages 配置。
某些设置使用 GitHub Actions 进行自动构建。

### 图像管理

图像应放置在 `public/assets/images/` 中:
* `people/` - 团队照片 (建议 400x400px)
* `papers/` - 论文缩略图 (建议 500x300px)
* `posts/` - 新闻和博客图像 (建议 800x600px 或更大)

使用以 `/assets/` 开头的绝对路径:
```
image: '/assets/images/people/bio-lastname.jpg'
```

### 浏览器兼容性

* Chrome (最新版本)
* Firefox (最新版本)
* Safari (最新版本)
* Edge (最新版本)

本网站使用 CSS Grid 和 Flexbox。采用移动优先的响应式设计，断点位于 768px (md) 和 1024px (lg)。

---

### Documentation | 文档

* [CLAUDE.md](./CLAUDE.md) - Development guidelines for Claude Code and future developers
* [CLAUDE.md](./CLAUDE.md) - 针对 Claude Code 和未来开发人员的开发指南

### License | 许可证

This project is provided as-is.

本项目按现状提供。
