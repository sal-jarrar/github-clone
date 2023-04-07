import { Chart as ChartJS, registerables } from "chart.js";
import "chartjs-adapter-moment";
import { Bar } from "react-chartjs-2";
import { Repository } from "../types";
import { countRepositoriesPerMonth } from "../helpers";
ChartJS.register(...registerables);

type IRepoChart = { repositories: Repository[] };

const RepoChart = ({ repositories }: IRepoChart) => {
  const data = countRepositoriesPerMonth(repositories);

  return (
    <Bar
      style={{ height: "240px", display: "block", width: "698px" }}
      data={{
        labels: Object.keys(data),

        datasets: [
          {
            label: "Repository Per-month",
            data: Object.values(data),
            backgroundColor: "#1C2122",
            hoverBackgroundColor: "##1C2122",
            borderColor: "##1C2122",
            maxBarThickness: 10,
            categoryPercentage: 0.5,
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: {
              color: "#e7eaf3",
            },
            beginAtZero: true,
            ticks: {
              stepSize: 100,

              color: "#97a4af",

              padding: 10,
            },
          },

          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#97a4af",

              padding: 1,
            },
          },
        },

        plugins: {
          tooltip: {
            intersect: false,
            mode: "index",
          },
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
      }}
    />
  );
};

export default RepoChart;
