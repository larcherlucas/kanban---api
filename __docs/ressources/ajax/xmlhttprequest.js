function getXhrObject() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }

  if (window.ActiveXObject) {
    var names = [
      "Msxml2.XMLHTTP.6.0",
      "Msxml2.XMLHTTP.3.0",
      "Msxml2.XMLHTTP",
      "Microsoft.XMLHTTP"
    ];
    for (var i in names) {
      try {
        return new ActiveXObject(names[i]);
      }
      catch(e) {
        console.error(e);
      }
    }
  }

  alert('Your browser does not support XMLHttpRequest.');

  return null;
}
var xhr = createXhrObject();

xhr.addEventListener('progress', updateProgress);
xhr.addEventListener('load', transferComplete);
xhr.addEventListener('error', transferFailed);
xhr.addEventListener('abort', transferCanceled);

try {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      alert(xhr.responseText); // responseXML
    } else {
      alert('There was a problem with the request.');
    }
  }
} catch (error) {
  console.error(error);
}

xhr.open('GET', 'http://www.example.org/some_path'); // URL, fichier
xhr.send();
