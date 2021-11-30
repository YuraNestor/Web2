// Необхідні константи
const use_db = is_db_used();
const server_port = get_server_port();
const server_url = `http://localhost:${server_port}`;

// Перевірка, чи використовувати базу даних
// Якщо ні, то буде використовуватися localStorage
function is_db_used()
   { return $("head").attr("use_db"); }

// Метод повертає порт, який використовується для запуску сервера
function get_server_port()
   { return $("head").attr("server_port"); }

// ...............................................................................................

// Отримання даних із сервера
async function server_GET (req) {

   try {
      
   const res = await fetch(server_url + req,
                           { method: "GET",
                             headers: { "Accept": "application/json" } });

   if (res.ok) { return res.json(); }
   else { throw new Error(); }

   }

   catch (error) {
      
      if (error instanceof TypeError) {

         modal_confirm_create(
            "Помилка",
            "Не вдалося підключитися до сервера за адресою: " + server_url,
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }

      else {

         modal_confirm_create(
            "Помилка",
            "Не вдалося отримати інформацію з бази даних",
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }
   }
}

// Оновлення даних на сервері
async function server_PUT (req, array) {

   try {
   
   let collection;

   switch (req) {
      case "/set_ports":      collection = 1; break;
      case "/set_piers":        collection = 2; break;
      case "/set_ships":       collection = 3; break;
      case "/set_cured_ships": collection = 4; break;
      case "/set_identificators": collection = 5; break;
   }
   
   const res = await fetch(server_url + req,
                           { method: "PUT",
                             headers: { "Accept": "application/json",
                                        "Content-Type": "application/json" },
                             body: JSON.stringify({ array: array,
                                                    collection: collection }) }
                             );
   
   if (res.ok) { return res.json(); }
   else { throw new Error(); }
   
   }

   catch (error) {
      
      if (error instanceof TypeError) {

         modal_confirm_create(
            "Помилка",
            "Не вдалося підключитися до сервера за адресою: " + server_url,
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }

      else {

         modal_confirm_create(
            "Помилка",
            "Не вдалося оновити інформацію у базі даних",
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }
   }
}

// ...............................................................................................

// Зберігання даних
function save_data() {

   if (use_db === "true") { save_data_in_data_base();     }
   else                   { save_data_in_local_storage(); }

}

// Зберігання даних у localStorage
function save_data_in_local_storage() {

   let target = location.pathname.substring(1);

   switch (target) {

      case "ports":
         localStorage.setItem('ports', JSON.stringify(get_ports_list()));
         break;

      case "piers":
         localStorage.setItem('piers', JSON.stringify(get_piers_list()));
         break;

      case "ships":
         localStorage.setItem('ships', JSON.stringify(get_ships_list()));
         localStorage.setItem('cured_ships', JSON.stringify(get_ships_list(true)));
         break;

      case "cured_ships":
         localStorage.setItem('cured_ships', JSON.stringify(get_ships_list(true)));
         break;

   }

   let identificators = [{ "name":"last_port_id","value":last_port_id },
                         { "name":"last_pier_id",  "value":last_pier_id   },
                         { "name":"last_ship_id", "value":last_ship_id  }];

   localStorage.setItem('identificators', JSON.stringify(identificators));

}

// Зберігання даних у базу даних
function save_data_in_data_base() {

   let target = location.pathname.substring(1);

   switch (target) {

      case "ports":
         server_PUT("/set_ports", get_ports_list());
         break;

      case "piers":
         server_PUT("/set_piers", get_piers_list());
         break;

      case "ships":
         server_PUT("/set_ships", get_ships_list());
         server_PUT("/set_cured_ships", get_ships_list(true));
         break;

      case "cured_ships":
         server_PUT("/set_cured_ships", get_ships_list(true));
         break;

   }

   let identificators = [{ "name":"last_port_id","value":last_port_id },
                         { "name":"last_pier_id",  "value":last_pier_id   },
                         { "name":"last_ship_id", "value":last_ship_id  }];

   server_PUT("/set_identificators", identificators);

}

// ...............................................................................................

// Завантаження даних
async function load_data() {

   if (use_db === "true") { await load_data_from_data_base();     }
   else                   { await load_data_from_local_storage(); }

}

// Завантаження даних з localStorage
async function load_data_from_local_storage() {

   let item;
   let target = location.pathname.substring(1);

   switch (target) {

      case "ports":
         item = JSON.parse(localStorage.getItem("ports"));
         set_ports_list(item ? item : []);
         break;

      case "piers":
         item = JSON.parse(localStorage.getItem("piers"));
         set_piers_list(item ? item : []);
         break;

      case "ships":
         item = JSON.parse(localStorage.getItem("ships"));
         set_ships_list(item ? item : []);
         item = JSON.parse(localStorage.getItem("cured_ships"));
         set_ships_list(item ? item : [], true);
         break;

      case "cured_ships":
         item = JSON.parse(localStorage.getItem("cured_ships"));
         set_ships_list(item ? item : [], true);
         break;

   }

   let identificators = JSON.parse(localStorage.getItem("identificators"));
   if (!identificators) { identificators = []; }

   for (let item of identificators) {
      if (item.name === "last_port_id") { last_port_id = item.value; }
      if (item.name === "last_pier_id")   { last_pier_id   = item.value; }
      if (item.name === "last_ship_id")  { last_ship_id  = item.value; }
   }
}

// Завантаження даних з бази даних
async function load_data_from_data_base() {

   let target = location.pathname.substring(1);

   switch (target) {

      case "ports":
         await server_GET("/get_ports").then((res) =>
            { set_ports_list(res); });
         break;

      case "piers":
         await server_GET("/get_piers").then((res) =>
            { set_piers_list(res); });
         break;

      case "ships":
         await server_GET("/get_ships").then((res) =>
            { set_ships_list(res); });
         await server_GET("/get_cured_ships").then((res) =>
            { set_ships_list(res, true); });
         break;

      case "cured_ships":
         await server_GET("/get_cured_ships").then((res) =>
            { set_ships_list(res, true); });
         break;

   }

   await server_GET("/get_last_port_id").then((res) =>
      { if (res && res.length > 0) { last_port_id = res[0].value; }});

   await server_GET("/get_last_pier_id").then((res) =>
      { if (res && res.length > 0) { last_pier_id = res[0].value; }});

   await server_GET("/get_last_ship_id").then((res) =>
      { if (res && res.length > 0) { last_ship_id = res[0].value; }});

}

// Отримання даних
async function get_data (data) {

   if (use_db === "true") { return await get_data_from_data_base(data);     }
   else                   { return await get_data_from_local_storage(data); }

}

// Отримання даних з localStorage
async function get_data_from_local_storage (data) {
   
   try           { return JSON.parse(localStorage.getItem(data)); }
   catch (error) { return [];                                     }

}


// Отримання даних з бази даних
async function get_data_from_data_base (data) {

   try           { return await server_GET(`/get_${data}`); }
   catch (error) { return [];                               }

}