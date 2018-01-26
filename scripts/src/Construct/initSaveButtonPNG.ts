/**
 * Инициализация кнопки сохранения в png
 * @module
 */
;

/**
 * Инициализация кнопки сохранения холста в png
 * 
 * @param pngHref Ссылка сохранения
 * @returns
 */

  function main(pngHref: HTMLAnchorElement): void
  {
	if (!pngHref)
	{
		return;
	}
	const onClick = (): void =>
	{
			let svg = document.getElementById('hand-canvas') as HTMLElement;
			const svghtml = svg.innerHTML as string;// html код svg элемента со всеми  слоями <g>
			let elementg = svg.getElementsByTagName('g') as NodeListOf<Element>;//коллекция элементов "g" HTMLCollection [ <g#shadows.st5>, <g#nail1>, <g>,  ещё 25… ]
			for ( let i = 0; i < elementg.length; i++ )
			{
				if (elementg[i].classList.contains("st0"))
				{
					elementg[i].textContent = "";
				}
			}
			const parentHtml = svg.parentElement as HTMLElement;
			const imgsrc = 'data:image/svg+xml;base64,' + btoa(parentHtml.innerHTML); //кодирование строки
			let canvas = document.querySelector("canvas") as HTMLCanvasElement;
			let context = canvas.getContext( '2d' ) as CanvasRenderingContext2D;
			context.clearRect(0, 0, canvas.width, canvas.height);
			let image = new Image;
			image.src = imgsrc;
			image.onload = () => {
				context.drawImage(image, 0, 0);
				let canvasdata = canvas.toDataURL("image/png");
				let a = document.createElement("a");
				document.body.appendChild(a);
				a.textContent = "save";
				a.download = "manicure.png";
				a.href = canvasdata;
				a.id = 'js-save';
				svg.innerHTML = svghtml;
				a.click();
			}
		}
		pngHref.addEventListener('click', onClick );
}

/**
 * Модуль
 */
export {
	main as default,
};



