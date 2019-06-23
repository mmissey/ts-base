import React from 'react';
import { Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import withImages, { WithImagesProps } from './containers/withImages'
import { withTranslation, WithTranslation } from 'react-i18next'; 
import ImageModal from '../view/imageRouteModal';
const Images: React.FC<
  WithImagesProps
& WithTranslation
& RouteComponentProps
> = ({
    images = [],
    t,
    history,
    location,
    match 
}) => {
  return (
      <div className="images-page" >
        <h1>{t('heading')}</h1>
        <ul>
        {
          images.map((image) => {
            return (
            <li key={image.id}>
              <Link to={`${match.path}/view/${image.id}`}>{image.title}</Link>
            </li>);
          })

        }
        </ul>
        <Route
          path={`${match.path}/view/:id`}
          render={() => (
            <ImageModal onClose={history.goBack}/>
          )}
        />
      </div>
  );
}

export default withRouter(
  withImages(
    withTranslation('images')(Images)
  )
);
