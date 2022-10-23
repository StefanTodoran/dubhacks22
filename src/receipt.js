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

async function visImageCan(image) {
    //return;
    let can = document.createElement('canvas');
    can.width = 800;
    can.height = 800;
    let context = can.getContext('2d');
    context.drawImage(await createImageBitmap(image), 0, 0, can.width, can.height);
    document.body.appendChild(can);
}

async function loadAndProcessImage(img_element) {
    const debugImage = document.getElementById('debug-img');
    const debugImage2 = document.getElementById('debug-img2');
    const debug = document.getElementById('loader');

    let image = await Jimp.read(await img_element.arrayBuffer())

    //visImage(debugImage, image);
    
    const imageBytes = image.bitmap.data.byteLength;
    console.log('read in image');
    
    image.greyscale();
    let blurred = image.clone();
    blurred.blur(100);
    visImage(debugImage, blurred);

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

function rotateImage(image) {
    let width = image.width;
    let height = image.height;
    let newImage = new ImageData(height, width);
    for (let x = 0; x < width; x ++) {
        for (let y = 0; y < height; y ++) {
            newImage.data[(y*width + x)*4 + 0] = image.data[(x*height + y)*4 + 0];
            newImage.data[(y*width + x)*4 + 1] = image.data[(x*height + y)*4 + 1];
            newImage.data[(y*width + x)*4 + 2] = image.data[(x*height + y)*4 + 2];
            newImage.data[(y*width + x)*4 + 3] = image.data[(x*height + y)*4 + 3];
        }
    }
    return newImage;
}

async function loadAndProcessImageCanvas(img_element) {
    const debugImage = document.getElementById('debug-img');
    const debugImage2 = document.getElementById('debug-img2');
    const debug = document.getElementById('loader');

    let imageBitmap = await createImageBitmap(img_element);

    let width = imageBitmap.width;
    let height = imageBitmap.height;
    
    let canvas = document.createElement('canvas');
    
    //visImageCan(imageBitmap);
    let context = canvas.getContext('2d');
    
    //context.filter = 'grayscale(1)';
    if (window.screen.width < window.screen.height && window.screen.width < 1000) {
        width = imageBitmap.height;
        height = imageBitmap.width;
        
        canvas.width = width;
        canvas.height = height;

        context.save();
        context.translate(width/2, height/2);
        context.rotate(90*Math.PI/180);
        context.drawImage(imageBitmap, -imageBitmap.width/2, -imageBitmap.height/2);
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
    //visImageCan(image);
    
    //context.clearRect(0, 0, width, height);
    //context.filter = 'blur(100px)';
    //context.drawImage(await createImageBitmap(image), 0, 0);
    //let blurred = context.getImageData(0, 0, width, height);

    //const scale = 32;
    //let smallImage = context.getImageData(0, 0, width/scale, height/scale);

    //const loopLimit = (width/scale-1)*(height/scale);
    //for (let i = 0; i < loopLimit; i ++) {
    //    const val = smallImage.data[i*4];//(smallImage.data[i*4] + smallImage.data[i*4+1] + smallImage.data[(i+height/scale)*4] + smallImage.data[(i+height/scale+1)*4]) / 4;
    //    smallImage.data[i*4+0] = val;
    //    smallImage.data[i*4+1] = val;
    //    smallImage.data[i*4+2] = val;
    //    smallImage.data[i*4+3] = 255;
    //}
    
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
    
    //visImageCan(blurred);

    let maskimage = new ImageData(width, height);
    
    for (let i = 0; i < width*height; i ++) {
        const thresh = blurred.data[i*4] - 50;
        const val = 255 * (thresh < image.data[i*4]);
        maskimage.data[i*4+0] = val;
        maskimage.data[i*4+1] = val;
        maskimage.data[i*4+2] = val;
        maskimage.data[i*4+3] = 255;
    }
    
    //visImageCan(maskimage);

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

