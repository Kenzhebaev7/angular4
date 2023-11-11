const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/db')
const {mongo} = require("mongoose");
const {db} = require("./config/db");
const express = require('express');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const Book = require('./models/book');
const Author = require('./models/author');

const app = express();

const port = 3000;

app.use(session({
  secret: 'narxoz',
  resave: false,
  saveUninitialized: true,
}));

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json()); // ex1

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use((err, req, res, next) => { // ex1
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Ақпарат қате жөнелтілді';

  res.status(statusCode).json({ error: errorMessage });
});
app.get('/error-route', (req, res, next) => {
  try {
    throw new Error('Test ERROR');
  } catch (error) {
    next(error);
  }
});


app.get('/', (req, res) => {
  res.redirect('/login')
})

app.get('/hello', (req, res) => { // ex1
    res.render('pages/index');
});
app.get('/hello/:id', (req, res) =>{ // ex1
    const uName = req.params.id
    res.render('pages/contacts' , { uName: uName })
});

app.post('/hello', (req, res, next) => { // ex1
  try {
    const data = req.body;
    res.json({ message: 'JSON запрос қабылданды', data });
  } catch (error) {
    res.json({ message: 'Тек қана JSON файлды қабылдаймын'});
    next(error);
  }
});
app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.get('/error-login', (req, res) => {
  res.render('pages/login-error')
})


app.post('/login-check', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.redirect('/error-login');
  }

  try {
    const user = await User.findOne({ name, password });
    if (user) {
      req.session.user = user;
      console.log('Authentication successful:', user);
      res.redirect('/books');
    } else {
      console.log('Authentication failed');
      res.redirect('/error-login');
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.redirect('/error-login');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      console.log('Session destroyed');
    }
    res.redirect('/');
  });
});




app.put('/hello/:id', (req, res) => { // ex1
  const uName = req.params.id;
  const updatedData = req.body;
  res.json({ message: `User - ${uName} information changed success`, updatedData });
});

app.delete('/hello/:id', (req, res) => { // ex1
  const uName = req.params.id;
  res.json({ message: `User - ${uName} deleted success` });
});

/////// BOOKS

function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    // User is authenticated, proceed to the next middleware or route handler.
    next();
  } else {
    // User is not authenticated, redirect to the login page or display an error message.
    res.redirect('/login'); // You can customize this based on your requirements.
  }
}
app.get('/books', ensureAuthenticated, async (req, res) => {
    const books = await Book.find();
    res.render('pages/books', { books });
});
app.get('/books/add', ensureAuthenticated, async (req, res) => {
    const authors = await Author.find();

    res.render('pages/add-book', { authors });
});


app.post('/books/add', ensureAuthenticated, async (req, res) => {
    const { name, author, publicationYear } = req.body;

    const newBook = new Book({ name, author, publicationYear });
    await newBook.save();

    res.redirect('/books');
});

// Edit book route
app.get('/books/edit/:id', ensureAuthenticated, async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    const authors = await Author.find();
    const selectedAuthor = book.get('author');

    res.render('pages/edit-book', { book, authors, selectedAuthor });
});

// Update book route
app.post('/books/update/:id', ensureAuthenticated,async (req, res) => {
    const bookId = req.params.id;
    const updatedData = req.body;

    await Book.findByIdAndUpdate(bookId, updatedData);

    res.redirect('/books');
});

// Delete book route
app.delete('/books/delete/:id', ensureAuthenticated, async (req, res) => {
    const bookId = req.params.id;

    try {
        const result = await Book.findByIdAndDelete(bookId);
        if (result) {
            console.log(`Book with ID ${bookId} has been deleted.`);
            res.redirect('/books');
        } else {
            console.log(`Book with ID ${bookId} not found.`);
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Book delete error' });
    }
});

app.get('/books/search', async (req, res) => {
    const { title } = req.query;

    const searchCriteria = {
        name: new RegExp(title, 'i'),
    };

    const books = await Book.find(searchCriteria);

    res.render('pages/books', { books });
});




////// Authors

const authorRoutes = require('./public/author');

app.use('/api', authorRoutes);


///////////////////////

const main = () => {
    return new Promise( (resolve,reject)=>
    {
        mongoose
            .connect(db)
            .then(() => {
                console.log('DB Connected');
                app.listen(port, () => {
                    console.log('Server started at: ' + port)
                    resolve();
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    })
}



app.get('/test', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/test.html'));
}
);
app.get('/add_student', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/add-students.html'));
});
app.get('/students_page', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/students.html'));
});

const Student = require('./models/student');

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
});

app.post('/students', async (req, res) => {
  try {
    const { name, surname, gpa } = req.body;
    const newStudent = new Student({ name, surname, gpa });
    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Student add error' });
  }
});
app.delete('/students/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const deletedStudent = await Student.findByIdAndRemove(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Student delete ERROR' });
    }
});

// const User = require('./models/user');
//
// app.get('/user', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error' });
//   }
// });
// app.post('/user', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const newUser = new User({ name, email, password });
//     const savedUser = await newUser.save();
//
//     res.status(201).json(savedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'User add error' });
//   }
// });
//
// app.delete('/user/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     console.log('User ID to delete:', userId);
//     const deletedUser = await User.findByIdAndRemove(userId);
//
//     if (!deletedUser) {
//       console.log('User not found for deletion:', userId);
//       return res.status(404).json({ error: 'User not found' });
//     }
//
//     console.log('User deleted successfully:', userId);
//     res.json({ message: 'User deleted' });
//     res.redirect('/')
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ error: 'User delete error' });
//   }
// });
//
// app.put('/user/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const { name, email, password } = req.body;
//
//     const user = await User.findById(userId);
//
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//
//     user.name = name;
//     user.email = email;
//     user.password = password;
//
//     const updatedUser = await user.save();
//
//     res.json(updatedUser);
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ error: 'User update error' });
//   }
// });


main()
    .then(() => {
        console.log("Success")
    })
    .catch((err)=>{
        console.log("ERROR")
    })
