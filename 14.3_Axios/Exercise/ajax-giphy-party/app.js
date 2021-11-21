//Lets define those constants!

const api_key = 'elGR2AMu7TtNUeL5qh7XB3tEs3YrPdXc'
const baseUrl = 'https://api.giphy.com/v1/gifs/random'

//Now we get on the event listeners!
$('form').on('submit', (e) => {
	e.preventDefault()
	let inputVal = $('input').val()
	callGiffy(inputVal)
	$('input').val('')
})
$('.delete_btn').on('click', (e) => {
	e.preventDefault()
	$('div > *').remove()
})
//
const callGiffy = async (inputVal) => {
	const queryObj = { params: { tag: inputVal, rating: 'r', api_key } }
	const response = await axios.get(baseUrl, queryObj)
	const $newImg = $(
		`<img src = ${response.data.data.images.downsized_medium.url} alt = random image/>`
	).css('margin', '2em')

	$('.append_section').append($newImg)
}
