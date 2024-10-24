/**
* DevExtreme (esm/renovation/ui/common/icon.js)
* Version: 24.2.0
* Build date: Tue Oct 22 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import {
  createComponentVNode, createFragment, createVNode, Fragment, normalizeProps,
} from 'inferno';

import { getImageSourceType } from '../../../core/utils/icon';
import { combineClasses } from '../../utils/combine_classes';

const _excluded = ['iconTemplate', 'position', 'source'];
export const viewFunction = (_ref) => {
  const {
    iconClassName,
    props: {
      iconTemplate: IconTemplate,
      source,
    },
    sourceType,
  } = _ref;
  return createFragment([sourceType === 'dxIcon' && createVNode(1, 'i', iconClassName), sourceType === 'fontIcon' && createVNode(1, 'i', iconClassName), sourceType === 'image' && createVNode(1, 'img', iconClassName, null, 1, {
    alt: '',
    src: source,
  }), IconTemplate && createVNode(1, 'i', iconClassName, IconTemplate({}), 0)], 0);
};
export const IconProps = {
  position: 'left',
  source: '',
};
const getTemplate = (TemplateProp) => TemplateProp && (TemplateProp.defaultProps ? (props) => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class Icon extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get sourceType() {
    return getImageSourceType(this.props.source);
  }

  get cssClass() {
    return this.props.position !== 'left' ? 'dx-icon-right' : '';
  }

  get iconClassName() {
    const generalClasses = {
      'dx-icon': true,
      [this.cssClass]: !!this.cssClass,
    };
    const {
      source,
    } = this.props;
    if (this.sourceType === 'dxIcon') {
      return combineClasses(_extends({}, generalClasses, {
        [`dx-icon-${source}`]: true,
      }));
    }
    if (this.sourceType === 'fontIcon') {
      return combineClasses(_extends({}, generalClasses, {
        [String(source)]: !!source,
      }));
    }
    if (this.sourceType === 'image') {
      return combineClasses(generalClasses);
    }
    if (this.sourceType === 'svg') {
      return combineClasses(_extends({}, generalClasses, {
        'dx-svg-icon': true,
      }));
    }
    return '';
  }

  get restAttributes() {
    const _this$props = this.props;
    const restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }

  render() {
    const { props } = this;
    return viewFunction({
      props: _extends({}, props, {
        iconTemplate: getTemplate(props.iconTemplate),
      }),
      sourceType: this.sourceType,
      cssClass: this.cssClass,
      iconClassName: this.iconClassName,
      restAttributes: this.restAttributes,
    });
  }
}
Icon.defaultProps = IconProps;
