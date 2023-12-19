    import express from "express";
    import bodyParser from "body-parser";
    import {dirname} from "path";
    import { fileURLToPath } from "url";

    const port = 3000;
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

    
    // data structures for the post:
    let posts = [];

    // class post with contructor:
    function Post(title,content){
        this.title = title;
        this.content = content;
        this.rawDate =  new Date();
        this.date = this.rawDate.toLocaleString();
    }

    // Add the post:
    const addPost = (title,content)=>{
        let post = new Post(title,content);
        posts.push(post);
    }

    // delete post
    const delPost = (index)=>{
        posts.splice(index,1);
    }

    // Edit post:
    const editPost = (index,content,title)=>{
        if(posts[index]){
            posts[index] = new Post(title,content);
        }
    }

    // End Points:

    // Entry point:
    app.get("/",(req,res)=>{
        console.log(posts);
        res.render(_dir+"/views/index.ejs",{
            posts:posts
        })
    })

    // view a particular post request:
    app.get("/view/:id",(req,res)=>{
        const postId = req.params.id;
        const p = posts[postId];
        console.log(p);
        res.render(_dir+"/views/post.ejs",{
            postId:postId,
            title:p.title,
            content:p.content
        })
    })

    // Delete a particular post request:
    app.post("/delete",(req,res)=>{
        const id = req.body.postId;
        delPost(id);
        res.redirect("/");
    })

    // Edit request of a particular post:
    app.get("/edit/:id",(req,res)=>{
        const id = req.params.id;
        const p = posts[id];
        console.log(p);
        res.render(_dir+"/views/createPost.ejs",{
            postId:id,
            title:p.title,
            content:p.content
        })
    })

    // update request for a particular post:
    app.post("/update",(req,res)=>{
        const title = req.body.title;
        const content = req.body.content;
        const id = req.body.postId;
        editPost(id,content,title);
        console.log(id);
        res.redirect("/");
    })

    // req to create a new post page:
    app.get("/createPost",(req,res)=>{
        res.render(_dir+"/views/createPost.ejs");
    })

    // req to actually create a post
    app.post("/create/save",(req,res)=>{
        const title = req.body.title;
        const content = req.body.content;
        addPost(title,content);
        res.redirect("/");
    })

    app.listen(port,()=>{
        console.log(`I am at ${port}`);
        addPost("What is Lorem Ipsum?","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum");
    })