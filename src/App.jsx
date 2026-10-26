import React, { useReducer, useEffect, useState } from "react";
import { postsReducer, initialState } from "./reducer/postsReducer";
import { fetchPosts } from "./api/postsApi";
import PostList from "./components/PostList";
import FilterForm from "./components/FilterForm";

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getPosts = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchPosts(controller.signal);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({ type: "FETCH_ERROR", payload: err.message || "Something went wrong" });
        }
      }
    };

    getPosts();

    return () => {
      controller.abort();
    };
  }, []);

  // Derived State: Filtreleme işlemi render sırasında yapılır, ayrı bir state'te tutulmaz.
  const filteredPosts = state.posts.filter((post) =>
    post.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Post Dashboard</h1>
      
      <FilterForm filterText={filterText} onFilterChange={setFilterText} />

      {state.loading && <p>Loading posts...</p>}
      
      {state.error && <p style={{ color: "red" }}>Error: {state.error}</p>}

      {!state.loading && !state.error && filteredPosts.length === 0 && (
        <p>No posts found.</p>
      )}

      {!state.loading && !state.error && filteredPosts.length > 0 && (
        <PostList posts={filteredPosts} />
      )}
    </div>
  );
}

export default App;