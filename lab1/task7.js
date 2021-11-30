const mod = require('./custom_module');

//Додавання портів
let port1 = mod.add_Port("Port_1");
let port2 = mod.add_Port("Port_2");
let port3 = mod.add_Port("Port_3");

//Список портів
mod.get_Port_List();

//Видалення порту
console.log("Видалення порту : Port_3");
mod.remove_Port(port3);

//Список портів
mod.get_Port_List();

//Зміна порту
console.log("");
mod.edit_Port("Port_2", "New Port_2 name");

//Список портів
mod.get_Port_List();

//Пошук портів
let port_1 = mod.find_Port("Port_1");
console.log(`Пошук порту Port_1 : ${port_1 !== -1 ? "знайдено" : "не знайдено"}`);
let port_2 = mod.find_Port("Port_3");
console.log(`Пошук порту Port_3 : ${port_2 !== -1 ? "знайдено" : "не знайдено"}`);


//Додавання кораблів
let ship1 = mod.add_Ship("Ship_1");
let ship2 = mod.add_Ship("Ship_2");
let ship3 = mod.add_Ship("Ship_3");
let ship4 = mod.add_Ship("Ship_4");

//Список кораблів
mod.get_Ship_List();

//Видалення корабля із колекції
console.log("Видалення корабля : Port_3");
mod.remove_Ship("Ship_3");

//Список кораблів
mod.get_Ship_List();

//Додавання пристаней до портів
mod.add_PierToPort(port1.name, "Pier_1");
mod.add_PierToPort(port1.name, "Pier_2");
mod.add_PierToPort(port1.name, "Pier_3");

//Список пристаней
mod.show_PiersInPort(port_1);

//Видалення пристані
console.log("Видалення пристані : Port_3");
mod.remove_PierFromPort(port_1, "Pier_2");

//Список пристаней
mod.show_PiersInPort(port_1);

//Додавання кораблів на пристань
mod.add_ShipToPier(ship1, port_1.pierList[0]);
mod.add_ShipToPier(ship2, port_1.pierList[0]);

//Список кораблів на пристані
mod.show_ShipsOnPier(port_1.pierList[0]);

//Видалення корабля з пристані
console.log("Видалення корабля : Ship_1");
mod.remove_ShipFromPier(ship1, port_1.pierList[0]);

//Список кораблів на пристані
mod.show_ShipsOnPier(port_1.pierList[0]);
mod.show_ShipsOnPier(port_1.pierList[0]);