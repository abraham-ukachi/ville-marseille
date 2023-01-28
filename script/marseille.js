'use-strict'; /* <- This keeps me on my toes, as it forces me to use all pre-defined variables 😅 */

/* > I'm so hungry 😭 ...
 * > Guess what I wanna eat right now ?
 *
 * [hint]: JavaScript, Yummy!!! 😛
 */

/* Allow me to eat some more JS please 🙏 */


// Define default constant variables
const LANG = 'en'; // <- default language. Other supported languages are 'fr' (French) and 'ru' (Russian).
const THEME = 'dark'; // <- default theme. Other supported themes are 'light' & 'classic'
const PAGE = 'marseille.html';
  //   ^^^^^^ TODO: Change this to 'index.html' before deploying to Plesk.
const LAYOUT_MOBILE = 'mobile';
const LAYOUT_LAPTOP = 'laptop';
// dialogs
const DIALOG_THEME = 'theme';
const DIALOG_TRANSLATE = 'translate';



// Create a `MarseilleBebe` class
class MarseilleBebe {
  
  // Define some constant variables
  

  // Define a constructor method that will 
  // be executed automatically when a new object (eg. m33) is created.

  /*
   * Constructor of MarseilleBebe class
   *
   * @param { String } lang
   * @param { String } theme
   * @param { String } page
   */
  constructor(lang = 'en', theme = 'dark', page = 'index.html') {
    // Initialize public attributes
    this.lang = lang;
    this.theme = theme;
    this.page = page;

    // Initialize private attributes
    this._lang = '';
    this._theme = '';
    this._page = '';
    this._supportedLayouts = ['mobile', 'laptop'];

  }




  /* >> Public Setters << */

  /**
   *
   * Sets the value of `lang` in storage, if supported by browser.
   */
  set lang(value) {

    // Carefully set the local storage values with `lang` as item
    this._setLocalStorageItem('lang', value);
 
    // update the private language attributes(i.e. `_lang`) with the given `value`
    this._lang = value;
  }


  /**
   *
   * Sets the value of `theme` in storage, if supported by browser.
   */
  set theme(value) {
    // Carefully set the local storage values with `theme` as item
    this._setLocalStorageItem('theme', value);
 
    // update the private language attributes(i.e. `_theme`) with the given `value`
    this._theme = value;   
  }


  /**
   *
   * Sets the value of `page` in storage, if supported by browser.
   */
  set page(value) {
    // Carefully set the local storage values with `page` as item
    this._setLocalStorageItem('page', value);
 
    // update the private language attributes(i.e. `_page`) with the given `value`
    this._page = value;
  }


  /**
   * Sets the `_layout` of m33 to the given `value`
   *
   * @param { String } value
   */
  set currentLayout(value) {
    this._layout = value;
  }


  /* *>> END of Public Setters <<* */







  /* >> Public Getters << */ 

  /**
   * Returns the value of `lang` from the local storage (if possible)
   */
  get lang() {
    
    return this._browserSupportStorage ? localStorage.getItem('lang') : this._lang;
  }
 

  /**
   * Returns the value of `theme` from the local storage (if possible)
   */
  get theme() {
    
    return this._browserSupportStorage ? localStorage.getItem('theme') : this._theme;
  }

  /**
   * Returns the value of `page` from the local storage (if possible)
   */
  get page() {
    
    return this._browserSupportStorage ? localStorage.getItem('page') : this._page;
  }


  /**
   * Returns the current layout (eg. mobile or laptop) of the app. 
   *
   * @return { String } layout
   */
  get currentLayout() {
    return (typeof(this._layout) !== 'undefined') ? this._layout : "";
  }


  /**
   * Returns the dialogs view element
   *
   * @return { Element } dialogsView
   */
  get dialogsView() {
    return document.getElementById('dialogs');
  }

  /**
   * Returns the backdrop element
   *
   * @return { Element } backdropEl
   */
  get backdropEl() {
    return document.getElementById('backdrop');
  }


  /**
   * Returns the id of the currently opened dialog
   *
   * @return { String } 
   */
  get currentDialogId() {
    // get the list of currently opened dialog element as `openedDialog`
    let openDialogList = document.querySelector('.dialog:not([hidden])');
    return openDialogList[0] ? openDialogList[0].id.split('Dialog')[0] : '';
  }

  /* *>> END of Public Getter <<* */





  /* >> Public Methods << */


  /**
   * Method used to install a media-query watcher.
   * This method listens for changes in the media-query result of the given `breakpoint`.
   *
   * Example:
   *
   *   let m33 = new MarseilleBebe('fr');
   *   m33.installMediaQueryWatcher(460, _onNarrowLayout, _onWideLayout);
   *
   * @param { Number } breakpoint
   * @param { Function } narrowLayoutCallback
   * @param { Function } wideLayoutCallback
   */
  installMediaQueryWatcher(breakpoint, narrowLayoutCallback, wideLayoutCallback) {
    // Create a width media query with the given `breakpoint` as `widthMediaQuery`
    let widthMediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);

