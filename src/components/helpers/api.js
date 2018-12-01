import axios from 'axios';

module.exports = {
    getMapData(searchvalue){
        return new Promise ((resolve, reject) => {
            axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchvalue}.json?country=ca&access_token=pk.eyJ1Ijoiam9yZGFuYW5kZXJzIiwiYSI6ImNqanN0dXJxNzQ2Nm8zcHJtY29ubmNlNjgifQ.OHKZuM9qFqHmJGWEgKXy6w`)
            .then((res) => {
            resolve({
                results: [res.data.features[0].center[0], res.data.features[0].center[1]],
            })
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    reject([error.response.data, error.response,status, error.response.headers]);;
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    reject(error.request);
                } else {
                    reject(error.message);
                    // Something happened in setting up the request that triggered an Error
                }
            });
        }) 
    }
}