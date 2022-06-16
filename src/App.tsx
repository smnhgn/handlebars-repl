import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Handlebars REPL</h1>
      </header>
      <div className="content">
        <Editor />
        <Preview />
      </div>
    </div>
  );
}
