$(document).ready(function() {
  var canvas = document.getElementById('orig');

  if(canvas.getContext) {
    var ctx = canvas.getContext('2d');

    var img = document.getElementById('pic');

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Printing the pic with ascii
    var $text = document.getElementById('text');
    for (i = 0; i < img.height; i += 4){
      for (j = 0; j < img.width; j += 4){
        var elem = document.createElement('SPAN');
        elem.innerHTML = '#';
        elem.style.color = 'rgba(' + getPixelXY(imgData, j, i) + ')';

        $text.appendChild(elem);
        console.log(j + ' ' + i + " | ");
      }
      var newLine = document.createElement('BR');
      $text.appendChild(newLine);
    }
  } else { // canvas not supported
    document.getElementById("text").innerHTML = "Error, bitch.";
  }

  function getPixel(imgData, index) {
    var i = index*4, d = imgData.data;
    return [d[i], d[i+1], d[i+2], d[i+3]]; // [r, g, b, a]
  }

  function getPixelXY(imgData, x, y) {
    return getPixel(imgData, y * imgData.width + x)
  }
});
