import React, { useEffect, useState } from "react";
import "./App.css";

function BlogApp() {
  const handleClickOneBlogPost: (id: number) => void = (id: number) => {
    setFocusedId(id);
  };
  const handleClickListAll: () => void = () => {
    setFocusedId(null);
  };

  const [focusedId, setFocusedId] = useState<number | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        {focusedId !== null && (
          <div className="listAll" onClick={handleClickListAll}>
            See all posts
          </div>
        )}
      </header>
      <main>
        {focusedId === null ? (
          <BlogPosts {...{ handleClickOneBlogPost }} />
        ) : (
          <SingleBlogPost id={focusedId} />
        )}
      </main>
      <footer>this is the footer</footer>
    </div>
  );
}
//TODO: (go to origin server and proxy?)
console.assert(process.env.REACT_APP_API_BASE, "Need api base env var");
const apiBaseURL = process.env.REACT_APP_API_BASE;

interface IBlogPost {
  id: number;
  title: string;
  prose: string;
  date: string;
}
interface IBlogPostProps extends IBlogPost {
  handleClick: (id: number) => void;
}

interface IBlogPostsProps {
  handleClickOneBlogPost: (e: any) => void;
}

const BlogPosts: React.FC<IBlogPostsProps> = (props) => {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const fetchAndStorePosts = () => {
    fetch(`${apiBaseURL}/posts/`)
      .then((res) => res.json())
      .then((json) => setPosts(json));
  };

  useEffect(fetchAndStorePosts, []);
  return (
    <div className="blog-posts">
      I will show all your blog posts. There are {posts.length}
      {posts.map((p) => (
        <BlogPost
          {...p}
          handleClick={props.handleClickOneBlogPost}
          key={p.id}
        />
      ))}
    </div>
  );
};

const BlogPost: React.FC<IBlogPostProps> = ({
  id,
  title,
  prose,
  date,
  handleClick,
}) => {
  return (
    <div className="blog-post">
      <h2 onClick={() => handleClick(id)}>{title}</h2>
      <div>{prose}</div>
      <div>Written on {date}</div>
    </div>
  );
};

interface ISingleBlogPostProps {
  id: number;
}
interface IComment {
  id: number;
  post_id: number;
  prose: string;
  date: string;
}

interface ICommentProps extends IComment {}

const SingleBlogPost: React.FC<ISingleBlogPostProps> = ({ id }) => {
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);

  const fetchAndStoreComments = async () => {
    const res = await fetch(apiBaseURL + `/posts/${id}/comments`);
    const json = await res.json();
    setComments(json);
  };

  const fetchAndStorePost = async () => {
    const res = await fetch(apiBaseURL + `/posts/${id}`);
    const json = await res.json();
    setPost(json);
  };

  useEffect(() => {
    fetchAndStoreComments();
    fetchAndStorePost();
  }, [id]);
  if (post !== null && comments !== null) {
    return (
      <div className="blog-post">
        <h2>{post.title}</h2>
        <div>{post.prose}</div>
        <div>Written on {post.date}</div>
        <div className="commentsList">
          {comments.map((c) => (
            <Comment {...c} key={c.id} />
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

const Comment: React.FC<ICommentProps> = ({ prose, date }) => (
  <div className="comment">
    <div className="comment-header">Comment by anonymous at {date}</div>
    <div className="comment-prose">{prose}</div>
  </div>
);

export default BlogApp;
