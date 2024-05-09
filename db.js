
// login.js


const querystring = require('querystring');

async function handleFormSubmission(req, res) {
    if (req.method === 'POST' && req.url === '/login') {
      let body= '';
      req.on('data', chunk => {
          body += chunk.toString();
      });
      const data = await new Promise(async (resolve, reject) => {
          req.on('end', () => {
              try {
                  resolve(querystring.parse(body));
              } catch (error) {
                  reject(error);
              }
          });
      })
        
        const username = data.username;
        console.log(username);
        const password = data.password;
        console.log(password);
    }
}

module.exports = handleFormSubmission;

// Export the startServer function

/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'mpic_login' 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
  
});

connection.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Data fetched:', rows);
  });


connection.end();*/