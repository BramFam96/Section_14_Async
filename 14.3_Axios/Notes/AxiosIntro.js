//url for cat-fact api: https://cat-fact.herokuapp.com
// const response = axios.get('https://cat-fact.herokuapp.com')
// console.log('this will display first')
//this returns a promise.. we'll cover these in detail later;
//
/*
For now it is sufficient to say that a promise is not the same as a value;
It is actually similar to a callback- a way for JS to commit to waiting on a value 
without impeding the thread our code executes on. As a Single-threaded language, JS
achieves this by handing the request off to our browser which returns upon resolution or rejection;


If we want access to the data from response we need to use async/await to ensure 
our logic does not execute early
*/
const getData = async () => {
	const baseUrl = 'https://cat-fact.herokuapp.com/'
	const path1 = 'facts'
	const response = await axios.get(`${baseUrl}${path1}`)
	//when our code reaches await it leaves this block to continue executing;
	//eventually the browser returns a value, await is satisfied, and the parser returns
	//to this line for normal execution

	const { data } = response
	let factArr = []
	console.log(data)
	for (let result of data) {
		console.log(result.text)
	}
	//We can easily add a new get request by adding it to our async:
	//const secondResponse = await axios.get(...);

	console.log('now this displays after our response resolves')
}
getData()
