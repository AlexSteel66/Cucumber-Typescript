import User from "../models/User";

export default class TodoApi {

    addTodo(user: User){
        cy.request({
            method: "POST",
            url: "/api/v1/tasks",
            body: {
                isCompleted: false,
                item: "Learn Cypress",
            },
                headers: {
                    Authorization: `Bearer ${user.getToken()}`,
                },
        });
    }
}