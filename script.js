"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const h1 = document.querySelector("h1");
const searchBar = document.getElementById("key");
const button = document.getElementById("sb");

///////////////////////////////////////////////////////////////////////
const renderCountry = function (data, className = "") {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article> `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////////////////////////////////

const getThreeCountry = async function () {
  let value = searchBar.value;
  try {
    const firstcountry = await fetch(
      `https://restcountries.com/v2/name/${value}`
    );
    const max = firstcountry.json().then((data) => {
      renderCountry(...data);
    });
  } catch (err) {
    console.log(err.message);
  }
};

/////////////////////////////////////////////////
searchBar.addEventListener("input", function () {
  button.addEventListener("click", getThreeCountry);
});

btn.addEventListener("click", function () {
  countriesContainer.style.display = "none";
  searchBar.value = "";
  window.location.reload();
  searchBar.focus();
});

button.addEventListener("click", function () {
  if (searchBar.value === "") {
    h1.textContent = "Input Country Name";
    h1.style.color = "white";
    button = false;
  }
  searchBar.remove();
  button.remove();
  h1.style.display = "none";
});
