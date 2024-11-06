import { Input } from '@components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@components/ui/select';

type PromptFiltersProps = {
  onSearch: (query: string) => void;
  onFilterStatusChange: (status: string) => void;
  onSortChange: (sortBy: string) => void;
};

const PromptFilters: React.FC<PromptFiltersProps> = ({
  onSearch,
  onFilterStatusChange,
  onSortChange,
}) => {
  return (
    <div className="flex space-x-2">
      <div className="flex-1">
        <Input type="text" placeholder="Search Prompts..." onChange={(e) => onSearch(e.target.value)} />
      </div>
      <Select onValueChange={onFilterStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="created">Date Created</SelectItem>
          <SelectItem value="duration">Duration</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PromptFilters;