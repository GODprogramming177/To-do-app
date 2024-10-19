import React, { useState, useEffect } from "react"
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep"
import AddTaskIcon from "@mui/icons-material/AddTask"
import FactCheckSharpIcon from "@mui/icons-material/FactCheckSharp"
import "./Todo.css"

const TodoApp = () => {
  const [todolist, setTodolist] = useState([])
  const [work, setWork] = useState("")

  useEffect(() => {
    const storedTodolist = JSON.parse(localStorage.getItem("todolist")) || []
    setTodolist(storedTodolist)
  }, [])

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todolist))
  }, [todolist])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!work.trim()) {
      return
    }

    const newTask = {
      id: Date.now(),
      work,
      cond: false,
      timestamp: new Date().toLocaleString(),
    }

    setTodolist([...todolist, newTask])
    setWork("")
  }

  const toggleCondition = (id) => {
    setTodolist((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, cond: !item.cond } : item
      )
    )
  }
  console.log(todolist)

  const deleteItem = (id) => {
    const newList = todolist.filter((list) => list.id !== id)
    setTodolist(newList)
  }

  return (
    <>
      <div className="container">
        {/* <button onClick={()=>{setTodolist([])}}>clear all</button> */}
        <div className="todoCont">
          <div className="todoContbox">
            <form
              onSubmit={handleSubmit}
              className="listForm"
            >
              <input
                autoFocus
                type="text"
                name="work"
                placeholder="Add Task"
                value={work}
                onChange={(e) => setWork(e.target.value)}
              />
              <button type="submit">
                <AddTaskIcon />
              </button>
            </form>
          </div>

          <div className="todolist">
            {todolist.map((item, idx) => (
              <div
                key={item.id}
                className="task"
                style={
                  item.cond
                    ? { borderColor: "#4ee44e", cursor: "pointer" }
                    : { borderColor: "red", cursor: "pointer" }
                }
              >
                <div className="topcont">
                  <div className="workname">
                    <div>{idx + 1}:</div>
                    <span>{item.work}</span>
                  </div>
                  <div className="topcontCheck">
                    <FactCheckSharpIcon
                      onClick={() => toggleCondition(item.id)}
                      style={
                        item.cond
                          ? { color: "#4ee44e", cursor: "pointer" }
                          : { color: "red", cursor: "pointer" }
                      }
                    />
                    <DeleteSweepIcon
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => deleteItem(item.id)}
                    />
                  </div>
                </div>
                <div className="time-stamp">{item.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoApp

// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
