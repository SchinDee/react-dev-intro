import type { ReactNode } from "react"
import { TodosContext } from "../context/todos-context"
import { useTodos } from "../hooks/useTodos"


type Props = {
    children: ReactNode
}

export const TodosProviders= ({children}:Props) => {
    const todoState = useTodos()

    return (
        <TodosContext.Provider value={todoState}>{children}

        </TodosContext.Provider>
    )
}