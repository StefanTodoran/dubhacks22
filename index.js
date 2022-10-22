'use strict';
(function () {

  window.addEventListener('load', init);

  /**
   * Initialization function that should handle anything that needs to occur
   * on page load (include changing from one page to another).
   */
  function init() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('shown');
        }
      })
    }, options);

    const dynamic_elements = document.querySelectorAll('.dynamic-item');
    dynamic_elements.forEach((element) => observer.observe(element));


    // input:
    // food item -> mapped to expiration date

    // output:
    // visualize that data
  }
})();