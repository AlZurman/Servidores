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
        let Servidor ;

        return BaseController.extend("academia2022.zservidores.controller.Usuarios", {
            onInit: function () {

                this.oFormularioUsuario = new JSONModel({
                    NombreServer: '',
                    NombreUser: '',
                    TipoUser: '',
                    Nivel: 1,
                    Completado: false
                })

                this.getView().setModel(this.oFormularioUsuario, "modeloFormularioUsuario");

                this.getOwnerComponent()
                    .getRouter("object")
                    .getRoute("Usuarios")
                    .attachPatternMatched(this._onObjectMatched, this);

            },

            _onObjectMatched: function (oEvent) {

                Servidor = oEvent.getParameter('arguments').Servidor;
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
                        name: "academia2022.zservidores.view.Fragments.FormularioUsuario",
                        controller: that
                    })
                }

                this.pFormularioUsuario.then(function (oDialogo) {

                    that.getView().addDependent(oDialogo)
                    oDialogo.open()

                })

            },

            onCrearUsuario: function (oEvent) {
                let oModel = this.getView().getModel();
                let oUsuario = {}
                
                oUsuario.NombreServer = Servidor;

                oModel.create("/UsuariosSet", oUsuario, {

                    success: function () {

                    },
                    error: function (oError) {
                        MessageToast.show("Ha ocurrido un error inesperado.")
                    }

                })

            },

            onCancelar: function (oEvent) {
                this.pFormularioUsuario.then(function (oDialogo) {
                    oDialogo.close()
                }
                )
            },


            onEdit: function (oEvent) {
                this.getView().getModel()

            },

            onDelete: function (oEvent) {
                let oModel = this.getView().getModel();
                let oUsuario = {}
                
                oUsuario.NombreServer = Servidor;

                oModel.delete("/UsuariosSet", oUsuario, {

                    success: function () {

                    },
                    error: function (oError) {
                        MessageToast.show("Ha ocurrido un error inesperado.")
                    }

                })

            },

            changeNombreUser: function (oEvent){
                const newNombreUser = oEvent.getParameter("value")
                oModel = this.getView().getModel("modeloFormularioUsuario")
    
                oModel.setProperty("/NombreUser", newNombreUser)
            },

            changeTipoUser: function (oEvent){
                const newTipoUser = oEvent.getParameter("value")
                oModel = this.getView().getModel("modeloFormularioUsuario")
    
                oModel.setProperty("/TipoUser", newTipoUser)
            },

            changeNivel: function (oEvent){
                const newNivel = oEvent.getParameter("value")
                oModel = this.getView().getModel("modeloFormularioUsuario")
    
                oModel.setProperty("/Nivel", newNivel)
            },

            _checkField: function (){
                const oModel = this.getView().getModel("modeloFormularioUsuario").oData;
                
                if ( !oModel.NombreUser || !oModel.TipoUser || !oModel.Nivel){

                    this.getView().getModel("modeloFormularioUsuario").setProperty("/Completado", false)
                }
                else {
                    this.getView().getModel("modeloFormularioUsuario").setProperty("/Completado", true)
                }
            }

        });

    });