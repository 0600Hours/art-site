import "react-responsive-carousel/lib/styles/carousel.min.css"; // carousel css helpers
import { Carousel } from 'react-responsive-carousel';
import img1 from '../img/1.png'; // i know, i know.
import img2 from '../img/2.png';
import img3 from '../img/3.png';
import img4 from '../img/4.png';
import img5 from '../img/5.png';
import img6 from '../img/6.png';
import img7 from '../img/7.png';
import img8 from '../img/8.png';
import img9 from '../img/9.png';
import img10 from '../img/10.png';
import img11 from '../img/11.png';
import img12 from '../img/12.png';
import img13 from '../img/13.png';
import img14 from '../img/14.png';
import img15 from '../img/15.png';
import img16 from '../img/16.png';
import img17 from '../img/17.png';
import { ReactNode } from "react";

const IMAGE_FOLDER = '../img';
const IMAGE_COUNT = 14;

// TODO: use webpack to dynamically import the whole folder of images
// const images = [...Array(IMAGE_COUNT).keys()].map(i => {
//     return {
//         id: i + 1,
//         src: `${IMAGE_FOLDER}/${i + 1}.png`
//     }
// })

const images = [
    {
        id: 1,
        src: img1,
    },
    {
        id: 16,
        src: img16,
    },
    {
        id: 17,
        src: img17,
    },
    {
        id: 2,
        src: img2,
    },
    {
        id: 3,
        src: img3,
    },
    {
        id: 4,
        src: img4,
    },
    {
        id: 5,
        src: img5,
    },
    {
        id: 6,
        src: img6,
    },
    {
        id: 7,
        src: img7,
    },
    {
        id: 8,
        src: img8,
    },
    {
        id: 9,
        src: img9,
    },
    {
        id: 10,
        src: img10,
    },
    {
        id: 11,
        src: img11,
    },
    {
        id: 12,
        src: img12,
    },
    {
        id: 13,
        src: img13,
    },
    {
        id: 14,
        src: img14,
    },
    {
        id: 15,
        src: img15,
    }
]

function onClickItem(index: number, item: ReactNode,) {
    window.open(images[index].src, '_blank', 'noopener,noreferrer')
}

export default function Portfolio() {
    console.log(images)
    return (
        <div id='portfolio'>
            <Carousel
                autoFocus={true}
                autoPlay={false}
                infiniteLoop={true}
                onClickItem={onClickItem}
            >
                {images.map(img => {
                    return (
                        <div className='image-wrapper' key={img.id}>
                            <img src={img.src} className='portfolio-image' />
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}