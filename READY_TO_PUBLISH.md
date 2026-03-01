# 📦 Example Plugin 发布准备完成

## ✅ 已完成的工作

### 1. 修复构建问题
- ✅ 从 tsup 切换到 Vite（支持 Vue 文件）
- ✅ 添加 Vite 配置文件
- ✅ 添加 Vue 类型声明
- ✅ 构建成功（dist/index.js + dist/index.css）

### 2. 准备发布文件
- ✅ LICENSE (MIT)
- ✅ README.md (使用说明)
- ✅ README_PUBLISH.md (公开版 README)
- ✅ PUBLISH_GUIDE.md (详细发布指南)
- ✅ publish.sh (一键发布脚本)
- ✅ .gitignore (不忽略 dist/)

### 3. 文件清单

```
example-plugin/
├── src/
│   ├── index.ts              ✅ 插件入口
│   ├── DeckStatsView.vue     ✅ Vue 组件
│   └── shims-vue.d.ts        ✅ 类型声明
├── dist/
│   ├── index.js              ✅ 构建产物 (4.93 KB)
│   └── index.css             ✅ 样式文件 (1.97 KB)
├── package.json              ✅ 依赖配置
├── tsconfig.json             ✅ TS 配置
├── vite.config.ts            ✅ Vite 配置
├── .gitignore                ✅ Git 忽略
├── LICENSE                   ✅ MIT 许可证
├── README.md                 ✅ 项目文档
├── README_PUBLISH.md         ✅ 公开版文档
├── PUBLISH_GUIDE.md          ✅ 发布指南
└── publish.sh                ✅ 发布脚本
```

## 🚀 发布方式

### 方式 1: 使用一键脚本（推荐）

```bash
cd /Users/shenqidelaofeng/Documents/YGO_build_x/packages/plugin-sdk/example-plugin
./publish.sh
```

脚本会自动：
1. 构建插件
2. 检查文件
3. 初始化 Git
4. 添加文件
5. 配置远程仓库
6. 提交并推送

### 方式 2: 手动发布

#### 步骤 1: 在 GitHub 创建仓库
- 访问: https://github.com/new
- 仓库名: `ygo-plugin-example`
- 类型: Public
- 不要勾选 "Add a README file"

#### 步骤 2: 推送代码

```bash
cd /Users/shenqidelaofeng/Documents/YGO_build_x/packages/plugin-sdk/example-plugin

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: YGO Build X Plugin Example"

# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/ygo-plugin-example.git

# 推送
git branch -M main
git push -u origin main
```

#### 步骤 3: 创建 Release（可选）

在 GitHub 仓库页面：
1. 点击 "Releases" → "Create a new release"
2. Tag: `v1.0.0`
3. Title: `v1.0.0 - 初始版本`
4. 发布

## 📝 发布后的工作

### 1. 更新 README

将 `README_PUBLISH.md` 替换为 `README.md`，并修改所有 "你的用户名" 为实际的 GitHub 用户名：

```bash
mv README.md README_OLD.md
mv README_PUBLISH.md README.md
# 编辑 README.md，替换用户名
git add README.md
git commit -m "Update README for public release"
git push
```

### 2. 测试安装

在 YGO Build X 应用中：
1. 打开 **设置** → **插件**
2. 输入 URL:
   ```
   https://cdn.jsdelivr.net/gh/你的用户名/ygo-plugin-example@main/dist/index.js
   ```
3. 点击 **安装**

### 3. 宣传插件

- 在主项目提交 Issue/Discussion
- 分享到游戏王社区
- 社交媒体宣传

## 🔗 安装 URL 格式

用户可以通过以下 URL 安装：

**最新版本（main 分支）：**
```
https://cdn.jsdelivr.net/gh/你的用户名/ygo-plugin-example@main/dist/index.js
```

**指定版本（推荐）：**
```
https://cdn.jsdelivr.net/gh/你的用户名/ygo-plugin-example@v1.0.0/dist/index.js
```

**GitHub Raw（备用）：**
```
https://raw.githubusercontent.com/你的用户名/ygo-plugin-example/main/dist/index.js
```

## 📚 相关文档

- **PUBLISH_GUIDE.md** - 详细的发布步骤
- **README_PUBLISH.md** - 公开版 README 模板
- **SDK 文档** - https://www.npmjs.com/package/@ygo-build-x/plugin-sdk

## 🎯 下一步

1. 运行 `./publish.sh` 或手动发布到 GitHub
2. 测试插件安装
3. 收集用户反馈
4. 持续改进

---

**准备就绪！现在可以发布了！** 🚀
