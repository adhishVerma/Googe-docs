import React from "react";
import NewDoc from "./NewDoc.js";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="flex">Start a new document</h1>
      <section className="home-section">
        <div>
          <NewDoc>
            <img
              src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              alt="new-doc-btn"
              className="btn-hover"
            ></img>
          </NewDoc>
          <span>Blank</span>
        </div>
      </section>
      <h2 className="flex">Recent docs</h2>
      <section className="home-section"></section>
    </div>
  );
}
