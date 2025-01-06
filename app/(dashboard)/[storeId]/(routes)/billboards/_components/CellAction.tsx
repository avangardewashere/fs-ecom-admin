import React from "react";
import { BillboardColumn } from "./column";

interface CellActionProps {
  data: BillboardColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return <div>cell Action</div>;
};

export default CellAction;
