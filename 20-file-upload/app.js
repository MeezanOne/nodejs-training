const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer')

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://meezan:EIx2kxOS5naSwcyZ@cluster0.x6um4f6.mongodb.net/shop';

const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images'); // Make sure "images" folder exists at project root
  },
  filename: (req, file, cb) => {
    // safer filename (no colons, no spaces)
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


// ✅ middleware that will always be there
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage:fileStorage , fileFilter: fileFilter}).single('image'))
app.use(express.static(path.join(__dirname, 'public')));

// ✅ CSRF & Flash (we will enable after session store is ready)
const csrfProtection = csrf();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// Fallback flag for DB failure
let dbConnected = false;

// Try to connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  dbConnected = true;
  console.log('✅ MongoDB Connected');

  const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });

  store.on('error', (error) => {
    console.error('❌ Session Store Error:', error);
  });

  // ✅ Only set up session + csrf after DB is ready
  app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
  app.use(csrfProtection);
  app.use(flash());

  // locals
  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session?.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
  });

  app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
  });

  // Routes
  app.use('/admin', adminRoutes);
  app.use(shopRoutes);
  app.use(authRoutes);

  app.get('/500', errorController.get500);
  app.use(errorController.get404);

  app.listen(3000, () => console.log('Server running on port 3000'));

  // ✅ Global error handler
app.use((error, req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session?.isLoggedIn
  });
});

})
.catch(err => {
  console.error('MongoDB Connection Failed:', err.message);

  // Still start server, but show 500 page for every request
  app.use((req, res, next) => {
    res.status(500).render('500', {
      pageTitle: 'Error!',
      path: '/500',
      isAuthenticated: false,
      errorMessage: 'Sorry, we are having database issues. Please try again later.'
    });
  });

  app.listen(3000, () => console.log('Server running WITHOUT DB'));
});

// ✅ Global error handler
app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session?.isLoggedIn
  });
});
