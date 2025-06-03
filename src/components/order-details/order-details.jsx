import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

export const OrderDetails = () => {
	const { orderNum } = useSelector((store) => ({
		orderNum: store.order.orderNum,
	}));

	return (
		<div className={styles.order}>
			<div className='text text_type_digits-large'>{orderNum}</div>
			<h3 className='mt-8'>идентификатор заказа</h3>
			<div className={`${styles.icon} mt-15 mb-15`}>
				<CheckMarkIcon type='primary' />
			</div>
			<p className='mb-2'>Ваш заказ начали готовить</p>
			<p className={styles.info}>Дождитесь готовности на орбитальной станции</p>
		</div>
	);
};
