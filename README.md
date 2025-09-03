#  StudyQR - 二维码签到辅助工具

> 一个纯前端实现的二维码识别与时间参数调整工具，适用于课堂签到、学习任务提醒等场景。  
> 本地运行，零后端，隐私安全。

---

##  项目简介

StudyQR 是一个支持二维码图片上传识别、内容解析并自动修改 `createTime` 时间字段（+1小时）后重新生成新二维码的网页工具。适用于：

- 动态二维码签到系统的辅助签到（例如课堂学习）
- 快速调整二维码任务时间参数
- 前端图像处理与二维码开发的教学或参考案例

---

##  功能亮点

- ✅ 本地二维码图片识别（依赖 [`jsQR`](https://github.com/cozmo/jsQR)）
- ✅ 自动解析并修改 `createTime` 参数（仅加1小时）
- ✅ 实时生成新的二维码（依赖 [`qrcode.js`](https://github.com/davidshimjs/qrcodejs)）
- ✅ 截止时间直观展示
- ✅ 零后端、安全隐私、无需部署服务器

---

##  使用方式

### 本地打开（推荐）

1. 下载或克隆项目：

    ```bash
    git clone https://github.com/bosprimigenious/StudyQr.git
    ```

2. 进入项目目录并双击打开 `index.html` 即可使用，无需服务器或网络。

### 在线访问（GitHub Pages）

你也可以访问 GitHub Pages 部署版本（如果已启用）：

👉 [https://bosprimigenious.github.io/StudyQR/]

---

##  使用须知（课堂签到 & 学习辅助）

为帮助大家更好地完成学习任务、确保课堂签到无误，请配合以下事项：

-  **照片提交**：只需上传动态二维码的任意一张清晰截图即可，无需实时扫码。
-  **时间规划**：每次生成的新二维码，其 `createTime` 截止时间自动顺延 1 小时，请合理安排签到时间；**老师关闭签到后将无法补签**。
-  **信息安全**：工具仅在本地浏览器运行，不会上传任何数据，保障你的个人信息安全。
-  **开发目的**：通过简单、快速的方式，提升课堂签到效率，避免因技术或流程问题影响正常学习。如有任何疑问，请随时沟通！

>  当前项目中的 LOGO 图片来源于小红书，若有侵权请联系删除。  
>  本项目开发时间紧凑，若你有更好的建议或改进意见，欢迎联系开发者：[bosprimigenious@foxmail.com](mailto:bosprimigenious@foxmail.com)

---

##  技术栈

- HTML5 + CSS3
- JavaScript (Vanilla)
- [jsQR](https://github.com/cozmo/jsQR) - 用于二维码图片识别
- [QRCode.js](https://github.com/davidshimjs/qrcodejs) - 用于二维码生成

---

##  项目结构
 ```
StudyQr/
├── index.html # 主页面
├── style.css # 页面样式
├── script.js # 主逻辑脚本
└── logo.png
 ```

 ## 优化方向
 ```
 StudyQr/
├── index.html          # 主页面，上传二维码、显示结果
├── style.css           # 样式表，统一管理页面样式（酷炫渐变动效等）
├── script.js           # 主逻辑脚本，实现二维码识别、修改、生成、交互
├── logo.png            # 网站 Logo 图片
├── README.md           # 项目说明文档，介绍功能、技术栈、使用方法
├── LICENSE             # 许可证文件，比如 MIT 许可
├── assets/             # 资源文件夹，存放额外图片、字体等
│   └── ...
├── libs/               # 第三方库文件，如 jsQR.js、qrcode.min.js 等
│   └── jsQR.js
│   └── qrcode.min.js
└── docs/               # 项目文档或演示相关页面（可选）
    └── usage.html      # 使用说明页面
```