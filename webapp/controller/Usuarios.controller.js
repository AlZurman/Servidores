sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast",
        "sap/ui/core/Fragment",
        "academia2022/zservidores/model/formatter",

    ],

    function (BaseController, JSONModel, MessageToast, Fragment, formatter) {
        "use strict";

        let oServicio = '/sap/opu/odata/sap/ZOS_ACADEMIA_BRAIAN_SRV/';
        let Servidor;

        return BaseController.extend("academia2022.zservidores.controller.Usuarios", {
            formatter: formatter,
            onInit: function () {

                this.oFormularioUsuario = new JSONModel({
                    NombreServer: '',
                    NombreUser: '',
                    TipoUser: 'Jugador',
                    Nivel: 1,
                    Completado: false
                })

                this.getView().setModel(this.oFormularioUsuario, "modeloFormularioUsuario");

                this.getOwnerComponent()
                    .getRouter("object")
                    .getRoute("Usuarios")
                    .attachPatternMatched(this._onObjectMatched, this);

                    this.oEditarUsuario = new JSONModel({
                        NombreServer: '',
                        NombreUser: '',
                        TipoUser: '',
                        Nivel: 1,
                        Completado: false
                    })
    
                    this.getView().setModel(this.oEditarUsuario, "EditarUsuario");
    
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
                let that = this

                const modeloFormularioUsuario = this.getView().getModel("modeloFormularioUsuario").oData;

                oUsuario.NombreServer = Servidor;
                oUsuario.NombreUser = modeloFormularioUsuario.NombreUser;
                oUsuario.TipoUser = modeloFormularioUsuario.TipoUser;
                oUsuario.Nivel = modeloFormularioUsuario.Nivel;

                oModel.create("/UsuariosSet", oUsuario, {

                    success: function () {

                        MessageToast.show("Usuario creado con éxito")

                        that.pFormularioUsuario.then(function (oDialogo) {
                            oDialogo.close()
                        })
                        that._getUsuarios(Servidor)

                    },
                    error: function (oError) {
                        MessageToast.show("Ha ocurrido un error inesperado.")
                    }

                })

            },

            onCancelar: function (oEvent) {

                let modeloFormularioUsuario = this.getView().getModel("modeloFormularioUsuario")

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
                let that = this
                let modeloLocalUsuarios = this.getView().getModel();
                

                oUsuario.NombreServer = Servidor;
                oUsuario.NombreUser = oEvent.getSource().getBindingContext("modeloLocalUsuarios").getProperty("NombreUser");

                oModel.remove("/UsuariosSet(NombreServer='"+ oUsuario.NombreServer +"',NombreUser='"+ oUsuario.NombreUser +"')", {

                    success: function () {

                        that._getUsuarios(Servidor)

                    },
                    error: function (oError) {
                        MessageToast.show("Ha ocurrido un error inesperado.")
                    }

                })

            },

            changeNombreUser: function (oEvent) {
                const newNombreUser = oEvent.getParameter("value")
                let oModel = this.getView().getModel("modeloFormularioUsuario")

                oModel.setProperty("/NombreUser", newNombreUser)

                this._checkField()

            },

            changeTipoUser: function (oEvent) {
                const newTipoUser = oEvent.getParameters().selectedItem.mProperties.text
                let oModel = this.getView().getModel("modeloFormularioUsuario")

                oModel.setProperty("/TipoUser", newTipoUser)
            },

            changeNivel: function (oEvent) {
                const newNivel = oEvent.getParameter("value")
                let oModel = this.getView().getModel("modeloFormularioUsuario")

                oModel.setProperty("/Nivel", newNivel)
            },

            _checkField: function () {
                const oModel = this.getView().getModel("modeloFormularioUsuario").oData;

                if (!oModel.NombreUser) {

                    this.getView().getModel("modeloFormularioUsuario").setProperty("/Completado", false)
                }
                else {
                    this.getView().getModel("modeloFormularioUsuario").setProperty("/Completado", true)
                }
            },


            EditarUsuarioFragment: function (oEvent) {

                let that = this   

                const EditarUsuarioNombreServer = oEvent.getSource().getBindingContext('modeloLocalUsuarios').getProperty('NombreServer');

                const EditarUsuarioNombreUser = oEvent.getSource().getBindingContext('modeloLocalUsuarios').getProperty('NombreUser');

                let oModel = this.getView().getModel("EditarUsuario")

                oModel.setProperty("/NombreServer", EditarUsuarioNombreServer)
                oModel.setProperty("/NombreUser", EditarUsuarioNombreUser)

                if (!this.pEditarUsuario) {
                    this.pEditarUsuario = Fragment.load({
                        name: "academia2022.zservidores.view.Fragments.EditarUsuario",
                        controller: that
                    })
                }

                this.pEditarUsuario.then(function (oDialogo) {

                    that.getView().addDependent(oDialogo)
                    oDialogo.open()

                })

            },

            onCancelarEdit: function (oEvent) {

                let modeloEditarUsuario = this.getView().getModel("modeloEditarUsuario")

                this.pEditarUsuario.then(function (oDialogo) {
                    oDialogo.close()
                })

            },

            onEditarUsuario: function (oEvent) {
                let oModel = this.getView().getModel();
                let oUsuarioEditado = {}
                let that = this

                const EditarUsuario = this.getView().getModel("EditarUsuario").oData;

                oUsuarioEditado.NombreServer = Servidor;
                oUsuarioEditado.NombreUser = EditarUsuario.NombreUser;
                oUsuarioEditado.TipoUser = EditarUsuario.TipoUser;
                oUsuarioEditado.Nivel = EditarUsuario.Nivel;

                oModel.update("/UsuariosSet(NombreServer='"+ oUsuarioEditado.NombreServer +"',NombreUser='"+ oUsuarioEditado.NombreUser +"')", oUsuarioEditado, {

                    success: function () {

                        MessageToast.show("Usuario editado con éxito")

                        that.pEditarUsuario.then(function (oDialogo) {
                            oDialogo.close()
                        })
                        that._getUsuarios(Servidor)

                    },
                    error: function (oError) {
                        MessageToast.show("Ha ocurrido un error inesperado.")
                    }

                })

            },

            changeNombreUser: function (oEvent) {
                const newNombreUser = oEvent.getParameter("value")
                let oModel = this.getView().getModel("EditarUsuario")

                oModel.setProperty("/NombreUser", newNombreUser)

            },

            changeTipoUser: function (oEvent) {
                const newTipoUser = oEvent.getParameters().selectedItem.mProperties.text
                let oModel = this.getView().getModel("EditarUsuario")

                oModel.setProperty("/TipoUser", newTipoUser)
            },

            changeNivel: function (oEvent) {
                const newNivel = oEvent.getParameter("value")
                let oModel = this.getView().getModel("EditarUsuario")

                oModel.setProperty("/Nivel", newNivel)
            },

        });

    });