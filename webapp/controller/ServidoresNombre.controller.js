sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"
    ],
    function (BaseController, JSONModel) {
        "use strict";

        return BaseController.extend("academia2022.zservidores.controller.ServidoresNombre", {
            onInit: function () {
                this.getOwnerComponent()
                    .getRouter("object")
                    .getRoute("ServidoresNombre")
                    .attachPatternMatched(this._onObjectMatched, this);

            },

            _onObjectMatched: function (oEvent) {

                let region = oEvent.getParameter('arguments').Region.split(' ')[4].substring(0,2)
                this._getServidores(region)
            },

            _getServidores: function (region) {
                let oModel = this.getView().getModel()

                oModel.read('/ServidoresSet', {
                    success: function (oData) {
                        let localJsonModel = new JSONModel()
                        let misServidores = oData.results.filter(servidor => servidor.Region.substring(0,2).toLowerCase() == region)
                        localJsonModel.setData(misServidores)
                        this.getView().byId('idTablaServers').setModel(localJsonModel, 'modeloLocalServidores')
                    }.bind(this),

                    error: function () {
                        console.log('Ha ocurrido un error inesperado.')

                    }.bind(this),

                })
            },
            onVerUsuarios: function(oEvent){
                this.getOwnerComponent().getRouter().navTo('Usuarios', {
                    Servidor: oEvent.getSource().getBindingContext('modeloLocalServidores').getProperty('NombreServer')
                });




            }
        });
    }
);
