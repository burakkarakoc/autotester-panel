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

const useTopCardItems = () => {
  const { user } = useAuth();
  const [topCardItems, setTopCardItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const uid = user.uid;
        try {
          const companyData = await fetchCompany(uid);
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
              "Company's (" +
                companyData.data.company_name +
                ") " +
                "Scenario Count",
              "2,300",
              "text-green-500",
              "+3%",
              "than last month"
            ),
            new TopCardItem(
              "gray",
              UserIcon,
              "Your Screnario Count",
              "152",
              "text-red-500",
              "-2%",
              "than yesterday"
            ),
            new TopCardItem(
              "gray",
              BugAntIcon,
              "Assigned to you",
              "12",

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
