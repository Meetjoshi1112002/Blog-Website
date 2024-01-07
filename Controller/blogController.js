import axios from "axios";
const url = "http://localhost:5000"
import { _dir } from "../index.js";

const handleGetRoute = async (req,res)=>{
    try{
        const response = await axios.get(url);
        const posts = response.data;
        res.render(_dir+"/views/index.ejs",{
            posts:posts
        })

    }catch(err){
        console.log(err.message);
    }
}

const handleGetViewRoute = async (req,res)=>{
    const postId = req.params.id;
    const response = await axios.get(url+"/blog/"+postId);
    const p = response.data;
    res.render(_dir+"/views/post.ejs",{
        postId:postId,
        title:p.title,
        content:p.content
    })
}

const handleEditRequestRoute = async(req,res)=>{
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
}

const handleGetNewPostRoute = (req,res)=>{
    res.render(_dir+"/views/createPost.ejs");
}

const handleDeleteRoute = async (req,res)=>{
    try{
    const id = req.body.postId;
    const response = await axios.delete(url+"/delete/"+id);  
    res.redirect("/");
    }catch(errr){
        console.log(errr.message);
    }
}

const handleUpdateRoute = async(req,res)=>{
        
    try{
        const respnse = await axios.patch(url+"/update",req.body)
        console.log(respnse.data);
        console.log("hie");
        res.redirect("/");
    }catch(error){
        console.log(error.message);
    }
}

const handleCreateNewPostRoute = async (req,res)=>{
    try{

    const response = await axios.post(url+"/createPost",req.body);
    console.log(response.data);
    res.redirect("/");
    }
    catch(error){
        console.log(error.message);
    }
    
}

export {handleGetRoute,handleGetViewRoute,handleEditRequestRoute,handleGetNewPostRoute,handleUpdateRoute,handleDeleteRoute,handleCreateNewPostRoute}