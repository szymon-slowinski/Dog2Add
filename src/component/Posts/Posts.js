import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import {db} from '../../firebase'
import Post from '../Post/Post';


function Posts() {
    const [posts,setPosts] = useState([])
    
    useEffect(() => {
        onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
            setPosts(snapshot.docs);
        });
    }, [])
    return (
        <>  
        {posts.map((post) => <Post
            key={post.data().id}
            id={post.id}
            name={post.data().name}
            message={post.data().message}
            timestamp={post.data().timestamp}
            postPhoto={post.data().photo}
            postVideo={post.data().video}
            />
        )}
        </>
    )
}

export default Posts
