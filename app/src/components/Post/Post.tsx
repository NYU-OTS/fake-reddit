import * as React from "react"
import CommentList from "../../containers/Post/CommentList";
import { FormCreateComment } from "../../containers/Post/FormCreateComment";

export const Post = (post: any) => (post
    ? (
        <div>
            <h3>{post.subject}</h3>
            <p>{post.content}</p>
            <h2>Comment</h2>
            <FormCreateComment />
            <CommentList />
        </div>
    ) : (
        <div>
            <h3>Loading brain power...</h3>
        </div>
    )
);