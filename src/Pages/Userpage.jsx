import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../Components/CustomLoader";
import TableUserData from "../Components/TableUserData";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";

const Userpage = () => {
  const [data, setData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [graphData, setGraphData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = () => {
    const resultsRef = db.collection("Results");
    const { uid } = auth.currentUser;
    let tempData = [];
    let tempGraphData = [];

    resultsRef
      .where("userId", "==", uid) // checks if user is present or not
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          tempData.push({ ...doc.data() });
          tempGraphData.push([
            doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
            doc.data().wpm,
          ]);
        });
        setData(tempData);
        setGraphData(tempGraphData.reverse());
        setDataLoading(false);
      });
  };
  /*fetching user data when firebase is loaded*/
  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading]);

  if (loading || dataLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="userpage-container">
      <UserInfo totalTestTaken={data.length} />
      <Graph graphData={graphData} />
      <TableUserData data={data} />
    </div>
  );
};

export default Userpage;
