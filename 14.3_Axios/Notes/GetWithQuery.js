//Axios get requests are actually formatted as: axios.get(url, [config])
//Where config is an object containing query parameters;
//As we know, query params are formatted like such:
;`axios.get('/resource?a=1&b=2'`//With axios we don't even need to format this, instead we use:
`axios.get('/resource', {params: {a:1}, {b:2}})`
