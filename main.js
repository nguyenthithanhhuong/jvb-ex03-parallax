const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const courseApi = 'https://dog.ceo/api/breeds/image/random/6';

const imagesItem = $$('.slide-item');
const slider = $('.slider');

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
        imagesUrl.push(`url('${imageUrl}')`);
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
}

// Initialize Swiper
const initSwiper = () => {
    new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        mousewheel: {
            forceToAxis: true,
        },
        grabCursor: true,
    });
}

const start = () => {
    getImages(renderImages);
    handleEvent();
    initSwiper();
}

start();
