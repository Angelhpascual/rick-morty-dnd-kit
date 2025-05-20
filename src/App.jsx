import { useState } from "react"
import { Morty, Rick, Verano, Jerry, Beth } from "./utils/icons/index"

function App() {
  const initialColumn = {
    first: {
      id: "first",
      list: [
        { id: "1", content: <img src={Morty} /> },
        { id: "2", content: <img src={Rick} /> },
        { id: "3", content: <img src={Verano} /> },
        { id: "4", content: <img src={Jerry} /> },
        { id: "5", content: <img src={Beth} /> },
      ],
    },
    second: {
      id: "second",
      list: [],
    },
  }

  const [column, setColumn] = useState(initialColumn)

  return (
    <div>
      <nav className="navbar">
        <img className="navbar-logo" src="/logo.png" alt="Logo" />
      </nav>
      <div className="styled-columns">
        <div className="column">
          {column.first.list.map((item) => (
            <div>{item.content}</div>
          ))}
        </div>
        <div className="column"></div>
      </div>
    </div>
  )
}

export default App
