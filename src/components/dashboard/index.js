const template = document.createElement('template');
template.innerHTML = `<input type="checkbox" /><slot></slot>`

export default class Dashboard extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.append(template.content.cloneNode(true)); 
        this.checkbox = shadowRoot.querySelector('input');
    }

    static get observedAttributes(){
        return ['checked']
    }

    connectedCallback(){
        console.log('Dashboard Mounted');
    }

    disconnectedCallback(){
        console.log('Dashboard Unmounted');
    }


    attributeChangedCallback(name,oldValue, newValue){
        console.log(name,oldValue,newValue)
        if(name === 'checked'){
            this.updateChecked(newValue);
        }
    }

    updateChecked(value){
        this.checkbox.checked = value!=null && value!=='false';
    }
}

if ('customElements' in window) {
    customElements.define('my-dashboard', Dashboard);
}