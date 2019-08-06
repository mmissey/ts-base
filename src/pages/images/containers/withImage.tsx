import React from 'react';
import { connect } from 'react-redux';
import * as Images from '~/state/images/actions';
import { RouteComponentProps } from 'react-router-dom';

interface RequiredProps extends RouteComponentProps<{id: string}>{}
type StateProps = ReturnType<typeof mapStateToProps>;
export type WithImageProps = StateProps;

const mapStateToProps = <T extends {}>(state: RootState, ownProps: T & RequiredProps) => {
    const imageID = ownProps.match.params.id;
    return {
        image: state.images[imageID]
    }
};

/**
 * Connecter that fetches and adds props.image;
 * @param {React.ComponentType} Cmp React Component to be wrapped
 */
export const withImage = <P extends any>(Cmp: React.ComponentType<P>) =>
    connect<StateProps, null, Subtract<P, WithImageProps>>(
        mapStateToProps
    )(Cmp);

export default withImage;
