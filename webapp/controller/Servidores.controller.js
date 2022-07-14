sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("academia2022.zservidores.controller.Servidores", {
            onInit: function () {

            },


            press: function (oEvent) {


                this.getOwnerComponent()
                    .getRouter()
                    .navTo("ServidoresNombre", {
                       Region: oEvent.getSource().getHeader()
                    })


            }


        });
    });
