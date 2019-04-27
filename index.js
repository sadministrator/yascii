$(document).ready(function() {
  var canvas = document.getElementById('orig');
  var canvas2 = document.getElementById('ascii');

  if(canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var ctx2 = canvas2.getContext('2d');

    var img = document.getElementById('pic');

    canvas.width = img.width;
    canvas.height = img.height;

    canvas2.width = 1000;
    canvas2.height = 600;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx2.font = '30px monospace';

    for (i = 0; i < img.height; i++){
      for (j = 0; j < img.width; j++){
        ctx2.fillStyle = 'rgba(' + getPixelXY(imgData, j, i) + ')';
        //ctx2.strokeStyle =
        ctx2.fillText('0', j*3, i*3);
      }
    }

    // Printing the pic with ascii
    for (i = 0; i < img.height; i+=2){
      for (j = 0; j < img.width; j+=2){
        var elem = document.createElement('SPAN');
        elem.innerHTML = '#';
        elem.style.color = 'rgba(' + getPixelXY(imgData, j, i) + ')';
        elem.style.fontSize = '10px';
        document.body.appendChild(elem);
        console.log(j + ' ' + i + " | ");
      }
      var newLine = document.createElement('BR');
      document.body.appendChild(newLine);
      console.log(' BR \n')

    }

    console.log('width: ' + img.width + "     height: " + img.height);
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
