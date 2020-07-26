import React from 'react';
import { AutocompleteProps } from '@material-ui/lab';
import { InputLabelProps } from '@material-ui/core';
import { IDynamicData } from '../api/IDynamicData';
/**
 * Country list ref
 */
export interface CountryListRef {
}
/**
 * Country list properties
 * property 'options' is not necessary
 * property 'ref' is incorrect here confused by the Autocomplete's ref
 */
export declare type CountryListProps = Partial<Omit<AutocompleteProps<IDynamicData, undefined, undefined, undefined>, 'options' | 'ref'>> & {
    /**
     * Label
     */
    label?: string;
    /**
     * Callback to load country list items
     */
    loadItems(): Promise<IDynamicData[]>;
    /**
     * Name
     */
    name?: string;
    /**
     * Input label properties
     */
    InputLabelProps?: Partial<InputLabelProps>;
    /**
     * Sort callback
     * Avoid any copy actions to keep good performance
     * @param items List items
     */
    sort?(items: IDynamicData[]): void;
};
/**
 * Country list
 */
export declare const CountryList: React.ForwardRefExoticComponent<Partial<Pick<AutocompleteProps<IDynamicData, undefined, undefined, undefined>, "slot" | "style" | "title" | "lang" | "id" | "onScroll" | "className" | "innerRef" | "dir" | "hidden" | "color" | "size" | "open" | "multiple" | "disabled" | "translate" | "value" | "classes" | "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "accessKey" | "contentEditable" | "contextMenu" | "draggable" | "placeholder" | "spellCheck" | "tabIndex" | "radioGroup" | "role" | "about" | "datatype" | "inlist" | "prefix" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "inputMode" | "is" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "disablePortal" | "onClose" | "autoComplete" | "loading" | "fullWidth" | "ChipProps" | "closeIcon" | "clearText" | "closeText" | "forcePopupIcon" | "getLimitTagsText" | "ListboxComponent" | "ListboxProps" | "loadingText" | "limitTags" | "noOptionsText" | "openText" | "PaperComponent" | "PopperComponent" | "popupIcon" | "renderGroup" | "renderInput" | "renderOption" | "renderTags" | "autoHighlight" | "autoSelect" | "blurOnSelect" | "clearOnBlur" | "clearOnEscape" | "componentName" | "debug" | "disableClearable" | "disableCloseOnSelect" | "disabledItemsFocusable" | "disableListWrap" | "filterOptions" | "filterSelectedOptions" | "freeSolo" | "getOptionDisabled" | "getOptionLabel" | "getOptionSelected" | "groupBy" | "handleHomeEndKeys" | "includeInputInList" | "inputValue" | "onInputChange" | "onOpen" | "onHighlightChange" | "openOnFocus" | "selectOnFocus">> & {
    /**
     * Label
     */
    label?: string | undefined;
    /**
     * Callback to load country list items
     */
    loadItems(): Promise<IDynamicData[]>;
    /**
     * Name
     */
    name?: string | undefined;
    /**
     * Input label properties
     */
    InputLabelProps?: Partial<InputLabelProps> | undefined;
    /**
     * Sort callback
     * Avoid any copy actions to keep good performance
     * @param items List items
     */
    sort?(items: IDynamicData[]): void;
} & React.RefAttributes<CountryListRef>>;
