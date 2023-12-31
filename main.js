"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i <= coffees.length - 1; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast && coffee.name.toLowerCase().includes(search.value.toLowerCase())) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === 'all' && coffee.name.toLowerCase().includes(search.value.toLowerCase())) {
            filteredCoffees.push(coffee);
        }
    });
    coffeeDiv.innerHTML = renderCoffees(filteredCoffees);
}

const createCoffee = (e) => {
    let newCoffee = {
        id: coffees.length + 1,
        name: newCoffeeName.value,
        roast: newRoastSelection.value
    }

    coffees.push(newCoffee);
    localStorage.setItem('coffees', JSON.stringify(coffees)); // save the coffees array into localStorage
    updateCoffees(e);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var coffeeDiv = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
let search = document.querySelector("#search");
let newRoastSelection = document.querySelector("#new-roast-selection");
let newCoffeeName = document.querySelector("#add-coffee");

search.addEventListener('keyup', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
submitButton.addEventListener("click", createCoffee);

// Load coffees array from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    let storedCoffees = localStorage.getItem('coffees');
    if (storedCoffees) {
        coffees = JSON.parse(storedCoffees); // convert the string back to array
    }
    coffeeDiv.innerHTML = renderCoffees(coffees);
});