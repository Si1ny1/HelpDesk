const oracledb = require('oracledb');

async function initPool() {
  await oracledb.createPool({
    user: 'pdb',
    password: 'Cookie',
    connectString: 'localhost:1521/XEPDB1',
    poolMin: 2,
    poolMax: 10,
    poolIncrement: 1
  });
}

async function query(sql, params = []) {
  const connection = await oracledb.getConnection(); // bierze z puli
  try {
    const result = await connection.execute(sql, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    return result.rows;
  } finally {
    await connection.close(); // wraca do puli, nie zamyka realnie
  }
}

module.exports = { initPool, query };