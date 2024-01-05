import { useState, useEffect, useContext } from "react";
import { AppContext, AppProvider, useAuth } from "@/context";
import { fetchUser } from "@/services/user";
import { fetchTestData } from "@/services/test";

const useTestsData = () => {
  const { user } = useAuth();
  const { userData } = useContext(AppContext);
  const [testsData, setTestsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if ((user, userData)) {
        const uid = user.uid;
        try {
          // const userData = await fetchUser(uid);
          const tests = userData.data.runs;
          var detailedTests = [];
          if (tests) {
            for (var i = 0; i < tests.length; i++) {
              const run = await fetchTestData(tests[i].id);
              detailedTests.push(run.data);
            }
          }
          setTestsData(detailedTests);
        } catch (error) {
          console.error("Error fetching tests data:", error);
        }
      }
    };

    fetchData();
  }, [user, userData]);

  return testsData;
};

export default useTestsData;
