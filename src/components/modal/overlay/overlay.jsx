import styles from './overlay.module.css';
import PropTypes from 'prop-types';

export const Overlay = ({ content, onClick }) => {
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className={styles.overlay} onClick={onClick}>
			{content}
		</div>
	);
};

Overlay.propTypes = {
	// eslint-disable-next-line import/no-named-as-default-member
	content: PropTypes.object,
};
