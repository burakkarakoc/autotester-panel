import { useState, useEffect } from "react";
import { useAuth } from "@/context";
import { fetchProjects } from "@/services/project";

const useProjectsData = () => {
  const { user } = useAuth();
  const [projectsData, setProjectsData] = useState([]);

  const calculate_success_rate = (runs_array) => {
    let total = 0;
    let success_count = 0;
    runs_array.forEach((element) => {
      total++;
      success_count += Object.values(element)[0];
    });
    if (total != 0) {
      return (success_count / total) * 100;
    } else {
      return o;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const uid = user.uid;
        try {
          const companyData = await fetchProjects(uid);
          const projects = companyData.data.projects;
          const processedProjects = Object.entries(projects).map(
            ([key, project]) => ({
              img: project.image_url, // TODO: this will be initials of user as image
              projectName: project.id,
              members: project.members,
              total: Object.keys(project.runs).length,
              completion: calculate_success_rate(project.runs),
            })
          );
          setProjectsData(processedProjects);
        } catch (error) {
          console.error("Error fetching projects data:", error);
        }
      }
    };

    fetchData();
  }, []);

  return projectsData;
};

export default useProjectsData;

// Below is mock data
// export const projectsTableData = [
//   {
//     img: "/img/findeks.jpeg",
//     projectName: "Findeks Login System",
//     members: [
//       { img: "/img/team-1.jpeg", name: "Romina Hadid" },
//       { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
//       { img: "/img/team-3.jpeg", name: "Jessica Doe" },
//       { img: "/img/team-4.jpeg", name: "Alexander Smith" },
//     ],
//     total: "14,000",
//     completion: 60,
//   },
//   {
//     img: "/img/canonical.jpeg",
//     projectName: "Snapstore Download Functionality",
//     members: [
//       { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
//       { img: "/img/team-4.jpeg", name: "Alexander Smith" },
//     ],
//     total: "3,000",
//     completion: 10,
//   },
//   {
//     img: "/img/logo-slack.svg",
//     projectName: "Team Messaging",
//     members: [
//       { img: "/img/team-3.jpeg", name: "Jessica Doe" },
//       { img: "/img/team-1.jpeg", name: "Romina Hadid" },
//     ],
//     total: "426",
//     completion: 100,
//   },
//   {
//     img: "/img/logo-spotify.svg",
//     projectName: "Connected Sound Functionality",
//     members: [
//       { img: "/img/team-4.jpeg", name: "Alexander Smith" },
//       { img: "/img/team-3.jpeg", name: "Jessica Doe" },
//       { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
//       { img: "/img/team-1.jpeg", name: "Romina Hadid" },
//     ],
//     total: "20,500",
//     completion: 100,
//   },
// ];

// export default projectsTableData;
