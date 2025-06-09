const Header = (props) => (<h1>{props.name}</h1>)

const Content = (props) => {
  const parts = props.parts.map(part => 
    <Part part={part} key={part.id} />
  )
  return (
    <>
      {parts}
      <Total parts={props.parts} />
    </>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  const sum = props.parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <b>total of {sum} exercises</b>
  )
}

const Course = (props) => {
  return (
    <>
      <Header name={props.name} />
      <Content parts={props.parts} />
    </>
  )
}

export default Course