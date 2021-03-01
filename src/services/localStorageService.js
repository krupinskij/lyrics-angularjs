app.factory('$localStorage', function() {
  const $localStorage = {};

  $localStorage.get = key => {
    return localStorage.getItem(key)
  }

  $localStorage.set = (key, value) => {
    localStorage.setItem(key, value);
  }

  return $localStorage;
})