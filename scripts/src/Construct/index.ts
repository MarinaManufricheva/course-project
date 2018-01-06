/**
 * Модуль инициализации инструментов изменения файла
 */
;

// import initSaveButton from './initSaveButton';

import initSaveButton from './initSaveButton';

import initButton from './initButton';

import SVGFileElements from './SVGFileElements';

/**
 * Панель инструментов
 */


/**
 * Инициализия инструментов изменения файла
 */
function main( ): void
{
	const svgDocument = new SVGFileElements( 'hand-canvas' );
	initstartElements();
	initChangeSVG( 'block', svgDocument );
	initSave();
}

/**
 * Предыдущая нажатая кнопка в выборе формы ногтей
 */
let previousElementFormNail: HTMLInputElement;

/**
 * Инициализация стартового состояния указателей на предыдущие элементы
 * @returns
 */
function initstartElements( ): void
{
	previousElementFormNail = document.getElementById( 'nail-form1' ) as HTMLInputElement;
}


/**
 * Инициализация инструментов
 * 
 * @param buttonGroupName Имя группы кнопок
 * @param svgDocument 
 * @returns
 */
function initChangeSVG( buttonGroupName: string, svgDocument: SVGFileElements ): void
{
	const input = document.getElementsByClassName( buttonGroupName ) as NodeListOf<Element>;

	const onChecked = ( event: Event ): void => 
	{	
		if ( event == undefined )
		{
			return;
		}
		const target = event.target as HTMLInputElement;
		if ( target.name == undefined )
		{
			return;
		}
		if ( target.name == 'nail-form')
		{
			svgDocument.switchElementOff( previousElementFormNail.id );
			previousElementFormNail = target;
		}
		svgDocument.switchElementOn( target.id );
	}
	for( let i = 0; i < input.length; i++ )
	{
		initButton( input[i], onChecked );
	}
}

/**
 * Инициализация функции сохранения холста
 * 
 * @returns
 */
function initSave( ): void
{
	const button = document.getElementById( 'save' ) as HTMLAnchorElement;
	if ( !button )
	{
		return;
	}
	const link = getSVGFileLinkFromElement( 'hand-canvas' );
	const onSave = ( save: ( link: string ) => void ): void =>
	{
		const link = getSVGFileLinkFromElement( 'hand-canvas' );
		window.requestAnimationFrame( // используется для синхронизации анимации
			() =>
				window.requestAnimationFrame(
					() =>
					{
						save( link );
					}
				)
		);
	};
	
	initSaveButton(
		button, 
		link, 
		onSave);
}

/**
 * Формирование ссылки на сохранение svg-файла
 * 
 * @param id Id svg-элемента 
 * @returns Ссылка на скачивание
 */
function getSVGFileLinkFromElement( id: string ): string
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