"use client";

import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/lib/styles.min.css';

const ProductImage = ({ src }: { src: string }) => {
  return (
   <div className="w-full max-w-xl md:max-w-2xl">

      <InnerImageZoom
        src={src}
        zoomSrc={src}
        zoomType="hover"
        //  zoomScale={2.4} 
        hideHint
      />
    </div>
  );
};

export default ProductImage;
