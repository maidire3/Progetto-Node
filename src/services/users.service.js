const pool = require("../config/db");

const createUser = async ({ nickname, age, city }) => {
  const [result] = await pool.execute(
    "INSERT INTO users (nickname, age, city) VALUES (?, ?, ?)",
    [nickname.trim(), age, city.trim()]
  );

  return getUserById(result.insertId);
};

const getUsers = async () => {
  const [rows] = await pool.execute(
    "SELECT id, nickname, age, city FROM users ORDER BY id DESC"
  );

  return rows;
};

const getUserById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT id, nickname, age, city FROM users WHERE id = ?",
    [id]
  );

  return rows[0] || null;
};

const updateUser = async (id, { nickname, age, city }) => {
  await pool.execute(
    "UPDATE users SET nickname = ?, age = ?, city = ? WHERE id = ?",
    [nickname.trim(), age, city.trim(), id]
  );

  return getUserById(id);
};

const deleteUser = async (id) => {
  const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser
};
