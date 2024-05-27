import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';


export const plansData = [
  {
    icon: <FaRegStar size={25} />,
    name: "BASIC PLAN",
    price: "25",
    features: [
      "2 hours of excercises",
      "Free consultaion to coaches",
      "Access to The Community",
    ],
  },
  {
    icon: <FaStar  size={25}/>,
    name: "PREMIUM PLAN",
    price: "30",
    features: [
      "5 hour of excercises",
      "Free consultaion of Coaches",
      "Accessto minibar",
    ],
  },
  {
    icon: < FaStarHalfAlt  size={25}/>,
    name: "PRO PLAN",
    price: "45",
    features: [
      "8 hours of excercises",
      "Consultation of Private Coach",
      "Free Fitness Merchandises",
    ],
  },
];
