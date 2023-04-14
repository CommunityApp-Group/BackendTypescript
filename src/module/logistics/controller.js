const findState = ( ) => {
    const status = document.querySelector('.status')

    const success = (position) => {
        console.log(position)
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        console.log(longitude, latitude)

        const geoApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        fetch(geoApi)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            status.textContent = data.principalSubdivision
        }
            )
    }

    const err = () => {
        status.textContent = "unable to retrieve your location"
    }
    navigator.geolocation.getCurrentPosition(success, err);

}
document.querySelector('.find-state')?.addEventListener('click', findState)