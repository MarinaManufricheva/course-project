/**
 * Инициализация кнопки сброса созданного маникюра
 * @module
 */
;

/**
 * Инициализация кнопки сброса
 * 
 * @param button Кнопка сброса
 * @returns
 */
function main( button: HTMLButtonElement, res: (event: Event) => void ): void
{
	const onRes = (event: Event): void =>
	{
		res(event);
	};
	button.addEventListener( 'click', onRes );
}

/**
 * Модуль
 */
export {
	main as default,
};