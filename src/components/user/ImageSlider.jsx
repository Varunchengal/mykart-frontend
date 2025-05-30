import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import smartwatch from '../../images/Mykart Project slider image.webp'
import smartphone from '../../images/smartphone.webp'
import laptop from '../../images/laptop.webp'

const products = [
  {
    image: `${smartwatch}`,
  },
  {
    image: `${smartphone}`,
    // price: "From ₹11,499"
  },
  {
    image: `${laptop}`,
    // price: "From ₹8,999"
  }
];

export default function ImageSlider() {
  return (
    <div className="max-w-4xl h-100px mx-auto p-4">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        swipeable
        emulateTouch
        dynamicHeight={false}
        showArrows
      >
        {products.map((product, index) => (
          <div
            key={index}
            // className="bg-gray-100 rounded-lg overflow-hidden shadow-md relative"
          >
            <img
              src={product.image}
              alt={product.title}
              className="object-cover w-full h-64"
            />
            {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-sm">{product.price}</p>
            </div> */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};


