import styles from './overlay.module.css';

export const Overlay = ({ content, onClick }) => {
	// eslint-disable-next-line no-undef
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className={styles.overlay} onClick={onClick}>
			{content}
		</div>
	);
};
