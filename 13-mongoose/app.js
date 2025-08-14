const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('689db6ea307312db7d828055')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(3000);
// });

mongoose.connect('mongodb+srv://meezan:EIx2kxOS5naSwcyZ@cluster0.x6um4f6.mongodb.net/shop?retryWrites=true')
.then(result => {
  User.findOne().then(user=>{
    if(!user){
        const user = new User({
          name:"Meezan",
          email:'meezan@elred.io',
          cart:{
            items:[]
          }
        });
        user.save();
    }
  })
  console.log("Connected")
  app.listen(3000)
}).catch(err=>
  console.log(err)
)