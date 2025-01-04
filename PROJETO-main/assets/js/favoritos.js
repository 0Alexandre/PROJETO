$(document).ready(function () {
loadFavoriteCountries();

function loadFavoriteCountries() {
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    $('#favoriteslist').html('<p>Sem países nos favoritos.</p>');
    return;
  }

  var countriesList = $('#favoriteslist');
  countriesList.empty();

  favorites.forEach((countryName) => {
  var api_url = 'https://restcountries.com/v3.1/name/' + encodeURIComponent(countryName);

  $.ajax({
    url: api_url,
    method: 'GET',
    success: function (data) {
      var country = data[0];
      var heartIcon = favorites.includes(countryName) ? 'assets/img/icons/coração_preenchido.svg' : 'assets/img/icons/coração_vazio.svg';
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
  },
  error: function () {
    alert('Erro ao tentar buscar os dados do país!');
  }
  });
});

$(document).on('click', '.add-favorite', function () {
  var countryName = $(this).data('country');  
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(countryName)) {
      // Remove dos favoritos
      favorites = favorites.filter(function (favorite) {
        return favorite !== countryName;
      });
    } else {
      favorites.push(countryName);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavoriteCountries();
    });
  }
});





