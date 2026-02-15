"use client";

import { useAudio } from "@/context/audio-context";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicToggleProps {
    className?: string; // Additional classes
    variant?: "dark" | "light"; // For adapting to nav background if needed
}

export default function MusicToggle({ className, variant = "dark" }: MusicToggleProps) {
    const { isPlaying, togglePlay } = useAudio();

    // If variant is light (navbar on white bg), we might want different colors?
    // Actually, the navbar 'contactBtnClass' handles logic. Let's make this button simple and styleable via className.

    // Default styles matching the navbar theme
    // If Playing: Active state styling
    // If Paused: Inactive state

    return (
        <button
            onClick={togglePlay}
            className={cn(
                "relative p-2 rounded-full border transition-all duration-300 group overflow-hidden flex items-center justify-center w-10 h-10",
                isPlaying
                    ? "bg-white/10 border-white/20 hover:bg-white/20 text-white"
                    : "bg-transparent border-white/10 text-neutral-400 hover:text-white hover:border-white/30",
                className
            )}
            aria-label={isPlaying ? "Pause Background Music" : "Play Background Music"}
        >
            {/* Visualizer bars animation when playing */}
            {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-30 pointer-events-none">
                    {[0.6, 0.8, 0.5, 0.9, 0.7].map((duration, i) => (
                        <div
                            key={i}
                            className="w-[2px] bg-white animate-music-bar"
                            style={{
                                animationDuration: `${duration}s`,
                                height: '50%'
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="relative z-10">
                {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </div>
        </button>
    );
}
