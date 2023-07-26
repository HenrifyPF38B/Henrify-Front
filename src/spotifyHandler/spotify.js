const clientID = "0a5a810744fa4b2291120b509d465eab";

const clientSecret = "5de42875ad424214b549d811552aa2b6";

let authParam = {
       method:  "POST",
       headers:{
        "Content-Type": "application/x-www-form-urlencoded"
       },
       body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`
    };
    
export const getSpotifyToken = async() =>{
  let token = "";
  const getToken = await fetch("https://accounts.spotify.com/api/token", authParam)
  
  .then(obj => obj.ok ? obj.json() : Promise.reject(obj))
  
  .then(json => token = json.access_token);

  return getToken;
};

