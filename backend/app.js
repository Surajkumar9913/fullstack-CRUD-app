import mysql from "mysql"

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'crud'
});

// Create 100 employee entries with random or predefined data
for (let i = 1; i <= 100; i++) {
  const fullName = `Employee${i}`;
  const email = `employee${i}@example.com`;
  const phone = `12345678${i}`;
  const age = Math.floor(Math.random() * 30) + 20; // Random age between 20 and 50
  const department = i % 2 === 0 ? 'HR' : 'Engineering'; // Alternating departments
  
  const sql = `INSERT INTO emp (fullName, email, phone, age, department) VALUES (?, ?, ?, ?, ?)`;

  connection.query(sql, [fullName, email, phone, age, department], (err, result) => {
    if (err) throw err;
    console.log(`Inserted Employee ${i}`);
  });
}

// Close the connection
connection.end();
