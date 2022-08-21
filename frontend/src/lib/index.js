export async function EditUser(params) {
	console.log(params);
	/*try {
		const user = await fetch('http://localhost:8000/users/', {
			method: 'PUT',
			body: params.row,
		});
		params.row = await user.json();
	} catch (err) {
		return;
	}*/
}

export function getFrequency(params) {
	switch (params) {
		case 0:
			return 'Never';
		case 1:
			return '3PM everyday';
		case 2:
			return '3PM every Monday';
		default:
			return;
	}
}
