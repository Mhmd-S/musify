import { Button } from '@components/ui/button';

type PageNavigationProps = {
  onPreviousPage: () => void;
  onNextPage: () => void;
};

const PageNavigation: React.FC<PageNavigationProps> = ({
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div className="flex justify-between">
      <Button variant="outline" onClick={onPreviousPage}>
        Previous
      </Button>
      <Button variant="outline" onClick={onNextPage}>
        Next
      </Button>
    </div>
  );
};

export default PageNavigation;
