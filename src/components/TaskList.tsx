import { useState } from "react"
import { v5 as uuidv5 } from "uuid"
import "../styles/tasklist.scss"

import { FiTrash, FiCheckSquare } from "react-icons/fi"

type Task = {
    id: string
    title: string
    isComplete: boolean
}

const APP_NAMESPACE_UUID = "1b671a64-40d5-491e-99b0-da01ff1f3341"

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskTitle, setNewTaskTitle] = useState("")

    function handleCreateNewTask() {
        // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
        if (!newTaskTitle) {
            alert("Preencha o título da nova tarefa.")
            return false
        }

        setTasks(tasks => [
            ...tasks,
            {
                id: uuidv5(newTaskTitle, APP_NAMESPACE_UUID),
                title: newTaskTitle,
                isComplete: false
            }
        ])

        setNewTaskTitle("")
    }

    function handleToggleTaskCompletion(id: string) {
        // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
        setTasks(tasks =>
            tasks.map(task => {
                if (task.id === id) {
                    return { ...task, isComplete: !task.isComplete }
                }
                return task
            })
        )
    }

    function handleRemoveTask(id: string) {
        // Remova uma task da listagem pelo ID
        setTasks(tasks => tasks.filter(task => task.id !== id))
    }

    return (
        <section className="task-list container">
            <header>
                <h2>Minhas tasks</h2>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Adicionar novo todo"
                        onChange={e => setNewTaskTitle(e.target.value)}
                        value={newTaskTitle}
                    />
                    <button
                        type="submit"
                        data-testid="add-task-button"
                        onClick={handleCreateNewTask}
                    >
                        <FiCheckSquare size={16} color="#fff" />
                    </button>
                </div>
            </header>

            <main>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <div
                                className={task.isComplete ? "completed" : ""}
                                data-testid="task"
                            >
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        readOnly
                                        checked={task.isComplete}
                                        onClick={() =>
                                            handleToggleTaskCompletion(task.id)
                                        }
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <p>{task.title}</p>
                            </div>

                            <button
                                type="button"
                                data-testid="remove-task-button"
                                onClick={() => handleRemoveTask(task.id)}
                            >
                                <FiTrash size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    )
}
