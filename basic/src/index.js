import { renderChats, setChats, openChat } from './scripts/chat.js';
let globalData = {
    chats : []
};
(async function () {
    document.addEventListener("openChat", (data) => openChat(data.id));

    let inputFilter = document.getElementById('filter');
    inputFilter.addEventListener('input', (e)=>{
        let newChats = globalData.chats.filter(chat=> (chat.title.toLowerCase().includes(e.target.value.toLowerCase()) || chat.orderId.toLowerCase().includes(e.target.value.toLowerCase())));
        let ch = newChats;
        setChats(ch);
        renderChats();
    })

    fetch('https://my-json-server.typicode.com/codebuds-fk/chat/chats')
        .then(res => res.json()).then((ch) => {
            globalData.chats = ch;
            setChats(ch);
            renderChats();
        }
        );
})();