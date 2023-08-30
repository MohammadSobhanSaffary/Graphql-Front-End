"use strict";
const form = document.querySelector(".enter-country-form");
const inputValue = document.querySelector(".inputBox");
const cardContainer = document.querySelector(".card-container");
let data;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const dataObj = Object.fromEntries(data.entries());
    const query = `
      query {
  country(code:"${dataObj.countryCode.toUpperCase()}") {
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}`;
    fetch("https://countries.trevorblades.com/graphql", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            query,
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res.data);
            createCountryCart(res.data);
        })
        .catch((err) => {
            console.error(err);
        });

})

function createCountryCart(data) {
    const div = document.createElement("div");
    div.classList.add("card");

    const title = document.createElement("p");
    title.textContent = "country name : " + data.country.name + "           native : " + data.country.native;
    div.appendChild(title);


    const currency = document.createElement("p");
    currency.textContent = "country currency : " + data.country.currency;
    div.appendChild(currency);

    const capital = document.createElement("p");
    capital.textContent = "capital : " + data.country.capital;
    div.appendChild(capital);

    const languages = document.createElement("p");
    languages.textContent = "country language : " + data.country.languages.map(el => el.name).join(", ");
    div.appendChild(languages);

    cardContainer.appendChild(div);

}