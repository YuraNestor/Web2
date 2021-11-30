// Необхідні змінні
let search = "";
let divider = `<li><hr class="dropdown-divider"></li>`;

// Створення нового елемента
async function create_element() {

   let target = location.pathname.substring(1);
   target = target.substring(0, target.length - 1);

   if (target === "cured_ship") {
      modal_delete_cured_ships();
      return;
   }

   switch (target) {

      case "port": $("#port_title").text("Додавання нового порту");
                       $("#port_yes").text("Додати");
                       break;
      case "pier":   $("#pier_title").text("Додавання нової пристані");
                       $("#pier_yes").text("Додати");
                       prepare_ports_for_dropdown(target);
                       break;
      case "ship":  $("#ship_title").text("Додавання нового корабля");
                       $("#ship_yes").text("Додати");
                       prepare_ports_for_dropdown(target);
                       break;

   }

   $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(true)`);
   $(`#modal_${target}s`).modal('show');

}

// ...............................................................................................

// Редагування існуючого елемента
async function edit_element (element) {

   let item;
   let target = location.pathname.substring(1);
   target = target.substring(0, target.length - 1);

   let id = parseInt($(element).closest("tr").children().first().text());

   $(`#${target}_title`).text("Редагування даних");
   $(`#${target}_yes`).text("Оновити дані");

   switch (target) {

      case "port": item = get_port_by_id(id);
                       $("#port_name").val(item.name);
                       $("#port_country").val(item.country);
                       $("#port_address").val(item.address);
                       break;
      case "pier":   item = get_pier_by_id(id);
                       $("#pier_max_ships").val(item.max_ships);
                       
                       $("#pier_port").text(item.port);
                       prepare_ports_for_dropdown(target);
                       break;
      case "ship":  item = get_ship_by_id(id);
                       $("#ship_tonnage").val(item.tonnage);
                       $("#ship_name").val(item.name);
                       $("#ship_country").val(item.country);
                       $("#ship_pier").text(item.pier);
                       $("#ship_port").text(item.port);
                       prepare_ports_for_dropdown(target);
                       break;

   }

   $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(false, ${id})`);
   $(`#modal_${target}s`).modal('show');

}

// ...............................................................................................

// Пошук існуючого елемента
function find_element (element) {

   let search = $(element).val();
   let target = location.pathname.substring(1);
   let search_list = [];

   switch (target) {

      case "ports":      search_list = find_ports(search);      break;
      case "piers":        search_list = find_piers(search);        break;
      case "ships":       search_list = find_ships(search);       break;
      case "cured_ships": search_list = find_ships(search, true); break;

   }

   display_data(search_list);

}

// ...............................................................................................

// Видалення існуючого елемента
function delete_element (item) {

   let button;
   let message;
   let target = location.pathname.substring(1);
   let id = parseInt($(item).closest("tr").children().first().text());

   switch (target) {

      case "ports":
         message = "Ви дійсно хочете видалити інформацію про цей порт";
         button = "Видалити";
         break;

      case "piers":
         message = "Ви дійсно хочете звільнити цю пристань";
         button = "Видалити";
         break;

      case "ships":
         message = "Ви дійсно хочете виписати цього корабля";
         button = "Виписати";
         break;

      case "cured_ships":
         message = "Ви дійсно хочете видалити інформацію про цього виписаного корабля";
         button = "Видалити";
         break;

   }
   
   modal_confirm_create("Повідомлення",
                        `${message}?`,
                        `${button}`,
                        "Відміна",
                        "delete", id);

   $(`#modal_confirm`).modal('show');

}

// ...............................................................................................

// Відобразити дані у таблиці
function display_data (search_list) {

   let data;
   let additional_attr = "";
   let target = location.pathname.substring(1);

   switch (target) {

      case "ports":      data = get_ports_list();
                             break;
      case "piers":        data = get_piers_list();
                             break;
      case "ships":       data = get_ships_list();
                             additional_attr = "false, ";
                             break;
      case "cured_ships": data = get_ships_list(true);
                             additional_attr = "true, ";
                             break;
   }

   // Якщо поле пошуку не порожнє - відображаємо результат
   if (search_list) { data = search_list; }

   // Очищення таблиць
   clear_table(data.length === 0);

   // Відображення загальної кількості елементів
   $("#total_count").text(`Загальна кількість: ${data.length}`);

   // Для виписаних та невиписаниї пацієнтів таблиці однакові
   if (target === "cured_ships") { target = "ships"; }

   // Відобразити дані конкретної таблиці
   eval(`display_${target}_data(${additional_attr}data)`);

}

