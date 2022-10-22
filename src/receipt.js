const {createWorker} = Tesseract;

const worker = createWorker({
    logger: console.log,
});

async function tesseract_main() {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize('receipts/4.jpg');
    //const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    console.log(text);
    await worker.terminate();
}

//main();

