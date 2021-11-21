const getLaunchData = async () => {
	const baseURL = 'https://api.spacexdata.com/v3/launches'
	let response = await axios.get(`${baseURL}`)
	const { data } = response
	//Filters
	const successfulLaunches = data.filter((obj) => obj.launch_success)
	const launchesWithFairingData = successfulLaunches.filter(
		(obj) => obj.rocket.fairings
	)
	const recoveredBoosters = launchesWithFairingData.filter(
		(obj) => obj.rocket.fairings.recovered
	)
	const reusedBoosters = launchesWithFairingData.filter(
		(obj) => obj.rocket.fairings.reused
	)
	//Ratios
	const successfulLaunchRatio = calcRatio(successfulLaunches, data)

	const recoveryRatio = calcRatio(recoveredBoosters, successfulLaunches)
	const reusedRatio = calcRatio(reusedBoosters, recoveredBoosters)

	console.log(
		`
        SpaceX has succeeded in ${successfulLaunchRatio}% of its launches.
        While they have only succeeded in recovering ${recoveryRatio}% of their booster rockets,
        they have managed to reuse these recovered boosters ${reusedRatio}% of the time.`
	)
}
getLaunchData()
const calcRatio = (arr1, arr2) => {
	return ((arr1.length / arr2.length) * 100).toFixed(2)
}
