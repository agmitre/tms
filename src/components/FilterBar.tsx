import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

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
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Filters</h4>
        <p className="text-muted-foreground text-sm">
          Apply filters
        </p>
        <Separator/>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="status">Status</Label>
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
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="priority">Priority</Label>
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
        </div>
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
    </div>
  );
}
