create table notifications (
  id SERIAL PRIMARY KEY,
  user_id uuid,
  text text,
  type text,
  time int,
  duration int,
  status VARCHAR(10) CHECK (status IN('seen', 'available')) DEFAULT 'available'
);