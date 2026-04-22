const Title = (props) => {
  console.log('Making title : ', props.title)
  return (
    <h1>{props.title}</h1>
  )
}

const Header = (props) => {
  console.log('Making header : ', props.course.name)
  return (
    <h2>{props.course.name}</h2>
  )
}

const Part = (props) => {
  return (
    <p id={props.part.id}>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  console.log('Making content with', props.course.parts.length, 'parts')
   return (
      <>
        {props.course.parts.map(parts => <Part key={parts.id} part={parts} />)}
      </>
   )
}

const Total_v2 = (props) => {
  // Calculate total count from data using array reduce method
  const totalCount = props.course.parts.reduce((accumulator, parts) => accumulator + parts.exercises, 0);
  console.log('v2 Total number of excercises is', totalCount);

  return (
    <p><b>Total of {totalCount} exercises</b></p>
  )
}

const Total_v1 = (props) => {
  // Calculate total count from data by looping through array javascript-style
  let totalCount = 0
  props.course.parts.forEach(part => { totalCount += part.exercises });
  console.log('v1 Total number of excercises is', totalCount);
  
  return (
     <p><b>Total of {totalCount} exercises</b></p>
  )
}

const Total_v0 = (props) => {
  // Calculate total count from data by looping through array C-style
  const number_of_parts = props.course.parts.length
  let   totalCount = 0
  for (let i=0; i<number_of_parts; i++) {
    totalCount += props.course.parts[i].exercises
  }
  console.log('v0 Total number of excercises is', totalCount);
  
  return (
     <p><b>Total of {totalCount} exercises</b></p>
  )
}

const Course = (props) => {
    return (
      <>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total_v2 course={props.course} />
      </>
    )
}

const Courses = (props) => {
  return (
    <>
    <Title title='Web development curriculum' />
    {props.courses.map(courses => <Course key={courses.id} course={courses} />)}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

export default App
