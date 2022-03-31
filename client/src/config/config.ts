import { APP } from "../app.js";
import { setDataset, setStyles } from "../lib/gtd-ts/web/uicomponent.js";

export enum ENVIROMENT {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
}

export class Configurations {
    
    //global runtime configurations
    public static BASE = {
        APP_NAME: "Vallhala",
        APP_VERSION: "v1.0.1a",
        HOST: "127.0.0.1",
        PORT: 80,
        URL: location.href,
        ENVIROMENT: ENVIROMENT.DEVELOPMENT,
        DEBUG: true,
        LOG_LEVEL: "debug",
        LOG_FILE: "app.log",
    };

    public static PATHS = {
        ROOT : "../client/",
        LOGS : "../client/logs/",
        RESOURCES : "../client/resources/",
        IMAGES : "../client/resources/images/",
        ICONS : "../client/resources/icons/",
        WALLPAPERS : "../client/resources/wallpapers/",

    };

    public static VIEWS = {
        BASE_URL: "../web/index.html#/",
        TASKS: "../web/index.html#/tasks/",
        NEW_TASK: "../web/index.html#/new-task/",
        CALENDAR: "../web/index.html#/calendar/",
        TEAMS: "../web/index.html#/teams/",
        PROJECTS: "../web/index.html#/projects/",
        SEARCH: "../web/index.html#/search/",
        CONFIGURATION: "../web/index.html#/configuration/",
        TERMINAL: "../web/index.html#/terminal/",
        ABOUT: "../web/index.html#/about/",
        ERROR: "../web/index.html#/error/",
    };
    
    public static API = {
        URL : "http://127.0.0.1:3333/api/v1/",
        GET_USER_TASKS : "http://127.0.0.1:3333/api/v1/get/user/tasks/",
        GET_USER_TASK :  "http://127.0.0.1:3333/api/v1/get/user/task/",
        GET_USER_MONTH_TASKS: "http://127.0.0.1:3333/api/v1/get/user/month/tasks/",
        GET_USER_TASKS_FROM_CATEGORY: "http://127.0.0.1:3333/api/v1/get/user/tasks/from/category/",
        GET_USER_TASK_CATEGORIES: "http://127.0.0.1:3333/api/v1/get/user/task/categories/",
        INSERT_USER_TASK: "http://127.0.0.1:3333/api/v1/insert/user/task/",
        DELETE_USER_TASK: "http://127.0.0.1:3333/api/v1/delete/user/task/",
        UPDATE_USER_TASK: "http://127.0.0.1:3333/api/v1/update/user/task/",
        SEARCH_USER_TASKS_BY_NAME: "http://127.0.0.1:3333/api/v1/search/user/tasks/by/name",
    };


    /**
     * Set default configurations for the application
     */
    public static setDefaultVariables() {

        if(!Configurations.getConfigVariable("USERNAME")) {
            Configurations.addConfigVariable("USERNAME", "default");
        }

        if(!Configurations.getConfigVariable("OAUTH")) {
            Configurations.addConfigVariable("OAUTH", "#");
        }
    }

    /**
     * Get a configuration variable
     * @returns the configuration variable
     */
    public static getUserName() {
        return Configurations.getConfigVariable("USERNAME");
    }

    /**
     * Get the oauth token
     * @returns the oauth token
     */
    public static getOAuth() {
        return Configurations.getConfigVariable("OAUTH");
    }

    /**
     * Toogle the dark / light mode.
     * if a wallpaper is set, does not change the theme
     */
    public static toggleTheme() {
        if (Configurations.getConfigVariable("WALLPAPER")){
            return;
        }

        Configurations.setTheme((Configurations.getConfigVariable("THEME") === "light") ? "dark" : "light")
    }

    /**
     * Set the application UI theme 
     * @param theme the theme to set
     */
    public static setTheme(theme : string) {

        if(!theme)
            theme = "dark";

        this.addConfigVariable("THEME", theme);
        this.addConfigVariable("WALLPAPER", false);

        document.documentElement.dataset.theme = theme;
    }


    public static getTheme() {
        return Configurations.getConfigVariable("THEME");
    }

    /**
     * Get if the dark mode is active
     * @returns true if the dark mode is active
     */
    public static isDarkModeActive() {
        return Configurations.getTheme() === "dark";
    }


    /**
     * Set the variable panel visibile
     */
    public static setVariablePanelVisible(value: boolean) {
        Configurations.addConfigVariable("VARIABLES_VISIBLE", value);

        if (Configurations.getConfigVariable('VARIABLES_VISIBLE')) {
            APP.router.variablePanel.show();
        } else {
            APP.router.variablePanel.hide();
        }
    }

    /**
     * Toggle the variable panel visibility
     */
    public static toggleVariablePanel() {

        if(Configurations.BASE.ENVIROMENT !== ENVIROMENT.DEVELOPMENT)
            return; 

        this.setVariablePanelVisible(!Configurations.getConfigVariable('VARIABLES_VISIBLE'));
        setDataset(document.documentElement, {"variablesVisible" : Configurations.getConfigVariable('VARIABLES_VISIBLE')});
    }

    /**
     * Get application configurations
     * @returns the application configurations
     */
    public static getConfig() {
        let localStorageConfiguration = JSON.parse(localStorage.getItem("vallhala-config"));

        if(!localStorageConfiguration) {
            localStorageConfiguration = {}
        }

        return localStorageConfiguration;
    }

    /**
     * Add a configuration variable
     * @param key the name of the variable
     * @param value the value of the variable
     */
    public static addConfigVariable(key: string, value: any) {
        let localStorageConfiguration = Configurations.getConfig();
        const config = localStorageConfiguration;
        config[key] = value;
        localStorage.setItem("vallhala-config", JSON.stringify(config));
    }

    /**
     * Get a configuration variable
     * @param key the name of the variable
     * @returns the value of the variable
     */
    public static getConfigVariable(key: string) : string{
        let localStorageConfiguration = this.getConfig();
        return localStorageConfiguration[key];
    }

    /**
     * Set the application wallpaper
     * @param wallpaper the wallpaper to set
     */
    public static setWallpaper(wallpaper: string) {
        
        if(!wallpaper){
            this.addConfigVariable("WALLPAPER", wallpaper);
            setStyles(document.body,{"background-image": "none"});
            return;
        }

        this.setTheme("dark");
        this.addConfigVariable("WALLPAPER", wallpaper);

        setStyles(document.body,{
            "background-image": "url(" + Configurations.PATHS.WALLPAPERS + wallpaper + ")"
        });
    }    

    /**
     * Get the application wallpaper
     * @returns the wallpaper
     */
    static getWallpaper() : string {
        return Configurations.getConfigVariable("WALLPAPER");
    }

    /**
     * @returns if the application is has a wallpaper 
     */
    public static hasWallpaper() : boolean{
        const wallpaper = Configurations.getWallpaper();
        return !!wallpaper;
    }
}
