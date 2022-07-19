sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast",
        "sap/ui/core/Fragment"
    ],
    function (BaseController, JSONModel, MessageToast, Fragment) {
        "use strict";

        let oServicio = '/sap/opu/odata/sap/ZOS_ACADEMIA_BRAIAN_SRV/';

        return BaseController.extend("academia2022.zservidores.controller.Usuarios", {
            onInit: function () {
                this.getOwnerComponent()
                    .getRouter("object")
                    .getRoute("Usuarios")
                    .attachPatternMatched(this._onObjectMatched, this);

            },

            _onObjectMatched: function (oEvent) {

                let Servidor = oEvent.getParameter('arguments').Servidor;
                this._getUsuarios(Servidor)
            },

            _getUsuarios: function (Servidor) {
                let oModel = this.getView().getModel()

                let sPath = "/ServidoresSet(NombreServer='" + Servidor + "')/To_Usuarios";

                oModel.read(sPath, {
                    success: function (oData) {
                        let oModelLocalJson = new sap.ui.model.json.JSONModel();
                        oModelLocalJson.setData(oData.results);
                        this.getView().byId('tablaUsuarios').setModel(oModelLocalJson, 'modeloLocalUsuarios');
                    }.bind(this),

                    error: function () {
                        console.log('Ha ocurrido un error inesperado.');

                    }.bind(this),

                })
            },

            onAdd: function () {

                let that = this

                if (!this.pFormularioUsuario) {
                    this.pFormularioUsuario = Fragment.load({
                        name: "academia2022.zservidores.view.Fragments.FormularioUsuario"
                    })
                }

                this.pFormularioUsuario.then(function (oDialogo) {

                    that.getView().addDependent(oDialogo)
                    oDialogo.open()

                })

            },

            onCrearUsuario: function (oEvent) {
                let oModel = this.getView().getModel();
                let oUsuario = {};

                // modeloLocalUsuarios
                oModel.create("/UsuariosSet", oUsuario, {

                    success: function () {

                    },
                    error: function (oError) {
                        MessageToast.show("Ha ocurrido un error inesperado.")
                    }

                })

            },

 //         onCancelar: function (oEvent) {
 //             this.pFormularioUsuario.then(function (oDialogo) {
 //                 oDialogo.close()
 //             }
 //             )
 //         },



//              onCancelar: function (oEvent) {
//                  console.log("a")
//
//              },


            onEdit: function (oEvent) {
                this.getView().getModel()

            },

            onDelete: function (oEvent) {
                this.getView().getModel()

            }

        });

    });