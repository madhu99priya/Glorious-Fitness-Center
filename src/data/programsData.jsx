
import { FaRunning } from "react-icons/fa";
import { LuDumbbell } from "react-icons/lu";
import { FaFireAlt } from "react-icons/fa";
import { IoFitnessOutline } from "react-icons/io5";

export const programsData = [
  {
    id: 1,
    image: <LuDumbbell  size={25}/>,
    heading: "Strength Training",
    details:
      "In this program, you are trained to improve your strength through many exercises.",
  },
  {
    id:2,
    image: < FaRunning size={25}/>,
    heading: "Cardio Training",
    details:
      "In this program, you are trained to do sequential moves in range of 20 until 30 minutes.",
  },
  {
    id:3,
    image: <FaFireAlt  size={25}/>,
    heading: "Fat Burning",
    details:
      "This program is suitable for you who wants to get rid of your fat and lose their weight.",
  },
  {
    id: 4,
    image: <IoFitnessOutline size={25}/>,
    heading: "Health Fitness",
    details:
      "This programs is designed for those who exercises only for their body fitness not body building.",
  },
];



