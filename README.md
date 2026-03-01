# YGO Plugin Example

这是一个使用 `@ygo-build-x/plugin-sdk` 开发的示例插件。

## 功能

- 显示当前卡组的基本统计信息
- 按卡片类型分类统计
- 实时监听卡组变化并更新统计

## 安装依赖

```bash
npm install
# 或
bun install
```

## 开发

```bash
npm run dev
# 或
bun run dev
```

## 构建

```bash
npm run build
# 或
bun run build
```

构建产物：
- `dist/index.js` - 插件主文件
- `dist/index.css` - 样式文件


## 在 YGO Build X 中安装

用户可以通过以下 URL 安装你的插件：

**jsDelivr CDN（推荐）：**
```
https://cdn.jsdelivr.net/gh/你的用户名/仓库名@main/dist/index.js
```

**GitHub Raw URL：**
```
https://raw.githubusercontent.com/你的用户名/仓库名/main/dist/index.js
```

## 项目结构

```
example-plugin/
├── src/
│   ├── index.ts           # 插件入口
│   ├── DeckStatsView.vue  # Vue 组件
│   └── shims-vue.d.ts     # Vue 类型声明
├── dist/                  # 构建产物
│   ├── index.js
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts         # Vite 配置
└── README.md
```

## 技术栈

- **构建工具**: Vite 6
- **框架**: Vue 3.5
- **语言**: TypeScript 5.7
- **SDK**: @ygo-build-x/plugin-sdk

## 开发文档

完整的插件开发文档请参考：https://www.npmjs.com/package/@ygo-build-x/plugin-sdk

