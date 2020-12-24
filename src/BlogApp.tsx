import React, { useEffect, useState } from "react";
import "./App.css";

function BlogApp() {
  return (
    <div className="App">
      <header className="App-header">This is the header</header>
      <main>hello this is the main</main>
      <BlogPosts />
      <footer>this is the footer</footer>
    </div>
  );
}
//TODO: read from config.  (or go to origin server and proxy)
// const baseURL = "https://neill-blog-pg-ts.herokuapp.com";
const baseURL = "http://localhost:4000";

interface IBlogPost {
  id: number;
  title: string;
  prose: string;
  date: string;
}

function BlogPosts() {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const fetchAndStorePosts = () => {
    fetch(`${baseURL}/posts/`)
      .then((res) => res.json())
      .then((json) => setPosts(json));
  };

  useEffect(fetchAndStorePosts, []);
  return (
    <div className="blog-posts">
      I will show all your blog posts. There are {posts.length}
      {posts.map((p) => (
        <BlogPost {...p} key={p.id} />
      ))}
    </div>
  );
}

const BlogPost: React.FC<IBlogPost> = ({ title, prose, date }) => {
  return (
    <div className="blog-post">
      <h2>{title}</h2>
      <div>{prose}</div>
      <div>Written on {date}</div>
    </div>
  );
};

export default BlogApp;
