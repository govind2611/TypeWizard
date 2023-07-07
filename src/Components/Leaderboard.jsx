import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const leaderboardRef = db.collection("leaderboard");
    
        const snapshot = await leaderboardRef
          .orderBy("score", "desc")
          .limit(10)
          .get();

        const data = snapshot.docs.map((doc) => doc.data());
        console.log("hiii",data);
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error getting leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {leaderboardData.map((entry, index) => (
          <li key={index}>
            {entry.username}: {entry.score}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
