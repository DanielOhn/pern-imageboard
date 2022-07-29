import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import InputComment from '../Comments/InputComment';
import ListComments from '../Comments/ListComments';

const SinglePost = () => {
    const [post, setPost] = useState("");
    const thread = useParams();

    const getPost = async () => {
        try {
            const res = await fetch(`/posts/${thread.id}`);
            const data = await res.json();
            setPost(data);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <>
            <InputComment />
            <div className="posts">
                {post ?
                    <div className="post" key={post.id}>
                        <img src={process.env.REACT_APP_S3_URL + post.file} />
                        <div className="post-deets">
                            <p>{post.text}</p>
                            <small>{post.created}</small>
                        </div>
                    </div> :
                    <p>This thread doesn't exist!</p>
                }
            </div>
            <ListComments />

        </>
    )
}

export default SinglePost;