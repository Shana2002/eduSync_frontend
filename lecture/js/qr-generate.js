function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get number from query string
const number = getQueryParam("session");

// Generate QR code if number is present
if (number) {
    console.log(number);
    generateQr(number);
} else {
    document.getElementById("qr-container").innerHTML = "<p style='color: red;'>No number provided!</p>";
}
async function generateQr(session){
    console.log(session)
    new QRCode(document.getElementById("qr-container"), session,{width:500,height:500});
    try {
        const response = await fetch('http://localhost:8000/v1/attandance/generate-qr',{
            method:'POST',
            credentials:'include',
            body: JSON.stringify(session)
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to fetch batch data');
        }
        
        const programs = await response.json(); // Convert response to JSON
        
        alert(programs);
        

    } catch (error) {
        console.log(error)
    }
}