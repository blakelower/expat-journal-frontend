import React from 'react'

export default function Footer() {
  const date = new Date()

  return (
    <footer className="footer grey lighten-5 grey-text">
      <p>Copyright &copy; {date.getFullYear()} - Expat Journal</p>
    </footer>
  )
}
