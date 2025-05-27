/**
 * @file qr_script.js
 * @description STUDYQR 学习通脚本，支持二维码识别、修改createTime参数、重新生成二维码、显示任务截止时间及统计使用次数
 * @author bosprimigenious
 * @copyright © bosprimigenious 2025
 * @license MIT 
 * @date 2025-05-21
 */

const fileInput = document.querySelector('input[type="file"]');
const form = document.querySelector('.upload-form');
const rightPanel = document.querySelector('.right-panel');

const usageCountSpan = document.getElementById("usage-count");
const usageCountKey = "usageCount";

// 初始化显示已有次数
let usageCount = Math.max(parseInt(localStorage.getItem(usageCountKey)) || 0, 132);
usageCountSpan.innerText = usageCount;
localStorage.setItem(usageCountKey, usageCount);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button');
    const file = fileInput.files[0];
    if (!file) {
        showError('请选择二维码图片文件');
        return;
    }
    // 简单文件类型检查
    if (!/\.(png|jpg|jpeg)$/i.test(file.name)) {
        showError('文件格式不支持，仅限 PNG/JPG/JPEG');
        return;
    }

    // 禁用按钮，显示loading
    submitBtn.disabled = true;
    submitBtn.textContent = '处理中...';

    try {
        const imageDataUrl = await readFileAsync(file);
        const codeData = await decodeQRCode(imageDataUrl);
        if (!codeData) {
            showError('二维码识别失败，请使用清晰图像');
            resetButton();
            return;
        }
        const newText = modifyCreateTime(codeData);
        await generateQRCode(newText);

        usageCount += 1;
        localStorage.setItem(usageCountKey, usageCount);
        usageCountSpan.innerText = usageCount;

    } catch (err) {
        showError(err.message || '发生未知错误');
    } finally {
        resetButton();
    }

    function resetButton() {
        submitBtn.disabled = false;
        submitBtn.textContent = '上传识别并输出静态二维码';
    }
});

/**
 * 读取文件转成 DataURL，返回 Promise
 * @param {File} file 
 * @returns {Promise<string>}
 */
function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('文件读取失败'));
        reader.readAsDataURL(file);
    });
}

/**
 * 利用 Canvas 和 jsQR 解码二维码，返回二维码字符串内容
 * @param {string} imageDataUrl 
 * @returns {Promise<string|null>}
 */
function decodeQRCode(imageDataUrl) {
    return new Promise((resolve) => {
        const image = new Image();
        image.src = imageDataUrl;

        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            resolve(code ? code.data : null);
        };

        image.onerror = () => resolve(null);
    });
}

/**
 * 只修改 createTime 参数时间字符串中 T 后的小时数，加1小时
 * 不整体转Date，避免格式变动，只针对小时部分数字操作，保留其他部分不变
 * @param {string} text 原二维码文本内容
 * @returns {string} 修改后的文本
 */
function modifyCreateTime(text) {
    const regex = /createTime=([0-9]{4}-[0-9]{2}-[0-9]{2})([ T])([0-9]{2})(:[0-9]{2}:[0-9]{2})/;
    const match = text.match(regex);

    if (match) {
        const datePart = match[1];
        const sep = match[2];
        let hourStr = match[3];
        const rest = match[4];

        let hourNum = parseInt(hourStr, 10);
        hourNum = (hourNum + 1) % 24;
        hourStr = hourNum.toString().padStart(2, '0');

        const newTime = `${datePart}${sep}${hourStr}${rest}`;

        const newText = text.replace(regex, `createTime=${newTime}`);

        displayDeadline(newTime.replace('T', ' '));

        return newText;
    }

    showError('未检测到 createTime 参数');
    return text;
}

/**
 * 生成二维码图片并显示，返回 Promise
 * @param {string} text 要编码的文本
 * @returns {Promise<void>}
 */
function generateQRCode(text) {
    return new Promise((resolve, reject) => {
        let oldQR = document.querySelector('.qr-image');
        if (oldQR) oldQR.remove();

        const qrImg = document.createElement('img');
        qrImg.classList.add('qr-image');

        QRCode.toDataURL(text, { width: 260, margin: 2 }, function (err, url) {
            if (err) {
                reject(new Error('二维码生成失败'));
                return;
            }
            qrImg.src = url;
            rightPanel.appendChild(qrImg);
            resolve();
        });
    });
}

/**
 * 显示任务截止时间，替换页面已有元素或创建
 * @param {string} deadlineText 格式类似 "2025-05-21 18:00:00"
 */
function displayDeadline(deadlineText) {
    let deadlineElem = document.querySelector('.deadline');
    if (!deadlineElem) {
        deadlineElem = document.createElement('div');
        deadlineElem.classList.add('deadline');
        rightPanel.appendChild(deadlineElem);
    }
    deadlineElem.textContent = `任务截止时间（北京时间）：${deadlineText}`;
}

/**
 * 显示错误信息，3.5秒后自动消失
 * @param {string} msg 
 */
function showError(msg) {
    let errElem = document.querySelector('.error');
    if (!errElem) {
        errElem = document.createElement('div');
        errElem.classList.add('error');
        rightPanel.appendChild(errElem);
    }
    errElem.textContent = msg;
    setTimeout(() => { errElem.textContent = ''; }, 3500);
}
