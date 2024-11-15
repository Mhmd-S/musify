import { Button } from "@components/ui/button";


interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <Button
        variant="outline"
        size="sm"
        onClick={onPreviousPage}
        disabled={!hasPrevPage}
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={onNextPage}
        disabled={!hasNextPage}
      >
        Next
      </Button>
    </div>
  );
};

export default PageNavigation;