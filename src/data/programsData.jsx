
import { FaRunning } from "react-icons/fa";
import { LuDumbbell } from "react-icons/lu";
import { FaFireAlt } from "react-icons/fa";
import { IoFitnessOutline } from "react-icons/io5";

export const programsData = [
  {
    image: <LuDumbbell  size={25}/>,
    heading: "Strength Training",
    details:
      "In this program, you are trained to improve your strength through many exercises.",
  },
  {
    image: < FaRunning size={25}/>,
    heading: "Cardio Training",
    details:
      "In this program, you are trained to do sequential moves in range of 20 until 30 minutes.",
  },
  {
    image: <FaFireAlt  size={25}/>,
    heading: "Fat Burning",
    details:
      "This program is suitable for you who wants to get rid of your fat and lose their weight.",
  },
  {
    image: <IoFitnessOutline size={25}/>,
    heading: "Health Fitness",
    details:
      "This programs is designed for those who exercises only for their body fitness not body building.",
  },
];



