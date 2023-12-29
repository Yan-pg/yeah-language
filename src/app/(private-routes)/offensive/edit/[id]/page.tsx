import { CreateOrEditOffensiveTemplate } from "@/modules/offensive/templete/CreateOrEditOffensive";

interface EditOffensiveProps {
  params: {
    id: string;
  };
}

export default function EditOffensive({ params }: EditOffensiveProps) {
  return <CreateOrEditOffensiveTemplate offensiveId={params.id} />;
}
