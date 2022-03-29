import { Request, Response } from "express";
import { Database } from "./db";
import { Tasks } from "./commands/tasks";

export class Router {

    public API = "/api/v1/";
    public PATHS : {[key:string] : (db : Database, req : Request, res : Response) => Promise<any>};

    public constructor() {
        this.PATHS = {
            "get/user/tasks" : Tasks.getUserTasks,
            "get/user/month/tasks/" : Tasks.getUserMonthTasks,
            "get/user/tasks/from/category" : Tasks.getUserTasksFromCategory,
            "get/user/task/categories" : Tasks.getUserTaskCategories,
            "insert/user/task" : Tasks.insertUserTask,
            "delete/user/task" : Tasks.deleteUserTask,
        }
    }
}