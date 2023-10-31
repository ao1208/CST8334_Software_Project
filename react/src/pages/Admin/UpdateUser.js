import { UserManagementForm } from "../../components";
import { useParams } from "react-router-dom";

const userData = [
  {
    id: "#Clover-001",
    image: "/favicon.ico",
    firstName: "Michael",
    lastName: "Lucy",
    email: "m@goopter.com",
    phone: "000-111-2222",
    address: {
      street: "104 Royal Oak",
      city: "Burnaby",
      province: "British Columbia",
      country: "Canada",
      postal: "K4I 1F3",
    },
    hireDate: "01/01/2015",
    status: "1",
    role: "salesperson",
  },
  {
    id: "#Clover-002",
    image: "/favicon.ico",
    firstName: "Michael",
    lastName: "Lucy",
    email: "m@goopter.com",
    phone: "000-111-2222",
    address: {
      street: "104 Royal Oak",
      city: "Burnaby",
      province: "British Columbia",
      country: "Canada",
      postal: "K4I 1F3",
    },
    hireDate: "01/01/2015",
    status: "2",
    role: "salesperson",
  },
  {
    id: "#Clover-003",
    image: "/favicon.ico",
    firstName: "Michael",
    lastName: "Lucy",
    email: "m@goopter.com",
    phone: "000-111-2222",
    address: {
      street: "104 Royal Oak",
      city: "Burnaby",
      province: "British Columbia",
      country: "Canada",
      postal: "K4I 1F3",
    },
    hireDate: "01/01/2015",
    status: "2",
    role: "administrator",
  },
  {
    id: "#Clover-004",
    image: "/favicon.ico",
    firstName: "Michael",
    lastName: "Lucy",
    email: "m@goopter.com",
    phone: "000-111-2222",
    address: {
      street: "104 Royal Oak",
      city: "Burnaby",
      province: "British Columbia",
      country: "Canada",
      postal: "K4I 1F3",
    },
    hireDate: "01/01/2015",
    status: "2",
    role: "administrator",
  },
  {
    id: "#Clover-005",
    image: "/favicon.ico",
    firstName: "Michael",
    lastName: "Lucy",
    email: "m@goopter.com",
    phone: "000-111-2222",

    address: {
      street: "104 Royal Oak",
      city: "Burnaby",
      province: "British Columbia",
      country: "Canada",
      postal: "K4I 1F3",
    },
    hireDate: "01/01/2015",
    status: "2",
    role: "salesperson",
  },
  {
    id: "#Clover-006",
    image: "/favicon.ico",
    firstName: "Michael",
    lastName: "Lucy",
    email: "m@goopter.com",
    phone: "000-111-2222",
    address: {
      street: "104 Royal Oak",
      city: "Burnaby",
      province: "British Columbia",
      country: "Canada",
      postal: "K4I 1F3",
    },
    hireDate: "01/01/2015",
    status: "1",
    role: "salesperson",
  },
];
const UpdateUser = () => {
  const { userId } = useParams();

  const user = userData.find((user) => user.id === `#${userId}`);

  return <UserManagementForm formType="update" user={user} />;
};

export default UpdateUser;
