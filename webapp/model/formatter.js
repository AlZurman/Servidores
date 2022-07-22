sap.ui.define([], function () {
    "use strict";

    return {

        formatterEstadoGrid: function (Estado) {

            if (Estado == "ENCENDIDO") return "Success";

            if (Estado == "APAGADO") return "Warning";

        },

        formatterEstadoBotonIcono: function (Estado) {

            if (Estado == "ENCENDIDO") return "sap-icon://disconnected";

            if (Estado == "APAGADO") return "sap-icon://connected";

        },

        formatterEstadoBotonTexto: function (Estado) {

            if (Estado == "ENCENDIDO") return "apagar servidor";

            if (Estado == "APAGADO") return "encender servidor";

        },

        formatterEstadoBotonTipo: function (Estado) {

            if (Estado == "ENCENDIDO") return "Reject";

            if (Estado == "APAGADO") return "Accept";

        },

        formatterUsuarioIcono: function (Tipo) {

            if (Tipo == "Jugador") return "sap-icon://person-placeholder";

            if (Tipo == "Moderador") return "sap-icon://shield";

        },

        formatterUsuarioColor: function (Tipo) {

            if (Tipo == "Jugador") return "blue";

            if (Tipo == "Moderador") return "green";

        },

        formatterTipoSv: function (TipoSv) {

            if (TipoSv == "PÚBLICO") return "Servidor Público";

            if (TipoSv == "PRIVADO") return "Servidor Privado";

        },


    }

}
);