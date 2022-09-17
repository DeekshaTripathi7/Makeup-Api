// Tried search + pagination. It is also working

document.body.innerHTML= `
    <div class = "heading-container">
        <img class="logo" src="logo.svg" style="height:100px">
        <h2>Natural Glam</h2>
        <input type="text" id="searchBar" placeholder="Product or Brand Name"></input>
        <button class="btn" id="searchBtn">Search</button>
    </div>

    <div id="mainContainer" class="main-container">
    </div>

    <a href="javascript:prevPage()" id="btn_prev">Prev</a>
    <a href="javascript:nextPage()" id="btn_next">Next</a>
    Page: <span id="page"></span>
`

//Get the data from api
async function getMakeupData() {
try { 
    //fetch data from makeup api
    let url = "https://makeup-api.herokuapp.com/api/v1/products.json";
    const data = await fetch(url);
    const jsonData = await data.json();
    return jsonData;
} catch(error) { 
    mainContainer.innerHTML="Oops !! Something went wrong. Sorry for the inconvenience";
}    
}

let makeupData = getMakeupData();


//Displaying brand, naame, price, image, description of products and product link
const displayMakeupData = (cosmetics) => {

mainContainer.innerHTML+= `
    <div class="container">
        <h4 class="brand">Brand: <span>${cosmetics.brand}</span></h4>
        <p class="name pr">Name: <span class="pr2">${cosmetics.name}</span></p>
        <img class="productimg" src="${cosmetics.image_link}" alt="Product Image"/>
        <p class="price pr">Price: <span class="pr2">${cosmetics.price_sign} ${cosmetics.price}</span> </p>
        <p class="link pr">Link: <a href="${cosmetics.product_link}"><span class="pr2">${cosmetics.product_link}</span></a><p>
        <p class="description pr">Description: <span class="pr2">${cosmetics.description}</span></p></a>
        
    </div>
`
}

const btn = document.getElementById("searchBtn");


//Onclick event to search the data on the basis of product type or brand 
btn.addEventListener("click", () => {

mainContainer.innerHTML="";  
let searchedvalue = document.getElementById("searchBar").value;
if (searchedvalue.length === 0) {
    mainContainer.innerHTML="Please enter text in search box";

}else {
    let i = 0;        
    makeupData.then(searchedProducts => {
        for (let index = 0; index < searchedProducts.length; index++) {
            const type = searchedProducts[index].product_type;
            const brand = searchedProducts[index].brand;
            if((searchedvalue == type) || (searchedvalue == brand)) {
                i++
                displayMakeupData(searchedProducts[index])
            }            
            
        }
        if( i === 0) {
            mainContainer.innerHTML="Product Not Found";          

        }
    })
}

})


var current_page = 1;
var records_per_page = 10;
var data_length= 931;

function prevPage(){
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage(){
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page){
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    mainContainer.innerHTML = "";

    makeupData.then(products => {
        for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {   
            displayMakeupData(products[i])
        }
        } )
        page_span.innerHTML = page;

        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }

        if (page == numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
}

function numPages(){
    return Math.ceil(data_length / records_per_page);
}

window.onload = function() {
     changePage(1);
 };