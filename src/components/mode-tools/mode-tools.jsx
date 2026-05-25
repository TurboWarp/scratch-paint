import classNames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import MediaQuery from 'react-responsive';

import {changeBrushSize} from '../../reducers/brush-mode';
import {changeBrushSize as changeEraserSize} from '../../reducers/eraser-mode';
import {changeBitBrushSize} from '../../reducers/bit-brush-size';
import {changeBitEraserSize} from '../../reducers/bit-eraser-size';
import {setShapesFilled} from '../../reducers/fill-bitmap-shapes';
import {changeRectRadius} from '../../reducers/rect-mode';

import FontDropdown from '../../containers/font-dropdown.jsx';
import LiveInputHOC from '../forms/live-input-hoc.jsx';
import Label from '../forms/label.jsx';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import Input from '../forms/input.jsx';
import InputGroup from '../input-group/input-group.jsx';
import LabeledIconButton from '../labeled-icon-button/labeled-icon-button.jsx';
import Modes from '../../lib/modes';
import Formats, {isBitmap, isVector} from '../../lib/format';
import {hideLabel} from '../../lib/hide-label';
import styles from './mode-tools.css';
import layout from '../../lib/layout-constants';
import Dropdown from '../dropdown/dropdown.jsx';
import Button from '../button/button.jsx';
import TWRenderRecoloredImage from '../../tw-recolor/render.jsx';

import copyIcon from '!../../tw-recolor/build!./icons/copy.svg';
import cutIcon from '!../../tw-recolor/build!./icons/cut.svg';
import pasteIcon from '!../../tw-recolor/build!./icons/paste.svg';
import deleteIcon from '!../../tw-recolor/build!./icons/delete.svg';

import bitBrushIcon from '../bit-brush-mode/brush.svg';
import bitEraserIcon from '../bit-eraser-mode/eraser.svg';
import bitLineIcon from '../bit-line-mode/line.svg';
import brushIcon from '../brush-mode/brush.svg';
import curvedPointIcon from '!../../tw-recolor/build!./icons/curved-point.svg';
import eraserIcon from '../eraser-mode/eraser.svg';
import flipHorizontalIcon from '!../../tw-recolor/build!./icons/flip-horizontal.svg';
import flipVerticalIcon from '!../../tw-recolor/build!./icons/flip-vertical.svg';
import centerIcon from '!../../tw-recolor/build!./icons/center.svg';
import straightPointIcon from '!../../tw-recolor/build!./icons/straight-point.svg';
import roundRectIcon from '../rounded-rect-mode/rounded-rectangle.svg';
import bitOvalIcon from '../bit-oval-mode/oval.svg';
import bitRectIcon from '../bit-rect-mode/rectangle.svg';
import bitOvalOutlinedIcon from '../bit-oval-mode/oval-outlined.svg';
import bitRectOutlinedIcon from '../bit-rect-mode/rectangle-outlined.svg';

import {MAX_STROKE_WIDTH} from '../../reducers/stroke-width';

