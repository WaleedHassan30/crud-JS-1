// Variables
let data = {
title:document.getElementById("title"),
price: document.querySelectorAll(".priceE"),
total:document.getElementById("total"),
count:document.getElementById("count"),
category:document.getElementById("category"),
create:document.getElementById("submit"),
search:document.getElementById("search"),
searchByTitle:document.getElementById("searchByTitle"),
searchByCategory:document.getElementById("searchByCategory"),
table:document.getElementById("table"),
tbody:document.getElementById("tbody"),
}
let allData = [];
let mode = "create"
let temp;
let searchMode;
// Get Total Price Function
function getTotal() {
    data.price.forEach((elem) =>{
        if(elem != ""){
            // console.log(Number(data.price[1].value) + Number(data.price[0].value));
            if(Number(data.price[3].value) >=0){
                let result = ( Number(data.price[0].value) + Number(data.price[1].value) + Number(data.price[2].value)) - Math.abs(Number(data.price[3].value))
                data.total.textContent = Math.abs(result)
                data.total.style.backgroundColor = "#040"
            }

        }else{
            data.total.textContent = ""
            data.total.style.backgroundColor = "#a00d02"
        }
    })


  }
function addEvents(){
    // for(let i = 0;i < data.price.length;i++){
    //     data.price[i].addEventListener("keyup",getTotal)  
    // }
    data.price.forEach((elem)=>elem.addEventListener("keyup",getTotal));
}
// Create New Product and // Save Products in LocalStorage
function createProduct(){
        if(localStorage.products != null){
            allData = JSON.parse(localStorage.products)
        }
        else{
            allData = []
        }
        
    
        data.create.addEventListener("click",function(){
            let dataC = {
                title:data.title.value.toLowerCase(),
                price: data.price[0].value,
                taxes: data.price[1].value,
                ads: data.price[2].value,
                discount: data.price[3].value,
                total:data.total.textContent,
                count:data.count.value,
                category:data.category.value.toLowerCase(),
            }
            
            if(mode === "create"){
                if (dataC.count > 1){
                    for(let i = 0 ; i < dataC.count ; i++){
                        allData.push(dataC)
                    }
                }else{
                    allData.push(dataC)
                }

            }else{
                mode = "update"
                allData[temp] = dataC
                mode = "create"
                data.create.textContent = "Create"
                data.count.style.display = "block"

            }

            localStorage.setItem("products",JSON.stringify(allData))
    
    
            // allData.push(dataC)
            localStorage.setItem("products",JSON.stringify(allData))
            clearData(data)
            displayTable()
            deleteAllBtn(allData.length)
        })

    
}
function deleteAllBtn(length){
    let deleteAlldiv = document.getElementById("deleteAll")
    if(allData.length > 0){
        deleteAlldiv.innerHTML = `<button id="deleteAll" onclick="deleteAll()" class="btn">Delete All <small id="total">${length}</small></button>`
    }else{
        deleteAlldiv.innerHTML = ``
    }
}
// Clear Data from All Inputs Function
function clearData(data){
    data.price.forEach((elem)=>elem.value="")
    data.title.value ="";
    data.category.value="";
    data.count.value="";
    data.total.textContent = ""
    data.total.style.backgroundColor = "#a00d02"

}
// Display Products in Table
function displayTd(td,allDataTemp){
    for(let index = 0;index < allDataTemp.length;index++){
        td += ` <tr>
        <td>${index}</td>
        <td>${allDataTemp[index].title}</td>
        <td>${allDataTemp[index].price}</td>
        <td>${allDataTemp[index].taxes}</td>
        <td>${allDataTemp[index].ads}</td>
        <td>${allDataTemp[index].discount}</td>
        <td>${allDataTemp[index].total}</td>
        <td>${allDataTemp[index].category}</td>
        <td>   
             <button onclick="updateData(${index})" id="update" class="btn">Update</button>
        </td>
        <td>   
            <button id="delete" onclick="deleteProduct(${index})" class="btn">Delete</button>
       </td>
    </tr>`
    }
    return td;
}
function displayTable(){
    td = ``
    td += displayTd(td,allData)
    data.tbody.innerHTML = td
}
// Product Count
// Delete Product
function deleteProduct(index){
    allData.splice(index,1);
    localStorage.products = JSON.stringify(allData)
    displayTable();
   
}
function deleteAll(){
    localStorage.clear()
    allData.splice(0);
    displayTable();
    deleteAllBtn(allData.length)

}
// Update Product
function updateData(index){
    temp = index;
    
    data.title.value = allData[index].title;
    data.price[0].value = allData[index].price;
    data.price[1].value = allData[index].taxes;
    data.price[2].value = allData[index].ads;
    data.price[3].value = allData[index].discount; 
    data.category.value = allData[index].category;
    data.count.style.display = "none"
    data.create.textContent = "Update"
    getTotal()
    mode = "update"
    scroll({
        top: 0,
        behavior:"smooth"

    })
}
// Search Product
function searching(id){
    searchMode = "title";
    
    if(id === "searchByTitle"){
        searchMode = "title";
        data.search.placeholder = "Search by Title"
        data.search.style.display ="block"
        

    }else if(id === "searchByCategory"){
        searchMode = "category";
        data.search.placeholder = "Search by  Category"
        data.search.style.display ="block"
    }else{
        data.search.style.display ="none"
    }
    data.search.focus();
    data.search.value =""
    displayTable()
    deleteAllBtn(allData.length)

}
function displaySearching(event){

    if(searchMode === "title"){
        td = ''
        let result = []
        for(let index = 0;index < allData.length ; index++){
            if(allData[index].title.includes(event.target.value.toLowerCase())){
                result.push(allData[index]) 
            }
        }
        td += displayTd(td,result)
        data.tbody.innerHTML = td
        deleteAllBtn(result.length)

    }else{
        td = ''
        let result = []
        for(let index = 0;index < allData.length ; index++){
            if(allData[index].category.includes(event.target.value.toLowerCase())){
                result.push(allData[index]) 
            }
        }
        td += displayTd(td,result)
        data.tbody.innerHTML = td
        deleteAllBtn(result.length)


    }
    

}
data.search.addEventListener("keyup",displaySearching)
//Events
addEvents()
createProduct()
deleteAllBtn(allData.length)
displayTable()





