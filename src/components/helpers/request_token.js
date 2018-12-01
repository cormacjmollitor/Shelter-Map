//Requests for token from server that is stored in ENV Variable

export default function requestToken() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/token")
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        if (myJson){
          return resolve(myJson);
        }
        reject ('Error in fetching token from server');
      })
  })
}