import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { createReRenderEffect, InfernoEffect, InfernoWrapperComponent } from '@devextreme/runtime/inferno';
import {
  createComponentVNode, createRef as infernoCreateRef, createVNode, normalizeProps,
} from 'inferno';

import devices from '../../core/devices';
import { convertRulesToOptions, createDefaultOptionRules } from '../../core/options/utils';
import { getImageSourceType } from '../../core/utils/icon';
import { camelize } from '../../core/utils/inflector';
import { click } from '../../events/short';
import messageLocalization from '../../localization/message';
import { current, isMaterial } from '../../ui/themes';
import { combineClasses } from '../utils/combine_classes';
import { BaseWidgetProps } from './common/base_props';
import { Icon } from './common/icon';
import { InkRipple } from './common/ink_ripple';
import { Widget } from './common/widget';
import type { ButtonProps } from './props';
import { defaultButtonProps } from './props';

const _excluded = ['accessKey', 'activeStateEnabled', 'children', 'className', 'disabled', 'focusStateEnabled', 'height', 'hint', 'hoverStateEnabled', 'icon', 'iconPosition', 'iconTemplate', 'onClick', 'onKeyDown', 'onSubmit', 'pressed', 'rtlEnabled', 'stylingMode', 'tabIndex', 'template', 'templateData', 'text', 'type', 'useInkRipple', 'useSubmitBehavior', 'visible', 'width'];

const stylingModes = ['outlined', 'text', 'contained'];

const getCssClasses = (model) => {
  const {
    icon,
    iconPosition,
    stylingMode,
    text,
    type,
  } = model;
  const isValidStylingMode = stylingMode && stylingModes.includes(stylingMode);
  const classesMap = {
    'dx-button': true,
    [`dx-button-mode-${isValidStylingMode ? stylingMode : 'contained'}`]: true,
    [`dx-button-${type ?? 'normal'}`]: true,
    'dx-button-has-text': !!text,
    'dx-button-has-icon': !!icon,
    'dx-button-icon-right': iconPosition !== 'left',
  };
  return combineClasses(classesMap);
};

export const defaultOptionRules = createDefaultOptionRules([{
  device: () => devices.real().deviceType === 'desktop' && !devices.isSimulator(),
  options: {
    focusStateEnabled: true,
  },
}, {
  device: () => isMaterial(current()),
  options: {
    useInkRipple: true,
  },
}]);

