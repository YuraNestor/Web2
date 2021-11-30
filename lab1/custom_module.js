//Класс Порт
class Port {
    constructor(name) {
        this.name = name;
        this.pierList = [];
    }
}

//Клас Корабель
class Ship {
    constructor(name) {
        this.name = name;
        this.arriveTime = "";
        this.leaveTime = "";
    }
}

//Клас Пристань
class Pier {
    constructor(name) {
        this.name = name;
        this.shipList = [];
    }
}

//Ініціалізація колекцій портів і кораблів
let global_port_List = [];
let global_ship_List = [];

//Функія додавання порту в колекцію
exports.add_Port = (name) => {
    let port = new Port(name);
    global_port_List.push(port);

    return port;
}

//Функція видалення порту з колекції
exports.remove_Port = (port) => {
    for (let i = 0; i < global_port_List.length; i++) {
        let portRem = global_port_List[i];
        if (portRem.name === port.name) {
            global_port_List.splice(i, 1);
            return 1;
        }
    }
    return -1;
}
//Функція редагування порту в колекції
exports.edit_Port = (name, new_Name) => {
    for (let i = 0; i < global_port_List.length; i++) {
        let port = global_port_List[i];
        if (port.name === name) {
            global_port_List[i].name = new_Name;
            return 1;
        }
    }
    return -1;
}

//Функція виводу всіх портів в колекції
exports.get_Port_List = () => {
    console.log("Port list : ");
    for (let i = 0; i < global_port_List.length; i++) {
        let hosp = global_port_List[i];
        console.log(`\tPort name : ${hosp.name}`);
    }
    console.log();
    return global_port_List;
}

//Функція пошуку одного порту в колекції
exports.find_Port = (name) => {
    for (let i = 0; i < global_port_List.length; i++) {
        let port = global_port_List[i];
        if (port.name === name) {
            return port;
        }
    }
    return -1;
}

//Функція додавання пристані до порту
exports.add_PierToPort = (port_name, pier_name) => {
    for (let i = 0; i < global_port_List.length; i++) {
        let port = global_port_List[i];
        if (port.name === port_name) {
            port.pierList.push(new Pier(pier_name));
            return 1;
        }
    }
    return -1;
}

//Функція видалення пристані із порту
exports.remove_PierFromPort = (port, pier_name) => {
    for (let i = 0; i < global_port_List.length; i++) {
        let portG = global_port_List[i];
        if (portG.name === port.name) {
            for (let j = 0; j < port.pierList.length; j++) {
                let pier = port.pierList[j];
                if (pier.name === pier_name) {
                    portG.pierList.splice(j, 1);
                    return 1;
                }
            }
        }
    }
    return -1;
}

//Функція виводу пристаней в порті
exports.show_PiersInPort = (port) => {
    console.log("Pier list : ");
    for (let i = 0; i < port.pierList.length; i++) {
        let hosp = port.pierList[i];
        console.log(`\tPier name : ${hosp.name}`);
    }
    console.log();
    return port.pierList;
}

//Функція додавання корабля на пристань
exports.add_ShipToPier = (ship, pier) => {
    if (pier.shipList.length < 2) {
        pier.shipList.push(ship);
        ship.arriveTime = get_Date();
        return 1;
    } else {
        console.log("Pier is full");
        return -1;
    }
}

//Фугкція видалення корабля із пристані
exports.remove_ShipFromPier = (ship, pier) => {
    for (let i = 0; i < pier.shipList.length; i++) {
        let shipAdd = pier.shipList[i];
        if (shipAdd.name === ship.name) {
            pier.shipList.splice(i, 1);
            for (let j = 0; j < global_ship_List.length; j++) {
                let removeShip = global_ship_List[j];
                if (removeShip.name === ship.name) {
                    removeShip.leaveTime = get_Date();
                }
            }
            return 1;
        }
    }
}

//Функція повернення дати і часу
get_Date = () => {
    let today = new Date();
    return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + "-" +today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

//Функція додавання корабля в колекцію
exports.add_Ship = (name) => {
    let ship = new Ship(name);
    global_ship_List.push(ship);

    return ship;
}

//Функція видалення корабля із колекції
exports.remove_Ship = (name) => {
    for (let i = 0; i < global_ship_List.length; i++) {
        let ship = global_ship_List[i];
        if (ship.name === name) {
            global_ship_List.splice(i, 1);
            return 1;
        }
    }
    return -1;
}

//Функція редагування корабля в колекції
exports.edit_Ship = (name, new_Name) => {
    for (let i = 0; i < global_ship_List.length; i++) {
        let ship = global_ship_List[i];
        if (ship.name === name) {
            global_ship_List[i].name = new_Name;
            return 1;
        }
    }
    return -1;
}

//Функція виводу всіх кораблів колекції
exports.get_Ship_List = () => {
    console.log("\nShip list : ");
    for (let i = 0; i < global_ship_List.length; i++) {
        let ship = global_ship_List[i];
        console.log(`\tShip name : ${ship.name}`);
    }
    console.log();
    return global_ship_List;
}

//Функція пошуку одного корабля в колекції
exports.find_Ship = (name) => {
    for (let i = 0; i < global_ship_List.length; i++) {
        let ship = global_ship_List[i];
        if (ship.name === name) {
            return ship;
        }
    }
    return -1;
}

//Функція пошуку усіх кораблів на пристані
exports.find_ShipsOnPier = (port_name, pier_name) => {
    for (let i = 0; i < global_port_List.length; i++) {
        let port = global_port_List[i];
        if (port.name === port_name) {
            for (let j = 0; j < port.pierList.length; j++) {
                let pier = port.pierList[j];
                if (pier.name === pier_name) {
                    console.log(`\nShips on pier : ${pier.name}`);
                    for (let k = 0; k < pier.shipList.length; k++) {
                        let ship = pier.shipList[k];
                        console.log(`\tShip name : ${ship.name}`);
                    }
                    console.log();
                    return pier.shipList;
                }
            }
        }
    }
    return -1;
}

//Функція виводу кораблів на пристані
exports.show_ShipsOnPier = (pier) => {
    console.log(`\nShips on ${pier.name} : `);
    for (let i = 0; i < pier.shipList.length; i++) {
        let ship = pier.shipList[i];
        console.log(`\tShip name : ${ship.name}`);
    }
    console.log();
    return pier.shipList;
}