import { useRef, useState } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useMount } from "../hooks/useMount";

const SAMPLE_TEMPLATE = `<div class="entry">
	<h1>{{title}}</h1>
	{{#if author}}
	<h2>{{author.firstName}} {{author.lastName}}</h2>
	{{else}}
	<h2>Unknown Author</h2>
	{{/if}}
	{{contentBody}}
</div>`;

type EditorProps = {
  onChange: (html: string) => void;
};

export const Editor = ({ onChange }: EditorProps) => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useMount(() => {
    if (monacoEl && !editor) {
      const editor = monaco.editor.create(monacoEl.current!, {
        value: SAMPLE_TEMPLATE,
        language: "handlebars",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
      });

      editor.onDidChangeModelContent((_) => emitChange(editor));

      emitChange(editor);
      setEditor(editor);
    }
  });

  const emitChange = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const currentValue = editor.getModel()?.getValue() ?? "";
    onChange(currentValue);
  };

  return <div className="editor" ref={monacoEl}></div>;
};
