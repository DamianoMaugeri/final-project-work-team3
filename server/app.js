const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const notFound = require('./middlewares/notFound.js');
const errorsMiddleware = require('./middlewares/errorsMiddleware.js');
const bnbRouter = require('./routers/bnbRouter.js');
const fileupload = require('express-fileupload');





app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());


app.get('/', (req, res) => {
    res.send('home del server');
});

// da eliminare su funziona tutto 
// app.post('/api/boolbnb/prova/:id', (req, res) => {

//     const id = req.params.id

//     if (req.files === null || Object.keys(req.files).length === 0) {
//         res.status(400);
//         res.json('Nessun file Caricato')
//     }

//     const imageFile = req.files.image;

//     const uploadsPath = __dirname + '/public/images';

//     const imgFinalPath = `${uploadsPath}/${imageFile.name}`;

//     imageFile.mv(imgFinalPath, (err) => {
//         if (err) {
//             res.status(500);
//             res.json({ error: `Errore spostamento immagine ${imageFile.name}` })
//         }
//         res.json({ message: `file caricato con successo` })
//     })




// })


// rotte
app.use('/api/boolbnb', bnbRouter);



// middleware finali
app.use(errorsMiddleware);
app.use(notFound);


app.listen(port, () => console.log('hello nel listen'));
