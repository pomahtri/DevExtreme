var $ = require('jquery'),
    SelectBox = require('ui/select_box'),
    DataSource = require('data/data_source/data_source').DataSource,
    CustomStore = require('data/custom_store'),
    fx = require('animation/fx'),
    hasWindow = require('core/utils/window').hasWindow;

require('common.css!');
require('generic_light.css!');

QUnit.testStart(function() {
    var markup =
        '<div id="qunit-fixture">\
            <div id="selectBox"></div>\
            \
            <div id="selectBoxFieldTemplateWithoutTextBox">\
                <div data-options="dxTemplate: { name: \'field\' }">\
                    <span>test</span>\
                </div>\
            </div>\
            \
            <div id="selectBoxFieldTemplate">\
                <div data-options="dxTemplate: { name: \'field\' }">\
                    fieldTemplate\
                </div>\
                <div data-options="dxTemplate: { name: \'item\'}">\
                    itemTemplate\
                </div>\
            </div>\
        </div>';

    $('#qunit-fixture').html(markup);
});

var WIDGET_CLASS = 'dx-selectbox',
    POPUP_CLASS = 'dx-selectbox-popup',
    LIST_ITEM_CLASS = 'dx-list-item',
    LIST_ITEM_SELECTED_CLASS = 'dx-list-item-selected',
    PLACEHOLDER_CLASS = 'dx-placeholder',
    TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';

var TIME_TO_WAIT = 500;

var moduleSetup = {
    beforeEach: function() {
        SelectBox.defaultOptions({ options: { deferRendering: false } });
        fx.off = true;
        this.clock = sinon.useFakeTimers();
    },
    afterEach: function() {
        fx.off = false;
        this.clock.restore();
    }
};

QUnit.module('rendering', moduleSetup, () => {
    QUnit.test('markup init', function(assert) {
        var $element = $('#selectBox').dxSelectBox(),
            instance = $element.dxSelectBox('instance');

        assert.ok($element.hasClass(WIDGET_CLASS));

        if(hasWindow()) {
            var $list = $element.find('.dx-list'),
                $popup = $(instance._popup.$element());

            assert.ok($popup.hasClass(POPUP_CLASS));
            assert.ok($list.is(':hidden'), 'when start list is hidden');
        }

    });

    QUnit.test('render selected item', function(assert) {
        var $element = $('#selectBox').dxSelectBox({
            items: ['first', 'second', 'third'],
            value: 'second'
        });

        this.clock.tick(TIME_TO_WAIT);

        assert.equal($element.find('.' + TEXTEDITOR_INPUT_CLASS).val(), 'second', 'SelectBox has the correct value');

        if(hasWindow()) {
            var $list = $element.find('.dx-list');
            assert.ok($list.find('.' + LIST_ITEM_CLASS).eq(1).hasClass(LIST_ITEM_SELECTED_CLASS), 'SelectBox has selected class, when value was set');
        }
    });
});

QUnit.module('hidden input', moduleSetup, () => {
    QUnit.test('a hidden input should be rendered', function(assert) {
        var $element = $('#selectBox').dxSelectBox(),
            $input = $element.find('input[type=\'hidden\']');

        assert.equal($input.length, 1, 'a hidden input is rendered');
    });

    QUnit.test('the hidden input should have correct value on widget init', function(assert) {
        var $element = $('#selectBox').dxSelectBox({
                items: [1, 2, 3],
                value: 2
            }),
            $input = $element.find('input[type=\'hidden\']');

        assert.equal($input.val(), '2', 'input value is correct');
    });

    QUnit.test('the hidden input should get display text as value if widget value is an object', function(assert) {
        var items = [{ id: 1, text: 'one' }],
            $element = $('#selectBox').dxSelectBox({
                items: items,
                value: items[0],
                valueExpr: 'this',
                displayExpr: 'text'
            }),
            $input = $element.find('input[type=\'hidden\']');

        assert.equal($input.val(), items[0].text, 'input value is correct');
    });

    QUnit.test('the submit value must be equal to the value of the widget', function(assert) {
        var items = ['test'],
            $element = $('#selectBox').dxSelectBox({
                items: items,
                value: items[0],
                valueExpr: 'this',
                displayExpr: function(item) {
                    if(item) {
                        return item + '123';
                    }
                }
            }),
            $input = $element.find('input[type=\'hidden\']');

        assert.deepEqual($input.val(), items[0], 'input value is correct');
    });

    QUnit.test('the hidden input should get value in respect of the \'valueExpr\' option', function(assert) {
        var items = [{ id: 1, text: 'one' }],
            $element = $('#selectBox').dxSelectBox({
                items: items,
                value: items[0].id,
                valueExpr: 'id',
                displayExpr: 'text'
            }),
            $input = $element.find('input[type=\'hidden\']');

        assert.equal($input.val(), items[0].id, 'input value is correct');
    });
});

