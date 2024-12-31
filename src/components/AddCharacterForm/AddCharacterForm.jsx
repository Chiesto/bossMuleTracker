import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';


function AddCharacterForm(){

      const characters = useSelector(store => store.characters.rows)
      const user = useSelector((store) => store.user);
      const bosses = useSelector((store) => store.bosses.rows);
      const userCharacters = useSelector((store) => store.userCharacters.rows);
    
      const [addCharacterOn, setAddCharacterOn] = useState(false)
      const [characterName, setCharacterName] = useState('');
      const [characterClass, setCharacterClass] = useState('');
      const [mainStat, setMainStat] = useState(0);
      const [combatPower, setCombatPower] = useState(0);
      const [bossIds, setBossIds] = useState([]);
      const [weeklyMoney, setWeeklyMoney] = useState(0);
      
    
    
      const dispatch = useDispatch();
      
    
      const addCharacter = (characterToAdd) => {
        dispatch({type: 'POST_USER_CHARACTER', payload:characterToAdd})
    
      }
    
      const bossSelection = (i) => {
        const boss = bosses[i];
      
        if (!bossIds.includes(boss.id)) {
          setBossIds([...bossIds, boss.id]);
        }
      
        const weeklyBosses = bosses.slice(0, i + 1);
        const weeklyBossIncome = weeklyBosses.reduce(
          (accumulator, currentValue) => accumulator + currentValue.money_earned, 0
        );
        setWeeklyMoney(weeklyBossIncome);
      };

    return(
        <div className="addCharacterFormContainer">
          <form onSubmit={()=>(
            addCharacter({
              user_id: user.id,
              characterClass,
              characterName, 
              weeklyMoney,
              mainStat,
              combatPower
            })
            )}>
            <div className="addCharacterInputs">
              <div className="form-group">
                <label htmlFor="characterName">Character Name:</label>
                <input id="characterName" name="characterName" type="text" required placeholder="Enter character name" onChange={(e)=>setCharacterName(e.target.value)}/>
              </div>
        
              <div className="form-group">
                <label htmlFor="class">Class:</label>
                <input id="class" name="class" type="text" required placeholder="Enter class" onChange={(e)=>setCharacterClass(e.target.value)}/>
              </div>
        
              <div className="form-group">
                <label htmlFor="mainStatLevel">Main Stat Level:</label>
                <input id="mainStatLevel" name="mainStatLevel" type="number" required placeholder="Enter main stat level" onChange={(e)=>setMainStat(e.target.value)}/>
              </div>
        
              <div className="form-group">
                <label htmlFor="combatPower">Combat Power:</label>
                <input id="combatPower" name="combatPower" type="number" required placeholder="Enter combat power" onChange={(e)=>setCombatPower(e.target.value)}/>
              </div>
            </div>
        
            <div className="bossGalleryContainer">
              <p>Bosses this character can clear:</p>
              <ul className="bossGallery">
                {bosses?.map((boss, i) => (
                  <li onClick={()=> bossSelection(i)} key={i}>{boss.bossname}</li>
                ))}
              </ul>
            </div>
        
            <button type="submit" className="submit-button">Add Character</button>
          </form>
        </div>
    )
}

export default AddCharacterForm