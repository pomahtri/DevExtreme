const Globalize = require("globalize");
require('devextreme/animation/frame').cancelAnimationFrame;
require('devextreme/animation/frame').requestAnimationFrame;
require('devextreme/animation/fx');
require('devextreme/animation/presets');
require('devextreme/animation/transition_executor');
require('devextreme/core/component_registrator');
require('devextreme/core/config');
require('devextreme/core/devices');
require('devextreme/core/dom_component');
require('devextreme/core/guid');
require('devextreme/data/apply_changes');
require('devextreme/data/array_store');
require('devextreme/data/custom_store');
require('devextreme/data/data_source');
require('devextreme/data/endpoint_selector');
require('devextreme/data/errors').errorHandler;
require('devextreme/data/local_store');
require('devextreme/data/odata/context');
require('devextreme/data/odata/store');
require('devextreme/data/odata/utils').EdmLiteral;
require('devextreme/data/odata/utils').keyConverters;
require('devextreme/data/query');
require('devextreme/events/click');
require('devextreme/events/contextmenu');
require('devextreme/events/dblclick');
require('devextreme/events/drag');
require('devextreme/events/hold');
require('devextreme/events/hover');
require('devextreme/events/pointer');
require('devextreme/events/swipe');
require('devextreme/events/transform');
require('devextreme/events').on;
require('devextreme/events').one;
require('devextreme/events').off;
require('devextreme/events').trigger;
require('devextreme/events').triggerHandler;
require('devextreme/file_management/error');
require('devextreme/file_management/file_system_item');
require('devextreme/file_management/custom_provider');
require('devextreme/file_management/object_provider');
require('devextreme/file_management/remote_provider');
require('devextreme/integration/jquery');
require('devextreme/localization').loadMessages;
require('devextreme/localization').formatMessage;
require('devextreme/localization').formatNumber;
require('devextreme/localization').parseNumber;
require('devextreme/localization').formatDate;
require('devextreme/localization').parseDate;
require('devextreme/localization').locale;
require('devextreme/mobile/hide_top_overlay');
require('devextreme/mobile/init_mobile_viewport');
require('devextreme/ui/speed_dial_action');
require('devextreme/ui/accordion');
require('devextreme/ui/action_sheet');
require('devextreme/ui/autocomplete');
require('devextreme/ui/box');
require('devextreme/ui/button');
require('devextreme/ui/button_group');
require('devextreme/ui/calendar');
require('devextreme/ui/check_box');
require('devextreme/ui/color_box');
require('devextreme/ui/context_menu');
require('devextreme/ui/data_grid');
require('devextreme/ui/date_box');
require('devextreme/ui/date_range_box');
require('devextreme/ui/defer_rendering');
require('devextreme/ui/diagram');
require('devextreme/ui/dialog').alert;
require('devextreme/ui/dialog').confirm;
require('devextreme/ui/dialog').custom;
require('devextreme/ui/draggable');
require('devextreme/ui/drawer');
require('devextreme/ui/drop_down_box');
require('devextreme/ui/drop_down_button');
require('devextreme/ui/file_uploader');
require('devextreme/ui/filter_builder');
require('devextreme/ui/file_manager');
require('devextreme/ui/form');
require('devextreme/ui/gallery');
require('devextreme/ui/gantt');
require('devextreme/ui/html_editor');
require('devextreme/ui/list');
require('devextreme/ui/load_indicator');
require('devextreme/ui/load_panel');
require('devextreme/ui/lookup');
require('devextreme/ui/map');
require('devextreme/ui/menu');
require('devextreme/ui/multi_view');
require('devextreme/ui/notify');
require('devextreme/ui/speed_dial_action/repaint_floating_action_button');
require('devextreme/ui/toast/hide_toasts');
require('devextreme/ui/number_box');
require('devextreme/ui/pivot_grid');
require('devextreme/ui/pivot_grid/data_source');
require('devextreme/ui/pivot_grid/xmla_store');
require('devextreme/ui/pivot_grid_field_chooser');
require('devextreme/ui/popover');
require('devextreme/ui/popup');
require('devextreme/ui/progress_bar');
require('devextreme/ui/radio_group');
require('devextreme/ui/range_slider');
require('devextreme/ui/resizable');
require('devextreme/ui/responsive_box');
require('devextreme/ui/scheduler');
require('devextreme/time_zone_utils').getTimeZones;
require('devextreme/ui/scroll_view');
require('devextreme/ui/select_box');
require('devextreme/ui/set_template_engine');
require('devextreme/ui/slider');
require('devextreme/ui/splitter');
require('devextreme/ui/sortable');
require('devextreme/ui/switch');
require('devextreme/ui/tab_panel');
require('devextreme/ui/tabs');
require('devextreme/ui/tag_box');
require('devextreme/ui/text_area');
require('devextreme/ui/text_box');
require('devextreme/ui/themes');
require('devextreme/ui/tile_view');
require('devextreme/ui/toast');
require('devextreme/ui/toolbar');
require('devextreme/ui/tooltip');
require('devextreme/ui/tree_list');
require('devextreme/ui/tree_view');
require('devextreme/ui/validation_engine');
require('devextreme/ui/validation_group');
require('devextreme/ui/validation_summary');
require('devextreme/ui/validator');
require('devextreme/utils').compileGetter;
require('devextreme/utils').compileSetter;
require('devextreme/viz/bar_gauge');
require('devextreme/viz/bullet');
require('devextreme/viz/chart');
require('devextreme/viz/circular_gauge');
require('devextreme/viz/funnel');
require('devextreme/viz/sankey');
require('devextreme/viz/linear_gauge');
require('devextreme/viz/palette').currentPalette;
require('devextreme/viz/palette').getPalette;
require('devextreme/viz/palette').generateColors;
require('devextreme/viz/palette').registerPalette;
require('devextreme/viz/pie_chart');
require('devextreme/viz/polar_chart');
require('devextreme/viz/range_selector');
require('devextreme/viz/sparkline');
require('devextreme/viz/themes').currentTheme;
require('devextreme/viz/themes').getTheme;
require('devextreme/viz/themes').refreshTheme;
require('devextreme/viz/themes').registerTheme;
require('devextreme/viz/tree_map');
require('devextreme/viz/utils').refreshPaths;
require('devextreme/viz/vector_map');
require('devextreme/viz/vector_map/projection').projection;