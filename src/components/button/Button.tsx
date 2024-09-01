import { Text } from 'components/text';

import styles from './Button.module.scss';

import { CSSProperties } from 'react';

interface CustomCSSProperties extends CSSProperties {
	[key: `--${string}`]: string | number ; 
  }

export const Button = ({
	title,
	onClick,
	type,
	style,
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	style?:CustomCSSProperties
}) => {
	return (
		<button className={styles.button} type={type} onClick={onClick} style={style}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
