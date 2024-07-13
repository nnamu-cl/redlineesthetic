// Hair Transplant Simulator Script
document.addEventListener('DOMContentLoaded', function () {
    const imageUpload = document.getElementById('imageUpload');
    const uploadStatus = document.getElementById('uploadStatus');
    const originalImage = document.getElementById('originalImage');
    const threeMonthsImage = document.getElementById('threeMonthsImage');
    const sixMonthsImage = document.getElementById('sixMonthsImage');
    const oneYearImage = document.getElementById('oneYearImage');

    imageUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                uploadStatus.textContent = 'Image uploaded successfully!';
                originalImage.src = event.target.result;
                simulateHairGrowth(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    function simulateHairGrowth(imageSrc) {
        // In a real application, this would involve complex image processing.
        // For this example, we'll simply adjust the brightness to simulate growth.
        threeMonthsImage.src = adjustBrightness(imageSrc, 1.1);
        sixMonthsImage.src = adjustBrightness(imageSrc, 1.2);
        oneYearImage.src = adjustBrightness(imageSrc, 1.3);
    }

    function adjustBrightness(imageSrc, factor) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, data[i] * factor);
                data[i + 1] = Math.min(255, data[i + 1] * factor);
                data[i + 2] = Math.min(255, data[i + 2] * factor);
            }
            ctx.putImageData(imageData, 0, 0);
        };
        return canvas.toDataURL();
    }
});