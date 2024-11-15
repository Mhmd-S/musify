'use client';

import { useParams } from 'next/navigation';

import NoSSRWrapper from '@components/NoSSRWrapper';

import PromptPreview from '@components/PromptPreview';

export default function LabPage() {

	const { id } = useParams<{ id: string }>();
	
	return (
		<NoSSRWrapper>
			<PromptPreview id={id} />
		</NoSSRWrapper>
	);
}
