"use strict";

var $ = require("jquery"),
    vizMocks = require("../../helpers/vizMocks.js"),
    translator2DModule = require("viz/translators/translator2d"),
    rangeViewModule = require("viz/range_selector/range_view");

QUnit.module("RangeView", {
    beforeEach: function() {
        this.renderer = new vizMocks.Renderer();
        this.root = new vizMocks.Element();
        this.translator = { tag: "translator" };
        this.rangeView = new rangeViewModule.RangeView({
            renderer: this.renderer,
            root: this.root,
            translator: this.translator
        });
        this.canvas = { left: 10, top: 20, width: 200, height: 100 };
    }
});

QUnit.test("Clip rect", function(assert) {
    assert.deepEqual(this.renderer.clipRect.lastCall.args, [], "created");
    assert.deepEqual(this.root.attr.lastCall.args, [{ "clip-path": this.renderer.clipRect.lastCall.returnValue.id }], "applied to root");
});

QUnit.test("Rect and image are created", function(assert) {
    this.rangeView.update({ color: "red", image: { url: "url" } }, { visible: true, image: { location: "loc" } }, this.canvas);

    assert.deepEqual(this.root.clear.lastCall.args, [], "root is cleared");
    assert.deepEqual(this.renderer.clipRect.lastCall.returnValue.attr.lastCall.args, [{ x: 10, y: 20, width: 200, height: 100 }], "clip rect");
    assert.deepEqual(this.renderer.rect.lastCall.args, [10, 20, 201, 100], "rect is created");
    assert.deepEqual(this.renderer.rect.lastCall.returnValue.attr.lastCall.args, [{ "class": "dx-range-selector-background", fill: "red" }], "rect settings");
    assert.deepEqual(this.renderer.rect.lastCall.returnValue.append.lastCall.args, [this.root], "rect is appended");
    assert.deepEqual(this.renderer.image.lastCall.args, [10, 20, 201, 100, "url", "loc"], "image is created");
    assert.deepEqual(this.renderer.image.lastCall.returnValue.append.lastCall.args, [this.root], "image is appended");
});

QUnit.test("Rect is not created because of 'color' option", function(assert) {
    this.rangeView.update({ image: { url: "url" } }, { visible: true, image: { location: "loc" } }, this.canvas);

    assert.strictEqual(this.renderer.stub("rect").lastCall, null);
});

QUnit.test("Image is not created because of 'url' option", function(assert) {
    this.rangeView.update({ color: "red" }, { visible: true, image: { location: "loc" } }, this.canvas);

    assert.strictEqual(this.renderer.stub("image").lastCall, null);
});

QUnit.test("Rect and image are not created because of 'visible' option", function(assert) {
    this.rangeView.update({ visible: false, color: "red", image: { url: "url" } }, { visible: true, image: { location: "loc" } }, this.canvas);

    assert.strictEqual(this.renderer.stub("rect").lastCall, null);
    assert.strictEqual(this.renderer.stub("image").lastCall, null);
});

QUnit.test("Chart view", function(assert) {
    var series = [{ _extGroups: {}, draw: sinon.spy() }, { _extGroups: {}, draw: sinon.spy() }],
        seriesDataSource = {
            isShowChart: function() { return true; },
            getSeries: function() { return series; },
            getBoundRange: function() { return { val: "bound-range" }; },
            adjustSeriesDimensions: sinon.spy()
        },
        translator = { tag: "translator-2" },
        Translator2D = sinon.stub(translator2DModule, "Translator2D", function() {
            return translator;
        }),
        root = this.root,
        translators = { x: this.translator, y: translator };

    try {
        this.rangeView.update({ color: "red", image: { url: "url" } }, { visible: true, image: { location: "loc" } }, this.canvas, false, "animation-enabled", seriesDataSource);

        assert.deepEqual(Translator2D.lastCall.args, ["bound-range", { top: 20, height: 120 }], "translator is created");
        assert.deepEqual(seriesDataSource.adjustSeriesDimensions.lastCall.args, [translators], "series dimensions");
        $.each(series, function(i, item) {
            assert.strictEqual(item._extGroups.seriesGroup, root.children[2], "series group - " + i);
            assert.strictEqual(item._extGroups.labelsGroup, root.children[2], "labels group - " + i);
            assert.deepEqual(item.draw.lastCall.args, [translators, "animation-enabled"], "series draw - " + i);
        });
    } finally {
        Translator2D.restore();
    }
});

QUnit.test("Chart view is not created because of seriesDataSource", function(assert) {
    var seriesDataSource = { isShowChart: function() { return false; } },
        Translator2D = sinon.spy(translator2DModule, "Translator2D");

    try {
        this.rangeView.update({ color: "red", image: { url: "url" } }, { visible: true, image: { location: "loc" } }, this.canvas, false, "animation-enabled", seriesDataSource, "translator");

        assert.strictEqual(Translator2D.lastCall, null);
    } finally {
        Translator2D.restore();
    }
});

QUnit.test("Nothing is created when mode is compact", function(assert) {
    this.rangeView.update({ color: "red", image: { url: "url" } }, { visible: true, image: { location: "loc" } }, this.canvas, true);

    assert.deepEqual(this.root.clear.lastCall.args, [], "root is cleared");
    assert.deepEqual(this.renderer.clipRect.lastCall.returnValue.attr.lastCall.args, [{ x: 10, y: 20, width: 200, height: 100 }], "clip rect");
    assert.strictEqual(this.renderer.stub("rect").lastCall, null);
    assert.strictEqual(this.renderer.stub("image").lastCall, null);
});
