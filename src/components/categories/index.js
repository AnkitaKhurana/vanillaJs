import Router from "../../routes";

export default class Categories extends HTMLElement {
    constructor() {
        super();
        this.categories = [];
    }
    connectedCallback() {
        this.innerHTML = `<div id="categories"></div>`;
        this.fetchCategories();
    }
    fetchCategories() {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.categories = json;
                this.renderCategories();
            })
    }
    renderCategories() {
        const categories = document.getElementById('categories');
        categories.innerHTML = '';
        this.categories.forEach(category => {
            const categoryItem = document.createElement('a');
            categoryItem.setAttribute('cat_id', category);
            categoryItem.setAttribute('class', 'category');
            categoryItem.style = 'display:block;'
            categoryItem.addEventListener('click', (e) => {
                // console.log(categoryItem.getAttribute('cat_id'));
                const route = new Router();
                // console.log(document.querySelector('my-router'))
                
                route.go('/category/'+categoryItem.getAttribute('cat_id'), "ok")
            })
            categoryItem.innerHTML = category;
            categories.append(categoryItem);
        })
    }
}


if ('customElements' in window) {
    customElements.define('my-categories', Categories);
}