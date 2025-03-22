require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;
const { authenticateToken } = require('./middlewares/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5473',
    credentials: true,
  })
);
app.use(cookieParser());

app.get('/', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.listen(PORT, () => console.log(`🏃 --> Server up at port: ${PORT}`));
