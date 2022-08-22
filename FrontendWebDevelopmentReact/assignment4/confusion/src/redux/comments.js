import { COMMENTS } from '../shared/comments';
import * as ActionsTypes from './ActionsTypes'

export const Comments = (state = COMMENTS, action) => {
    switch(action.type){
        case ActionsTypes.ADD_COMMENT: 
            let comment = action.payload
            comment.id = state.length
            comment.date = new Date().toISOString()
            return state.concat(comment)
        default: 
            return state
    }
}