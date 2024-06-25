function applyFilters() {
  const fileInput = document.getElementById("postImage");

  if (fileInput.files.length === 0) {
    alert("Please select an image before applying filters.");
    return; 
  }
  else {
    fetch("https://localhost/final/html/imageFilters.html")
      .then(response => response.text())
      .then(html => {
        const mainContainer = document.querySelector('.masterSection');
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = html;
        while (tempContainer.firstChild) {
          mainContainer.appendChild(tempContainer.firstChild);
        }
        const filtersSection = document.querySelector('.masterSection__photoSection');
        if (filtersSection) {
          filtersSection.style.display = 'block';

        } else {
          console.error("New post section not found after loading");
        }
      })
      .catch(error => console.error("Error fetching new post section:", error));
  }
}

function closePhotoSection() {
  document.querySelector('.masterSection__PhotoSection').style.display = 'none';

} function apply() {
  const grayscale = document.getElementById('grayscaleSlider').value;
  const sepia = document.getElementById('sepiaSlider').value;
  const blur = document.getElementById('blurSlider').value;
  const brightness = document.getElementById('brightnessSlider').value;
  const contrast = document.getElementById('contrastSlider').value;

  document.getElementById('grayscaleValue').textContent = grayscale;
  document.getElementById('sepiaValue').textContent = sepia;
  document.getElementById('blurValue').textContent = blur;
  document.getElementById('brightnessValue').textContent = brightness;
  document.getElementById('contrastValue').textContent = contrast;

  const img = document.getElementById('filteredImg');
  img.style.filter = `
    grayscale(${grayscale}%)
    sepia(${sepia}%)
    blur(${blur}px)
    brightness(${brightness / 100})
    contrast(${contrast / 100})
  `;
}

function restoreDefaults() {
  document.getElementById('grayscaleSlider').value = 0;
  document.getElementById('sepiaSlider').value = 0;
  document.getElementById('blurSlider').value = 0;
  document.getElementById('brightnessSlider').value = 100;
  document.getElementById('contrastSlider').value = 100;

  document.getElementById('grayscaleValue').textContent = 0;
  document.getElementById('sepiaValue').textContent = 0;
  document.getElementById('blurValue').textContent = 0;
  document.getElementById('brightnessValue').textContent = 100;
  document.getElementById('contrastValue').textContent = 100;

  const img = document.getElementById('filteredImg');
  img.style.filter = 'none';
}function sendBack() {
  const filteredImg = document.getElementById('filteredImg');
  
  if (!filteredImg) {
    alert('Filtered image not found.');
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = filteredImg.naturalWidth;
  canvas.height = filteredImg.naturalHeight;

  ctx.drawImage(filteredImg, 0, 0, canvas.width, canvas.height);

  ctx.filter = getComputedStyle(filteredImg).filter;
  ctx.drawImage(filteredImg, 0, 0, canvas.width, canvas.height);

  const dataURL = canvas.toDataURL('image/jpeg');  

  fetch('saveImage.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image: dataURL })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Image saved successfully!');
      closePhotoSection();
      PhotoModified();
    } else {
      alert('Failed to save image.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while saving the image.');
  });
}
