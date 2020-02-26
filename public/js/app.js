var socket;
let input;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  input = createColorPicker("#ff0000");
  input.class('color_picker');

  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
}

function newDrawing(data) {
  noStroke();
  fill(data.z);
  ellipse(data.x, data.y, 24, 24);
  console.log(data.z)
}

function mouseDragged() {
  console.log('Sending: ' + mouseX + ',' + mouseY + input.color());
  
  var data = {
    x: mouseX,
    y: mouseY,
    z: input.value()
  }

  socket.emit('mouse', data);
  noStroke();
  fill(input.color());
  ellipse(mouseX, mouseY, 24, 24);
}

function draw() {}