const LiveInput = LiveInputHOC(Input);
const ModeToolsComponent = props => {
    const messages = defineMessages({
        brushSize: {
            defaultMessage: 'Size',
            description: 'Label for the brush size input',
            id: 'paint.modeTools.brushSize'
        },
        eraserSize: {
            defaultMessage: 'Eraser size',
            description: 'Label for the eraser size input',
            id: 'paint.modeTools.eraserSize'
        },
        copy: {
            defaultMessage: 'Copy',
            description: 'Label for the copy button',
            id: 'paint.modeTools.copy'
        },
        cut: {
            defaultMessage: 'Cut',
            description: 'Label for the cut button',
            id: 'paint.modeTools.cut'
        },
        paste: {
            defaultMessage: 'Paste',
            description: 'Label for the paste button',
            id: 'paint.modeTools.paste'
        },
        delete: {
            defaultMessage: 'Delete',
            description: 'Label for the delete button',
            id: 'paint.modeTools.delete'
        },
        curved: {
            defaultMessage: 'Curved',
            description: 'Label for the button that converts selected points to curves',
            id: 'paint.modeTools.curved'
        },
        pointed: {
            defaultMessage: 'Pointed',
            description: 'Label for the button that converts selected points to sharp points',
            id: 'paint.modeTools.pointed'
        },
        thickness: {
            defaultMessage: 'Thickness',
            description: 'Label for the number input to choose the line thickness',
            id: 'paint.modeTools.thickness'
        },
        flipHorizontal: {
            defaultMessage: 'Flip Horizontal',
            description: 'Label for the button to flip the image horizontally',
            id: 'paint.modeTools.flipHorizontal'
        },
        flipVertical: {
            defaultMessage: 'Flip Vertical',
            description: 'Label for the button to flip the image vertically',
            id: 'paint.modeTools.flipVertical'
        },
        center: {
            defaultMessage: 'Center',
            description: 'Label for the button that moves the selected objects to the center of the canvas',
            id: 'paint.modeTools.center'
        },
        filled: {
            defaultMessage: 'Filled',
            description: 'Label for the button that sets the bitmap rectangle/oval mode to draw outlines',
            id: 'paint.modeTools.filled'
        },
        outlined: {
            defaultMessage: 'Outlined',
            description: 'Label for the button that sets the bitmap rectangle/oval mode to draw filled-in shapes',
            id: 'paint.modeTools.outlined'
        },
        rectRadius: {
            defaultMessage: 'Rectangle Curve',
            description: 'Label for the rectangle curve input',
            id: 'paint.modeTools.rectRadius'
        },
        more: {
            defaultMessage: 'More',
            description: 'Label for dropdown to access more action buttons',
            id: 'paint.paintEditor.more'
        }
    });

    switch (props.mode) {
    case Modes.BRUSH:
        /* falls through */
    case Modes.BIT_BRUSH:
        /* falls through */
    case Modes.BIT_LINE:
    {
        const currentIcon = isVector(props.format) ? brushIcon :
            props.mode === Modes.BIT_LINE ? bitLineIcon : bitBrushIcon;
        const currentBrushValue = isBitmap(props.format) ? props.bitBrushSize : props.brushValue;
        const changeFunction = isBitmap(props.format) ? props.onBitBrushSliderChange : props.onBrushSliderChange;
        const currentMessage = props.mode === Modes.BIT_LINE ? messages.thickness : messages.brushSize;
        return (
            <div className={classNames(props.className, styles.modeTools)}>
                <div>
                    <img
                        alt={props.intl.formatMessage(currentMessage)}
                        className={styles.modeToolsIcon}
                        draggable={false}
                        src={currentIcon}
                    />
                </div>
                <LiveInput
                    range
                    small
                    max={MAX_STROKE_WIDTH}
                    min="1"
                    type="number"
                    value={currentBrushValue}
                    onSubmit={changeFunction}
                />
            </div>
        );
    }
    case Modes.BIT_ERASER:
        /* falls through */
    case Modes.ERASER:
    {
        const currentIcon = isVector(props.format) ? eraserIcon : bitEraserIcon;
        const currentEraserValue = isBitmap(props.format) ? props.bitEraserSize : props.eraserValue;
        const changeFunction = isBitmap(props.format) ? props.onBitEraserSliderChange : props.onEraserSliderChange;
        return (
            <div className={classNames(props.className, styles.modeTools)}>
                <div>
                    <img
                        alt={props.intl.formatMessage(messages.eraserSize)}
                        className={styles.modeToolsIcon}
                        draggable={false}
                        src={currentIcon}
                    />
                </div>
                <LiveInput
                    range
                    small
                    max={MAX_STROKE_WIDTH}
                    min="1"
                    type="number"
                    value={currentEraserValue}
                    onSubmit={changeFunction}
                />
            </div>
        );
    }
    case Modes.RESHAPE:
        return (
            <div className={classNames(props.className, styles.modeTools)}>
                <InputGroup className={classNames(styles.modDashedBorder, styles.modLabeledIconHeight)}>
                    <LabeledIconButton
                        disabled={!props.hasSelectedUncurvedPoints}
                        hideLabel={hideLabel(props.intl.locale)}
                        imgSrc={curvedPointIcon}
                        title={props.intl.formatMessage(messages.curved)}
                        onClick={props.onCurvePoints}
                    />
                    <LabeledIconButton
                        disabled={!props.hasSelectedUnpointedPoints}
                        hideLabel={hideLabel(props.intl.locale)}
                        imgSrc={straightPointIcon}
                        title={props.intl.formatMessage(messages.pointed)}
                        onClick={props.onPointPoints}
                    />
                </InputGroup>
                <InputGroup className={classNames(styles.modLabeledIconHeight)}>
                    <LabeledIconButton
                        hideLabel={hideLabel(props.intl.locale)}
                        imgSrc={deleteIcon}
                        title={props.intl.formatMessage(messages.delete)}
                        onClick={props.onDelete}
                    />
                </InputGroup>
            </div>
        );
    case Modes.BIT_SELECT:
        /* falls through */
    case Modes.SELECT:
        return (
            <div className={classNames(props.className, styles.modeTools)}>
                <InputGroup className={classNames(styles.modDashedBorder, styles.modLabeledIconHeight)}>
                    <LabeledIconButton
                        hideLabel={hideLabel(props.intl.locale)}
                        imgSrc={copyIcon}
                        title={props.intl.formatMessage(messages.copy)}
                        onClick={props.onCopyToClipboard}
                    />
                    <LabeledIconButton
                        hideLabel={hideLabel(props.intl.locale)}
                        imgSrc={cutIcon}
                        title={props.intl.formatMessage(messages.cut)}
                        onClick={props.onCutToClipboard}
                    />
                    <LabeledIconButton
                        disabled={!(props.clipboardItems.length > 0)}
                        hideLabel={hideLabel(props.intl.locale)}
                        imgSrc={pasteIcon}
                        title={props.intl.formatMessage(messages.paste)}
                        onClick={props.onPasteFromClipboard}
                    />
                </InputGroup>
                <InputGroup className={classNames(styles.modDashedBorder, styles.modLabeledIconHeight)}>
                    <LabeledIconButton
                        hideLabel={hideLabel(props.intl.locale)}
                        imgSrc={deleteIcon}
                        title={props.intl.formatMessage(messages.delete)}
                        onClick={props.onDelete}
                    />
                </InputGroup>
                <MediaQuery minWidth={layout.fullSizeEditorMinWidth}>
                    <InputGroup className={classNames(styles.modLabeledIconHeight)}>
                        <LabeledIconButton
                            hideLabel={props.intl.locale !== 'en'}
                            imgSrc={flipHorizontalIcon}
                            title={props.intl.formatMessage(messages.flipHorizontal)}
                            onClick={props.onFlipHorizontal}
                        />
                        <LabeledIconButton
                            hideLabel={props.intl.locale !== 'en'}
                            imgSrc={flipVerticalIcon}
                            title={props.intl.formatMessage(messages.flipVertical)}
                            onClick={props.onFlipVertical}
                        />
                        <LabeledIconButton
                            hideLabel={props.intl.locale !== 'en'}
                            imgSrc={centerIcon}
                            title={props.intl.formatMessage(messages.center)}
                            onClick={props.onCenterSelection}
                        />
                    </InputGroup>
                </MediaQuery>
                <MediaQuery maxWidth={layout.fullSizeEditorMinWidth - 1}>
                    <InputGroup>
                        <Dropdown
                            className={styles.modUnselect}
                            enterExitTransitionDurationMs={20}
                            popoverContent={
                                <InputGroup
                                    className={styles.modContextMenu}
                                >
                                    <Button
                                        className={styles.modMenuItem}
                                        onClick={props.onFlipHorizontal}
                                    >
                                        <TWRenderRecoloredImage
                                            className={styles.menuItemIcon}
                                            draggable={false}
                                            src={flipHorizontalIcon}
                                        />
                                        {props.intl.locale === 'en' &&
                                            <span>{props.intl.formatMessage(messages.flipHorizontal)}</span>
                                        }
                                    </Button>
                                    <Button
                                        className={styles.modMenuItem}
                                        onClick={props.onFlipVertical}
                                    >
                                        <TWRenderRecoloredImage
                                            className={styles.menuItemIcon}
                                            draggable={false}
                                            src={flipVerticalIcon}
                                        />
                                        {props.intl.locale === 'en' &&
                                            <span>{props.intl.formatMessage(messages.flipVertical)}</span>
                                        }
                                    </Button>
                                    <Button
                                        className={styles.modMenuItem}
                                        onClick={props.onCenterSelection}
                                    >
                                        <TWRenderRecoloredImage
                                            className={styles.menuItemIcon}
                                            draggable={false}
                                            src={centerIcon}
                                        />
                                        {props.intl.locale === 'en' &&
                                            <span>{props.intl.formatMessage(messages.center)}</span>
                                        }
                                    </Button>
                                </InputGroup>
                            }
                            tipSize={.01}
                        >
                            {props.intl.formatMessage(messages.more)}
                        </Dropdown>
                    </InputGroup>
                </MediaQuery>
            </div>
        );
    case Modes.BIT_TEXT:
        /* falls through */
    case Modes.TEXT:
        return (
            <div className={classNames(props.className, styles.modeTools)}>
                <InputGroup>
                    <FontDropdown
                        onUpdateImage={props.onUpdateImage}
                        onManageFonts={props.onManageFonts}
                    />
                </InputGroup>
            </div>
        );
    case Modes.BIT_RECT:
        /* falls through */
    case Modes.BIT_OVAL:
    {
        const fillIcon = props.mode === Modes.BIT_RECT ? bitRectIcon : bitOvalIcon;
        const outlineIcon = props.mode === Modes.BIT_RECT ? bitRectOutlinedIcon : bitOvalOutlinedIcon;
        return (
            <div className={classNames(props.className, styles.modeTools)}>
                <InputGroup>
                    <LabeledIconButton
                        highlighted={props.fillBitmapShapes}
                        imgSrc={fillIcon}
                        title={props.intl.formatMessage(messages.filled)}
                        onClick={props.onFillShapes}
                        gray
                    />
                </InputGroup>
                <InputGroup>
                    <LabeledIconButton
                        highlighted={!props.fillBitmapShapes}
                        imgSrc={outlineIcon}
                        title={props.intl.formatMessage(messages.outlined)}
                        onClick={props.onOutlineShapes}
                        gray
                    />
                </InputGroup>
                {props.fillBitmapShapes ? null : (
                    <InputGroup>
                        <Label text={props.intl.formatMessage(messages.thickness)}>
                            <LiveInput
                                range
                                small
                                max={MAX_STROKE_WIDTH}
                                min="1"
                                type="number"
                                value={props.bitBrushSize}
                                onSubmit={props.onBitBrushSliderChange}
                            />
                        </Label>
                    </InputGroup>)
                }
            </div>
        );
    }
    case Modes.RECT:
        const currentIcon = roundRectIcon;
        const currentRadiusValue = props.rectRadius;
        const changeFunction = props.onRectRadiusSliderChange;
        return (
            <div className={classNames(props.className, styles.modeTools)}>
                <div>
                    <img
                        alt={props.intl.formatMessage(messages.rectRadius)}
                        className={styles.modeToolsIcon}
                        draggable={false}
                        src={currentIcon}
                    />
                </div>
                <LiveInput
                    range
                    small
                    max={MAX_STROKE_WIDTH}
                    min="0"
                    type="number"
                    value={currentRadiusValue}
                    onSubmit={changeFunction}
                />
            </div>
        );
    default:
        // Leave empty for now, if mode not supported
        return (
            <div className={classNames(props.className, styles.modeTools)} />
        );
    }
};

