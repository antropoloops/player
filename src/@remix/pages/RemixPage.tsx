import { useParams } from "react-router-dom";
import ShowEditRemix from "../components/remix/ShowEditRemix";
import RemixLayout from "../components/RemixLayout";

export default function RemixPage() {
  const params = useParams<{ id: string }>();
  return (
    <RemixLayout
      remixId={params.id}
      editor={(ctx) => <ShowEditRemix {...ctx} />}
    ></RemixLayout>
  );
}
