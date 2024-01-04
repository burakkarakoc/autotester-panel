import React from "react";
// import {
//   ChartBarIcon,
//   BuildingOfficeIcon,
//   BugAntIcon,
//   UserIcon,
// } from "@heroicons/react/24/solid";
import {
  // IconButton,
  // Menu,
  // MenuHandler,
  // MenuList,
  // MenuItem,
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Tooltip,
  Progress,
  Button,
} from "@material-tailwind/react";
// import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsChartsData } from "@/data";
import {
  CheckCircleIcon,
  ClockIcon,
  BackspaceIcon,
} from "@heroicons/react/24/solid";
import useTopCardItems from "@/data/statistics-cards-data";
import useProjectsData from "@/data/projects-table-data";
import useTestsData from "@/data/mock-test-runs-data";
import { useState, useEffect } from "react";
import {
  fetchHtmlContent,
  fetchProjectTests,
  // fetchTestData,
} from "@/services/test";
import { useRef } from "react";

export function Home() {
  const topCardItems = useTopCardItems();
  const projectsTableData = useProjectsData();
  const testsData = useTestsData();

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [activeTab, setActiveTab] = useState("report");
  const [projectTests, setProjectData] = useState(null);
  const [runsOfProject, setRuns] = useState(null);

  const handleProjectRowClick = async (projectId) => {
    try {
      const project = await fetchProjectTests(projectId); // Replace with actual API call
      setProjectData(project.project.data);
      setRuns(project.runs);
    } catch (error) {
      console.error("Error fetching project tests:", error);
    }
  };

  const getSelectedTest = (test_id) => {
    for (var i = 0; i < testsData.length; i++) {
      if (testsData[i].id == test_id) {
        return testsData[i];
      }
    }
    return -1;
  };

  const handleRowClick = async (testId) => {
    try {
      const detailedTestData = getSelectedTest(testId);
      setSelectedTest(detailedTestData);
      setPopupVisible(true);
    } catch (error) {
      console.error("Failed to fetch test details:", error);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedTest(null);
  };

  const PopupComponent = ({ test, activeTab, setActiveTab, onClose }) => {
    const [blobUrl, setBlobUrl] = useState("");
    const fetchedRef = useRef(false); // Ref to indicate if the content has been fetched

    useEffect(() => {
      const loadHtmlContent = async () => {
        if (test.html && !fetchedRef.current) {
          fetchedRef.current = true; // Set the flag to indicate fetching
          try {
            const htmlContent = await fetchHtmlContent(test.html);
            const blob = new Blob([htmlContent], { type: "text/html" });
            const objectURL = URL.createObjectURL(blob);
            setBlobUrl(objectURL);
          } catch (error) {
            console.error("Error fetching HTML:", error);
            // Handle the error
          }
        }
      };

      if (activeTab === "report") {
        loadHtmlContent();
      }

      // Cleanup function
      return () => {
        if (blobUrl) {
          URL.revokeObjectURL(blobUrl);
          setBlobUrl(""); // Clear the blob URL
        }
        fetchedRef.current = false; // Reset the flag when the component unmounts or tab changes
      };
    }, [test.html, activeTab]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
        <div className="bg-white border border-blue-gray-100 shadow-lg rounded-lg p-6 max-w-md w-full">
          <div className="tabs flex justify-around mb-4">
            <button
              className={`py-2 px-4 rounded ${
                activeTab === "report"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("report")}
            >
              Report
            </button>
            <button
              className={`py-2 px-4 rounded ${
                activeTab === "video" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("video")}
            >
              Video
            </button>
          </div>
          <div className="content mb-4">
            {activeTab === "report" &&
              (test.html && blobUrl ? (
                <iframe
                  src={blobUrl}
                  style={{ width: "100%", height: "500px" }}
                  title="File Content"
                ></iframe>
              ) : test.html ? (
                "Loading..."
              ) : (
                "No report available."
              ))}
            {activeTab === "video" && (
              <div>
                {test.video ? (
                  <video
                    src={test.video}
                    controls
                    style={{ maxWidth: "100%" }}
                  />
                ) : (
                  "No video available."
                )}
              </div>
            )}
          </div>
          <button
            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {topCardItems.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      {/* chart components */}
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon
                  strokeWidth={2}
                  className="h-4 w-4 text-blue-gray-400"
                />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      {/* Project tab component */}
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              {projectTests == null ? (
                <>
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Projects
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal text-blue-gray-600"
                  >
                    <CheckCircleIcon
                      strokeWidth={3}
                      className="h-4 w-4 text-blue-gray-200"
                    />
                    You have <strong>{projectsTableData.length}</strong>{" "}
                    automation projects
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    <Button
                      onClick={() => {
                        setProjectData(null);
                        setRuns(null);
                      }}
                    >
                      <BackspaceIcon
                        // strokeWidth={3}
                        className="h-4 w-4"
                      />
                    </Button>
                    <br />
                    {/* Runs of {projectTests.projectName} */}
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal text-blue-gray-600"
                  >
                    <CheckCircleIcon
                      strokeWidth={3}
                      className="h-4 w-4 text-blue-gray-200"
                    />
                    You have <strong>{projectTests.runs.length}</strong> runs in
                    <strong>{projectTests.projectName}</strong>.
                  </Typography>
                </>
              )}
            </div>
            {/* Maybe create project comes here */}
            {/* <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu> */}
          </CardHeader>
          <CardBody
            className="overflow-auto px-0 pt-0 pb-2"
            style={{ height: "500px" }}
          >
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {runsOfProject
                    ? ["TestId", "Status", "Report"].map((el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-6 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      ))
                    : ["Project", "Members", "Total", "Completion", ""].map(
                        (el) => (
                          <th
                            key={el}
                            className="border-b border-blue-gray-50 py-3 px-6 text-left"
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        )
                      )}
                </tr>
              </thead>
              <tbody>
                {projectTests
                  ? runsOfProject.map(({ id, status }, key) => {
                      const className = `py-3 px-5 ${
                        key === projectsTableData.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={id}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {/* <Avatar src={img} alt={projectName} size="sm" /> */}
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {id}
                              </Typography>
                            </div>
                          </td>

                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {status == 1 ? "Success" : "Failed"}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              <Button onClick={() => handleRowClick(id)}>
                                Report & Video
                              </Button>
                            </Typography>
                          </td>
                        </tr>
                      );
                    })
                  : projectsTableData.map(
                      (
                        { img, projectName, members, total, completion },
                        key
                      ) => {
                        const className = `py-3 px-5 ${
                          key === projectsTableData.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={projectName}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Avatar src={img} alt={projectName} size="sm" />
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {projectName}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              {members.map(({ img, name }, key) => (
                                <Tooltip key={name} content={name}>
                                  <Avatar
                                    src={img}
                                    alt={name}
                                    size="xs"
                                    variant="circular"
                                    className={`cursor-pointer border-2 border-white ${
                                      key === 0 ? "" : "-ml-2.5"
                                    }`}
                                  />
                                </Tooltip>
                              ))}
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-600"
                              >
                                {total}
                              </Typography>
                            </td>
                            <td className={className}>
                              <div className="w-10/12">
                                <Typography
                                  variant="small"
                                  className="mb-1 block text-xs font-medium text-blue-gray-600"
                                >
                                  {completion}%
                                </Typography>
                                <Progress
                                  value={completion}
                                  variant="gradient"
                                  color={completion === 100 ? "green" : "blue"}
                                  className="h-1"
                                />
                              </div>
                            </td>
                            <td className={className}>
                              <Button
                                onClick={() =>
                                  handleProjectRowClick(projectName)
                                }
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        );
                      }
                    )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        {/* Runs table component */}
        {/* <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-1"> */}
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Your Latest Test Runs
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              {/* <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              /> */}
              {/* <strong>24%</strong> this month */}
              Finished tests are displayed below
            </Typography>
          </CardHeader>
          <CardBody
            className="pt-0 pb-2"
            style={{ height: "500px", overflowY: "auto" }}
          >
            <table className="w-full min-w-[320px] table-auto">
              {/* min-w-[640px] */}
              <thead>
                <tr>
                  {["TestId", "Status", "Report"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {testsData.map(({ id, status }, key) => {
                  const className = `py-3 px-5 ${"border-b border-blue-gray-50"}`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {/* <Avatar src={img} alt={projectName} size="sm" /> */}
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {id}
                          </Typography>
                        </div>
                      </td>

                      <td className={className}>
                        <Typography
                          variant="small"
                          className="ml-5 text-xs font-medium text-blue-gray-600"
                        >
                          {status == 1 ? "Success" : "Failed"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          <Button onClick={() => handleRowClick(id)}>
                            Report & Video
                          </Button>
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {isPopupVisible && (
              <PopupComponent
                test={selectedTest}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onClose={closePopup}
              />
            )}
          </CardBody>
        </Card>
      </div>
    </div>
    // </div>
  );
}

export default Home;
