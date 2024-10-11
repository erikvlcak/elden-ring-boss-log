export default function addBossReducer(addBossData,action) {

    switch(action.type) {

        case('name new boss'): {
          
                return({...addBossData, name: action.newName})
            
        }

        case('add new death count'): {
            
                return({...addBossData, deaths: +action.newCount})
            
        }
    }

}