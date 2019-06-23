import React from 'react';
import { connect } from 'react-redux';
import * as Images from '../../../state/images/actions';
import { RouteComponentProps } from 'react-router-dom';

interface RequiredProps extends RouteComponentProps<{id: string}>{}

const mapStateToProps = <T extends {}>(state: RootState, ownProps: T & RequiredProps) => {
    const imageID = ownProps.match.params.id;
    return {
        image: state.images[imageID]
    }
};


type StateProps = ReturnType<typeof mapStateToProps>;
export type WithImageProps = StateProps;


/**
 * Connecter that fetches and adds props.images[];
 * @param {React.ComponentType} Cmp React Component to be wrapped
 */
export const withImage = <P extends any>(Cmp: React.ComponentType<P>) =>
    connect<StateProps, null, Subtract<P, WithImageProps>>(
        mapStateToProps
    )(Cmp);

export default withImage;