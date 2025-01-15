const qrTextInput = document.getElementById("qr-text");
const generateQrBtn = document.getElementById("generate-qr-btn");
const qrOutput = document.getElementById("qr-output");
const loadingOverlay = document.getElementById("loading-overlay");

function generateQRCode(text) {
    const qrOutputDiv = document.getElementById("qr-output");
    qrOutputDiv.innerHTML = "";

    new QRCode(qrOutputDiv, {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function showAlert(message, type = "success") {
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type}`;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

generateQrBtn.addEventListener("click", () => {
    const qrText = qrTextInput.value.trim();

    if (!qrText) {
        showAlert("Please enter text or URL!", "error");
        return;
    }

    loadingOverlay.classList.add("active");

    setTimeout(() => {
        generateQRCode(qrText);
        loadingOverlay.classList.remove("active");
        showAlert("QR Code generated successfully!", "success");
    }, 1000);
});
