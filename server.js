const express          = require('express');
const morgan           = require('morgan');
const expressLayouts   = require('express-ejs-layouts');
const app              = express();
const mongoose         = require('mongoose');
mongoose.Promise       = require('bluebird');
const methodOverride   = require('express-method-override');
const bodyParser       = require('body-parser');
const router           = require('./config/routes');
const errorHandler     = require('./lib/errorHandler');
const customResponses  = require('./lib/customResponses');
const authenticateUser = require('./lib/authenticateUser');
const session          = require('express-session');
const flash            = require('express-flash');

const { port, dbURI, secret } = require('./config/environment');


mongoose.connect(dbURI);


app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret,
  resave: false,
  saveUnintialized: false
}));

app.use(flash());


app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//custom middleware to check the session cookie must be before routes!
app.use(customResponses);
app.use(authenticateUser);
app.use(router);

app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
