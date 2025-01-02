fetchAllCountries();

$(document).ready(function () {
  $('#searchButton').on('click', function () {
    var inputTextValue = $('#searchInput').val();
    fetchMovies(inputTextValue);
  });
  loadFavorites();
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
  var isFavorite = checkIfFavorite(country.name.common);
  var heartIcon = isFavorite ? 'assets/img/icons/coração_preenchido.svg' : 'assets/img/icons/coração_vazio.svg';
  
    var countryCard = ` 
    <div class="col-md-4 mt-4">
        <div class="card h-100 card_hover text-center rounded-0">
          <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common}" width="" height="300" />
          <div class="card-body">
            <h5 class="card-title fw-bold text-center fs-4">${country.name.common}</h5>
            <p class="card-text fw-semibold">Capital: ${country.capital}</p>
            <p class="card-text fw-semibold">Região: ${country.region}</p>
            <a href="detalhes_pais.html?name=${encodeURIComponent(country.name.common)}"><button class="btn border-primary text-primary btn-lg rounded-0 hover fs-6">Mais detalhes</button></a>
            <button class="btn text-warning btn-lg rounded-0 hover fs-6 add-favorite" data-country="${country.name.common}">
              <img src="${heartIcon}" alt="icon_coração" width="30" height="30" />
            </button>
          </div>
        </div>
    </div>`;

    countriesList.append(countryCard);
  });


$('.add-favorite').on('click', function () {
  var countryName = $(this).data('country');
  toggleFavorite(countryName);
  }); 
}

function checkIfFavorite(countryName) {
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.includes(countryName);
}

function toggleFavorite(countryName) {
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.includes(countryName)) {
    favorites = favorites.filter((name) => name !== countryName);
  }else {
    favorites.push(countryName);
  }


localStorage.setItem('favorites', JSON.stringify(favorites));

loadFavorites();

}

function loadFavorites() {
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  $('.add-favorite').each(function() {
    var countryName = $(this).data('country');
    var heartIcon = favorites.includes(countryName) ? 'assets/img/icons/coração_preenchido.svg' : 'assets/img/icons/coração_vazio.svg';
    $(this).find('img').attr('src', heartIcon);
  });
  
}

var input = document.getElementById('searchInput');

input.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById('searchButton').click();
  }
});


