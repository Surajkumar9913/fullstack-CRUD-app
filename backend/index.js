import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv";
import connection from "./db.js";


const app = express();
dotenv.config({ path: "./.env" });


// Middlewares
app.use(cors(
    {
        origin:["https://fullstack-crud-app-2vyb.onrender.com"],
        methods:["POST", "GET"],
        credentials: true
    }
));
app.use(bodyParser.json());

connection.connect((err) => {
    if (err) {
        console.log("error to connecting the database:", err);
    } else {
        console.log("MySQL connected successfully!!");
    }
});


// Get all employees (READ)
app.get('/api/employees', (req, res) => {
    const sql = 'SELECT * FROM emp';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Get an employee by ID
app.get('/api/employees/:id', (req, res) => {
    const sql = 'SELECT * FROM emp WHERE id = ?';
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}); 

// Add a new employee (CREATE)
app.post('/api/newemployees', (req, res) => {
    const { fullName, email, phone, age, department } = req.body;
    const sql = `INSERT INTO emp (fullName, email, phone, age, department) 
                 VALUES (?, ?, ?, ?, ?)`;
    connection.query(sql, [fullName, email, phone, age, department], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Employee created', id: result.insertId });
    });
});

// Update an employee (UPDATE)
app.put('/api/employees/:id', (req, res) => {
    const { fullName, email, phone, age, department } = req.body;
    const sql = `UPDATE emp SET fullName = ?, email = ?, phone = ?, age = ?, department = ? WHERE id = ?`;
    connection.query(sql, [fullName, email, phone, age, department, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Employee updated' });
    });
});

// Delete an employee (DELETE)
app.delete('/api/employees/:id', (req, res) => {
    const sql = 'DELETE FROM emp WHERE id = ?';
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Employee deleted' });
    });
});

// Start server
app.listen(process.env.PORT || 4000, (err) => {
    if (err) throw err;
    console.log(`Server is running on port: ${process.env.PORT}`);
});
