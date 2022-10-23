const RECEIPT : string = `Wal ke
almart - <.
Save money. Live better.
(813) 932-0562
Manaser COLLEEN BRICKEY
8885 N FLORIDA AVE
TAMPA FL 33604
ST# 5221 OP# 00001061 TE# 06 TR# 05332
BREAD 007225003712 F 2.88 N
BREAD 007225003712 F 2.88 N
GV PNT BUTTR 007874237003 F 3.84 N
GV PNT BUTTR 007874237003 F 3.84 N
GV PNT BUTTR 007874237003 F 3.84 N
GV PNT BUTTR 007874237003 F 3.84 N
GV PARM 160Z 007874201510 F 4.98 0
GV CHNK CHKN 007874206784 F 1.98 N
GV CHNK CHKN 007874206784 F 1.98 N
12 CT NITRIL 073191913822 2.78 X
FOLGERS 002550000377 F 10.48 N
SC TWIST UP 007874222682 F 0.84 X
EGGS 060638871459 F 1.88 0
SUBTOTAL 46.04
TAX 1 7.000 % 0.26
TOTAL 46.30
DEBIT TEND 46.30
CHANGE DUE 0.00
EFT DEBIT PAY FROM PRIMARY
ACCOUNT : 5259
46.30 TOTAL PURCHASE
PAYMENT DECLINED DEBIT NOT AVAILABLE
11/06/11 02:21:54
EFT DEBIT PAY FROM PRIMARY
ACCOUNT : 5269
46.30 TOTAL PURCHASE
REF # 131000195280
NETWORK ID. 0071 APPR CODE 297664
11/06/11 02:22:54
S
Lavaway is back for Electronics,
Toys, and Jewelry. 10/17/11-12/16/11
11/06/11 02:22:59`

var keywords_to_food_items: any[] = [];

var final_food_items: FoodItem[] = [];

fetch('data/foodkeeper.json', {mode: 'no-cors'})
  .then((response) => response.json())
  .then((food_data) => process_food_data(JSON.parse(JSON.stringify(food_data))));
  //.then((response) => {console.log})

function get_days(max_time: number, metric: string) {
  //console.log(metric);
  
  if (JSON.stringify(metric).includes("Day")) {
    return max_time;
  } else if (JSON.stringify(metric).includes("Week")) {
    return max_time * 7;
  } else if (JSON.stringify(metric).includes("Month")) {
    return max_time * 30;
  } else if (JSON.stringify(metric).includes("Year")) {
    return max_time * 365;
  } else if (JSON.stringify(metric).includes("Hour")) {
    return 1; // someone will know if the food is bad if it only lasts hours
  } else {
    console.log(metric)
    console.log("this should never be called!");
  }
}

function get_category(category_id_object: any) {
  let category_id = category_id_object["Category_ID"];

  if ((category_id >= 10 && category_id <= 17) || (category_id >= 20 && category_id <= 22)) {
    return "meat"
  } else if (category_id == 19 || category_id == 24) {
    return "vegetable"
  } else if (category_id == 19) {
    return "fruit"
  } else if ((category_id >= 2 && category_id <= 4) || category_id == 9) {
    return "grains"
  } else if (category_id == 7) {
    return "dairy"
  } else {
    return "default"
  }
}

function process_food_data(food_data: any) {
  // let food = JSON.parse(JSON.stringify(food_entry))
  // console.log("-------------------")
  // console.log(JSON.stringify(food.Pantry_Max))
  // console.log("-------------------")

  for (let food_entry of food_data.sheets[2].data) {
    // find expiration by iterating through storage types for 1st non-null
    let food_name: string = food_entry[2]["Name"];
    let food_item: FoodItem = {name: food_name};

    let food_category: string = get_category(food_entry[1]);
    if (food_category != "default") {
      food_item.group = food_category;
    }

    if (food_entry[6] && !JSON.stringify(food_entry[6]).includes(null)) {
      food_item.pantry = get_days(food_entry[6]["Pantry_Max"], food_entry[7]);
    } else if (food_entry[10] && !JSON.stringify(food_entry[10]).includes(null)) {
      food_item.pantry = get_days(food_entry[10]["DOP_Pantry_Max"], food_entry[11]);
    }
    if (food_entry[14] && !JSON.stringify(food_entry[14]).includes(null)) {
      food_item.on_open_pantry = get_days(food_entry[14]["Pantry_After_Opening_Max"], food_entry[15]);
    }
    if (food_entry[17] && !JSON.stringify(food_entry[17]).includes(null)) {
      food_item.fridge = get_days(food_entry[17]["Refrigerate_Max"], food_entry[18]);
    } else if (food_entry[21] && !JSON.stringify(food_entry[21]).includes(null)) {
      food_item.fridge = get_days(food_entry[21]["DOP_Refrigerate_Max"], food_entry[22]);
    }
    if (food_entry[25] && !JSON.stringify(food_entry[25]).includes(null)) {
      food_item.on_open_fridge = get_days(food_entry[25]["Refrigerate_After_Opening_Max"], food_entry[26]);
    }
    if (food_entry[31] && !JSON.stringify(food_entry[31]).includes(null)) {
      food_item.freezer = get_days(food_entry[31]["Freeze_Max"], food_entry[32]);
    } else if (food_entry[35] && !JSON.stringify(food_entry[35]).includes(null)) {
      food_item.freezer = get_days(food_entry[35]["DOP_Freeze_Max"], food_entry[36]);
    }
    if (!food_item.pantry && !food_item.fridge && !food_item.freezer &&
        !food_item.on_open_pantry && !food_item.on_open_fridge) {
      console.log("This item doesn't have storage info")
      continue;
    }    

    let keywords_string: string = food_entry[4]["Keywords"];
    if (!keywords_string || keywords_string == '') {
      // if there are no keywords, use the food item name as a keyword
      keywords_to_food_items.push([[food_name], food_item]);
    } else {
      keywords_string = keywords_string.split(' ').join('');
      let keywords = keywords_string.split(',');
      let filtered_keywords = [];
      for (let keyword of keywords) {
        if (keyword !== '') {
          filtered_keywords.push(keyword.toLowerCase());
        }
      }
      keywords_to_food_items.push([filtered_keywords, food_item]);
    }
  }

  process_receipt(RECEIPT)
  //console.log(search("white rice"));
}

