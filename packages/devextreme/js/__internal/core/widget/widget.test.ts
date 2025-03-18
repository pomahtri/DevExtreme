import { describe, expect, it } from '@jest/globals';

import type Widget from './widget';

it.skip('filler test', () => {});

export interface TestModel {
  widget: typeof Widget;
  anyNestedOption: {
    name: string;
    initialValue: unknown;
    customValue: unknown;
  };
}

export function testFabric(model: TestModel): void {
  describe('regressions', () => {
    it('should not have leaks to defaultOptions after changing option', () => {
      const container = document.createElement('div');
      // @ts-expect-error
      // eslint-disable-next-line new-cap
      let widget = new model.widget(container, {});

      expect(widget.option(model.anyNestedOption.name)).toBe(model.anyNestedOption.initialValue);

      widget.option('pager.showPageSizeSelector', model.anyNestedOption.customValue);
      expect(widget.option(model.anyNestedOption.name)).toBe(model.anyNestedOption.customValue);

      widget.dispose();

      // @ts-expect-error
      // eslint-disable-next-line new-cap
      widget = new model.widget(container, {});
      expect(widget.option(model.anyNestedOption.name)).toBe(model.anyNestedOption.initialValue);
    });
  });
}
