class TopCardItem {
  constructor(
    color,
    icon,
    title,
    value,
    footerColor,
    footerValue,
    footerLabel
  ) {
    this.color = color;
    this.icon = icon;
    this.title = title;
    this.value = value;
    this.footer = {
      color: footerColor,
      value: footerValue,
      label: footerLabel,
    };
  }
}

import { useState, useEffect } from "react";
import { useAuth } from "@/context";
import { fetchCompany } from "@/services/company";
import {
  ChartBarIcon,
  BuildingOfficeIcon,
  BugAntIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { fetchUser } from "@/services/user";

const useTopCardItems = () => {
  const { user } = useAuth();
  const [topCardItems, setTopCardItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const uid = user.uid;
        try {
          const companyData = await fetchCompany(uid);
          const userData = await fetchUser(uid);
          let totalRunCount = 0;

          for (let project in companyData.data.projects) {
            if (Array.isArray(companyData.data.projects[project])) {
              totalRunCount += companyData.data.projects[project].length;
            }
          }

          // console.log(totalRunCount);
          // console.log(companyData.data.projects);
          // console.log(companyData);
          const items = [
            new TopCardItem(
              "gray",
              BuildingOfficeIcon,
              companyData.data.company_name + "'s Usage",
              "Tier " + companyData.data.company_tier,
              "text-green-500",
              "",
              "calculated wrt. total usage"
            ),
            new TopCardItem(
              "gray",
              ChartBarIcon,
              companyData.data.company_name + "'s " + "Scenario Count",
              totalRunCount,
              "text-green-500",
              "+3%",
              "than last month"
            ),
            new TopCardItem(
              "gray",
              UserIcon,
              "Your Screnario Count",
              Object.keys(userData.data.runs).length,
              "text-red-500",
              "-2%",
              "than yesterday"
            ),
            new TopCardItem(
              "gray",
              BugAntIcon,
              "Assigned to you",
              userData.data.assigned_tasks.length,
              "text-green-500",
              "",
              "Tests that assigned to you"
            ),
          ];
          setTopCardItems(items);
        } catch (error) {
          console.error("Error fetching company data:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  return topCardItems;
};

export default useTopCardItems;
