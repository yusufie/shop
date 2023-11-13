import Image from "next/image";
import styles from "./detailslider.module.css";
import Carousel from 'react-multi-carousel';
import './detailslider.css';


interface DetailSliderProps {
  responseData: any;
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

const CustomDot = ({ index, onClick, active, carouselState: { currentSlide, deviceType }, items }: any) => {
  return (
    <li data-index={index} key={index} onClick={() => onClick()} onKeyDown={() => onClick()} tabIndex={0}
      className={`${styles.customDot} ${active && styles.customDotActive}`}
    >
      <Image
        src={items ? items[index] : ''}
        alt={`Slide ${index + 1}`}
        width={80}
        height={60}
        className={styles.customDotImage}
      />
    </li>
  );
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024,},
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0, },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 200, },
    items: 1,
  },
};

const DetailSlider: React.FC<DetailSliderProps> = ({ responseData }) => {

  let deviceType = 'desktop'; // Default device type
  // console.log(responseData)

  return (
    <Carousel
      showDots
      ssr
      responsive={responsive}
      infinite={false}
      slidesToSlide={1}
      deviceType={deviceType}
      autoPlay={false}
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      renderDotsOutside={true}
      customDot={<CustomDot items={responseData.images}/>}
      containerClass="custom-carousel-container-detail"
      dotListClass="custom-dot-list-detail"
      itemClass="custom-carousel-item-detail"
    >
      {responseData.images.map((image: string, index: number) => (
        <div key={index} className={styles.detailslider}>
          <Image
            src={image}
            key={index}
            alt={`Slide ${index + 1}`}
            width={450}
            height={450}
            className={styles.productImage}
          />
        </div>
      ))}

    </Carousel>
  );
};

export default DetailSlider;
