'use strict';
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
    var imageInp = document.getElementById('camera-inp');
    var textbox = document.getElementById('textbox');
    var textboxLogger = function (status) {
        textbox.innerText = "Loading... " + status.status + "   " + status.progress;
    };
    imageInp.addEventListener('change', function (event) { return __awaiter(_this, void 0, void 0, function () {
        var files, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = event.target.files;
                    if (!(files.length > 0)) return [3, 2];
                    textbox.innerText = 'Loading...';
                    return [4, parseReceipt(files[0], textboxLogger)];
                case 1:
                    data = _a.sent();
                    textbox.innerText = data.text;
                    _a.label = 2;
                case 2: return [2];
            }
        });
    }); });
}
(function () {
    window.addEventListener('load', init);
    function init() {
        var examples = [
            { name: "Apples", group: "fruit", pantry: 12, fridge: 24 },
            { name: "Carrots", group: "vegetable", fridge: 21, pantry: 7 },
            { name: "Margarine", fridge: 124, on_open_fridge: 62 },
            { name: "Minced Beef", group: "meat", fridge: 2, freezer: 5 },
            { name: "Pancake Mix", group: "grains", pantry: 19, on_open_pantry: 12 },
            { name: "Yogurt", group: "dairy", fridge: 7, freezer: 31, on_open_fridge: 3 },
            { name: "Broccoli", group: "vegetable", fridge: 5, pantry: 2 },
            { name: "Jam", on_open_fridge: 365 },
            { name: "Bread", group: "grains", pantry: 4, fridge: 22, on_open_fridge: 15 },
            { name: "Milk", group: "dairy", fridge: 7 },
        ];
        var scan_btn = document.getElementById('scan-btn');
        scan_btn.addEventListener('click', function () { });
        displayItems(examples);
        setupCamera();
        var container = document.getElementById('visualizer');
        var template = document.getElementById('template');
        var text = document.createElement('h2');
        text.innerText = "Example Data Visualization:";
        text.style.textAlign = "center";
        container.insertBefore(text, template);
    }
    function displayRecipes(items) {
        console.log("Not Yet Implemented!");
    }
    function displayItems(items) {
        var container = document.getElementById('visualizer');
        var template = document.getElementById('template');
        container.innerHTML = "";
        container.appendChild(template);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            console.log("========================\n\n\n", item.name, item);
            var node = template.cloneNode(true);
            node.classList.remove('hidden');
            node.querySelector('h2').textContent = nbsp(item.name);
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
    }
    function addDuration(node, type, duration) {
        var indicator = node.querySelector("." + type);
        if (duration) {
            var length_1 = (Math.pow(duration, 0.5)).toString();
            indicator.style.setProperty('--length', length_1);
            var display_duration = nbsp('"' + duration.toString() + ' days"');
            indicator.style.setProperty('--days', display_duration);
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
})();
var keywords_to_food_items = [];
fetch('data/foodkeeper.json', { mode: 'no-cors' })
    .then(function (response) { return response.json(); })
    .then(function (food_data) { return process_food_data(JSON.parse(JSON.stringify(food_data))); });
function get_days(max_time, metric) {
    if (JSON.stringify(metric).includes("Days")) {
        return max_time;
    }
    else if (JSON.stringify(metric).includes("Weeks")) {
        return max_time * 7;
    }
    else if (JSON.stringify(metric).includes("Months")) {
        return max_time * 30;
    }
    else if (JSON.stringify(metric).includes("Years")) {
        return max_time * 365;
    }
    else if (JSON.stringify(metric).includes("Hours")) {
        return 1;
    }
    else {
        console.log("this should never be called!");
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
function process_food_data(food_data) {
    for (var _i = 0, _a = food_data.sheets[2].data; _i < _a.length; _i++) {
        var food_entry = _a[_i];
        var food_name = food_entry[2]["Name"];
        var food_item = { name: food_name };
        var food_category = get_category(food_entry[1]);
        if (food_category != "default") {
            food_item.group = food_category;
        }
        if (food_entry[6] && !JSON.stringify(food_entry[6]).includes(null)) {
            food_item.pantry = get_days(food_entry[6]["Pantry_Max"], food_entry[7]);
        }
        else if (food_entry[10] && !JSON.stringify(food_entry[10]).includes(null)) {
            food_item.pantry = get_days(food_entry[10]["DOP_Pantry_Max"], food_entry[11]);
        }
        if (food_entry[17] && !JSON.stringify(food_entry[17]).includes(null)) {
            food_item.fridge = get_days(food_entry[17]["Refrigerate_Max"], food_entry[18]);
        }
        else if (food_entry[21] && !JSON.stringify(food_entry[21]).includes(null)) {
            food_item.fridge = get_days(food_entry[21]["DOP_Refrigerate_Max"], food_entry[22]);
        }
        if (food_entry[31] && !JSON.stringify(food_entry[31]).includes(null)) {
            food_item.freezer = get_days(food_entry[31]["Freeze_Max"], food_entry[32]);
        }
        else if (food_entry[35] && !JSON.stringify(food_entry[35]).includes(null)) {
            food_item.freezer = get_days(food_entry[35]["DOP_Freeze_Max"], food_entry[36]);
        }
        if (!food_item.pantry && !food_item.fridge && !food_item.freezer) {
            console.log("This item doesn't have storage info");
            continue;
        }
        var keywords_string = food_entry[4]["Keywords"];
        if (!keywords_string || keywords_string == '') {
            keywords_to_food_items.push([[food_name], food_item]);
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
    console.log(search("white rice"));
}
var INSERTION_COST = 1;
var DELETION_COST = 10;
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
function search(receipt_name) {
    var min_cost = Number.MAX_SAFE_INTEGER;
    var closest_food_item = null;
    var closest_keywords = null;
    var receipt_words = receipt_name.toLowerCase().split(' ');
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
        if (curr_avg_cost < min_cost) {
            closest_food_item = food_item;
            min_cost = curr_avg_cost;
            closest_keywords = keywords;
        }
    }
    console.log(closest_keywords);
    for (var _d = 0, receipt_words_2 = receipt_words; _d < receipt_words_2.length; _d++) {
        var receipt_word = receipt_words_2[_d];
        var keyword_min_cost = Number.MAX_SAFE_INTEGER;
        var min_keyword = null;
        for (var _e = 0, closest_keywords_1 = closest_keywords; _e < closest_keywords_1.length; _e++) {
            var keyword = closest_keywords_1[_e];
            var cost = reconstruction_cost(receipt_word, keyword);
            if (cost < keyword_min_cost) {
                keyword_min_cost = cost;
                min_keyword = keyword;
            }
        }
        console.log(receipt_word + ": " + min_keyword);
    }
    return closest_food_item;
}
function parseReceipt(img_element, logger) {
    return __awaiter(this, void 0, void 0, function () {
        var worker, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    worker = Tesseract.createWorker({
                        logger: logger
                    });
                    return [4, worker.load()];
                case 1:
                    _a.sent();
                    return [4, worker.loadLanguage('eng')];
                case 2:
                    _a.sent();
                    return [4, worker.initialize('eng')];
                case 3:
                    _a.sent();
                    return [4, worker.setParameters({
                            tessedit_char_whitelist: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "
                        })];
                case 4:
                    _a.sent();
                    return [4, worker.recognize(img_element)];
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