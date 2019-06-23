import React from 'react';
import { Route } from 'react-router-dom';
import withImages, { WithImagesProps } from './containers/withImages'
const Images: React.FC<WithImagesProps> = ({
    images = []
}) => {
  return (
      <div className="main-container" >
        {images.map((image) => {
          return (<img src={image.link} />);
        })
      }
      </div>
  );
}

export default withImages(Images);
