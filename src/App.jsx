import { useState } from "react"
import { Morty, Rick, Verano, Jerry, Beth } from "./utils/icons/index"
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: "grab",
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  )
}

function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  })

  const style = {
    backgroundColor: isOver ? "#e9e9e9" : undefined,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    gap: "10px",
  }

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  )
}

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

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      // Obtener el ID del elemento arrastrado
      const draggedItemId = active.id

      // Determinar en qué columna está el elemento
      let sourceColumnId
      let draggedItem

      // Buscar en la primera columna
      const itemInFirstColumn = column.first.list.find(
        (item) => item.id === draggedItemId
      )
      if (itemInFirstColumn) {
        sourceColumnId = "first"
        draggedItem = itemInFirstColumn
      } else {
        // Buscar en la segunda columna
        const itemInSecondColumn = column.second.list.find(
          (item) => item.id === draggedItemId
        )
        if (itemInSecondColumn) {
          sourceColumnId = "second"
          draggedItem = itemInSecondColumn
        }
      }

      // Si encontramos el elemento y el destino es una columna
      if (draggedItem && (over.id === "first" || over.id === "second")) {
        const destinationColumnId = over.id

        // Solo hacer cambios si la columna de destino es diferente
        if (sourceColumnId !== destinationColumnId) {
          setColumn((prev) => {
            // Copia el estado anterior
            const newState = { ...prev }

            // Eliminar de la columna origen
            newState[sourceColumnId] = {
              ...prev[sourceColumnId],
              list: prev[sourceColumnId].list.filter(
                (item) => item.id !== draggedItemId
              ),
            }

            // Añadir a la columna destino
            newState[destinationColumnId] = {
              ...prev[destinationColumnId],
              list: [...prev[destinationColumnId].list, draggedItem],
            }

            return newState
          })
        }
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <nav className="navbar">
          <img className="navbar-logo" src="/logo.png" alt="Logo" />
        </nav>
        <div className="styled-columns">
          <div className="column">
            <Droppable id="first">
              {column.first.list.map((item) => (
                <Draggable key={item.id} id={item.id}>
                  {item.content}
                </Draggable>
              ))}
            </Droppable>
          </div>
          <div className="column">
            <Droppable id="second">
              {column.second.list.map((item) => (
                <Draggable key={item.id} id={item.id}>
                  {item.content}
                </Draggable>
              ))}
            </Droppable>
          </div>
        </div>
      </div>
    </DndContext>
  )
}

export default App
