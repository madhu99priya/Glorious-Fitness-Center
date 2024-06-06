
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Gallery.css'
import { Navigation,Pagination, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper'
import Slider1 from '../../assets/slider1.jpg'
import Slider2 from '../../assets/slider2.jpg'
import Slider3 from '../../assets/slider3.jpg'
import Slider4 from '../../assets/slider4.jpg'
import Slider5 from '../../assets/slider5.jpg'

SwiperCore.use([Navigation, Pagination, Autoplay]);

const ImageGallery = () => {
  const images = [
    Slider1,
    Slider2,
    Slider3,
    Slider4,
    Slider5
  ];

  return (
    <div className="image-gallery">
      <div className='programs_header'>
        <span>Image</span>
        <span className='stroke-text'>Gallery</span>
      </div>

        <Swiper
            spaceBetween={30}
            slidesPerView={3}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            centeredSlides={true}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
        >
            {images.map((image, index) => (
            <SwiperSlide key={index} className='image-container'>
                <img src={image} alt={`Gallery Image ${index + 1}`} />
            </SwiperSlide>
            ))}
        </Swiper>
      </div>
  );
};

export default ImageGallery;


