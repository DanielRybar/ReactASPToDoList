export const ErrorFallback = ({error, resetErrorBoundary, componentStack}) => {
    return (
        <div>
            <p>Chyba</p>
            <pre>{error.message}</pre>
            <pre>{componentStack}</pre>
            <button onClick={resetErrorBoundary}>Reset</button>
        </div>
    );
}

export default ErrorFallback;