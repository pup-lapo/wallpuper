const svgObject = document.querySelector('.svg-class');

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

var encodedChoices;

function updateSvg() {
    const svgDoc = svgObject.contentDocument;

    const base = svgDoc.getElementById('base');
    base.setAttribute('width', screenWidth);
    base.setAttribute('height', screenHeight);
    base.setAttribute('fill', baseColor);

    const muzzle = svgDoc.getElementById('muzzle');
    muzzle.setAttribute('y', screenHeight * (1 - muzzleHeight));
    muzzle.setAttribute('height', screenHeight * muzzleHeight);
    muzzle.setAttribute('width', screenWidth);
    muzzle.setAttribute('fill', muzzleColor);

    var noseY = screenHeight * (1 - (noseHeight * muzzleHeight)) - 250;
    lipHeight = screenHeight * muzzleHeight + 250;
    bridgeHeight = noseY - screenHeight * (1 - muzzleHeight);

    const lip = svgDoc.getElementById('lip');
    lip.setAttribute('width', bridgeLipWidth * screenWidth);
    lip.setAttribute('y', noseY);
    lip.setAttribute('x', (screenWidth * (1 - bridgeLipWidth)) / 2);
    lip.setAttribute('height', lipHeight);
    lip.setAttribute('fill', lipColor);

    //nose is a path
    const nose = svgDoc.getElementById('nose');
    var newHeight = screenHeight * (1 - (noseHeight * muzzleHeight));
    nose.setAttribute('transform-origin', '0% -10%');
    nose.setAttribute('transform', `translate(${screenWidth * 0.5}, ${newHeight} ) scale(${noseScale})`);
    nose.setAttribute('fill', noseColor);

    const bridge = svgDoc.getElementById('bridge');
    bridge.setAttribute('width', bridgeLipWidth * screenWidth);
    bridge.setAttribute('y', screenHeight * (1 - muzzleHeight))
    bridge.setAttribute('height', bridgeHeight);
    bridge.setAttribute('x', (screenWidth * (1 - bridgeLipWidth)) / 2);
    bridge.setAttribute('fill', bridgeColor);

    const detailsColorCSS = svgDoc.getElementById('detailsColors');
    detailsColorCSS.innerHTML = `.holes { fill: #202020;} .details { fill: ${detailsColor};}`;

    var details = svgDoc.getElementById('eyelets');
    svgDoc.getElementById('eyelets').style.display = 'none';
    svgDoc.getElementById('whiskers').style.display = 'none';
    svgDoc.getElementById('fur').style.display = 'none';
    svgDoc.getElementById('seven-holes').style.display = 'none';

    if (detailsChoice === 'eyelets') {
        details = svgDoc.getElementById('eyelets');
    } else if (detailsChoice === 'whiskers') {
        details = svgDoc.getElementById('whiskers');
    } else if (detailsChoice === 'fur') {
        details = svgDoc.getElementById('fur');
    } else if (detailsChoice === 'seven-holes') {
        details = svgDoc.getElementById('seven-holes');
    } else if (detailsChoice === 'none') {
        details = null;
    }
    if (details) {
        details.style.display = 'block';
        details.setAttribute('transform-origin', '50% 50%');
        details.setAttribute('transform', `translate(${screenWidth * 0.5}, ${noseY + (lipHeight - 250) * 0.5} )`);
        details.setAttribute('fill', bridgeColor);
    }
    // update viewBox
    const viewbox_value = `0 0 ${screenWidth} ${screenHeight}`;
    svgDoc.getElementById('view').setAttribute('viewBox', viewbox_value);

}

