import { useReducer, useState } from "react";
import changeBossReducer from "./ChangeBossReducer";
import addBossReducer from './addBossReducer'



export default function Test() {


  const [id, setId] = useState(bosses.length)
  const [difficulty, setDifficulty] = useState('');
  const [adding, setAdding] = useState(false);
  const [changedName, setChangedName] = useState('');
  const [list, dispatchEdit] = useReducer(changeBossReducer,bosses)
  const [addBossData, dispatchAdd] = useReducer(addBossReducer,{
    id: id,
    name: undefined,
    deaths: undefined,
    difficulty: difficulty,
    editing: false,
  })

  
  
function handleAddName(addedName) {
  dispatchAdd({type:'name new boss', newName: addedName})
}

function handleAddDeathCount(addedDeathCount) {
  dispatchAdd({type:'add new death count', newCount: addedDeathCount})
}


function handleAddNewBoss(){
  setId((prevVal) => prevVal + 1);
  dispatchEdit({ type: 'add boss to list', newBoss: {...addBossData, id, difficulty}, setAdding })
}

function handleEditing(selectedId) {
  dispatchEdit({type:'edit boss name', bossId: selectedId})
}

function handleConfirmEditing(editedId) {
  dispatchEdit({type: 'confirm name change', newName: changedName, bossId: editedId})
}

function handleDifficultyChange(changedId) {
  dispatchEdit({type: 'change difficulty', bossId: changedId})
}

function handleDeath(diedToId) {
  dispatchEdit({type: 'add death', bossId: diedToId})
}

function handleDeleteBoss(deleteId) {
  dispatchEdit({type: 'delete boss', bossId: deleteId})
}


  return (
    <div>
      <h1 className="text-center font-bold text-3xl mb-20 mt-4">
        Elden Ring Deaths log
      </h1>
      <div className="flex justify-evenly flex-wrap items-stretch gap-8">
        {list.map((boss) => {
          return (
            <div key={boss.id}>
              <div className="flex flex-col items-stretch justify-center gap-2 border-4 border-black p-4 rounded-3xl bg-slate-100 shadow-lg">
                {boss.editing ? (
                  <input
                    type="text"
                    name="boss"
                    id="bossName"
                    placeholder={boss.name}
                    onChange={(e) => setChangedName(e.target.value)}
                  />
                ) : (
                  <h2 className="font-bold text-3xl mb-8">{boss.name}</h2>
                )}
                {boss.editing ? (
                  <button
                    className="p-2 m-4 bg-green-500 border-2 border-black"
                    onClick={() => {
                      handleConfirmEditing(boss.id)
                      setChangedName('')
                    }}
                  >
                    Confirm change
                  </button>
                ) : (
                  <button
                    className="p-2 mb-4 border-2 border-black bg-pink-400 rounded-lg"
                    onClick={() => {
                      handleEditing(boss.id)
                    }}
                  >
                    Edit name
                  </button>
                )}
                <p className="mx-auto">
                  Difficulty:{' '}
                  <span className="font-black text-xl ">
                    {boss.difficulty.toUpperCase()}
                  </span>
                </p>
                <button
                  onClick={() => handleDifficultyChange(boss.id)}
                  className=" bg-orange-500 rounded-lg border-2 p-2 border-black mb-4"
                >
                  Switch difficulty
                </button>
                <p>Deaths on this difficulty: </p>
                <h3 className="text-4xl font-bold mx-auto">{boss.deaths}</h3>
                <button
                  onClick={() => handleDeath(boss.id)}
                  className="p-2 text-white bg-black mb-4"
                >
                  I just died
                </button>
                <button
                  onClick={() => handleDeleteBoss(boss.id)}
                  className=" bg-red-500 rounded-lg border-2 p-2 border-black"
                >
                  Delete {boss.name}
                </button>
              </div>
            </div>
          )
        })}

        {adding && (
          <div className="flex-col flex w-fit container gap-y-2 border-4 border-green-500 rounded-3xl bg-green-200 p-4 justify-evenly items-center">
            <label htmlFor="newName">Boss name:</label>
            <input
              type="text"
              name="newName"
              id="newName"
              onChange={(e) => handleAddName(e.target.value)}
            />
            <label htmlFor="newDeaths">Number of deaths</label>
            <input
              onChange={(e) => handleAddDeathCount(e.target.value)}
              type="number"
              name="newDeaths"
              id="newDeaths"
            />
            <div className="container">
              <legend htmlFor="newDifficulty">Difficulty:</legend>
              <input
                type="radio"
                name="newDifficulty"
                id="newDifficultyEasy"
                value="easy"
                onClick={(e) => {
                  setDifficulty(e.target.value)
                }}
              />
              <label htmlFor="newDifficultyEasy" className="mr-2">
                Easy
              </label>
              <input
                type="radio"
                name="newDifficulty"
                id="newDifficultyMedium"
                value="medium"
                onClick={(e) => {
                  setDifficulty(e.target.value)
                }}
              />
              <label htmlFor="newDifficultyMedium" className="mr-2">
                Medium
              </label>
              <input
                type="radio"
                name="newDifficulty"
                id="newDifficultyHard"
                value="hard"
                onClick={(e) => {
                  setDifficulty(e.target.value)
                }}
              />
              <label htmlFor="newDifficultyHard" className="mr-2">
                Hard
              </label>
            </div>
            <button
              onClick={handleAddNewBoss}
              className="bg-yellow-300 p-4 border-4 border-black rounded-xl hover:bg-yellow-400 transition-all"
            >
              Confirm
            </button>
          </div>
        )}
        <button
          className=" p-2 bg-green-500 rounded-xl mt-4 max-h-10"
          onClick={() => setAdding((prev) => !prev)}
        >
          Add new boss
        </button>
      </div>
    </div>
  )
 
}

 let bosses = [
   { id: 0, name: 'Malenia', deaths: 0, difficulty: 'hard', editing: false },
   { id: 1, name: 'Tibia Mariner', deaths: 0, difficulty: 'easy', editing: false,},
   { id: 2, name: 'Soldier of God Rick', deaths: 0, difficulty: 'medium', editing: false },
   { id: 3, name: 'Astel', deaths: 0, difficulty: 'hard', editing: false },
 ]
