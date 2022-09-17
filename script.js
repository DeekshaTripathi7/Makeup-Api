
document.body.innerHTML= `
    <div class = "heading-container">
        <img class="logo" src="logo.svg" style="height:100px">
        <h2>Natural Glam</h2>
        <input type="text" id="searchBar" placeholder="Type of Product or Brand Name"></input>
        <button class="btn" id="searchBtn">Search</button>
    </div>

    <div id="mainContainer" class="main-container">
    </div>
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

makeupData.then(products => {
   mainContainer.innerHTML="";
   
    //display first 50 records
    for (let index = 0; index < 50; index++) {
         displayMakeupData(products[index])
            
     };
})


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
            console.log("abc: " +searchedProducts.length)
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

