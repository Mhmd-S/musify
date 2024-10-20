import dynamic from 'next/dynamic';
import React from 'react';

type NoSSRWrapper = {
	children: React.ReactNode;
};

const NoSSRWrapper = ({ children }: NoSSRWrapper) => (
	<React.Fragment>{children}</React.Fragment>
);
export default dynamic(() => Promise.resolve(NoSSRWrapper), {
	ssr: false,
});
