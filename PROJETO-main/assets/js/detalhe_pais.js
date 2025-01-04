$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var countryName = urlParams.get('name');

  if (countryName) {
    fetchCountryDetails(countryName);
  }
});

function fetchCountryDetails(name) {
  var api_url = 'https://restcountries.com/v3.1/name/' + encodeURIComponent(name);

  $.ajax({
    url: api_url,
    method: 'GET',
    success: function (data) {
      if (data && data.length > 0) {
        displayCountryDetails(data[0]);
      }
    },
    error: function () {
      alert('Erro ao buscar detalhes do país!');
    },
  });
}

function displayCountryDetails(country) {
  $('#countryFlag').attr('src', country.flags.svg);
  $('#countryName').text(country.name.common);
  $('#countryCapital').text(country.capital);
  $('#countryRegion').text(country.region);
  $('#countryPopulation').text(country.population.toLocaleString());
  $('#countryArea').text(country.area.toLocaleString() + ' km²');
  $('#countryLanguages').text(Object.values(country.languages).join(', '));
  $('#countryTimezones').text(country.timezones.join(', '));
}
