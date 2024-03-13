import React from "react";
import { Doughnut } from "react-chartjs-2";

const AttendanceChart = ({ data, chartTitle }) => {
  const chartData = {
    labels: data.map((item) => item.className),
    datasets: [
      {
        label: "Classes",
        data: data.map((item) => item.studentCount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          // Add more colors if you have many classes
        ],
        hoverBackgroundColor: [
          "#FF6388",
          "#36A2EB",
          "#FFCE56",
          // Add more colors if you have many classes
        ],
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default AttendanceChart;
