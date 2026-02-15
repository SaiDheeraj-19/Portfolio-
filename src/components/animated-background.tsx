"use client"

import Balatro from "./Balatro"

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <Balatro
                spinRotation={-2}
                spinSpeed={7}
                color1="#DE443B"
                color2="#006BB4"
                color3="#162325"
                contrast={3.5}
                lighting={0.4}
                spinAmount={0.25}
                pixelFilter={700}
            />
        </div>
    )
}
