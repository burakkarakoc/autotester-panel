import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  BugAntIcon,
  ServerStackIcon,
  RectangleStackIcon,
  CpuChipIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Scenarios, Plans } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <BugAntIcon {...icon} />,
        name: "Scenarios",
        path: "/scenarios",
        element: <Scenarios />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Plans",
        path: "/plans",
        element: <></>,
      },
      {
        icon: <CpuChipIcon {...icon} />,
        name: "Automate",
        path: "/automate",
        element: <></>,
      },

      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "plans",
      //   path: "/plans",
      //   element: <Plans />,
      // },
    ],
  },
  {
    title: "",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
