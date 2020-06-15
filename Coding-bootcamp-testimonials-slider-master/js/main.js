const slider = document.querySelector('.slider');
const sliderText = document.querySelector('.testimonials__body');
const sliderImg = document.querySelector('.testimonials__image-wrapper');
const sliderData = [
    {
        text: `“ I’ve been interested in coding for a while but never taken the jump, until now.
        I couldn’t recommend this course enough. I’m now in the job of my dreams and so
        excited about the future. ”`,
        author: 'Tanya Sinclair',
        position: 'UX Engineer',
        img: './images/image-tanya.jpg'
    },
    {
        text: `“ If you want to lay the best foundation possible I’d recommend taking this course.
        The depth the instructors go into is incredible. I now feel so confident about
        starting up as a professional developer. ”`,
        author: 'John Tarkpor',
        position: 'Junior Front-end Developer',
        img: './images/image-john.jpg'
    }
]

/* -----------------------------Slider---------------------------- */

class Slider {
    constructor(textWrapper, imgWrapper, data) {
        this.textWrapper = textWrapper;
        this.imgWrapper = imgWrapper;
        this.data = data;
        this.currentSlide = -1;
    }

    textToHTML(slide) {
        return `        
    <blockquote class="testimonials__text">${slide.text}</blockquote>
    <div class="testimonials__autor">
        <span class="testimonials__autor-name">${slide.author}</span>
        <span class="testimonials__autor-position">${slide.position}</span>
    </div>`;
    }

    imgToHTML(slide) {
        return `<img src=${slide.img} alt=${slide.author}>`;
    }

    nextSlide() {
        this.currentSlide += 1;
        if (this.currentSlide >= this.data.length) {
            this.currentSlide = 0;
        }

        const text = this.textToHTML(this.data[this.currentSlide]);
        const img = this.imgToHTML(this.data[this.currentSlide]);
        this.textWrapper.innerHTML = text;
        this.imgWrapper.innerHTML = img;
    }

    prevSlide() {
        this.currentSlide -= 1;
        if (this.currentSlide < 0) {
            this.currentSlide = this.data.length - 1;
        }

        const text = this.textToHTML(this.data[this.currentSlide]);
        const img = this.imgToHTML(this.data[this.currentSlide]);
        this.textWrapper.innerHTML = text;
        this.imgWrapper.innerHTML = img;
    }
}

let newSlider = new Slider(sliderText, sliderImg, sliderData);

newSlider.nextSlide();


/* --------------------Control buttons---------------------- */

const nextBtn = document.querySelector('.testimonials__next-btn');
const prevBtn = document.querySelector('.testimonials__prev-btn');

/* Listeners */

nextBtn.addEventListener('click', () => {
    newSlider.nextSlide();
});

prevBtn.addEventListener('click', () => {
    newSlider.prevSlide();
});