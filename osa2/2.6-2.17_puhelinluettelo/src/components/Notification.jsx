const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const messageStyle = {
    color : message.color
  }

  return (
    <div className="status" style={messageStyle}>
      {message.text}
    </div>
  )
}

export default Notification
