/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from '@jest/globals';
import type Widget from '@ts/core/widget/widget';
import * as widget from '@ts/core/widget/widget.test';

import { CardView } from './widget';

describe('common', () => {
  describe('initial render', () => {
    it('should be successfull', () => {
      const container = document.createElement('div');
      const cardView = new CardView(container, {});

      expect(container).toMatchSnapshot();
    });
  });
});

widget.testFabric({
  widget: CardView as unknown as typeof Widget,
  anyNestedOption: {
    name: 'pager.showPageSizeSelector',
    initialValue: false,
    customValue: true,
  },
});
