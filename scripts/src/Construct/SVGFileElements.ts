/**
 * Модуль доступа к svg-изображению
 * 
 * @module
 */
;

/**
 * SVG-изображение
 */
class SVGFileElements
{
    /**
	 * Элемент SVG
	 */
	public svgDocument: HTMLElement;

	/**
	 * Имя класса, который скрыт
	 */
	private HiddenClass = 'st0';

	/**
	 * SVG-изображение
	 * 
	 * @param id Id изображения
	 */
	public constructor( id: string )
	{
		this.svgDocument = document.getElementById( id ) as HTMLElement;
		if ( this.svgDocument == null )
		{
			throw new Error( 'No SVG found in page' );
		}

	}

	/**
	 * Делает слой видимым
	 * 
	 * param id Id элемента
	 * returns
	 */
	public DisplayLayer( id: string): void
	{
		const layer = this.svgDocument.children.namedItem( id ) as HTMLElement; //возвращает объект который соответсвует заданному id 
		if ( layer == null )
		{
			throw new Error( 'SVG: No such layer' );
		}
		if ( layer.classList.contains( this.HiddenClass ))
		{
			layer.removeAttribute( 'class' );
		}
	}

	/**
	 * Скрывает слой
	 * 
	 * param id Id элемента
	 * returns
	 */	
	public HiddenLayer( id: string ): void
	{
		const layer = this.svgDocument.children.namedItem( id ) as HTMLElement;
		if ( layer == null )
		{
			throw new Error( 'SVG: No such layer' );
		}
		layer.classList.add( this.HiddenClass );
	}
	/**
	 * Изменяет цвет слоя
	 * 
	 * param id Id элемента
	 * param color значение цвета 
	 * returns
	 */	
	public changeColorLayer( id: string , color: string ): void
	{

		const layer = this.svgDocument.children.namedItem(id ) as HTMLElement;
		if ( layer == null )
		{
			throw new Error( 'SVG: No such layer' );
		}
		layer.setAttribute('fill', color);
	}

}

/**
 * Модуль
 */
export {
	SVGFileElements as default,
};