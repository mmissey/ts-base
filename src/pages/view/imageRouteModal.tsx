import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles/center-modal.module.scss';

import { ModalTransition, RouteModal } from '~/_common/routeModal';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import withImage, { WithImageProps } from '../images/containers/withImage';

export interface ImageModalProps extends RouteComponentProps<{id: string}> {
  onClose: (evt: any) => void;
}

const evaluateRenderProp: (
  prop: string | React.ReactNode | (() => React.ReactNode)
) => React.ReactNode = prop => {
  return prop instanceof Function ? prop() : prop;
};

export class CenterModal extends Component<
ImageModalProps
& WithImageProps
> {
  public componentDidUpdate(prevProps: ImageModalProps) {
    // modalWillReceiveProps(this.props, prevProps);
  }

  public render() {
    const { onClose, image, location: { pathname } } = this.props;
    const isOpen = pathname === '/view/:id';

    return image ? ReactDOM.createPortal(
        <div className={'image-modal' }>
            <div className="title">{image.title}</div>
            <img src={image && image.link} width={image.width} height={image.height}/>
            <div className={`modal-mask ${isOpen ? 'is-visible' : ''}`} onClick={onClose}/>
        </div>,
      document.body
    ) : '';
  }
}

export default withRouter(withImage(CenterModal));