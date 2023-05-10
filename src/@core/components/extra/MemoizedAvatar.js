import { Avatar } from "@mui/material";
import React from "react";

const MemoizedAvatar = React.memo(({ src }) => {
  return <Avatar variant="rounded" src={src} />;
});

export default MemoizedAvatar;
