document.getElementById('mouth').addEventListener('input', function (event) {
    const rect = document.getElementById('mouth-rect');
    const newHeight = event.target.value;
    rect.setAttribute('height', newHeight);

    // Optionally adjust the rectangle's y-position to keep it centered
    rect.setAttribute('height', newHeight);
});
