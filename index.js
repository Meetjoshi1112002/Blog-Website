    import express from "express";
    import bodyParser from "body-parser";
    import {dirname} from "path";
    import { fileURLToPath } from "url";
    export const _dir = dirname(fileURLToPath(import.meta.url));

    
    import {router} from "./routes/blogRoutes.js";
    const app = express();
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.static('public'));  //----> For static files of the project
    app.use("/",router);


    const port = 3000;
    app.listen(port,()=>{
        console.log(`I am at ${port}`);
    })