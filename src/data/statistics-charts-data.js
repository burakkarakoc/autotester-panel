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

// import { useState, useEffect } from "react";
// import { fetchChartData } from "@/services/"; // Replace with your actual data fetching service
// import { chartsConfig } from "@/configs";
// import { fetchUser } from "@/services/user";

// const useStatisticsChartsData = () => {
//   const [statisticsChartsData, setStatisticsChartsData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const chartData = await fetchUser(); // Fetch or calculate your chart data
//         const updatedStatisticsChartsData = [
//           {
//             color: "white",
//             title: "Your tests this week",
//             description: "Total scenarios you have run this month",
//             footer: "updated 2 days ago",
//             chart: {
//               ...websiteViewsChart,
//               series: [{ name: "Tests", data: chartData.testsData }],
//             },
//           },
//           {
//             color: "white",
//             title: "Your success rate this week",
//             description: "Succeeded tests / Total tests",
//             footer: "updated 4 min ago",
//             chart: {
//               ...dailySalesChart,
//               series: [
//                 { name: "Success Rate", data: chartData.successRateData },
//               ],
//             },
//           },
//           // Add more chart data here...
//         ];

//         setStatisticsChartsData(updatedStatisticsChartsData);
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     };

//     fetchData();
//   }, []); // Dependency array is empty, so this runs once on mount

//   return statisticsChartsData;
// };

// export default useStatisticsChartsData;
