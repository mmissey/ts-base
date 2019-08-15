import React from "react";
import { connect } from "react-redux";
import * as Images from "~/state/images/actions";
import { getImagesToArray } from "~/state/images/selectors";

const mapStateToProps = <T extends {}>(state: RootState, ownProps: T) => {
  const imageList = getImagesToArray(state);

  return {
    imageList
  };
};

const mapDispatchToProps = {
  fetchImages: Images.Actions.fetchImages
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface InjectedProps {
  isLoading: boolean;
}

export type WithImageListProps = StateProps & DispatchProps & InjectedProps;

const ImagesFetcher = <P extends WithImageListProps>(
  Component: React.ComponentType<P>
) =>
  class extends React.Component<P, InjectedProps> {
    static displayName = `ImagesFetcher(${Component.name})`;
    state = { isLoading: false };

    public componentDidMount() {
      if (!this.props.imageList.length && !this.state.isLoading) {
        this.props.fetchImages("wheredidthesodago");
        this.setState({ isLoading: true });
      }
    }

    public componentDidUpdate() {
      if (this.props.imageList.length && this.state.isLoading) {
        this.setState({ isLoading: false });
      }
    }

    public render() {
      return <Component {...this.props} isLoading={this.state.isLoading} />;
    }
  };

/**
 * Connecter that fetches and adds props.images[];
 * @param {React.ComponentType} Cmp React Component to be wrapped
 */
export const withImageList = <P extends Contains<WithImageListProps>>(
  Cmp: React.ComponentType<P>
) =>
  connect<StateProps, DispatchProps, Subtract<P, WithImageListProps>>(
    mapStateToProps,
    mapDispatchToProps
  )(ImagesFetcher(Cmp));

export default withImageList;
