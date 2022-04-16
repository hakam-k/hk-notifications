import React, { useEffect } from 'react';
import { Store, ReactNotifications } from 'react-notifications-component'
import { v4 as uuidv4 } from 'uuid';
import {Notification} from './notificationsAPI';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectNotifications,
  fetchNotificationsAsync,
  dismissNotificationAsync
} from './notificationsSlice';
import {
  selectUserId,
} from '../user/userSlice';

export function Notifications() {
  const notifications = useAppSelector(selectNotifications);
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  // const incrementValue = Number(incrementAmount) || 0;
  useEffect(() => {
    userId && dispatch(fetchNotificationsAsync(userId));    
  },[userId]);

  useEffect(() => {
    console.log('notifications',notifications)
    notifications.map((notification: Notification)=>{
      setTimeout(()=>{
        Store.addNotification({
          // title: "Wonderful!",
          id: notification.id,
          message: notification.text,
          type: notification.type,
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: notification.duration,
            onScreen: true,
            showIcon:true,
            
          },
          onRemoval: (id,flag)=>{
            console.log('flag',flag)
            console.log('dismiss id:',id)
            dispatch(dismissNotificationAsync({id,flag}));
          }
        });
      },notification.time)
      
    })
    
  },[notifications]);
  return (<ReactNotifications />);
}
