const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path  =require("path");
const Chat = require("./models/chat");
const methodOverride=require("method-override");

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("Is working good");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatBox');
}


app.listen(8080,()=>{
    console.log("Hey There its working")
})

app.get("/",(req,res)=>{
  res.send("working");
})


//index route

app.get("/chats",async(req,res)=>{
  let chats =await Chat.find();
  console.log(chats);
  res.render("index.ejs",{chats});
});

//new Route
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
})

//create Route

app.post("/chats",(req,res)=>{
  let {from,to,msg}=req.body;
  let newchat= new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
  });
  newchat
  .save()
  .then((res)=>{
    console.log("chat was saved");
  })
  .catch((err)=>{
    console.log(err);
  });
  res.redirect("/chats");
});

//edit
app.get("/chats/:id/edit",async (req,res)=>{
  let {id}=req.params;
  let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//update
app.put("/chats/:id",async (req,res)=>{
  let {id}=req.params;
  let {msg: newMsg}=req.body;
  let updatedChat= await Chat.findByIdAndUpdate(id,
    {msg:newMsg},
    {runValidators:true, new:true}
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

//destroy

app.delete("/chats/:id",async (req,res)=>{
  let {id}=req.params;
  let deletedChat=await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
})