import { createPortal } from 'react-dom';
import { Overlay } from '@components/modal/overlay/overlay.tsx';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
type TModal = {
	content: React.JSX.Element | null;
	header: string;
	onClose: (e: KeyboardEvent | React.MouseEvent<HTMLElement>) => void;
	isOpen: boolean;
};

const modalRoot: HTMLElement | null = document.getElementById('react-modals')!;

export const Modal = ({ content, header, onClose, isOpen }: TModal) => {
	const closeOnEscapePressed = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose(e);
		}
	};
	useEffect(() => {
		document.addEventListener('keydown', closeOnEscapePressed);
		return () => document.addEventListener('keydown', closeOnEscapePressed);
	}, []);

	return createPortal(
		isOpen && (
			<div className={styles.modal_container} data-testid='modal'>
				<Overlay onClick={onClose} />
				<div className={styles.modal}>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a href='#' onClick={onClose} data-testid='close-modal'>
						<CloseIcon type='primary' className={styles.close} />
					</a>
					<div className={styles.modal_header} data-testid='modal-header'>
						{header}
					</div>
					<div>{content}</div>
				</div>
			</div>
		),
		modalRoot
	);
};
