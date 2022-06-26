import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";

import { LogIn, LogOut } from "./components/Auth";
import Notifications from "./components/Notifications";

import { useEnvironment } from "./hooks/useEnvironment";
import Togglable from "./components/Togglable";

let id = 0;

const useBlogs = (initialValue = []) => {
  const { showNotification } = useEnvironment();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState(initialValue);

  useEffect(() => {
    blogService.getAll().then((allBlogs) => {
      setBlogs(allBlogs)
    })
      .catch((error) => showNotification(error, 'danger'))
      .finally(() => setLoading(false))
  }, [showNotification]);

  return { blogs, setBlogs, loading }
}

const BlogApp = () => {
  const { user, showNotification } = useEnvironment();
  const { blogs, setBlogs, loading } = useBlogs();

  const handleBlogSubmit = (event) => {
    event.preventDefault();
    const blog = new FormData(event.currentTarget);
    blogService
      .postBlog({
        title: blog.get("title"),
        author: blog.get("author"),
        url: blog.get("url"),
      })
      .then((returnedBlog) => {
        showNotification(
          `A new Blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          "success"
        );
        setBlogs((prevBlogs) => prevBlogs.concat(returnedBlog));
      })
      .catch((error) => showNotification(error.message, "danger"))
      .finally(() => {
        id++;
      });
  };

  const likeBlog = (blog) => {
    blogService.likeBlog(blog.id).then((returnedBlog) => {
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => {
          return b.id === blog.id ? returnedBlog : b;
        })
      );
    });
  };

  const deleteBlog = (blog) => {
    blogService.deleteBlog(blog.id).then(() => {
      setBlogs(blogs.filter(b => b.id !== blog.id))
      showNotification(`${blog.title} was removed successfully`, 'success')
    }).catch(() => showNotification(`Error removing ${blog.title}`, 'danger'))
  }


  if (loading) return (
    <div>Loading...</div>
  )

  const shownBlogs = blogs.sort((a, b) => b.likes - a.likes)
  const isBlogFromUser = (blog) => blog.user?.id === user.id

  return (
    <div>
      <h3>Post a new Blog</h3>
      <p>{user.name} logged in!</p>
      <Togglable label={"create post"}>
        <BlogForm key={id} handleSubmit={handleBlogSubmit} />
      </Togglable>
      <h3>blogs</h3>
      {shownBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} likeBlog={() => likeBlog(blog)} deleteBlog={() => deleteBlog(blog)} isBlogFromUser={isBlogFromUser(blog)} />
      ))}
      <LogOut />
    </div>
  );
};

const App = () => {
  const { user } = useEnvironment();

  return (
    <div>
      <Notifications />
      {!user ? <LogIn /> : <BlogApp />}
    </div>
  );
};

export default App;
