import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';


export const plansData = [
  {
    id: 1,
    icon: <FaRegStar size={25} />,
    name: "BASIC PLAN",
    price: "2500",
    features: [
      "Duration - 1 month",
      "Free consultaion to coaches",
      "Access to The Community",
    ],
  },
  {
    id: 2,
    icon: <FaStar  size={25}/>,
    name: "PREMIUM PLAN",
    price: "14000",
    features: [
      "Duration - 6 months",
      "Free consultaion of Coaches",
      "Accessto minibar",
    ],
  },
  {
    id: 3,
    icon: < FaStarHalfAlt  size={25}/>,
    name: "PRO PLAN",
    price: "29000",
    features: [
      "Duration - 1 year",
      "Consultation of Private Coach",
      "Free Fitness Merchandises",
    ],
  },
];
