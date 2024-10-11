export default function eldenReducer(list, action) {

switch (action.type) {
    case ('edit boss name'): {
    
        return list.map(item => {if (item.id === action.bossId) {
            return ({...item, editing: !item.editing})
        } else {
            return ({...item, editing: false})
        }})
        
    } 

    case ('confirm name change'): {

        return list.map(item => {if ((item.id === action.bossId)) {
            if (action.newName) {
                return ({...item, name: action.newName, editing: !item.editing})
            } else return { ...item, editing: false }
        } else 
            return item
        })
    }

    case ('change difficulty'): {
        return list.map(item => {if (item.id === action.bossId) {
          if (item.difficulty === 'easy') {
            return { ...item, difficulty: 'medium', deaths: 0 }
          } else if (item.difficulty === 'medium') {
            return { ...item, difficulty: 'hard', deaths: 0 }
          } else return { ...item, difficulty: 'easy', deaths: 0 }
          
        } else 
          return item
        })
}
    case ('add death'): {
        return list.map(item => {if (item.id === action.bossId) {
            return ({...item, deaths: item.deaths+1})
        } else return item})
    }

    case('delete boss'): {
        return list.filter(f => f.id != action.bossId)
    }

    case('add boss to list'): {
        action.setAdding(false)
        return [...list.slice(0),{...action.newBoss}]
    }

    default: {
        return list
    }
}

}