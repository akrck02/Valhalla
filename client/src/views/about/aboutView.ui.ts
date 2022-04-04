import { App } from "../../app.js";
import { Configurations } from "../../config/config.js";
import { getOs } from "../../lib/gtd-ts/web/responsivetools.js";
import { UIComponent } from "../../lib/gtd-ts/web/uicomponent.js";
import { getSocialIcon } from "../../lib/social.js";
import AboutCore from "./aboutView.core.js";

export default class AboutView extends UIComponent {
    
    private core : AboutCore;
    
    public constructor() {
        super({
            type: "view",
            classes: ["box-column", "box-center"],
            id: "about",
            styles: {
                width: "100%",
                height: "100%",
            },
        });

        this.core = new AboutCore(this);
    }

        
    public show(params: string[], container: UIComponent): void {

        const box = new UIComponent({
            type: "div",
            classes: ["box-column", "box-center"],
            styles : {
                opacity: "0",
                width: "100%",
                transition: "opacity var(--slow)",
            }
        });

        const logo = new UIComponent({
            type: "div",
            id: "logo",
            classes: ["box-row", "box-x-center", "box-y-center"],
            text: getSocialIcon("valhalla", { size: "10rem", fill: "#404040" }).toHTML(),
            styles: {
                width: "10rem",
                opacity: "0.75",
            }
        });

        const title = new UIComponent({
            type: "h1",
            classes: ["box-row", "box-x-center", "box-y-center"],
            text: "Valhalla " + Configurations.BASE.APP_VERSION,
        });

        const os = new UIComponent({
            type: "h2",
            classes: ["box-row", "box-x-center", "box-y-center"],
            text: App.getBundle().about.RUNNING_ON + " " + getOs(),
        });


        const description = new UIComponent({
            type: "p",
            classes: ["box-row", "box-x-center", "box-y-center", "text-center"],
            text: App.getBundle().about.MADE_WITH_LOVE_BY_AKRCK02 + `.`,
            styles : {
                marginTop: "2rem",
                maxWidth: "30rem",
            }
        });

        const social = new UIComponent({
            type: "div",
            classes: ["box-row", "box-x-center", "box-y-center", "text-center"],
            styles: {
                marginTop: "2rem",
                maxWidth: "30rem",
            }
        });

        const github = new UIComponent({
            type: "a",
            classes: ["social", "box-row", "box-x-center", "box-y-center", "text-center"],
            attributes: {
                href: "https://github.com/akrck02/valhalla",
                target: "_blank",
            },
            text: getSocialIcon("github",{fill:"#fff",size:"1.25rem"}).toHTML(),
        });

        github.element.onclick = (e) => {
            e.preventDefault();
            require("electron").shell.openExternal(github.attributes.href);
        };

        logo.appendTo(box);
        title.appendTo(box);
        os.appendTo(box);
        description.appendTo(box);
        github.appendTo(social);
        social.appendTo(box);
        box.appendTo(this);
        this.appendTo(container);
    
        setTimeout(() => {
            box.element.style.opacity = "1";
        }, 100);
    }


}