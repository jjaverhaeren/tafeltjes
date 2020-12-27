import React from "react";
import { Bar } from "react-chartjs-2";

const Chart = ({ BarTitle, xAxisLabels, dataSet1Data, dataSet2Data }) => {

    // { BarTitle, xAxisLabels, dataSet1Data, dataSet2Data }

  const data = {
    labels: xAxisLabels,
    datasets: [
      {
        label: "HP",
        data: dataSet1Data,
        backgroundColor: "rgba(238, 3, 23,  1)",

        borderWidth: 1,
        hoverBorderWidth: 1,
        hoverBorderColor: "rgba(238, 3, 23,  0.5)",
      },
      {
        label: "Shield",
        data: dataSet2Data,
        backgroundColor: "rgba(255, 208, 0, 1)",
        borderWidth: 1,
        hoverBorderWidth: 1,
        hoverBorderColor: "rgba(255, 208, 0, 0.5)",
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: BarTitle,
      fontSize: 22,
      position: "top",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 5,
          },
        },
      ],
    },
  };

  return (
    <div className="chart">
      <Bar className="nut" data={data} options={options} />
    </div>
  );
};

export default Chart;
