# 发布 example-plugin 到 GitHub

## 步骤 1: 在 GitHub 创建新仓库

1. 访问 https://github.com/new
2. 填写信息：
   - Repository name: `ygo-plugin-example`
   - Description: `YGO Build X 插件示例 - 卡组统计`
   - Public ✅
   - 不要勾选 "Add a README file"（我们已经有了）

## 步骤 2: 准备文件

确保 dist 目录已构建：

```bash
cd /Users/shenqidelaofeng/Documents/YGO_build_x/packages/plugin-sdk/example-plugin
bun run build
```

## 步骤 3: 初始化 Git 仓库

```bash
cd /Users/shenqidelaofeng/Documents/YGO_build_x/packages/plugin-sdk/example-plugin

# 初始化 Git
git init

# 添加所有文件（包括 dist/）
git add .

# 提交
git commit -m "Initial commit: YGO Build X Plugin Example"

# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/ygo-plugin-example.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

## 步骤 4: 创建 Release（可选）

1. 在 GitHub 仓库页面，点击 "Releases" → "Create a new release"
2. 填写：
   - Tag version: `v1.0.0`
   - Release title: `v1.0.0 - 初始版本`
   - Description:
     ```
     ## 功能
     - 卡组基本统计
     - 卡片类型分布
     - 实时更新

     ## 安装
     在 YGO Build X 中输入以下 URL：
     https://cdn.jsdelivr.net/gh/你的用户名/ygo-plugin-example@v1.0.0/dist/index.js
     ```
3. 点击 "Publish release"

## 步骤 5: 测试安装

在 YGO Build X 应用中：

1. 打开 **设置** → **插件**
2. 输入 URL：
   ```
   https://cdn.jsdelivr.net/gh/你的用户名/ygo-plugin-example@main/dist/index.js
   ```
3. 点击 **安装**

## 步骤 6: 更新 README

将 `README_PUBLISH.md` 的内容复制到 `README.md`，并替换所有 "你的用户名" 为实际的 GitHub 用户名。

```bash
# 备份原 README
mv README.md README_OLD.md

# 使用新 README
mv README_PUBLISH.md README.md

# 编辑 README，替换用户名
# 然后提交
git add README.md
git commit -m "Update README for public release"
git push
```

## 文件清单

确保以下文件都已包含：

- ✅ `src/index.ts` - 插件入口
- ✅ `src/DeckStatsView.vue` - Vue 组件
- ✅ `src/shims-vue.d.ts` - 类型声明
- ✅ `dist/index.js` - 构建产物
- ✅ `dist/index.css` - 样式文件
- ✅ `package.json` - 依赖配置
- ✅ `tsconfig.json` - TypeScript 配置
- ✅ `vite.config.ts` - Vite 配置
- ✅ `.gitignore` - Git 忽略规则
- ✅ `LICENSE` - MIT 许可证
- ✅ `README.md` - 项目文档

## 后续更新流程

当你修改插件后：

```bash
# 1. 构建
bun run build

# 2. 提交
git add .
git commit -m "Update: 描述你的修改"
git push

# 3. 创建新版本（可选）
git tag v1.0.1
git push --tags
```

## 宣传

发布后，可以在以下地方宣传：

1. YGO Build X 主项目的 Issues/Discussions
2. 游戏王相关社区
3. 你的社交媒体

## 获取帮助

- SDK 文档: https://www.npmjs.com/package/@ygo-build-x/plugin-sdk
- 主项目: https://github.com/312999192/YGO_build_x
- 提交 Issue: https://github.com/312999192/YGO_build_x/issues
