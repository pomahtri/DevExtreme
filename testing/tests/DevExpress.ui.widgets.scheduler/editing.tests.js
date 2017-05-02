"use strict";

var $ = require("jquery"),
    devices = require("core/devices"),
    tooltip = require("ui/tooltip/ui.tooltip"),
    fx = require("animation/fx"),
    keyboardMock = require("../../helpers/keyboardMock.js");

require("common.css!");
require("generic_light.css!");
require("ui/scheduler/ui.scheduler");

QUnit.testStart(function() {
    $("#qunit-fixture").html('<div id="scheduler"></div>');
});

QUnit.module("Editing option: boolean", {
    beforeEach: function() {
        this.createInstance = function(options) {
            fx.off = true;

            options = options || {};
            options.editing = options.editing || false;
            this.instance = $("#scheduler").dxScheduler(options).dxScheduler("instance");
        };
    },
    afterEach: function() {
        fx.off = false;
    }
});

QUnit.test("Scheduler should have 'readonly' css class", function(assert) {
    this.createInstance();
    assert.ok(this.instance.element().hasClass("dx-scheduler-readonly"), "Readonly class is defined");

    this.instance.option("editing", true);
    assert.notOk(this.instance.element().hasClass("dx-scheduler-readonly"), "Readonly class is removed");
});

QUnit.test("popup should not be shown  after click on focused cell", function(assert) {
    this.createInstance();

    this.instance.element().find(".dx-scheduler-date-table-cell").first().trigger("dxpointerdown").trigger("dxpointerdown").trigger("dxclick");

    assert.notOk($(".dx-scheduler-appointment-popup .dx-overlay-content").length, "Popup is not shown");

});

QUnit.test("popup should not be shown after press Enter", function(assert) {
    this.createInstance({ focusStateEnabled: true });

    var $workSpace = this.instance.element().find(".dx-scheduler-work-space"),
        keyboard = keyboardMock($workSpace);

    $workSpace.trigger("focusin");
    keyboard.keyDown("enter");

    assert.notOk($(".dx-scheduler-appointment-popup .dx-overlay-content").length, "Popup is not shown");
});

QUnit.test("Appointment should not be draggable & resizable", function(assert) {
    this.createInstance({
        currentDate: new Date(2015, 5, 15),
        firstDayOfWeek: 1,
        dataSource: [{
            text: "a",
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 10, 30)
        }]
    });

    var appointments = this.instance.element().find(".dx-scheduler-scrollable-appointments").dxSchedulerAppointments("instance");
    assert.notOk(appointments.option("allowDrag"), "Drag is not allowed");
    assert.notOk(appointments.option("allowResize"), "Resize is not allowed");

    this.instance.option("editing", true);
    assert.ok(appointments.option("allowDrag"), "Drag is allowed");
    assert.ok(appointments.option("allowResize"), "Resize is allowed");
});

QUnit.test("Delete button should not be rendered in details tooltip", function(assert) {
    this.createInstance({
        currentDate: new Date(2015, 5, 15),
        firstDayOfWeek: 1,
        dataSource: [{
            text: "a",
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 10, 30)
        }]
    });

    var $appointment = this.instance.element().find(".dx-scheduler-appointment").first(),
        itemData = $appointment.data("dxItemData");

    this.instance.showAppointmentTooltip(itemData, $appointment);

    assert.equal($(".dx-scheduler-appointment-tooltip-buttons .dx-button").length, 1, "There is a one button in tooltip");

    tooltip.hide();
});

QUnit.test("Edit button should not be contain the 'pencil' icon", function(assert) {
    this.createInstance({
        currentDate: new Date(2015, 5, 15),
        firstDayOfWeek: 1,
        dataSource: [{
            text: "a",
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 10, 30)
        }]
    });

    var $appointment = this.instance.element().find(".dx-scheduler-appointment").first();

    var itemData = $appointment.data("dxItemData");

    this.instance.showAppointmentTooltip(itemData, $appointment);

    assert.notOk($(".dx-scheduler-appointment-tooltip-buttons .dx-button").hasClass("dx-button-has-icon"), "Edit button is OK");
    tooltip.hide();
});

QUnit.test("Cancel & Done buttons should not be rendered in details popup", function(assert) {
    this.createInstance();

    var appointment = {
        text: "a",
        startDate: new Date(2015, 5, 15, 10),
        endDate: new Date(2015, 5, 15, 11)
    };

    this.instance.fire("showEditAppointmentPopup", { data: appointment, target: $("<div>") });

    assert.notOk($(".dx-scheduler-appointment-popup .dx-popup-bottom .dx-button").length, "Buttons are not rendered");
});

