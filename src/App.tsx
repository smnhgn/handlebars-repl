import { useState } from "react";
import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";

export default function App() {
  const [html, setHtml] = useState("");

  return (
    <div className="app">
      <header className="header">
        <h2>Handlebars REPL</h2>
      </header>
      <main className="content">
        <Editor onChange={setHtml} />
        <Preview html={html} />
      </main>
    </div>
  );
}
