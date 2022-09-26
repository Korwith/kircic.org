var enter = document.getElementById('enter');
var links = document.getElementById('links');

enter.onclick = function() {
  enter.remove();
  links.style.visibility = 'visible';
};