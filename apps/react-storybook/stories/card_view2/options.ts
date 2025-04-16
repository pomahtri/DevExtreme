// @ts-nocheck

import { Meta } from "@storybook/react";
import { data } from "./data/local";
import { store, storeInvalid } from "./data/remote";
import { fn } from '@storybook/test';
import { renderFooter } from "../card_view/templates";

const dataControllerArgs = {
  dataSource: {
    control: 'radio',
    options: ['remote', 'local', 'empty', 'invalid'],
    mapping: {
      remote: store,
      local: data,
      empty: [],
      invalid: storeInvalid,
    },
    additionalProps: {
      addCustomValue: true,
      default: 'local',
    },
  },
  keyExpr: {
    control: 'text',
    additionalProps: {
      default: 'OrderNumber'
    }
  },
  onDataErrorOccurred: {
    additionalProps: {
      default: fn()
    }
  },
  'paging.enabled': {
    control: 'boolean',
  },
  'paging.pageIndex': {
    control: 'number',
  },
  'paging.pageSize': {
    control: 'number', 
  },
  'sorting.mode': {
    control: 'radio',
    options: ['none', 'single', 'multiple'],
    additionalProps: {
      default: 'none'
    }
  },
  'filterValue': {
    control: 'object',
  },
  'filterPanel.visible': {
    control: 'boolean'
  },
  'filterPanel.filterEnabled': {
    control: 'boolean'
  },
  'headerFilter.visible': {
    control: 'boolean'
  },
  'noDataText': {
    control: 'text'
  },
  'searchPanel.highlightCaseSensitive': {
    control: 'boolean'
  },
  'searchPanel.highlightSearchText': {
    control: 'boolean'
  },
  'searchPanel.placeholder': {
    control: 'text'
  },
  'searchPanel.searchVisibleColumnsOnly': {
    control: 'boolean'
  },
  'searchPanel.text': {
    control: 'text'
  },
  'searchPanel.visible': {
    control: 'boolean'
  },
  'selection.mode': {
    control: 'radio',
    options: ['none', 'single', 'multiple']
  },
  'selection.showCheckBoxesMode': {
    control: 'radio',
    options: ['always', 'none', 'onClick', 'onLongTap']
  },
  'selection.allowSelectAll': {
    control: 'boolean',
  },
  'selection.selectAllMode': {
    control: 'radio',
    options: ['allPages', 'page']
  },
  'columnChooser.enabled': {
    control: 'boolean',
  },
  'columnChooser.mode': {
    control: 'radio',
    options: ['select', 'dragAndDrop']
  },
  'toolbar.visible': {
    control: 'boolean',
  },
  'toolbar.disabled': {
    control: 'boolean',
  },
  'headerPanel.visible': {
    control: 'boolean',
  },
  'cardsPerRow': {
    options: ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    control: { type: 'select' },
  },
  cardMinWidth: {
    control: 'number'
  },
  cardMaxWidth: {
    control: 'number'
  },
  wordWrapEnabled: {
    control: 'boolean'
  },
  'cardCover.imageExpr': {
    control: 'radio',
    options: ['image', 'none'],
    mapping: {
      image: 'image',
      none: undefined
    }
  },
  'cardCover.maxHeight': {
    control: 'number',
  },
  'cardCover.ratio': {
    control: 'text'
  },
  'cardFooterTemplate': {
    control: 'radio',
    options: ['yes', 'no'],
    mapping: {
      yes: renderFooter,
      no: undefined,
    }
  },
}

const options = {
  ...dataControllerArgs
}

function processArgs(object) {
  const defaultArgs = {};
  const entries = Object.entries(object);
  const handlers = [];

  const processedEntries = entries.flatMap(([k, v]) => {
    const {additionalProps, ...resultValue} = v;
    const ret = [[k, resultValue]];

    if (additionalProps?.default) {
      defaultArgs[k] = additionalProps?.default;
    }

    if (additionalProps?.addCustomValue) {
      resultValue.options.push('<custom>');
      resultValue.mapping['<custom>'] = '<custom>';
      ret.push([
        `${k}-custom`, 
        {
          control: 'object',
          if: {arg: k, eq: '<custom>'}
        }
      ]);

      handlers.push((props) => {
        if (props[k] === '<custom>') {
          const newProps = {...props};
          newProps[k] = newProps[`${k}-custom`];
          delete newProps[`${k}-custom`];
          return newProps;
        }

        return props;
      })

      defaultArgs[`${k}-custom`] = v.mapping[additionalProps?.default];
    }

    return ret;

  });

  const argTypes = Object.fromEntries(processedEntries);

  const getActualOptions = (props) => {
    let result = props;
    for (let handler of handlers) {
      result = handler(result);
    }

    return result;
  };

  return {argTypes, getActualOptions, defaultArgs};
}

const {argTypes, getActualOptions, defaultArgs} = processArgs(options);

console.log(defaultArgs)

export {
  argTypes, getActualOptions, defaultArgs
}
