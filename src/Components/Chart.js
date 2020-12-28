import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const Chart = (props) => {
// console.log(props)
    let shield = props.shield;
    let HP = props.HP;

    // console.log(`shield: ${shield}, HP: ${HP}`);


  const data = {
    labels: "X",
    datasets: [
      {
        label: "Shield",
        barPercentage: 0.5,
        maxBarThickness: 20,
        data: shield,
        backgroundColor: "rgb(7, 218, 255)",

        borderWidth: 1,
        hoverBorderWidth: 1,
        hoverBorderColor: "rgb(7, 218, 255)",
      },
      {
        label: "HP",
        barPercentage: 0.5,
        maxBarThickness: 16,
        data: HP,
        backgroundColor: "rgb(0, 255, 115)",
        borderWidth: 1,
        hoverBorderWidth: 1,
        hoverBorderColor: "rgb(0, 255, 115)",
      },
    ],
  };

  const options = {
  
    title: {
      display: false,
      text: "Player",
      fontSize: 12,
      position: "top",
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: false,
        gridLines: {
          display: false,
        },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
          },
        },
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false,
          }
        }
      ],
    },
  };

  return (
    <div className="chart">
      <HorizontalBar className="nut" data={data} options={options} />
    </div>
  );
};

export default Chart;
