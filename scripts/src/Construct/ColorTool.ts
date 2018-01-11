/**
 * Панель инструментов
 * 
 * @module
 */
//;
//
/**
 * Панель инструментов
 */
	
function main(id: string): string
{
    const input = (<HTMLInputElement>document.getElementById(id));
    return input.value;
}	

export {
main as default,
};
