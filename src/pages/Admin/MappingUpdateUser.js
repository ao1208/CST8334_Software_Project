import { UserMappingForm } from "../../components";
import { useParams } from "react-router-dom";

// below data for demo purpose
const mappingData = [
  {
    salesId: "#Clover-001",
    salesName: "Michael",
    commission: "50%",
    merchantNo: "22535747431",
    SCPNo: "356456",
    merchantName: "Goopter",
    dateOpen: "1/24/2023",
    dateClosed: "NULL",
    status: "O",
  },
  {
    salesId: "#Clover-002",
    salesName: "Michael",
    commission: "50%",
    merchantNo: "22535747431",
    SCPNo: "356456",
    merchantName: "Goopter",
    dateOpen: "21/24/2023",
    dateClosed: "3/12/2023",
    status: "P",
  },
  {
    salesId: "#Clover-003",
    salesName: "Michael",
    commission: "50%",
    merchantNo: "22535747431",
    SCPNo: "356456",
    merchantName: "Goopter",
    dateOpen: "21/24/2023",
    dateClosed: "NULL",
    status: "O",
  },
  {
    salesId: "#Clover-004",
    salesName: "Michael",
    commission: "50%",
    merchantNo: "22535747431",
    SCPNo: "356456",
    merchantName: "Goopter",
    dateOpen: "21/24/2023",
    dateClosed: "3/12/2023",
    status: "O",
  },
  {
    salesId: "#Clover-005",
    salesName: "Michael",
    commission: "50%",
    merchantNo: "22535747431",
    SCPNo: "356456",
    merchantName: "Goopter",
    dateOpen: "21/24/2023",
    dateClosed: "NULL",
    status: "P",
  },
  {
    salesId: "#Clover-006",
    salesName: "Michael",
    commission: "50%",
    merchantNo: "22535747431",
    SCPNo: "356456",
    merchantName: "Goopter",
    dateOpen: "1/24/2023",
    dateClosed: "3/12/2023",
    status: "O",
  },
];
const MappingUpdateUser = () => {
  const { salesId } = useParams();

  const user = mappingData.find((user) => user.salesId === `#${salesId}`);

  return <UserMappingForm formType="update" userMapping={user} />;
};

export default MappingUpdateUser;
