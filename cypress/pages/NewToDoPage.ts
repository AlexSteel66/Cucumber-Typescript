import TodoApi from "../api/TodoApi";
import User from "../models/User";

export default class NewToDoPage{

private get newToDo(){
    return '[data-testid="new-todo"]';
}

private get submitNewTask(){
    return '[data-testid="submit-newTask"]'
}

    load(){
          cy.visit("/todo/new");
    }

    addToDo(task: string){
        cy.get(this.newToDo).type(task)
        cy.get(this.submitNewTask).click();
    }

    addToDoUsingApi(user: User){
        new TodoApi().addTodo(user);

    }
}