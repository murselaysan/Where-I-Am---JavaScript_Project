
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const latitudeInput = document.querySelector("#latitude");
const longitudeInput = document.querySelector("#longitude");

const apiKey = "a50ac500-34d6-11eb-af30-3dfb1df4affe";  // this is mine, take yours !!!

const whereAmI = function (lat, lng) {
  let regionFromFirstAPI;

  const url = "https://app.geocodeapi.io/api/v1/reverse?apikey=";

  const coordinates = `&point.lat=${lat}&point.lon=${lng}`;
  
  fetch(url + apiKey + coordinates)
    .then((res) => {
      if (!res.ok)
        throw new Error(`Problem with geocodeapi with the code: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let region = data.features["0"].properties.region;
      regionFromFirstAPI = region;
      let country = data.features["0"].properties.country;
      console.log(`You are in ${region}, country of ${country}.`);
      return fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    })
    .then((countryData) => {
      if (!countryData.ok)
        throw new Error(
          `Problem with Country Fınder with the code: ${countryData.status}`
        );
      return countryData.json();
    })
    .then((data) => {
      console.log(data);
      console.log(regionFromFirstAPI); // You can use both api results if you wish
      renderCountry(data[0]);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//whereAmI(52.508, 13.381);
//whereAmI(49.266, -123.140);
//whereAmI(-33.933, 18.474);
//whereAmI(-33.933, );
btn.addEventListener("click", displayCountry);
