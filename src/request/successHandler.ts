import { toast } from "@hooks/use-toast";

type Response = {
  data: {
    success: boolean;
  };
  status: number;
};

const successHandler = (
  response: Response,
  options = { notifyOnSuccess: false, notifyOnFailed: true }
) => {
  const { data } = response;
  if (data && data.success === true) {
    if (options.notifyOnSuccess) {
      toast({
        title: `Request success`,
        variant: "default",
      });
    }
  } else {
    const { status } = response;
    if (options.notifyOnFailed) {
      toast({
        title: `Request error ${status}`,
        variant: "destructive"
      });
    }
  }
};

export default successHandler;
