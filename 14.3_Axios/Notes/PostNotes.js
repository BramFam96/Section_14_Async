//Post request syntax:
//axios.post(url, [data,] [config]);
//in many cases specific routes are capable of handling gets and posts:
let baseUrl = 'https://reqres.in'
const getUsers = async () => {
	const res = await axios.get(`${baseUrl}/api/users`)
	console.log(res)
}

const createUser = async () => {
	const res = await axios.post(`${baseUrl}/api/users`, {
		username: 'testname',
		email: 'test@mail.com',
		age: '1',
	})
	console.log(res)
}
getUsers()
createUser()
getUsers()
