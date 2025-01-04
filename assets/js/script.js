$(document).ready(function () {
  if (typeof loadFavorites === 'function') {
    loadFavorites();
  } else {
    console.error('loadFavorites não está definida!');
  }
});
