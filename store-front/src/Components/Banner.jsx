import { useEffect, useState } from 'react'
import banner1 from '../images/banner-img1.png'
import banner2 from '../images/slide_cows.jpg'
import banner3 from '../images/banner-img2.jpg'

const Banner = () => {
  const [slideX, setSlideX] = useState(-100);  
  const [slides, setSlides] = useState([
    {
      link: '/product1',
      img: banner1
    },
    {
      link: '/product2',
      img: banner2
    },
    {
      link: '/product3',
      img: banner3,
      objectPosition: 'center 100%'
    },
  ]);

  const updateSlide = (percentage) => {
    setSlideX((prevSlideX) => {
      let newSlideX = prevSlideX - percentage;
      if (newSlideX < -100 * (slides?.length - 1)) {
        newSlideX = 0;
      } else if(newSlideX > 0) {
        newSlideX = -100 * (slides?.length - 1);
      }
       return newSlideX;
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
     updateSlide(100);
    }, 5000);
    return () => clearInterval(interval);

  }, [slideX])

  return (
    <div className="main-banner container">
      {
        slides.length > 1 ? 
        <>
          <div className="arrow-left" onClick={() => updateSlide(-100)}>
            <i className="fa-solid fa-chevron-left fa-2x"></i>
          </div>
          <div className="arrow-right" onClick={() => updateSlide(+100)}>
            <i className="fa-solid fa-chevron-right fa-2x"></i>
          </div>
        </> : <></>
      }
      {
        slides.map((slide, i) => {
          return(
            <div 
              key={i} 
              style={{transform: `translateX(${slideX}%)`}}
              className="banner-slide"
            >
              <a href={slide.link} >
                <img 
                  style={{objectPosition: slide?.objectPosition}}
                  src={slide.img} 
                  alt="cute fluffy toys" 
                />
              </a>
            </div>
          )
        })
      }
    </div>
  )
}

export default Banner;