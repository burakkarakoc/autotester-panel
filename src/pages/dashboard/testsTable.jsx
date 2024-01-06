import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import useTestsData from "@/data/mock-test-runs-data";
import { PopupComponent } from "./popup";

export const TestsTable = () => {
  const testsData = useTestsData();
  const [selectedTest, setSelectedTest] = useState(null);
  const [activeTab, setActiveTab] = useState("report");
  const [isPopupVisible, setPopupVisible] = useState(false);

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

  return (
    <Card className="overflow-hidden xl:col-span-7 border border-blue-gray-100 shadow-sm">
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
                      className=" text-xs font-medium text-blue-gray-600"
                    >
                      {status == 1 ? "Success" : "Failed"}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      <Button onClick={() => handleRowClick(id)}>Report</Button>
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
  );
};
