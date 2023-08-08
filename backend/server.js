const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'focano20',
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, rows, fields) => {
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json({ error: 'Palavra passe ou nome de utilizador errados' });
        }
    });
}
);

app.post('/verdisciplinas', (req, res) => {
    connection.query('SELECT * FROM disciplinas', (err, rows, fields) => {
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json({ error: 'Não existem disciplinas Disponiveis ou erro interno' });
        }
    });
});


app.post('/adicionardisciplina', (req, res) => {
    const name = req.body.name;

    connection.query('SELECT * FROM disciplinas WHERE name = ?', [name], (err, rows, fields) => {
        if (rows.length > 0) {
            res.json({ error: 'Disciplina já existe' });
        } else {
            connection.query('INSERT INTO disciplinas (name) VALUES (?)', [name], (err, rows, fields) => {
                if (err) {
                    res.json({ error: 'Erro interno' });
                } else {
                    res.json({ success: 'Disciplina adicionada com sucesso' });
                }
            });
        }
    });
});

app.post('/encontrarrecurso', (req, res) => {
    connection.query('SELECT * FROM resources', (err, rows, fields) => {
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json({ error: 'Não existem recursos Disponiveis ou erro interno' });
        }
    });
});

app.post('/checkDisciplina', (req, res) => {
    const id = req.body.disciplina;
    connection.query('SELECT * FROM disciplinas WHERE id = ?', [id], (err, rows, fields) => {
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json({ error: 'Disciplina não existe' });
        }
    });
});

app.post('/numLikes', (req, res) => {
    const id = req.body.id;
    connection.query('SELECT COUNT(id) FROM likes WHERE resource_id = ?', [id], (err, rows, fields) => {
        if (rows.length >= 0) {
            res.json(rows);
        } else {
            res.json({ error: 'Erro interno' });
        }
    });
});

app.post('/userLiked',(req, res) => {
    const UserID = req.body.userID;
    const resource_id = req.body.resource_id;

    connection.query('SELECT * FROM likes where user_id = ? AND resource_id = ?', [UserID, resource_id], (err,rows,fields)=>{
        if(rows.length == 0){
            res.json({liked: false});
        }
        else if (rows.length > 0){
            res.json({liked: true});
        }
    })
});

app.post('/like', (req, res) => {
    const UserID = req.body.userID;
    const resource_id = req.body.resource_id;

    connection.query('SELECT * FROM likes where user_id = ? AND resource_id = ?', [UserID, resource_id], (err,rows,fields)=>{
        if(rows.length == 0){
            connection.query('INSERT INTO likes (user_id, resource_id) VALUES (?,?)', [UserID, resource_id], (err, rows, fields) => {
                if (err) {
                    res.json({ error: 'Erro interno' });
                } else {
                    res.json({ success: 'Like adicionado com sucesso' });
                }
            });
        }else{
            connection.query('DELETE FROM likes WHERE user_id = ? AND resource_id = ?', [UserID, resource_id], (err, rows, fields) => {
                if (err) {
                    res.json({ error: 'Erro interno' });
                } else {
                    res.json({ success: 'Like removido com sucesso' });
                }
            });
        }

    })
});


app.get('/download', (req, res) => {
    const file = `${__dirname}/resources/1.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="1.pdf"');
  
    // Send the file data in the response
    res.sendFile(file);
});


app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
});