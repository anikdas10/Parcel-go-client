
import ReactApexChart from "react-apexcharts";


const BarChart = ({results}) => {
 const chartData = {
   series: [
     {
       name: "Booking ",
       data: results.map((result) => result.count),
     },
   ],
   options: {
    chart:{
      type:"line",
      
    },
     xaxis: {
       categories: results.map((result) => result.bookingDate),
       type: "category",
     },
     title: {
       text: "Booking Count over Time",
       align: "center",
     },
   },
 };
  return (
    <div>
     <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} ></ReactApexChart>
    </div>
  );
};

export default BarChart;
