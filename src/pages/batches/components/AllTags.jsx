import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@core/components/ui/DataTable";
import { getTags } from "store/tag";

const AllTags = ({ batchId }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(getTags(batchId));
  }, [dispatch, batchId]);

  const columns = [
    {
      name: "url",
      label: "URL",
    },
    {
      name: "user",
      label: "User",
      options: {
        download: false,
      },
    },
  ];

  return (
    <DataTable
      title={"Tags"}
      data={data}
      columns={columns}
      download={true}
      serverSide={false}
    />
  );
};

export default AllTags;
