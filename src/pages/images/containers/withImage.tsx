import React from "react";
import { connect } from "react-redux";
import * as Images from "~/state/images/actions";
import { RouteComponentProps, withRouter } from "react-router-dom";

const mapStateToProps = (state: RootState, ownProps: any) => {
  const imageID = ownProps.match.params.id;
  return {
    image: state.images[imageID]
  };
};

// const mapStateToProps = <T extends { match: { params: { id: string } } }>(
//   state: RootState,
//   ownProps: T
// ) => {
//   const imageID = ownProps.match.params.id;
//   return {
//     image: state.images[imageID]
//   };
// };

// type RequiredProps = RouteComponentProps<{ id: string }>;
// const mapStateToProps = <T extends RequiredProps>(
//   state: RootState,
//   ownProps: T
// ) => {
//   const imageID = ownProps.match.params.id;
//   return {
//     image: state.images[imageID]
//   };
// };

type StateProps = ReturnType<typeof mapStateToProps>;
export type WithImageProps = StateProps; //&& DispatchProps;

/**
 * Connecter that fetches and adds props.image;
 * @param {React.ComponentType} Cmp React Component to be wrapped
 */
export const withImage = (Cmp: React.ComponentType) =>
  connect(mapStateToProps)(Cmp);

// export const withImage = <P extends RequiredProps>(
//   Cmp: React.ComponentType<P>
// ) =>
//   connect<StateProps, null, Subtract<P, WithImageProps>>(mapStateToProps)(
//     Cmp as React.ComponentType<RequiredProps>
//   ); // ^^ little bit of a hack to force proper typing :\ ^^

// import { ImageRouteModal } from "../../view/imageRouteModal";
// const ConnectedModal = withRouter(withImage(ImageRouteModal));
// <ConnectedModal onClose={(evt: any) => {}} />;

export default withImage;
