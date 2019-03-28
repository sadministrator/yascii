$(document).ready(function() {
  var canvas = document.getElementById('orig');
  var canvas2 = document.getElementById('ascii');

  if(canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var ctx2 = canvas2.getContext('2d');

    var img = document.getElementById('pic');

    canvas.width = img.width;
    canvas.height = img.height;

    canvas2.width = 1300;
    canvas2.height = 1000;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx2.font = '60px monospace';

    for (i = 0; i < img.height; i++){
      for (j = 0; j < img.width; j++){
        ctx2.fillStyle = 'rgba(' + getPixelXY(imgData, j, i) + ')';
        //ctx2.strokeStyle =
        ctx2.fillText('0', j*3, i*3);
      }
    }

    //canvas2.width = ctx2.measureText();

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
