import { useRef, useEffect, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export default function useFFmpeg() {
    const ffmpegRef = useRef(new FFmpeg());
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)
        loadFFmpeg();
        setLoading(false);
    },[])

    const loadFFmpeg = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
        const ffmpeg = ffmpegRef.current
        // toBlobURL is used to bypass CORS issue, urls with the same
        // domain can be used directly.
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
        })

        console.log("FFmpeg loaded")
      }

    return {ffmpeg: ffmpegRef.current, loading, fetchFile };
};