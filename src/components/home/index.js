const template = `<p>
			<button>Hi there!</button>
		</p>
		`

export default class Home extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback(){
        this.innerHTML = template;
    }
}


if ('customElements' in window) {
    customElements.define('my-home', Home);
}