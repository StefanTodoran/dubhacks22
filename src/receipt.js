
var debugImages = false;

async function visImageCan(image) {
    if (debugImages) {
        let can = document.createElement('canvas');
        can.width = 600;
        can.height = image.height * can.width / image.width;
        let context = can.getContext('2d');
        context.drawImage(await createImageBitmap(image), 0, 0, can.width, can.height);
        document.body.appendChild(can);
    }
}

async function loadAndProcessImageCanvas(img_element) {
    const debugImage = document.getElementById('debug-img');
    const debugImage2 = document.getElementById('debug-img2');
    const debug = document.getElementById('loader');

    let imageBitmap = await createImageBitmap(img_element);

    let width = imageBitmap.width;
    let height = imageBitmap.height;

    if (width > 3000 || height > 3000) {
        width = Math.floor(width*0.75);
        height = Math.floor(height*0.75);
    }
    
    let canvas = document.createElement('canvas');
    
    //visImageCan(imageBitmap);
    let context = canvas.getContext('2d');
    
    //context.filter = 'grayscale(1)';
    //document.getElementById('textbox').innerText = window.screen.width + ' ' + window.screen.height + ' ' + height + ' ' + width;
    //if (window.screen.width < window.screen.height && height > width) {
    if (['iPad', 'iPhone', 'iPod'].includes(navigator.platform)) {
        let tmp = width;
        width = height;
        height = tmp;
        
        canvas.width = width;
        canvas.height = height;

        context.save();
        context.translate(width/2, height/2);
        context.rotate(90*Math.PI/180);
        context.drawImage(imageBitmap, -height/2, -width/2, height, width);
        context.restore();
    } else {
        canvas.width = width;
        canvas.height = height;

        context.drawImage(imageBitmap, 0, 0);
    }
    delete imageBitmap;
    let image = context.getImageData(0, 0, width, height);
    //image = rotateImage(image);
    //width = image.width;
    //height = image.height;
    //console.log(width);
    //console.log(image.width);
    //visImageCan(image);

    for (let i = 0; i < width*height; i ++) {
        const average = (image.data[i*4+0] + image.data[i*4+1] + image.data[i*4+2]) / 3;
        image.data[i*4+0] = average;
        image.data[i*4+1] = average;
        image.data[i*4+2] = average;
        image.data[i*4+3] = 255;
    }
    visImageCan(image);
    
    //tmpBitmap = await createImageBitmap(smallImage);
    const scale = 64;

    let tmpBitmap = await createImageBitmap(image);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(tmpBitmap, 0, 0, width/scale, height/scale);
    delete tmpBitmap;
    tmpBitmap = await createImageBitmap(context.getImageData(0, 0, width/scale, height/scale))
    const radius = 1;
    context.globalCompositeOperation = 'lighten';
    for (let x = -radius; x <= radius; x ++) {
        for (let y = -radius; y <= radius; y ++) {
            context.drawImage(tmpBitmap, x, y);
        }
    }
    context.globalCompositeOperation = 'source-over';
    delete tmpBitmap;
    tmpBitmap = await createImageBitmap(context.getImageData(0, 0, width/scale, height/scale))
    ////context.globalAlpha = 0.3;
    //console.log(context.globalCompositeOperation);
    //context.globalCompositeOperation = 'lighten';
    //console.log(context.globalCompositeOperation);
    //const radius = 3;
    //for (let x = -radius; x <= radius; x ++) {
    //    for (let y = -radius; y <= radius; y ++) {
    //        context.drawImage(tmpBitmap, 0, (x/2)*scale, width, height+(x/2)*scale);
    //        context.drawImage(tmpBitmap, (x/2)*scale, 0, width+(x/2)*scale, height);
    //        context.drawImage(tmpBitmap, 0, -(x/2)*scale, width, height-(x/2)*scale);
    //        context.drawImage(tmpBitmap, -(x/2)*scale, 0, width-(x/2)*scale, height);
    //    }
    //}
    ////context.globalAlpha = 1;
    //context.globalCompositeOperation = 'source-over';
    context.drawImage(tmpBitmap, 0, 0, width, height);
    delete tmpBitmap;
    let blurred = context.getImageData(0, 0, width, height);
    
    visImageCan(blurred);

    let maskimage = new ImageData(width, height);
    
    for (let i = 0; i < width*height; i ++) {
        const thresh = blurred.data[i*4] - 50;
        const val = 255 * (thresh < image.data[i*4]);
        maskimage.data[i*4+0] = val;
        maskimage.data[i*4+1] = val;
        maskimage.data[i*4+2] = val;
        maskimage.data[i*4+3] = 255;
    }
    
    visImageCan(maskimage);

    tmpBitmap = await createImageBitmap(maskimage);
    delete maskimage;
    context.drawImage(tmpBitmap, 0, 0);
    delete tmpBitmap;
    
    let data = canvas.toDataURL('image/png');

    delete context;
    delete canvas;

    return data;
}


async function parseReceipt(img_element, logger) {
    //let image = await loadAndProcessImage(img_element);
    //let imagedata = new ImageData(new Uint8ClampedArray(image.bitmap.data.buffer), image.bitmap.width, image.bitmap.height);
    //let image = await loadAndProcessImageCanvas(img_element);

    //const text = OCRAD(image);
    //return {text: text};
    let dataurl = await loadAndProcessImageCanvas(img_element);
    
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
    const data = await worker.recognize(dataurl);
    //const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    await worker.terminate();
    return data.data;
}

