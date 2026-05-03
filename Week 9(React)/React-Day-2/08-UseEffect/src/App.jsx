import { useState, useEffect } from "react";
function App() {
    const [count, setCount] = useState(1);

    function increaseCount(){
      setCount(count => count + 1); 
    }

    useEffect(() => {
        setInterval(increaseCount, 1000);
    }, []); // this effect will run on mount, because the array in empty

    useEffect(() => {
      console.log("the count has been updated to " + count);
    }, [count]) // this will run when our count value change 

    return (
        <div>
            <h1>{count}</h1>
        </div>
    );
}
export default App;