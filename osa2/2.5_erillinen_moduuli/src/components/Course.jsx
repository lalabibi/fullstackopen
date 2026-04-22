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

export default Course
