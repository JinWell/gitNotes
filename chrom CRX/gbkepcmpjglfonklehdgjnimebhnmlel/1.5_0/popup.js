document.addEventListener('DOMContentLoaded', function () {
  var c = new ProxyFormController( 'proxyForm' );

  var elements = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < elements.length; i++)
  {
    var node = elements[i];
    var arguments = JSON.parse('{' + node.dataset.i18n + '}');
    if (typeof arguments.text === 'string') {
      node.innerText = chrome.i18n.getMessage(arguments.text);
    }
    if (typeof arguments.value === 'string') {
      node.value = chrome.i18n.getMessage(arguments.value);
    }
    if (typeof arguments.placeholder === 'string') {
      node.placeholder = chrome.i18n.getMessage(arguments.placeholder);
    }
  }
});
