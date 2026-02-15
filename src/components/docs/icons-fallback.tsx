export function IconsFallback() {
    return (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4">
            {Array.from({ length: 200 }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg animate-pulse"
                >
                    <div className="w-6 h-6 bg-muted-foreground/20 rounded" />
                </div>
            ))}
        </div>
    )
}
