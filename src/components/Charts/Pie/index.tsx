import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);


const index = ({data}:any) => {
  return (
    <>
      <Pie data={data} />
    </>
  );
};

export default index;
