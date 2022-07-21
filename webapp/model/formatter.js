sap.ui.define([], function () {
    "use strict";

    return {

        formatterEstadoGrid: function (EstadoGrid) {

            if (Estado == "Encendido") return "Success";

            if (Estado == "Apagado") return "Warning";

        },

        formatterEstadoBotonIcono: function (EstadoBoton) {

            if (Estado == "Encendido") return "sap-icon://disconnected";

            if (Estado == "Apagado") return "sap-icon://connected";

        },

        formatterEstadoBotonTexto: function (EstadoTexto) {

            if (Estado == "Encendido") return "apagar servidor";

            if (Estado == "Apagado") return "encender servidor";

        },

        formatterEstadoBotonTipo: function (EstadoTipo) {

            if (Estado == "Encendido") return "Reject";

            if (Estado == "Apagado") return "Accept";

        },


    }

}
);