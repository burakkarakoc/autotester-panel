import { useState, useEffect } from "react";
import { useAuth } from "@/context";
import { fetchUser } from "@/services/user";
import { fetchTestData } from "@/services/test";

const useTestsData = () => {
  const { user } = useAuth();
  const [testsData, setTestsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const uid = user.uid;
        try {
          const userData = await fetchUser(uid);
          const tests = userData.data.runs;
          var detailedTests = [];
          if (tests) {
            // console.log(tests.length);
            for (var i = 0; i < tests.length; i++) {
              const run = await fetchTestData(tests[i].id);
              // console.log(run.data);
              detailedTests.push(run.data);
            }
          }
          setTestsData(detailedTests);
          // console.log(detailedTests);

          // console.log(tests);
          // const processedTests = tests.map((test) => ({
          //   testId: test.id,
          //   status: test.status == 1 ? "Success" : "Fail",
          // }));
          // setTestsData(processedTests);
        } catch (error) {
          console.error("Error fetching tests data:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  return testsData;
};

export default useTestsData;

// export const testsTableData = [
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
//   {
//     testId: "as91lad01ed123",
//     status: "Success",
//   },
// ];

// export default testsTableData;
