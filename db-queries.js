const { getDbConnection } = require('./db-connection');

const getNotificationsQuery = async (user_id) => {
  const db = await getDbConnection();
  const query =`SELECT * FROM NOTIFICATIONS WHERE user_id=${user_id} AND status='available';`;
  console.log('query',query);
  const res = await db.query(query);
  return res.rows;
};

const createNotificationsQuery = async (userId,text,type,time,duration) => {
  const db = await getDbConnection();
  const query = `INSERT INTO NOTIFICATIONS(user_id,text,type,time,duration) VALUES ('${userId}','${text}','${type}','${time}','${duration}');`;
  console.log('query',query);
  const res = await db.query(query);
  return res;
};
const dismissNotificationQuery = async (id) => {
  const db = await getDbConnection();
  const query = `UPDATE NOTIFICATIONS SET status='seen' WHERE id=${id};`;
  console.log('query',query);
  const res = await db.query(query);
  return res;
};

module.exports = {
  getNotificationsQuery,
  createNotificationsQuery,
  dismissNotificationQuery
};
