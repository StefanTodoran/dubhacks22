'use strict';
(function () {

  window.addEventListener('load', init);

  /**
   * Initialization function that should handle anything that needs to occur
   * on page load (include changing from one page to another).
   */
  function init() {
    // interface Options {
    //   root: any;
    //   rootMargin: string;
    //   threshold: number;
    // }

    // let options:Options = {
    //   root: null,
    //   rootMargin: '0px',
    //   threshold: 0.4
    // };

    // const observer = new IntersectionObserver((entries) => {
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       entry.target.classList.add('shown');
    //     }
    //   })
    // }, options);

    // const dynamic_elements = document.querySelectorAll('.dynamic-item');
    // dynamic_elements.forEach((element) => observer.observe(element));

    const testList:FoodItem[] = [
      {name: "Carrots", group: "Vegetable", fridge: 21, pantry: 7},
      {name: "Broccoli", group: "Vegetable", fridge: 5, pantry: 2},
      {name: "Milk", group: "Dairy", fridge: 7},
      {name: "Bread", group: "Grains", pantry: 4, fridge: 14},
      {name: "Pancake Mix", group: "Grains", pantry: 12},
      {name: "Jam", on_open: 365},
      {name: "Margarine", on_open: 90},
    ];

    const scan_btn = document.getElementById('scan-btn');
    scan_btn.addEventListener('click', () => {
      displayItems(testList);
      scan_btn.classList.add('hidden');
    });

    setupCamera();
  }

  interface FoodItem {
    name: string,
    
    // until expiration in days, provide at least 1
    pantry?: number,
    fridge?: number,
    freezer?: number,
    on_open?: number,
    
    group?: string, // food type 
    tip?: string,
  }

  function displayItems(items: FoodItem[]) {
    const container = document.getElementById('visualizer');
    container.classList.add('active');

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      console.log(item);
    }
  }
})();
