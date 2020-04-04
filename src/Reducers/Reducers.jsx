export const ChangeTitle = ( state = { mainTitle: 'App'}, action) => {
    switch (action.type) {
        case 'CHANGE_APP_TITLE':
            return { mainTitle: action.payload}
        default:
            return state
    }
}