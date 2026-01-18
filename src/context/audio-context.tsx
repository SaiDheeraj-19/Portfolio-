"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
    isPlaying: boolean;
    togglePlay: () => void;
    hasInteracted: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.2; // Low volume background

        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((error) => {
                    console.log("Audio autoplay prevented:", error);
                    setIsPlaying(false);
                });
        }
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Playback failed", e));
        }
        setIsPlaying(!isPlaying);
        setHasInteracted(true);
    };

    return (
        <AudioContext.Provider value={{ isPlaying, togglePlay, hasInteracted }}>
            {children}
            <audio ref={audioRef} src="/background-music.mp3" loop />
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
}
