import axios from 'axios';
import { NOTIFICATION_TYPE } from 'react-notifications-component'
export interface Notification {
  id: string,
  type: NOTIFICATION_TYPE,
  text: string,
  time: number,
  duration: number
}
// const data: Array<Notification>= [
//   {type:'info',text:'Big sale next week',time: 5000, duration: 4000,}, 
//   {type:'info',text:'New auction next month',time: 6000, duration: 3000,},
//   {type:'warning',text:'Limited edition books for next auction',time: 7000, duration: 2000,},
//   {type:'success',text:'New books with limited edition coming next week',time: 8000, duration: 2000,},
//   {type:'danger',text:'Last items with limited time offer',time: 9000, duration: 4000,}
// ]
// A mock function to mimic making an async request for data
export function fetchNotifications(id?: string) {
  // return new Promise<{ data: Array<Notification> }>((resolve) =>
  //   setTimeout(() => resolve({ data }), 500)
  // );
  return axios.get(`http://localhost:3001/app/notifications?user_id='${id}'`,{
    headers:{
      'Access-Control-Allow-Origin':'allow'
    }
  }).then((res)=>{
    return res.data
  })
}
export function dismissNotification(id?: string) {
  // return new Promise<{ data: Array<Notification> }>((resolve) =>
  //   setTimeout(() => resolve({ data }), 500)
  // );
  console.log('dismissing notification: ',id);
  return axios.get(`http://localhost:3001/app/notification/dismiss?id=${id}`,{
    headers:{
      'Access-Control-Allow-Origin':'allow'
    }
  }).then((res)=>{
    console.log('dismissing notification success!');
    return res.data
  })
}
