---
name: "web-agent"
description: "全能型浏览器智能体，可浏览网页、自动化操作、采集数据、分析内容，并调用其他 Skill 生成报告。当用户发送网址要求浏览/分析/采集/操作网页，或需要从网页获取信息后执行后续任务时调用。"
---

# 全能型浏览器智能体（Web Agent）

## 概述

本 Skill 是一个编排层智能体，协调 Chrome DevTools 浏览器工具与现有 Skill 生态，实现从网页浏览、数据采集、内容分析到报告生成的完整工作流。

用户只需发送网址和任务描述，智能体会自动完成：打开网页 → 浏览/操作 → 提取数据 → 分析处理 → 调用 Skill 生成输出。

## 核心能力矩阵

| 能力 | 说明 | 依赖工具 |
|------|------|----------|
| 网页浏览 | 打开网址、导航、前进后退 | `mcp_chrome-devtools_navigate_page` |
| 页面快照 | 获取页面结构化文本（a11y tree） | `mcp_chrome-devtools_take_snapshot` |
| 截图 | 全页或元素截图 | `mcp_chrome-devtools_take_screenshot` |
| 元素交互 | 点击、填写、悬停、拖拽、按键 | `mcp_chrome-devtools_click/fill/hover/drag/press_key` |
| JS 执行 | 在页面中执行自定义 JavaScript | `mcp_chrome-devtools_evaluate_script` |
| 多标签页 | 新建标签页、切换、关闭 | `mcp_chrome-devtools_new_page/select_page/close_page` |
| 网络监控 | 查看请求/响应、控制台日志 | `mcp_chrome-devtools_list_network_requests/list_console_messages` |
| 性能分析 | Lighthouse 审计、性能追踪 | `mcp_chrome-devtools_lighthouse_audit/performance_start_trace` |
| 设备模拟 | 移动端、暗色模式、网络限速等 | `mcp_chrome-devtools_emulate` |
| Skill 编排 | 调用其他 Skill 处理采集到的数据 | `Skill` tool |
| 文件生成 | 生成 Word/Markdown/PDF 等文档 | 各 Skill 内置能力 |

## 工作流程

### 通用流程

```
用户输入（网址 + 任务描述）
        ↓
  ┌─────────────────┐
  │ 1. 任务理解与规划 │ ← 解析用户意图，制定执行计划
  └────────┬────────┘
           ↓
  ┌─────────────────┐
  │ 2. 浏览器操作    │ ← 打开网页、导航、交互
  └────────┬────────┘
           ↓
  ┌─────────────────┐
  │ 3. 数据采集      │ ← 快照、截图、JS提取、网络抓包
  └────────┬────────┘
           ↓
  ┌─────────────────┐
  │ 4. 内容分析      │ ← 结构化整理、关键信息提取
  └────────┬────────┘
           ↓
  ┌─────────────────┐
  │ 5. Skill 编排    │ ← 根据任务类型调用对应 Skill
  └────────┬────────┘
           ↓
  ┌─────────────────┐
  │ 6. 结果输出      │ ← 生成文档/报告/数据文件
  └─────────────────┘
```

### 任务类型与对应流程

#### 类型 A：网页内容分析
触发词：分析、总结、提取、了解
```
网址 → 打开页面 → take_snapshot → 提取文本 → 整理分析 → 输出 Markdown
```

#### 类型 B：数据采集
触发词：采集、抓取、爬取、获取数据
```
网址 → 打开页面 → take_snapshot/evaluate_script → 提取结构化数据 → 整理为表格/JSON → 输出文件
```

#### 类型 C：浏览器自动化操作
触发词：登录、填写、提交、操作、点击
```
网址 → 打开页面 → take_snapshot → 定位元素 → click/fill/press_key → 等待响应 → take_screenshot 确认 → 输出结果
```

#### 类型 D：多页面深度调研
触发词：调研、竞品分析、全面了解
```
网址 → 打开首页 → take_snapshot → 识别关键链接 → 逐页浏览采集 → 汇总分析 → 调用 Skill 生成报告
```

#### 类型 E：性能/SEO 审计
触发词：性能、速度、SEO、审计、评分
```
网址 → 打开页面 → lighthouse_audit → performance_start_trace → 分析报告 → 输出优化建议
```

#### 类型 F：网页内容 + Skill 联动
触发词：分析后生成报告、采集后制作文档
```
网址 → 浏览采集 → 提取数据 → 调用对应 Skill（如 npl-due-diligence-generator） → 生成专业文档
```

## 操作规范

### 浏览器操作原则

1. **先快照后操作**：每次交互前先 `take_snapshot` 获取页面结构，找到目标元素的 uid
2. **等待加载完成**：导航后使用 `wait_for` 等待关键内容出现，再进行后续操作
3. **截图留证**：关键操作前后截图，便于确认结果和调试
4. **优雅失败**：如果元素未找到，先尝试 `evaluate_script` 用 JS 查找，再报告用户

### 数据采集规范

1. **优先使用 snapshot**：通过 a11y tree 获取结构化文本，比正则解析 HTML 更可靠
2. **复杂场景用 JS**：当 snapshot 无法满足需求时，使用 `evaluate_script` 执行 JS 提取数据
3. **网络请求监控**：如需获取 API 数据，使用 `list_network_requests` 拦截 XHR/Fetch 请求
4. **分页处理**：遇到分页时，循环执行：采集当前页 → 点击下一页 → 等待加载 → 采集

### 多页面浏览策略

1. **使用新标签页**：需要同时查看多个页面时，用 `new_page` 打开新标签页
2. **记录浏览路径**：维护已访问 URL 列表，避免重复访问
3. **深度控制**：默认最大浏览深度为 3 层链接跳转，避免无限递归

