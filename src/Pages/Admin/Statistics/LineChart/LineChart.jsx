import ReactApexChart from "react-apexcharts";


const LineChart = ({results}) => {
     const options = {
       chart: {
         id: "parcel-comparison",
         type: "line",
       },
       xaxis: {
         categories:results.map(result=>result.bookingDate), // Example dates
       },
       yaxis: {
         title: {
           text: "Number of Parcels",
         },
       },
       stroke: {
         curve: "smooth",
       },
       markers: {
         size: 5,
       },
       title: {
         text: "Booked vs Delivered Parcels",
         align: "center",
       },
       tooltip: {
         shared: true,
         intersect: false,
       },
     };

     const series = [
       {
         name: "Booked Parcels",
         data: results.map((result) => result.count), 
       },
       {
         name: "Delivered Parcels",
         data: results.map((result) => result.deliveredCount), 
       },
     ];

    return (
      <div>
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
    );
};

export default LineChart;