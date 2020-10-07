'use strict';

var allDevicesArray = [];
var headerArray = ['Device Name','Quantity', 'Unit Price', 'Category'];
var table = document.getElementById('table');
var form = document.getElementById('form');
var total = document.getElementById('total');
var totalPrice=0;

function Device(deviceName , category , quantity){

    this.deviceName=deviceName;
    this.category = category;
    this.quantity = quantity;
    this.price = 0
    allDevicesArray.push(this);
}

Device.prototype.randomPrice = function(){
    var random = Math.random();
    random = 350 + random*(750-350+1);
    random = Math.floor(random);
    this.price = random;
    
}
function calculationOfTotalPrice(){
    totalPrice = 0;
    for(var i = 0 ; i < allDevicesArray.length ; i++){
totalPrice += allDevicesArray[i].price;
    }
    return totalPrice
}

function creatHeaderForTable(){
    var headerRow = document.createElement('tr');
    
    table.appendChild(headerRow);
    
    for(var i = 0 ; i < headerArray.length ; i++){
        var headerTd = document.createElement('th')
        headerRow.appendChild(headerTd);
        headerTd.textContent = headerArray[i];
    }
    
}
creatHeaderForTable();
if(localStorage.getItem('allDevices')){
    totalPrice=0;
    allDevicesArray = JSON.parse(localStorage.getItem('allDevices'));
    
    
    render();
}

function render(){

    for(var i = 0 ; i<allDevicesArray.length ; i++){
        var deviceRow = document.createElement('tr');
        table.appendChild(deviceRow);

        var deviceNameTd = document.createElement('td');
        deviceRow.appendChild(deviceNameTd);
        deviceNameTd.textContent = allDevicesArray[i].deviceName;

        var quantityTd = document.createElement('td');
        deviceRow.appendChild(quantityTd);
        quantityTd.textContent = allDevicesArray[i].quantity;

        var priceTd = document.createElement('td');
        deviceRow.appendChild(priceTd);
        priceTd.textContent = allDevicesArray[i].price;

        var categoryTd = document.createElement('td');
        deviceRow.appendChild(categoryTd);
        categoryTd.textContent = allDevicesArray[i].category
    }
}


form.addEventListener('submit', addDevice)

function addDevice(event){
    event.preventDefault();

    var deviveNameByUser = event.target.itemName.value;

    var categoryByUser = event.target.category.value;
    var quantityByUser = event.target.quantity.value;
    
table.innerHTML = '';
creatHeaderForTable()
    var addnewDevice = new Device(deviveNameByUser,categoryByUser,quantityByUser);
    addnewDevice.randomPrice();

    render();
    calculationOfTotalPrice();
    total.textContent = 'Total:' + totalPrice;
    localStorage.setItem('allDevices',JSON.stringify(allDevicesArray));
}
calculationOfTotalPrice();
total.textContent = 'Total:' + totalPrice;
