const svgObject = document.querySelector('.svg-class');

var screenWidth = 1224;
var screenHeight = 2700;
var muzzleHeight = 0.4074;
var noseHeight = 0;
var noseScale = 1;
var lipWidth = 0.25;
var bridgeWidth = 0;


var baseColor = document.getElementById('base-color').value;
var muzzleColor = document.getElementById('muzzle-color').value;
var noseColor = document.getElementById('nose-color').value;
var lipColor = document.getElementById('lip-color').value;
var bridgeColor = document.getElementById('bridge-color').value;

var screenWidth = document.getElementById('screen-sizes').value.split('x')[0];
var screenHeight = document.getElementById('screen-sizes').value.split('x')[1];
var muzzleHeight = document.getElementById('muzzle-height').value;
var noseScale = document.getElementById('nose-size').value;
var noseHeight = document.getElementById('nose-height').value;
var lipWidth = document.getElementById('lip-width').value;
var bridgeWidth = document.getElementById('bridge-width').value;


function updateSvg(){
    const svgDoc = svgObject.contentDocument;

    const base = svgDoc.getElementById('base');
    base.setAttribute('width', screenWidth);
    base.setAttribute('height', screenHeight);
    base.setAttribute('fill', baseColor);

    const muzzle = svgDoc.getElementById('muzzle');
    muzzle.setAttribute('y', screenHeight*(1-muzzleHeight));
    muzzle.setAttribute('height', screenHeight*muzzleHeight);
    muzzle.setAttribute('width', screenWidth);
    muzzle.setAttribute('fill', muzzleColor);
    
    const lip = svgDoc.getElementById('lip');
    lip.setAttribute('width', lipWidth*screenWidth);
    lip.setAttribute('x', (screenWidth*(1-lipWidth))/2);
    lip.setAttribute('fill', lipColor);

    const nose = svgDoc.getElementById('nose');
    nose.setAttribute('transform', `scale(${noseScale})`);
    nose.setAttribute('transform-origin', '50% 60%');
    nose.setAttribute('fill', noseColor);

    // update viewBox
    const viewbox_value = `0 0 ${screenWidth} ${screenHeight}`;
    svgDoc.getElementById('view').setAttribute('viewBox', viewbox_value);
}

svgObject.addEventListener('load', function() {
    updateSvg();
});

document.getElementById('screen-sizes').addEventListener('change', function (event) {
    const [width, height] = event.target.value.split('x').map(Number);
    screenWidth = width;
    screenHeight = height;
    updateSvg();

});

document.getElementById('base-color').addEventListener('change', function (event) {
    baseColor = event.target.value;
    updateSvg();
});

document.getElementById('muzzle-height').addEventListener('input', function (event) {
    muzzleHeight = event.target.value;
    updateSvg();
});

document.getElementById('muzzle-color').addEventListener('change', function (event) {
    muzzleColor = event.target.value;
    updateSvg();
});

document.getElementById('nose-size').addEventListener('input', function (event) {
    noseScale = event.target.value;
    updateSvg();
});

document.getElementById('nose-color').addEventListener('change', function (event) {
    noseColor = event.target.value;
    updateSvg();
});

document.getElementById('nose-height').addEventListener('input', function (event) {
    noseHeight = event.target.value;
    updateSvg();
});

document.getElementById('lip-width').addEventListener('input', function (event) {
    lipWidth = event.target.value;
    updateSvg();
});

document.getElementById('lip-color').addEventListener('change', function (event) {
    lipColor = event.target.value;
    updateSvg();
});

document.getElementById('bridge-width').addEventListener('input', function (event) {
    bridgeWidth = event.target.value;
    updateSvg();
});

document.getElementById('bridge-color').addEventListener('change', function (event) {
    bridgeColor = event.target.value;
    updateSvg();
});