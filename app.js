const express = require('express');
const app = express();
const path = require('node:path');

const racketRouter = require('./router/racketRouter');
const categoryRouter = require('./router/categoryRouter')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));
app.use('/', racketRouter);
app.use('/category', categoryRouter);

app.get('/*', (req, res) => {
    res.status(404).send("404. This route doesn't exist")
}
)

app.listen(3000, () => {
    console.log(`App is running on port 3000`);
})