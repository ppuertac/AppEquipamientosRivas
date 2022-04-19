var direccion

define(["esri/dijit/Directions", "dojo/on", 'dojo/_base/lang', "esri/tasks/query", "esri/tasks/QueryTask", "esri/layers/FeatureLayer", 'dojo/_base/declare', 'jimu/BaseWidget'],
  function(Directions, on, lang, Query, QueryTask, FeatureLayer, declare, BaseWidget) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

      // postCreate: function() {
      // },
      

      ruta: function(){
        this.direcciones.style.display = "block";
        this.raya3.style.display = "block";
        var urlRutas = "http://utility.arcgis.com/usrsvcs/appservices/OM1GNiiACNJceMRn/rest/services/World/Route/NAServer/Route_World";
        direccion = new Directions({
          map: this.map,
          directionsLanguage: "es",
          routeTaskUrl: urlRutas,
          showClearButton: true
        }, "divDirections");
        direccion.startup();
        direccion.stops[1].name = this.lista.value
        direccion.setDirectionsLanguage("es");
        direccion.setDirectionsLengthUnits("esriMeters");
        direccion.zoomToFullRoute();
        this.parrafo.style.display = "block";
        this.button.style.display = "none";
      },


      destruirRuta: function(){
        direccion.reset();
        direccion.stops[1].name = this.lista.value
      },


      cargaSeleccion: function (){

        this.direcciones.style.display = "none";
        this.raya3.style.display = "none";

        console.log("mapa", this.map);
        
        var metro = this.map.getLayer('Servicio_de_mapa_para_geoprocesamiento_2261');
        var eduEspecial = this.map.getLayer('Servicio_de_mapa_para_geoprocesamiento_688');
        var eduAdultos = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_3365");
        var escuInfantiles = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_5229");
        var colPrivConcer = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_943");
        var colPublicos = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_8046");
        var institutos = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_7465");
        var farmacias = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_7211");
        var piscinas = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_3926");
        var camposFutbol = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_1364");
        var polideportivos = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_7004");
        var pistasDeportivas = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_7372");
        var zonasVerdes = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_8357");
        var zonasVerdesArea = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_5712")


        let seleccion = this.select.value;

        if (seleccion == -1) {

          metro.show();
          eduEspecial.show();
          eduAdultos.show();
          escuInfantiles.show();
          colPrivConcer.show();
          colPublicos.show();
          institutos.show();
          farmacias.show();
          piscinas.show();
          camposFutbol.show();
          polideportivos.show();
          zonasVerdes.show();
          zonasVerdesArea.show();
          pistasDeportivas.show();

          this.lista.innerHTML = ""
          this.listado.innerHTML = ""
          this.listaFarmacias.style.display = "none";
          this.listaParques.style.display = "none";
          this.button.style.display = "none";
          this.lista.style.display = "none";
          this.raya1.style.display = "none";
          console.log("metrooo")
        }

          else if (seleccion == 0) {

            eduEspecial.hide();
            eduAdultos.hide();
            escuInfantiles.hide();
            colPrivConcer.hide();
            colPublicos.hide();
            institutos.hide();
            farmacias.hide();
            piscinas.hide();
            camposFutbol.hide();
            polideportivos.hide();
            pistasDeportivas.hide();
            zonasVerdes.hide();
            zonasVerdesArea.hide();
            metro.show();

            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            this.listaFarmacias.style.display = "none";
            this.listaParques.style.display = "none";
            console.log("metro", metro);
            var queryTaskMetro = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/0");
            var queryMetro = new Query();
            queryMetro.where = "1 = 1";
            queryMetro.outFields = ["*"];
            queryMetro.returnGeometry = true;
            queryTaskMetro.execute(queryMetro);
            queryTaskMetro.on('complete', lang.hitch(this,function(event) {
              arrayMetro = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.direccion;
                opt.innerHTML = event.featureSet.features[i].attributes.titulo;
                this.lista.add(opt);
              };
              for (let estacion of arrayMetro){
                this.listado.innerHTML += "<b>"+ estacion.attributes.titulo + "</b>" + "<br>" + estacion.attributes.direccion + "<br>" + "<img src=" + "'"+ estacion.attributes.imagen + "'" + ">" + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.raya1.style.display = "block";
              this.button.style.display = "block";
            }));
          }

          else if (seleccion == 1) {

            metro.hide();
            eduAdultos.hide();
            escuInfantiles.hide();
            colPrivConcer.hide();
            colPublicos.hide();
            institutos.hide();
            farmacias.hide();
            piscinas.hide();
            camposFutbol.hide();
            polideportivos.hide();
            pistasDeportivas.hide();
            zonasVerdes.hide();
            zonasVerdesArea.hide();
            eduEspecial.show();

            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            this.listaFarmacias.style.display = "none";
            this.listaParques.style.display = "none";
            console.log("eduEspecial", eduEspecial)
            var queryTaskEduEspecial = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/1");
            var queryEduEspecial = new Query();
            queryEduEspecial.where = "1 = 1";
            queryEduEspecial.outFields = ["*"];
            queryEduEspecial.returnGeometry = true;
            queryTaskEduEspecial.execute(queryEduEspecial);
            queryTaskEduEspecial.on('complete', lang.hitch(this,function(event) {
              arrayEduEspecial = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.direccion;
                opt.innerHTML = event.featureSet.features[i].attributes.nombre;
                this.lista.add(opt);
              };
              for (let equipamiento of arrayEduEspecial){
                this.listado.innerHTML += "<b>"+ equipamiento.attributes.nombre + "</b>" + "<br>" + equipamiento.attributes.direccion + "<br>" + "<img src=" + "'"+ equipamiento.attributes.imagen + "'" + ">" + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.raya1.style.display = "block";
              this.button.style.display = "block";
            }));
          }

          else if (seleccion == 2) {

            metro.hide();
            eduEspecial.hide();
            escuInfantiles.hide();
            colPrivConcer.hide();
            colPublicos.hide();
            institutos.hide();
            farmacias.hide();
            piscinas.hide();
            camposFutbol.hide();
            polideportivos.hide();
            pistasDeportivas.hide();
            zonasVerdes.hide();
            zonasVerdesArea.hide();
            eduAdultos.show();

            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            this.listaFarmacias.style.display = "none";
            this.listaParques.style.display = "none";
            console.log("eduAdultos", eduAdultos)
            var queryTaskEduAdultos = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/2");
            var queryEduAdultos = new Query();
            queryEduAdultos.where = "1 = 1";
            queryEduAdultos.outFields = ["*"];
            queryEduAdultos.returnGeometry = true;
            queryTaskEduAdultos.execute(queryEduAdultos);
            queryTaskEduAdultos.on('complete', lang.hitch(this,function(event) {
              arrayEduAdultos = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.direccion;
                opt.innerHTML = event.featureSet.features[i].attributes.nombre;
                this.lista.add(opt);
              };
              for (let equipamiento of arrayEduAdultos){
                this.listado.innerHTML += "<b>"+ equipamiento.attributes.nombre + "</b>" + "<br>" + equipamiento.attributes.direccion + "<br>" + "<img src=" + "'"+ equipamiento.attributes.imagen + "'" + ">" + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.raya1.style.display = "block";
              this.button.style.display = "block";
            }));
          }

          else if (seleccion == 3) {

            metro.hide();
            eduEspecial.hide();
            eduAdultos.hide();
            colPrivConcer.hide();
            colPublicos.hide();
            institutos.hide();
            farmacias.hide();
            piscinas.hide();
            camposFutbol.hide();
            polideportivos.hide();
            pistasDeportivas.hide();
            zonasVerdes.hide();
            zonasVerdesArea.hide();
            escuInfantiles.show();
            
            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            this.listaFarmacias.style.display = "none";
            this.listaParques.style.display = "none";
            console.log("escuInfantiles", escuInfantiles)
            var queryTaskInfantil = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/3");
            var queryInfantil = new Query();
            queryInfantil.where = "1 = 1";
            queryInfantil.outFields = ["*"];
            queryInfantil.returnGeometry = true;
            queryTaskInfantil.execute(queryInfantil);
            queryTaskInfantil.on('complete', lang.hitch(this,function(event) {
              arrayInfantil = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.direccion;
                opt.innerHTML = event.featureSet.features[i].attributes.nombre;
                this.lista.add(opt);
              };
              for (let equipamiento of arrayInfantil){
                this.listado.innerHTML += "<b>"+ equipamiento.attributes.nombre + "</b>" + "<br>" + equipamiento.attributes.direccion + "<br>" + "<img src=" + "'"+ equipamiento.attributes.imagen + "'" + ">" + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.raya1.style.display = "block";
              this.button.style.display = "block";
            }));
          }

          else if (seleccion == 4) {

            metro.hide();
            eduEspecial.hide();
            eduAdultos.hide();
            escuInfantiles.hide();
            colPublicos.hide();
            institutos.hide();
            farmacias.hide();
            piscinas.hide();
            camposFutbol.hide();
            polideportivos.hide();
            pistasDeportivas.hide();
            zonasVerdes.hide();
            zonasVerdesArea.hide();
            colPrivConcer.show();

            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            this.listaFarmacias.style.display = "none";
            this.listaParques.style.display = "none";
            console.log("colPrivConcer", colPrivConcer)
            var queryTaskColPriv = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/4");
            var queryColPriv = new Query();
            queryColPriv.where = "1 = 1";
            queryColPriv.outFields = ["*"];
            queryColPriv.returnGeometry = true;
            queryTaskColPriv.execute(queryColPriv);
            queryTaskColPriv.on('complete', lang.hitch(this,function(event) {
              arrayColPriv = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.direccion;
                opt.innerHTML = event.featureSet.features[i].attributes.nombre;
                this.lista.add(opt);
              };
              for (let equipamiento of arrayColPriv){
                this.listado.innerHTML += "<b>"+ equipamiento.attributes.nombre + "</b>" + "<br>" + equipamiento.attributes.direccion + "<br>" + "<img src=" + "'"+ equipamiento.attributes.imagen + "'" + ">" + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.raya1.style.display = "block";
              this.button.style.display = "block";
            }));
          }

          else if (seleccion == 5) {

            metro.hide();
            eduEspecial.hide();
            eduAdultos.hide();
            escuInfantiles.hide();
            colPrivConcer.hide();
            institutos.hide();
            farmacias.hide();
            piscinas.hide();
            camposFutbol.hide();
            polideportivos.hide();
            pistasDeportivas.hide();
            zonasVerdes.hide();
            zonasVerdesArea.hide();
            colPublicos.show();

            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            this.listaFarmacias.style.display = "none";
            this.listaParques.style.display = "none";
            console.log("colPublicos", colPublicos)
            var queryTaskColPublicos = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/5");
            var queryColPublicos = new Query();
            queryColPublicos.where = "1 = 1";
            queryColPublicos.outFields = ["*"];
            queryColPublicos.returnGeometry = true;
            queryTaskColPublicos.execute(queryColPublicos);
            queryTaskColPublicos.on('complete', lang.hitch(this,function(event) {
              arrayColPublicos = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.direfootno;
                opt.innerHTML = event.featureSet.features[i].attributes.title;
                this.lista.add(opt);
              };
              for (let equipamiento of arrayColPublicos){
                this.listado.innerHTML += "<b>"+ equipamiento.attributes.title + "</b>" + "<br>" + equipamiento.attributes.direfootno + "<br>" + equipamiento.attributes.tlf + "<br>" + equipamiento.attributes.correo + "<br>" + "<img src=" + "'"+ equipamiento.attributes.image_url + "'" + ">" + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.raya1.style.display = "block";
              this.button.style.display = "block";
            }));
          }

          else if (seleccion == 6) {

            metro.hide();
            eduEspecial.hide();
            eduAdultos.hide();
            escuInfantiles.hide();
            colPrivConcer.hide();
            colPublicos.hide();
            farmacias.hide();
            piscinas.hide();
            camposFutbol.hide();
            polideportivos.hide();
            pistasDeportivas.hide();
            zonasVerdes.hide();
            zonasVerdesArea.hide();
            institutos.show();

            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            this.listaFarmacias.style.display = "none";
            this.listaParques.style.display = "none";
            console.log("institutos", institutos)
            var queryTaskInstitutos = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/6");
            var queryInstitutos = new Query();
            queryInstitutos.where = "1 = 1";
            queryInstitutos.outFields = ["*"];
            queryInstitutos.returnGeometry = true;
            queryTaskInstitutos.execute(queryInstitutos);
            queryTaskInstitutos.on('complete', lang.hitch(this,function(event) {
              arrayInstitutos = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.direccion;
                opt.innerHTML = event.featureSet.features[i].attributes.nombre;
                this.lista.add(opt);
              };
              for (let equipamiento of arrayInstitutos){
                this.listado.innerHTML += "<b>"+ equipamiento.attributes.nombre + "</b>" + "<br>" + equipamiento.attributes.direccion + "<br>" + "<img src=" + "'"+ equipamiento.attributes.imagen + "'" + ">" + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.raya1.style.display = "block";
              this.button.style.display = "block";
            }));
          }

          else if (seleccion == 7) {

            metro.hide();
            eduEspecial.hide();
            eduAdultos.hide();
            escuInfantiles.hide();
            colPrivConcer.hide();
            colPublicos.hide();
            institutos.hide();
            piscinas.hide();
            camposFutbol.hide();
            polideportivos.hide();
            pistasDeportivas.hide();
            zonasVerdes.hide();
            zonasVerdesArea.hide();
            farmacias.show();

            this.listaFarmacias.style.display = "block";
            this.listaParques.style.display = "none";
            this.raya1.style.display = "block";
            this.lista.style.display = "none";
            this.listado.style.display = "none";
            this.button.style.display = "none";
            console.log("farmacias", farmacias)
          }

          else if (seleccion == 8) {

            metro.hide();
            eduEspecial.hide();
            eduAdultos.hide();
            escuInfantiles.hide();
            colPrivConcer.hide();
            colPublicos.hide();
            institutos.hide();
            farmacias.hide();
            camposFutbol.hide();
            polideportivos.hide();
            pistasDeportivas.hide();
            zonasVerdes.hide();
            zonasVerdesArea.hide();
            piscinas.show();

            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            this.listaFarmacias.style.display = "none";
            this.listaParques.style.display = "none";
            console.log("piscinas", piscinas)
            var queryTaskPiscinas = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/8");
            var queryPiscinas = new Query();
            queryPiscinas.where = "1 = 1";
            queryPiscinas.outFields = ["*"];
            queryPiscinas.returnGeometry = true;
            queryTaskPiscinas.execute(queryPiscinas);
            queryTaskPiscinas.on('complete', lang.hitch(this,function(event) {
              arrayPiscinas = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.direccion;
                opt.innerHTML = event.featureSet.features[i].attributes.nombre;
                this.lista.add(opt);
              };
              for (let equipamiento of arrayPiscinas){
                this.listado.innerHTML += "<b>"+ equipamiento.attributes.nombre + "</b>" + "<br>" + equipamiento.attributes.direccion + "<br>" + "<img src=" + "'"+ equipamiento.attributes.imagen + "'" + ">" + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.raya1.style.display = "block";
              this.button.style.display = "block";
            }));
          }

          else if (seleccion == 9) {

            metro.hide();
            eduEspecial.hide();
            eduAdultos.hide();
            escuInfantiles.hide();
            colPrivConcer.hide();
            colPublicos.hide();
            institutos.hide();
            farmacias.hide();
            piscinas.hide();
            polideportivos.hide();
            pistasDeportivas.hide();
            zonasVerdes.hide();
            zonasVerdesArea.hide();
            camposFutbol.show();

            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            this.listaFarmacias.style.display = "none";
            this.listaParques.style.display = "none";
            console.log("camposFutbol", camposFutbol)
            var queryTaskFutbol = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/9");
            var queryFutbol = new Query();
            queryFutbol.where = "1 = 1";
            queryFutbol.outFields = ["*"];
            queryFutbol.returnGeometry = true;
            queryTaskFutbol.execute(queryFutbol);
            queryTaskFutbol.on('complete', lang.hitch(this,function(event) {
              arrayFutbol = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.direccion;
                opt.innerHTML = event.featureSet.features[i].attributes.nombre;
                this.lista.add(opt);
              };
              for (let equipamiento of arrayFutbol){
                this.listado.innerHTML += "<b>"+ equipamiento.attributes.nombre + "</b>" + "<br>" + equipamiento.attributes.direccion + "<br>" + "<img src=" + "'"+ equipamiento.attributes.imagen + "'" + ">" + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.raya1.style.display = "block";
              this.button.style.display = "block";
            }));
          }

          else if (seleccion == 10) {

            metro.hide();
            eduEspecial.hide();
            eduAdultos.hide();
            escuInfantiles.hide();
            colPrivConcer.hide();
            colPublicos.hide();
            institutos.hide();
            farmacias.hide();
            piscinas.hide();
            camposFutbol.hide();
            pistasDeportivas.hide();
            zonasVerdes.hide();
            zonasVerdesArea.hide();
            polideportivos.show();

            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            this.listaFarmacias.style.display = "none";
            this.listaParques.style.display = "none";
            console.log("polideportivos", polideportivos)
            var queryTaskPoli = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/10");
            var queryPoli = new Query();
            queryPoli.where = "1 = 1";
            queryPoli.outFields = ["*"];
            queryPoli.returnGeometry = true;
            queryTaskPoli.execute(queryPoli);
            queryTaskPoli.on('complete', lang.hitch(this,function(event) {
              arrayPoli = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.direccion;
                opt.innerHTML = event.featureSet.features[i].attributes.nombre;
                this.lista.add(opt);
              };
              for (let equipamiento of arrayPoli){
                this.listado.innerHTML += "<b>"+ equipamiento.attributes.nombre + "</b>" + "<br>" + equipamiento.attributes.direccion + "<br>" + "<img src=" + "'"+ equipamiento.attributes.imagen + "'" + ">" + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.raya1.style.display = "block";
              this.button.style.display = "block";
            }));
          }

          else if (seleccion == 11) {

            metro.hide();
            eduEspecial.hide();
            eduAdultos.hide();
            escuInfantiles.hide();
            colPrivConcer.hide();
            colPublicos.hide();
            institutos.hide();
            farmacias.hide();
            piscinas.hide();
            camposFutbol.hide();
            polideportivos.hide();
            zonasVerdes.hide();
            zonasVerdesArea.hide();
            pistasDeportivas.show();

            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            this.listaFarmacias.style.display = "none";
            this.listaParques.style.display = "none";
            console.log("pistasDeportivas", pistasDeportivas)
            var queryTaskPistas = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/11");
            var queryPistas = new Query();
            queryPistas.where = "1 = 1";
            queryPistas.outFields = ["*"];
            queryPistas.returnGeometry = true;
            queryTaskPistas.execute(queryPistas);
            queryTaskPistas.on('complete', lang.hitch(this,function(event) {
              arrayPistas = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.direccion;
                opt.innerHTML = event.featureSet.features[i].attributes.nombre;
                this.lista.add(opt);
              };
              for (let equipamiento of arrayPistas){
                this.listado.innerHTML += "<b>"+ equipamiento.attributes.nombre + "</b>" + "<br>" + equipamiento.attributes.direccion + "<br>" + "<img src=" + "'"+ equipamiento.attributes.imagen + "'" + ">" + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.button.style.display = "block";
            }));
          }

          else {

            metro.hide();
            eduEspecial.hide();
            eduAdultos.hide();
            escuInfantiles.hide();
            colPrivConcer.hide();
            colPublicos.hide();
            institutos.hide();
            farmacias.hide();
            piscinas.hide();
            camposFutbol.hide();
            polideportivos.hide();
            pistasDeportivas.hide();
            zonasVerdesArea.show();
            zonasVerdes.show();

            this.listaParques.style.display = "block";
            this.listaFarmacias.style.display = "none";
            this.raya1.style.display = "block";
            this.lista.style.display = "none";
            this.listado.style.display = "none";
            this.button.style.display = "none";
            console.log("zonasVerdes", zonasVerdes)
          }
      },



      cargaFarmacias: function(){
        
        this.direcciones.style.display = "none";

        var farmacias = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_7211");

        let seleccionBarrio = this.listaFarmacias.value;

        if (seleccionBarrio == -1) {
          this.lista.innerHTML = ""
          this.listado.innerHTML = ""
          this.button.style.display = "none";
          this.lista.style.display = "none";
        }

          else {
            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            console.log("farmacias", farmacias);
            var codigoBarrio = this.listaFarmacias.value;
            var queryTaskFarmacias = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/7");
            var queryFarmacias = new Query();
            queryFarmacias.where = "1 = 1";
            queryFarmacias.outFields = ["*"];
            queryFarmacias.returnGeometry = true;
            queryFarmacias.where = "barrio = '" + codigoBarrio + "'";
            queryTaskFarmacias.execute(queryFarmacias);
            queryTaskFarmacias.on('complete', lang.hitch(this,function(event) {
              arrayFarmacias = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.nombre;
                opt.innerHTML = event.featureSet.features[i].attributes.nombre;
                this.lista.add(opt);
              };
              for (let farmacia of arrayFarmacias){
                this.listado.innerHTML += "<hr>" + "<b>"+ farmacia.attributes.nombre + "</b>" + "<br>" + farmacia.attributes.telefono + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.button.style.display = "block";
              this.rayaFarmacia.style.display = "block";
            }));
          }

      },


      cargaParques: function(){
        
        this.direcciones.style.display = "none";

        let seleccionTamaño = this.listaParques.value;

        var zonasVerdes = this.map.getLayer("Servicio_de_mapa_para_geoprocesamiento_8357");

        if (seleccionTamaño == -1) {
          this.lista.innerHTML = ""
          this.listado.innerHTML = ""
          this.button.style.display = "none";
          this.lista.style.display = "none";
        }

          else {
            this.lista.innerHTML = ""
            this.listado.innerHTML = ""
            console.log("zonasVerdes", zonasVerdes);
            var codigoTamaño = this.listaParques.value;
            var queryTaskParques = new QueryTask("https://laptop-ibqrag16/server/rest/services/Servicio_de_mapa_para_geoprocesamiento/MapServer/13");
            var queryParques = new Query();
            queryParques.where = "1 = 1";
            queryParques.outFields = ["*"];
            queryParques.returnGeometry = true;
            queryParques.where = "tamaño = '" + codigoTamaño + "'";
            queryTaskParques.execute(queryParques);
            queryTaskParques.on('complete', lang.hitch(this,function(event) {
              arrayParques = event.featureSet.features;
              for (var i = 0; i < event.featureSet.features.length; i++){
                opt = document.createElement("option");
                opt.value = event.featureSet.features[i].attributes.direccion;
                opt.innerHTML = event.featureSet.features[i].attributes.nombre;
                this.lista.add(opt);
              };
              for (let parque of arrayParques){
                this.listado.innerHTML += "<hr>" + "<b>"+ parque.attributes.nombre + "</b>" + "<br>" + parque.attributes.direccion + "<br>" + "<hr>"
                };
              this.lista.style.display = "block";
              this.listado.style.display = "block";
              this.button.style.display = "block";
              this.rayaFarmacia.style.display = "block";
            }));
          }

      },


      // startup: function() {
      //  this.inherited(arguments);
      //  this.mapIdNode.innerHTML = 'map id:' + this.map.id;
      //  console.log('startup');
      // },

      // onOpen: function(){
      //   console.log('onOpen');
      // },

      // onClose: function(){
      //   console.log('onClose');
      // },

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });