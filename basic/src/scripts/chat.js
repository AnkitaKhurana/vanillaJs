import { convertTime } from "./utils.js";

let chats = [];
let filteredchats = [];


const setChats = (newChats) => {
    chats = newChats;
}
const findLastMessage = (chat) => {
    if (!chat.latestMessageTimestamp) {
        return "";
    }
    let msg = chat.messageList.find(message => message.timestamp == chat.latestMessageTimestamp);
    if (msg) {
        return msg.message;
    }
    return "";
}

const createChatElement = (chat) => {
    let l = convertTime(chat.latestMessageTimestamp);
    let t = findLastMessage(chat);
    return `<chat-list-item 
    data-id="${chat.id}"
    data-image="${chat.imageURL}"
    data-orderId="${chat.orderId}"
    data-time="${l}"
    data-title="${chat.title}" 
    data-lastMessage="${t}"
    ><chat-list-item/>`;
}

const renderChats = () => {
    let chatList = document.getElementById('chat__list__content');
    while (chatList.firstChild) {
        chatList.firstChild.remove();
    }

    chats.forEach(chat => {
        chatList.insertAdjacentHTML("beforeend", createChatElement(chat));
    })
}

const createMessageElement = (chat, box) => {
    chat.messageList.sort((chat1, chat2)=>{
        return chat1.timestamp - chat2.timestamp;
    })
    chat.messageList.forEach(message => {
        let element = document.createElement('div');
        element.innerText = message.message;

        if (message.sender == "BOT") {
            element.classList.add('bot');
            if(message.options){
                message.options.forEach(opt=>{
                    let optel = document.createElement('div');
                    optel.classList.add('opt');
                    optel.innerText = opt.optionText;
                    if(opt.optionText == 'Request a call'){
                       // Add logic for click on selected text 
                    }
                    element.append(optel);
                })
               
            }
        } else {
            element.classList.add('user');
        }
        box.append(element);
    });
    if (!chat.messageList || chat.messageList.length == 0) {
        let element = document.createElement('div');
        element.style.textAlign = 'center';
        element.innerText = "Send a message to start chatting."
        box.append(element);
    }
}

const addinput = (box) => {
    let element = document.createElement('input');
    element.classList.add('input__section');
    element.setAttribute('placeholder', "Type a message...")
    box.append(element);
}

const openChat = (chatid) => {
    let chatBox = document.getElementById('chat__open');
    while (chatBox.firstChild) {
        chatBox.firstChild.remove();
    }
    let chat = chats.find(chat => chat.id == chatid);
    if (chat) {
        chatBox.classList.add('open');
        let copy = {
            title: chat.title,
            imageURL: chat.imageURL,
            orderId: chat.orderId,
        }
        chatBox.insertAdjacentHTML("beforeend", createChatElement(copy));
        createMessageElement(chat, chatBox);
        addinput(chatBox);
    }
}



export {
    renderChats,
    setChats,
    openChat
}