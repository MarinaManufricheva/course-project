/**
 * Модуль инициализации инструментов изменения файла
 */
;


import initSaveButton from './initSaveButton';

import initButton from './initButton';

import SVGFileElements from './SVGFileElements';

import initResetButton from './initResetButton';

import ColorTool from './colorTool';

/**
 * Инициализия инструментов изменения файла
 */
function main( ): void
{
	const svgDocument = new SVGFileElements( 'hand-canvas' );
	
	initstartElements();
	initChangeSVG( 'block', svgDocument);
    initSave();
    initReset (svgDocument);
}

/**
 * Предыдущая нажатая кнопка в выборе формы ногтей
 */
let previousElementFormNail: HTMLInputElement;

/**
 * Предыдущая нажатая кнопка в выборе рисунка
 */
let previousElementDesignNail: HTMLInputElement;

/**
 * Форма по умолчанию
 */
let formNailDefault: HTMLInputElement ;
/**
 * Цвет по умолчанию
 */
const colorDefault = "#FCEFEB" as string;

/**
 * Инициализация стартового состояния указателей на предыдущие элементы
 * @returns
 */
function initstartElements( ): void
{
	previousElementFormNail = document.getElementById( 'nail-form1' ) as HTMLInputElement;
	previousElementDesignNail = document.getElementById( 'design1-nail' ) as HTMLInputElement; // по умолчанию картинка без рисунка
    formNailDefault = previousElementFormNail;
}


/**
 * Инициализация инструментов
 * 
 * @param button Имя группы кнопок
 * @param svgDocument 
 * @returns
 */
function initChangeSVG( button: string, svgDocument: SVGFileElements) : void
{
	const input = document.getElementsByClassName( button ) as NodeListOf<Element>;

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
		console.log (target.name);
		switch (target.name)
		{
			case 'nail-form': // если это кнопка по изменению формы, тогда
				svgDocument.HiddenLayer( previousElementFormNail.id ); 
				previousElementFormNail = target;
				svgDocument.DisplayLayer( previousElementFormNail.id);
				break;
			
			case 'design': // если это кнопка для добавления рисунка
				svgDocument.HiddenLayer( previousElementDesignNail.id ); 
				previousElementDesignNail = target;
				svgDocument.DisplayLayer( previousElementDesignNail.id);
				break;
		}
		svgDocument.changeColorLayer(previousElementFormNail.id, ColorTool('nail-color')); //если поменялся цвет лака/сменилась форма 
		svgDocument.changeColorLayer(previousElementDesignNail.id, ColorTool('design-color')); //если поменялся цвет рисунка/сменилась форма
        console.log (previousElementFormNail.id);
    }
	initButton( input[0], onChecked );
}

/**
 * Инициализация инструментов
 * 
 * @param button Имя группы кнопок
 * @param svgDocument 
 * @returns
 */
function initReset(svgDocument: SVGFileElements) : void
{
	const button = document.getElementById('reset') as HTMLButtonElement;
    const onReset = ( event: Event ): void => 
	{	
        if (event == undefined) {
            return;
        }
        svgDocument.HiddenLayer(previousElementDesignNail.id);
        svgDocument.HiddenLayer(previousElementFormNail.id);
        svgDocument.DisplayLayer(formNailDefault.id);
        svgDocument.changeColorLayer(formNailDefault.id, colorDefault);
        previousElementFormNail = formNailDefault; 
    };
	initResetButton( button, onReset );
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