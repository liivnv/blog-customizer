import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions, 
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState
}
from '../../constants/articleProps'
import {useClickClose} from './hooks/useClickClose'

import styles from './ArticleParamsForm.module.scss';

import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

export type articleParamsFormProps = {
	setAppState: (appState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: articleParamsFormProps) => {

	const {setAppState} = props;

	const formRef = useRef<HTMLFormElement | null>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

	const handleChange = (inputName: string) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[inputName]: value,
			}));
		}
	}

	const handleClose = () => {
		setIsOpen(!isOpen)
	}

	useClickClose({
		isOpen: isOpen,
		onClose: handleClose,
		rootRef: formRef,
	});

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setFormState(defaultArticleState);
		setAppState(defaultArticleState);
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setIsOpen(false);
		setAppState(formState);
	}

	return (
		<>
			<ArrowButton onClick={() => {setIsOpen(!isOpen)}} isOpen={isOpen} />
			<aside ref={formRef} className={clsx(styles.container, isOpen && styles.container_open)}>
				<form 
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
				>
					<Text
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
						as = {'h3'}
						children={'Задайте параметры'}
					/>
					<Select 
						selected={formState.fontFamilyOption} 
						options={fontFamilyOptions} 
						onChange = {handleChange('fontFamilyOption')}
						title='шрифт'
					/>
					<RadioGroup 
						options={fontSizeOptions} 
						name='test' 
						selected={formState.fontSizeOption} 
						onChange = {handleChange('fontSizeOption')}
						title='размер шрифта'
					/>
					<Select 
						selected={formState.fontColor} 
						onChange = {handleChange('fontColor')}
						options={fontColors} 
						title='цвет шрифта'
					/>
					<Separator/>
					<Select 
						selected={formState.backgroundColor} 
						onChange = {handleChange('backgroundColor')}
						options={backgroundColors} 
						title='цвет фона'
					/>
					<Select 
						selected={formState.contentWidth} 
						onChange = {handleChange('contentWidth')}
						options={contentWidthArr} 
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' style={{
								'--button-hover-invert': '100%'
							}}/>
						<Button
							title="Применить"
							type="submit"
							style={{
								'--button-bg-color': '#FFC802',
								'--button-hover-bg-color': '#FFEDAB',
								'--button-active-bg-color': '#FFEDAB'
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
