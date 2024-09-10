// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb+srv://StephenStolk:CoH2KrCyCUMtKeWC@cluster0.ymqn7a7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   address: String,
// //   imageUrl: String,
// });

// const User = mongoose.model('User', userSchema);

// // const storage = multer.memoryStorage();
// // const upload = multer({ storage: storage });

// app.post('/register', async (req, res) => {
//   try {
//     const { name, age, address } = req.body;
//     // if (!req.file) {
//     //   throw new Error('No file uploaded');
//     // }
    
//     // const imageUrl = `data:image/jpeg;base64,${req.file.buffer.toString('base64')}`;

//     const user = new User({ name, age, address, imageUrl });
//     await user.save();

//     res.status(200).send({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error:', error); // Detailed error logging
//     res.status(500).send({ message: 'Error registering user', error: error.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://StephenStolk:CoH2KrCyCUMtKeWC@cluster0.ymqn7a7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  try {
    const { name, age, address } = req.body;

    if (!name || !age || !address) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const user = new User({ name, age, address });
    await user.save();

    res.status(200).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error); // Detailed error logging
    res.status(500).send({ message: 'Error registering user', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
