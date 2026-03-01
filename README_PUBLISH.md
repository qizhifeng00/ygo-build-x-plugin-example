# YGO Build X Plugin Example

[![npm](https://img.shields.io/npm/v/@ygo-build-x/plugin-sdk)](https://www.npmjs.com/package/@ygo-build-x/plugin-sdk)

这是一个使用 [@ygo-build-x/plugin-sdk](https://www.npmjs.com/package/@ygo-build-x/plugin-sdk) 开发的示例插件，展示如何为 YGO Build X 创建第三方插件。

## 功能

- 📊 显示当前卡组的基本统计信息
- 📈 按卡片类型分类统计
- 🔄 实时监听卡组变化并更新统计
- 🎨 遵循 Notion 风格的 UI 设计

## 在线安装

在 YGO Build X 应用中：

1. 打开 **设置** ⚙️ → **插件** 🔌
2. 输入以下 URL：
   ```
   https://cdn.jsdelivr.net/gh/你的用户名/ygo-plugin-example@main/dist/index.js
   ```
3. 点击 **安装**

## 本地开发

### 安装依赖

```bash
npm install
# 或
bun install
```

### 开发模式

```bash
npm run dev
# 或
bun run dev
```

### 构建

```bash
npm run build
# 或
bun run build
```

构建产物：
- `dist/index.js` - 插件主文件
- `dist/index.css` - 样式文件

## 项目结构

```
ygo-plugin-example/
├── src/
│   ├── index.ts           # 插件入口
│   ├── DeckStatsView.vue  # Vue 组件
│   └── shims-vue.d.ts     # Vue 类型声明
├── dist/                  # 构建产物（需提交到 Git）
│   ├── index.js
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts         # Vite 配置
├── .gitignore
├── LICENSE
└── README.md
```

## 技术栈

- **构建工具**: Vite 6
- **框架**: Vue 3.5
- **语言**: TypeScript 5.7
- **SDK**: [@ygo-build-x/plugin-sdk](https://www.npmjs.com/package/@ygo-build-x/plugin-sdk)

## 开发指南

### 1. 插件定义

```typescript
import { definePlugin } from '@ygo-build-x/plugin-sdk'

export default definePlugin({
  meta: {
    id: '@example/deck-stats',
    name: '卡组统计',
    version: '1.0.0',
    description: '显示当前卡组的详细统计信息',
    author: { name: 'Your Name' },
    icon: '📊',
    type: 'calculator',
    permissions: ['cards.read', 'deck.read', 'ui.sidebar'],
    displayMode: 'sidebar',
  },
  setup() {
    return {
      views: [/* ... */],
    }
  },
})
```

### 2. 使用 Context API

```typescript
import { inject } from 'vue'
import type { PluginContext } from '@ygo-build-x/plugin-sdk'

const context = inject<PluginContext>('pluginContext')

// 获取当前卡组
const deck = context?.deck.getCurrent()

// 获取卡片信息
const cards = await context?.cards.getByIds([12345, 67890])

// 显示通知
context?.ui.notify({
  type: 'success',
  message: '操作成功',
})
```

### 3. 样式规范

使用 CSS 变量保持与主应用一致的风格：

```css
.my-element {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: var(--space-3);
  border-radius: var(--radius-md);
}
```

## 发布流程

### 1. 构建插件

```bash
npm run build
```

### 2. 提交到 Git

```bash
git add dist/
git commit -m "Build plugin v1.0.0"
git push
```

### 3. 创建 Release（可选）

在 GitHub 上创建 Release，用户可以通过版本号安装：

```
https://cdn.jsdelivr.net/gh/username/repo@v1.0.0/dist/index.js
```

## 文档

- [插件开发文档](https://www.npmjs.com/package/@ygo-build-x/plugin-sdk)
- [API 参考](https://www.npmjs.com/package/@ygo-build-x/plugin-sdk#context-api)
- [样式指南](https://www.npmjs.com/package/@ygo-build-x/plugin-sdk#ui-style-guide)

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 相关链接

- [YGO Build X](https://github.com/312999192/YGO_build_x)
- [Plugin SDK](https://www.npmjs.com/package/@ygo-build-x/plugin-sdk)
- [问题反馈](https://github.com/你的用户名/ygo-plugin-example/issues)
