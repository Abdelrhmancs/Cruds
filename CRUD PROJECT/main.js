let title =document.getElementById("title");
let price =document.getElementById("price");
let taxes =document.getElementById("taxes");
let adv =document.getElementById("adv");
let discount =document.getElementById("discount");
let count =document.getElementById("count");
let category =document.getElementById("category");
let total =document.getElementById("total");
let submit =document.getElementById("submit");

let mood = 'create';
let temp;
let searchMood='title';

function gettotal(){
if(price.value !== ''){
    let result = (+price.value + +taxes.value + +adv.value ) - +discount.value;
    total.innerHTML = result;
 
}
}
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);    
}
else
{
    dataPro = [] ;
}


submit.onclick= function(){
let newPro ={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    adv:adv.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase()

}

if(title.value !='' && price.value !='' && count.value<=2000 &&category.value !=''){
if(mood === 'create'){
    total.style.backgroundColor='red';
    if(count.value >1){
        for(let i =0; i<count.value; i++){
            dataPro.push(newPro);
          
        }
    }
    else
    {
        dataPro.push(newPro);
    }
}

else
{
     dataPro[temp]=newPro;
          mood = 'create';
     submit.innerHTML=' Create';

     count.style.display='block';

}
cleardata()
}



localStorage.setItem('product', JSON.stringify(dataPro));

showdata();

}

// cleardata function
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    adv.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}



// showdata function

function showdata(){
    let table ='';
    for( let i = 0 ; i< dataPro.length; i++){
        table+=
        `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].adv}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].count}</td>
        <td>${dataPro[i].category}</td>
   
        <th><button onclick="update(${i})">update</button></th>
        <th><button onclick ="deletedata(${i})">delete</button></th>
       
    </tr>`
    }
    document.getElementById("tbody").innerHTML = table;
    let btndelete = document.getElementById("deleteAll");
    if(dataPro.length > 0){
        btndelete.innerHTML =`
        <button onclick="deleteAll()"> Delete All (${dataPro.length})</button>
        `

        
    }
    else
    {
        btndelete.innerHTML ='';
    }
}


// delete function 
function deletedata(i){
   dataPro.splice(i,1);
  localStorage.product= JSON.stringify(dataPro);
  showdata();

}

// deleteAll function 
function deleteAll(){
localStorage.clear();
dataPro.splice(0);
showdata();

}

//update function
function update(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    adv.value=dataPro[i].adv;
    discount.value=dataPro[i].discount;
    total.innerHTML=dataPro[i].total;
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML='Update';
    temp=i;
    mood='update';
   scroll({
    top:0,
    behavior:'smooth'
   });
}

//search function
function getsearch(id){
    let search =document.getElementById("search");
  if(id ==='searchtitle'){
    searchMood='title';
   
  }
  else
  {
    searchMood='category';
  
  }
    search.placeholder= 'search by '+searchMood;
  search.focus();
  search.value ='';
  showdata();
}

function SearchData(value){
    let table='';
    for(let i=0; i< dataPro.length; i++){
if(searchMood === 'title'){

    
        if(dataPro[i].title.includes(value)){
            table+=
            `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].adv}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].category}</td>
       
            <th><button onclick="update(${i})">update</button></th>
            <th><button onclick ="deletedata(${i})">delete</button></th>
           
        </tr>`
        }
       
    }

else
{
    
        if(dataPro[i].category.includes(value.toLowerCase())){
            table+=
            `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].adv}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].category}</td>
       
            <th><button onclick="update(${i})">update</button></th>
            <th><button onclick ="deletedata(${i})">delete</button></th>
           
        </tr>`
        
    }
}
document.getElementById("tbody").innerHTML = table;
}
}
showdata();