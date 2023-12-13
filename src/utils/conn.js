import mysql from "mysql2"
import 'dotenv/config'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    await pool.getConnection((err, conn)=>{
      if(err)
        throw err;
      console.log('Connected to the DB');
      conn.release();
    });
    await checkDatabase();
  } catch (error) {
    console.error('Error connecting to the DB:', error);
  }
})();

function checkDatabase(){
  pool.query("SELECT * FROM `api_keys`", (err) =>{
    if(err){
      pool.query("create table `api_keys` (`id` int auto_increment,`email` text null,`key` text null,`date` text null,constraint api_keys_pk primary key (id))",
        (err)=>{
          if(err)
            throw err;
          console.log(`Database checked!`)
        }
      )
    }
  })
}

export default pool;