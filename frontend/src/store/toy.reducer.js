export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'

// export const UPDATE_TODO_PROGRESS = 'UPDATE_TODO_PROGRESS'
// export const UPDATE_FILTER = 'UPDATE_FILTER'
// export const UPDATE_IS_EDIT = 'UPDATE_IS_EDIT'


const initialState = {
    toys: [],
    // filterBy: {
    //     text: '',
    //     toyState: 'all',
    // },
}


export function toyReducer(state = initialState, action) {
    console.log('action -> toy.reducer.js', action)
    // console.log('state.filterBy -> todo.reducer.js', state.filterBy)
    let toys

    switch (action.type) {
        case SET_TOYS:
            toys = action.toys
            // .filter(toy => toy.text.toLowerCase().includes(state.filterBy.text.toLowerCase()))
            return { ...state, toys }
        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }
        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }



        // case UPDATE_FILTER:
        //     return { ...state, filterBy: action.filterBy }


        default:
            return state
    }
}