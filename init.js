const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main().then(()=>{
    console.log("Is working good");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatBox');
}

let allChats=[
    {
    from:"Rohith",
    to:"Vyshu",
    msg:"send me your notes",
    created_at:new Date(),
    },
    {
    from:"Mohith",
    to:"Lohith",
    msg:"send me your notes",
    created_at:new Date(),
    },
    {
    from:"Rohith",
    to:"Vyshu",
    msg:"send me your notes",
    created_at:new Date(),
    },
    {
    from:"Sunny",
    to:"Karthikeya",
    msg:"send me your notes",
    created_at:new Date(),
    },


]

Chat.insertMany(allChats);

