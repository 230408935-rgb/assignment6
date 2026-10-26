import React from "react";

function Post({ title, body }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "10px", borderRadius: "6px" }}>
      <h3 style={{ margin: "0 0 8px 0", textTransform: "capitalize" }}>{title}</h3>
      <p style={{ margin: 0, color: "#555" }}>{body}</p>
    </div>
  );
}

export default Post;