    // Handle the media query matches
    this._handleMediaMatches(widthMediaQuery.matches, narrowLayoutCallback, wideLayoutCallback,  true);

    // Add a listener to `widthMediaQuery`
    widthMediaQuery.addListener((data) => {
      this._handleMediaMatches(data.matches, narrowLayoutCallback, wideLayoutCallback, false);

      // DEBUG [4dbsmaster]: tell me about it :)
      console.log(`\x1b[34m[installMediaQueryWatcher](2):\x1b[0m data => `, data);
    });


    // DEBUG [4dbsmaster]: tell me about it :)
    console.log(`\x1b[34m[installMediaQueryWatcher](1):\x1b[0m widthMediaQuery => `, widthMediaQuery);

  }


  /**
   * Method used to add event listeners to the more tab button (ie. `<button id="moreTabButton">`)
   */
  addMoreTabButtonListeners() {
    // get the moreTabButton element as `moreTabButtonEl`
    this.moreTabButtonEl = document.getElementById('moreTabButton');

    // Do nothing if there's no more tab button element
    if (!this.moreTabButtonEl) { return }
    
    // Add the 'click' event listener
    this.moreTabButtonEl.addEventListener('click', this._handleMoreTabButtonClick);

    // DEBUG [4dbsmaster]: tell me about it :)
    console.log(`%c[addMoreTabButtonListeners]: this.moreTabButtonEl => `, 'background:black', this.moreTabButtonEl);
 }


 /**
  * Method used to add event listeners to the toolbar icon buttons 
  * Example: `<button class="icon-button">`
  */
 addToolbarButtonListeners() {
   // get all the toolbar icon buttons as `toolbarIconButtons`
   this.toolbarIconButtons = document.querySelectorAll('#toolbar button.icon-button');

   // Do nothing if there are no toolbar icon buttons
   if (!this.toolbarIconButtons.length) { return }
 
   // DEBUG [4dbsmaster]: tell me about it :)
   console.log(`[addToolbarButtonListeners]: toolbarIconButtons => `, this.toolbarIconButtons);
    
   // For each toolbar icon button as `toolbarIconButtonEl`...
   this.toolbarIconButtons.forEach((toolbarIconButtonEl) => {
     // ...extract the dialog from `toolbarIconButtonEl` as `dialogId`
     let dialogId = toolbarIconButtonEl.id.split('IconButton')[0]; // <- returns 'translate' or 'theme'
     // Add a 'click even listener to the `toolbarIconButtonEl`
     toolbarIconButtonEl.addEventListener('click', () => this.openDialogById(dialogId));
     // DEBUG [4dbsmaste]: tell me about it :)
     // console.log(`[toolbarIconButtons.forEach]: dialogId => ${dialogId}`);
   });

   // Add a 'click' event listener to both `translateIconButtonEl` and `themeIconButtonEl`
   // this.translateIconButtonEl.addEventListener('click', this._handleTranslateIconButtonClick);

 }

 
 /**
  * Opens the dialog with the given `dialogId`
  *
  * @param { String } dialogId - without the 'Dialog' (i.e. 'translate' instead of 'translateDialog')
  */
 openDialogById(dialogId = '') { // <- HACK: not the best method

   // Get the dialog element as `dialogEl`
   let dialogEl = document.getElementById(`${dialogId}Dialog`);

   // DEBUG [4dbsmaster]: tell me about it :)
   console.log(`[openDialogById](1): dialogId => ${dialogId}`);
   console.log(`[openDialogById](2): dialogEl => `, dialogEl);

   // Do nothing if there's no dialog or no `dialogId`
   if (!dialogEl || !dialogId.length) { return }


   // Show the backdrop 
   // by setting the `hidden` attribute of `backdropEl` to `false`
   this.backdropEl.hidden = false;

   // Show the dialogs view 
   // by setting the `hidden` attribute of `dialogsView` to `false`
   this.dialogsView.hidden = false;
  
   // Now, show the dialog element
   dialogEl.hidden = false;

   // DEBUG [4dbsmaster]: tell me about it :)
   // console.log(`[openDialogById](3): dialogEl => `, dialogEl);
   
 }

 
 /**
  * Closes the dialog with the given `dialogId`
  *
  * @param { String } dialogId - withoud the trailing 'Dialog'.
  */
 closeDialogById(dialogId) {
   // Do nothing if there's no `dialogId`
   if (typeof(dialogId) === 'undefined') { return }

   // Get the dialog element as `dialogEl`
   let dialogEl = document.getElementById(`${dialogId}Dialog`);
    
   // Now, hide the dialog element
   // by setting the `hidden` attribute of `dialogEl` to `true`
   dialogEl.hidden = true;

   // Show the dialogs view 
   // by setting the `hidden` attribute of `dialogsView` to `true`
   this.dialogsView.hidden = true;

   // Hide the backdrop 
   // by setting the `hidden` attribute of `backdropEl` to `true`
   this.backdropEl.hidden = true;
 }



 /**
  * Method used to update the current layout with the given `layout`
  *
  * @param { String } layout - currently supported layouts are 'mobile' and 'laptop'
  */
 updateLayout(layout) {
   // DEBUG [4dbsmaster]: tell me about it :)
   console.log(`\x1b[33m[updateLayout]: layout => ${layout}\x1b[0m`);

   // Do nothing if the given layout is not supported
   if (!this._supportedLayouts.includes(layout)) { return }
  
   // Update the current layout with the given `layout`
   this.currentLayout = layout;
   // Notify the layout change
   this._notifyLayoutChange();
 }

  


  /* *>> END of Public Methods << */




  /* >> Private Methods << */

  /**
   * Handler that is called whenever the `<button id="moreTabButton">` element is clicked.
   *
   * @param { PointerEvent } event
   */
  _handleMoreTabButtonClick(event) {

    // Toggling the drawer-opened attribute in <body>
    
    if (document.body.hasAttribute('drawer-opened')) {
      // ... remove the `drawer-opened` attribute
      document.body.removeAttribute('drawer-opened');

    }else {
      // ... add the 'drawer-opened' attribute
      document.body.setAttribute('drawer-opened', '');
    }


    // DEBUG [4dbsmaster]: tell me about it :)
    console.log(`%c[_handleMoreTabButtonClick]: event => `, 'background:white;color:black;', event);
  }


  /**
   * Method only used to set the value of the given item in local storage, if it doesn't exist
   *
   * @param { Sring } item
   * @param { String } value
   */
  _setLocalStorageItem(item, value) {

    // DEBUG [4dbsmaster]: tell me about it :)
    console.log(`\x1b[1m[_setLocalStorageItem](1):\x1b[0m item => ${item} & value => ${value}`);
    console.log(`\x1b[1m[_setLocalStorageItem](2):\x1b[0m this._browserSupportStorage => ${this._browserSupportStorage}`);

    // If the browser supports `Storage`...
    if (this._browserSupportStorage) { 
      // ...get the current value of `item` from local storage as `currentValue`
      let currentValue = localStorage.getItem(item);
      
      // Do nothing if there's already a current value
      if (currentValue !== null) { return }
      
      // Else, continue and set the item in `Storage` w/ the given `value`
      localStorage.setItem(item, value);
      
      // DEBUG [4dbsmaster]: tell me about it :)
      console.log(`\x1b[32[_setLocalStorageItem](3):\x1b[0m item has been set in local storage`, localStorage);

    }

  }


  /**
   * Method used to handle the media query `matches`
   *
   * @param { Boolean } matches
   * @param { Function } narrowLayoutCallback
   * @param { Function } wideLayoutCallback
   * @param { Boolean } firstQuery
   */
  _handleMediaMatches(matches, narrowLayoutCallback, wideLayoutCallback, firstQuery) {

      // if the data matches (ie. width is more than the breakpoint)...
      if (matches) {
       
        // if theres a wide layout callback or function...
        if (typeof(wideLayoutCallback) == 'function') {
          // run the wide layout callback function w/ the query data
          wideLayoutCallback(firstQuery);
        }
        
        // DEBUG [4dbsmaster]: tell me about it :)
        console.log(`\x1b[35m[_handleMediaMatches](1):\x1b[0m \
          typeof(wideLayoutCallback) => ${typeof(wideLayoutCallback)}`);

      } else {
        // if theres a narrow layout callback or function...
        if (typeof(narrowLayoutCallback) == 'function') {
          // run the narrow layout callback function w/ the query data
          narrowLayoutCallback(firstQuery);
        }

        // DEBUG [4dbsmaster]: tell me about it :)
        console.log(`\x1b[35m[_handleMediaMatches](2):\x1b[0m \
          typeof(narrowLayoutCallback) => ${typeof(narrowLayoutCallback)}`);

      }
      
      // DEBUG [4dbsmaster]: tell me about it :)
      console.log(`\x1b[35m[_handleMediaMatches](3):\x1b[0m firstQuery => ${firstQuery}`);
  }

  
  /**
   * Method used to notify the app of a layout change
   * NOTE: This method updates the `isMobile` and `isLaptop` 
   *       values according to the `currentLayout` value
   */
  _notifyLayoutChange() {
    // If the `currentLayout` is  `mobile`, set `isMobile` to `true`
    this.isMobile = (this.currentLayout == LAYOUT_MOBILE) ? true : false;
    // If the `currentLayout` is  `laptop`, set `isMobile` to `true`
    this.isLaptop = (this.currentLayout == LAYOUT_LAPTOP) ? true : false;

    // TODO: Dispatch a custom event (named 'on-layout-change' ?)

    // DEBUG [4dbsmaster]: tell me about it :)
    console.log(`\x1b[36m[_notifyLayoutChange](1): currentLayout => ${this.currentLayout}\x1b[0m`);
    console.log(`\x1b[36m[_notifyLayoutChange](2): isMobile ? ${this.isMobile}\x1b[0m`);
    console.log(`\x1b[36m[_notifyLayoutChange](3): isLaptop ? ${this.isLaptop}\x1b[0m`);
  }

  /* *>> END of Private Methods << */








  /* >> Private Setters << */

  /* *>> End of Private Setters <<* */





  /* >> Private Getters << */

  /* 
   * Returns `true` if the browser supports `Storage`
   *
   * @returns { Boolean } 
   */
  get _browserSupportStorage() {
    return (typeof(Storage) !== 'undefined') ? true : false;
  }

  /* *>> END of Private Getters <<* */


};

