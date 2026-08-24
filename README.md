# EpochMC 官网

EpochMC（真实地球 · 国战服务器）官方网站，基于 **React 19 + Vite 7 + React Router v7 + TypeScript（TSX）** 构建，UI 采用影视飓风官网（[ysjf.com](https://www.ysjf.com/)）的浅色极简设计语言。

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | React 19 |
| 构建 | Vite 7 |
| 路由 | React Router v7 |
| 语言 | TypeScript（全站 TSX） |
| 样式 | Tailwind CSS v4 |
| 图标 | Phosphor Icons |
| 字体 | Inter + Noto Sans SC + PingFang SC |

## 设计风格

- 浅色极简：白底 `#FFFFFF`、浅灰区块 `#F4F6F7`、深色文字 `#24252C`、细边框 `#EEEEEE`
- 首页结构参考 ysjf.com：全屏轮播 Banner → 最新动态滑块 → 服务器特色（大卡 + 网格）→ 社群数据 → 加入 CTA
- 中文标题 + 英文副题的区块头、16:9 卡片、大量留白
- 滚动入场动画（Intersection Observer）
- 完全响应式（375px ~ 1440px）
- 品牌主题 404 页面

## 开发

```bash
npm i 
npm run dev #本地开发测试
npm run build 
```

`.github/workflows/build.yml` 会在推送到 main 分支时自动构建并生成 Release 压缩包。

GNU GPL v3
