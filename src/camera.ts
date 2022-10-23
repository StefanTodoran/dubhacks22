
function setupCamera() {
    document.getElementById('textbox').innerText = 'sjkdkfsdlfsd';
    const imageInp = document.getElementById('camera-inp');
    const textbox = document.getElementById('textbox');

    const textboxLogger = (status: any) => {
        textbox.innerText = "Loading... " + status.status + "   " + status.progress;
    }
    
    document.getElementById('textbox').innerText = 'adding event listener';
    imageInp.addEventListener('change', async (event: any) => {
        document.getElementById('textbox').innerText = 'in event listere';
        let files = event.target.files;
        if (files.length > 0) {
            textbox.innerText = 'Loading...';
            let data = await parseReceipt(files[0], textboxLogger);
            textbox.innerText = "Result: " + data.text;
        }
    });
}