// END of 'Marseille Bebe' class






/* Okay, thanks!! Now let's wait again for the page to load by listening to the `load` event */
/* When the current page is done loading... */
window.addEventListener('load', (event) => {
  // ...create an object of the MarseilleBebe class as `m33` (a global variable)
  window.m33 = new MarseilleBebe(LANG, THEME, PAGE);
  // Install Media Query Watcher with a "460px" breakpoint
  window.m33.installMediaQueryWatcher(460, _onMobileLayout, _onWideLayout);
  // Now, let's add some listeners to the more tab button
  window.m33.addMoreTabButtonListeners();
  
  // When marseilleBebe (defined marseille.html), messy i know!!
  marseilleBebe.onReady = () => {
    // DEBUG [4dbsmaster]: tell me about it :)
    console.log(`\x1b[36m[marseilleBebe.onReady]: WE ARE READY !!!\x1b[0m`);
    // add listeners to the toolbar icon buttons
    window.m33.addToolbarButtonListeners();
  };
   
  /* DEBUG [4dbsmaster]: tell me about it :) */
  //console.log(`[load](1): window.m33 => `, window.m33);
  // console.log(`[load](1): PATH_NAME => ${PATH_NAME}`);
  // console.log(`[load](2): HOSTNAME => ${HOST_NAME}`);

});


