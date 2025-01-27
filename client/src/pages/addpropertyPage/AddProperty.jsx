import HouseForm from "../../components/HouseForm/HouseForm";
import { useParams } from "react-router-dom";


export default function AddProperty() {
    const { id } = useParams();


    return (
        <HouseForm id={id} />
    )
}