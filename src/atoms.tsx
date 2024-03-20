import { atom, selector } from "recoil"

const localToDosJSON = localStorage.getItem("ToDos")
const localToDos = JSON.parse(localToDosJSON as any)

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

export interface IToDo {
    text: string
    id: number
    category: "TO_DO" | "DOING" | "DONE"
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
})

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: localToDos || [],
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState)
        const category = get(categoryState)
        return toDos.filter((toDo) => toDo.category === category)
    },
})
