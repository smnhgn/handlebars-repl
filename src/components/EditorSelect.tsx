type EditorSelectProps = {
  name: string;
  currentName: string;
  onSelect: (name: string) => void;
};

export const EditorSelect = ({ name, currentName, onSelect }: EditorSelectProps) => {
  const onClick = () => onSelect(name);

  return (
    <button disabled={name === currentName} onClick={onClick}>
      {name}
    </button>
  );
};