export interface VNode {
  [key: string]: any
}

export interface VNodeData {
  [attrName: string]: any
}

export { JSXBase as JSX }

type Booleanish = boolean | 'true' | 'false'
type Numberish = number | string

export namespace JSXBase {
  export interface IntrinsicElements {
    // HTML
    a: JSXBase.AnchorHTMLAttributes<HTMLAnchorElement>
    abbr: JSXBase.HTMLAttributes
    address: JSXBase.HTMLAttributes
    area: JSXBase.AreaHTMLAttributes<HTMLAreaElement>
    article: JSXBase.HTMLAttributes
    aside: JSXBase.HTMLAttributes
    audio: JSXBase.AudioHTMLAttributes<HTMLAudioElement>
    b: JSXBase.HTMLAttributes
    base: JSXBase.BaseHTMLAttributes<HTMLBaseElement>
    bdi: JSXBase.HTMLAttributes
    bdo: JSXBase.HTMLAttributes
    big: JSXBase.HTMLAttributes
    blockquote: JSXBase.BlockquoteHTMLAttributes<HTMLQuoteElement>
    body: JSXBase.HTMLAttributes<HTMLBodyElement>
    br: JSXBase.HTMLAttributes<HTMLBRElement>
    button: JSXBase.ButtonHTMLAttributes<HTMLButtonElement>
    canvas: JSXBase.CanvasHTMLAttributes<HTMLCanvasElement>
    caption: JSXBase.HTMLAttributes<HTMLTableCaptionElement>
    cite: JSXBase.HTMLAttributes
    code: JSXBase.HTMLAttributes
    col: JSXBase.ColHTMLAttributes<HTMLTableColElement>
    colgroup: JSXBase.ColgroupHTMLAttributes<HTMLTableColElement>
    data: JSXBase.HTMLAttributes<HTMLDataElement>
    datalist: JSXBase.HTMLAttributes<HTMLDataListElement>
    dd: JSXBase.HTMLAttributes
    del: JSXBase.DelHTMLAttributes<HTMLModElement>
    details: JSXBase.DetailsHTMLAttributes<HTMLElement>
    dfn: JSXBase.HTMLAttributes
    dialog: JSXBase.DialogHTMLAttributes<HTMLDialogElement>
    div: JSXBase.HTMLAttributes<HTMLDivElement>
    dl: JSXBase.HTMLAttributes<HTMLDListElement>
    dt: JSXBase.HTMLAttributes
    em: JSXBase.HTMLAttributes
    embed: JSXBase.EmbedHTMLAttributes<HTMLEmbedElement>
    fieldset: JSXBase.FieldsetHTMLAttributes<HTMLFieldSetElement>
    figcaption: JSXBase.HTMLAttributes
    figure: JSXBase.HTMLAttributes
    footer: JSXBase.HTMLAttributes
    form: JSXBase.FormHTMLAttributes<HTMLFormElement>
    h1: JSXBase.HTMLAttributes<HTMLHeadingElement>
    h2: JSXBase.HTMLAttributes<HTMLHeadingElement>
    h3: JSXBase.HTMLAttributes<HTMLHeadingElement>
    h4: JSXBase.HTMLAttributes<HTMLHeadingElement>
    h5: JSXBase.HTMLAttributes<HTMLHeadingElement>
    h6: JSXBase.HTMLAttributes<HTMLHeadingElement>
    head: JSXBase.HTMLAttributes<HTMLHeadElement>
    header: JSXBase.HTMLAttributes
    hgroup: JSXBase.HTMLAttributes
    hr: JSXBase.HTMLAttributes<HTMLHRElement>
    html: JSXBase.HTMLAttributes<HTMLHtmlElement>
    i: JSXBase.HTMLAttributes
    iframe: JSXBase.IframeHTMLAttributes<HTMLIFrameElement>
    img: JSXBase.ImgHTMLAttributes<HTMLImageElement>
    input: JSXBase.InputHTMLAttributes<HTMLInputElement>
    ins: JSXBase.InsHTMLAttributes<HTMLModElement>
    kbd: JSXBase.HTMLAttributes
    keygen: JSXBase.KeygenHTMLAttributes<HTMLElement>
    label: JSXBase.LabelHTMLAttributes<HTMLLabelElement>
    legend: JSXBase.HTMLAttributes<HTMLLegendElement>
    li: JSXBase.LiHTMLAttributes<HTMLLIElement>
    link: JSXBase.LinkHTMLAttributes<HTMLLinkElement>
    main: JSXBase.HTMLAttributes
    map: JSXBase.MapHTMLAttributes<HTMLMapElement>
    mark: JSXBase.HTMLAttributes
    menu: JSXBase.MenuHTMLAttributes<HTMLMenuElement>
    menuitem: JSXBase.HTMLAttributes
    meta: JSXBase.MetaHTMLAttributes<HTMLMetaElement>
    meter: JSXBase.MeterHTMLAttributes<HTMLMeterElement>
    nav: JSXBase.HTMLAttributes
    noscript: JSXBase.HTMLAttributes
    object: JSXBase.ObjectHTMLAttributes<HTMLObjectElement>
    ol: JSXBase.OlHTMLAttributes<HTMLOListElement>
    optgroup: JSXBase.OptgroupHTMLAttributes<HTMLOptGroupElement>
    option: JSXBase.OptionHTMLAttributes<HTMLOptionElement>
    output: JSXBase.OutputHTMLAttributes<HTMLOutputElement>
    p: JSXBase.HTMLAttributes<HTMLParagraphElement>
    param: JSXBase.ParamHTMLAttributes<HTMLParamElement>
    picture: JSXBase.HTMLAttributes<HTMLPictureElement>
    pre: JSXBase.HTMLAttributes<HTMLPreElement>
    progress: JSXBase.ProgressHTMLAttributes<HTMLProgressElement>
    q: JSXBase.QuoteHTMLAttributes<HTMLQuoteElement>
    rp: JSXBase.HTMLAttributes
    rt: JSXBase.HTMLAttributes
    ruby: JSXBase.HTMLAttributes
    s: JSXBase.HTMLAttributes
    samp: JSXBase.HTMLAttributes
    script: JSXBase.ScriptHTMLAttributes<HTMLScriptElement>
    section: JSXBase.HTMLAttributes
    select: JSXBase.SelectHTMLAttributes<HTMLSelectElement>
    small: JSXBase.HTMLAttributes
    source: JSXBase.SourceHTMLAttributes<HTMLSourceElement>
    span: JSXBase.HTMLAttributes<HTMLSpanElement>
    strong: JSXBase.HTMLAttributes
    style: JSXBase.StyleHTMLAttributes<HTMLStyleElement>
    sub: JSXBase.HTMLAttributes
    summary: JSXBase.HTMLAttributes
    sup: JSXBase.HTMLAttributes
    table: JSXBase.TableHTMLAttributes<HTMLTableElement>
    tbody: JSXBase.HTMLAttributes<HTMLTableSectionElement>
    td: JSXBase.TdHTMLAttributes<HTMLTableDataCellElement>
    textarea: JSXBase.TextareaHTMLAttributes<HTMLTextAreaElement>
    tfoot: JSXBase.HTMLAttributes<HTMLTableSectionElement>
    th: JSXBase.ThHTMLAttributes<HTMLTableHeaderCellElement>
    thead: JSXBase.HTMLAttributes<HTMLTableSectionElement>
    time: JSXBase.TimeHTMLAttributes<HTMLTimeElement>
    title: JSXBase.HTMLAttributes<HTMLTitleElement>
    tr: JSXBase.HTMLAttributes<HTMLTableRowElement>
    track: JSXBase.TrackHTMLAttributes<HTMLTrackElement>
    u: JSXBase.HTMLAttributes
    ul: JSXBase.HTMLAttributes<HTMLUListElement>
    var: JSXBase.HTMLAttributes
    video: JSXBase.VideoHTMLAttributes<HTMLVideoElement>
    wbr: JSXBase.HTMLAttributes

