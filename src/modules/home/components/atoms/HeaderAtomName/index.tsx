interface HeaderAtomNameProps {
  name: string;
}

export function HeaderAtomName({ name }: HeaderAtomNameProps) {
  return <span className="text-purple-primary">{name}</span>;
}
