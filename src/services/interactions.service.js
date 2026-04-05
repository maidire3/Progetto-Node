const pool = require("../config/db");

const createInteraction = async ({ postId, userId, interactionType, interactionTime }) => {
  const [result] = await pool.execute(
    `
      INSERT INTO interactions (post_id, user_id, interaction_type, interaction_time)
      VALUES (?, ?, ?, ?)
    `,
    [postId, userId, interactionType, interactionTime]
  );

  return getInteractionById(result.insertId);
};

const getInteractions = async () => {
  const [rows] = await pool.execute(
    `
      SELECT
        i.id,
        i.post_id AS postId,
        i.user_id AS userId,
        i.interaction_type AS interactionType,
        i.interaction_time AS interactionTime
      FROM interactions i
      ORDER BY i.interaction_time DESC
    `
  );

  return rows;
};

const getInteractionById = async (id) => {
  const [rows] = await pool.execute(
    `
      SELECT
        i.id,
        i.post_id AS postId,
        i.user_id AS userId,
        i.interaction_type AS interactionType,
        i.interaction_time AS interactionTime
      FROM interactions i
      WHERE i.id = ?
    `,
    [id]
  );

  return rows[0] || null;
};

const updateInteraction = async (id, { postId, userId, interactionType, interactionTime }) => {
  await pool.execute(
    `
      UPDATE interactions
      SET post_id = ?, user_id = ?, interaction_type = ?, interaction_time = ?
      WHERE id = ?
    `,
    [postId, userId, interactionType, interactionTime, id]
  );

  return getInteractionById(id);
};

const deleteInteraction = async (id) => {
  const [result] = await pool.execute("DELETE FROM interactions WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  createInteraction,
  deleteInteraction,
  getInteractionById,
  getInteractions,
  updateInteraction
};