    // SVG
    animate: JSXBase.SVGAttributes
    circle: JSXBase.SVGAttributes
    clipPath: JSXBase.SVGAttributes
    defs: JSXBase.SVGAttributes
    desc: JSXBase.SVGAttributes
    ellipse: JSXBase.SVGAttributes
    feBlend: JSXBase.SVGAttributes
    feColorMatrix: JSXBase.SVGAttributes
    feComponentTransfer: JSXBase.SVGAttributes
    feComposite: JSXBase.SVGAttributes
    feConvolveMatrix: JSXBase.SVGAttributes
    feDiffuseLighting: JSXBase.SVGAttributes
    feDisplacementMap: JSXBase.SVGAttributes
    feDistantLight: JSXBase.SVGAttributes
    feDropShadow: JSXBase.SVGAttributes
    feFlood: JSXBase.SVGAttributes
    feFuncA: JSXBase.SVGAttributes
    feFuncB: JSXBase.SVGAttributes
    feFuncG: JSXBase.SVGAttributes
    feFuncR: JSXBase.SVGAttributes
    feGaussianBlur: JSXBase.SVGAttributes
    feImage: JSXBase.SVGAttributes
    feMerge: JSXBase.SVGAttributes
    feMergeNode: JSXBase.SVGAttributes
    feMorphology: JSXBase.SVGAttributes
    feOffset: JSXBase.SVGAttributes
    fePointLight: JSXBase.SVGAttributes
    feSpecularLighting: JSXBase.SVGAttributes
    feSpotLight: JSXBase.SVGAttributes
    feTile: JSXBase.SVGAttributes
    feTurbulence: JSXBase.SVGAttributes
    filter: JSXBase.SVGAttributes
    foreignObject: JSXBase.SVGAttributes
    g: JSXBase.SVGAttributes
    image: JSXBase.SVGAttributes
    line: JSXBase.SVGAttributes
    linearGradient: JSXBase.SVGAttributes
    marker: JSXBase.SVGAttributes
    mask: JSXBase.SVGAttributes
    metadata: JSXBase.SVGAttributes
    path: JSXBase.SVGAttributes
    pattern: JSXBase.SVGAttributes
    polygon: JSXBase.SVGAttributes
    polyline: JSXBase.SVGAttributes
    radialGradient: JSXBase.SVGAttributes
    rect: JSXBase.SVGAttributes
    stop: JSXBase.SVGAttributes
    svg: JSXBase.SVGAttributes
    switch: JSXBase.SVGAttributes
    symbol: JSXBase.SVGAttributes
    text: JSXBase.SVGAttributes
    textPath: JSXBase.SVGAttributes
    tspan: JSXBase.SVGAttributes
    use: JSXBase.SVGAttributes
    view: JSXBase.SVGAttributes
  }

  // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
  export interface AriaAttributes {
    /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
    'aria-activedescendant'?: string
    /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
    'aria-atomic'?: Booleanish
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
     * presented if they are made.
     */
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both'
    /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
    'aria-busy'?: Booleanish
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
     * @see aria-pressed @see aria-selected.
     */
    'aria-checked'?: Booleanish | 'mixed'
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     * @see aria-colindex.
     */
    'aria-colcount'?: Numberish
    /**
     * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
     * @see aria-colcount @see aria-colspan.
     */
    'aria-colindex'?: Numberish
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-colindex @see aria-rowspan.
     */
    'aria-colspan'?: Numberish
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     * @see aria-owns.
     */
    'aria-controls'?: string
    /** Indicates the element that represents the current item within a container or set of related elements. */
    'aria-current'?: Booleanish | 'page' | 'step' | 'location' | 'date' | 'time'
    /**
     * Identifies the element (or elements) that describes the object.
     * @see aria-labelledby
     */
    'aria-describedby'?: string
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     * @see aria-describedby.
     */
    'aria-details'?: string
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     * @see aria-hidden @see aria-readonly.
     */
    'aria-disabled'?: Booleanish
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     * @deprecated in ARIA 1.1
     */
    'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'
    /**
     * Identifies the element that provides an error message for the object.
     * @see aria-invalid @see aria-describedby.
     */
    'aria-errormessage'?: string
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    'aria-expanded'?: Booleanish
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
     * allows assistive technology to override the general default of reading in document source order.
     */
    'aria-flowto'?: string
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     * @deprecated in ARIA 1.1
     */
    'aria-grabbed'?: Booleanish
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    'aria-haspopup'?: Booleanish | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
    /**
     * Indicates whether the element is exposed to an accessibility API.
     * @see aria-disabled.
     */
    'aria-hidden'?: Booleanish
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     * @see aria-errormessage.
     */
    'aria-invalid'?: Booleanish | 'grammar' | 'spelling'
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    'aria-keyshortcuts'?: string
    /**
     * Defines a string value that labels the current element.
     * @see aria-labelledby.
     */
    'aria-label'?: string
    /**
     * Identifies the element (or elements) that labels the current element.
     * @see aria-describedby.
     */
    'aria-labelledby'?: string
    /** Defines the hierarchical level of an element within a structure. */
    'aria-level'?: Numberish
    /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
    'aria-live'?: 'off' | 'assertive' | 'polite'
    /** Indicates whether an element is modal when displayed. */
    'aria-modal'?: Booleanish
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    'aria-multiline'?: Booleanish
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    'aria-multiselectable'?: Booleanish
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    'aria-orientation'?: 'horizontal' | 'vertical'
    /**
     * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
     * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
     * @see aria-controls.
     */
    'aria-owns'?: string
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     */
    'aria-placeholder'?: string
    /**
     * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-setsize.
     */
    'aria-posinset'?: Numberish
    /**
     * Indicates the current "pressed" state of toggle buttons.
     * @see aria-checked @see aria-selected.
     */
    'aria-pressed'?: Booleanish | 'mixed'
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     * @see aria-disabled.
     */
    'aria-readonly'?: Booleanish
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
     * @see aria-atomic.
     */
    'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text'
    /** Indicates that user input is required on the element before a form may be submitted. */
    'aria-required'?: Booleanish
    /** Defines a human-readable, author-localized description for the role of an element. */
    'aria-roledescription'?: string
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     * @see aria-rowindex.
     */
    'aria-rowcount'?: Numberish
    /**
     * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
     * @see aria-rowcount @see aria-rowspan.
     */
    'aria-rowindex'?: Numberish
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-rowindex @see aria-colspan.
     */
    'aria-rowspan'?: Numberish
    /**
     * Indicates the current "selected" state of various widgets.
     * @see aria-checked @see aria-pressed.
     */
    'aria-selected'?: Booleanish
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-posinset.
     */
    'aria-setsize'?: Numberish
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other'
    /** Defines the maximum allowed value for a range widget. */
    'aria-valuemax'?: Numberish
    /** Defines the minimum allowed value for a range widget. */
    'aria-valuemin'?: Numberish
    /**
     * Defines the current value for a range widget.
     * @see aria-valuetext.
     */
    'aria-valuenow'?: Numberish
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    'aria-valuetext'?: string
  }

