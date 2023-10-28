import { CommissionPayoutForm } from "../../components";
import { useParams } from "react-router-dom";
const data = [
  {
    date: "2023/05/01",
    salesID: "#Clover-001",
    salesName: "Ken",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    type: "commission",
    value: 1.53,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
  {
    date: "2023/05/01",
    salesID: "#Clover-002",
    salesName: "Ken",
    merchantNo: "",
    MerchantName: "",
    type: "commission",
    value: 0,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
  {
    date: "2023/05/01",
    salesID: "#Clover-003",
    salesName: "Ken",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    type: "commission",
    value: 1.53,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
  {
    date: "2023/05/01",
    salesID: "#Clover-004",
    salesName: "Ken",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    type: "pay out",
    value: 3.53,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
];
const CommissionPayoutUpdate = () => {
  const { salesId } = useParams();

  const user = data.find((user) => user.salesID === `#${salesId}`);

  return <CommissionPayoutForm formType="update" user={user} />;
};

export default CommissionPayoutUpdate;
