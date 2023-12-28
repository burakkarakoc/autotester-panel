import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Tests",
      data: [5, 2, 6, 12, 4, 16, 3],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Succes Rate",
      data: [74, 67, 64, 66, 70, 82, 84, 78, 91],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const completedTaskChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Your tests this week",
    description: "Total scenarios you have run this month",
    footer: "updated 2 days ago",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Your success rate this week",
    description: "Succeded tests / Total tests",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  // {
  //   color: "white",
  //   title: "Completed Tests",
  //   description: "Last Campaign Performance",
  //   footer: "just updated",
  //   chart: completedTasksChart,
  // },
];

export default statisticsChartsData;
