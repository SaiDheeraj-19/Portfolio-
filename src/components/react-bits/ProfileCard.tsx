import React, { useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProfileCardProps {
    name: string;
    title: string;
    handle: string;
    status?: string;
    contactText?: string;
    avatarUrl: string;
    showUserInfo?: boolean;
    enableTilt?: boolean;
    enableMobileTilt?: boolean;
    enableDrag?: boolean;
    onContactClick?: () => void;
    className?: string; // Add className support
    children?: React.ReactNode;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    title,
    handle,
    status = "Online",
    avatarUrl,
    showUserInfo = true,
    enableTilt = true,
    enableMobileTilt = false,
    enableDrag = false,
    onContactClick,
    className,
    children
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);

    // Optimized spring config - smooth follow and return
    const springConfig = { stiffness: 300, damping: 20, mass: 0.8 };
    const mouseX = useSpring(tiltX, springConfig);
    const mouseY = useSpring(tiltY, springConfig);

    const [isFlipped, setIsFlipped] = useState(false);

    // Reduced tilt angle for smoother performance
    const rotateXValue = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
    const rotateYValue = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

    // Flip value with faster spring
    const flipRotation = useSpring(0, { stiffness: 200, damping: 25 });

    // Combine tilt and flip
    const rotateX = useTransform(rotateXValue, (val) => `${val}deg`);
    const rotateY = useTransform([rotateYValue, flipRotation], ([tilt, flip]) => `${(typeof tilt === 'number' ? tilt : 0) + (typeof flip === 'number' ? flip : 0)}deg`);

    const handleClick = () => {
        if (onContactClick) {
            onContactClick();
        } else {
            setIsFlipped(!isFlipped);
            flipRotation.set(isFlipped ? 0 : 180);
        }
    };

    // Throttled mouse move handler for performance
    const lastMoveTime = useRef(0);
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !enableTilt) return;

        // Throttle to ~120fps (8ms interval)
        const now = performance.now();
        if (now - lastMoveTime.current < 8) return;
        lastMoveTime.current = now;

        // Check for mobile tilt
        const isMobile = window.innerWidth < 768;
        if (isMobile && !enableMobileTilt) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        tiltX.set(mouseXFromCenter / width);
        tiltY.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        tiltX.set(0);
        tiltY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`relative w-full h-full rounded-3xl cursor-pointer ${children ? '' : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden'} group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                rotateX: enableTilt ? rotateX : 0,
                rotateY: enableTilt ? rotateY : (isFlipped ? "180deg" : "0deg"),
                willChange: "transform",
            }}
            whileHover={{ scale: 1.02 }}
            drag={enableDrag}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            dragElastic={0.1}
            whileDrag={{ cursor: "grabbing" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {children ? (
                <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                    {children}
                </div>
            ) : (
                <>
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ transform: "translateZ(80px)" }}
                    />

                    <div
                        className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center"
                        style={{ transform: "translateZ(50px)" }}
                    >
                        {/* Avatar Ring */}
                        <div className="relative mb-6">
                            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-primary to-purple-500 shadow-lg" style={{ transform: "translateZ(20px)" }}>
                                <div className="w-full h-full rounded-full overflow-hidden bg-background relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            {status && (
                                <div className="absolute bottom-1 right-1 px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full border-2 border-background shadow-sm"
                                    style={{ transform: "translateZ(30px)" }}
                                >
                                    {status}
                                </div>
                            )}
                        </div>

                        {showUserInfo && (
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold tracking-tight text-foreground" style={{ transform: "translateZ(30px)" }}>{name}</h3>
                                <p className="text-sm font-medium text-primary uppercase tracking-wider" style={{ transform: "translateZ(25px)" }}>{title}</p>
                                <p className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded-md inline-block mt-2" style={{ transform: "translateZ(20px)" }}>{handle}</p>
                            </div>
                        )}

                        {/* Shine Effect */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white to-transparent"
                            style={{
                                transform: "translateZ(60px) rotate(-45deg)",
                                width: "200%",
                                height: "200%",
                                left: "-50%",
                                top: "-50%"
                            }}
                        />
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default ProfileCard;
