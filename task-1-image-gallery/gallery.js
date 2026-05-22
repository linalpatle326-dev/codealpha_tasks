const images = document.querySelectorAll(".gallery img");

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");

const closeBtn = document.getElementById("closeBtn");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 0;

// Open Popup

images.forEach((img, index) => {

    img.addEventListener("click", () => {

        currentIndex = index;

        popup.style.display = "flex";

        popupImg.src = images[currentIndex].src;

    });

});

// Close Popup

closeBtn.addEventListener("click", () => {

    popup.style.display = "none";

});

// Next Image

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if(currentIndex >= images.length){
        currentIndex = 0;
    }

    popupImg.src = images[currentIndex].src;

});

// Previous Image

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = images.length - 1;
    }

    popupImg.src = images[currentIndex].src;

});
