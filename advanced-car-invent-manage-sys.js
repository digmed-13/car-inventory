const carList = [];
let addCar;


// used your tutorial video for help
// processes form and all of it's inputs
function processForm() {

    // capture value of each input box and store them in variables
    const color = document.querySelector("#color").value;
    const name = document.querySelector("#name").value;
    const model = document.querySelector("#model").value;
    const year = document.querySelector("#year").value;
    const price = document.querySelector("#price").value;
    const quantity = document.querySelector("#quantity").value;
    const url = document.querySelector("#url").value;

    // name necessary properties for car object and list their associated variables (from above) as their values
    addCar = {
        color: color,
        name: name,
        model: model,
        year: parseInt(year),
        price: parseInt(price),
        quantity: parseInt(quantity),
        url: url
    };

    // each time 'Submit' is clicked, a new addCar object is added to the carList array
    carList.push(addCar);
    listCars();
    console.log(carList);
}

let submit = document.querySelector("#submit").addEventListener("click", processForm, true);
let list = document.querySelector("#list");;
let listItem;
let br;
let carImg;


// displays list of cars dynamically on page
function listCars() {
    listItem = document.createElement("li");
    listItem.setAttribute("class", "list-items");
    br = document.createElement("br");
    carImg = document.createElement("img");
    carImg.src = addCar.url;

    // write template to page and fill in with the asociated values from each addCar object
    listItem.innerHTML = addCar.color + " " + addCar.name + " " + addCar.model + " " + addCar.year + " $" + addCar.price + ' (' + addCar.quantity + ')';

    list.appendChild(listItem);
    listItem.appendChild(br);
    listItem.appendChild(carImg);
    listItem.insertAdjacentElement("afterend", listItem);
}

let holder = document.querySelector("#total-price");


// calculates and displays total price of cars when 'Show Total Price' button is clicked
function showTotalPrice() {
    let sum = 0;

    /* loops through each car object in array; if the quantity of a car entry is 1, simply add price to sum variable;
       if quantity is more than 1, multiply quantity by price of that car */
    for (let i = 0; i < carList.length; i++) {
        if (carList[i].quantity > 1) {
            sum = carList[i].price * carList[i].quantity;
        }
        else {
            sum += carList[i].price;
        }
        holder.innerHTML = sum;
    }

    findHighestPrice();
    findLowestPrice();
}

let total = document.querySelector("#total").addEventListener("click", showTotalPrice, true);
let priceCaption1;


// identifies car with highest price and displays it when 'Show Total Price' button is clicked
function findHighestPrice() {
    priceCaption1 = document.createElement("div");
    priceCaption1.setAttribute("id", "highest");
    holder.appendChild(priceCaption1);

    // to start, this function assigns index[0]'s price as the highest
    let highestPrice = carList[0].price;

    // start iterating through array at index[1]; if the next price is greater than highestPrice, it's value replaces it
    for (let i = 1; i < carList.length; i++) {
        if (carList[i].price > highestPrice) {
            highestPrice = carList[i].price;
        }
    }

    // finds object with highest price and displays it on page
    for (let i = 0; i < carList.length; i++) {
        if (carList[i].price == highestPrice) {
            priceCaption1.textContent = "Car w/ Highest Price: " + carList[i].color + " " + carList[i].name + " " + carList[i].model + " " + carList[i].year + " $" + carList[i].price + ' (' + carList[i].quantity + ')';
            br = document.createElement("br");
            carImg = document.createElement("img");
            carImg.src = carList[i].url;

            priceCaption1.appendChild(br);
            priceCaption1.appendChild(carImg);
        }
    }

    console.log(highestPrice);
}


// identifies car with lowest price and displays it when 'Show Total Price' button is clicked
function findLowestPrice() {
    let priceCaption2 = document.createElement("div");
    priceCaption2.setAttribute("id", "lowest");
    priceCaption1.insertAdjacentElement("afterend", priceCaption2);

    // to start, this function assigns index[0]'s price as the lowest
    let lowestPrice = carList[0].price;

    // start iterating through array at index[1]; if the next price is less than lowestPrice, it's value replaces it
    for (let i = 1; i < carList.length; i++) {
        if (carList[i].price < lowestPrice) {
            lowestPrice = carList[i].price;
        }
    }

    // finds object with lowest price and displays it on page
    for (let i = 0; i < carList.length; i++) {
        if (carList[i].price == lowestPrice) {
            priceCaption2.textContent = "Car w/ Lowest Price: " + carList[i].color + " " + carList[i].name + " " + carList[i].model + " " + carList[i].year + " $" + carList[i].price + ' (' + carList[i].quantity + ')';
            br = document.createElement("br");
            carImg = document.createElement("img");
            carImg.src = carList[i].url;

            priceCaption2.appendChild(br);
            priceCaption2.appendChild(carImg);
        }
    }

    console.log(lowestPrice);
}


