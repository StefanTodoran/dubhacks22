async function parseReceipt(img_element, logger) {
    const worker = Tesseract.createWorker({
        logger: logger,
    });
    
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_COLUMN,
        tessedit_char_whitelist: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ",
    });
    const data = await worker.recognize(img_element);
    //const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    console.log(data);
    await worker.terminate();
    return data.data;
}