// on page load, check if there are encoded choices in the URL and apply them
window.onload = function () {
    if (window.location.hash) {
        var choices = window.location.hash.slice(1).split('_');
        console.log(choices);
        [screenWidth, screenHeight] = choices[0].split('x').map(Number);
        if (choices[5] === 'camo') {
            baseColor = 'url(#pattern_camo)';
            document.getElementById('base-color').value = "#ffffff";
            document.getElementById('base-color').parentElement.querySelector('#camo').checked = true;
            choices[5] = "#ffffff";
        } else {
            baseColor = choices[5];
            document.getElementById('base-color').value = choices[5];
            document.getElementById('base-color').parentElement.querySelector('#camo').checked = false;
        }

        if (choices[6] === 'camo') {
            muzzleColor = 'url(#pattern_camo)';
            document.getElementById('muzzle-color').value = "#000000";
            document.getElementById('muzzle-color').parentElement.querySelector('#camo').checked = true;
            choices[6] = "#000000";
        } else {
            muzzleColor = choices[6];
            document.getElementById('muzzle-color').value = choices[6];
            document.getElementById('muzzle-color').parentElement.querySelector('#camo').checked = false;
        }

        if (choices[7] === 'camo') {
            noseColor = 'url(#pattern_camo)';
            document.getElementById('nose-color').value = "#000000";
            document.getElementById('nose-color').parentElement.querySelector('#camo').checked = true;
            choices[7] = "#000000";
        } else {
            noseColor = choices[7];
            document.getElementById('nose-color').value = choices[7];
            document.getElementById('nose-color').parentElement.querySelector('#camo').checked = false;
        }

        if (choices[8] === 'camo') {
            lipColor = 'url(#pattern_camo)';
            document.getElementById('lip-color').value = "#000000";
            document.getElementById('lip-color').parentElement.querySelector('#camo').checked = true;
            choices[8] = "#000000";
        } else {
            lipColor = choices[8];
            document.getElementById('lip-color').value = choices[8];
            document.getElementById('lip-color').parentElement.querySelector('#camo').checked = false;
        }

        if (choices[9] === 'camo') {
            bridgeColor = 'url(#pattern_camo)';
            document.getElementById('bridge-color').value = "#000000";
            document.getElementById('bridge-color').parentElement.querySelector('#camo').checked = true;
            choices[9] = "#000000";
        } else {
            bridgeColor = choices[9];
            document.getElementById('bridge-color').value = choices[9];
            document.getElementById('bridge-color').parentElement.querySelector('#camo').checked = false;
        }

        if (choices[10] === 'camo') {
            detailsColor = 'url(#pattern_camo)';
            document.getElementById('details-color').value = "#000000";
            document.getElementById('details-color').parentElement.querySelector('#camo').checked = true;
            choices[10] = "#000000";
        } else {
            detailsColor = choices[10];
            document.getElementById('details-color').value = choices[10];
            document.getElementById('details-color').parentElement.querySelector('#camo').checked = false;
        }

        document.getElementById('screen-sizes').value = `${screenWidth}x${screenHeight}`;
        document.getElementById('custom-width').value = screenWidth;
        document.getElementById('custom-height').value = screenHeight;
        document.getElementById('muzzle-height').value = choices[1];
        document.getElementById('nose-height').value = choices[2];
        document.getElementById('nose-size').value = choices[3];
        document.getElementById('bridge-lip-width').value = choices[4];
        document.getElementById('details-choice').value = choices[11];
        screenWidth = document.getElementById('custom-width').value;
        screenHeight = document.getElementById('custom-height').value;
        detailsChoice = document.getElementById('details-choice').value;
    }
    updateSvg(); encodeChoices();
};


document.getElementById('screen-sizes').addEventListener('change', function (event) {
    const value = event.target.value;
    var width;
    var height;
    if (value === 'custom') {
        document.getElementById('custom-sizes').classList.remove('hidden');
        width = document.getElementById('custom-width').value;
        height = document.getElementById('custom-height').value;
    } else {
        document.getElementById('custom-sizes').classList.add('hidden');
        [width, height] = value.split('x').map(Number);
        document.getElementById('custom-width').value = width;
        document.getElementById('custom-height').value = height;
    }
    screenWidth = width;
    screenHeight = height;
    updateSvg(); encodeChoices();
});

document.getElementById('custom-width').addEventListener('input', updateCustomSizes);
document.getElementById('custom-height').addEventListener('input', updateCustomSizes);

function updateCustomSizes() {
    if (document.getElementById('screen-sizes').value !== 'custom')
        return;
    const width = document.getElementById('custom-width').value;
    const height = document.getElementById('custom-height').value;
    screenWidth = width;
    screenHeight = height;
    updateSvg(); encodeChoices();
}

document.getElementById('base-color').addEventListener('change', updateBaseColor);
document.getElementById('base-color').parentElement.querySelector('#camo').addEventListener('change', updateBaseColor);

function updateBaseColor() {
    var camoChecked = document.getElementById('base-color').parentElement.querySelector('#camo').checked;
    if (camoChecked) {
        baseColor = 'url(#pattern_camo)';
    } else {
        baseColor = document.getElementById('base-color').value;
    }
    updateSvg(); encodeChoices();
}

document.getElementById('muzzle-height').addEventListener('input', function (event) {
    muzzleHeight = event.target.value;
    updateSvg(); encodeChoices();
});

document.getElementById('muzzle-color').addEventListener('change', updateMuzzleColor);
document.getElementById('muzzle-color').parentElement.querySelector('#camo').addEventListener('change', updateMuzzleColor);

function updateMuzzleColor() {
    var camoChecked = document.getElementById('muzzle-color').parentElement.querySelector('#camo').checked;
    if (camoChecked) {
        muzzleColor = 'url(#pattern_camo)';
    } else {
        muzzleColor = document.getElementById('muzzle-color').value;
    }
    updateSvg(); encodeChoices();
}

