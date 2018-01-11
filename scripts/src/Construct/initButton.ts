/**
 * Кнопки-переключатели
 * 
 * @module
 */
;

/**
 * Радио-кнопки
 */
function main(block: Element, change: (event: Event) => void ): void
{
    const onChange = (event: Event): void =>
        {
            change(event);
        };
    block.addEventListener( 'change', onChange );
}

/**
 * Модуль
 */
export {
	main as default,
};