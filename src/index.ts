window.addEventListener('load', init);

/**
 * Initialization function that should handle anything that needs to occur
 * on page load (include changing from one page to another).
 */
function init() {

  const examples: FoodItem[] = [
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

  displayItems(examples);
  setupCamera();

    const container = document.getElementById('visualizer');
    const template = document.getElementById('template');
    const text = document.createElement('h2');
    text.innerText = "Example Data Visualization:";
    text.style.textAlign = "center";
    container.insertBefore(text, template);
  }

  interface RecipeItem {
    title: string,
    utilized: FoodItem[], // specific food items user used in this recipe
    categories: string[], // food categories present in this recipe
    time: number, // time to make in hours
    url: string, // link to the recipe
  }

function displayRecipes(items: RecipeItem[]) {
  console.log("Not Yet Implemented!");
}

interface FoodItem {
  name: string,
  raw: string, // raw text from receipt

  // until expiration in days, provide at least 1
  pantry?: number,
  on_open_pantry?: number,
  fridge?: number,
  on_open_fridge?: number,
  freezer?: number,

  group?: string, // fruit, vegetable, dairy, grains, or meat
  tip?: string,
}

/**
 * Takes a list of FoodItems and displays them in the visualizer with appropraite icons
 * as a bar graph of the duration that they keep in various environments. Clears the visualizer.
 * @param items The list of food items
 */
function displayItems(items: FoodItem[]) {
  const container = document.getElementById('visualizer');
  const template = document.getElementById('template');

  
  // clear the container except the template child
  container.innerHTML = "";
  container.appendChild(template);
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    // @ts-ignore
    const node: HTMLElement = template.cloneNode(true);

    node.classList.remove('hidden');
    node.id = "";
    node.querySelector('h2').textContent = item.name;
    node.querySelector('h3').textContent = '(' + item.raw + ')';
    if (item.group) {
      node.classList.add(item.group);
    }

    let has_double = false;

    addDuration(node, "pantry", item.pantry);
    has_double = addDuration(node, "on_open_pantry", item.on_open_pantry);
    addDuration(node, "fridge", item.fridge);
    has_double = addDuration(node, "on_open_fridge", item.on_open_fridge) || has_double;
    addDuration(node, "freezer", item.freezer);

    if (has_double) {
      node.querySelector('.food-duration-container').classList.add('double-len');
    }

    // insert after template
    container.insertBefore(node, template);
  }
}

/**
 * Sets up a food-duration bar inside a food-item, or if the food duration is unset,
 * hides the corresponding div. Returns true if the duration was set and the bar is visible.
 * @param node A food-item div, a clone of the foot-item template
 * @param type A duration type, one of the four options in the FoodItem interface 
 * @param duration The actual value stored for that duration in the FoodItem object, can be null
 * @returns A boolean that is true if the duration bar is visible and false otherwise
 */
function addDuration(node: HTMLElement, type: string, duration: number) {
  const indicator: HTMLElement = node.querySelector("." + type); //.food-duration.{some type}
  if (duration) {
    const length = (duration ** 0.5).toString();
    indicator.style.setProperty('--length', length);
    const raw_text = (duration > 1) ? duration.toString() + ' days' : duration.toString() + ' day';
    const display_duration = nbsp(quoted(raw_text));
    indicator.style.setProperty('--days', display_duration);

    if (duration < 7) {
      indicator.classList.add('short-duration');
    } 

    return true;
  } else {
    node.querySelector('.food-duration-container').removeChild(indicator);
    return false;
  }
}

// Replaces spaces with non breaking spaces.
function nbsp(string: string) {
  return string.replace(/ /g, '\u00a0');
}

function quoted(string: string) {
  return '"' + string + '"';
}