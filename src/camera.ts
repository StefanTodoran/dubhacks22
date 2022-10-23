
function setupCamera() : string {
    const imageInps:any = document.querySelectorAll('.camera-inp'); // there are 2
    const loader = document.getElementById('loader');

    const loaderProgress = (status: any) => {
        const scan_btns = document.querySelectorAll('.scan-btn');
        for (let i = 0; i < scan_btns.length; i++) {
            scan_btns[i].classList.add('hidden');
        }
        loader.classList.remove('hidden');
        loader.style.setProperty('--status', quoted(nbsp(status.status + '...')));
        loader.style.setProperty('--progress', status.progress);

        if (status.status === 'recognizing text' && status.progress === 1) {
            for (let i = 0; i < scan_btns.length; i++) {
                scan_btns[i].classList.remove('hidden');
            }
            loader.classList.add('hidden');
        }
    }
    
    const on_click: Function = async (event: any) => {
        let files = event.target.files;
        if (files.length > 0) {
            let data = await parseReceipt(files[0], loaderProgress);
            parse_data(data.text);
        }
    }

    for (let i = 0; i < imageInps.length; i++) {
        imageInps[i].addEventListener('change', on_click);
    }
    return null;
}

