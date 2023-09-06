export default class CategoryProduct extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback() {
        this.innerHTML = `<div id="category-product"></div>`;
        let paths = window.location.pathname.split('/');
        this.path = paths[paths.length-1];
        this.fetchProducts(this.path);
    }
    renderProducts(products){
        products.forEach(product=>{
            console.log(product)
        })
       
    }

    fetchProducts(path){
        fetch('https://fakestoreapi.com/products/category/'+path)
            .then(res=>res.json())
            .then(json=>{
                this.renderProducts(json)
            })
    }


}



if ('customElements' in window) {
    customElements.define('my-category-product', CategoryProduct);
}