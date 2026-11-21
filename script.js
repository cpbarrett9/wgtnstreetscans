// Setting the nav background to a random scan.
const randomScanID = Math.floor(Math.random() * 74);
document.getElementById("nav").style.backgroundImage = `url('imgs/scan${randomScanID}.JPG')`;

const scanContainer = document.getElementById("scanContainer");
const detailsWindow = document.getElementById("scanDetailsWindow");

if (detailsWindow) {
    const detailImage = document.getElementById("detailImage");
    const downloadLink = document.getElementById("download");
    const galleryStatus = document.getElementById("galleryStatus");

    document.getElementById("closeWindow").addEventListener("click", () => {
        detailsWindow.close();
    });

    detailsWindow.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            event.preventDefault();
            detailsWindow.close();
        }
    });

    fetch("scans.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load scans: HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(scans => {
            for (const scan of scans) {
                const image = document.createElement("img");
                image.src = scan.image_path;
                image.className = "scan";
                image.id = scan.id;
                image.alt = scan.location;
                image.tabIndex = 0;
                image.setAttribute("role", "button");
                const openDetails = () => {
                    detailImage.src = scan.image_path;
                    detailImage.alt = scan.location;
                    document.getElementById("locationText").textContent = scan.location;
                    document.getElementById("dateText").textContent = scan.date;
                    document.getElementById("dimensionsText").textContent = scan.dimensions;
                    detailsWindow.style.backgroundImage = `url('${scan.image_path}')`;
                    downloadLink.download = `scan${scan.id}.JPG`;
                    downloadLink.href = scan.image_path;
                    detailsWindow.showModal();
                    detailsWindow.scrollTop = 0;
                };
                image.addEventListener("click", openDetails);
                image.addEventListener("keydown", event => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openDetails();
                    }
                });
                scanContainer.appendChild(image);
            }
            galleryStatus.remove();
        })
        .catch(error => {
            console.error(error);
            galleryStatus.textContent = "Could not load scans. Please try again later.";
        });
}
