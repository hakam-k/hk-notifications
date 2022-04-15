import React, { useEffect } from 'react';
import { Store, ReactNotifications } from 'react-notifications-component'
import {Notification} from './notificationsAPI';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  // decrement,
  // increment,
  // incrementByAmount,
  // incrementAsync,
  // incrementIfOdd,
  selectNotifications,
  fetchNotificationsAsync
} from './notificationsSlice';
// import styles from './Notifications.module.css';

export function Notifications() {
  const notifications = useAppSelector(selectNotifications);
  const dispatch = useAppDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  // const incrementValue = Number(incrementAmount) || 0;
  useEffect(() => {
    dispatch(fetchNotificationsAsync());    
  },[]);
  useEffect(() => {
    console.log('notifications',notifications)
    notifications.map((notification: Notification)=>{
      Store.addNotification({
        // title: "Wonderful!",
        message: notification.text,
        type: notification.type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 50000,
          onScreen: false,
          showIcon:true
        }
      });
    })
    
  },[notifications]);
  return (<ReactNotifications />);
}
