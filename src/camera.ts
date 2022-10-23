
function setupCamera() : string {
    document.getElementById('textbox').innerText = 'sjkdkfsdlfsd';
    const imageInps:any = document.querySelectorAll('.camera-inp'); // there are 2
    const textbox = document.getElementById('textbox');

    const textboxLogger = (status: any) => {
        textbox.classList.remove('hidden');
        textbox.innerText = "Loading... " + status.status + "   " + status.progress;
    }
    
    document.getElementById('textbox').innerText = 'adding event listener';
    const on_click: Function = async (event: any) => {
        document.getElementById('textbox').innerText = 'in event listere';
        let files = event.target.files;
        if (files.length > 0) {
            textbox.innerText = 'Loading...';
            let data = await parseReceipt(files[0], textboxLogger);
            textbox.innerText = data.text;
            parse_data(data.text);
            //return data.text;
        }
    }

    for (let i = 0; i < imageInps.length; i++) {
        imageInps[i].addEventListener('change', on_click);
    }
    return null;
}

