if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const Profile = require('./models/profile');
const Doctor = require('./models/doctor');
const Certificate = require('./models/certificate');
const {isLoggedIn}=require('./middleware');


const userRoutes = require('./routes/users');
const certificateRoutes = require('./routes/certificates');


// const dbUrl = 'mongodb+srv://arahuln27:arahuln27@cluster0.9bajefq.mongodb.net/?retryWrites=true&w=majority'
// process.env.DB_URL
mongoose.connect('mongodb+srv://arahuln27:arahuln27@cluster0.brblyjw.mongodb.net/?retryWrites=true&w=majority'
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname + '/public/'));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/', userRoutes);
app.use('/certificates', certificateRoutes)










app.get('/healthtopics/diarrhea', async(req, res) => {

   res.render('healthtopics/diarrhea')
});
app.get('/healthtopics/fever', async(req, res) => {

  res.render('healthtopics/fever')
});
app.get('/healthtopics/allergies', async(req, res) => {

  res.render('healthtopics/allergies')
});

app.get('/donation',isLoggedIn, async(req, res) => {
  try {
    const userId = req.user._id;
    const profiles = await Profile.find({ userId: userId }).exec();
    res.render('donation', { profiles: profiles, user: req.user });
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred');
  }
  // res.render('healthtopics/emergencies')
});




app.get('/',isLoggedIn, async(req, res) => {
    try {
        const userId = req.user._id;
        const profiles = await Profile.find({ userId: userId }).exec();
        res.render('home', { profiles: profiles, user: req.user });
      } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred');
      }
    // res.render('home')
});

//'mongodb://127.0.0.1:27017/web'

//profile start

app.get('/profiles',isLoggedIn, async (req, res) => {

    try {
      const userId = req.user._id;
      const profiles = await Profile.find({ userId: userId }).exec();
      res.render('profiles/index', { profiles: profiles, user: req.user });
    } catch (err) {
      console.log(err);
      res.status(500).send('An error occurred');
    }
  })
  
  
  app.get('/profiles/new',isLoggedIn, (req, res) => {
    const userId = req.user._id;
      res.render('profiles/new', { user: req.user })
  })
  
  app.post('/profiles',isLoggedIn, async (req, res) => {
      const newProfile = new Profile(req.body);
      await newProfile.save();
      res.redirect(`/profiles/${newProfile._id}`)
  })
  
  app.get('/profiles/:id',isLoggedIn, async (req, res) => {
      const { id } = req.params;
      const profile = await Profile.findById(id)
      res.render('profiles/show', { profile })
  })

  app.get('/profiles/:id/edit',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    res.render('profiles/edit', { profile });
});

app.put('/profiles/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/profiles/${profile._id}`);
});

app.delete('/profiles/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await Profile.findByIdAndDelete(id);
    res.redirect('/profiles');
});

//profile end





//doctors start

const categories =['myself', 'others'];
const genders =['male', 'female','other'];



app.get('/doctors/doct',isLoggedIn, async (req, res) => {
  const userId = req.user._id;
      
      const profiles = await Profile.find({ userId: userId }).exec();
  const doctors = await Doctor.find();
  res.render('doctors/doct', { doctors: doctors,profiles:profiles})
})


app.get('/doctors',isLoggedIn, async (req, res) => {

    try {
      const userId = req.user._id;
      const doctors = await Doctor.find({ userId: userId }).exec();
      const profiles = await Profile.find({ userId: userId }).exec();
      res.render('doctors/index', { doctors: doctors,profiles:profiles, user: req.user });
    } catch (err) {
      console.log(err);
      res.status(500).send('An error occurred');
    }
  })
  
  app.get('/doctors/new',isLoggedIn, async(req, res) => {
    const userId = req.user._id;
    const profiles = await Profile.find({ userId: userId }).exec();
      res.render('doctors/new', { user: req.user,profiles:profiles,categories ,genders})
  })
  
  app.post('/doctors',isLoggedIn, async (req, res) => {
      const newDoctor = new Doctor(req.body);
      await newDoctor.save();
      res.redirect(`/doctors/${newDoctor._id}`)
  })
  
  app.get('/doctors/:id',isLoggedIn, async (req, res) => {
      const { id } = req.params;
      const doctor = await Doctor.findById(id)
      res.render('doctors/show', { doctor })
  })

  app.get('/doctors/:id/edit',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    res.render('doctors/edit', { doctor });
});

app.put('/doctors/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/doctors/${doctor._id}`);
});

app.delete('/doctors/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await Doctor.findByIdAndDelete(id);
    res.redirect('/doctors');
});


//doctors end































app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})


