import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Progress,
  // Tabs,
  // TabsHeader,
  // Tab,
  // Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  CheckCircleIcon,
  ClockIcon,
  BackspaceIcon,
} from "@heroicons/react/24/solid";
// import {
//   // HomeIcon,
//   // ChatBubbleLeftEllipsisIcon,
//   // Cog6ToothIcon,
//   PencilIcon,
//   UserIcon,
// } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import useProjectsData from "@/data/projects-table-data";
import {
  // platformSettingsData,
  conversationsData,
  // projectsData,
  // projectsTableData,
} from "@/data";
import { useEffect, useState } from "react";
import { fetchUser } from "@/services/user";
import { useAuth } from "@/context";
import { fetchProjectTests } from "@/services/test";
import useTestsData from "@/data/mock-test-runs-data";
import { PopupComponent } from "./popup";
// import { fetchProjectTests } from "@/services/test";

export function Profile() {
  const [conversations, setConversations] = useState(conversationsData);
  const projectsTableData = useProjectsData();
  const testsData = useTestsData();

  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [activeTab, setActiveTab] = useState("report");
  const [projectTests, setProjectData] = useState(null);
  const [runsOfProject, setRuns] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const handleProjectRowClick = async (projectId) => {
    try {
      const project = await fetchProjectTests(projectId);
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
      console.error("Failed to get the test details:", error);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedTest(null);
  };

  const generatePPwithInitials = (username) => {
    let initials = username.charAt(0) + " " + username.charAt(1);
    initials = initials.toUpperCase();
    const coolColors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-cyan-500",
      "bg-indigo-500",
      "bg-purple-500",
    ];
    const randomColor =
      coolColors[Math.floor(Math.random() * coolColors.length)];
    console.log(randomColor);
    return (
      <div
        alt={username}
        className={`${randomColor} flex items-center justify-center w-[4rem] h-[4rem] rounded-lg shadow-lg shadow-blue-gray-500/40 text-lg font-bold text-white`}
      >
        {initials}
      </div>
    );
  };

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const uid = user.uid;
        const data = await fetchUser(uid);
        setUserData(data.data);
        setAvatar(generatePPwithInitials(data.data.username));
        return;
      }
    };
    getUserData();
  }, [user]);

  const handleRemoveConversation = (name) => {
    // TODO: Messaging is not implemented by any means, namely those are only mock data...
    // Currently it deletes from runtime, implement integration with db as well!
    // maybe convert it to "assigned tasks to you"
    const updatedConversations = conversations.filter(
      (conversation) => conversation.name !== name
    );
    setConversations(updatedConversations);
  };
  return (
    <>
      {/* bg image */}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      {/* Actual profile card */}
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            {userData ? (
              <div className="flex items-center gap-6">
                {/* profile avatar */}
                {avatar}
                {/* {generatePPwithInitials(userData.username)} */}
                {/* <Avatar
                  src={userData.img}
                  alt={userData.username}
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                /> */}
                <div>
                  <Typography variant="h4" color="blue-gray" className="mb-1">
                    {userData.username}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    Tester
                  </Typography>
                </div>
              </div>
            ) : (
              <></>
            )}
            {/* 3 buttons as tabs */}
            {/* <div className="w-96">
              <Tabs value="message">
                <TabsHeader>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div> */}
          </div>
          {/* Platform settings, cols adjusted here */}
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-1 xl:grid-cols-1">
            {/* <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <div className="flex flex-col gap-12">
                {platformSettingsData.map(({ title, options }) => (
                  <div key={title}>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      {title}
                    </Typography>
                    <div className="flex flex-col gap-6">
                      {options.map(({ checked, label }) => (
                        <Switch
                          key={label}
                          id={label}
                          label={label}
                          defaultChecked={checked}
                          labelProps={{
                            className: "text-sm font-normal text-blue-gray-500",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            {/* Profile info */}

            {/* <ProfileInfoCard
              title="Profile Information"
              description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              details={{
                "full name": "Burak Karakoc",
                mobile: "(90) 530 065 44 55",
                email: "burakkarakoc5@gmail.com",
                location: "TR/DE",
                links: (
                  <div className="flex items-center gap-4">
                    <i className="fa-brands fa-facebook text-blue-700" />
                    <a href="https://www.linkedin.com/in/burakkarakoc/">
                      <i className="fa-brands fa-linkedin text-blue-700" />
                    </a>
                    <a href="https://github.com/burakkarakoc">
                      <i className="fa-brands fa-github text-black-400" />
                    </a>
                  </div>
                ),
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </Tooltip>
              }
            /> */}
            {/* Test PRs */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Assigned Tests
              </Typography>
              <ul className="flex flex-col gap-6">
                {conversations.map((props) => (
                  <MessageCard
                    key={props.name}
                    {...props}
                    action={
                      <Button
                        variant="text"
                        size="sm"
                        onClick={() => handleRemoveConversation(props.name)}
                      >
                        Remove
                      </Button>
                    }
                  />
                ))}
              </ul>
            </div>
          </div>
          {/* Projects involved */}
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
                      You have{" "}
                      <strong>
                        {projectsTableData ? projectsTableData.length : 0}
                      </strong>{" "}
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
                      You have <strong>{projectTests.runs.length}</strong> runs
                      in
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
                  {projectTests ? (
                    runsOfProject.map(({ id, status }, key) => {
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
                  ) : projectsTableData ? (
                    projectsTableData.map(
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
                    )
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </CardBody>
            {isPopupVisible && (
              <PopupComponent
                test={selectedTest}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onClose={closePopup}
              />
            )}
          </Card>
          {/* <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Projects
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              Projects that you are working on
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsTableData.map(
                ({
                  projectName,
                  img,
                  title,
                  description,
                  tag,
                  route,
                  members,
                }) => (
                  <Card key={title} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {tag}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <Link to={route}>
                        <Button
                          variant="outlined"
                          size="sm"
                          onClick={() => {
                            setProjectID(projectName);
                          }}
                        >
                          view project
                        </Button>
                      </Link>
                      <div>
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
                      </div>
                    </CardFooter>
                  </Card>
                )
              )}
            </div> 
          </div> */}
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;

/* 
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
*/
