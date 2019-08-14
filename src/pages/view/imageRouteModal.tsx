import React, { Component, FC } from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles/center-modal.module.scss';

import { ModalTransition, RouteModal } from '~/_common/routeModal';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import withImage, { WithImageProps } from '../images/containers/withImage';

export interface ImageModalProps {
  onClose: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

export class ImageRouteModal extends Component<
ImageModalProps
& RouteComponentProps<{id: string}>
& WithImageProps
> {
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

export default withRouter(
  withImage(ImageRouteModal)
);