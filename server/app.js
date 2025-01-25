const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const notFound = require('./middlewares/notFound.js');
const errorsMiddleware = require('./middlewares/errorsMiddleware.js');
const bnbRouter = require('./routers/bnbRouter.js')
const authRouter = require('./routers/authRouter.js')



app.use(cors());
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('home del server');
});


// rotte
app.use('/auth', authRouter);
app.use('/api/boolbnb', bnbRouter);



// middleware finali
app.use(errorsMiddleware);
app.use(notFound);


app.listen(port, () => console.log('hello nel listen'));
