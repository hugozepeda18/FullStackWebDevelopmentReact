import * as ActionsTypes from './ActionsTypes'
import { baseUrl } from '../shared/baseUrl'

export const addComment = (comment) => ({
    type: ActionsTypes.ADD_COMMENT,
    payload: comment
})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString()

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if(response.ok){
                return response
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
        error => {
            var errmss = new Error(error.message)
            throw errmss
        })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true))
    
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if(response.ok){
                return response
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
        error => {
            var errmss = new Error(error.message)
            throw errmss
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
    type:  ActionsTypes.DISHES_LOADING
})

export const dishesFailed = (errmess) => ({
    type: ActionsTypes.DISHES_FAILED,
    payload: errmess
})

export const addDishes = (dishes) => ({
    type: ActionsTypes.ADD_DISHES,
    payload: dishes
})

export const fetchComments = () => (dispatch) => {
    
    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok){
                return response
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
        error => {
            var errmss = new Error(error.message)
            throw errmss
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errmess) => ({
    type: ActionsTypes.COMMENTS_FAILED,
    payload: errmess
})

export const addComments = (comments) => ({
    type: ActionsTypes.ADD_COMMENTS,
    payload: comments
})

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true))
    
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if(response.ok){
                return response
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
        error => {
            var errmss = new Error(error.message)
            throw errmss
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
    type:  ActionsTypes.PROMOS_LOADING
})

export const promosFailed = (errmess) => ({
    type: ActionsTypes.PROMOS_FAILED,
    payload: errmess
})

export const addPromos = (promos) => ({
    type: ActionsTypes.ADD_PROMOS,
    payload: promos
})

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true))

    return fetch(baseUrl + 'feedback')
        .then(response => {
            if(response.ok){
                return response
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
        error => {
            var errmss = new Error(error.message)
            throw errmss
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
    type:  ActionsTypes.LEADERS_LOADING
})

export const leadersFailed = (errmess) => ({
    type: ActionsTypes.LEADERS_FAILED,
    payload: errmess
})

export const addLeaders = (leaders) => ({
    type: ActionsTypes.ADD_LEADERS,
    payload: leaders
})

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {

    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message,
    }
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {

            if (response.ok) {
                
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            ////if no responmse from server 
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(response => alert(JSON.stringify(response)))
        .catch(error => {
            console.log('Post Comments', error.message);
            alert('Comment could not be posted\nError' + error.message);
        });

}

