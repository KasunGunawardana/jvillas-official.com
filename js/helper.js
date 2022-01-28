function delay(n) {
  n = n || 2000
  return new Promise(resolve => {
    setTimeout(resolve, n)
  })
}

var getYear = new Date().getFullYear();
document.getElementById('getYear').innerHTML = getYear;
