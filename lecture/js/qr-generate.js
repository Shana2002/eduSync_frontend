function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get number from query string
const number = getQueryParam("session");

// Generate QR code if number is present
if (number) {
    generateQr(session);
} else {
    document.getElementById("qr-container").innerHTML = "<p style='color: red;'>No number provided!</p>";
}

async function generateQr(session){
    try {
        const response = await fetch('http://localhost:8000/v1/attandance/generate-qr',{
            method:'GET',
            credentials:'include',
            body: JSON.stringify(session)
        });
        if (!response.ok) {
            throw new Error('Failed to fetch batch data');
        }

        const programs = await response.json(); // Convert response to JSON
        
        alert(programs);
        new QRCode(document.getElementById("qr-container"), programs);

    } catch (error) {
        
    }
}