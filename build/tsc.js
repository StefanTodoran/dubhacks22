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
        var testList = [
            { name: "Broccoli", group: "vegetable", fridge: 5, pantry: 2 },
            { name: "Milk", group: "dairy", fridge: 7 },
            { name: "Bread", group: "grains", pantry: 4, fridge: 14 },
            { name: "Minced Beef", group: "meat", fridge: 2, freezer: 5 },
            { name: "Jam", on_open: 365 },
            { name: "Pancake Mix", group: "grains", pantry: 12 },
            { name: "Carrots", group: "vegetable", fridge: 21, pantry: 7 },
            { name: "Margarine", on_open: 90 },
            { name: "Apples", group: "fruit", pantry: 12, fridge: 24 },
        ];
        var scan_btn = document.getElementById('scan-btn');
        scan_btn.addEventListener('click', function () {
            scan_btn.classList.add('hidden');
            displayItems(testList);
        });
        setupCamera();
    }
    function displayItems(items) {
        var container = document.getElementById('visualizer');
        var template = document.getElementById('template');
        container.classList.add('active');
        container.innerHTML = "";
        container.appendChild(template);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var node = template.cloneNode(true);
            node.classList.remove('hidden');
            node.querySelector('h2').textContent = nbsp(item.name);
            if (item.group) {
                node.classList.add(item.group);
            }
            addDuration(node, "pantry", item.pantry);
            addDuration(node, "fridge", item.fridge);
            addDuration(node, "freezer", item.freezer);
            addDuration(node, "on_open", item.on_open);
            container.insertBefore(node, template.nextSibling);
        }
    }
    function addDuration(node, type, duration) {
        var indicator = node.querySelector("." + type);
        if (duration) {
            var length_1 = (Math.pow(duration, 0.5)).toString();
            indicator.style.setProperty('--length', length_1);
            var display_duration = nbsp('"' + duration.toString() + ' days"');
            indicator.style.setProperty('--days', display_duration);
        }
        else {
            indicator.classList.add('hidden');
        }
    }
    function nbsp(string) {
        return string.replace(/ /g, '\u00a0');
    }
})();
var food_items = [];
fetch('data/foodkeeper.json', { mode: 'no-cors' })
    .then(function (response) { return response.json(); })
    .then(function (food_data) { return process_food_data(JSON.parse(JSON.stringify(food_data))); });
function get_days(max_time, metric) {
    console.log(metric);
    console.log("Type: ".concat(typeof metric));
    console.log(String(metric));
    console.log("Type: ".concat(typeof String(metric)));
    console.log(JSON.stringify(metric));
    console.log("Type: ".concat(typeof JSON.stringify(metric)));
    console.log(JSON.stringify(metric));
    if (String(metric) == "Days") {
        console.log("yes1");
        return max_time;
    }
    else if (JSON.stringify(metric) == "Weeks") {
        console.log("yes2");
        return max_time * 7;
    }
    else if (String(metric) == "Months") {
        console.log("yes3");
        return max_time * 30;
    }
    else if (String(metric) == "Years") {
        console.log("yes4");
        return max_time * 365;
    }
    else {
        console.log("this should never be called!");
    }
}
function process_food_data(food_data) {
    var testList = [
        { name: "Carrots", group: "Vegetable", fridge: 21, pantry: 7 },
        { name: "Broccoli", group: "Vegetable", fridge: 5, pantry: 2 },
        { name: "Milk", group: "Dairy", fridge: 7 },
        { name: "Bread", group: "Grains", pantry: 4, fridge: 14 },
        { name: "Pancake Mix", group: "Grains", pantry: 12 },
        { name: "Jam", on_open: 365 },
        { name: "Margarine", on_open: 90 },
    ];
    for (var _i = 0, _a = food_data.sheets[2].data; _i < _a.length; _i++) {
        var food_entry = _a[_i];
        var food_item = { name: food_entry.Name };
        console.log(food_entry);
        if (food_entry[6] != null) {
            food_item.pantry = get_days(food_entry[6], food_entry[7]);
        }
        else if (food_entry[10] != null) {
            food_item.pantry = get_days(food_entry[10], food_entry[11]);
        }
        else if (food_entry[17] != null) {
            food_item.fridge = get_days(food_entry[17], food_entry[18]);
        }
        else if (food_entry[21] != null) {
            food_item.fridge = get_days(food_entry[21], food_entry[22]);
        }
        else if (food_entry[31] != null) {
            food_item.freezer = get_days(food_entry[31], food_entry[32]);
        }
        else if (food_entry[35] != null) {
            food_item.freezer = get_days(food_entry[35], food_entry[36]);
        }
        else {
            console.log("this should never print!");
            continue;
        }
        food_items.push(food_item);
    }
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
                            tessedit_pageseg_mode: Tesseract.PSM.SINGLE_COLUMN,
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