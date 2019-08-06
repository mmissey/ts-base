import React from 'react';
import { connect } from 'react-redux';
import * as Images from '~/state/images/actions';
import { getImagesToArray } from '~/state/images/selectors';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type WithImagesProps = StateProps & DispatchProps;

const mapStateToProps = <T extends {}>(state: RootState, ownProps: T) => {
  const images = getImagesToArray(state);

  return {
    images
  }
};

const mapDispatchToProps = {
  fetchImages: Images.Actions.fetchImages
};

const ImagesFetcher = <P extends {}>(Component: React.ComponentType<P>) =>
  class extends React.Component<P & WithImagesProps> {
    public componentDidMount() {
      if (!this.props.images.length) {
        this.props.fetchImages('wheredidthesodago');
      }
    }

    public render() {
      return <Component {...this.props} />;
    }
  };

/**
 * Connecter that fetches and adds props.images[];
 * @param {React.ComponentType} Cmp React Component to be wrapped
 */
export const withImages = <P extends any>(Cmp: React.ComponentType<P>) =>
  connect<StateProps, DispatchProps, Subtract<P, WithImagesProps>>(
    mapStateToProps,
    mapDispatchToProps,
  )(ImagesFetcher(Cmp));

export default withImages;
