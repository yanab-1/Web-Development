function App(){
  return (
    <div>
      <Todo key={1} title={"Go to Gym"} done={true} />
      <Todo key={2} title={"Eat food"} done={false} />
    </div>
  )
}

function Todo({ title, done}){
  return <div>
    { title } - { done ? "Done" : "Not Done!"}
  </div>
}

export default App;