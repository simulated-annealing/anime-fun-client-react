const FEEDBACK_URL='http://localhost:3001/api/feedbacks'

export const getFeedbacks = () => 
    fetch(FEEDBACK_URL).then(resp =>
        resp.json())

export const postFeedback = feedback => 
    fetch(FEEDBACK_URL, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(feedback),
        headers: {
            'content-type': 'application/json'
        }
    }).then(resp => resp.json())

export const deleteFeedback = feedbackId =>
    fetch(`${FEEDBACK_URL}/${feedbackId}`, {
        method: 'DELETE',
        credentials: 'include'
    }).then(res => res.json())

export default {
    getFeedbacks,
    postFeedback,
    deleteFeedback
}
