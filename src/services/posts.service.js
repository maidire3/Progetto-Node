const pool = require("../config/db");

const createPost = async ({ title, insertedAt }) => {
  const [result] = await pool.execute(
    "INSERT INTO posts (title, inserted_at) VALUES (?, ?)",
    [title.trim(), insertedAt]
  );

  return getPostById(result.insertId);
};

const getPosts = async ({ insertedAt, city, interactionDate }) => {
  let query = `
    SELECT
      p.id,
      p.title,
      p.inserted_at AS insertedAt,
      COUNT(i.id) AS totalInteractions,
      SUM(CASE WHEN i.interaction_type = 'like' THEN 1 ELSE 0 END) AS totalLikes,
      SUM(CASE WHEN i.interaction_type = 'comment' THEN 1 ELSE 0 END) AS totalComments
    FROM posts p
    LEFT JOIN interactions i ON p.id = i.post_id
    LEFT JOIN users u ON i.user_id = u.id
    WHERE 1 = 1
  `;

  const params = [];

  if (insertedAt) {
    query += " AND DATE(p.inserted_at) = ? ";
    params.push(insertedAt);
  }

  if (city) {
    query += " AND u.city = ? ";
    params.push(city);
  }

  if (interactionDate) {
    query += " AND DATE(i.interaction_time) = ? ";
    params.push(interactionDate);
  }

  query += `
    GROUP BY p.id, p.title, p.inserted_at
    ORDER BY p.inserted_at DESC
  `;

  const [rows] = await pool.execute(query, params);
  return rows.map(mapAggregatedPost);
};

const getPostById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT id, title, inserted_at AS insertedAt FROM posts WHERE id = ?",
    [id]
  );

  return rows[0] || null;
};

const updatePost = async (id, { title, insertedAt }) => {
  await pool.execute(
    "UPDATE posts SET title = ?, inserted_at = ? WHERE id = ?",
    [title.trim(), insertedAt, id]
  );

  return getPostById(id);
};

const deletePost = async (id) => {
  const [result] = await pool.execute("DELETE FROM posts WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

const mapAggregatedPost = (row) => ({
  id: row.id,
  title: row.title,
  insertedAt: row.insertedAt,
  totalInteractions: Number(row.totalInteractions || 0),
  totalLikes: Number(row.totalLikes || 0),
  totalComments: Number(row.totalComments || 0)
});

module.exports = {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost
};
