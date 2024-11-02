import { toast } from "react-toastify";

type Response = {
	data: {
		success: boolean;
    message: string;
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
			toast(data.message);
		}
	} else {
		const { status } = response;
		if (options.notifyOnFailed) {
			toast.success(`Request error ${status}`);
		}
	}
};

export default successHandler;
