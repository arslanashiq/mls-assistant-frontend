(function () {
  'use strict';
  var i, properties, property;

  /* function to show multiple properties for testing */
  function copyProperty(x) {
    properties = document.querySelector('.properties .row');
    property = document.createElement('div');
    property.className = document.querySelector('.property').classList;
    property.style.backgroundImage = document.querySelector('.property').style.backgroundImage;
    property.innerHTML = document.querySelector('.property').innerHTML;
    property.innerHTML = property.innerHTML.replace('stock-photo-1', 'stock-photo-' + x)
    properties.appendChild(property);
  }
  for (i = 0; i < 7; i += 1) {
    copyProperty(i);
  }

  /* function to stop search filter dropdowns from closing on click */
  $(document).on('click', '.search-filter .dropdown-menu', function (e) {
    e.stopPropagation();
  });
}());
