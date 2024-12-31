const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
    const queryText = 'SELECT * FROM "characters"';

  pool.query(queryText)
    .then((response)=>{
        res.send(response)
    })
    .catch(err=>{
        console.log('GET characters.router isnt working', err)
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
