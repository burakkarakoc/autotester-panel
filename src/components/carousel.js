import React, { useState } from "react";

const items = [
  {
    src: "https://static.vecteezy.com/system/resources/previews/003/462/493/original/abstract-futuristic-face-concept-artificial-intelligence-background-free-vector.jpg",
    altText: "Slide 1",
    caption: "caption1",
    key: 1,
  },
  {
    src: "https://static.vecteezy.com/system/resources/previews/003/462/493/original/abstract-futuristic-face-concept-artificial-intelligence-background-free-vector.jpg",
    altText: "Slide 2",
    caption: "Slide 2",
    key: 2,
  },
  {
    src: "https://static.vecteezy.com/system/resources/previews/003/462/493/original/abstract-futuristic-face-concept-artificial-intelligence-background-free-vector.jpg",
    altText: "Slide 3",
    caption: "Slide 3",
    key: 3,
  },
];

function MyCarousel(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        // style={{ height: "100%" }} // Set CarouselItem height to 100%
      >
        <img
          src={item.src}
          alt={item.altText}
          style={{
            maxHeight: "100vh", // Maximum height of the viewport
            // width: "100%", // Take full width of the Carousel
            objectFit: "cover", // Maintain aspect ratio, but cover the area
          }}
        />
        <CarouselCaption
          captionHeader={item.caption}
          captionText={item.caption}
          // captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      {/* <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      /> */}
    </Carousel>
  );
}

export default MyCarousel;
