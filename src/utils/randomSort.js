/**
 * sort random element in array
 * @param arr array
 */
export default function shuffle(arr) {
	let arrLenght = arr.length;
	let index;
	let temp;
	while (arrLenght > 0) {
		index = Math.floor(Math.random() * arrLenght);
		arrLenght--;
		temp = arr[arrLenght];
		// eslint-disable-next-line no-param-reassign
		arr[arrLenght] = arr[index];
		// eslint-disable-next-line no-param-reassign
		arr[index] = temp;
	}
	return arr;
}
