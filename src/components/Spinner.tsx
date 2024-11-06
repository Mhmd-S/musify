import React from 'react';

import { Loader2 } from 'lucide-react';

const Spinner = () => {
  return (
		<div className="w-full h-full flex justify-center items-center">
			<Loader2 className="animate-spin size-10" />
		</div>
	);
};

export default Spinner;