import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
const UserInfo = ({ totalTestTaken }) => {
  const [user] = useAuthState(auth);
  return (
    <div className="user-profile">
      <div className="user">
        <div className="picture">
          <AccountCircleIcon
            style={{
              display: "block",
              transform: "scale(6)",
            }}
          />
        </div>
        <div className="info">
          <div className="email">{user.email}</div>
          <div className="joined-at">{user.metadata.creationTime}</div>
        </div>
      </div>
      <div className="total-tests">
        <span>Total tests taken : {totalTestTaken}</span>
      </div>
    </div>
  );
};

export default UserInfo;
