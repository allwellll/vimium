"use strict";
__filename = "content/extend_click_ff.js";
define([ "require", "exports", "../lib/utils", "../lib/dom_utils", "./insert", "./port", "./link_hints", "./key_handler" ], function(require, exports, utils_1, dom_utils_1, insert_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.dispatchAndBlockClickOnce_old_ff = exports.prepareToBlockClick_old_ff = exports.unblockClick_old_ff = exports.main_ff = exports.clickEventToPrevent_ = void 0;
  /** `null`: disabled; `false`: nothing to do; `true`: begin to watch; `Event`: watching; `0`: page prevented */  let clickEventToPrevent_;
  exports.clickEventToPrevent_ = clickEventToPrevent_;
  let clickAnchor_ = 0;
  let isClickEventPreventedByPage = 0;
  let preventEventOnWindow;
  let hookMethods;
  const eportToMainWorld = (obj, name, func) => {
    exportFunction(func, obj, {
      defineAs: name,
      allowCrossOriginArguments: true
    });
  };
  exports.main_ff = 0;
  const unblockClick_old_ff = () => {
    let notDuringAct;
    /**
         * This idea of hooking and appending `preventDefault` is from lydell's `LinkHints`:
         * https://github.com/lydell/LinkHints/blob/efa18fdfbf95016bd706b83a2d51545cb157b440/src/worker/Program.js#L1337-L1631
         */    try {
      const PEvent = window.Event, EventCls = PEvent && PEvent.prototype, wrappedCls = utils_1.isAsContent ? EventCls && utils_1.raw_unwrap_ff(EventCls) : EventCls, stdMembers = wrappedCls ? [ [ wrappedCls.preventDefault, 0 /* kAct.prevent */ ], [ wrappedCls.stopImmediatePropagation, 1 /* kAct.stopImm */ ], [ wrappedCls.stopPropagation, 2 /* kAct.stopProp */ ] ] : [], tryToPreventClick = event => {
        if (event !== clickEventToPrevent_) {} else if (event.defaultPrevented) {
          isClickEventPreventedByPage & 2 || (isClickEventPreventedByPage = 1);
        } else {
          // MUST NOT clear `clickEventToPrevent_` here
          callPreviousPreventSafely(event);
          console.log("Vimium C: event#click calls .prevetDefault at %o on %o", event.eventPhase > 2 ? "bubble" : event.eventPhase > 1 ? "target" : "capture", event.currentTarget === window ? "#window" : event.currentTarget);
        }
      }, callPreviousPreventSafely = event => {
        // avoid re-entry during calling the previous `preventDefault`
        if (notDuringAct && (!clickAnchor_ || clickAnchor_.target === "_blank")) {
          isClickEventPreventedByPage = 0;
          notDuringAct = 0;
          try {
            utils_1.reflectApply_not_cr(stdMembers[0 /* kAct.prevent */ ][0], event, []);
          } catch (e) {}
          notDuringAct = 1;
        }
      };
      hookMethods = (setter, event) => {
        for (const [stdFunc, idx] of stdMembers) {
          /*#__ENABLE_SCOPED__*/
          setter(event, stdFunc.name, function() {
            const self = this, ret = utils_1.reflectApply_not_cr(stdFunc, self, arguments);
            self === clickEventToPrevent_ && (idx < 1 /* kAct.stopImm */ ? isClickEventPreventedByPage = 1 : self.defaultPrevented ? isClickEventPreventedByPage & 2 || (isClickEventPreventedByPage = 1) : idx > 1 ? (tryToPreventClick(self), 
            isClickEventPreventedByPage = 2) : callPreviousPreventSafely(self));
 // idx === kAct.stopImm
                        return ret;
          });
        }
      };
      insert_1.grabBackFocus && utils_1.isAsContent && stdMembers.every(i => utils_1.isTY(i[0], 2 /* kTY.func */)) && hookMethods(eportToMainWorld, EventCls);
      preventEventOnWindow = wnd => {
        isClickEventPreventedByPage = notDuringAct = 1;
        utils_1.setupEventListener(wnd, dom_utils_1.CLK, tryToPreventClick, 0, 3);
        return tryToPreventClick;
      };
      exports.clickEventToPrevent_ = clickEventToPrevent_ = 0;
    } catch (e) {
      utils_1.recordLog("Vimium C: hooking Event::preventDefault crashed in %o @t=%o .")(), 
      console.log(e);
    }
  };
  exports.unblockClick_old_ff = unblockClick_old_ff;
  const prepareToBlockClick_old_ff = (doesBeginPrevent, anchor) => {
    exports.clickEventToPrevent_ = clickEventToPrevent_ = clickEventToPrevent_ != null ? doesBeginPrevent : clickEventToPrevent_;
    clickAnchor_ = clickEventToPrevent_ && anchor;
  };
  exports.prepareToBlockClick_old_ff = prepareToBlockClick_old_ff;
  const dispatchAndBlockClickOnce_old_ff = async (targetElement, clickEvent) => {
    const view = targetElement.ownerDocument.defaultView;
    const doesBlock = view === window;
    let toRemove;
    view === utils_1.raw_unwrap_ff(window) && console.log("Assert error: a target element is bound to window.wrappedJSObject");
    if (doesBlock) {
      exports.clickEventToPrevent_ = clickEventToPrevent_ = clickEvent;
      toRemove = preventEventOnWindow(view);
      utils_1.isAsContent || hookMethods((a, k, v) => {
        a[k] = v;
      }, clickEvent);
    }
    const rawDispatchRetVal = await dom_utils_1.dispatchAsync_(targetElement, clickEvent), wrappedRetVal = rawDispatchRetVal || doesBlock && !(isClickEventPreventedByPage & 1);
    toRemove && utils_1.setupEventListener(view, dom_utils_1.CLK, toRemove, 1, 3);
    console.log("Vimium C: try blocking a click event, and the returned is %o when %s %o, so return %o", rawDispatchRetVal, "clickEventToPrevent_ is", clickEventToPrevent_ && utils_1.isTY(clickEventToPrevent_, 1 /* kTY.obj */) ? "<Event>" : clickEventToPrevent_, wrappedRetVal);
    exports.clickEventToPrevent_ = clickEventToPrevent_ = clickAnchor_ = 0;
    return wrappedRetVal;
  };
  exports.dispatchAndBlockClickOnce_old_ff = dispatchAndBlockClickOnce_old_ff;
});