"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export type ColorsColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex item-center gap-x-2">
        {row.original.value}
        <div
          style={{ backgroundColor: row.original.value }}
          className="h-6 w-6 rounded-full border"
        ></div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
