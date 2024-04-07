(function () {
  'use strict';
  var i = 0;
  function copyProperty(i) {
    i++;
    var properties = document.querySelector('.properties .row');
    var property = document.createElement('div');
    property.className = document.querySelector('.property').classList;
    property.style.backgroundImage = document.querySelector('.property').style.backgroundImage;
    property.innerHTML = document.querySelector('.property').innerHTML;
    property.innerHTML = property.innerHTML.replace('stock-photo-1', 'stock-photo-' + i);
    properties.appendChild(property);
  }
  while (i < 5) {
    i++;
    copyProperty(i);
  }
})();
