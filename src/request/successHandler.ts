import { toast } from 'react-toastify';

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
      toast.success(`Request success`);
    }
  } else {
    const { status } = response;
    if (options.notifyOnFailed) {
      toast.error(`Request error ${status}`);
    }
  }
};

export default successHandler;
