export default function LoadingSpinner() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fafaf9",
            }}
        >
            <div
                style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    border: "3px solid #e7e5e4",
                    borderTopColor: "#f97316",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                }}
            />
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}