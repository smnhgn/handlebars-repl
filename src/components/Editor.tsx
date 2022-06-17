import { useState } from "react";
import MonacoEditor, { OnChange } from "@monaco-editor/react";
import { EditorSelect } from "./EditorSelect";

const SAMPLE_TEMPLATE = `<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>`;

const SAMPLE_CONTEXT = `{
  "title": "My New Post",
  "body": "This is my first post!"
}`;

type EditorProps = {
  onChange: (html: string) => void;
};

export const Editor = ({ onChange }: EditorProps) => {
  const [fileName, setFileName] = useState<string>("index.html");
  const [editorConfig, setEditorConfig] = useState<Record<string, any>>({
    "index.html": {
      name: "index.html",
      language: "handlebars",
      value: SAMPLE_TEMPLATE,
    },
    "context.json": {
      name: "context.json",
      language: "json",
      value: SAMPLE_CONTEXT,
    },
  });
  const editor = editorConfig[fileName];

  const onModelChange: OnChange = (value) => {
    const currentValue = editorConfig[fileName].value;

    if (value && value !== currentValue) {
      setEditorConfig({
        ...editorConfig,
        [fileName]: {
          ...editorConfig[fileName],
          value,
        },
      });
    }
  };

  return (
    <div className="editor">
      <div className="editor__select">
        <EditorSelect name="index.html" currentName={fileName} onSelect={setFileName} />
        <EditorSelect name="context.json" currentName={fileName} onSelect={setFileName} />
      </div>
      <MonacoEditor
        className="editor__editor"
        path={editor.name}
        defaultLanguage={editor.language}
        defaultValue={editor.value}
        options={{
          roundedSelection: false,
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false,
          },
        }}
        onChange={onModelChange}
      />
    </div>
  );
};
