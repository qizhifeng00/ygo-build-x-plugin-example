#!/bin/bash

# YGO Plugin Example - 快速发布脚本

echo "🚀 准备发布 YGO Plugin Example..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在 example-plugin 目录下运行此脚本"
    exit 1
fi

# 1. 构建插件
echo ""
echo "📦 步骤 1/5: 构建插件..."
bun run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建成功"

# 2. 检查 dist 目录
if [ ! -d "dist" ] || [ ! -f "dist/index.js" ]; then
    echo "❌ 错误: dist/index.js 不存在"
    exit 1
fi

echo ""
echo "📋 步骤 2/5: 检查文件..."
echo "   ✓ dist/index.js ($(du -h dist/index.js | cut -f1))"
echo "   ✓ dist/index.css ($(du -h dist/index.css | cut -f1))"

# 3. 初始化 Git（如果还没有）
if [ ! -d ".git" ]; then
    echo ""
    echo "🔧 步骤 3/5: 初始化 Git 仓库..."
    git init
    echo "✅ Git 仓库已初始化"
else
    echo ""
    echo "✅ 步骤 3/5: Git 仓库已存在"
fi

# 4. 添加文件
echo ""
echo "📝 步骤 4/5: 添加文件到 Git..."
git add .
git status --short

# 5. 提示用户输入 GitHub 仓库 URL
echo ""
echo "🌐 步骤 5/5: 配置远程仓库"
echo ""
echo "请先在 GitHub 创建新仓库: https://github.com/new"
echo "仓库名建议: ygo-plugin-example"
echo ""
read -p "请输入你的 GitHub 仓库 URL (例: https://github.com/username/ygo-plugin-example.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ 未输入仓库 URL"
    exit 1
fi

# 检查是否已有 remote
if git remote | grep -q "origin"; then
    echo "⚠️  remote origin 已存在，将更新为新 URL"
    git remote set-url origin "$REPO_URL"
else
    git remote add origin "$REPO_URL"
fi

echo "✅ 远程仓库已配置: $REPO_URL"

# 提交
echo ""
read -p "是否立即提交并推送? (y/n): " CONFIRM

if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
    echo ""
    echo "📤 提交并推送到 GitHub..."

    git commit -m "Initial commit: YGO Build X Plugin Example

- 卡组统计功能
- 实时更新
- Notion 风格 UI"

    git branch -M main
    git push -u origin main

    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 发布成功！"
        echo ""
        echo "📦 你的插件已发布到: $REPO_URL"
        echo ""
        echo "🔗 用户可以通过以下 URL 安装:"

        # 从 URL 提取用户名和仓库名
        REPO_PATH=$(echo "$REPO_URL" | sed 's/.*github.com[:/]\(.*\)\.git/\1/')
        echo "   https://cdn.jsdelivr.net/gh/$REPO_PATH@main/dist/index.js"
        echo ""
        echo "📚 下一步:"
        echo "   1. 在 GitHub 创建 Release (可选)"
        echo "   2. 在 YGO Build X 中测试安装"
        echo "   3. 分享给其他用户"
    else
        echo "❌ 推送失败，请检查:"
        echo "   1. GitHub 仓库是否已创建"
        echo "   2. 是否有推送权限"
        echo "   3. 网络连接是否正常"
    fi
else
    echo ""
    echo "⏸️  已取消推送"
    echo ""
    echo "你可以稍后手动推送:"
    echo "   git commit -m 'Initial commit'"
    echo "   git push -u origin main"
fi
