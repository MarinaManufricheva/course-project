/**
 * Инициализация кнопки сохранения холста
 * @module
 */
;

/**
 * Инициализация кнопки сохранения холста
 * 
 * @param button Ссылка сохранения
 * @param onSave Действия при сохранении
 * @returns
 */
function main( button: HTMLAnchorElement, link: string,
	onSave: ( save: ( link: string ) => void ) => void ): void
{
	button.href = link; //Это DOMString что отображает href HTML атрибут, содержащий действительный URL связанного ресурса.
	button.download = 'manicure.svg'; //Это DOMString показыват что связаный ресурс предназначен для загрузки а не для отображения в браузере. Значение представляет предпологаемое имя файла. 
	const save = ( link: string ): void =>
	{
		button.href = link;
	};
	const onClick = (): void =>
	{
		onSave( save );
	};
	button.addEventListener( 'click', onClick );
	button.addEventListener( 'focus', onClick, true );
}

/**
 * Модуль
 */
export {
	main as default,
};