import { useEffect, useState } from "react";
import image from "../../Assests/images/figure2.png";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const Slider = () => {
  const images = [image, image, image, image];
  const totalImages = images.length;
  const [curr, setCurr] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? totalImages - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === totalImages - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (paused) return;
    const sliding = setTimeout(next, 3000);
    return () => clearTimeout(sliding);
  }, [curr, paused]);

  return (
    <div
      className="overflow-hidden relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${curr * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full flex-shrink-0"
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20"
        >
          <FaChevronLeft color="white" size={20} />
        </button>
        <button
          onClick={next}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20"
        >
          <FaChevronRight color="white" size={20} />
        </button>
        <div className="absolute bottom-3 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`transition-all w-2 h-2 bg-main-clr rounded-full  ${
                  curr === i ? "p-1" : "bg-white/20"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
