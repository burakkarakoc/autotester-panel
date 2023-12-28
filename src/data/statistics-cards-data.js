import {
  ChartBarIcon,
  BuildingOfficeIcon,
  BugAntIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BuildingOfficeIcon,
    title: "Company's Usage",
    value: "Tier 1",
    footer: {
      color: "text-green-500",
      value: "",
      label: "calculated wrt. total usage",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Company Scenario Count",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserIcon,
    title: "Your Screnario Count",
    value: "152",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: BugAntIcon,
    title: "Assigned to you",
    value: "12",
    footer: {
      color: "text-green-500",
      value: "",
      label: "Tests that assigned to you",
    },
  },
];

export default statisticsCardsData;
