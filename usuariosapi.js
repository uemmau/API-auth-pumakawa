import express from 'express';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`📦 Middleware → ${req.method} ${req.url}`);
  next();
});

let isLoggedIn = false;

function requireLogin(req, res, next) {
  if (!isLoggedIn) {
    return res.status(401).json({ message: 'Debes iniciar sesión para ver los usuarios' }); 
  }

  next();
}

const users = [
    { id: 0, name: 'Pancracio', mail: 'elpandecracio@gmail.com' },
  ];

app.get('/', (req, res) => {
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
    isLoggedIn
  });
});

app.get('/users', requireLogin, (req, res) => {
  res.json(users);
});

app.post('/users', requireLogin, (req, res) => {
  const newUser = req.body;
  console.log('Nuevo usuario recibido:', newUser);

  newUser.id = Math.floor(Math.random() * 1000);
  users.push(newUser);
  res.status(201).json(newUser);
});

//Se pone "users/1" al final del link u otro numero de ID simplemente, con el DELETE.
app.delete('/users/:id', requireLogin, (req, res) => {
  const userId = parseInt(req.params.id);
  console.log(`Eliminando Usuario con ID: ${userId}`);

  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const deletedUser = users.splice(userIndex, 1);
  res.status(200).json(deletedUser[0]);
});

//En "users/id" y el body es { "name": "HH", "mail": "HH@email.com" } para editar. con PUT
app.put('/users/:id', requireLogin, (req, res) => {
  const userId = parseInt(req.params.id);
  const updateData = req.body; 
  console.log(`Editando Usuario con ID: ${userId}`);

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  if (updateData.name) user.name = updateData.name;
  if (updateData.mail) user.mail = updateData.mail;

  res.status(200).json(user);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
