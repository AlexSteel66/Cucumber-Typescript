import {faker} from '@faker-js/faker'
import User from "../models/User";
import UserAPI from '../api/UserApi';
import TodoApi from '../api/TodoApi';
import ToDoPage from '../pages/ToDoPage';
import NewToDoPage from '../pages/NewToDoPage';
import RegisterPage from '../pages/RegisterPage';


describe("Todo Test cases", () => {
    let user: User;
    let registerPage: RegisterPage;
    let toDoPage: ToDoPage;
    let newToDoPage: NewToDoPage;

    beforeEach(()=> {     
        user = new User();
        registerPage = new RegisterPage();
        toDoPage = new ToDoPage();
        newToDoPage = new NewToDoPage();
        registerPage.registerUsingAPI(user);
});

    it("should be able to delete a todo", () =>{
       newToDoPage.addToDoUsingApi(user);
       toDoPage.load();
       toDoPage.getDeleteButton();
       toDoPage.getNoToDosMessage().should("be.visible")
        })

it("should be able to add a todo", () =>{
    newToDoPage.load();
    newToDoPage.addToDo("Learn Cypress");
    toDoPage.getToDoItem().should("contain.text", "Learn Cypress");

    })
})
