/**
 * Инициализация кнопки сохранения в png
 * @module
 */

/**
 * Формирование ссылки на сохранение svg-файла
 * 
 * @param id Id svg-элемента 
 * @returns Ссылка на скачивание
 */
function main( id: string ): string
{
	const svg = document.getElementById( id ) as Node;
	const serializer = new XMLSerializer(); //сериализация объекта
	let source = serializer.serializeToString(svg); //Возвращает сериализованное дерево или ветку в виде строки
	if ( !source.match( /^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/ ) ) //Используется для сопоставления строке регулярного выражения.
	{
		source = source.replace( /^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"' );
	}
	if ( !source.match( /^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/ ) )
	{
		source = source.replace( /^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"' );
	}
	source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
	const link = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent( source ); //Метод encodeURIComponent заменяет все символы, кроме:	символов латинского алфавита, десятичных цифр и - _ . ! ~ * ' ( ).
	return link;
}

/**
 * Модуль
 */
export {
	main as default,
};