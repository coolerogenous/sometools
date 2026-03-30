---
name: "npl-due-diligence-generator"
description: "Generates professional NPL (Non-Performing Loan) due diligence Word documents with standardized formatting. Invoke when user provides asset/project information and asks to generate a due diligence report or NPL investment recommendation document."
---

# 不良资产尽调文档生成器

## 概述

本 Skill 用于根据用户提供的资产/项目资料，自动生成符合专业排版标准的不良资产尽职调查推荐文档（Word 格式）。

## 文档排版格式规范

基于模板文档分析，生成文档必须严格遵循以下排版规范：

### 页面设置
- 纸张方向：**横向**（Landscape）
- 页面宽度：297mm（A4 横向）
- 页面高度：210mm（A4 横向）
- 左右边距：2.54cm（1440 twips）
- 上下边距：3.18cm（1800 twips）
- 页眉距离：1.5cm（851 twips）
- 页脚距离：1.75cm（992 twips）

### 字体规范
- **默认正文字体**：Arial（西文）+ 微软雅黑（中文），10.5pt（21 half-points）
- **正文对齐**：两端对齐（justify）
- **标题字体**：Arial（西文）+ 微软雅黑（中文）

### 标题层级格式

| 层级 | 字号 | 段前 | 段后 | 行距 | 加粗 |
|------|------|------|------|------|------|
| Heading 1（一级标题） | 18pt | 13pt | 11pt | 固定 12pt | 是 |
| Heading 2（二级标题） | 16pt | 13pt | 10pt | 固定 12pt | 是 |
| Heading 3（三级标题） | 15pt | 13pt | 9pt | 固定 12pt | 是 |
| Heading 4（四级标题） | 14pt | 12pt | 8pt | 固定 12pt | 是 |
| Heading 5（五级标题） | 14pt | 12pt | 8pt | 固定 12pt | 是 |
| Heading 6（六级标题） | 12pt | 12pt | 6pt | 固定 12pt | 是 |

### 正文格式
- 字体：Arial + 微软雅黑
- 字号：10.5pt（21 half-points）
- 对齐：两端对齐
- 行距：默认（单倍行距）

### 特殊字体样式

| 样式名 | 字体 | 字号 | 颜色 |
|--------|------|------|------|
| font21（正文强调） | 宋体 | 10pt | 黑色 #000000 |
| font101（小号正文） | 宋体 | 6pt | 黑色 #000000 |
| font31（紫色强调） | 宋体 | 10pt | 紫色 #7030A0 |
| font112（小号紫色） | 宋体 | 6pt | 紫色 #7030A0 |
| font51（绿色强调） | 宋体 | 10pt | 绿色 #00B050 |
| font121（小号绿色） | 宋体 | 6pt | 绿色 #00B050 |
| font61（蓝色强调） | 宋体 | 10pt | 蓝色 #0070C0 |
| font131（小号蓝色） | 宋体 | 6pt | 蓝色 #0070C0 |
| font71（红色强调） | 宋体 | 10pt | 红色 #FF0000 |
| font141（小号红色） | 宋体 | 6pt | 红色 #FF0000 |

### 表格格式
- 表格样式：Table Grid（网格线边框）
- 表格内字体：宋体（中文）
- 表格对齐：两端对齐

### 页眉页脚
- 页眉：18 half-points（9pt），两端对齐，固定行距 12pt
- 页脚：18 half-points（9pt），左对齐

## 文档结构模板

生成的文档必须包含以下章节结构：

### 文档头部
```
编号：{年份}-{城市}
{序号}-{项目编号}

{公司名}亿元资产推荐{城市}项目({项目编号})

{项目标题}
```

### 一、资产介绍
- **地址**：项目详细地址
- **面积**：土地面积、建筑面积、产证信息
- **资产性质**：工业厂房/研发办公/商业综合等
- **价格/评估**：评估总价、报价、单价测算
- **项目亮点**：价格洼地、杠杆支撑、区域核心等
- **交易方式**：产权过户/债权转让等
- **税费缴纳**：各自缴纳/其他约定
- **附近拍卖信息**：表格形式展示近期同类拍卖案例

### 二、九大维度价值深度解析
1. **地理位置**：战略坐标、区域优势
2. **发展情况**：政策红利、商业/产业氛围
3. **周边人口/劳动力**：人口规模、人群特征
4. **建筑与土地情况**：硬件参数、现状与潜力
5. **区域经济与GDP**：经济数据、产业地位
6. **房价/地价/租金**：周边行情、成本优势
7. **消费水平/适配行业**：适配行业分析
8. **基础设施**：市政配套、生活配套
9. **交通设施**：轨道/航空、路网交通

