import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { Post } from "./Post";

interface Iprops {
  posts: {
    timestamp: null;
    id: string;
    name: string;
    message: string;
    image: string;
  }[];
}

export const Posts: React.FC<Iprops> = ({ posts }) => {
  const [realtimePosts] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );
  return (
    <div>
      {realtimePosts
        ? realtimePosts?.docs.map((post) => (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              timestamp={post.data().timestamp}
              image={post.data().image}
              postImage={post.data().postImage}
            />
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              timestamp={post.timestamp}
              image={post.image}
            />
          ))}
    </div>
  );
};