const getTemplate = (TemplateProp) => TemplateProp && (TemplateProp.defaultProps ? (props) => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class Button extends InfernoWrapperComponent<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = {};
    this.contentRef = infernoCreateRef();
    this.inkRippleRef = infernoCreateRef();
    this.submitInputRef = infernoCreateRef();
    this.widgetRef = infernoCreateRef();
    this.__getterCache = {};
    this.focus = this.focus.bind(this);
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.submitEffect = this.submitEffect.bind(this);
    this.onActive = this.onActive.bind(this);
    this.onInactive = this.onInactive.bind(this);
    this.onWidgetClick = this.onWidgetClick.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.emitClickEvent = this.emitClickEvent.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.submitEffect, [this.props.onSubmit, this.props.useSubmitBehavior]), createReRenderEffect()];
  }

  updateEffects() {
    let _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 || _this$_effects$.update([this.props.onSubmit, this.props.useSubmitBehavior]);
  }

  submitEffect() {
    const namespace = 'UIFeedback';
    const {
      onSubmit,
      useSubmitBehavior,
    } = this.props;
    if (useSubmitBehavior && onSubmit) {
      click.on(this.submitInputRef.current, (event) => onSubmit({
        event,
        submitInput: this.submitInputRef.current,
      }), {
        namespace,
      });
      return () => click.off(this.submitInputRef.current, {
        namespace,
      });
    }
    return undefined;
  }

  onActive(event) {
    const {
      useInkRipple,
    } = this.props;
    useInkRipple && this.inkRippleRef.current.showWave({
      element: this.contentRef.current,
      event,
    });
  }

  onInactive(event) {
    const {
      useInkRipple,
    } = this.props;
    useInkRipple && this.inkRippleRef.current.hideWave({
      element: this.contentRef.current,
      event,
    });
  }

  onWidgetClick(event) {
    const {
      onClick,
      useSubmitBehavior,
    } = this.props;
    onClick === null || onClick === void 0 || onClick({
      event,
    });
    useSubmitBehavior && this.submitInputRef.current.click();
  }

  keyDown(e) {
    const {
      onKeyDown,
    } = this.props;
    const {
      keyName,
      originalEvent,
      which,
    } = e;
    const result = onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
    if (result !== null && result !== void 0 && result.cancel) {
      return result;
    }
    if (keyName === 'space' || which === 'space' || keyName === 'enter' || which === 'enter') {
      originalEvent.preventDefault();
      this.emitClickEvent();
    }
    return undefined;
  }

  emitClickEvent() {
    this.contentRef.current.click();
  }

  get aria() {
    const {
      icon,
      text,
    } = this.props;
    let label = text ?? '';
    if (!text && icon) {
      const iconSource = getImageSourceType(icon);
      switch (iconSource) {
        case 'image':
        {
          const notURLRegexp = /^(?!(?:https?:\/\/)|(?:ftp:\/\/)|(?:www\.))[^\s]+$/;
          const isPathToImage = !icon.includes('base64') && notURLRegexp.test(icon);
          label = isPathToImage ? icon.replace(/.+\/([^.]+)\..+$/, '$1') : '';
          break;
        }
        case 'dxIcon':
          label = messageLocalization.format(camelize(icon, true)) || icon;
          break;
        case 'fontIcon':
          label = icon;
          break;
        case 'svg':
        {
          let _titleRegexp$exec;
          const titleRegexp = /<title>(.*?)<\/title>/;
          const title = ((_titleRegexp$exec = titleRegexp.exec(icon)) === null || _titleRegexp$exec === void 0 ? void 0 : _titleRegexp$exec[1]) ?? '';
          label = title;
          break;
        }
        default:
          break;
      }
    }
    return _extends({
      role: 'button',
    }, label ? {
      label,
    } : {});
  }

  get cssClasses() {
    return getCssClasses(this.props);
  }

  get iconSource() {
    const {
      icon,
    } = this.props;
    return icon ?? '';
  }

  get inkRippleConfig() {
    if (this.__getterCache.inkRippleConfig !== undefined) {
      return this.__getterCache.inkRippleConfig;
    }
    return this.__getterCache.inkRippleConfig = (() => {
      const {
        icon,
        text,
      } = this.props;
      return !text && icon ? {
        isCentered: true,
        useHoldAnimation: false,
        waveSizeCoefficient: 1,
      } : {};
    })();
  }

  get buttonTemplateData() {
    const {
      icon,
      templateData,
      text,
    } = this.props;
    return _extends({
      icon,
      text,
    }, templateData);
  }

  get restAttributes() {
    const _this$props = this.props;
    const restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }

  focus() {
    this.widgetRef.current.focus();
  }

  activate() {
    this.widgetRef.current.activate();
  }

  deactivate() {
    this.widgetRef.current.deactivate();
  }

  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate();
    if (this.props.icon !== nextProps.icon || this.props.text !== nextProps.text) {
      this.__getterCache.inkRippleConfig = undefined;
    }
  }

  render() {
    const {
      children,
      iconPosition,
      text,
    } = this.props;

    const ButtonTemplate = getTemplate(this.props.template);
    const IconTemplate = getTemplate(this.props.iconTemplate);

    const renderText = !this.props.template && !children && text !== '';
    const isIconLeft = iconPosition === 'left';
    const iconComponent = !this.props.template && !children && (this.iconSource || this.props.iconTemplate) && createComponentVNode(2, Icon, {
      source: this.iconSource,
      position: iconPosition,
      iconTemplate: IconTemplate,
    });

    return normalizeProps(createComponentVNode(2, Widget, _extends({
      accessKey: this.props.accessKey,
      activeStateEnabled: this.props.activeStateEnabled,
      aria: this.aria,
      className: this.props.className,
      classes: this.cssClasses,
      disabled: this.props.disabled,
      focusStateEnabled: this.props.focusStateEnabled,
      height: this.props.height,
      hint: this.props.hint,
      hoverStateEnabled: this.props.hoverStateEnabled,
      onActive: this.onActive,
      onClick: this.onWidgetClick,
      onInactive: this.onInactive,
      onKeyDown: this.keyDown,
      rtlEnabled: this.props.rtlEnabled,
      tabIndex: this.props.tabIndex,
      visible: this.props.visible,
      width: this.props.width,
    }, this.restAttributes, {
      children: createVNode(1, 'div', 'dx-button-content', [this.props.template && ButtonTemplate({
        data: this.buttonTemplateData,
      }), !this.props.template && children, isIconLeft && iconComponent, renderText && createVNode(1, 'span', 'dx-button-text', text, 0), !isIconLeft && iconComponent, this.props.useSubmitBehavior && createVNode(64, 'input', 'dx-button-submit-input', null, 1, {
        type: 'submit',
        tabIndex: -1,
      }, null, this.submitInputRef), this.props.useInkRipple && createComponentVNode(2, InkRipple, {
        config: this.inkRippleConfig,
      }, null, this.inkRippleRef)], 0, null, null, this.contentRef),
    }), null, this.widgetRef));
  }
}
Button.defaultProps = defaultButtonProps;

const __defaultOptionRules = [];
export function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  Button.defaultProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(Button.defaultProps), Object.getOwnPropertyDescriptors(convertRulesToOptions(defaultOptionRules)), Object.getOwnPropertyDescriptors(convertRulesToOptions(__defaultOptionRules))));
}
