import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddCharacterForm({setAddCharacterOn}) {
  const characters = useSelector((store) => store.characters.rows);
  const user = useSelector((store) => store.user);
  const bosses = useSelector((store) => store.bosses.rows);

  const [characterName, setCharacterName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [mainStat, setMainStat] = useState(0);
  const [combatPower, setCombatPower] = useState(0);
  const [bossIds, setBossIds] = useState([]);
  const [weeklyMoney, setWeeklyMoney] = useState(0);

  const dispatch = useDispatch();

  const addCharacter = (characterToAdd, e) => {
    e.preventDefault();
    console.log('Submitting payload: ', characterToAdd);
    dispatch({
      type: 'POST_USER_CHARACTER',
      payload: characterToAdd,
    });
    setAddCharacterOn(false); // Close the popup after submission
  };

  const bossSelection = (i) => {
    const boss = bosses[i];
    if (!bossIds.includes(boss.id)) {
      setBossIds((prevBossIds) => [...prevBossIds, boss.id]);
    }

    const weeklyBosses = bosses.slice(0, i + 1);
    const weeklyBossIncome = weeklyBosses.reduce(
      (accumulator, currentValue) => accumulator + currentValue.money_earned,
      0
    );
    setWeeklyMoney(weeklyBossIncome);
  };

  return (
    
    <div
      className="addCharacterFormParentContainer"
      onClick={() => setAddCharacterOn(false)} // Close popup on background click
    >
      <div
        className="addCharacterFormContainer"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
      >
        
        <h2>Add a Character</h2>
        <form
          onSubmit={(e) => {
            addCharacter(
              {
                user_id: user.id,
                characterClass: Number(characterClass),
                characterName,
                weeklyMoney,
                bossIds,
                combatPower: parseInt(combatPower, 10),
                mainStat: parseInt(mainStat, 10),
              },
              e
            );
          }}
        >
          <div className="form-group">
            <label htmlFor="characterName">Character Name:</label>
            <input
              id="characterName"
              name="characterName"
              type="text"
              required
              placeholder="Enter character name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="class">Class:</label>
            <select
              id="class"
              name="class"
              required
              value={characterClass}
              onChange={(e) => setCharacterClass(e.target.value)}
            >
              <option value="" disabled>
                Select a class
              </option>
              {characters.map((char, index) => (
                <option key={index} value={char.id}>
                  {char.archetype} - {char.class_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mainStatLevel">Main Stat Level:</label>
            <input
              id="mainStatLevel"
              name="mainStatLevel"
              type="number"
              required
              placeholder="Enter main stat level"
              value={mainStat}
              onChange={(e) => setMainStat(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="combatPower">Combat Power:</label>
            <input
              id="combatPower"
              name="combatPower"
              type="number"
              required
              placeholder="Enter combat power"
              value={combatPower}
              onChange={(e) => setCombatPower(e.target.value)}
            />
          </div>

          <div className="bossGalleryContainer">
            <p>Bosses this character can clear:</p>
            <ul className="bossGallery">
              {bosses.map((boss, i) => (
                <li
                  className="bossGalleryItem"
                  onClick={() => bossSelection(i)}
                  key={i}
                  style = {{
                    backgroundColor: bossIds.includes(boss.id) ? 'red' : 'transparent'
                  }}
                >
                  {boss.bossname}
                </li>
              ))}
            </ul>
          </div>

          <button type="submit" className="submit-button">
            Add Character
          </button>
        </form>
      </div>
    </div>

  );
}

export default AddCharacterForm;
