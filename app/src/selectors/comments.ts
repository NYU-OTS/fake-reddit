import { createSelector } from 'reselect'

const commentsSelector = (state: {comments: {}}) => state.comments

export const totalCommentsSelector = createSelector(
    commentsSelector,
    comments => Object.keys(comments).length
)