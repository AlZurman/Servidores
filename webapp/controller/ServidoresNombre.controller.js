sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function (BaseController) {
        "use strict";

        return BaseController.extend("academia2022.zservidores.controller.controller.ServidoresNombre", {
            onInit: function () {
                this.getOwnerComponent()
                    .getRouter("object")
                    .getRoute("ServidoresNombre")
                    .attachPatternMatched(this._onObjectMatched, this);

            },

            _onObjectMatched: function (oEvent){

                let region = oEvent.getParameter('arguments').Region

            }


        });
    }
);
