import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT']
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
app.use(express.json()); 

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "rpl"
})

app.get('/book', (req, res) => {
    const query = "SELECT * FROM recipe WHERE author='user'";
    try{
        db.query(query, (err, result) => {
            if(err) throw err;
            return res.json(result);
        });
    }
    catch(err){
        console.error(err);
        return res.json({Message : "failed to load data"});
    }
});

app.get('/book/:id', (req, res) => {
    const query = "SELECT * FROM recipe WHERE ID = ?";
    const id = req.params.id;
    try{
        db.query(query,[id], (err, result) => {
            if(err) throw err;
            return res.json(result);
        });
    }
    catch(err){
        console.error(err);
        return res.json({Message : "failed to load data"});
    }
});

app.get('/tips/:id', (req, res) => {
    const query = "SELECT * FROM tips WHERE IDtips = ?";
    const id = req.params.id;

    try{
        db.query(query,[id], (err, result) => {
            if(err) throw err;
            return res.json(result);
        });
    }
    catch(err){
        console.error(err);
        return res.json({Message : "failed to load data"});
    }
});

app.get('/tips', (req, res) => {
    const query = "SELECT * FROM tips";
    try{
        db.query(query, (err, result) => {
            if(err) throw err;
            return res.json(result);
        });
    }
    catch(err){
        console.error(err);
        return res.json({Message : "failed to load data"});
    }
});

app.get('/:id', (req, res) => {
    const query = "SELECT * FROM recipe WHERE ID = ?";
    const id = req.params.id;

    try{
        db.query(query,[id], (err, result) => {
            if(err) throw err;
            return res.json(result);
        });
    }
    catch(err){
        console.error(err);
        return res.json({Message : "failed to load data"});
    }
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM recipe";
    try {
        db.query(sql, (err, result) => {
            if (err) throw err;
            return res.json(result);
        });
    } catch (err) {
        console.error(err);
        return res.json({ Message: "Server error" });
    }
});

app.post('/recipe', (req, res) => {
    const sql = "INSERT INTO recipe(`recName`, `recPrice`, `recDesc`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.price,
        req.body.ingridient
    ]
    try {
        db.query(sql, [values], (err, result) => {
            if (err) throw err;
            return res.json(result);
        });
    } catch (err) {
        console.error(err);
        return res.json({ Message: "Data upload error" });
    }
});

app.put('/book/:id', (req, res) => {
    const sql = "UPDATE recipe SET `recName`=?, `recPrice`=?, `recDesc`=? WHERE ID=?"
    const id = req.params.id
    db.query(sql, [req.body.title, req.body.price, req.body.ingridient, id], (err, result) => {
        if(err) return res.json({Message: "Error updating data"});
        return res.json(result)
    })
})
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM recipe WHERE `recipe`.`ID` = ?"
    const id = req.params.id
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Failed to delete"});
        return res.json(result);
    })
})
app.listen(5000, () => {
    console.log("Listening");
})