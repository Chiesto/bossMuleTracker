import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import AddCharacterForm from '../AddCharacterForm/AddCharacterForm';
import './UserPage.css';

function UserPage() {

  const characters = useSelector(store => store.characters.rows)
  const user = useSelector((store) => store.user);
  const bosses = useSelector((store) => store.bosses.rows);
  const userCharacters = useSelector((store) => store.userCharacters.rows);

  const [addCharacterOn, setAddCharacterOn] = useState(false)
  
  const dispatch = useDispatch();

  // Function to get boss names based on the ability_to_clear IDs
  const idToBossName = (idArray) => {
    return bosses
      .filter(boss => idArray.includes(boss.id)) // Filter the bosses
      .map(boss => boss.bossname) // Extract the boss names
      .join(', '); // Join names into a comma-separated string
  }
  

  useEffect(()=>{
    dispatch({ type: 'FETCH_CHARACTERS' });
    dispatch({ type: 'FETCH_BOSSES' });
    dispatch({ type: 'FETCH_USER_CHARACTERS', payload: user.id});
  }, [dispatch, user.id]);

  
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />

      <div>

        {/* Table Start ---------- */}
        <table className="characterTable">
          <thead>
            <tr>
              <th>Your Characters</th>
              <th>Weekly Bosses Complete</th>
              <th>Weekly Quest</th>
            </tr>
          </thead>
          <tbody>
            {userCharacters?.map((character, index) => (
              <tr key={index}>
                <td>{character.char_name}</td>
                <td>
                  {character.ability_to_clear?.length > 0 ? (
                    idToBossName(character.ability_to_clear) // Convert ID array to boss names
                  ) : (
                    'None'
                  )}
                </td>
                <td>Weekly Quest Placeholder</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Table End ---------- */}
          
        <button onClick={() => setAddCharacterOn(true)}>Add Character</button>
          
        {addCharacterOn && (
          <AddCharacterForm setAddCharacterOn={setAddCharacterOn}/>
        )}
        
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
