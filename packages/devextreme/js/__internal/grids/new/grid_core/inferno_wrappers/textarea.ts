import type { Properties as TextAreaProperties } from '@js/ui/text_area';
import dxTextArea from '@js/ui/text_area';

import { InfernoWrapper } from './widget_wrapper';

export class TextArea extends InfernoWrapper<TextAreaProperties, dxTextArea> {
  protected getComponentFabric(): typeof dxTextArea {
    return dxTextArea;
  }
}