document.getElementById('nose-size').addEventListener('input', function (event) {
    noseScale = event.target.value;
    updateSvg(); encodeChoices();
});

document.getElementById('nose-color').addEventListener('change', updateNoseColor);
document.getElementById('nose-color').parentElement.querySelector('#camo').addEventListener('change', updateNoseColor);

function updateNoseColor() {
    var camoChecked = document.getElementById('nose-color').parentElement.querySelector('#camo').checked;
    if (camoChecked) {
        noseColor = 'url(#pattern_camo)';
    } else {
        noseColor = document.getElementById('nose-color').value;
    }
    updateSvg(); encodeChoices();
}

document.getElementById('nose-height').addEventListener('input', function (event) {
    noseHeight = event.target.value;
    updateSvg(); encodeChoices();
});

document.getElementById('lip-color').addEventListener('change', updateLipColor);
document.getElementById('lip-color').parentElement.querySelector('#camo').addEventListener('change', updateLipColor);

function updateLipColor() {
    var camoChecked = document.getElementById('lip-color').parentElement.querySelector('#camo').checked;
    if (camoChecked) {
        lipColor = 'url(#pattern_camo)';
    } else {
        lipColor = document.getElementById('lip-color').value;
    }
    updateSvg(); encodeChoices();
}

document.getElementById('bridge-lip-width').addEventListener('input', function (event) {
    bridgeLipWidth = event.target.value;
    updateSvg(); encodeChoices();
});

document.getElementById('bridge-color').addEventListener('change', updateBridgeColor);
document.getElementById('bridge-color').parentElement.querySelector('#camo').addEventListener('change', updateBridgeColor);

function updateBridgeColor() {
    var camoChecked = document.getElementById('bridge-color').parentElement.querySelector('#camo').checked;
    if (camoChecked) {
        bridgeColor = 'url(#pattern_camo)';
    } else {
        bridgeColor = document.getElementById('bridge-color').value;
    }
    updateSvg(); encodeChoices();
}

document.getElementById('details-color').addEventListener('change', updateDetailsColor);
document.getElementById('details-color').parentElement.querySelector('#camo').addEventListener('change', updateDetailsColor);

function updateDetailsColor() {
    var camoChecked = document.getElementById('details-color').parentElement.querySelector('#camo').checked;
    if (camoChecked) {
        detailsColor = 'url(#pattern_camo)';
    } else {
        detailsColor = document.getElementById('details-color').value;
    }
    updateSvg(); encodeChoices();
}

document.getElementById('details-choice').addEventListener('change', function (event) {
    detailsChoice = event.target.value;
    updateSvg(); encodeChoices();
});

function exportSVG() {
    const svgDoc = svgObject.contentDocument;
    var svgData = new XMLSerializer().serializeToString(svgDoc);
    var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "cat.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function exportPNG() {
    const svgDoc = svgObject.contentDocument;
    var svgData = new XMLSerializer().serializeToString(svgDoc);
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var img = document.createElement("img");
    var svgSize = svgDoc.getElementById('view').getAttribute('viewBox').split(' ').slice(2);
    canvas.width = svgSize[0];
    canvas.height = svgSize[1];
    var svg = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    var url = URL.createObjectURL(svg);
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        var png = canvas.toDataURL("image/png");
        var downloadLink = document.createElement("a");
        downloadLink.href = png;
        downloadLink.download = "cat.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    img.src = url;
}

function encodeChoices() {
    if (baseColor === 'url(#pattern_camo)') {
        baseColor = 'camo';
    }
    if (muzzleColor === 'url(#pattern_camo)') {
        muzzleColor = 'camo';
    }
    if (noseColor === 'url(#pattern_camo)') {
        noseColor = 'camo';
    }
    if (lipColor === 'url(#pattern_camo)') {
        lipColor = 'camo';
    }
    if (bridgeColor === 'url(#pattern_camo)') {
        bridgeColor = 'camo';
    }
    if (detailsColor === 'url(#pattern_camo)') {
        detailsColor = 'camo';
    }
    encodedChoices = `${screenWidth}x${screenHeight}_${muzzleHeight}_${noseHeight}_${noseScale}_${bridgeLipWidth}_${baseColor}_${muzzleColor}_${noseColor}_${lipColor}_${bridgeColor}_${detailsColor}_${detailsChoice}`;
    window.history.replaceState(null, null, `#${encodedChoices}`);
}

fetch('camo.svg')  // Load external pattern
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const camoSvgDoc = parser.parseFromString(data, 'image/svg+xml');
        const pattern = camoSvgDoc.querySelector('pattern');

        if (pattern && svgObject) {
            const mainSVG = svgObject.contentDocument;
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            defs.appendChild(pattern);
            mainSVG.documentElement.appendChild(defs);
            console.log(mainSVG)
        }
    })
    .catch(error => console.error('Error loading SVG:', error));