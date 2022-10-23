
//function getGreyVal(image, x, y) {
//    return Jimp.intToRGBA(image.getPixelColor(x, y)).r;
//}
//function setGreyVal(image, x, y, val) {
//    image.setPixelColor(Jimp.rgbaToInt(val, val, val, 255), x, y);
//}
//
//function meanRange(image, xmin, ymin, xmax, ymax) {
//    let total = 0;
//    let num = 0;
//    for (let x = xmin; x < xmax; x ++) {
//        for (let y = ymin; y < ymax; y ++) {
//            total += getGreyVal(image, x, y);
//            num ++;
//        }
//    }
//    return total / num;
//}
//
//async function processImage(image) {
//    console.log('starting image processing');
//    image.resize(500,500);
//    image.greyscale();
//    
//    const footprint_size = 20;
//
//    let mask = image.clone();
//    
//    for (let x = 0; x < image.bitmap.width; x ++) {
//        for (let y = 0; y < image.bitmap.height; y ++) {   
//            const thresh = meanRange(image, Math.max(0, x - footprint_size), Math.min(image.bitmap.width, x + footprint_size),
//                                    Math.max(0, y - footprint_size), Math.min(image.bitmap.height, y + footprint_size));
//            const value = getGreyVal(image, x, y) > thresh;
//            setGreyVal(mask, x, y, thresh);
//        }
//    }
//    console.log('done');
//    
//    return mask;
//}

async function visImage(elem, image) {
    let copy = image.clone();
    copy.resize(500,500);
    elem.src = await copy.getBase64Async('image/png');
}


async function loadAndProcessImage(img_element) {
    const debugImage = document.getElementById('debug-img');
    const debugImage2 = document.getElementById('debug-img2');
    const debugTxt = document.getElementById('textbox');

    debugTxt.innerText = "starting";
    let image = await Jimp.read(await img_element.arrayBuffer())

    debugTxt.innerText = "read the image in";
    //visImage(debugImage, image);
    
    const imageBytes = image.bitmap.data.byteLength;
    console.log('read in image');
    
    let blurred = image.clone();
    blurred.blur(100);
    debugTxt.innerText = "blurred";

    let maskimage = image.clone();

    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    for (let i = 0; i < width*height; i ++) {
        const thresh = blurred.bitmap.data[i*4] - 20;
        const val = 255 * (thresh < image.bitmap.data[i*4]);
        maskimage.bitmap.data[i*4+0] = val;
        maskimage.bitmap.data[i*4+1] = val;
        maskimage.bitmap.data[i*4+2] = val;
        maskimage.bitmap.data[i*4+3] = 255;
    }

    debugTxt.innerText = "done";
    //if (memory === undefined) {
    //    await loadWasm(imageBytes*2);
    //}
    //console.log('loaded wasm with bytes ' + imageBytes*2);

    //let {image: outimage, handle: outhandle} = allocImage(imageBytes);
    //let {image: inpimage, handle: inphandle} = allocImage(imageBytes);
    //console.log('alloc images');
    //
    //inpimage.set(image.bitmap.data);
    //console.log('copied to inpimage');
    //
    //for (let j = 0; j < 100; j ++) {
    //    for (let i = 0; i < imageBytes; i ++) {
    //        outimage[i] = inpimage[i];
    //    }
    //}
    ////processImage(inphandle, outhandle, image.bitmap.width, image.bitmap.height);
    //console.log('processed image');

    //image.bitmap.data.set(outimage);
    //console.log('compied back');
    image = maskimage
    visImage(debugImage2, image);
    return image
    
    console.log(image);
    let processedBuffer = await image.getBufferAsync('image/png');
    visImage(debugImage2, image);
    //debugImage.src = await image.getBase64Async('image/png');
    return processedBuffer;
}


async function parseReceipt(img_element, logger) {
    let image = await loadAndProcessImage(img_element);
    let imagedata = new ImageData(new Uint8ClampedArray(image.bitmap.data.buffer), image.bitmap.width, image.bitmap.height);

    const text = OCRAD(imagedata);
    return {text: text};
    
    let processedBuffer = await loadAndProcessImage(img_element);
    
    const worker = Tesseract.createWorker({
        logger: logger,
    });
    
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    //await worker.setParameters({
        //tessedit_pageseg_mode: Tesseract.PSM.SINGLE_COLUMN,
    //    tessedit_char_whitelist: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ",
    //});
    const data = await worker.recognize(processedBuffer);
    //const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    console.log(data);
    await worker.terminate();
    return data.data;
}