var INSERTION_COST = 1;
var DELETION_COST = 10;

function reconstruction_cost(receipt_name: string, keyword: string) {
  let dp: number[][] = [];
  for (let i = 0; i < receipt_name.length + 1; i++) {
    dp.push(new Array(keyword.length + 1).fill(0));
  }
  for (let i = 0; i < receipt_name.length + 1; i++) {
    for (let j = 0; j < keyword.length + 1; j++) {
      if (i == 0) {
        dp[i][j] = INSERTION_COST * j;
      } else if (j == 0) {
        dp[i][j] = DELETION_COST * i;
      } else if (receipt_name.charAt(i - 1) == keyword.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          INSERTION_COST + dp[i][j - 1],
          DELETION_COST + dp[i - 1][j],
          INSERTION_COST + DELETION_COST + dp[i - 1][j - 1]
        );
      }
    }
  }
  return dp[receipt_name.length][keyword.length];  
}

function search(receipt_name: string) {
  let min_cost = Number.MAX_SAFE_INTEGER;
  let closest_food_item = null;
  let closest_keywords = null;  // for logging
  let receipt_words = receipt_name.toLowerCase().split(' ');
  let receipt_word_count = receipt_words.length;
  for (let [keywords, food_item] of keywords_to_food_items) {
    let total_over_words = 0;
    for (let receipt_word of receipt_words) {
      let keyword_min_cost = Number.MAX_SAFE_INTEGER;
      for (let keyword of keywords) {
        let cost = reconstruction_cost(receipt_word, keyword);
        if (cost < keyword_min_cost) {
          keyword_min_cost = cost;
        }
      }
      total_over_words += keyword_min_cost;
    }
    let curr_avg_cost = total_over_words / receipt_word_count;
    if (curr_avg_cost < min_cost) {
      closest_food_item = food_item; 
      min_cost = curr_avg_cost;
      closest_keywords = keywords;  // for logging
    }
  }

  // logging stuff
  console.log(closest_keywords);
  for (let receipt_word of receipt_words) {
    let keyword_min_cost = Number.MAX_SAFE_INTEGER;
    let min_keyword = null;
    for (let keyword of closest_keywords) {
      let cost = reconstruction_cost(receipt_word, keyword);
      if (cost < keyword_min_cost) {
        keyword_min_cost = cost;
        min_keyword = keyword;
      }
    }
    console.log(receipt_word + ": " + min_keyword);
  }

  return closest_food_item;
}

function is_letter(char : string) {
  return char.toLowerCase() != char.toUpperCase();
}

function process_receipt(receipt: string) {
  let receipt_lines = receipt.split('\n');
  console.log(receipt_lines);

  let receipt_names: string[] = [];
  for (let receipt_line of receipt_lines) {
    let receipt_name = "";
    for (let i = 0; i < receipt_line.length; i++) {
      let c = receipt_line.charAt(i);
      if (!is_letter(c) && c != ' ') {
        break;
      }
      receipt_name += c;
    }
    if (receipt_name != receipt_line) {
      if (receipt_name.charAt(receipt_name.length - 1) == ' ') {
        receipt_name = receipt_name.slice(0, -1);
      }
      receipt_names.push(receipt_name);
    }
  }

  for (let receipt_name of receipt_names) {
    final_food_items.push(search(receipt_name));
  }
  displayItems(final_food_items);
}

//  0. "ID"
//  1. "Category_ID"
//  2. "Name"
//  3. "Name_subtitle"
//  4. "Keywords"
//  5. "Pantry_Min"
//  6. "Pantry_Max"
//  7. "Pantry_Metric"
//  8. "Pantry_tips"
//  9. "DOP_Pantry_Min"
// 10. "DOP_Pantry_Max"
// 11. "DOP_Pantry_Metric"
// 12. "DOP_Pantry_tips"
// 13. "Pantry_After_Opening_Min"
// 14. "Pantry_After_Opening_Max"
// 15. "Pantry_After_Opening_Metric"
// 16. "Refrigerate_Min"
// 17. "Refrigerate_Max"
// 18. "Refrigerate_Metric"
// 19. "Refrigerate_tips"
// 20. "DOP_Refrigerate_Min"
// 21. "DOP_Refrigerate_Max"
// 22. "DOP_Refrigerate_Metric"
// 23. "DOP_Refrigerate_tips"
// 24. "Refrigerate_After_Opening_Min"
// 25. "Refrigerate_After_Opening_Max"
// 26. "Refrigerate_After_Opening_Metric"
// 27. "Refrigerate_After_Thawing_Min"
// 28. "Refrigerate_After_Thawing_Max"
// 29. "Refrigerate_After_Thawing_Metric"
// 30. "Freeze_Min"
// 31. "Freeze_Max"
// 32. "Freeze_Metric"
// 33. "Freeze_Tips"
// 34. "DOP_Freeze_Min"
// 35. "DOP_Freeze_Max"
// 36. "DOP_Freeze_Metric"
// 37. "DOP_Freeze_Tips"