### 三、投资总结
- **投资数据表格**：包含以下指标
  - 总建筑面积（平方米）
  - 评估总价（元）
  - 评估单价（元/平方米）
  - 成交总价（元）
  - 成交单价（元/平方米）
  - 实际总报价（元）
  - 实际单价（元/平方米）
  - 预计年收租金（元）
  - 预计每平每月租金（元/（平方米*月））
  - 预计静态收益率（年毛利率）
- **核心分析要点**：
  1. 交易属性（产权/债权、产证状态、融资便利性）
  2. 价格优势（总价、折合单价、税费承担）
  3. 收益测算（租金回报、潜在毛利、财务杠杆分析）
  4. 核心亮点与退出（投资亮点、退出路径建议）

### 四、投资人待深入调查
- 土地产证年限
- 房产证情况
- 租赁合同及银行流水
- 资产贷款比例

### 五、其他信息
- 可提供服务内容列表
- 现场考察标的物照片

## 生成流程

当用户提供资产资料后，按以下步骤生成文档：

### Step 1: 信息收集与整理
从用户提供的资料中提取以下关键信息：
- 项目基本信息（地址、面积、性质）
- 价格信息（评估价、报价、单价）
- 区域分析数据（交通、人口、经济、产业）
- 投资测算数据（租金、收益率、杠杆）
- 交易条件（方式、税费、产证状态）

### Step 2: 内容生成
按照上述文档结构模板，将收集到的信息组织成完整的尽调报告内容：
- 对缺失的信息使用 `[待补充]` 标注
- 对估算的数据使用 `[预估]` 标注
- 确保数据逻辑一致性（如单价 = 总价 ÷ 面积）
- 收益率计算：静态收益率 = 年租金 ÷ 总投入 × 100%

### Step 3: 生成 Word 文档
使用 Node.js 脚本生成 .docx 文件：

1. 首先安装依赖：
```bash
cd {项目目录}
node -e "const{execSync}=require('child_process');execSync('npm install docx --no-save',{stdio:'inherit'})"
```

2. 创建生成脚本 `generate_due_diligence.js`，使用 `docx` npm 包生成文档，严格遵循上述排版规范：
   - 页面设置为 A4 横向
   - 使用正确的字体、字号、颜色
   - 标题层级使用 Heading 1-6 样式
   - 表格使用网格线边框
   - 数据表格包含完整的投资测算指标

3. 运行脚本生成文档：
```bash
node generate_due_diligence.js
```

### Step 4: 输出文件
- 文件命名规则：`{编号}-{项目简称}-{城市}{序号}-{年份}.docx`
- 示例：`066-上海松江泗泾核心区3万平米稀缺产业商业综合体-上海21-2026.docx`
- 输出目录：与输入资料同目录

## docx 生成代码模板

生成脚本的核心结构如下（使用 `docx` npm 包）：

```javascript
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, HeadingLevel, BorderStyle, PageOrientation,
  convertMillimetersToTwip } = require('docx');
const fs = require('fs');

// 页面设置常量
const PAGE_WIDTH_MM = 297;
const PAGE_HEIGHT_MM = 210;
const MARGIN_LR_MM = 25.4;
const MARGIN_TB_MM = 31.8;

// 颜色常量
const COLORS = {
  BLACK: '000000',
  PURPLE: '7030A0',
  GREEN: '00B050',
  BLUE: '0070C0',
  RED: 'FF0000',
};

// 创建文档
const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: {
          orientation: PageOrientation.LANDSCAPE,
          width: convertMillimetersToTwip(PAGE_WIDTH_MM),
          height: convertMillimetersToTwip(PAGE_HEIGHT_MM),
        },
        margin: {
          top: convertMillimetersToTwip(MARGIN_TB_MM),
          bottom: convertMillimetersToTwip(MARGIN_TB_MM),
          left: convertMillimetersToTwip(MARGIN_LR_MM),
          right: convertMillimetersToTwip(MARGIN_LR_MM),
        },
      },
    },
    children: [
      // 文档头部段落
      // 一、资产介绍
      // 二、九大维度价值深度解析
      // 三、投资总结（含数据表格）
      // 四、投资人待深入调查
      // 五、其他信息
    ],
  }],
});

// 生成文件
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('output.docx', buffer);
  console.log('Document generated successfully!');
});
```

## 注意事项

1. **数据准确性**：所有数值必须经过交叉验证，确保单价、总价、面积之间的数学关系正确
2. **信息完整性**：对缺失信息必须标注 `[待补充]`，不得编造数据
3. **排版一致性**：严格遵循上述排版规范，不得随意修改字体、字号、间距
4. **专业术语**：使用标准的不良资产行业术语
5. **表格格式**：投资数据表格必须包含所有10项指标，金额格式使用 `￥` 符号和千分位分隔
6. **文件编码**：生成脚本使用 UTF-8 编码