// ...............................................................................................

// Відобразити дані про усі лікарні
function display_ports_data (data) {

   for (let element of data) {
   
      let block = 
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td>${element.country}</td>
         <td>${element.address}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

      $("#table").append(block);

   }
}

// Відобразити дані про усіх лікарів
function display_piers_data (data) {

   for (let element of data) {
      
      let block =
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.max_ships}</td>
         
         <td>${element.port}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

      $("#table").append(block);

   }
}

// Відобразити дані про усіх пацієнтів
function display_ships_data (is_cured, data) {

   for (let element of data) {
      
      let block =
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td>${element.country}</td>
         <td class="fit"> <span class="m-2">${element.tonnage}</span> </td>
         <td>${element.pier}</td>
         <td>${element.port}</td>
         <td>${get_icon_code(is_cured)}</td>
      </tr>`;

      $("#table").append(block);

   }
}

// ...............................................................................................

// Вибрана позитивна відповідь у модальному вікні
function modal_confirm() {

   let page = location.pathname.substring(1);

   let target = $("#modal_confirm").attr("target");
   let src = $("#modal_confirm").attr("src");

   switch (target) {

      // Видалення даних
      case "delete":
         let id = parseInt(src);
         page = page.substr(0, page.length - 1);
         eval(`remove_${page}(${id})`);
         display_data();
         save_data();
         break;


      // Видалення усіх даних про виписаних пацієнтів
      case "delete_cured_ships":
         cured_ships_list = [];
         display_data();
         save_data();
         break;

   }
}

// Задання елементів модального вікна підтвердження
function modal_confirm_create (title, message, yes, no, target, src) {

   $(`#modal_confirm_title`).text(title);
   $(`#modal_confirm_message`).text(message);
   $(`#modal_confirm_yes`).text(yes);
   $(`#modal_confirm_no`).text(no);
   $("#modal_confirm").attr("target", target);
   $("#modal_confirm").attr("src", src);

}

// ...............................................................................................

// Додавання нової лікарні або редагування існуючої
function modal_update_ports (added_new, id) {

    let name = $("#port_name").val();
    let country = $("#port_country").val();
   let address = $("#port_address").val();

    if (added_new) { add_port(name, country, address);      }
    else { edit_port(id, name, country, address); }

   display_data();
   clear_input();
   save_data();

}

// Додавання нового лікаря або редагування існуючого
function modal_update_piers (added_new, id) {

   
    let max_ships = $("#pier_max_ships").val();
   let port = $("#pier_port").text();

   port = port === "Виберіть порт" ? "Не встановлено" : port;

    if (added_new) { add_pier(max_ships, port);      }
    else { edit_pier(id, max_ships, port); }

   display_data();
   clear_input();
   save_data();

}

// Додавання нового пацієнта або редагування існуючого
function modal_update_ships (added_new, id) {

    let name = $("#ship_name").val();
    let country = $("#ship_country").val();
   let tonnage      = $("#ship_tonnage").val();
   let pier   = $("#ship_pier").text();
   let port = $("#ship_port").text();

    pier = pier === "Виберіть пристань" ? "Не встановлено"  : pier;
   port = port === "Виберіть порт" ? "Не встановлено" : port;
    
    if (added_new) { add_ship(name, country, tonnage, pier, port);     }
   else { edit_ship(id, name, country, tonnage, pier, port); }

   display_data();
   clear_input();
   save_data();

}

// ...............................................................................................

// Підтвердження видалення виписаних пацієнтів
function modal_delete_cured_ships() {

   modal_confirm_create("Видалення даних",
                        "Ви дійсно хочете видалити усі наявні дані про виписаних пацієнтів?",
                        "Очистити",
                        "Відміна",
                        "delete_cured_ships");

   $(`#modal_confirm`).modal('show');

}

// ...............................................................................................

// Вибір лікарні у випадаючому списку
function set_port (element) {

   let port = $(element).text();
   let target = location.pathname.substring(1);

   port = port === ". . ." ? "Виберіть порт" : port;

   if (target === "piers") { $("#pier_port").text(port);  }
   else                      { $("#ship_port").text(port);
                               prepare_piers_for_dropdown();        }

}

// Вибір лікаря у випадаючому списку
function set_pier (element) {

   let pier = $(element).text();

   pier = pier === ". . ." ? "Виберіть пристань" : pier;

   $("#ship_pier").text(pier);

}

// ...............................................................................................

// Підготовуємо список доступних лікарень у випадаючому меню
function prepare_ports_for_dropdown (target) {

   let list = $(`#${target}_ports_list`);

   // Отримуємо інформацію про усі лікарні
   get_data("ports").then((result) => {

      if (result.length != 0) {
         
         list.find("li:not(:first)").remove();
         list.append(divider);

         for (let item of result) {
            list.append(`<li><span class="dropdown-item" ` +
                        `onclick="set_port(this)">${item.name}</span></li>`);
         }
      }

   });
}

// Підготовуємо список доступних лікарів у випадаючому меню
function prepare_piers_for_dropdown() {

   $("#ship_pier").text("Виберіть пристань");

   let list = $("#ship_piers_list");
   let port = $("#ship_port").text();
   let divider_is_added = false;
   
   // Отримуємо інформацію про усіх лікарів
   get_data("piers").then((result) => {

      if (result.length != 0) {
         
         list.find("li:not(:first)").remove();

         for (let item of result) {

            if (item.port === port) {

               if (!divider_is_added) { list.append(divider);
                                        divider_is_added = true; }

                
                    list.append(`<li><span class="dropdown-item" ` +
                        `onclick="set_pier(this)">${item.id}</span></li>`);
                
               
            }
         }
      }

   });
}

// ...............................................................................................

// Видалення усіх даних з таблиці 
// Додавання інформаційного повідомлення, якщо таблиця пуста
function clear_table (table_is_empty) {

   let target = location.pathname.substring(1);
   let span = (target === "ports") ? 4 :
              (target === "piers") ? 5 : 6;

   $("#table tbody").empty();

   let block =
  `<tr class="text-center text-secondary" id="table_empty">
      <td colspan="${span}"> <span class="mx-5 fs-4">Немає даних для відображення</span> </td>
   </tr>`;

   if (table_is_empty) { $("#table tbody").append(block); }
   else                { $("#table_empty").remove();      }

}

// Очищення полів вводу
function clear_input() {

   let target = location.pathname.substring(1);

   switch (target) {
      
       case "ports": $("#port_name").val("");
           $("#port_country").val("");
                        $("#port_address").val("");
                        break;
      case "piers":   
           $("#pier_max_ships").val("");
                        $("#pier_port").text("Виберіть порт");
                        $("#pier_ports_list").find("li:not(:first)").remove();
                        break;
       case "ships": $("#ship_name").val("");
           $("#ship_country").val("");
                        $("#ship_tonnage").val("");
                        $("#ship_pier").text("Виберіть пристань");
                        $("#ship_port").text("Виберіть порт");
                        $(`#ship_piers_list`).find("li:not(:first)").remove();
                        $(`#ship_ports_list`).find("li:not(:first)").remove();
                        break;
   }
}

// ...............................................................................................

// Метод повертає html код елементів керування таблицею
function get_icon_code (only_delete) {

   // Іконка редагування елемента
   const icon_edit = 
  `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-pencil-square btn-control mx-1" viewBox="0 0 16 16" onclick="edit_element(this)">
     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
     <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
   </svg>`;

   // Іконка видалення елемента
   const icon_delete = 
  `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-trash btn-control mx-1" viewBox="0 0 16 16" onclick="delete_element(this)">
     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
     <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
   </svg>`;

   // Блок з іконками
   const icons =
  `<span class="d-flex mx-2">
      ${!only_delete ? icon_edit : ""}${icon_delete}
   </span>`;

   return icons;

}

// ...............................................................................................

// Обмеження вводу для поля "вік"
function set_age (element) {

   let value = $(element).val();
   value = value.substring(0, 3);
   value = (value > 120) ? 120 : value;
   $(element).val(value);

}

// Метод дозволяє реалізувати затримку
function delay (time) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve();
      }, time);
   });
}

// ...............................................................................................

// Очищення даних після закриття модальних вікон
$(document).on("hidden.bs.modal", () => { clear_input(); });

// Виконання коду після завантаження сторінки
jQuery(async () => {

   await load_data();
   display_data();

});