//The following is successful as long as the api is up;
const getRandomDog = async () => {
	const res = await axios.get('https://dog.ceo/api/breeds/image/random')
	const { data } = res
	const dogImgSrc = data.message
	createImgEl(dogImgSrc)
}

const createImgEl = (src) => {
	let newImg = document.createElement('img')
	newImg.src = src
	return document.querySelector('div').append(newImg)
}
//But what if we suffer a disconnection, the server goes down, or we request bad data like below:

const getDogByBreed = async (breed) => {
	try {
		const res = await axios.get(
			`https://dog.ceo/api/breed/${breed}/images/random`
		)
		const { data } = res
		const dogImgSrc = data.message
		createImgEl(dogImgSrc)
	} catch (e) {
		console.log(`${e} defaulting to random breed`)
		getRandomDog()
	}
}
//getDogByBreed('banana')
//We get a 404 Error!
//To prevent this we wrap our call with a try catch!
const form = document.querySelector('form')
const input = document.querySelector('input')

form.addEventListener('submit', (e) => {
	e.preventDefault()
	getDogByBreed(input.value)
	input.value = ''
})