QUnit.test("ReadOnly option should be passed to the details appointment view", function(assert) {
    this.createInstance();

    this.instance.showAppointmentPopup({
        text: "a",
        startDate: new Date(2015, 5, 15, 10),
        endDate: new Date(2015, 5, 15, 11)
    });

    var detailsAppointmentView = this.instance.getAppointmentDetailsForm();

    assert.ok(detailsAppointmentView.option("readOnly"), "ReadOnly option is correct");

    this.instance.option("editing", true);

    detailsAppointmentView = this.instance.getAppointmentDetailsForm();

    assert.notOk(detailsAppointmentView.option("readOnly"), "ReadOnly option is correct");
});

QUnit.test("Details appointment view should be readOnly if editing.allowUpdating=false", function(assert) {
    this.createInstance({
        editing: {
            allowUpdating: false
        }
    });

    this.instance.showAppointmentPopup({
        text: "a",
        startDate: new Date(2015, 5, 15, 10),
        endDate: new Date(2015, 5, 15, 11)
    });

    var detailsAppointmentView = this.instance.getAppointmentDetailsForm();

    assert.ok(detailsAppointmentView.option("readOnly"), "ReadOnly option is correct");

    this.instance.option("editing", {
        allowUpdating: true
    });

    detailsAppointmentView = this.instance.getAppointmentDetailsForm();

    assert.notOk(detailsAppointmentView.option("readOnly"), "ReadOnly option is correct");
});

QUnit.test("Details appointment view shouldn't be readOnly when adding new appointment if editing.allowUpdating=false", function(assert) {
    this.createInstance({
        currentDate: new Date(2015, 5, 14),
        editing: {
            allowUpdating: false,
            allowAdding: true
        }
    });

    this.instance.showAppointmentPopup({
        text: "a",
        startDate: new Date(2015, 12, 15, 10),
        endDate: new Date(2015, 12, 15, 11)
    }, true);

    var detailsAppointmentView = this.instance.getAppointmentDetailsForm();

    assert.notOk(detailsAppointmentView.option("readOnly"), "ReadOnly option is correct");
});

QUnit.module("Editing option: complex object", {
    beforeEach: function() {
        this.createInstance = function(options) {
            fx.off = true;

            options = options || {};
            !options.editing && (options.editing = {
                allowAdding: false,
                allowUpdating: false,
                allowDeleting: false,
                allowResizing: false,
                allowDragging: false
            });
            this.instance = $("#scheduler").dxScheduler(options).dxScheduler("instance");
        };
    },
    afterEach: function() {
        fx.off = false;
    }
});

QUnit.test("Scheduler should have 'readonly' css class for complex object editing option", function(assert) {
    this.createInstance();
    assert.ok(this.instance.element().hasClass("dx-scheduler-readonly"), "Readonly class is defined");

    this.instance.option("editing.allowUpdating", true);
    assert.notOk(this.instance.element().hasClass("dx-scheduler-readonly"), "Readonly class is removed");
});

QUnit.test("showAppointmentPopup method should not be called after click on focused cell if editing.allowAdding is false", function(assert) {
    this.createInstance({
        editing: {
            allowAdding: false
        }
    });
    var spy = sinon.spy(this.instance, "showAppointmentPopup");

    this.instance.element().find(".dx-scheduler-date-table-cell").first().trigger("dxpointerdown").trigger("dxpointerdown");

    assert.notOk(spy.called, "showAppointmentPopup is not called");

    this.instance.showAppointmentPopup.restore();
});

QUnit.test("Cancel & Done buttons should not be rendered in details popup if editing.allowUpdating is false", function(assert) {
    this.createInstance({
        editing: {
            allowUpdating: false
        }
    });

    var appointment = {
        text: "a",
        startDate: new Date(2015, 5, 15, 10),
        endDate: new Date(2015, 5, 15, 11)
    };

    this.instance.fire("showEditAppointmentPopup", { data: appointment, target: $("<div>") });

    assert.notOk($(".dx-scheduler-appointment-popup .dx-popup-bottom .dx-button").length, "Buttons are not rendered");
});

QUnit.test("Edit button should not be contain the 'pencil' icon if editing.allowUpdating is false", function(assert) {
    this.createInstance({
        editing: {
            allowUpdating: false
        },
        currentDate: new Date(2015, 5, 15),
        firstDayOfWeek: 1,
        dataSource: [{
            text: "a",
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 10, 30)
        }]
    });

    var $appointment = this.instance.element().find(".dx-scheduler-appointment").first(),
        itemData = $appointment.data("dxItemData");

    this.instance.showAppointmentTooltip(itemData, $appointment);

    var $button = $(".dx-scheduler-appointment-tooltip-buttons .dx-button");

    assert.equal($button.length, 2, "edit", "delete & edit button exists");
    assert.notOk($button.eq(1).hasClass("dx-button-has-icon"), "Edit button is OK");
    tooltip.hide();
});

