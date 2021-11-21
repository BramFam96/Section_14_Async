//https://hackorsnoozev3.docs.apiary.io/#introduction/quickstart
//Our base url:
const baseUrl = 'https://hack-or-snooze-v3.herokuapp.com'
//Set-up requires us to send a post request with new login credentials to /signup;

const createNewAccount = async (name, username, password) => {
	const res = await axios.post(`${baseUrl}/signup`, {
		user: { name, username, password },
	})
	console.log(res)
}
//We'll get an error if we run this a second time with the same data:
// createNewAccount('Matt', 'BramMatt', 'pigflix')
//We now have a token! Don't worry about holding onto it; it is also present on the login response;

const loginToHoS = async (username, password) => {
	const userObj = { user: { username, password } }
	try {
		const res = await axios.post(`${baseUrl}/login`, userObj)
		//console.log(res) -> we find our token in data;
		return res.data.token
	} catch {
		console.error(`Check your login credentials`)
	}
}
//Now we can call the routes that require auth;
const getToken = async (username, password) => {
	const token = await loginToHoS(username, password)
	return token
}
const getUsers = async () => {
	const token = await getToken('BramMatt', 'pigflix')
	const queryObj = { params: { token } }
	const res = await axios.get(`${baseUrl}/users`, queryObj)
	console.log(res)
}
const createStory = async () => {
	const token = await getToken('BramMatt', 'pigflix')

	const newStory = {
		token,
		story: {
			author: 'Matt',
			title: 'BigMooves',
			url: 'https://google.com/',
		},
	}

	const res = await axios.post(`${baseUrl}/stories`, newStory)
	console.log(res)
}
