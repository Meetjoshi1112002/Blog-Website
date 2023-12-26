    import express from "express";
    import bodyParser from "body-parser";
    import {dirname} from "path";
    import { fileURLToPath } from "url";
    import axios from "axios";
    const url = "http://localhost:5000"
    const app = express();
    const _dir = dirname(fileURLToPath(import.meta.url));
    app.use(express.static('public'));  //----> For static files of the project

    
    // MIDDLWARES:
    app.use((req,res,next)=>{
        console.log("request Method : "+req.method);
        console.log("request URL : "+req.url);
        next()
    })
    app.use(bodyParser.urlencoded({extended:false}));
    // End Points:

    // Entry point:
    app.get("/",async (req,res)=>{
        try{

            const response = await axios.get(url);
            const posts = response.data;
            res.render(_dir+"/views/index.ejs",{
                posts:posts
            })
        }catch(err){
            console.log(err.message);
        }
    })

    // view a particular post request:
    app.get("/view/:id",async (req,res)=>{
        const postId = req.params.id;
        const response = await axios.get(url+"/blog/"+postId);
        const p = response.data;
        res.render(_dir+"/views/post.ejs",{
            postId:postId,
            title:p.title,
            content:p.content
        })
    })

    // Delete a particular post request:
    app.post("/delete",async (req,res)=>{
        try{
        const id = req.body.postId;
        const response = await axios.delete(url+"/delete/"+id);  
        res.redirect("/");
        }catch(errr){
            console.log(errr.message);
        }
    })

    // Edit request of a particular post:
    app.get("/edit/:id",async(req,res)=>{
        try
        {
        const id = req.params.id;
        const response = await axios.get(url+"/blog/"+id);
        const p = response.data;
        res.render(_dir+"/views/createPost.ejs",{
            postId:id,
            title:p.title,
            content:p.content
        })
        }catch(er){
            console.log(er);
        }
    })

    // update request for a particular post:
    app.post("/update",async(req,res)=>{
        
        try{
            const respnse = await axios.patch(url+"/update",req.body)
            console.log(respnse.data);
            res.redirect("/");
        }catch(error){
            console.log(error.message);
        }
    })

    // req to create a new post page:
    app.get("/createPost",(req,res)=>{
        res.render(_dir+"/views/createPost.ejs");
    })

    // req to actually create a post
    app.post("/create/save",async (req,res)=>{
        try{

        const response = await axios.post(url+"/createPost",req.body);
        console.log(response.data);
        res.redirect("/");
        }
        catch(error){
            console.log(error.message);
        }
        
    })

    const port = 3000;
    app.listen(port,()=>{
        console.log(`I am at ${port}`);
    })