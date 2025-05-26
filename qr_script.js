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
let usageCount = parseInt(localStorage.getItem(usageCountKey)) || 0;
usageCountSpan.innerText = usageCount;

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function (event) {
        const imageDataUrl = event.target.result;

        const image = new Image();
        image.src = imageDataUrl;

        image.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                const originalText = code.data;
                const newText = modifyCreateTime(originalText);
                generateQRCode(newText);

                // 成功识别，使用次数+1并保存显示
                usageCount += 1;
                localStorage.setItem(usageCountKey, usageCount);
                usageCountSpan.innerText = usageCount;

            } else {
                alert('二维码识别失败，请使用清晰图像');
            }
        };
    };
    reader.readAsDataURL(file);
});

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

    alert('未检测到 createTime 参数');
    return text;
}

/**
 * 生成二维码图片并显示
 * @param {string} text 要编码的文本
 */
function generateQRCode(text) {
    let oldQR = document.querySelector('.qr-image');
    if (oldQR) oldQR.remove();

    const qrImg = document.createElement('img');
    qrImg.classList.add('qr-image');

    QRCode.toDataURL(text, { width: 260, margin: 2 }, function (err, url) {
        if (err) {
            alert('二维码生成失败');
            return;
        }
        qrImg.src = url;
        rightPanel.appendChild(qrImg);
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
