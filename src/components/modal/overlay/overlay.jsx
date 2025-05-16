import styles from './overlay.module.css';

export const Overlay = ({ content }) => {
	// eslint-disable-next-line no-undef
	return <div className={styles.overlay}>{content}</div>;
};