  export interface HTMLAttributes<T = HTMLElement> extends AriaAttributes, DOMAttributes<T> {
    // Standard HTML Attributes
    accessKey?: string | undefined
    class?: string | undefined
    contentEditable?: Booleanish | "inherit" | undefined
    contextMenu?: string | undefined
    dir?: string | undefined
    draggable?: Booleanish | undefined
    hidden?: boolean | undefined
    id?: string | undefined
    lang?: string | undefined
    placeholder?: string | undefined
    slot?: string | undefined
    spellCheck?: Booleanish | undefined
    style?: string | { [key: string]: string | undefined } | undefined
    tabIndex?: number | undefined
    title?: string | undefined
    translate?: 'yes' | 'no' | undefined

    // Unknown
    radioGroup?: string | undefined // <command>, <menuitem>

    // WAI-ARIA
    role?: string | undefined

    // RDFa Attributes
    about?: string | undefined
    datatype?: string | undefined
    inlist?: any
    prefix?: string | undefined
    property?: string | undefined
    resource?: string | undefined
    typeof?: string | undefined
    vocab?: string | undefined

    // Non-standard Attributes
    autoCapitalize?: string | undefined
    autoCorrect?: string | undefined
    autoSave?: string | undefined
    color?: string | undefined
    itemProp?: string | undefined
    itemScope?: boolean | undefined
    itemType?: string | undefined
    itemID?: string | undefined
    itemRef?: string | undefined
    results?: number | undefined
    security?: string | undefined
    unselectable?: 'on' | 'off' | undefined

    // Living Standard
    /**
     * Hints at the type of data that might be entered by the user while editing the element or its contents
     * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
     */
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
     */
    is?: string | undefined
  }

