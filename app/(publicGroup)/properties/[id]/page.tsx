import { getPropertyById } from "@/lib/services/getPropertyById";
import SinglePropertyCard from "../../_components/SinglePropertyCard";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

const SingleProperty = async ({ params }: Props) => {
    const { id } = await params; // getting the id from the params

    const result = await getPropertyById(id); // getting property by id
    const property = result.data;

    return (
        <div>
            <SinglePropertyCard property={property} />
        </div>
    );
};

export default SingleProperty;