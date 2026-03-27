const Header = (props) => {
   return (
    <h1>{props.course.name}</h1>
   )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
   return (
      <>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
      </>
   )
}

const Total = (props) => {
  // Calculate total count from data
  const number_of_parts = props.course.parts.length
  let   total_count = 0
  let   i
  for (i=0; i<number_of_parts; i++) {
    total_count += props.course.parts[i].exercises
  }
  
  return (
     <p>Number of exercises {total_count}</p>
  )
}

const App = () => {
  const course = {
    name : 'Half Stack application development',

    parts : [
      { name : 'Fundamentals of React',    exercises : 10 },
      { name : 'Using props to pass data', exercises : 7 },
      { name : 'State of a component',     exercises : 14 }
    ]
  }

  return (
    <div>
      <Header  course={course} />
      <Content course={course} />
      <Total   course={course} />
    </div>
  )
}

export default App