  export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    download?: any
    href?: string
    hrefLang?: string
    hreflang?: string
    media?: string
    rel?: string
    target?: string
    referrerPolicy?: ReferrerPolicy
  }

  export interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    // todo
  }

  export interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string
    coords?: string
    download?: any
    href?: string
    hrefLang?: string
    media?: string
    rel?: string
    shape?: string
    target?: string
  }

  export interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string
    target?: string
  }

  export interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string
  }

  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean
    disabled?: boolean
    form?: string
    formAction?: string
    formEncType?: string
    formMethod?: string
    formNoValidate?: boolean
    formTarget?: string
    name?: string
    type?: string
    value?: string | string[] | number
  }

  export interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string
    width?: number | string
  }

  export interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number
  }

  export interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number
  }

  export interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean
    onToggle?: (event: Event) => void
  }

  export interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string
    dateTime?: string
    datetime?: string
  }

  export interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
    onClose?: (event: Event) => void
    open?: boolean
    returnValue?: string
  }

  export interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string
    src?: string
    type?: string
    width?: number | string
  }

  export interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean
    form?: string
    name?: string
  }

  export interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptCharset?: string
    action?: string
    autoComplete?: string
    encType?: string
    method?: string
    name?: string
    noValidate?: boolean
    target?: string
  }

  export interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
    manifest?: string
  }

  export interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    allow?: string
    allowFullScreen?: boolean
    allowTransparency?: boolean
    frameBorder?: number | string
    importance?: 'low' | 'auto' | 'high'
    height?: number | string
    loading?: 'lazy' | 'auto' | 'eager'
    marginHeight?: number
    marginWidth?: number
    name?: string
    referrerPolicy?: ReferrerPolicy
    sandbox?: string
    scrolling?: string
    seamless?: boolean
    src?: string
    srcDoc?: string
    width?: number | string
  }

  export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string
    decoding?: 'async' | 'auto' | 'sync'
    importance?: 'low' | 'auto' | 'high'
    height?: number | string
    loading?: 'lazy' | 'auto' | 'eager'
    sizes?: string
    src?: string
    srcSet?: string
    useMap?: string
    width?: number | string
  }

  export interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string
    dateTime?: string
  }

  export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: string
    allowdirs?: boolean
    alt?: string
    autoCapitalize?: any
    autoComplete?: string
    autoFocus?: boolean
    capture?: string // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
    checked?: boolean
    crossOrigin?: string
    defaultChecked?: boolean
    defaultValue?: string
    dirName?: string
    disabled?: boolean
    files?: any
    form?: string
    formAction?: string
    formEncType?: string
    formMethod?: string
    formNoValidate?: boolean
    formTarget?: string
    height?: number | string
    indeterminate?: boolean
    list?: string
    max?: number | string
    maxLength?: number
    min?: number | string
    minLength?: number
    multiple?: boolean
    name?: string
    pattern?: string
    placeholder?: string
    readOnly?: boolean
    required?: boolean
    selectionStart?: number | string
    selectionEnd?: number | string
    selectionDirection?: string
    size?: number
    src?: string
    step?: number | string
    type?: string
    value?: string | string[] | number
    valueAsDate?: any
    valueAsNumber?: any
    webkitDirectory?: boolean
    webkitEntries?: any
    width?: number | string
  }

  export interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean
    challenge?: string
    disabled?: boolean
    form?: string
    keyType?: string
    keyParams?: string
    name?: string
  }

  export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string
    htmlFor?: string
  }

  export interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | string[] | number
  }

  export interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    as?: string
    href?: string
    hrefLang?: string
    importance?: 'low' | 'auto' | 'high'
    integrity?: string
    media?: string
    rel?: string
    sizes?: string
    type?: string
  }

  export interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string
  }

  export interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string
  }

  export interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoPlay?: boolean
    controls?: boolean
    crossOrigin?: string
    loop?: boolean
    mediaGroup?: string
    muted?: boolean
    preload?: string
    src?: string

    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
    onAbort?: (event: Event) => void
    onCanPlay?: (event: Event) => void
    onCanPlayThrough?: (event: Event) => void
    onDurationChange?: (event: Event) => void
    onEmptied?: (event: Event) => void
    onEnded?: (event: Event) => void
    onError?: (event: Event) => void
    onInterruptBegin?: (event: Event) => void
    onInterruptEnd?: (event: Event) => void
    onLoadedData?: (event: Event) => void
    onLoadedMetaData?: (event: Event) => void
    onLoadStart?: (event: Event) => void
    onMozAudioAvailable?: (event: Event) => void
    onPause?: (event: Event) => void
    onPlay?: (event: Event) => void
    onPlaying?: (event: Event) => void
    onProgress?: (event: Event) => void
    onRateChange?: (event: Event) => void
    onSeeked?: (event: Event) => void
    onSeeking?: (event: Event) => void
    onStalled?: (event: Event) => void
    onSuspend?: (event: Event) => void
    onTimeUpdate?: (event: Event) => void
    onVolumeChange?: (event: Event) => void
    onWaiting?: (event: Event) => void
  }

  export interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    charSet?: string
    content?: string
    httpEquiv?: string
    name?: string
  }

  export interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string
    high?: number
    low?: number
    max?: number | string
    min?: number | string
    optimum?: number
    value?: string | string[] | number
  }

  export interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string
  }

  export interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
    classID?: string
    data?: string
    form?: string
    height?: number | string
    name?: string
    type?: string
    useMap?: string
    width?: number | string
    wmode?: string
  }

  export interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
    reversed?: boolean
    start?: number
  }

  export interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean
    label?: string
  }

  export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean
    label?: string
    selected?: boolean
    value?: string | string[] | number
  }

  export interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string
    htmlFor?: string
    name?: string
  }

  export interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string
    value?: string | string[] | number
  }

  export interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
    max?: number | string
    value?: string | string[] | number
  }

  export interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
    async?: boolean
    charSet?: string
    crossOrigin?: string
    defer?: boolean
    importance?: 'low' | 'auto' | 'high'
    integrity?: string
    nonce?: string
    src?: string
    type?: string
  }

  export interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean
    disabled?: boolean
    form?: string
    multiple?: boolean
    name?: string
    required?: boolean
    size?: number
    autoComplete?: string
  }

  export interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string
    sizes?: string
    src?: string
    srcSet?: string
    type?: string
  }

  export interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string
    nonce?: string
    scoped?: boolean
    type?: string
  }

  export interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
    cellPadding?: number | string
    cellSpacing?: number | string
    summary?: string
  }

  export interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean
    cols?: number
    disabled?: boolean
    form?: string
    maxLength?: number
    minLength?: number
    name?: string
    placeholder?: string
    readOnly?: boolean
    required?: boolean
    rows?: number
    value?: string | string[] | number
    wrap?: string
  }

  export interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
    colSpan?: number
    headers?: string
    rowSpan?: number
  }

  export interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
    abbr?: string
    colSpan?: number
    headers?: string
    rowSpan?: number
    scope?: string
  }

  export interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    dateTime?: string
  }

  export interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
    default?: boolean
    kind?: string
    label?: string
    src?: string
    srcLang?: string
  }

  export interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    height?: number | string
    playsInline?: boolean
    poster?: string
    width?: number | string
  }

  export interface SVGAttributes<T = SVGElement> extends DOMAttributes<T> {
    // todo svg attrs
    // Attributes which also defined in HTMLAttributes
    // See comment in SVGDOMPropertyConfig.js
    class?: string
    color?: string
    height?: Numberish
    id?: string
    lang?: string
    max?: Numberish
    media?: string
    method?: string
    min?: Numberish
    name?: string
    style?: string | { [key: string]: string | undefined } | undefined
    target?: string
    type?: string
    width?: Numberish

    // Other HTML properties supported by SVG elements in browsers
    role?: string
    tabindex?: number
    crossorigin?: "anonymous" | "use-credentials" | "" | undefined

    // SVG Specific attributes
    'accent-height'?: Numberish
    accumulate?: 'none' | 'sum'
    additive?: 'replace' | 'sum'
    'alignment-baseline'?:
      | 'auto'
      | 'baseline'
      | 'before-edge'
      | 'text-before-edge'
      | 'middle'
      | 'central'
      | 'after-edge'
      | 'text-after-edge'
      | 'ideographic'
      | 'alphabetic'
      | 'hanging'
      | 'mathematical'
      | 'inherit'
    allowReorder?: 'no' | 'yes'
    alphabetic?: Numberish
    amplitude?: Numberish
    'arabic-form'?: 'initial' | 'medial' | 'terminal' | 'isolated'
    ascent?: Numberish
    attributeName?: string
    attributeType?: string
    autoReverse?: Numberish
    azimuth?: Numberish
    baseFrequency?: Numberish
    'baseline-shift'?: Numberish
    baseProfile?: Numberish
    bbox?: Numberish
    begin?: Numberish
    bias?: Numberish
    by?: Numberish
    calcMode?: Numberish
    'cap-height'?: Numberish
    clip?: Numberish
    'clip-path'?: string
    clipPathUnits?: Numberish
    'clip-rule'?: Numberish
    'color-interpolation'?: Numberish
    'color-interpolation-filters'?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit'
    'color-profile'?: Numberish
    'color-rendering'?: Numberish
    contentScriptType?: Numberish
    contentStyleType?: Numberish
    cursor?: Numberish
    cx?: Numberish
    cy?: Numberish
    d?: string
    decelerate?: Numberish
    descent?: Numberish
    diffuseConstant?: Numberish
    direction?: Numberish
    display?: Numberish
    divisor?: Numberish
    'dominant-baseline'?: Numberish
    dur?: Numberish
    dx?: Numberish
    dy?: Numberish
    edgeMode?: Numberish
    elevation?: Numberish
    'enable-background'?: Numberish
    end?: Numberish
    exponent?: Numberish
    externalResourcesRequired?: Numberish
    fill?: string
    'fill-opacity'?: Numberish
    'fill-rule'?: 'nonzero' | 'evenodd' | 'inherit'
    filter?: string
    filterRes?: Numberish
    filterUnits?: Numberish
    'flood-color'?: Numberish
    'flood-opacity'?: Numberish
    focusable?: Numberish
    'font-family'?: string
    'font-size'?: Numberish
    'font-size-adjust'?: Numberish
    'font-stretch'?: Numberish
    'font-style'?: Numberish
    'font-variant'?: Numberish
    'font-weight'?: Numberish
    format?: Numberish
    from?: Numberish
    fx?: Numberish
    fy?: Numberish
    g1?: Numberish
    g2?: Numberish
    'glyph-name'?: Numberish
    'glyph-orientation-horizontal'?: Numberish
    'glyph-orientation-vertical'?: Numberish
    glyphRef?: Numberish
    gradientTransform?: string
    gradientUnits?: string
    hanging?: Numberish
    'horiz-adv-x'?: Numberish
    'horiz-origin-x'?: Numberish
    href?: string
    ideographic?: Numberish
    'image-rendering'?: Numberish
    in2?: Numberish
    in?: string
    intercept?: Numberish
    k1?: Numberish
    k2?: Numberish
    k3?: Numberish
    k4?: Numberish
    k?: Numberish
    kernelMatrix?: Numberish
    kernelUnitLength?: Numberish
    kerning?: Numberish
    keyPoints?: Numberish
    keySplines?: Numberish
    keyTimes?: Numberish
    lengthAdjust?: Numberish
    'letter-spacing'?: Numberish
    'lighting-color'?: Numberish
    limitingConeAngle?: Numberish
    local?: Numberish
    'marker-end'?: string
    markerHeight?: Numberish
    'marker-mid'?: string
    'marker-start'?: string
    markerUnits?: Numberish
    markerWidth?: Numberish
    mask?: string
    maskContentUnits?: Numberish
    maskUnits?: Numberish
    mathematical?: Numberish
    mode?: Numberish
    numOctaves?: Numberish
    offset?: Numberish
    opacity?: Numberish
    operator?: Numberish
    order?: Numberish
    orient?: Numberish
    orientation?: Numberish
    origin?: Numberish
    overflow?: Numberish
    'overline-position'?: Numberish
    'overline-thickness'?: Numberish
    'paint-order'?: Numberish
    'panose-1'?: Numberish
    pathLength?: Numberish
    patternContentUnits?: string
    patternTransform?: Numberish
    patternUnits?: string
    'pointer-events'?: Numberish
    points?: string
    pointsAtX?: Numberish
    pointsAtY?: Numberish
    pointsAtZ?: Numberish
    preserveAlpha?: Numberish
    preserveAspectRatio?: string
    primitiveUnits?: Numberish
    r?: Numberish
    radius?: Numberish
    refX?: Numberish
    refY?: Numberish
    renderingIntent?: Numberish
    repeatCount?: Numberish
    repeatDur?: Numberish
    requiredExtensions?: Numberish
    requiredFeatures?: Numberish
    restart?: Numberish
    result?: string
    rotate?: Numberish
    rx?: Numberish
    ry?: Numberish
    scale?: Numberish
    seed?: Numberish
    'shape-rendering'?: Numberish
    slope?: Numberish
    spacing?: Numberish
    specularConstant?: Numberish
    specularExponent?: Numberish
    speed?: Numberish
    spreadMethod?: string
    startOffset?: Numberish
    stdDeviation?: Numberish
    stemh?: Numberish
    stemv?: Numberish
    stitchTiles?: Numberish
    'stop-color'?: string
    'stop-opacity'?: Numberish
    'strikethrough-position'?: Numberish
    'strikethrough-thickness'?: Numberish
    string?: Numberish
    stroke?: string
    'stroke-dasharray'?: Numberish
    'stroke-dashoffset'?: Numberish
    'stroke-linecap'?: 'butt' | 'round' | 'square' | 'inherit'
    'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | 'inherit'
    'stroke-miterlimit'?: Numberish
    'stroke-opacity'?: Numberish
    'stroke-width'?: Numberish
    surfaceScale?: Numberish
    systemLanguage?: Numberish
    tableValues?: Numberish
    targetX?: Numberish
    targetY?: Numberish
    'text-anchor'?: string
    'text-decoration'?: Numberish
    textLength?: Numberish
    'text-rendering'?: Numberish
    to?: Numberish
    transform?: string
    u1?: Numberish
    u2?: Numberish
    'underline-position'?: Numberish
    'underline-thickness'?: Numberish
    unicode?: Numberish
    'unicode-bidi'?: Numberish
    'unicode-range'?: Numberish
    'unitsPer-em'?: Numberish
    'v-alphabetic'?: Numberish
    values?: string
    'vector-effect'?: Numberish
    version?: string
    'vert-adv-y'?: Numberish
    'vert-origin-x'?: Numberish
    'vert-origin-y'?: Numberish
    'v-hanging'?: Numberish
    'v-ideographic'?: Numberish
    viewBox?: string
    viewTarget?: Numberish
    visibility?: Numberish
    'v-mathematical'?: Numberish
    widths?: Numberish
    'word-spacing'?: Numberish
    'writing-mode'?: Numberish
    x1?: Numberish
    x2?: Numberish
    x?: Numberish
    xChannelSelector?: string
    'x-height'?: Numberish
    xlinkActuate?: string
    xlinkArcrole?: string
    xlinkHref?: string
    xlinkRole?: string
    xlinkShow?: string
    xlinkTitle?: string
    xlinkType?: string
    xmlns?: string
    y1?: Numberish
    y2?: Numberish
    y?: Numberish
    yChannelSelector?: string
    z?: Numberish
    zoomAndPan?: string
  }

  export interface DOMAttributes<T = Element> {
    // vdom specific
    key?: string | number

    ref?: (elm?: T) => void

    // Clipboard Events
    onCopy?: (event: ClipboardEvent) => void
    // todo events capture
    onCopyCapture?: (event: ClipboardEvent) => void
    onCut?: (event: ClipboardEvent) => void
    onCutCapture?: (event: ClipboardEvent) => void
    onPaste?: (event: ClipboardEvent) => void
    onPasteCapture?: (event: ClipboardEvent) => void

    // Composition Events
    onCompositionEnd?: (event: CompositionEvent) => void
    onCompositionEndCapture?: (event: CompositionEvent) => void
    onCompositionStart?: (event: CompositionEvent) => void
    onCompositionStartCapture?: (event: CompositionEvent) => void
    onCompositionUpdate?: (event: CompositionEvent) => void
    onCompositionUpdateCapture?: (event: CompositionEvent) => void

    // Focus Events
    onFocus?: (event: FocusEvent) => void
    onFocusCapture?: (event: FocusEvent) => void
    onFocusin?: (event: FocusEvent) => void
    onFocusinCapture?: (event: FocusEvent) => void
    onFocusout?: (event: FocusEvent) => void
    onFocusoutCapture?: (event: FocusEvent) => void
    onBlur?: (event: FocusEvent) => void
    onBlurCapture?: (event: FocusEvent) => void

    // Form Events
    onChange?: (event: Event) => void
    onChangeCapture?: (event: Event) => void
    onInput?: (event: Event) => void
    onInputCapture?: (event: Event) => void
    onReset?: (event: Event) => void
    onResetCapture?: (event: Event) => void
    onSubmit?: (event: Event) => void
    onSubmitCapture?: (event: Event) => void
    onInvalid?: (event: Event) => void
    onInvalidCapture?: (event: Event) => void

    // Image Events
    onLoad?: (event: Event) => void
    onLoadCapture?: (event: Event) => void
    onError?: (event: Event) => void // also a Media Event
    onErrorCapture?: (event: Event) => void // also a Media Event

    // Keyboard Events
    onKeyDown?: (event: KeyboardEvent) => void
    onKeyDownCapture?: (event: KeyboardEvent) => void
    onKeyPress?: (event: KeyboardEvent) => void
    onKeyPressCapture?: (event: KeyboardEvent) => void
    onKeyUp?: (event: KeyboardEvent) => void
    onKeyUpCapture?: (event: KeyboardEvent) => void

    // MouseEvents
    onAuxClick?: (event: MouseEvent) => void
    onClick?: (event: MouseEvent) => void
    onClickCapture?: (event: MouseEvent) => void
    onContextMenu?: (event: MouseEvent) => void
    onContextMenuCapture?: (event: MouseEvent) => void
    onDblClick?: (event: MouseEvent) => void
    onDblClickCapture?: (event: MouseEvent) => void
    onDrag?: (event: DragEvent) => void
    onDragCapture?: (event: DragEvent) => void
    onDragEnd?: (event: DragEvent) => void
    onDragEndCapture?: (event: DragEvent) => void
    onDragEnter?: (event: DragEvent) => void
    onDragEnterCapture?: (event: DragEvent) => void
    onDragExit?: (event: DragEvent) => void
    onDragExitCapture?: (event: DragEvent) => void
    onDragLeave?: (event: DragEvent) => void
    onDragLeaveCapture?: (event: DragEvent) => void
    onDragOver?: (event: DragEvent) => void
    onDragOverCapture?: (event: DragEvent) => void
    onDragStart?: (event: DragEvent) => void
    onDragStartCapture?: (event: DragEvent) => void
    onDrop?: (event: DragEvent) => void
    onDropCapture?: (event: DragEvent) => void
    onMouseDown?: (event: MouseEvent) => void
    onMouseDownCapture?: (event: MouseEvent) => void
    onMouseEnter?: (event: MouseEvent) => void
    onMouseLeave?: (event: MouseEvent) => void
    onMouseMove?: (event: MouseEvent) => void
    onMouseMoveCapture?: (event: MouseEvent) => void
    onMouseOut?: (event: MouseEvent) => void
    onMouseOutCapture?: (event: MouseEvent) => void
    onMouseOver?: (event: MouseEvent) => void
    onMouseOverCapture?: (event: MouseEvent) => void
    onMouseUp?: (event: MouseEvent) => void
    onMouseUpCapture?: (event: MouseEvent) => void

    // Touch Events
    onTouchCancel?: (event: TouchEvent) => void
    onTouchCancelCapture?: (event: TouchEvent) => void
    onTouchEnd?: (event: TouchEvent) => void
    onTouchEndCapture?: (event: TouchEvent) => void
    onTouchMove?: (event: TouchEvent) => void
    onTouchMoveCapture?: (event: TouchEvent) => void
    onTouchStart?: (event: TouchEvent) => void
    onTouchStartCapture?: (event: TouchEvent) => void

    // Pointer Events
    onPointerDown?: (event: PointerEvent) => void
    onPointerDownCapture?: (event: PointerEvent) => void
    onPointerMove?: (event: PointerEvent) => void
    onPointerMoveCapture?: (event: PointerEvent) => void
    onPointerUp?: (event: PointerEvent) => void
    onPointerUpCapture?: (event: PointerEvent) => void
    onPointerCancel?: (event: PointerEvent) => void
    onPointerCancelCapture?: (event: PointerEvent) => void
    onPointerEnter?: (event: PointerEvent) => void
    onPointerEnterCapture?: (event: PointerEvent) => void
    onPointerLeave?: (event: PointerEvent) => void
    onPointerLeaveCapture?: (event: PointerEvent) => void
    onPointerOver?: (event: PointerEvent) => void
    onPointerOverCapture?: (event: PointerEvent) => void
    onPointerOut?: (event: PointerEvent) => void
    onPointerOutCapture?: (event: PointerEvent) => void
    onGotPointerCapture?: (event: PointerEvent) => void
    onGotPointerCaptureCapture?: (event: PointerEvent) => void
    onLostPointerCapture?: (event: PointerEvent) => void
    onLostPointerCaptureCapture?: (event: PointerEvent) => void

    // UI Events
    onScroll?: (event: UIEvent) => void
    onScrollCapture?: (event: UIEvent) => void

    // Wheel Events
    onWheel?: (event: WheelEvent) => void
    onWheelCapture?: (event: WheelEvent) => void

    // Animation Events
    onAnimationStart?: (event: AnimationEvent) => void
    onAnimationStartCapture?: (event: AnimationEvent) => void
    onAnimationEnd?: (event: AnimationEvent) => void
    onAnimationEndCapture?: (event: AnimationEvent) => void
    onAnimationIteration?: (event: AnimationEvent) => void
    onAnimationIterationCapture?: (event: AnimationEvent) => void

    // Transition Events
    onTransitionEnd?: (event: TransitionEvent) => void
    onTransitionEndCapture?: (event: TransitionEvent) => void
  }
}
