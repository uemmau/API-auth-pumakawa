import express from 'express';

const app = express();
const PORT = 3000;

let isLoggedIn = false;

const users = [{ id: 0, name: 'Pancracio', mail: 'elpandecracio@gmail.com' }];

app.use(express.json());
app.use((req, res, next) => {
  console.log(`📦 Middleware → ${req.method} ${req.url}`);
  next();
});

function requireLogin(req, res, next) {
  if (!isLoggedIn) {
    return res.status(401).json({ message: 'Debes iniciar sesión para ver los usuarios' });
  }

  next();
}

function findUserById(userId) {
  return users.find((user) => user.id === userId);
}

app.get('/', (_req, res) => {
  res.send('Server');
});

app.post('/login', (req, res) => {
  const { isLoggedIn: requestedStatus } = req.body || {};

  if (typeof requestedStatus !== 'boolean') {
    return res.status(400).json({ message: 'Envía un valor booleano para isLoggedIn' });
  }

  isLoggedIn = requestedStatus;

  return res.status(200).json({
    message: 'Estado de sesión actualizado',
    isLoggedIn,
  });
});

app.get('/users', requireLogin, (_req, res) => {
  res.json(users);
});

app.post('/users', requireLogin, (req, res) => {
  const newUser = { ...req.body, id: Math.floor(Math.random() * 1000) };

  users.push(newUser);
  res.status(201).json(newUser);
});

//Se pone "users/1" al final del link u otro numero de ID simplemente, con el DELETE.
app.delete('/users/:id', requireLogin, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const [deletedUser] = users.splice(userIndex, 1);
  res.status(200).json(deletedUser);
});

//En "users/id" y el body es { "name": "HH", "mail": "HH@email.com" } para editar. con PUT
app.put('/users/:id', requireLogin, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = findUserById(userId);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  if (typeof req.body.name === 'string') user.name = req.body.name;
  if (typeof req.body.mail === 'string') user.mail = req.body.mail;

  res.status(200).json(user);
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
