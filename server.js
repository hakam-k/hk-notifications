const path = require('path');
const express = require('express');
const {getNotificationsQuery,createNotificationsQuery,dismissNotificationQuery} = require('./db-queries');
var cors = require('cors')

const app = express();
const publicPath = path.join(__dirname, '.', 'client/build');
console.log(publicPath)
const port = process.env.PORT || 3001;
app.use(express.static(publicPath));
app.use(cors());
app.use(express.json());
app.get('/home', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/app/notifications', async(req, res) => {
   const {user_id}= req.query;
   console.log('user_id',user_id)
   const response = await getNotificationsQuery(user_id);
   const randomElement = response[Math.floor(Math.random() * response.length)];
   const result = randomElement ? [randomElement] : [];
   console.log('/app/notifications --> response',result)
   res.send(result);
});
app.get('/app/notification/dismiss', async(req, res) => {
   const {id}= req.query;
   console.log('id',id)
   const response = await dismissNotificationQuery(id);
   res.send({success:true});
});
app.post('/app/register', async(req, res) => {
   const {id} = req.body;
   console.log('creating notifications for user:', req.body);
   getNotificationsForUser().map(async(notification)=>{
      const {text,type}=notification;
      const random1To4 = getRandomArbitrary(1,4);
      const random5To10 = getRandomArbitrary(5,10);
      await createNotificationsQuery(id,text,type,random5To10,random1To4);
   })
   // const response = await getTableQuery();
   res.send({id});
});
app.listen(port, () => {
   console.log('Server is up!');
});
function getRandomArbitrary(min, max) {
   return Math.round(Math.random() * (max - min) + min)*1000;
}
function getNotificationsForUser(){
 return [
   {type:'info',text:'Big sale next week'}, 
   {type:'info',text:'New auction next month'},
   {type:'warning',text:'Limited edition books for next auction'},
   {type:'success',text:'New books with limited edition coming next week'},
   {type:'danger',text:'Last items with limited time offer'}
 ]
}