$(document).ready(function () {
  function displayCountries(countriesArray) {
    var countriesList = $('#countrieslist');
    // Limpa os resultados anteriores do html
    countriesList.empty();

    var randomCountries = [];
    while (randomCountries.length < 3 && countriesArray.length > 0) {
      var randomIndex = Math.floor(Math.random() * countriesArray.length);
      randomCountries.push(countriesArray.splice(randomIndex, 1)[0]);
    }

    randomCountries.forEach((country) => {
      var countryCard = `
      <div class="col-md-4 mt-4">
          <a href="detalhes_pais.html?name=${encodeURIComponent(country.name.common)}" class="text-decoration-none">
              <div class="card h-100 border border-secondary p-4 rounded-0 card_hover">
                  <img src="${country.flags.svg}" class="card-img-top rounded-0" alt="${country.name.common}" width="200" height="200" />
                  <div class="card-body">
                      <p class="card-text fw-bold">${country.name.common}</p>
                  </div>
              </div>
          </a>
      </div>`;

      countriesList.append(countryCard);
    });
  }

  var api_url = 'https://restcountries.com/v3.1/all';
  $.ajax({
    url: api_url,
    method: 'GET',
    success: function (data) {
      displayCountries(data);
    },
    error: function () {
      alert('Erro ao buscar os países!');
    },
  });
});
