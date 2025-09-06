
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
// DOM elements
const btn = document.getElementById("download-images-button");
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
    fetch(image.url).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to download ${image.url}`);
      }
      return image.url; // Return original URL
    })
  );

  Promise.all(downloadPromises)
    .then((urls) => {
      // Hide loading spinner
      loading.style.display = "none";
      // Display images using original URLs
      urls.forEach((url) => {
        const img = document.createElement("img");
        img.src = url; // Use original URL
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
