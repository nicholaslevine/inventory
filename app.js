const express = require('express');
const app = express();

const racketRouter = require('./router/racketRouter');
const categoryRouter = require('./router/categoryRouter')


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use('/', racketRouter);
app.use('/category', categoryRouter);

app.listen(3000, () => {
    console.log(`App is running on port 3000`);
})