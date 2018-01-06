/**
 * Панель инструментов
 * 
 * @module
 */
;

/**
 * Панель инструментов
 */
class Tool
{
	
	/**
	 * Цвет кисти
	 */
	private _color: number[];
	/**
	 * Инструмент изменения цвета кисти
	 */
	private inputColor: HTMLInputElement;
	/**
	 * Элемент формы с инструментами
	 */
	//private readonly block: Element;
	
	/**
	 * Панель инструментов
	 * 
	 * @param block Элемент формы с инструментами
	 */
	public constructor()
	{
		this.initColorTool();
	}
	
	/**
	 * Цвет кисти
	 */
	public get color(): number[]
	{
		return this._color;
	}
	
	/**
	 * Цвет кисти
	 */
	public set color( value: number[] )
	{
		const normalize = ( num: number ) =>
			Math.min(
				Math.max(
					num | 0,
					0
				),
				255
			);
		const toColorPart = ( num: number ): string =>
		{
			const hex = num.toString( 16 );
			
			return (
				( hex.length > 1 )
				? hex
				: '0' + hex
			);
		};
		
		this._color = [
			normalize( value[0] ),
			normalize( value[1] ),
			normalize( value[2] ),
		];
		this.inputColor.value = '#' + toColorPart( this._color[0] )
			+ toColorPart( this._color[1] )
			+ toColorPart( this._color[2] );
	}
	
	/**
	 * Инициализация инструмента изменения цвета кисти
	 */
	private initColorTool(): void
	{
		const input = document.getElementById( 'color' ) as HTMLInputElement;
		this.inputColor = input;
		
		input.value = input.defaultValue;
		
		const onChange = (): void =>
		{
			this.color = this.parseColor( input.value );
		};
		
		input.addEventListener( 'change', onChange );
		onChange();
	}
	
	/**
	 * Разбор шестнадцатиричного цвета
	 * 
	 * @param hexColor Шестнадцатиричный цвет
	 * @returns Массив компонент цвета [r, g, b]
	 */
	private parseColor( hexColor: string ): number[]
	{
		if ( hexColor.length === 4 )
		{
			return [
				parseInt( hexColor[1], 16 ) | 0,
				parseInt( hexColor[2], 16 ) | 0,
				parseInt( hexColor[3], 16 ) | 0,
			];
		}
		
		return [
			parseInt( hexColor.substr( 1, 2 ), 16 ) | 0,
			parseInt( hexColor.substr( 3, 2 ), 16 ) | 0,
			parseInt( hexColor.substr( 5, 2 ), 16 ) | 0,
		];
	}
}

/**
 * Модуль
 */
export {
	Tool as default,
};