## Skill 编排规则

### 可调用的 Skill 及触发条件

| Skill | 触发条件 |
|-------|----------|
| `web-analyzer` | 需要生成结构化网页分析报告时 |
| `npl-due-diligence-generator` | 采集到不良资产相关信息，需要生成尽调文档时 |
| `crypto-project-researcher` | 采集到加密货币项目信息，需要深度研究时 |

### 编排流程

1. **数据采集阶段**：使用浏览器工具从网页提取原始数据
2. **数据整理阶段**：将采集到的数据整理为 Skill 所需的输入格式
3. **Skill 调用阶段**：通过 `Skill` tool 调用目标 Skill
4. **结果合并阶段**：将 Skill 输出与采集数据合并，形成最终交付物

## 常用代码片段

### 提取页面所有链接
```javascript
() => {
  const links = Array.from(document.querySelectorAll('a[href]'));
  return links.map(a => ({
    text: a.textContent.trim().substring(0, 100),
    href: a.href,
  })).filter(l => l.text && l.href.startsWith('http'));
}
```

### 提取页面所有图片
```javascript
() => {
  const imgs = Array.from(document.querySelectorAll('img'));
  return imgs.map(img => ({
    src: img.src,
    alt: img.alt,
    width: img.naturalWidth,
    height: img.naturalHeight,
  }));
}
```

### 提取表格数据
```javascript
() => {
  const tables = Array.from(document.querySelectorAll('table'));
  return tables.map((table, i) => {
    const rows = Array.from(table.querySelectorAll('tr'));
    return {
      tableIndex: i,
      headers: Array.from(rows[0]?.querySelectorAll('th, td') || []).map(c => c.textContent.trim()),
      data: rows.slice(1).map(row =>
        Array.from(row.querySelectorAll('td')).map(c => c.textContent.trim())
      ),
    };
  });
}
```

### 提取结构化文章内容
```javascript
() => {
  const article = document.querySelector('article') || document.querySelector('main') || document.body;
  return {
    title: document.title,
    metaDescription: document.querySelector('meta[name="description"]')?.content || '',
    headings: Array.from(article.querySelectorAll('h1, h2, h3, h4')).map(h => ({
      level: h.tagName,
      text: h.textContent.trim(),
    })),
    paragraphs: Array.from(article.querySelectorAll('p')).map(p => p.textContent.trim()).filter(p => p.length > 20),
    wordCount: article.textContent.length,
  };
}
```

### 滚动到页面底部（触发懒加载）
```javascript
async () => {
  const delay = ms => new Promise(r => setTimeout(r, ms));
  const height = document.body.scrollHeight;
  window.scrollTo(0, height);
  await delay(1000);
  return { scrolledTo: height, newHeight: document.body.scrollHeight };
}
```

### 获取页面所有 API 请求
```
1. mcp_chrome-devtools_list_network_requests (resourceTypes: ["xhr", "fetch"])
2. mcp_chrome-devtools_get_network_request (获取具体请求的响应体)
```

## 输出规范

### 分析报告输出
- 格式：Markdown 文件
- 命名：`{网站域名}_分析报告_{日期}.md`
- 内容：包含目录、摘要、详细分析、截图引用、数据表格

### 数据采集输出
- 格式：JSON / CSV / Markdown 表格
- 命名：`{网站域名}_数据_{日期}.json` 或 `.csv`
- 内容：结构化数据，包含来源 URL 和采集时间

### 联动 Skill 输出
- 格式：由目标 Skill 决定（如 .docx）
- 附加：同时输出采集原始数据的 Markdown 摘要

## 错误处理

| 场景 | 处理方式 |
|------|----------|
| 页面加载超时 | 增大 timeout，或截图告知用户页面状态 |
| 元素未找到 | 尝试 JS 查找，失败则报告具体信息 |
| 需要登录 | 截图提示，询问用户提供凭据或 Cookie |
| 反爬机制 | 降低操作频率，使用 emulate 模拟正常浏览器 |
| 跨域限制 | 使用 evaluate_script 在页面上下文中执行 |
| 弹窗/对话框 | 使用 handle_dialog 自动处理，或截图告知用户 |

## 使用示例

### 示例 1：分析网站并生成报告
```
用户：帮我分析 https://example.com 这个网站

智能体执行：
1. navigate_page(url) → 打开网站
2. take_snapshot() → 获取页面结构
3. take_screenshot(fullPage=true) → 全页截图
4. evaluate_script(提取文章内容) → 获取文本
5. lighthouse_audit() → 性能审计
6. 整理分析 → 生成 Markdown 报告
```

### 示例 2：采集数据后生成尽调文档
```
用户：从 https://auction-site.com/lot/123 采集拍卖信息，生成尽调文档

智能体执行：
1. navigate_page(url) → 打开拍卖页面
2. take_snapshot() → 获取页面结构
3. evaluate_script(提取拍卖详情) → 结构化数据
4. take_screenshot() → 截取标的物照片
5. 整理数据为尽调所需格式
6. Skill("npl-due-diligence-generator") → 调用尽调文档生成器
7. 输出 .docx 尽调文档
```

### 示例 3：多页面竞品调研
```
用户：调研 https://competitor-a.com 和 https://competitor-b.com 的产品功能

智能体执行：
1. new_page(url_a) → 标签页1打开竞品A
2. take_snapshot() + evaluate_script() → 采集产品信息
3. new_page(url_b) → 标签页2打开竞品B
4. take_snapshot() + evaluate_script() → 采集产品信息
5. 对比分析 → 生成竞品对比报告
```
