'use client';

import { useState, useRef, useEffect } from 'react';
import useFFmpeg from '@/hooks/useFFmpeg';

import {
    generateSnapshots,
    generateTheme,
    generateMusic,
    generateOrchestralBrief,
} from '@/utils';

import FileUploadField from '@/components/FileUploadField';
import GeneratedVideo from '@/components/GeneratedVideo';

export default function DreamPage() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const messageRef = useRef<HTMLParagraphElement | null>(null);

    const [newVideo, setNewVideo] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);

    const { ffmpeg, loading: ffmpegLoading, fetchFile } = useFFmpeg();

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoSrc(url);
        }
    };

    const handleRemoveVideo = () => {
        setVideoSrc(null);
    };

    const createMusic = async () => {
        setNewVideo(null);
        setLoading(true);
        const snapshots = await generateSnapshots(videoRef.current);

        if (snapshots && snapshots.length > 0) {
            const snapshotsTheme: string[] | null = [];

            snapshots.forEach(async (snapshot) => {
                const theme = generateTheme(snapshot, setError);
                snapshotsTheme.push(theme);
            });

            const themes = await Promise.all(snapshotsTheme);

            // Remove duplicates themes and the string "Caption:" and then combining them.
            const combinedThemes = themes
                .filter(
                    (item, index, self) =>
                        index ===
                        self.findIndex((t) => t.output === item.output)
                )
                .map((t) => t.output.replace('Caption:', ''))
                .join(', ');

            const orchestralBrief = await generateOrchestralBrief(
                combinedThemes,
                setError
            );

            // Combine
            const brief = orchestralBrief.output.map((t) => t).join(' ');

            generateMusic(brief, videoRef.current.duration, setError)
                .then((music) => {
                    replaceAudio(music.output)
                        .catch((err) => console.log(err))
                        .finally(() => {
                            setLoading(false);
                        });
                })
                .catch((error) => {
                    setError('Failed to generate music');
                    setLoading(false);
                });
        }
    };

    const replaceAudio = async (music: string) => {
        try {
            if (!videoSrc) {
                throw new Error('No video source provided');
            }

            // Load video and audio files
            const videoFile = await fetchFile(videoSrc);
            const audioFile = await fetchFile(music);

            await ffmpeg.writeFile('video.mp4', videoFile);
            await ffmpeg.writeFile('audio.mp3', audioFile);

            // Replace audio in the video
            await ffmpeg.exec([
                '-i',
                'video.mp4',
                '-i',
                'audio.mp3',
                '-c:v',
                'copy',
                '-map',
                '0:v:0',
                '-map',
                '1:a:0',
                '-shortest',
                'output.mp4',
            ]);

            // Get the resulting video
            const data = await ffmpeg.readFile('output.mp4', 'binary');

            // Create a URL for the resulting video
            const videoUrl = URL.createObjectURL(
                new Blob([data], { type: 'video/mp4' })
            );

            setNewVideo(videoUrl);
        } catch (error) {
            console.error('Error in replaceAudio:', error);
            setError('Failed to replace audio in the video');
        }
    };

    return (
        <div className="relative bg-white isolate flex flex-col items-center py-4 gap-12">
            <>
                <div className="w-full p-12 grid grid-cols-[30%_70%] gap-12">
                    <div className="flex flex-col items-center gap-y-12 pt-8">
                        <FileUploadField
                            label="Upload a video"
                            accept="video/*"
                            ref={videoRef}
                            name="video"
                            handleFileChange={handleVideoUpload}
                            file={videoSrc}
                            handleRemoveFile={handleRemoveVideo}
                        />
                        <button
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={createMusic}
                        >
                            Generate Music
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-8">
                        <h2 className="text-4xl font-bold text-center w-4/5">
                            Musify your{' '}
                            <span className="text-pink-600">video</span> with
                            AI-generated music in seconds
                        </h2>
                        <h3 className="font-light text-2xl">
                            Upload a video and we will generate suitable music
                            for it
                        </h3>
                        <GeneratedVideo
                            newVideo={newVideo}
                            downloadVideo={() => {}}
                            loading={loading || ffmpegLoading}
                        />
                    </div>
                </div>
            </>
        </div>
    );
}