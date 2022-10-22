'use strict';
(function () {
    window.addEventListener('load', init);
    function init() {
        var options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.4
        };
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('shown');
                }
            });
        }, options);
        var dynamic_elements = document.querySelectorAll('.dynamic-item');
        dynamic_elements.forEach(function (element) { return observer.observe(element); });
        console.log("test");
    }
})();
//# sourceMappingURL=tsc.js.map