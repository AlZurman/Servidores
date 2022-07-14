/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"academia2022/zservidores/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
