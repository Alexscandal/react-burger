import ReactDOM from 'react-dom';
import { Overlay } from '@components/modal/overlay/overlay.jsx';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

export const Modal = ({ content, header, onClose, isOpen }) => {
	const closeOnEscapePressed = (e) => {
		if (e.key === 'Escape') {
			onClose(e);
		}
	};
	// eslint-disable-next-line import/no-named-as-default-member
	React.useEffect(() => {
		document.addEventListener('keydown', closeOnEscapePressed);
		return () => document.addEventListener('keydown', closeOnEscapePressed);
	}, []);

	// eslint-disable-next-line no-undef
	const cont = (
		<div className={styles.modal}>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a href='#' onClick={onClose}>
				<CloseIcon type='primary' className={styles.close} />
			</a>
			<div className={styles.modal_header}>{header}</div>
			<div>{content}</div>
		</div>
	);
	// eslint-disable-next-line import/no-named-as-default-member
	return ReactDOM.createPortal(
		isOpen && <Overlay content={cont} onClick={onClose} />,
		modalRoot
	);
};

Modal.propTypes = {
	content: PropTypes.string,
};
