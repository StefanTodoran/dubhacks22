'use strict';
(function () {
    window.addEventListener('load', init);
    function init() {
        var testList = [
            { name: "Carrots", group: "vegetable", fridge: 21, pantry: 7 },
            { name: "Minced Beef", group: "meat", fridge: 2, freezer: 5 },
            { name: "Broccoli", group: "vegetable", fridge: 5, pantry: 2 },
            { name: "Milk", group: "dairy", fridge: 7 },
            { name: "Bread", group: "grains", pantry: 4, fridge: 14 },
            { name: "Jam", on_open: 365 },
            { name: "Pancake Mix", group: "grains", pantry: 12 },
            { name: "Margarine", on_open: 90 },
            { name: "Apples", group: "fruit", pantry: 12, fridge: 24 },
        ];
        var scan_btn = document.getElementById('scan-btn');
        scan_btn.addEventListener('click', function () {
            displayItems(testList);
            scan_btn.classList.add('hidden');
        });
    }
    function displayItems(items) {
        var container = document.getElementById('visualizer');
        var template = document.getElementById('template');
        container.classList.add('active');
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var node = template.cloneNode(true);
            node.classList.remove('hidden');
            node.querySelector('h2').textContent = item.name;
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
        console.log(node, type, duration);
        var indicator = node.querySelector("." + type);
        if (duration) {
            indicator.style.setProperty('--days', duration.toString());
            indicator.style.setProperty('--time', duration.toString() + " days");
        }
        else {
            indicator.classList.add('hidden');
        }
    }
})();
//# sourceMappingURL=tsc.js.map