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

export const Editor = () => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useMount(() => {
    if (monacoEl && !editor) {
      setEditor(
        monaco.editor.create(monacoEl.current!, {
          value: SAMPLE_TEMPLATE,
          language: "handlebars",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false
          }
        })
      );
    }
  });

  return <div className="editor" ref={monacoEl}></div>;
};
