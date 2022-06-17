import { useState } from "react";
import { useMount } from "../hooks/useMount";
import MonacoEditor, { OnChange } from "@monaco-editor/react";

const SAMPLE_TEMPLATE = `<div class="entry">
<h1>{{title}}</h1>
<div class="body">
  {{body}}
</div>
</div>`;

type EditorProps = {
  onChange: (html: string) => void;
};

export const Editor = ({ onChange }: EditorProps) => {
  const [template, setTemplate] = useState(SAMPLE_TEMPLATE);

  useMount(() => {
    onChange(template);
  });

  const onModelChange: OnChange = (value, event) => {
    console.log({ event });
    setTemplate(value ?? "");
    onChange(template);
  };

  return (
    <MonacoEditor
      className="editor"
      defaultLanguage="handlebars"
      defaultValue={SAMPLE_TEMPLATE}
      options={{
        roundedSelection: false,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
      }}
      onChange={onModelChange}
    />
  );
};
