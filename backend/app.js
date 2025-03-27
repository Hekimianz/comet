require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const { authenticateToken } = require('./middlewares/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('/', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.listen(PORT, () => console.log(`🏃 --> Server up at port: ${PORT}`));
