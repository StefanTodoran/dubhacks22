const food_names: string[] = ["shrimp", "bagel"];

function query_recipes(food_names: string[]) {
  fetch('https://api.edamam.com/search?q=' + food_names.join('+') + '&app_id=95184d17&app_key=0f50ed3c9420a4de48414fe67d08b4bc')
    .then((response) => response.json())
    .then((response) => process_recipes(response.hits));
}

function process_recipes(recipes: object[]) {
  console.log(recipes);
}

query_recipes(food_names);
