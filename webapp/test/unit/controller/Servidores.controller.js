/*global QUnit*/

sap.ui.define([
	"academia2022/zservidores/controller/Servidores.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Servidores Controller");

	QUnit.test("I should test the Servidores controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
