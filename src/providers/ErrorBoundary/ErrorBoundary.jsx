import React, { ErrorInfo, ReactNode, Suspense } from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        if (hasError) {
            return (
                <h2>
                    Something went wrong, please refresh the page
                </h2>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
