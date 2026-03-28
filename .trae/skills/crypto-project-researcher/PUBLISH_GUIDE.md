# 📦 发布 crypto-project-researcher 到 npm

## 📋 前置要求

- ✅ Node.js >= 14.0.0
- ✅ npm 账号（注册：https://www.npmjs.com/signup）
- ✅ Git 仓库（GitHub 或 Gitee）

---

## 🚀 发布步骤

### 步骤 1：初始化 Git 仓库

```bash
# 进入项目目录
cd "D:\AAA局域网传输\xuwu-cooler\workspace\sometools\.trae\skills\crypto-project-researcher"

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: crypto-project-researcher npm package"
```

### 步骤 2：连接到远程仓库

#### 使用 GitHub（推荐）
```bash
# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/sometools.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 使用 Gitee（国内更快）
```bash
# 添加远程仓库
git remote add origin https://gitee.com/你的用户名/sometools.git

# 推送到 Gitee
git branch -M main
git push -u origin main
```

### 步骤 3：登录 npm

```bash
# 登录 npm（首次发布需要）
npm login

# 输入你的 npm 用户名、密码和邮箱
```

### 步骤 4：检查包名是否可用

```bash
# 检查包名是否已被占用
npm view crypto-project-researcher

# 如果显示 "404 Not Found"，说明包名可用
# 如果显示包信息，说明包名已被占用，需要修改 package.json 中的 name
```

### 步骤 5：安装依赖

```bash
# 安装 package.json 中的依赖
npm install

# 这会生成 node_modules 目录和 package-lock.json
```

### 步骤 6：发布到 npm

```bash
# 发布包
npm publish

# 如果是第一次发布，使用 --access public
npm publish --access public
```

### 步骤 7：验证发布

```bash
# 检查包是否发布成功
npm view crypto-project-researcher

# 或者访问 npm 网站
# https://www.npmjs.com/package/crypto-project-researcher
```

---

## 🔄 更新包

### 修改版本号

编辑 `package.json`：
```json
{
  "version": "1.0.1"  // 从 1.0.0 更新到 1.0.1
}
```

### 发布新版本

```bash
# 提交更改
git add .
git commit -m "Update to v1.0.1"
git push

# 发布新版本
npm publish
```

---

## 🌐 在其他设备上使用

### 方案 1：全局安装（推荐）

```bash
# 在任何设备上安装
npm install -g crypto-project-researcher

# 使用命令
crypto-researcher <project-name>
```

### 方案 2：本地安装

```bash
# 克隆仓库
git clone https://github.com/你的用户名/sometools.git

# 进入目录
cd sometools/.trae/skills/crypto-project-researcher

# 安装依赖
npm install

# 使用 CLI
node bin/cli.js <project-name>
```

### 方案 3：在 Trae IDE 中使用

Trae IDE 会自动识别 `.trae/skills/` 目录下的 skill，无需额外安装。

---

## 📝 package.json 配置说明

### 必需字段

| 字段 | 说明 | 示例 |
|------|------|------|
| `name` | 包名（唯一） | `"crypto-project-researcher"` |
| `version` | 版本号（语义化版本） | `"1.0.0"` |
| `description` | 包描述 | `"Researches crypto projects..."` |
| `main` | 入口文件 | `"lib/index.js"` |

### 可选字段

| 字段 | 说明 | 示例 |
|------|------|------|
| `bin` | CLI 命令 | `{"crypto-researcher": "./bin/cli.js"}` |
| `scripts` | npm 脚本 | `{"test": "..."}` |
| `keywords` | 搜索关键词 | `["crypto", "airdrop"]` |
| `author` | 作者信息 | `"Your Name <email>"` |
| `license` | 许可证 | `"MIT"` |
| `repository` | 仓库地址 | Git URL |
| `homepage` | 主页地址 | GitHub README URL |

---

## ⚠️ 常见问题

### 问题 1：403 Forbidden

**原因**：包名已被占用或 npm 登录失效

**解决**：
```bash
# 重新登录
npm login

# 检查包名
npm view <package-name>

# 修改 package.json 中的 name
```

### 问题 2：E404 Not Found

**原因**：包名不存在（这是好消息！）

**解决**：继续发布流程

### 问题 3：私有包

**原因**：默认发布为私有包

**解决**：
```bash
# 使用 --access public
npm publish --access public
```

### 问题 4：依赖安装失败

**原因**：网络问题或 npm 源问题

**解决**：
```bash
# 使用淘宝镜像（国内）
npm config set registry https://registry.npmmirror.com

# 或使用 cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
```

---

## 🎯 最佳实践

### 1. 版本管理

使用语义化版本（Semantic Versioning）：
- **MAJOR**：不兼容的 API 修改（1.0.0 → 2.0.0）
- **MINOR**：向下兼容的功能性新增（1.0.0 → 1.1.0）
- **PATCH**：向下兼容的问题修正（1.0.0 → 1.0.1）

### 2. .npmignore

确保 `.npmignore` 包含：
- `node_modules/`
- `.git/`
- 测试文件
- 配置文件

### 3. README.md

确保 `README.md`：
- 清晰的安装说明
- 使用示例
- 功能列表
- 贡献指南

### 4. 测试

发布前测试：
```bash
# 本地测试
node bin/cli.js test-project

# 全局安装测试
npm link
crypto-researcher test-project
```

---

## 📊 发布检查清单

发布前检查：

- [ ] package.json 配置完整
- [ ] README.md 文档清晰
- [ ] .npmignore 配置正确
- [ ] 版本号已更新
- [ ] 依赖已安装
- [ ] 本地测试通过
- [ ] Git 仓库已推送
- [ ] npm 已登录
- [ ] 包名可用

---

## 🌟 发布后推广

### 1. 更新 Trae Skill

确保 `.trae/skills/crypto-project-researcher/SKILL.md` 已更新。

### 2. 分享到社区

- 发布到 Twitter/X
- 分享到加密社区
- 提交到项目列表网站

### 3. 收集反馈

- 监控 npm 下载量
- 收集用户反馈
- 持续改进

---

## 📞 获取帮助

### npm 官方文档
https://docs.npmjs.com/

### npm 发布指南
https://docs.npmjs.com/cli/publish

### Trae 文档
查看 Trae IDE 的 skill 系统文档

---

## 🎉 总结

**发布流程**：
1. 初始化 Git 仓库
2. 推送到远程仓库
3. 登录 npm
4. 安装依赖
5. 发布到 npm
6. 验证发布

**使用流程**：
1. 全局安装：`npm install -g crypto-project-researcher`
2. 使用命令：`crypto-researcher <project-name>`
3. 在任何设备上使用

**现在你可以开始发布了！** 🚀
