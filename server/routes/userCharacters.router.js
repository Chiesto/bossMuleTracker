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
  
  console.log(req.body);


  const queryText = `INSERT INTO "user_characters" (user_id, character_id, char_name, weekly_money, ability_to_clear, combat_power, main_stat)
                      VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  const values = [req.body.user_id, req.body.characterClass, req.body.characterName, req.body.weeklyMoney, req.body.bossIds, req.body.combatPower, req.body.mainStat]

  pool.query(queryText, values)
    .then((response)=>{
      console.log('SUCCESS! userCharacter.router POST')
      res.sendStatus(200)
    }) .catch(error=>{
      console.log('problems in userCharacters.router POST => ', error)
      res.sendStatus(500)
    })
  

});

module.exports = router;
