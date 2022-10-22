
function setupCamera() {
    const imageInp = document.getElementById('camera-inp');
    const textbox = document.getElementById('textbox');

    const textboxLogger = (status: any) => {
        textbox.innerText = "Loading... " + status.status + "   " + status.progress;
    }
    
    imageInp.addEventListener('change', async (event: any) => {
        let files = event.target.files;
        if (files.length > 0) {
            textbox.innerText = 'Loading...';
            let data = await parseReceipt(files[0], textboxLogger);
            textbox.innerText = data.text;
        }
    });
}

