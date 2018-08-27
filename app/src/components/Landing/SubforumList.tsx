import * as React from "react";
import { Link } from "react-router-dom";
import * as routes from '../../constants/routes'

export const SubforumList = (subforums: {}) => {
    const List = Object.keys(subforums).length > 0 && subforums.constructor === Object ? (
        <div>
            <h2>List of Subforums</h2>
            {
                Object.keys(subforums).map(key => (
                    <p key={key}>
                        <Link to={`${routes.SUBFORUM}/${key}`} key={key}>
                            {key}
                        </Link>
                    </p>
                ))
            }
        </div>
    ) : (<div>Loading subforums...</div>)
    return List
}