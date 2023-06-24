/**
 *
 * Define blpgelib components library
 *
 */
// Import Collections
import Spacing from './collections/spacing';
import Background from './collections/background';
import Border from './collections/border';
import Shadow from './collections/shadow';
import Animation from './collections/animation';
import IconPicker from './collections/iconPicker';
import ShapeDivider from './collections/shapeDivider';
import Overlay from './collections/overlay';
import Typography from './collections/typography';

// Import Components
import Devices from './components/devices';
import CssUnits from './components/css-units';
import ColorSquare from './components/color-square';
import BlpgeSubPanel from './components/BlpgeSubPanel';
import BlpgeColorPicker from './components/color-picker';
import SubBlockInspector from './components/sub-block-inspector';
import BlpgeSelectStyle from './components/BlpgeSelectStyle';

// Import Editor Components
import ExtraToolBar from './editor/extra-toolbar';
import BlockAppender from './editor/block-appender';
import SubBlock from './editor/sub-block';

// Import Library
import BlpgeLibrary from './editor/library';

// Import Utilities
import blpge_setBlockId from './utilities/set_block_id';
import blpge_spacing_cssGen from './utilities/spacing_css_generator';
import blpge_background_cssGen from './utilities/background_css_generator';
import blpge_shadow_cssGen from './utilities/shadow_css_generator';
import blpge_border_cssGen from './utilities/border_css_generator';
import blpge_shapeDivider_cssGen from './utilities/shapeDivider_css_generator';
import blpge_overlay_cssGen from './utilities/overlay_css_generator';
import blpge_typography_cssGen from './utilities/typography_css_generator';
import blpge_getDeviceStateIndex from './utilities/get_device_state_index';
import blpge_iconPicker_cssGen from './utilities/iconPicker_css_generator';

// Import helpers
import blpge_cssGen from './helpers/css-generator';
import blpge_class_based_mq_css from './helpers/class-based-mq-css';
import collectionsObjects from './helpers/collections-objects';

// Library global object
window.blpgelib = {
	collections: {},
	components: {},
	editor: {},
	utilities: {},
	helpers: {},
};

// Push collections
blpgelib.collections.Spacing = Spacing;

blpgelib.collections.Background = Background;

blpgelib.components.Spacing = Spacing;

blpgelib.collections.Border = Border;

blpgelib.collections.Shadow = Shadow;

blpgelib.collections.Animation = Animation;

blpgelib.collections.IconPicker = IconPicker;

blpgelib.collections.ShapeDivider = ShapeDivider;

blpgelib.collections.Overlay = Overlay;

blpgelib.collections.Typography = Typography;

// Push Components
blpgelib.components.Devices = Devices;
blpgelib.components.CssUnits = CssUnits;
blpgelib.components.ColorSquare = ColorSquare;
blpgelib.components.BlpgeSubPanel = BlpgeSubPanel;
blpgelib.components.BlpgeColorPicker = BlpgeColorPicker;
blpgelib.components.SubBlockInspector = SubBlockInspector;
blpgelib.components.BlpgeSelectStyle = BlpgeSelectStyle;

// Push Editor Components
blpgelib.editor.ExtraToolBar = ExtraToolBar;
blpgelib.editor.BlockAppender = BlockAppender;
blpgelib.editor.BlpgeLibrary = BlpgeLibrary;
blpgelib.editor.SubBlock = SubBlock;

// Push helpers
blpgelib.helpers.blpge_cssGen = blpge_cssGen;
blpgelib.helpers.blpge_class_based_mq_css = blpge_class_based_mq_css;
blpgelib.helpers.collectionsObjects = collectionsObjects;

// Push Utilities
blpgelib.utilities.blpge_setBlockId = blpge_setBlockId;
blpgelib.utilities.blpge_spacing_cssGen = blpge_spacing_cssGen;
blpgelib.utilities.blpge_shadow_cssGen = blpge_shadow_cssGen;
blpgelib.utilities.blpge_background_cssGen = blpge_background_cssGen;
blpgelib.utilities.blpge_border_cssGen = blpge_border_cssGen;
blpgelib.utilities.blpge_shapeDivider_cssGen = blpge_shapeDivider_cssGen;
blpgelib.utilities.blpge_overlay_cssGen = blpge_overlay_cssGen;
blpgelib.utilities.blpge_typography_cssGen = blpge_typography_cssGen;
blpgelib.utilities.blpge_getDeviceStateIndex = blpge_getDeviceStateIndex;
blpgelib.utilities.blpge_iconPicker_cssGen = blpge_iconPicker_cssGen;
