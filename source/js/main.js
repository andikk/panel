var MOBILE_WIDTH = 1024;
var selectEl =  document.querySelector('.select');
var menuBtnEl =  document.querySelector('.menu-btn');
var menuEl = document.querySelector('.menu');
var windowWidth = window.innerWidth;

var load = function (url, onSuccess, onError, method, data) {
  var OK_STATUS = 200;
  var TIMEOUT = 10000;

  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === OK_STATUS) {
      onSuccess(xhr.response);
    } else {
      onError('Status: ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Connection error');
  });

  xhr.addEventListener('timeout', function () {
    onError('Request timeout ' + xhr.timeout + 'мс');
  });

  xhr.timeout = TIMEOUT; // 10s

  xhr.open(method, url);
  xhr.send(data);
};


var downloadItems = function () {
  var onError = function () {
    console.log('Data download error');
  };

  var onSuccess = function (data) {
    console.log(data) 
  };
 
  load('/json/content.json', onSuccess, onError, 'GET', null);
};


downloadItems(); 

if (windowWidth > MOBILE_WIDTH) {
  menuBtnEl.classList.add('is-active');
  menuEl.classList.add('menu_opened');
  menuEl.classList.remove('menu_closed');
}

menuBtnEl.addEventListener("click", function (e) {

  menuBtnEl.classList.toggle('is-active');

  if (menuEl.classList.contains('menu_opened')) {
    menuEl.classList.remove('menu_opened');
    menuEl.classList.add('menu_closed');
    
  } else {
    menuEl.classList.remove('menu_closed');
    menuEl.classList.add('menu_opened');
  }
   e.stopPropagation();
});


document.addEventListener('click', function (e) {
  var target = e.target;
  var its_menu = target == menuEl || menuEl.contains(target);
  var select = target == selectEl;
  var menu_is_active = menuEl.classList.contains('menu_opened');
  if (menu_is_active && !its_menu && !select) {
    menuEl.classList.add('menu_closed');
    menuEl.classList.remove('menu_opened');
    menuBtnEl.classList.toggle('is-active');
  }
});