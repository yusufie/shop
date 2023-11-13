"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import styles from "./homeslider.module.css";
import './homeslider.css';

interface imageProps {
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
}

const CustomLeftArrow = ({ onClick = () => {} }) => {
  return <button className={styles.leftArrow} onClick={onClick}>
    <Image src={"/icons/arrow-prev.svg"} alt="prev" width={20} height={20}  />
    </button>;
};

const CustomRightArrow = ({ onClick = () => {} }) => {
  return <button className={styles.rightArrow} onClick={onClick}>
    <Image src={"/icons/arrow-next.svg"} alt="next" width={20} height={20} />
  </button>;
};

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1800 },
    items: 4,
  },
  laptop: {
    breakpoint: { max: 1800, min: 1200 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1200, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

const HomeSlider: React.FC<imageProps> = ({ images }) => {
  return (
    
      <Carousel
        ssr={true}
        responsive={responsive}
        showDots={false}
        infinite={false}
        autoPlay={false}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        containerClass="custom-carousel-container-home"
        dotListClass="custom-dot-list-home"
        itemClass="custom-carousel-item-home "
      >
        
        {images.map((image, index) => (
          <div key={index} className={styles.homeslider}>
            <Image
              src={image.src}
              alt={`Slide ${index + 1}`}
              width={580}
              height={270}
              className={styles.sliderImage}
            />
          </div>
        ))}
      </Carousel>
  );
};

export default HomeSlider;
