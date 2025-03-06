
import React from "react";

interface YachtGalleryProps {
  images: string[];
  name: string;
}

const YachtGallery = ({ images, name }: YachtGalleryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="rounded-xl overflow-hidden h-[400px]">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 h-[400px]">
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden relative"
          >
            <img
              src={image}
              alt={`${name} ${index + 2}`}
              className="w-full h-full object-cover"
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  +{images.length - 5} photos
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YachtGallery;
