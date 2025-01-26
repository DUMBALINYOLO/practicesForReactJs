import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import './InfiniteScrollList.css'; // Import CSS for styling

const InfiniteScrollList = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      setHasMore(false);  // Stop infinite scroll on error
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = async () => {
    const newPosts = await fetchPosts();
    if (newPosts) {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      if (newPosts.length === 0) {
        setHasMore(false);  // No more posts to load
      }
    }
  };

  useEffect(() => {
    loadMorePosts();
  }, []);

  return (
    <div className="infinite-scroll-container">
      <h1>Infinite Scroll List</h1>
      {error && <p className="error-message">{error}</p>}
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={<div className="spinner">Loading...</div>}
        endMessage={<p className="end-message">You have seen it all!</p>}
      >
        {posts.length === 0 && !loading && !error ? (
          <p className="empty-state">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))
        )}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollList;
