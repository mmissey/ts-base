import React from 'react';
import { Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import withImageList, { WithImageListProps } from './containers/withImageList'
import { withTranslation, WithTranslation } from 'react-i18next'; 
import ImageModal from '../view/imageRouteModal';
const ImageList: React.FC<
  WithImageListProps
& WithTranslation
& RouteComponentProps
> = ({
    images = [],
    t,
    history,
    location,
    match, 
    isLoading
}) => {
  return (
      <div className="images-page" >
        <h1>{t('heading')}</h1>
        { isLoading ? <span> Loading Images... </span> : <ul>
          {
            images.map((image) => {
              return (
              <li key={image.id}>
                <Link to={`${match.path}/view/${image.id}`}>{image.title}</Link>
              </li>);
            })

          }
        </ul>
        }
        <Route
          path={`${match.path}/view/:id`}
          render={() => (
            <ImageModal onClose={history.goBack}/>
          )}
        />
      </div>
  );
}
ImageList.displayName = "ImageList";

export default withRouter(
  withImageList(
    withTranslation('images')(ImageList)
  )
);
