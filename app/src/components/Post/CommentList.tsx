import * as React from "react";

export const CommentList = (comments: any) => {
  return (
    comments.constructor === Object
      ? (
        Object.keys(comments).length > 0
          ? (
            <div>
              <h2>Comments on this Post</h2>
              <hr />
              {
                Object.keys(comments).map(key => (
                  <div key={key}>
                    <p>
                      {comments[key].poster}
                      <span> | </span>
                      {comments[key].timestamp}
                    </p>
                    <p>{comments[key].content}</p>
                    <hr />
                  </div>
                ))
              }
            </div>
          ) : (<div>No comments</div>)
      ) : (<div>Loading comments...</div>)
  )
}