QUnit.test("There is no need to check recurring appointment if editing.allowUpdating is false", function(assert) {
    this.createInstance({
        editing: {
            allowUpdating: false
        },
        currentDate: new Date(2015, 5, 15),
        firstDayOfWeek: 1,
        dataSource: [{
            text: "a",
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 10, 30),
            recurrenceRule: "FREQ=MONTHLY"
        }]
    });

    var $appointment = this.instance.element().find(".dx-scheduler-appointment").first(),
        itemData = $appointment.data("dxItemData");

    this.instance.showAppointmentTooltip(itemData, $appointment);

    var $buttons = $(".dx-scheduler-appointment-tooltip-buttons .dx-button");

    $buttons.eq(1).trigger("dxclick");
    assert.equal($(".dx-scheduler-appointment-popup").length, 2, "Popup is rendered instead of recurrence tooltip");
});

QUnit.test("Delete button should not exist if editing.allowUpdating is false", function(assert) {
    this.createInstance({
        editing: {
            allowDeleting: false
        },
        currentDate: new Date(2015, 5, 15),
        firstDayOfWeek: 1,
        dataSource: [{
            text: "a",
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 10, 30)
        }]
    });

    var $appointment = this.instance.element().find(".dx-scheduler-appointment").first(),
        itemData = $appointment.data("dxItemData");

    this.instance.showAppointmentTooltip(itemData, $appointment);

    var $button = $(".dx-scheduler-appointment-tooltip-buttons .dx-button");

    assert.equal($button.length, 1, "edit", "only one button");
    assert.ok($button.dxButton("instance").option("icon"), "edit", "Edit button is OK");
    tooltip.hide();
});

QUnit.test("Appointment should not be draggable & resizable if editing.allowUpdating is false", function(assert) {
    if(devices.real().platform !== "generic") {
        assert.ok(true, "test does not actual for mobile devices");
        return;
    }

    this.createInstance({
        editing: {
            allowUpdating: false
        },
        currentDate: new Date(2015, 5, 15),
        firstDayOfWeek: 1,
        dataSource: [{
            text: "a",
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 10, 30)
        }]
    });

    var appointments = this.instance.element().find(".dx-scheduler-scrollable-appointments").dxSchedulerAppointments("instance");
    assert.notOk(appointments.option("allowDrag"), "Drag is not allowed");
    assert.notOk(appointments.option("allowResize"), "Resize is not allowed");

    this.instance.option("editing", {
        allowUpdating: true
    });
    assert.ok(appointments.option("allowDrag"), "Drag is allowed");
    assert.ok(appointments.option("allowResize"), "Resize is allowed");
});

QUnit.test("Appointment should not be resizable if editing.allowResizing is false", function(assert) {
    this.createInstance({
        editing: {
            allowResizing: false
        },
        currentDate: new Date(2015, 5, 15),
        firstDayOfWeek: 1,
        dataSource: [{
            text: "a",
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 10, 30)
        }]
    });

    var appointments = this.instance.element().find(".dx-scheduler-scrollable-appointments").dxSchedulerAppointments("instance");
    assert.notOk(appointments.option("allowResize"), "Resize is not allowed");

    this.instance.option("editing", {
        allowResizing: true
    });
    assert.ok(appointments.option("allowResize"), "Resize is allowed");
});

QUnit.test("Appointment should not be draggable if editing.allowDragging is false", function(assert) {
    this.createInstance({
        editing: {
            allowDragging: false
        },
        currentDate: new Date(2015, 5, 15),
        firstDayOfWeek: 1,
        dataSource: [{
            text: "a",
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 10, 30)
        }]
    });

    var appointments = this.instance.element().find(".dx-scheduler-scrollable-appointments").dxSchedulerAppointments("instance");
    assert.notOk(appointments.option("allowDrag"), "Drag is not allowed");

    this.instance.option("editing", {
        allowDragging: true
    });
    assert.ok(appointments.option("allowDrag"), "Drag is allowed");
});

QUnit.test("Appointment should not be deleted, if allowUpdating || allowDeleting = false", function(assert) {
    this.createInstance({
        currentDate: new Date(2015, 5, 15),
        firstDayOfWeek: 1,
        dataSource: [{
            text: "a",
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 10, 30)
        }],
        editing: {
            allowUpdating: false,
            allowDeleting: false
        }
    });

    var appointments = this.instance.element().find(".dx-scheduler-scrollable-appointments").dxSchedulerAppointments("instance");
    assert.notOk(appointments.option("allowDelete"), "Delete is not allowed");

    this.instance.option("editing", {
        allowUpdating: false,
        allowDeleting: true
    });

    assert.notOk(appointments.option("allowDelete"), "Delete is not allowed");

    this.instance.option("editing", {
        allowUpdating: true,
        allowDeleting: true
    });

    assert.ok(appointments.option("allowDelete"), "Delete is allowed");
});
