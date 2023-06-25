import { Avatar, Typography } from "antd";
import React, { useContext } from "react";
import { formatRelative } from "date-fns";
import { AppContext } from "../../../../../context/AppProvider";
import { AuthContext } from "../../../../../context/AuthProvider";

interface MessageItemProps {
  text: string;
  displayName: string;
  createdAt: any;
  photoURL: string;
  userId: string;
}

function formatDate(seconds: any) {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

const MessageItem: React.FC<MessageItemProps> = ({
  text,
  photoURL,
  displayName,
  createdAt,
  userId,
}) => {
  const {
    user: { uid },
  } = useContext(AuthContext);
  return (
    <>
      {uid === userId ? (
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
          <div className="flex flex-col gap-1">
            <div className="flex justify-end">
              <div className="flex gap-1">
                <Avatar size="small" src={photoURL}>
                  {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text
                  className="author"
                  style={{
                    fontSize: "14px",
                  }}
                  strong
                >
                  Bạn
                </Typography.Text>
              </div>
            </div>
            <div
              className="flex flex-col"
              style={{
                background: "rgba(5, 145, 255, 0.1)",
                borderRadius: "20px",
                padding: 10,
              }}
            >
              <Typography.Text
                className="content p-2"
                style={{
                  textAlign: "end",
                }}
              >
                {text}
              </Typography.Text>
              <Typography.Text
                className="date flex justify-end"
                style={{
                  fontSize: "12px",
                }}
              >
                {formatDate(createdAt)}
              </Typography.Text>
            </div>
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
