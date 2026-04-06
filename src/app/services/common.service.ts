import { Injectable } from '@angular/core';
import { BUTTONDATA } from '../interfaces/common';

@Injectable({
	providedIn: 'root'
})
export class CommonService {

	constructor() { }

	public getCardColor(index: number) {
		const cardColor = [
			'#3e3eb5f2',
			'#cf4242',
			'#e1b44b',
			'#075A6D',
			'#F17404',
			'#695845',
		];
		return cardColor[index % cardColor.length];
	}

	backButtonDetail: BUTTONDATA = {
		value: 'Back to List',
		type: 'secondary',
		icon: '<i class="fa-solid fa-arrow-left me-2"></i>'
	};

	searchButton: BUTTONDATA = {
		value: 'Search',
		type: 'secondary',
		icon: '<i class="fa-solid fa-magnifying-glass me-2"></i>'
	};

}
