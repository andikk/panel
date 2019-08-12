'use strict';
var MOBILE_WIDTH = 1024;
var selectEl =  document.querySelector('.select');
var menuBtnEl =  document.querySelector('.menu-btn');
var menuEl = document.querySelector('.menu');
var column1El = document.querySelector('.js-column1');
var windowWidth = window.innerWidth;
var allItems;


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


var showItemContent = function (item) {
  var descriptionEl = document.querySelector('.js-description');
  descriptionEl.textContent = item.description;

  var text1El = document.querySelector('.js-text1');
  text1El.textContent = item.text1; 

  var text2El = document.querySelector('.js-text2');
  text2El.textContent = item.text2;

  var text3El = document.querySelector('.js-text3');
  text3El.textContent = item.text3;  
};

var onItemClick = function (evt) {
  showItemContent(allItems[evt.currentTarget.getAttribute('data-id')]);
}

var showItems = function (items) {
  var itemTemplate = document.querySelector('#item-template').content.querySelector('.item');
  var listItemsEl = document.querySelector('.js-list-items');
  
  items.forEach(function(item, index) {
    var newItem = itemTemplate.cloneNode(true);
    
    var itemImgEl = newItem.querySelector('.js-item-img');
    itemImgEl.src = item.img;

    var itemNameEl = newItem.querySelector('.js-item-name');
    itemNameEl.textContent = item.name;
       
    newItem.setAttribute('data-id', index);

    newItem.addEventListener('click', onItemClick);
 
    listItemsEl.appendChild(newItem);    
  });

  showItemContent(items[0]);
}

var downloadItems = function () {
  var onError = function () {
    console.log('Data download error');
  };

  var onSuccess = function (data) {
    allItems = data;
    showItems(allItems);
  };
 
  load('/json/content.json', onSuccess, onError, 'GET', null);
};

var fixSize = function() {
  var firstItem = document.querySelector('.column1 li:nth-child(2)');
  var parentElement = document.querySelector('.column1 ul');
  
  var parentElementWidth = parentElement.clientWidth;
  firstItem.style.width = parentElementWidth + 'px';
}

downloadItems(); 

if (windowWidth > MOBILE_WIDTH) {
  menuBtnEl.classList.add('is-active');
  menuEl.classList.add('menu_opened');
  menuEl.classList.remove('menu_closed');
}

menuBtnEl.addEventListener("click", function () {
  menuBtnEl.classList.toggle('is-active');

  if (menuEl.classList.contains('menu_opened')) {
    menuEl.classList.remove('menu_opened');
    menuEl.classList.add('menu_closed'); 
  } else {
    menuEl.classList.remove('menu_closed');
    menuEl.classList.add('menu_opened');
   }
});

menuEl.addEventListener('transitionend', fixSize);

window.addEventListener('resize', function() {
  setTimeout(fixSize, 500);
});