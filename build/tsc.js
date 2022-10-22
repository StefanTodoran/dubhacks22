'use strict';
(function () {
    window.addEventListener('load', init);
    function init() {
        var testList = [
            { name: "Carrots", group: "Vegetable", fridge: 21, pantry: 7 },
            { name: "Broccoli", group: "Vegetable", fridge: 5, pantry: 2 },
            { name: "Milk", group: "Dairy", fridge: 7 },
            { name: "Bread", group: "Grains", pantry: 4, fridge: 14 },
            { name: "Pancake Mix", group: "Grains", pantry: 12 },
            { name: "Jam", on_open: 365 },
            { name: "Margarine", on_open: 90 },
        ];
        displayItems(testList);
    }
    function displayItems(items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            console.log(item);
        }
    }
})();
//# sourceMappingURL=tsc.js.map