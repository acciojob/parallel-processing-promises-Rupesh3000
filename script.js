const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
    
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(Failed to load image at ${url});
    });
}

function downloadImages(urls) {
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const outputDiv = document.getElementById('output');

    // Show the loading spinner
    loadingDiv.style.display = 'block';
    errorDiv.innerHTML = ''; 
    outputDiv.innerHTML = ''; 

    const downloadPromises = urls.map(obj => downloadImage(obj.url));

    Promise.all(downloadPromises)
        .then(images => {
            
            loadingDiv.style.display = 'none';

            
            images.forEach(img => {
                outputDiv.appendChild(img);
            });
        })
        .catch(error => {
            
            loadingDiv.style.display = 'none';
            errorDiv.innerHTML = error; 
        });
}


downloadImages(images);