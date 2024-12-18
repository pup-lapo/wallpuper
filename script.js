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
var detailsColor = document.getElementById('details-color').value;

var screenWidth = document.getElementById('screen-sizes').value.split('x')[0];
var screenHeight = document.getElementById('screen-sizes').value.split('x')[1];
var muzzleHeight = document.getElementById('muzzle-height').value;
var noseScale = document.getElementById('nose-size').value;
var noseHeight = document.getElementById('nose-height').value;
var bridgeLipWidth = document.getElementById('bridge-lip-width').value;

var detailsChoice = document.getElementById('details-choice').value;

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
    
    var noseY = screenHeight* (1 - (noseHeight*muzzleHeight)) - 250;
    lipHeight = screenHeight*muzzleHeight + 250;
    bridgeHeight = noseY- screenHeight*(1-muzzleHeight);

    const lip = svgDoc.getElementById('lip');
    lip.setAttribute('width', bridgeLipWidth*screenWidth);
    lip.setAttribute('y', noseY);
    lip.setAttribute('x', (screenWidth*(1-bridgeLipWidth))/2);
    lip.setAttribute('height', lipHeight);
    lip.setAttribute('fill', lipColor);

    //nose is a path
    const nose = svgDoc.getElementById('nose');
    var newHeight = screenHeight* (1 - (noseHeight*muzzleHeight));
    nose.setAttribute('transform-origin', '0% -10%');
    nose.setAttribute('transform', `translate(${screenWidth*0.5}, ${newHeight} ) scale(${noseScale})`);
    nose.setAttribute('fill', noseColor);

    const bridge = svgDoc.getElementById('bridge');
    bridge.setAttribute('width', bridgeLipWidth*screenWidth);
    bridge.setAttribute('y', screenHeight*(1-muzzleHeight))
    bridge.setAttribute('height', bridgeHeight);
    bridge.setAttribute('x', (screenWidth*(1-bridgeLipWidth))/2);
    bridge.setAttribute('fill', bridgeColor);

    const style = svgDoc.querySelector('style');
    style.textContent.replace(/\.details{fill:[^;]+;/, `.details{fill:${detailsColor};`);
    console.log(style.textContent);

    var details = svgDoc.getElementById('eyelets');
    svgDoc.getElementById('eyelets').style.display = 'none';
    svgDoc.getElementById('whiskers').style.display = 'none';
    svgDoc.getElementById('fur').style.display = 'none';
    svgDoc.getElementById('seven-holes').style.display = 'none';

    if(detailsChoice === 'eyelets'){
        details = svgDoc.getElementById('eyelets');
    } else if(detailsChoice === 'whiskers'){
        details = svgDoc.getElementById('whiskers');
    } else if(detailsChoice === 'fur'){
        details = svgDoc.getElementById('fur');
    } else if(detailsChoice === 'seven-holes'){
        details = svgDoc.getElementById('seven-holes');
    }
    details.style.display = 'block';

    details.setAttribute('transform-origin', '50% 50%');
    details.setAttribute('transform', `translate(${screenWidth*0.5}, ${noseY + (lipHeight-250)*0.5} )`);
    details.setAttribute('fill', bridgeColor);

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

document.getElementById('lip-color').addEventListener('change', function (event) {
    lipColor = event.target.value;
    updateSvg();
});

document.getElementById('bridge-lip-width').addEventListener('input', function (event) {
    bridgeLipWidth = event.target.value;
    updateSvg();
});

document.getElementById('bridge-color').addEventListener('change', function (event) {
    bridgeColor = event.target.value;
    updateSvg();
});

document.getElementById('details-color').addEventListener('change', function (event) {
    detailsColor = event.target.value;
    updateSvg();
});

document.getElementById('details-choice').addEventListener('change', function (event) {
    detailsChoice = event.target.value;
    updateSvg();
});


