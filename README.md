# CC Lab Website

## Structural Bioinformatics & Molecular Dynamics Laboratory

[English](#english) | [中文](#中文)

---

## English

### About CC Lab

CC Lab is a research laboratory website for Structural Bioinformatics & Molecular Dynamics at Xi'an Jiaotong-Liverpool University (XJTLU). The site is built with modern web technologies and showcases the lab's research, team members, and publications.

### Key Features

- **Static Site on GitHub Pages** - Fast, reliable hosting with no backend required
- **Content Management with Decap CMS** - Non-technical users can edit content through a visual interface
- **Responsive Design & Dark Mode** - Works seamlessly across all devices and browser themes
- **Dynamic Data Loading** - Content stored in JSON files for easy management and version control
- **Modern Tech Stack** - React 18, TypeScript, Vite, and Tailwind CSS

### Quick Start for Development

**Requirements:**
- Node.js v18 or higher
- npm or yarn

**Setup:**

```bash
# 1. Clone the repository
git clone https://github.com/colinzyang/cc.lab.xjtlu.github.io.git
cd cc.lab.xjtlu.github.io

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Open http://localhost:5173 in your browser

# 4. Build for production
npm run build
```

### Technology Stack

| Layer | Technology |
|-------|-----------|
| **UI Framework** | React 18 |
| **Type Safety** | TypeScript 5 |
| **Routing** | React Router v6 (HashRouter) |
| **Styling** | Tailwind CSS (CDN) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Build Tool** | Vite 5 |
| **CMS** | Decap CMS (Git-based) |

### Project Structure

```
.
├── components/                 Page components (Member, Publication, News, etc.)
├── src/
│   ├── context/               React Context for breadcrumb state
│   └── lib/
│       └── dataLoader.ts       Data fetching & type definitions
├── public/
│   ├── data/                   JSON data files (managed by CMS)
│   │   ├── members.json
│   │   ├── publications.json
│   │   ├── news.json
│   │   └── labInfo.json
│   ├── admin/                  Decap CMS interface
│   └── assets/images/          Team photos, paper thumbnails, blog images
├── App.tsx                     Main app with routing
├── index.html                  HTML template with Tailwind config
├── vite.config.ts              Vite build configuration
├── tsconfig.json               TypeScript configuration
└── CLAUDE.md                   Developer guidelines
```

### Site Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero and recent posts |
| `/#/member` | Team members page |
| `/#/publication` | Research publications |
| `/#/news` | News and events |
| `/#/resources` | Resources |
| `/#/contact` | Contact information |

**Note:** Hash-based routing (`/#/`) is used for GitHub Pages compatibility.

### Content Management with Decap CMS

Decap CMS provides a user-friendly interface for managing site content without touching code.

**Access CMS:**
- **Development:** http://localhost:5173/admin/
- **Production:** https://your-domain.com/admin/

**Editable Collections:**
1. **Members** - Lab members (PI, current members, alumni)
2. **Publications** - Research papers organized by year
3. **News** - News and event announcements
4. **Lab Info** - Lab description and contact information

**Manual Data Editing:**
- Edit JSON files directly in `public/data/`
- Changes are reflected immediately without restarting the dev server
- Hard-refresh your browser (Cmd+Shift+R or Ctrl+Shift+R) to see changes during development

### Development Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build locally
```

**Type Checking:** TypeScript strict mode is enabled and automatically checked during development and build. The build will fail if there are type errors.

**TypeScript Settings:**
- `strict: true` - Full strict type checking
- `noUnusedLocals: true` - Error on unused variables
- `noUnusedParameters: true` - Error on unused parameters
- `noFallthroughCasesInSwitch: true` - Error on missing switch cases

### Deployment

**Automatic Deployment with GitHub Actions**

The site is automatically deployed to GitHub Pages whenever you push to the `main` branch.

**Workflow:** `.github/workflows/deploy.yml`
1. Checkout code
2. Setup Node.js v18
3. Install dependencies (`npm install`)
4. Build site (`npm run build`)
5. Deploy to GitHub Pages

The workflow publishes the `dist/` directory to GitHub Pages. No manual deployment steps are required—just commit and push!

### Image Management

**Image Directories:**
- `public/assets/images/people/` - Team member photos (400x400px recommended)
- `public/assets/images/papers/` - Publication thumbnails (500x300px recommended)
- `public/assets/images/posts/` - News and blog images (800x600px or wider)

**Naming Convention:**
- People: `bio-lastname.jpg` (e.g., `bio-chan.jpg`)
- Papers: `paperX.jpg` (e.g., `paper1.jpg`, `paper2.jpg`)
- Posts: `descriptive-name.jpg`

**URL Format:**
```typescript
image: '/assets/images/people/bio-lastname.jpg'
```

**Optimization:**
- Format: JPG for photos (85% quality for web)
- File size: Keep under 500KB
- Use the recommended dimensions above

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

The site uses CSS Grid and Flexbox with mobile-first responsive design. Breakpoints: 768px (md) and 1024px (lg).

### Developer Documentation

For detailed development guidelines, architecture overview, and best practices, see [CLAUDE.md](./CLAUDE.md).

### License

This project is provided as-is.

---

## 中文

### 关于 CC Lab

CC Lab 是西交利物浦大学 (XJTLU) 结构生物信息学与分子动力学研究实验室的网站。网站采用现代网络技术构建，展示实验室的研究、团队成员和论文发表。

### 主要特性

- **GitHub Pages 静态网站** - 快速可靠的托管，无需后端服务
- **Decap CMS 内容管理** - 非技术用户可通过可视化界面编辑内容
- **响应式设计与深色模式** - 在所有设备和浏览器主题上完美显示
- **动态数据加载** - 内容存储在 JSON 文件中，便于管理和版本控制
- **现代技术栈** - React 18、TypeScript、Vite 和 Tailwind CSS

### 开发快速开始

**前置要求:**
- Node.js v18 或更高版本
- npm 或 yarn

**设置:**

```bash
# 1. 克隆仓库
git clone https://github.com/colinzyang/cc.lab.xjtlu.github.io.git
cd cc.lab.xjtlu.github.io

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
# 在浏览器中打开 http://localhost:5173

# 4. 构建生产版本
npm run build
```

### 技术栈

| 层级 | 技术 |
|------|------|
| **UI 框架** | React 18 |
| **类型安全** | TypeScript 5 |
| **路由** | React Router v6 (HashRouter) |
| **样式** | Tailwind CSS (CDN) |
| **动画** | Framer Motion |
| **图标** | Lucide React |
| **构建工具** | Vite 5 |
| **CMS** | Decap CMS (基于 Git) |

### 项目结构

```
.
├── components/                 页面组件 (成员、论文、新闻等)
├── src/
│   ├── context/               React Context (面包屑导航状态)
│   └── lib/
│       └── dataLoader.ts       数据加载和类型定义
├── public/
│   ├── data/                   JSON 数据文件 (由 CMS 管理)
│   │   ├── members.json
│   │   ├── publications.json
│   │   ├── news.json
│   │   └── labInfo.json
│   ├── admin/                  Decap CMS 界面
│   └── assets/images/          团队照片、论文缩略图、博客图像
├── App.tsx                     主应用和路由配置
├── index.html                  HTML 模板 (含 Tailwind 配置)
├── vite.config.ts              Vite 构建配置
├── tsconfig.json               TypeScript 配置
└── CLAUDE.md                   开发者指南
```

### 网站路由

| 路由 | 描述 |
|------|------|
| `/` | 首页 (Hero 区域和最新文章) |
| `/#/member` | 团队成员页面 |
| `/#/publication` | 研究论文页面 |
| `/#/news` | 新闻和事件页面 |
| `/#/resources` | 资源页面 |
| `/#/contact` | 联系方式页面 |

**说明:** 使用基于 Hash 的路由 (`/#/`) 以兼容 GitHub Pages。

### Decap CMS 内容管理

Decap CMS 提供用户友好的界面来管理网站内容，无需接触代码。

**访问 CMS:**
- **开发环境:** http://localhost:5173/admin/
- **生产环境:** https://your-domain.com/admin/

**可编辑的集合:**
1. **Members** - 实验室成员 (PI、当前成员、校友)
2. **Publications** - 按年份组织的研究论文
3. **News** - 新闻和事件公告
4. **Lab Info** - 实验室描述和联系方式

**手动编辑数据:**
- 直接编辑 `public/data/` 中的 JSON 文件
- 更改会立即生效，无需重启开发服务器
- 开发过程中需要硬刷新浏览器 (Cmd+Shift+R 或 Ctrl+Shift+R) 才能看到更改

### 开发命令

```bash
npm run dev      # 启动开发服务器 (http://localhost:5173)
npm run build    # 构建生产版本 (输出到 dist/)
npm run preview  # 本地预览生产构建
```

**类型检查:** TypeScript 严格模式已启用，在开发和构建过程中自动检查。如果存在类型错误，构建将失败。

**TypeScript 配置:**
- `strict: true` - 完整的严格类型检查
- `noUnusedLocals: true` - 未使用的变量会报错
- `noUnusedParameters: true` - 未使用的参数会报错
- `noFallthroughCasesInSwitch: true` - 缺失的 switch 分支会报错

### 部署

**使用 GitHub Actions 自动部署**

只要您推送到 `main` 分支，网站就会自动部署到 GitHub Pages。

**工作流:** `.github/workflows/deploy.yml`
1. 检出代码
2. 设置 Node.js v18
3. 安装依赖 (`npm install`)
4. 构建网站 (`npm run build`)
5. 部署到 GitHub Pages

工作流自动发布 `dist/` 目录到 GitHub Pages。无需手动部署步骤——只需提交并推送！

### 图像管理

**图像目录:**
- `public/assets/images/people/` - 团队照片 (建议 400x400px)
- `public/assets/images/papers/` - 论文缩略图 (建议 500x300px)
- `public/assets/images/posts/` - 新闻和博客图像 (建议 800x600px 或更大)

**命名规范:**
- 人物: `bio-lastname.jpg` (例如 `bio-chan.jpg`)
- 论文: `paperX.jpg` (例如 `paper1.jpg`, `paper2.jpg`)
- 文章: `descriptive-name.jpg`

**URL 格式:**
```typescript
image: '/assets/images/people/bio-lastname.jpg'
```

**优化建议:**
- 格式: JPG 格式 (85% 网页质量)
- 文件大小: 保持在 500KB 以下
- 使用上述推荐尺寸

### 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

网站使用 CSS Grid 和 Flexbox，采用移动优先的响应式设计。断点: 768px (md) 和 1024px (lg)。

### 开发者文档

详细的开发指南、架构概述和最佳实践，请参见 [CLAUDE.md](./CLAUDE.md)。

### 许可证

本项目按现状提供。
