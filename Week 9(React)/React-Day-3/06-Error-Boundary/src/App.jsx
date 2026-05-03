import React from "react";

const App = () => {
    return (
        <div>
            <ErrorBoundary>
                <Card1 /> 
            </ErrorBoundary>
            <ErrorBoundary>
                <Card2 /> 
            </ErrorBoundary>
        </div>
    );
};


function Card1() {
    throw new Error("Error While Rendering Card 1");
    return (
        <div style={{ background: "red", borderRadius: 10, padding: 20 }}>
            <h2>Card 1</h2>
        </div>
    );
}

function Card2() {
    return (
        <div style={{ background: "red", borderRadius: 10, padding: 20, marginTop: 20 }}>
            <h2>Card 2</h2>
        </div>
    );
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div style={{ background: "red", borderRadius: 10, padding: 20, marginTop: 20 }}>
              Something went wrong.
              </div>
        }

        return this.props.children; 
    }
}

export default App;