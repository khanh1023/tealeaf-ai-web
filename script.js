let selectedFile = null;

const fileInput = document.getElementById('file-input');
const uploadPrompt = document.getElementById('upload-prompt');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const btnPredict = document.getElementById('btn-predict');
const resultPlaceholder = document.getElementById('result-placeholder');
const resultContent = document.getElementById('result-content');

// Xử lý chọn file
fileInput.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        selectedFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            uploadPrompt.classList.add('hidden');
            previewContainer.classList.remove('hidden');
            btnPredict.disabled = false;
        }
        reader.readAsDataURL(selectedFile);
    }
});

function resetUpload() {
    selectedFile = null;
    fileInput.value = '';
    uploadPrompt.classList.remove('hidden');
    previewContainer.classList.add('hidden');
    btnPredict.disabled = true;
    resultPlaceholder.classList.remove('hidden');
    resultContent.classList.add('hidden');
}

// Mô phỏng kết quả dự đoán AI
function runPrediction() {
    if (!selectedFile) return;

    btnPredict.disabled = true;
    btnPredict.textContent = "Đang phân tích mô hình MobileNetV2...";

    setTimeout(() => {
        btnPredict.disabled = false;
        btnPredict.textContent = "Chạy Chẩn Đoán AI";
        resultPlaceholder.classList.add('hidden');
        resultContent.classList.remove('hidden');

        // Danh sách các bệnh giả lập khớp với dataset của bạn
        const diseases = [
            { name: "Bệnh phồng lá (Algal leaf / Blight)", confidence: 96.4, treatment: "Phun dung dịch gốc đồng, cắt tỉa cành lá bị nhiễm bệnh nặng để thông thoáng vườn chè." },
            { name: "Bệnh đốm nâu (Brown blight)", confidence: 94.2, treatment: "Giảm phân đạm thừa, tăng cường kali, thu gom và tiêu hủy lá rụng dưới gốc." },
            { name: "Bệnh thán thư (Anthracnose)", confidence: 92.8, treatment: "Sử dụng thuốc bảo vệ thực vật sinh học, đảm bảo mật độ trồng hợp lý tránh ẩm độ cao." },
            { name: "Lá khỏe mạnh (Healthy)", confidence: 98.9, treatment: "Cây phát triển tốt. Duy trì chế độ bón phân và tưới nước định kỳ." }
        ];

        // Chọn ngẫu nhiên kết quả để demo trực quan
        const randomRes = diseases[Math.floor(Math.random() * diseases.length)];

        document.getElementById('res-disease').textContent = randomRes.name;
        document.getElementById('res-bar').style.width = randomRes.confidence + '%';
        document.getElementById('res-confidence').textContent = randomRes.confidence + '%';
        document.getElementById('res-treatment').textContent = randomRes.treatment;
    }, 1500);
}

// Vẽ biểu đồ thực nghiệm Chương 3 bằng Chart.js
window.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('experimentChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Epoch 10', 'Epoch 20', 'Epoch 30', 'Epoch 40', 'Epoch 50'],
            datasets: [{
                label: 'Độ chính xác kiểm định (Validation Accuracy %)',
                data: [78.5, 85.2, 90.1, 94.6, 97.2],
                borderColor: '#059669',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: { min: 70, max: 100 }
            }
        }
    });
});

// Cập nhật tên miền giả lập
function updateDomain() {
    const domainVal = document.getElementById('domain-input').value.trim();
    const displayBox = document.getElementById('domain-preview');
    const domainDisplay = document.getElementById('domain-display');

    if (domainVal) {
        domainDisplay.textContent = "https://" + domainVal;
        displayBox.classList.remove('hidden');
    } else {
        alert("Vui lòng nhập tên miền hợp lệ!");
    }
}