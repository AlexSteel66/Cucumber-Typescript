import User from "../models/User";
import RegisterPage from '../pages/RegisterPage';
import ToDoPage from "../pages/ToDoPage";

it("should be able to register", () =>{
const user = new User();
const todoPage = new ToDoPage();
const registerPage = new RegisterPage();
registerPage.load();
registerPage.register(user);
todoPage.getWelcomeMessage().should("be.visible")

})