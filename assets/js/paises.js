fetchAllCountries();

$(document).ready(function () {
  $('#searchButton').on('click', function () {
    var inputTextValue = $('#searchInput').val();
    fetchMovies(inputTextValue);
  });
});

function fetchAllCountries() {
  var api_url = 'https://restcountries.com/v3.1/all';

  $.ajax({
    url: api_url,
    method: 'GET',
    success: function (data) {
      console.log(data);
      displayCountries(data);
    },
    error: function () {
      alert('Erro ao buscar todos os países!');
    },
  });
}

function fetchMovies(inputTextValue) {
  var api_url = 'https://restcountries.com/v3.1/name/' + encodeURIComponent(inputTextValue);

  $.ajax({
    url: api_url,
    method: 'GET',
    success: function (data) {
      console.log(data);
      displayCountries(data);
    },
    error: function () {
      alert('Erro na pesquisa!');
    },
  });
}

function displayCountries(countriesArray) {
  var countriesList = $('#countrieslist');
  countriesList.empty();

  countriesArray.forEach((country) => {
    var countryCard = ` 
    <div class="col-md-4 mt-4">
      <a href="detalhes_pais.html?name=${encodeURIComponent(country.name.common)}" class="text-decoration-none">
        <div class="card h-100 card_hover">
          <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common}" width="" height="300" />
          <div class="card-body">
            <h5 class="card-title">${country.name.common}</h5>
            <p class="card-text">Capital: ${country.capital}</p>
            <p class="card-text">Region: ${country.region}</p>
          </div>
        </div>
      </a>  
    </div>`;

    countriesList.append(countryCard);
  });
}
