const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const courseApi = 'https://dog.ceo/api/breeds/image/random/6';

const imagesItem = $$('.slide-item');
const slider = $('.slider');

let currentSlideIndex = 0;
const imagesUrl = [];

// Fetch api
const getImages = (callback) => {
    fetch(courseApi)
    .then((response) => response.json())
    .then(callback);
}

// Get image from api -> render to layout
const renderImages = (images) => {
    imagesItem.forEach((item, index) => {
        const imageUrl = images.message[index];
        item.style.backgroundImage = `url('${imageUrl}')`;
        imagesUrl.push(`url('${imageUrl}')`); // Store image URLs as strings
    });
}

// Event handling
const handleEvent = () => {
    imagesItem.forEach((item, index) => {
        // Add class 'opacity' for other slide-item 
        item.addEventListener('mouseenter', () => {
            imagesItem.forEach((item, idx) => {
                if (idx !== index) {
                    item.classList.add('opacity');
                }
            });
        });
        // Remove class 'opacity' when mouse leaves slide-item
        item.addEventListener('mouseleave', () => {
            imagesItem.forEach((item) => {
                item.classList.remove('opacity');
            });
        });
    });

  // handle scroll event
  let isScrolling = false;
  slider.addEventListener('wheel', (event) => {
      if (!isScrolling) {
        isScrolling = true;

        const delta = Math.sign(event.deltaX);

        if (delta < 0) { // Scroll to the right
            currentSlideIndex--;

            if (currentSlideIndex < 0) {
                currentSlideIndex = 5;
            }
        } else if (delta > 0) { // Scroll to the left
            currentSlideIndex++;

            if (currentSlideIndex >= imagesItem.length) {
                currentSlideIndex = 0;
            }
        }

        imagesItem.forEach((item, index) => {
            const newIndex = (currentSlideIndex + index) % 6;
            item.style.backgroundImage = imagesUrl[newIndex];
        });
      }

      setTimeout(() => {
          isScrolling = false;
      }, 200); // Reduce execution speed
  });
}

const start = () => {
    getImages(renderImages);
    handleEvent();
}

start();
