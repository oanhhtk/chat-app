import { Avatar, Typography } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../context/AuthProvider";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { formatRelative } from "date-fns";

interface MessageItemProps {
  text: string;
  displayName: string;
  createdAt: any;
  photoURL: string;
  userId: string;
  lastEl: boolean;
}

function formatDate(seconds: any) {
  if (moment(new Date(seconds * 1000)) < moment().subtract(10, "minute"))
    return moment(new Date(seconds * 1000))
      .startOf("seconds")
      .fromNow();
  return "";
}

// const setTimePerious = (seconds: number, minute: number) => {
//   if (seconds) {
//     if (
//       moment(new Date(seconds * 1000)) < moment().subtract(minute, "minute")
//     ) {
//       let formattedDate = "";

//       formattedDate = formatRelative(new Date(seconds * 1000), new Date());

//       return (formattedDate =
//         formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
//     }
//   }
//   return "";
// };

const MessageItem: React.FC<MessageItemProps> = ({
  text,
  photoURL,
  displayName,
  createdAt,
  userId,
  lastEl,
}) => {
  const {
    user: { uid },
  } = useContext(AuthContext);

  const isCurrentUser = uid === userId;

  return (
    <>
      {isCurrentUser ? (
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <div
            style={{
              width: "50%",
              height: "10px",
            }}
          ></div>
          <div className="flex flex-col gap-1 items-end justify-end">
            <div className="flex justify-end"></div>
            <div
              className="flex flex-col"
              style={{
                background: "rgba(5, 145, 255, 0.1)",
                borderRadius: "20px",
                width: "fit-content",
              }}
            >
              <Typography.Text
                className="content"
                style={{
                  textAlign: "end",
                  width: "fit-content",
                  padding: "2px 8px",
                }}
              >
                {text}
              </Typography.Text>
            </div>
            {lastEl && isCurrentUser ? (
              <div
                style={{
                  fontSize: 11,
                  color: "GrayText",
                }}
              >
                <CheckCircleTwoTone /> Đã gửi
              </div>
            ) : (
              <Typography.Text
                className="date flex justify-end"
                style={{
                  fontSize: "12px",
                }}
              >
                {formatDate(createdAt)}
              </Typography.Text>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          <div className="flex gap-1">
            <Avatar size="small" src={photoURL}>
              {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Typography.Text
                  className="author"
                  style={{
                    fontSize: "14px",
                  }}
                  strong
                >
                  {displayName?.split(" ")?.shift()}
                </Typography.Text>
                <Typography.Text
                  className="date"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {formatDate(createdAt)}
                </Typography.Text>
              </div>
              <Typography.Text className="content">{text}</Typography.Text>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageItem;
