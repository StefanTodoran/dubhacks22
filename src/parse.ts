interface FoodItem {
    name: string,
    
    // until expiration in days, provide at least 1
    pantry?: number,
    fridge?: number,
    freezer?: number,
    on_open?: number,
    
    group?: string, // food type 
    tip?: string,
    no_data?: boolean, // no expiration data
}


var food_items: FoodItem[] = [];

fetch('data/foodkeeper.json', {mode: 'no-cors'})
    .then((response) => response.json())
    .then((food_data) => process_food_data(JSON.parse(JSON.stringify(food_data))));
    //.then((response) => {console.log})

    
function get_days(max_time: number, metric: string) {
    //console.log(metric);
    
    if (JSON.stringify(metric).includes("Days")) {
        return max_time;
    } else if (JSON.stringify(metric).includes("Weeks")) {
        return max_time * 7;
    } else if (JSON.stringify(metric).includes("Months")) {
        return max_time * 30;
    } else if (JSON.stringify(metric).includes("Years")) {
        return max_time * 365;
    } else if (JSON.stringify(metric).includes("Hours")) {
        return 1; // someone will know if the food is bad if it only lasts hours
    } else {
        console.log("this should never be called!");
    }
}

function process_food_data(food_data: any) {
    for (let food_entry of food_data.sheets[2].data) {
        // find expiration by iterating through storage types for 1st non-null
        let name_with_2_extra = JSON.stringify(food_entry[2]).replace(`"Name":`, '')
        let name_with_1_extra = name_with_2_extra.replace(`{"`, '')
        let food_item: FoodItem = {name: name_with_1_extra.replace(`"}`, '')};
        //console.log(food_entry);
        console.log(JSON.stringify(food_entry[2]).replace(`"Name":`, ''))

        if (!JSON.stringify(food_entry[6] && food_entry[6]).includes(null)) {
            food_item.pantry = get_days(food_entry[6], food_entry[7]);
        } else if (food_entry[10] && !JSON.stringify(food_entry[10]).includes(null)) {
            food_item.pantry = get_days(food_entry[10], food_entry[11]);
        }
        if (food_entry[17] && !JSON.stringify(food_entry[17]).includes(null)) {
            food_item.fridge = get_days(food_entry[17], food_entry[18]);
        } else if (food_entry[21] && !JSON.stringify(food_entry[21]).includes(null)) {
            food_item.fridge = get_days(food_entry[21], food_entry[22]);
        }
        if (food_entry[31] && !JSON.stringify(food_entry[31]).includes(null)) {
            food_item.freezer = get_days(food_entry[31], food_entry[32]);
        } else if (food_entry[35] && !JSON.stringify(food_entry[35]).includes(null)) {
            food_item.freezer = get_days(food_entry[35], food_entry[36]);
        }
        if (!food_item.pantry && !food_item.fridge && !food_item.freezer) {
            console.log("This item doesn't have storage info")
            continue;
        }         

        food_items.push(food_item);
    }
    console.log(food_items);
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
