var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function setupCamera() {
    var _this = this;
    document.getElementById('textbox').innerText = 'sjkdkfsdlfsd';
    var imageInp = document.getElementById('camera-inp');
    var textbox = document.getElementById('textbox');
    var textboxLogger = function (status) {
        textbox.classList.remove('hidden');
        textbox.innerText = "Loading... " + status.status + "   " + status.progress;
    };
    document.getElementById('textbox').innerText = 'adding event listener';
    imageInp.addEventListener('change', function (event) { return __awaiter(_this, void 0, void 0, function () {
        var files, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    document.getElementById('textbox').innerText = 'in event listere';
                    files = event.target.files;
                    if (!(files.length > 0)) return [3, 2];
                    textbox.innerText = 'Loading...';
                    return [4, parseReceipt(files[0], textboxLogger)];
                case 1:
                    data = _a.sent();
                    textbox.innerText = data.text;
                    parse_data(data.text);
                    _a.label = 2;
                case 2: return [2];
            }
        });
    }); });
    return null;
}
var wasmInstance;
var memory;
var curMemIndex = 0;
var processImage;
function loadWasm(expectedMem) {
    return __awaiter(this, void 0, void 0, function () {
        var response, bytes, instance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch('wasm/image.wasm')];
                case 1:
                    response = _a.sent();
                    return [4, response.arrayBuffer()];
                case 2:
                    bytes = _a.sent();
                    return [4, WebAssembly.instantiate(bytes)];
                case 3:
                    instance = (_a.sent()).instance;
                    wasmInstance = instance;
                    memory = instance.exports.memory;
                    processImage = instance.exports.processImage;
                    while (memory.buffer.byteLength < expectedMem) {
                        memory.grow(1);
                    }
                    return [2];
            }
        });
    });
}
function allocImage(neededMemory) {
    var newarr = new Uint8Array(memory.buffer, curMemIndex, neededMemory);
    var prevIndex = curMemIndex;
    curMemIndex += neededMemory;
    return { image: newarr, handle: prevIndex };
}
window.addEventListener('load', init);
function init() {
    var examples = [
        { name: "Apples", raw: "APPL", group: "fruit", pantry: 12, fridge: 24 },
        { name: "Carrots", raw: "CRT", group: "vegetable", fridge: 21, pantry: 7 },
        { name: "Margarine", raw: "MARGRN", fridge: 124, on_open_fridge: 62 },
        { name: "Minced Beef", raw: "MNCED BEEF", group: "meat", fridge: 2, freezer: 5 },
        { name: "Pancake Mix", raw: "PNCK MIX", group: "grains", pantry: 19, on_open_pantry: 12 },
        { name: "Yogurt", raw: "YOGURT", group: "dairy", fridge: 7, freezer: 31, on_open_fridge: 3 },
        { name: "Broccoli", raw: "BRCLI", group: "vegetable", fridge: 5, pantry: 2 },
        { name: "Jam", raw: "JAM", on_open_fridge: 365 },
        { name: "Bread", raw: "BREAD", group: "grains", pantry: 4, fridge: 22, on_open_fridge: 15 },
        { name: "Milk", raw: "MILK", group: "dairy", on_open_fridge: 1, fridge: 7 },
    ];
    displayFoodItems(examples, "Example Data Visualization");
    setupCamera();
    var show_more = document.getElementById('show-more-btn');
    var demo = document.getElementById('demo');
    show_more.addEventListener('click', function () {
        demo.classList.toggle('shown');
        if (show_more.textContent == "See More") {
            show_more.textContent = "Go Back";
        }
        else {
            show_more.textContent = "See More";
        }
    });
}
function displayRecipes(items, message) {
    if (message === void 0) { message = "Your Recipes"; }
    var container = document.getElementById('recipes');
    var template = document.getElementById('recipe-template');
    container.innerHTML = "";
    container.appendChild(template);
    var _loop_1 = function (i) {
        var item = items[i];
        var node = template.cloneNode(true);
        node.classList.remove('hidden');
        node.id = "";
        node.querySelector('h2.recipe-name').textContent = item.title;
        node.querySelector('span').textContent = nbsp(" (") + item.time + " mins)";
        node.querySelector('.recipe-img').setAttribute('src', item.img);
        node.querySelector('.recipe-url').setAttribute('href', item.url);
        node.addEventListener('click', function () {
            window.open(item.url, '_blank');
        });
        var utilized = "Includes ";
        for (var j = 0; j <= Math.min(10, item.utilized.length); j++) {
            if (item.utilized[j]) {
                utilized += item.utilized[j].toLowerCase();
                if (j < Math.min(10, item.utilized.length)) {
                    utilized += ", ";
                }
            }
        }
        node.querySelector('p').textContent = utilized;
        container.insertBefore(node, template);
    };
    for (var i = 0; i < items.length; i++) {
        _loop_1(i);
    }
    var text = document.createElement('h2');
    text.innerText = message;
    text.style.textAlign = "center";
    container.insertBefore(text, container.firstChild);
    container.classList.remove('hidden');
}
function displayFoodItems(food_items, message) {
    if (message === void 0) { message = "Your Data"; }
    var container = document.getElementById('visualizer');
    var template = document.getElementById('food-item-template');
    container.innerHTML = "";
    container.appendChild(template);
    for (var i = 0; i < food_items.length; i++) {
        var item = food_items[i];
        var node = template.cloneNode(true);
        node.classList.remove('hidden');
        node.id = "";
        node.querySelector('h2').textContent = item.name;
        node.querySelector('h3').textContent = '(' + item.raw + ')';
        if (item.group) {
            node.classList.add(item.group);
        }
        var has_double = false;
        addDuration(node, "pantry", item.pantry);
        has_double = addDuration(node, "on_open_pantry", item.on_open_pantry);
        addDuration(node, "fridge", item.fridge);
        has_double = addDuration(node, "on_open_fridge", item.on_open_fridge) || has_double;
        addDuration(node, "freezer", item.freezer);
        if (has_double) {
            node.querySelector('.food-duration-container').classList.add('double-len');
        }
        container.insertBefore(node, template);
    }
    var text = document.createElement('h2');
    text.innerText = message;
    text.style.textAlign = "center";
    container.insertBefore(text, container.firstChild);
}
function queryRecipes(food_items) {
    if (food_items.length == 0) {
        return;
    }
    var food_item1 = null;
    var min_days_left = Number.MAX_SAFE_INTEGER;
    for (var _i = 0, food_items_1 = food_items; _i < food_items_1.length; _i++) {
        var food_item = food_items_1[_i];
        if (food_item.days_left < min_days_left) {
            food_item1 = food_item;
            min_days_left = food_item.days_left;
        }
    }
    var food_item2 = null;
    min_days_left = Number.MAX_SAFE_INTEGER;
    for (var _a = 0, food_items_2 = food_items; _a < food_items_2.length; _a++) {
        var food_item = food_items_2[_a];
        if (food_item.group != food_item1.group && food_item.days_left < min_days_left) {
            food_item2 = food_item;
            min_days_left = food_item.days_left;
        }
    }
    var food_names = [food_item1.name];
    if (food_item2) {
        food_names.push(food_item2.name);
    }
    fetch('https://api.edamam.com/search?q=' + food_names.join('+') + '&app_id=95184d17&app_key=0f50ed3c9420a4de48414fe67d08b4bc')
        .then(function (response) { return response.json(); })
        .then(function (response) { return processRecipes(JSON.parse(JSON.stringify(response.hits))); });
}
function processRecipes(recipe_objs) {
    var recipes = [];
    for (var _i = 0, recipe_objs_1 = recipe_objs; _i < recipe_objs_1.length; _i++) {
        var recipe_obj = recipe_objs_1[_i];
        var recipe = recipe_obj.recipe;
        var ingredients = [];
        for (var i = 0; i < recipe.ingredients.length; i++) {
            ingredients.push(recipe.ingredients[i].food);
        }
        var recipe_item = {
            title: recipe.label,
            utilized: ingredients,
            img: recipe.image,
            time: Math.max(recipe.totalTime, 10),
            url: recipe.url
        };
        recipes.push(recipe_item);
    }
    displayRecipes(recipes);
}
function addDuration(node, type, duration) {
    var indicator = node.querySelector("." + type);
    if (duration) {
        var length_1 = (Math.pow(duration, 0.5)).toString();
        indicator.style.setProperty('--length', length_1);
        var raw_text = (duration > 1) ? duration.toString() + ' days' : duration.toString() + ' day';
        var display_duration = nbsp(quoted(raw_text));
        indicator.style.setProperty('--days', display_duration);
        if (duration < 7) {
            indicator.classList.add('short-duration');
        }
        return true;
    }
    else {
        node.querySelector('.food-duration-container').removeChild(indicator);
        return false;
    }
}
function nbsp(string) {
    return string.replace(/ /g, '\u00a0');
}
function quoted(string) {
    return '"' + string + '"';
}
var RECEIPT = "\nSee back of rece jour chance\nto win 1000 154 ERTvikEa0G\ng Walmart 3i\n118511102 Mar JAHIE BRODKSHIRE\nBBgRs yfanEMQDMI gs\nST8 05483 00y 00000 R 009 e 06976\nTATER TOTS 001312000026 F 2.36 0\nHARD/PROV/DC 007874219410 F 2.68 0\nSNACK BARS 002190848816 F 4.98 T\nHRI CL CHS 003120806000 F 6.88 0\nHRI CL CHS 003120806000 F 6.88 0\nHRI CL CHS 003120806000 F 6.88 0\n** VOIDED ENTRY**\nHRT CL CHS 003120506000 F 58.80\nHRI 12 U SG 003120836000 F 6.88 0\nHRI CL PEP 003120807000 F 5.88 0\nEARBUDS 068113100946 488 X\nSC BCN CHDDR 007874202906 F 6.98 0\nABF THINBRST 022461710972 F 97.20\nPOTATO 007874219410 F 26.80\nDV RSE OTL W 001111101220 i\nAPPLE 3 BAG 0B4747300184 F 6.47 N\nSTOK LT SUT 004127102774 F 4.42 T J\nPEANUT BUTTR 005160026499 F 6.44 0 1\nAVO VERDE 061611206143 F 2.98 N\nROLLS P o BT 18\nBAGELS 001376402801 F 41.86 0\nGV SLTDERS 007874201525 2.98 X\nACCESSORY 007616161216 01.97 X\nCHEEZE IT 002410063623 F 40.00\nUAS 459 YOU SAVED 054\nRITZ 004400088210 F 2.78 N\nRUFFLES 002840020942 F 2.50 N\nGV HNY GRNS 007874207263 F 1.28 N\nSUBTOTAL 13944\nTAX 1 7000 458\nTOTAL 14402\nCASH TEND 16002\nCHANGE DUE 600\nITENS SOLD 26\nTCH ovrs EGTF 107z ij gfsa 5\nMM\no\nAU T\n04727719 1216946\nScan with Walnart ap to save recelpts\nmiE\ni\nmE\n";
var keywords_to_food_items = [];
var final_food_items = [];
function parse_data(raw_receipt) {
    console.log(raw_receipt);
    fetch('data/foodkeeper.json', { mode: 'no-cors' })
        .then(function (response) { return response.json(); })
        .then(function (food_data) { return process_food_data(JSON.parse(JSON.stringify(food_data)), raw_receipt); });
}
function get_days(max_time, metric) {
    if (JSON.stringify(metric).includes("Day")) {
        return max_time;
    }
    else if (JSON.stringify(metric).includes("Week")) {
        return max_time * 7;
    }
    else if (JSON.stringify(metric).includes("Month")) {
        return max_time * 30;
    }
    else if (JSON.stringify(metric).includes("Year")) {
        return max_time * 365;
    }
    else if (JSON.stringify(metric).includes("Hour")) {
        return 1;
    }
    else {
        console.log("this should never be called! metric: " + metric);
    }
}
function get_category(category_id_object) {
    var category_id = category_id_object["Category_ID"];
    if ((category_id >= 10 && category_id <= 17) || (category_id >= 20 && category_id <= 22)) {
        return "meat";
    }
    else if (category_id == 19 || category_id == 24) {
        return "vegetable";
    }
    else if (category_id == 19) {
        return "fruit";
    }
    else if ((category_id >= 2 && category_id <= 4) || category_id == 9) {
        return "grains";
    }
    else if (category_id == 7) {
        return "dairy";
    }
    else {
        return "default";
    }
}
function process_food_data(food_data, raw_receipt) {
    for (var _i = 0, _a = food_data.sheets[2].data; _i < _a.length; _i++) {
        var food_entry = _a[_i];
        var food_name = food_entry[2]["Name"];
        var food_item = { name: food_name, raw: "" };
        var food_category = get_category(food_entry[1]);
        if (food_category != "default") {
            food_item.group = food_category;
        }
        food_item.days_left = 0;
        if (food_entry[6] && !JSON.stringify(food_entry[6]).includes(null)) {
            var num_days = get_days(food_entry[6]["Pantry_Max"], food_entry[7]);
            food_item.pantry = num_days;
            food_item.days_left += num_days;
        }
        else if (food_entry[10] && !JSON.stringify(food_entry[10]).includes(null)) {
            var num_days = get_days(food_entry[10]["DOP_Pantry_Max"], food_entry[11]);
            food_item.pantry = num_days;
            food_item.days_left += num_days;
        }
        if (food_entry[14] && !JSON.stringify(food_entry[14]).includes(null)) {
            var num_days = get_days(food_entry[14]["Pantry_After_Opening_Max"], food_entry[15]);
            food_item.on_open_pantry = num_days;
            food_item.days_left += num_days;
        }
        if (food_entry[17] && !JSON.stringify(food_entry[17]).includes(null)) {
            var num_days = get_days(food_entry[17]["Refrigerate_Max"], food_entry[18]);
            food_item.fridge = num_days;
            food_item.days_left += num_days;
        }
        else if (food_entry[21] && !JSON.stringify(food_entry[21]).includes(null)) {
            var num_days = get_days(food_entry[21]["DOP_Refrigerate_Max"], food_entry[22]);
            food_item.fridge = num_days;
            food_item.days_left += num_days;
        }
        if (food_entry[25] && !JSON.stringify(food_entry[25]).includes(null)) {
            var num_days = get_days(food_entry[25]["Refrigerate_After_Opening_Max"], food_entry[26]);
            food_item.on_open_fridge = num_days;
            food_item.days_left += num_days;
        }
        if (food_entry[31] && !JSON.stringify(food_entry[31]).includes(null)) {
            var num_days = get_days(food_entry[31]["Freeze_Max"], food_entry[32]);
            food_item.freezer = num_days;
            food_item.days_left += num_days;
        }
        else if (food_entry[35] && !JSON.stringify(food_entry[35]).includes(null)) {
            var num_days = get_days(food_entry[35]["DOP_Freeze_Max"], food_entry[36]);
            food_item.freezer = num_days;
            food_item.days_left += num_days;
        }
        if (!food_item.pantry && !food_item.fridge && !food_item.freezer &&
            !food_item.on_open_pantry && !food_item.on_open_fridge) {
            continue;
        }
        var keywords_string = food_entry[4]["Keywords"];
        if (!keywords_string || keywords_string == '') {
            keywords_to_food_items.push([[food_name.toLowerCase()], food_item]);
        }
        else {
            keywords_string = keywords_string.split(' ').join('');
            var keywords = keywords_string.split(',');
            var filtered_keywords = [];
            for (var _b = 0, keywords_1 = keywords; _b < keywords_1.length; _b++) {
                var keyword = keywords_1[_b];
                if (keyword !== '') {
                    filtered_keywords.push(keyword.toLowerCase());
                }
            }
            keywords_to_food_items.push([filtered_keywords, food_item]);
        }
    }
    process_receipt(raw_receipt);
}
var INSERTION_COST = 1;
var DELETION_COST = 4;
function reconstruction_cost(receipt_name, keyword) {
    var dp = [];
    for (var i = 0; i < receipt_name.length + 1; i++) {
        dp.push(new Array(keyword.length + 1).fill(0));
    }
    for (var i = 0; i < receipt_name.length + 1; i++) {
        for (var j = 0; j < keyword.length + 1; j++) {
            if (i == 0) {
                dp[i][j] = INSERTION_COST * j;
            }
            else if (j == 0) {
                dp[i][j] = DELETION_COST * i;
            }
            else if (receipt_name.charAt(i - 1) == keyword.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            }
            else {
                dp[i][j] = Math.min(INSERTION_COST + dp[i][j - 1], DELETION_COST + dp[i - 1][j], INSERTION_COST + DELETION_COST + dp[i - 1][j - 1]);
            }
        }
    }
    return dp[receipt_name.length][keyword.length];
}
var NAME_CONSIDERATION = 0.1;
function search(receipt_name) {
    var min_cost = Number.MAX_SAFE_INTEGER;
    var closest_food_item = null;
    var receipt_words = receipt_name.split(' ');
    var receipt_word_count = receipt_words.length;
    for (var _i = 0, keywords_to_food_items_1 = keywords_to_food_items; _i < keywords_to_food_items_1.length; _i++) {
        var _a = keywords_to_food_items_1[_i], keywords = _a[0], food_item = _a[1];
        var total_over_words = 0;
        for (var _b = 0, receipt_words_1 = receipt_words; _b < receipt_words_1.length; _b++) {
            var receipt_word = receipt_words_1[_b];
            var keyword_min_cost = Number.MAX_SAFE_INTEGER;
            for (var _c = 0, keywords_2 = keywords; _c < keywords_2.length; _c++) {
                var keyword = keywords_2[_c];
                var cost = reconstruction_cost(receipt_word, keyword);
                if (cost < keyword_min_cost) {
                    keyword_min_cost = cost;
                }
            }
            total_over_words += keyword_min_cost;
        }
        var curr_avg_cost = total_over_words / receipt_word_count;
        var name_cost = reconstruction_cost(receipt_name, food_item.name);
        var true_cost = (NAME_CONSIDERATION * name_cost + (1 - NAME_CONSIDERATION) * curr_avg_cost) / receipt_name.length;
        if (true_cost < min_cost) {
            closest_food_item = food_item;
            min_cost = true_cost;
        }
    }
    return [closest_food_item, min_cost];
}
function is_letter(char) {
    return char.toLowerCase() != char.toUpperCase();
}
function is_number(char) {
    return !isNaN(parseInt(char, 10));
}
var MAX_COST = 1;
function process_receipt(receipt) {
    var receipt_lines = receipt.toLowerCase().split('\n');
    var receipt_names = [];
    for (var _i = 0, receipt_lines_1 = receipt_lines; _i < receipt_lines_1.length; _i++) {
        var receipt_line = receipt_lines_1[_i];
        if (receipt_line.includes("SUBTOTAL")) {
            break;
        }
        var re = new RegExp("^.*[0-9]{1,2}[.][0-9]{2}");
        if (re.test(receipt_line)) {
            receipt_line = receipt_line.replace(/[0-9]/g, '');
            receipt_line = receipt_line.replace(/(\s.\s|\s.$)/g, '');
            receipt_line = receipt_line.replace('.', '');
            receipt_names.push(receipt_line.trim());
        }
    }
    for (var _a = 0, receipt_names_1 = receipt_names; _a < receipt_names_1.length; _a++) {
        var receipt_name = receipt_names_1[_a];
        var _b = search(receipt_name), food_item = _b[0], cost = _b[1];
        if (cost > MAX_COST) {
            continue;
        }
        if (food_item.raw == "") {
            food_item.raw = receipt_name;
            final_food_items.push(food_item);
        }
        var prev_cost = reconstruction_cost(food_item.raw, food_item.name);
        var curr_cost = reconstruction_cost(receipt_name, food_item.name);
        if (curr_cost < prev_cost) {
            food_item.raw = receipt_name;
        }
    }
    var scan_btns = document.querySelectorAll('.scan-btn');
    for (var i = 0; i < scan_btns.length; i++) {
        scan_btns[i].addEventListener('click', function () {
            displayFoodItems(final_food_items);
            queryRecipes(final_food_items);
        });
    }
}
function visImage(elem, image) {
    return __awaiter(this, void 0, void 0, function () {
        var copy, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    copy = image.clone();
                    copy.resize(500, 500);
                    _a = elem;
                    return [4, copy.getBase64Async('image/png')];
                case 1:
                    _a.src = _b.sent();
                    return [2];
            }
        });
    });
}
function visImageCan(image) {
    return __awaiter(this, void 0, void 0, function () {
        var can, context, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    can = document.createElement('canvas');
                    can.width = 800;
                    can.height = 800;
                    context = can.getContext('2d');
                    _b = (_a = context).drawImage;
                    return [4, createImageBitmap(image)];
                case 1:
                    _b.apply(_a, [_c.sent(), 0, 0, can.width, can.height]);
                    document.body.appendChild(can);
                    return [2];
            }
        });
    });
}
function loadAndProcessImage(img_element) {
    return __awaiter(this, void 0, void 0, function () {
        var debugImage, debugImage2, debugTxt, image, _a, _b, imageBytes, blurred, maskimage, width, height, i, thresh, val, processedBuffer;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    debugImage = document.getElementById('debug-img');
                    debugImage2 = document.getElementById('debug-img2');
                    debugTxt = document.getElementById('textbox');
                    debugTxt.innerText = "starting";
                    _b = (_a = Jimp).read;
                    return [4, img_element.arrayBuffer()];
                case 1: return [4, _b.apply(_a, [_c.sent()])];
                case 2:
                    image = _c.sent();
                    debugTxt.innerText = "read the image in";
                    imageBytes = image.bitmap.data.byteLength;
                    console.log('read in image');
                    image.greyscale();
                    blurred = image.clone();
                    blurred.blur(100);
                    visImage(debugImage, blurred);
                    debugTxt.innerText = "blurred";
                    maskimage = image.clone();
                    width = image.bitmap.width;
                    height = image.bitmap.height;
                    for (i = 0; i < width * height; i++) {
                        thresh = blurred.bitmap.data[i * 4] - 20;
                        val = 255 * (thresh < image.bitmap.data[i * 4]);
                        maskimage.bitmap.data[i * 4 + 0] = val;
                        maskimage.bitmap.data[i * 4 + 1] = val;
                        maskimage.bitmap.data[i * 4 + 2] = val;
                        maskimage.bitmap.data[i * 4 + 3] = 255;
                    }
                    debugTxt.innerText = "done";
                    image = maskimage;
                    visImage(debugImage2, image);
                    return [2, image];
                case 3:
                    processedBuffer = _c.sent();
                    visImage(debugImage2, image);
                    return [2, processedBuffer];
            }
        });
    });
}
function rotateImage(image) {
    var width = image.width;
    var height = image.height;
    var newImage = new ImageData(height, width);
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            newImage.data[(y * width + x) * 4 + 0] = image.data[(x * height + y) * 4 + 0];
            newImage.data[(y * width + x) * 4 + 1] = image.data[(x * height + y) * 4 + 1];
            newImage.data[(y * width + x) * 4 + 2] = image.data[(x * height + y) * 4 + 2];
            newImage.data[(y * width + x) * 4 + 3] = image.data[(x * height + y) * 4 + 3];
        }
    }
    return newImage;
}
function loadAndProcessImageCanvas(img_element) {
    return __awaiter(this, void 0, void 0, function () {
        var debugImage, debugImage2, debugTxt, imageBitmap, width, height, canvas, context, image, i, average, scale, tmpBitmap, radius, x, y, blurred, maskimage, i, thresh, val, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    debugImage = document.getElementById('debug-img');
                    debugImage2 = document.getElementById('debug-img2');
                    debugTxt = document.getElementById('textbox');
                    return [4, createImageBitmap(img_element)];
                case 1:
                    imageBitmap = _a.sent();
                    width = imageBitmap.width;
                    height = imageBitmap.height;
                    canvas = document.createElement('canvas');
                    context = canvas.getContext('2d');
                    if (window.screen.width < window.screen.height && window.screen.width < 1000) {
                        width = imageBitmap.height;
                        height = imageBitmap.width;
                        canvas.width = width;
                        canvas.height = height;
                        context.save();
                        context.translate(width / 2, height / 2);
                        context.rotate(90 * Math.PI / 180);
                        context.drawImage(imageBitmap, -imageBitmap.width / 2, -imageBitmap.height / 2);
                        context.restore();
                    }
                    else {
                        canvas.width = width;
                        canvas.height = height;
                        context.drawImage(imageBitmap, 0, 0);
                    }
                    delete imageBitmap;
                    image = context.getImageData(0, 0, width, height);
                    console.log(width);
                    for (i = 0; i < width * height; i++) {
                        average = (image.data[i * 4 + 0] + image.data[i * 4 + 1] + image.data[i * 4 + 2]) / 3;
                        image.data[i * 4 + 0] = average;
                        image.data[i * 4 + 1] = average;
                        image.data[i * 4 + 2] = average;
                        image.data[i * 4 + 3] = 255;
                    }
                    scale = 64;
                    return [4, createImageBitmap(image)];
                case 2:
                    tmpBitmap = _a.sent();
                    context.imageSmoothingEnabled = true;
                    context.imageSmoothingQuality = "high";
                    context.drawImage(tmpBitmap, 0, 0, width / scale, height / scale);
                    delete tmpBitmap;
                    return [4, createImageBitmap(context.getImageData(0, 0, width / scale, height / scale))];
                case 3:
                    tmpBitmap = _a.sent();
                    radius = 1;
                    context.globalCompositeOperation = 'lighten';
                    for (x = -radius; x <= radius; x++) {
                        for (y = -radius; y <= radius; y++) {
                            context.drawImage(tmpBitmap, x, y);
                        }
                    }
                    context.globalCompositeOperation = 'source-over';
                    delete tmpBitmap;
                    return [4, createImageBitmap(context.getImageData(0, 0, width / scale, height / scale))];
                case 4:
                    tmpBitmap = _a.sent();
                    context.drawImage(tmpBitmap, 0, 0, width, height);
                    delete tmpBitmap;
                    blurred = context.getImageData(0, 0, width, height);
                    maskimage = new ImageData(width, height);
                    for (i = 0; i < width * height; i++) {
                        thresh = blurred.data[i * 4] - 50;
                        val = 255 * (thresh < image.data[i * 4]);
                        maskimage.data[i * 4 + 0] = val;
                        maskimage.data[i * 4 + 1] = val;
                        maskimage.data[i * 4 + 2] = val;
                        maskimage.data[i * 4 + 3] = 255;
                    }
                    return [4, createImageBitmap(maskimage)];
                case 5:
                    tmpBitmap = _a.sent();
                    delete maskimage;
                    context.drawImage(tmpBitmap, 0, 0);
                    delete tmpBitmap;
                    data = canvas.toDataURL('image/png');
                    debugTxt.innerText = "done";
                    delete context;
                    delete canvas;
                    return [2, data];
            }
        });
    });
}
function parseReceipt(img_element, logger) {
    return __awaiter(this, void 0, void 0, function () {
        var dataurl, worker, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, loadAndProcessImageCanvas(img_element)];
                case 1:
                    dataurl = _a.sent();
                    worker = Tesseract.createWorker({
                        logger: logger
                    });
                    return [4, worker.load()];
                case 2:
                    _a.sent();
                    return [4, worker.loadLanguage('eng')];
                case 3:
                    _a.sent();
                    return [4, worker.initialize('eng')];
                case 4:
                    _a.sent();
                    return [4, worker.recognize(dataurl)];
                case 5:
                    data = _a.sent();
                    console.log(data);
                    return [4, worker.terminate()];
                case 6:
                    _a.sent();
                    return [2, data.data];
            }
        });
    });
}
//# sourceMappingURL=tsc.js.map