QUnit.module('widget options', moduleSetup, () => {
    QUnit.test('widget hidden input should get the \'name\' attribute with a correct value', function(assert) {
        var expectedName = 'some_name',
            $element = $('#selectBox').dxSelectBox({
                name: expectedName
            }),
            $input = $element.find('input[type=\'hidden\']');

        assert.equal($input.attr('name'), expectedName, 'the input \'name\' attribute has correct value');
    });

    QUnit.test('widget should render correct input\'s value according the displayExpr', function(assert) {
        var items = [
            { number: 1, caption: 'one' },
            { number: 2, caption: 'two' }
        ];

        var $element = $('#selectBox')
            .dxSelectBox({
                items: items,
                valueExpr: 'number',
                displayExpr: 'caption',
                value: 1
            });

        this.clock.tick(TIME_TO_WAIT);

        var $input = $element.find('.' + TEXTEDITOR_INPUT_CLASS);
        assert.equal($input.val(), 'one', 'input contains value of the \'caption\' field');
    });

    QUnit.test('set value using dataSource instead of store', function(assert) {
        var arrayStore = [
            { key: 1, value: 'one' },
            { key: 2, value: 'two' },
            { key: 3, value: 'three' },
            { key: 4, value: 'four' }
        ];
        var dataSource = new DataSource({
            store: arrayStore,
            filter: ['key', '>', 2]
        });

        var selectBox = $('#selectBox').dxSelectBox({
            dataSource: dataSource,
            displayExpr: 'value',
            valueExpr: 'key',
            value: 1
        }).dxSelectBox('instance');

        assert.equal(selectBox.option('displayValue'), null, 'display value is not defined');
    });

    QUnit.test('placeholder', function(assert) {
        var $element = $('#selectBox')
            .dxSelectBox({
                placeholder: 'John Doe'
            });

        assert.equal($element.find('.' + PLACEHOLDER_CLASS).attr('data-dx_placeholder'), 'John Doe');
    });

    QUnit.test('fieldTemplate should contain dxTextBox inside', function(assert) {
        assert.throws(function() {
            $('#selectBoxFieldTemplateWithoutTextBox').dxSelectBox({ fieldTemplate: 'field' });
        });
    });

    QUnit.test('check fieldTemplate', function(assert) {
        var $element = $('#selectBoxFieldTemplate').dxSelectBox({
                dataSource: [
                    { ID: 1, name: 'First' },
                    { ID: 2, name: 'Second' },
                    { ID: 3, name: 'Third' }
                ],
                fieldTemplate: function(selectedItem) {
                    return $('<div id=\'myfield\'>').dxTextBox({
                        value: selectedItem ? selectedItem.ID + ' - ' + selectedItem.name : ''
                    });
                },
                valueExpr: 'ID',
                value: 1
            }),
            $input = $element.find('.' + TEXTEDITOR_INPUT_CLASS);

        assert.equal($input.val(), '1 - First', 'value is correct');
    });

    QUnit.test('displayCustomValue enabled', function(assert) {
        var $selectBox = $('#selectBox').dxSelectBox({
            items: [1, 2, 3],
            displayCustomValue: true,
            value: 'test',
            placeholder: ''
        });
        this.clock.tick(TIME_TO_WAIT);
        assert.equal($selectBox.find('.' + TEXTEDITOR_INPUT_CLASS).val(), 'test', 'custom value displayed');
    });

    QUnit.test('value should not be displayed when it is not in dataSource', function(assert) {
        var $selectBox = $('#selectBox').dxSelectBox({
            dataSource: [1, 2, 3],
            value: 'test'
        });

        this.clock.tick(TIME_TO_WAIT);

        var $input = $selectBox.find('.' + TEXTEDITOR_INPUT_CLASS);
        assert.equal($input.val(), '', 'input value is empty');
    });
});

QUnit.module('regressions', moduleSetup, () => {
    QUnit.test('dataSource.byKey method should not be called if value is not set (T115847)', function(assert) {
        var byKeyCalled = $.Deferred();

        $('#selectBox').dxSelectBox({
            dataSource: {
                load: function() {
                    return $.when();
                },
                byKey: function() {
                    byKeyCalled.resolve();
                    return byKeyCalled.promise();
                }
            }
        });

        assert.notStrictEqual(byKeyCalled.state(), 'resolved');
    });

    QUnit.test('T427723: dxSelectBox placed in a custom Angular directive throws the \'Cannot read property \'dxButton\' of undefined\' error', function(assert) {
        var items = [
            { id: 1, text: 'Item 1' },
            { id: 2, text: 'Item 2' },
            { id: 3, text: 'Item 3' }
        ];

        try {
            $('#selectBox').dxSelectBox({
                displayExpr: 'name',
                valueExpr: 'id',
                deferRendering: false,
                openOnFieldClick: false,
                dataSource: new CustomStore({
                    key: 'id',
                    load: function() {
                        return items;
                    },
                    byKey: function(key) {
                        var d = $.Deferred();
                        setTimeout(function(i) {
                            items.forEach(function(i) {
                                if(i.id === key) {
                                    d.resolve(i);
                                    return;
                                }
                            });
                        });
                        return d.promise();
                    }
                }),
                value: [1, 2]
            }).dxSelectBox('instance');

            assert.ok(true, 'exception is not expected');
        } catch(_) {
            assert.ok(false, 'exception');
        }
    });
});

