// var http = require('http');
var http = require('follow-redirects').http;

var resArea = document.querySelector('.HTTP-res .res-content');

var processHTTPRequest = function (e) {
  if (e.preventDefault) { e.preventDefault(); }

  var url = document.querySelector('.req-url').value;
  var method = document.querySelector('.req-method').value;
  var urlDelimiterIndex = url.indexOf('/', url.indexOf('//') + 2);
  var host;
  var path;
  if (urlDelimiterIndex > -1) {
    host = url.slice(0, urlDelimiterIndex);
    path = url.slice(urlDelimiterIndex);
  } else {
    host = url;
    path = '';
  }

  http.request({
    host: host,
    path: path,
    port: '80',
    method: method
  }, function(res) {
    var str = '';
    res.on('data', function (chunk) {
      str += chunk;
    });

    res.on('end', function () {
      // either HTML/XML or JSON
      if (str[0] && str[0] !== '[' && str[0] !== '{') {
        // convert < and > to HTML Entities
        str = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        resArea.innerHTML = '<pre><code class="html">' + str + '</code></pre>';
        hljs.highlightBlock(resArea);
      } else {
        resArea.innerHTML = '<pre><code class="json">' + str + '</code></pre>';
        hljs.highlightBlock(resArea);
      }

    });
  }).end();

  return false;
};

var form = document.getElementsByTagName('form')[0];
if (form.attachEvent) {
  form.attachEvent('submit', processHTTPRequest);
} else {
  form.addEventListener('submit', processHTTPRequest);
}
