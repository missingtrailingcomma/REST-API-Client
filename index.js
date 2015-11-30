var http = require('http');

var resArea = document.querySelector('.HTTP-res .res-content');

var processHTTPRequest = function (e) {
  if (e.preventDefault) { e.preventDefault(); }

  var url = document.querySelector('.req-url').value;
  var method = document.querySelector('.req-method').value;
  var urlDelimiterIndex = url.indexOf('/');
  var host = url.slice(0, urlDelimiterIndex);
  var path = url.slice(urlDelimiterIndex);

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
      console.log(str);
      resArea.innerHTML = str;
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
