import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "../Context/ThemeContext";

/* registering dependencies */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Graph = ({ graphData }) => {
  const { theme } = useTheme();

  // Custom chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "WPM (Words Per Minute)",
        font: {
          size: 20,
          weight: "bold",
        },
        color: theme.textColor,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Time",
          font: {
            weight: "bold",
          },
          color: theme.textColor,
        },
        grid: {
          color: theme.gridColor,
        },
        ticks: {
          color: theme.textColor,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Speed",
          font: {
            weight: "bold",
          },
          color: theme.textColor,
        },
        grid: {
          color: theme.gridColor,
        },
        ticks: {
          color: theme.textColor,
        },
      },
    },
  };

  // Custom chart styles
  const chartStyles = {
    borderColor: theme.textColor,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 2,
  };

  return (
    <Line
      data={{
        labels: graphData.map((i) => i[0]),
        datasets: [
          {
            data: graphData.map((i) => i[1]),
            label: "WPM",
            ...chartStyles,
          },
        ],
      }}
      options={chartOptions}
    />
  );
};
export default Graph;
