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
      {name: "Carrots", group: "vegetable", fridge: 21, pantry: 7},
      {name: "Minced Beef", group: "meat", fridge: 2, freezer: 5},
      {name: "Broccoli", group: "vegetable", fridge: 5, pantry: 2},
      {name: "Milk", group: "dairy", fridge: 7},
      {name: "Bread", group: "grains", pantry: 4, fridge: 14},
      {name: "Jam", on_open: 365},
      {name: "Pancake Mix", group: "grains", pantry: 12},
      {name: "Margarine", on_open: 90},
      {name: "Apples", group: "fruit", pantry: 12, fridge: 24},
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
    const template = document.getElementById('template');
    container.classList.add('active');

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // @ts-ignore
      const node:HTMLElement = template.cloneNode(true);

      node.classList.remove('hidden');
      node.querySelector('h2').textContent = item.name;
      if (item.group) {
        node.classList.add(item.group);
      }

      addDuration(node, "pantry", item.pantry);
      addDuration(node, "fridge", item.fridge);
      addDuration(node, "freezer", item.freezer);
      addDuration(node, "on_open", item.on_open);

      // insert after template
      container.insertBefore(node, template.nextSibling);
    }
  }

  function addDuration(node: HTMLElement, type: string, duration: number) {
    console.log(node, type, duration);
    const indicator:HTMLElement = node.querySelector("." + type);
    if (duration) {
      indicator.style.setProperty('--days', duration.toString());
      indicator.style.setProperty('--time', duration.toString() + " days");
    } else {
      indicator.classList.add('hidden');
    }
  }
})();
