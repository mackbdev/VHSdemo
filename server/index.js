/* dev */
const morgan = require('morgan');

/* app */ 
const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const mainRoute = require('./routes/main-route');
const config = require('./core/config');
const port = config.port || 5000;
const app = express();

app.use(morgan('combined'));
app.use(cors({origin: true}));
app.use((req,res,next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	next();
})
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
})) // used to have json data extracted
app.use('/api', mainRoute); // main get,post,patch,delete
app.use((req, res, next) => {
	const error = new HttpError('Go home Roger.', 404)
	throw error;
}); // used if no routes found, standard 404
app.use((error,req,res,next) => {
if (res.headerSent){
	return next(error);
}

res.status(error.code || 500);
res.json({message: error.message || 'An unknown error occured!'});
});  // overall error handler, that will either take given error or provide fallback

/* standard */
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
