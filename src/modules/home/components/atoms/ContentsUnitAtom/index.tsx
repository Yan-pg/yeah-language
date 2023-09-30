interface UnitMoleculeProps {
  contents: string[];
}

export function ContentsUnitAtom({ contents }: UnitMoleculeProps) {
  return (
    <div className="text-left line-clamp-2 text-gray-300">
      <span className="break-all text-gray-700">{contents.join(", ")}</span>
    </div>
  );
}
