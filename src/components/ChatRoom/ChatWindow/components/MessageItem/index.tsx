import { Avatar, Typography } from "antd";
import React from "react";
import { formatRelative } from "date-fns";

interface MessageItemProps {
  text: string;
  displayName: string;
  createdAt: any;
  photoURL: string;
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
}) => {
  return (
    <>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <Avatar size="small" src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{text}</Typography.Text>
      </div>
    </>
  );
};

export default MessageItem;
