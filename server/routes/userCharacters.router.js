const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:userId', (req, res) => {
    
    
    const queryText = `SELECT * FROM "user_characters"
                        WHERE user_id = $1`;
    const values = [req.params.userId]

  pool.query(queryText, values)
    .then((response)=>{
        res.send(response)
    })
    .catch(err=>{
        console.log('GET userCharacters.router isnt working', err)
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
