import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  // Tabs,
  // TabsHeader,
  // Tab,
  // Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  // HomeIcon,
  // ChatBubbleLeftEllipsisIcon,
  // Cog6ToothIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
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

export function Profile() {
  const [conversations, setConversations] = useState(conversationsData);
  const projectsTableData = useProjectsData();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const useUserData = () => {
    useEffect(() => {
      const getUserData = async () => {
        if (user) {
          const uid = user.uid;
          const data = await fetchUser(uid);
          console.log(data.data);
          setUserData(data.data);
        }
      };
      getUserData();
    }, [user]);
  };

  useUserData();

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
                <Avatar
                  src={userData.img}
                  alt={userData.id}
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h4" color="blue-gray" className="mb-1">
                    ID: {userData.id}
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
          {/* Platform settings */}
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
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
                Messages and Test PRs
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
          <div className="px-4 pb-4">
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
                ({ img, title, description, tag, route, members }) => (
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
                        <Button variant="outlined" size="sm">
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
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
