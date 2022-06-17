import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Handlebars REPL</h1>
      </header>
      <main className="content">
        <Editor />
        <Preview />
      </main>
    </div>
  );
}
