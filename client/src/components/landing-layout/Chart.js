/* eslint-disable no-sparse-arrays */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";

/**react-chartjs imports**/
import { Bar, Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { defaults } from "react-chartjs-2";

const Chart = ({ usersData, type, viewWidth }) => {
  const [mappedNames, setMappedNames] = useState([]);
  const [mappedData, setMappedData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: type === "todos" ? "completed todos %" : "total posts",
        data: [],
        backgroundColor: [
          "#037ba6a2",
          "#0468bfa2",
          "#0487d9a2",
          "#59a8d9a2",
          "#a7d5f2a2",
        ],
        fill: false,
        borderWidth: 1,
        hoverBorderWidth: 3,
        hoverBorderColor: " rgba(245, 173, 91, 0.8)",
      },
    ],
  });

  useEffect(() => {
    setChartData({
      ...chartData,
      labels: [...mappedNames],
      datasets: [{ ...chartData.datasets[0], data: [...mappedData] }],
    });
  }, [mappedData, mappedNames]);

  useEffect(() => {
    if (usersData.length > 0) {
      const mappedUsers = usersData.map((x) => x.name.split(" ")[0]);
      setMappedNames(mappedUsers);
      const mappedItems = usersData.map((x) => x.percentage || x.posts);
      setMappedData(mappedItems);
    }
  }, [usersData]);

  defaults.global.defaultFontFamily = "Lora,serif";
  defaults.global.defaultFontSize = viewWidth > 600 ? 13 : 10;
  defaults.global.defaultFontColor = "#404040";

  const CustomTag = type === "todos" ? Bar : Doughnut;

  return (
    <CustomTag
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            color: "white",
            weight: "bold",
          },
        },
        scales: {
          yAxes: [
            {
              display: type === "todos" ? true : false,
              ticks: {
                max: Math.max(...mappedData),
                stepSize: type === "todos" ? 10 : 5,
                beginAtZero: true,
                padding: 10,
              },
            },
          ],
        },
        title: {
          display: true,
          text:
            type === "todos" ? "Best Todos Achievers" : "Most Posts Published",
          fontSize: 20,
        },
        legend: {
          onClick: null,
          display: true,
          position: "top",
        },
      }}
    />
  );
};

export default Chart;
