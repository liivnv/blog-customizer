import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type arrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
}

export const ArrowButton = (props: arrowButtonProps) => {
	const {onClick, isOpen} = props;

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpen && styles.container_open)}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow, isOpen && styles.arrow_open)}/>
		</div>
	);
};
