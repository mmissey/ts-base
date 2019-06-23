import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import { Route, Switch } from 'react-router-dom';

interface ModalTransitionProps {
  'in': boolean;
  children?: React.ReactNode;
  onClose: (e: React.MouseEvent<any>) => void;
  onOpen?: () => void;
  modalProps: any;
}

type TransitionState =
  'entering'
| 'entered'
| 'exiting'
| 'exited';

export const ModalTransition: (k: React.ComponentType, opts?: { enter?: number, exit?: number }) =>
React.ComponentType<ModalTransitionProps> = (ModalType, { enter = 0, exit = 500 } = {}) =>
  class InnerModalTransition extends Component<ModalTransitionProps> {
    public componentDidUpdate(prevProps: ModalTransitionProps) {
      const { onOpen, in: nowIn } = this.props;
      const { in: prevIn } = prevProps;

      if (onOpen && nowIn && (prevIn !== nowIn)) { onOpen(); }
    }

    public render() {
      const { in: inProp, children, onClose, modalProps } = this.props;
      return (
        <Transition in={inProp} mountOnEnter unmountOnExit timeout={{ enter, exit }}>
          {
            (transitionState: TransitionState) => {
              const open = transitionState === 'entered';

              return (
                <ModalType
                  className='route-modal'
                  onClose={onClose}
                  open={open}
                  isOpen={open}

                  {...modalProps}
                >
                  {children}
                </ModalType>
              );
            }
          }
        </Transition>
      );
    }
  };


interface RouteComponentPropTypes {
  path: string;
  exact?: boolean;
  children?: React.ReactNode[];
  onClose: (e: React.MouseEvent<any>) => void;
  onOpen?: () => void;
}

export const RouteModal: (k: React.ComponentType<ModalTransitionProps>) =>
React.ComponentType<RouteComponentPropTypes> = (ModalTransitionType) => {
  const routedComponent = (props: RouteComponentPropTypes) => {
    const { path, children, onClose, onOpen, exact = false, ...rest } = props;
    return (
    <Switch>
      <Route
        exact={exact}
        path={path}
        render={() => (
          <ModalTransitionType in onClose={onClose} onOpen={onOpen} modalProps={rest}>
            {children}
          </ModalTransitionType>
        )}
      />
      <Route
        exact={exact}
        render={() => (
          <ModalTransitionType in={false} onClose={onClose} modalProps={rest}>
            {children}
          </ModalTransitionType>
        )}
      />
    </Switch>);
  };
  return routedComponent;
};