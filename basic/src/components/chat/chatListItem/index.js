class ChatListItem extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        let html = `<div class="chat__list__item" id=${this.dataset.id}>
        <div class="chat__list__item_left">
            <div class="chat__list__item__img">
                <img  src="${this.dataset.image}"></img>
            </div>
            <div>
                <div class="chat__list__item__title">${this.dataset.title}</div> 
                <div class="chat__list__item__orderId"> Order ${this.dataset.orderid}</div> 
                <div class="chat__list__item__lastMessage">${this.dataset.lastmessage}</div> 
            </div>
        </div>
        <div class="chat__list__item_right">
            <div class="chat__list__item__time">${this.dataset.time}</div> 
        </div>
        </div>`;
        const template = document.createElement("template");
        template.innerHTML = html;


        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './src/components/chat/chat.css');


        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));
        shadowRoot.appendChild(link);
        this.addEventListener('click', this.handleClick);
    }

    handleClick(event) {
        event.preventDefault();
        this.classList.add('active')
        const openChatEvent = document.createEvent("Event");
        openChatEvent.id = event.target.dataset.id;
        openChatEvent.initEvent("openChat", true, true);
        this.dispatchEvent(openChatEvent);
    }

}

if ('customElements' in window) {
    customElements.define('chat-list-item', ChatListItem);
}
