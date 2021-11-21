/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
//Search call:
async function searchShows(q) {
	// Make an ajax request to tvMaze's search endpoint.
	const rootUrl = 'https://api.tvmaze.com'
	let res = await axios.get(`${rootUrl}/search/shows`, { params: { q } })
	console.log(res.data)
	//We take this data an build an arr of shows:
	let shows = res.data.map((obj) => {
		const show = obj.show
		const { id, name, summary, image } = show
		return {
			id,
			name,
			summary,
			image: image ? image.original : 'https://tinyurl.com/tv-missing',
		}
	})
	return shows
}
function populateShows(shows) {
	//Solely responsible for DOM manipultion -> starts by grabbing show-list section
	const $showsList = $('#shows-list')
	$showsList.empty()
	console.log(shows)
	for (let show of shows) {
		let $item = $(
			//The classes, Show and data-show-id will be critical later
			`<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
           <img class="card-img-top" src="${show.image}" alt='show-banner'/>
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-primary get_episode_btn">See Episodes</button>
           </div>
         </div>
       </div>
      `
		)
		$showsList.append($item)
	}
}
//form submission handler: part of search call;
//notice we define our handlerFunction in line;
$('#search-form').on(
	'submit',
	(handleSearch = async (evt) => {
		evt.preventDefault()

		let query = $('#search-query').val()
		if (!query) return

		$('#episodes-area').hide()

		let shows = await searchShows(query)

		populateShows(shows)
	})
)
//Let's setuo our other end-point

//We are going to split our call and dom manipulation like before:
//Api logic:
async function getEpisodes(id) {
	let res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
	let episodes = res.data.map((episode) => {
		const { id, name, season, number } = episode
		return { id, name, season, number }
	})
	return episodes
}
//DOM manipulation:
const populateEpisodes = (episodes) => {
	const $episodesList = $('#episodes-list')
	$episodesList.empty()
	console.log(episodes)
	for (let episode of episodes) {
		console.log(episode.name)
		let $item = $(
			`<li> 
      Title: ${episode.name}
      (Season ${episode.season}, Episode ${episode.number}); 
      </li>`
		)

		$episodesList.append($item)
	}
	$('#episodes-area').show()
}
//click event -> note our episode are generated after page load,
//we must therefor use jQuery to attach our event listener to the showList parent;
$('#shows-list').on(
	'click',
	'.get_episode_btn',
	(handleEpisodeCall = async (e) => {
		//when we click our button we need to tranverse up our call chain to the nearest parent
		//which satisfies our params; to do this we'll use the closest param to chain up our
		//DOM until we reach the el with the class 'Show'; this will be our outter-most containing div;
		//Once we have correctly selected this div we can
		let selectedId = $(e.target).closest('.Show').data('show-id')
		let episodes = await getEpisodes(selectedId)
		populateEpisodes(episodes)
	})
)
