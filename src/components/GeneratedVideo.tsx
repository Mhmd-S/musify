import Spinner from './Spinner';

type GeneratedVideoProps = {
	newVideo: string | null;
	downloadVideo: () => void;
	loading: boolean;
}

const GeneratedVideo: React.FC<GeneratedVideoProps> = ({
	newVideo,
	downloadVideo,
	loading,
}) => {
	if (newVideo) {
		return (
			<>
				<video
					className="w-3/5 aspect-video object-cover rounded-2xl"
					controls
					src={newVideo}
				/>
				<button onClick={downloadVideo} className="rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
					Download Video
				</button>
			</>
		);
	}

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className="w-3/5 aspect-video bg-gray-600/35 rounded-2xl flex items-center justify-center">
			<p className="font-light">Your new video will appear here</p>
		</div>
	);
};

export default GeneratedVideo;