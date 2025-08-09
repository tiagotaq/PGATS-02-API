const userService = require('../service/userService');

exports.register = (req, res) => {
  try {
    const { username, password, favorecidos } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
    const user = userService.registerUser({ username, password, favorecidos });
    res.status(201).json({ username: user.username });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
    const user = userService.authenticateUser(username, password);
    res.json({ username: user.username });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.list = (req, res) => {
  res.json(userService.listUsers());
};