/**
 * Handler that is called whenever the window is resized to a mobile layout
 *
 * @param { Boolean } firstQuery
 */
let _onMobileLayout = (firstQuery) => {

  // Update the layout w/ `LAYOUT_MOBILE`
  window.m33.updateLayout(LAYOUT_MOBILE); // <- TODO: Insert this into MarseilleBebe class

  
  // TODO: Do something else here whenever the layout switches or changes to `narrow` (i.e. mobile)
  

  // For testing purposes, hiding the copyright dot element...
  // get the copyright dot element as `copyrightDotEl`
  let copyrightDotEl = document.querySelector('.copyright-footer > span.dot');
  // hide the `copyrightDotEl`
  copyrightDotEl.hidden = true;

  
  // DEBUG [4dbsmaster]: tell me about it :)
  console.log(`\x1b[32m[_onMobileLayout](1):\x1b[0m fstQuery => ${firstQuery}`);
  console.log(`\x1b[32m[_onMobileLayout](2):\x1b[0m copyrightDotEl => `, copyrightDotEl);
};


/**
 * Handler that is called whenever the window is resized to a wide layout
 *
 * @param { Boolean } firstQuery
 */
let _onWideLayout = (firstQuery) => {
  // Update the layout w/ `LAYOUT_LAPTOP`
  window.m33.updateLayout(LAYOUT_LAPTOP); // <- TODO: Insert this into MarseilleBebe class

  // TODO: Do something else here whenever the layout switches or changes to `wide` (i.e. laptop)
  

  // For testing purposes, hiding the copyright dot element...
  // get the copyright dot element as `copyrightDotEl`
  let copyrightDotEl = document.querySelector('.copyright-footer > span.dot');
  // hide the `copyrightDotEl`
  copyrightDotEl.hidden = false;

  // DEBUG [4dbsmaster]: tell me about it :)
  console.log(`\x1b[31m[_onWideLayout](1):\x1b[0m firstQuery => ${firstQuery}`);
  console.log(`\x1b[31m[_onWideLayout](2):\x1b[0m copyrightDotEl => `, copyrightDotEl);
};


