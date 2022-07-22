sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "academia2022/zservidores/model/formatter",
    ],
    function (BaseController, JSONModel, formatter) {
        "use strict";

        return BaseController.extend("academia2022.zservidores.controller.ServidoresNombre", {
            formatter: formatter,
            onInit: function () {

                
                this.getOwnerComponent()
                    .getRouter("object")
                    .getRoute("ServidoresNombre")
                    .attachPatternMatched(this._onObjectMatched, this);

            },

            _onObjectMatched: function (oEvent) {

                let region = oEvent.getParameter('arguments').Region.split(' ')[4].substring(0, 2)
                this._getServidores(region)
            },

            _getServidores: function (region) {
                let oModel = this.getView().getModel()

                oModel.read('/ServidoresSet', {
                    success: function (oData) {
                        let localJsonModel = new JSONModel()
                        let misServidores = oData.results.filter(servidor => servidor.Region.substring(0, 2).toLowerCase() == region)
                        localJsonModel.setData(misServidores)
                        this.getView().byId('idTablaServers').setModel(localJsonModel, 'modeloLocalServidores')
                    }.bind(this),

                    error: function () {
                        console.log('Ha ocurrido un error inesperado.')

                    }.bind(this),

                })
            },
            onVerUsuarios: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo('Usuarios', {
                    Servidor: oEvent.getSource().getBindingContext('modeloLocalServidores').getProperty('NombreServer')
                });




            },

            onActualizarServidor: function (oEvent) {
                let oModel = this.getView().getModel();
                let oServidor = {};
                let that = this;

                const modeloLocalServidores = oEvent.getSource().getBindingContext('modeloLocalServidores').getProperty('Estado');

                const modeloLocalServidoresNombre = oEvent.getSource().getBindingContext('modeloLocalServidores').getProperty('NombreServer');

                const modeloLocalServidoresRegion = oEvent.getSource().getBindingContext('modeloLocalServidores').getProperty('Region');


                if (modeloLocalServidores === "ENCENDIDO") {

                    oServidor.Estado = "APAGADO";

                }

                if (modeloLocalServidores === "APAGADO") {

                    oServidor.Estado = "ENCENDIDO";

                }

                oModel.update("/ServidoresSet(NombreServer='"+ modeloLocalServidoresNombre +"')", oServidor, {

                    success: function () {
                        that._getServidores(modeloLocalServidoresRegion.substring(0, 2).toLowerCase())

                    },

                    error: function (oError) {
                    }

                })

            },




        });
    }
);
