import styles from './overlay.module.css';
import React from 'react';
type TOverlay = {
	content: React.JSX.Element;
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Overlay = ({ content, onClick }: TOverlay) => {
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className={styles.overlay} onClick={onClick}>
			{content}
		</div>
	);
};
