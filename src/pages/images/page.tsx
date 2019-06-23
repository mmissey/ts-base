import React from 'react';
import { Route } from 'react-router-dom';
import withImages, { WithImagesProps } from './containers/withImages'
import { withTranslation, WithTranslation } from 'react-i18next'; 

const Images: React.FC<
  WithImagesProps
& WithTranslation
> = ({
    images = [],
    t
}) => {
  return (
      <div className="images-page" >
        <h1>{t('heading')}</h1>
        {
          images.map((image) => {
            return (<img src={image.link} />);
          })
        }
      </div>
  );
}

export default withImages(withTranslation('images')(Images));