ModeToolsComponent.propTypes = {
    bitBrushSize: PropTypes.number,
    bitEraserSize: PropTypes.number,
    brushValue: PropTypes.number,
    className: PropTypes.string,
    clipboardItems: PropTypes.arrayOf(PropTypes.array),
    eraserValue: PropTypes.number,
    fillBitmapShapes: PropTypes.bool,
    format: PropTypes.oneOf(Object.keys(Formats)),
    hasSelectedUncurvedPoints: PropTypes.bool,
    hasSelectedUnpointedPoints: PropTypes.bool,
    intl: intlShape.isRequired,
    mode: PropTypes.string.isRequired,
    onBitBrushSliderChange: PropTypes.func.isRequired,
    onBitEraserSliderChange: PropTypes.func.isRequired,
    onBrushSliderChange: PropTypes.func.isRequired,
    onCopyToClipboard: PropTypes.func.isRequired,
    onCutToClipboard: PropTypes.func.isRequired,
    onCurvePoints: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEraserSliderChange: PropTypes.func,
    onFillShapes: PropTypes.func.isRequired,
    onFlipHorizontal: PropTypes.func.isRequired,
    onFlipVertical: PropTypes.func.isRequired,
    onCenterSelection: PropTypes.func.isRequired,
    onManageFonts: PropTypes.func,
    onOutlineShapes: PropTypes.func.isRequired,
    onPasteFromClipboard: PropTypes.func.isRequired,
    onPointPoints: PropTypes.func.isRequired,
    onUpdateImage: PropTypes.func.isRequired,
    rectRadius: PropTypes.number,
    onRectRadiusSliderChange: PropTypes.func
};

