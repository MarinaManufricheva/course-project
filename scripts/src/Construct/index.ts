/**
 * Модуль инициализации инструментов изменения файла
 */
;

import initSaveButton from './initSaveButton';

import SVGFileElements from './SVGFileElements';

import initSaveButtonPNG from './initSaveButtonPNG';

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
	initSavePNG();
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
 * Цвет лака
 */
let colorNail = <HTMLInputElement>document.getElementById("nail-color");

/**
 * Цвет рисунка
 */
let colorDesign = <HTMLInputElement>document.getElementById("design-color");
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
	const input = document.getElementById( button ) as HTMLElement;
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
		svgDocument.changeColorLayer(previousElementFormNail.id, colorNail.value); //если поменялся цвет лака/сменилась форма 
		svgDocument.changeColorLayer(previousElementDesignNail.id, colorDesign.value); //если поменялся цвет рисунка/сменилась форма
    }
	input.addEventListener( 'change', onChecked );
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
    const onReset = (): void => 
	{	
        if ( !button )
		{
			return;
		}
        svgDocument.HiddenLayer(previousElementDesignNail.id);
        svgDocument.HiddenLayer(previousElementFormNail.id);
        svgDocument.DisplayLayer(formNailDefault.id);
        svgDocument.changeColorLayer(formNailDefault.id, colorDefault);
        previousElementFormNail = formNailDefault; 
    };
	button.addEventListener( 'click', onReset );
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
		window.requestAnimationFrame( // используется для синхронизации 
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
 * Инициализация функции сохранения холста в png
 * 
 * @returns
 */
function initSavePNG( ): void
{	
	const apng = document.getElementById( 'save-png' ) as HTMLAnchorElement;
	initSaveButtonPNG(apng);
} 

/**
 * Модуль
 */
export {
	main as default,
};