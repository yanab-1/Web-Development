import { useState, useEffect } from "react";

function App() {
    const [showTimer, setShowTimer] = useState(true);

    useEffect(() => {
        // Create a timeout that toggles the showTimer state after 5 seconds
        setInterval(() => {
            // Update the showTimer state by toggling its current value
            setShowTimer((currentValue) => !currentValue);
        }, 5000);
    }, []); // Empty dependency array means this runs once when the component mounts.

    // return JSX that will be rendered in the root element
    return (
        <div style={{ margin: 20, textAlign: "center" }}>
            {/* Display the title of the app */}
            <h1>Countdown App</h1>

            {
                // Use the showTimer state to conditionally render the Timer component
                showTimer && <Timer />
            }
        </div>
    );
}

function Timer() {
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const clock = setInterval(() => {
            console.log("Mounted");
            setSeconds((prev) => prev + 1);
        }, 1000);
        return function () {
            clearInterval(clock);
        };
    }, []); // Empty dependency array means this runs once when the component mounts.
    return <h3>{seconds} seconds elapsed</h3>;
}

export default App;