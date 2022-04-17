import axios, {AxiosResponse} from 'axios';

// A mock function to mimic making an async request for data
export function registerUser(uuid: string){
  console.log(uuid)
  return axios.post(`https://hk1-notifications.herokuapp.com/app/register`,{id: uuid},{
    headers:{
      'Access-Control-Allow-Origin':'allow'
    }
  })
  .then((res) => {
    console.log(`user ${res} logged in!`)
    return res.data.id;
  })
}
