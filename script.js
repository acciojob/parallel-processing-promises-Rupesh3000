
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
// DOM elements
const btn = document.getElementById("download-images-button"); // Ensure button has this ID in HTML
const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loading = document.getElementById("loading");

btn.addEventListener("click", () => {
  // Show loading spinner
  loading.style.display = "block";
  errorDiv.innerHTML = ""; // Clear previous errors
  output.innerHTML = ""; // Clear previous images

  // Create promises for image downloads
  const downloadPromises = images.map((image) =>
    fetch(image.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to download ${image.url}`);
        }
        return response.blob();
      })
      .then((blob) => ({ url: image.url, blob }))
  );

  Promise.all(downloadPromises)
    .then((results) => {
      // Hide loading spinner
      loading.style.display = "none";
      // Display images
      results.forEach((result) => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(result.blob);
        img.alt = "Downloaded image";
        output.appendChild(img);
      });
    })
    .catch((error) => {
      // Hide loading spinner
      loading.style.display = "none";
      // Show error message
      errorDiv.innerHTML = `Error: ${error.message}`;
    });
});
