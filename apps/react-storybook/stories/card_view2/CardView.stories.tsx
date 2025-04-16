// @ts-nocheck

import React from 'react';

import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from "@storybook/react";

import dxCardView from "devextreme/ui/card_view";
import { wrapDxWithReact } from "../utils";
import { argTypes, getActualOptions, defaultArgs } from "./options";

const CardView = wrapDxWithReact(dxCardView);

const meta: Meta<typeof CardView> = {
  title: "Grids/CardView2",
  component: CardView,
  argTypes,
  render: (props) => {
    const [, updateArgs] = useArgs();
    const actualProps = getActualOptions(props);

    console.log('story render', actualProps);

    return <CardView
      columns={["OrderNumber", "SaleAmount", "StoreCity", "StoreState", "Employee", "OrderDate"]}
      onOptionChanged={(e) => {
        if (e.name === 'dataSource' || e.name === 'columns') {
          return;
        }

        console.log('optionChanged', e);

        // updateArgs({
        //   [e.fullName]: e.value
        // })
      }}
      onInitialized={(e) => {
        window.dxcomponent = e.component;
      }}
      {...actualProps}
    />
  }
}

export default meta;

export const Overview = {
  args: defaultArgs,
}