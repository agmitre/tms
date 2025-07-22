import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  filterStatus: "all" | "pending" | "completed";
  filterPriority: "all" | "low" | "medium" | "high";
  setFilterStatus: (status: Props["filterStatus"]) => void;
  setFilterPriority: (priority: Props["filterPriority"]) => void;
}

export default function FilterBar({
  filterStatus,
  filterPriority,
  setFilterStatus,
  setFilterPriority,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <Select
        onValueChange={(val) => setFilterStatus(val as Props["filterStatus"])}
        value={filterStatus}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"}>All</SelectItem>
          <SelectItem value={"pending"}>Pending</SelectItem>
          <SelectItem value={"completed"}>Completed</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filterPriority}
        onValueChange={(val) =>
          setFilterPriority(val as Props["filterPriority"])
        }
      >
        {" "}
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"}>All</SelectItem>
          <SelectItem value={"low"}>Low</SelectItem>
          <SelectItem value={"medium"}>Medium</SelectItem>
          <SelectItem value={"high"}>High</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="secondary"
        onClick={() => {
          setFilterStatus("all");
          setFilterPriority("all");
        }}
      >
        Clear Filter
      </Button>
    </div>
  );
}
