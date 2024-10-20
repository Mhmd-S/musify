import Spinner from './Spinner';

type GeneratedVideoProps = {
	newVideo: string | null;
	loading: boolean;
};

const GeneratedVideo: React.FC<GeneratedVideoProps> = ({
	newVideo,
	loading,
}) => {
	return (
		<div
			className={`relative min-h-48 w-full md:w-3/4 px-4 py-8 grid grid-col-1 place-items-center border rounded-md border-gray-900/25 ${
				newVideo ? 'border-solid bg-primary' : 'border-dashed bg-muted'
			}`}
		>
			{newVideo ? (
				<>
					<video
						className="w-48 aspect-square object-center object-fit rounded-3xl"
						controls
						src={newVideo}
					/>
				</>
			) : loading ? (
				<Spinner />
			) : (
				<div className="grid grid-rows-2 grid-cols-1 gap-2 place-items-center text-gray-600 text-center">
					<span className="text-sm">
						Your <strong>new video </strong>
						will appear here
					</span>
				</div>
			)}
		</div>
	);
};

export default GeneratedVideo;
