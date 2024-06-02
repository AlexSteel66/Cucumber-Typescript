export default class ToDoPage{
    private get welcomeMessage(){
        return '[data-testid="welcome"]';
    }

    private get deleteButton(){
        return '[data-testid="delete"]';
    }

    private get noToDosMessage(){
        return '[data-testid="no-todos"]';
    }

    private get toDoItem(){
        return '[data-testid="todo-item"]'
    }

    load(){ cy.visit("/todo");}
   
    getWelcomeMessage(){
        return cy.get(this.welcomeMessage)
    }

    getDeleteButton(){
        cy.get(this.deleteButton).click()
    }

    getNoToDosMessage(){
       return cy.get(this.noToDosMessage);
    }

    getToDoItem(){
        return cy.get(this.toDoItem);
     }
}