// removes old list and displays new sorted list
function sortCars() {

    // used help from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // uses sort() method and arrow function to sort objects in ascending order
    carList.sort((a, b) => a.price - b.price);
    console.log(carList);

    // used help from https://www.w3schools.com/jsref/met_node_removechild.asp
    // removes old list of objects that wasn't sorted
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    // displays sorted list of objects
    for (i = 0; i < carList.length; i++) {
        listItem = document.createElement("li");
        listItem.setAttribute("class", "new-list");
        br = document.createElement("br");
        carImg = document.createElement("img");
        carImg.src = carList[i].url;
        listItem.innerHTML = carList[i].color + " " + carList[i].name + " " + carList[i].model + " " + carList[i].year + " $" + carList[i].price + ' (' + carList[i].quantity + ')';

        list.appendChild(listItem);
        listItem.appendChild(br);
        listItem.appendChild(carImg);
        listItem.insertAdjacentElement("afterend", listItem);
    }
}

let ascending = document.querySelector("#sort").addEventListener("click", sortCars);
let holder2;


// calculates and displays average price of car objects in array
function showAvgPrice() {

    // used help from https://www.slingacademy.com/article/javascript-ways-to-find-the-mean-average-of-an-array/
    let sum = 0;

    // totals car prices
    for (let i = 0; i < carList.length; i++) {
        sum += carList[i].price;
    }

    // divides sum by length of array to get average price
    let avgPrice = sum / carList.length;
    console.log(avgPrice);

    holder2 = document.querySelector("#avg-price");
    holder2.innerHTML = avgPrice;
}

let average = document.querySelector("#average").addEventListener("click", showAvgPrice);
let newList = document.querySelector("#new-list");
const hidden = [];


// shows only black cars when box is checked
function filterBlack(checkbox) {
    if (checkbox.checked) {
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        for (let i = 0; i < carList.length; i++) {
            if (carList[i].color == "Black") {
                listItem = document.createElement("li");
                listItem.setAttribute("class", "list-items");
                br = document.createElement("br");
                carImg = document.createElement("img");
                carImg.src = carList[i].url;
                listItem.innerHTML = carList[i].color + " " + carList[i].name + " " + carList[i].model + " " + carList[i].year + " $" + carList[i].price + ' (' + carList[i].quantity + ')';

                newList.appendChild(listItem);
                listItem.appendChild(br);
                listItem.appendChild(carImg);
                listItem.insertAdjacentElement("afterend", listItem);
            }
            else {
                hidden.push(carList[i]);
            }
        }
        console.log(hidden);
        console.log(carList);
    }
}


// shows only white cars when box is checked
function filterWhite(checkbox) {
    if (checkbox.checked) {
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        for (let i = 0; i < carList.length; i++) {
            if (carList[i].color == "White") {
                listItem = document.createElement("li");
                listItem.setAttribute("class", "list-items");
                br = document.createElement("br");
                carImg = document.createElement("img");
                carImg.src = carList[i].url;
                listItem.innerHTML = carList[i].color + " " + carList[i].name + " " + carList[i].model + " " + carList[i].year + " $" + carList[i].price + ' (' + carList[i].quantity + ')';

                newList.appendChild(listItem);
                listItem.appendChild(br);
                listItem.appendChild(carImg);
                listItem.insertAdjacentElement("afterend", listItem);
            }
            else {
                hidden.push(carList[i]);
            }
        }
        console.log(hidden);
        console.log(carList);
    }
}


// shows only gray/silver cars when box is checked
function filterGS(checkbox) {
    if (checkbox.checked) {
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        for (let i = 0; i < carList.length; i++) {
            if (carList[i].color == "Gray/Silver") {
                listItem = document.createElement("li");
                listItem.setAttribute("class", "list-items");
                br = document.createElement("br");
                carImg = document.createElement("img");
                carImg.src = carList[i].url;
                listItem.innerHTML = carList[i].color + " " + carList[i].name + " " + carList[i].model + " " + carList[i].year + " $" + carList[i].price + ' (' + carList[i].quantity + ')';

                newList.appendChild(listItem);
                listItem.appendChild(br);
                listItem.appendChild(carImg);
                listItem.insertAdjacentElement("afterend", listItem);
            }
            else {
                hidden.push(carList[i]);
            }
        }
        console.log(hidden);
        console.log(carList);
    }
}