const mapStateToProps = state => ({
    mode: state.scratchPaint.mode,
    format: state.scratchPaint.format,
    fillBitmapShapes: state.scratchPaint.fillBitmapShapes,
    bitBrushSize: state.scratchPaint.bitBrushSize,
    bitEraserSize: state.scratchPaint.bitEraserSize,
    brushValue: state.scratchPaint.brushMode.brushSize,
    clipboardItems: state.scratchPaint.clipboard.items,
    eraserValue: state.scratchPaint.eraserMode.brushSize,
    rectRadius: state.scratchPaint.rectMode.rectRadius
});
const mapDispatchToProps = dispatch => ({
    onBrushSliderChange: brushSize => {
        dispatch(changeBrushSize(brushSize));
    },
    onBitBrushSliderChange: bitBrushSize => {
        dispatch(changeBitBrushSize(bitBrushSize));
    },
    onBitEraserSliderChange: eraserSize => {
        dispatch(changeBitEraserSize(eraserSize));
    },
    onEraserSliderChange: eraserSize => {
        dispatch(changeEraserSize(eraserSize));
    },
    onFillShapes: () => {
        dispatch(setShapesFilled(true));
    },
    onOutlineShapes: () => {
        dispatch(setShapesFilled(false));
    },
    onRectRadiusSliderChange: rectRadius => {
        dispatch(changeRectRadius(rectRadius));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(ModeToolsComponent));
