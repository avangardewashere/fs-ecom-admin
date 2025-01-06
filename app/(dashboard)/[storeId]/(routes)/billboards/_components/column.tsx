"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Billboard = {
  id: string;
  label: string;
  createdAt: string;
};

export const column: ColumnDef<Billboard>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
