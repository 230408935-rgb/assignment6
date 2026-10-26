# Assignment 6 - Post Dashboard

## Project Structure
- `src/api/postsApi.js`: Handles API calls using native fetch API.
- `src/reducer/postsReducer.js`: Manages async states (loading, success, error) purely.
- `src/components/`:
  - `Post.jsx`: Displays single post.
  - `PostList.jsx`: Renders list of posts.
  - `FilterForm.jsx`: Controlled input for user filter.
- `src/App.jsx`: Main orchestration component managing state and side effects.

## Challenges Faced
1. **Memory Leaks and AbortController**: Handling cleanup in `useEffect` to ensure fetch requests cancel if the component unmounts.
2. **Derived State Concept**: Ensuring filtered posts are computed on the fly during render rather than stored separately in state, avoiding unnecessary re-renders and redundant state management.