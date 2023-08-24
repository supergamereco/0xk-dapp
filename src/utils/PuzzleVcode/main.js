!(function (t, e) {
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
        ? define([], e)
        : "object" == typeof exports
        ? (exports["vue-puzzle-vcode"] = e())
        : (t["vue-puzzle-vcode"] = e());
})(this, function () {
    return (function () {
        "use strict";
        var t = {
                358: function (t, e, n) {
                    var i = n(81),
                        s = n.n(i),
                        a = n(645),
                        o = n.n(a)()(s());
                    o.push([
                        t.id,
                        ".vue-puzzle-vcode {\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  z-index: 999;\n  opacity: 0;\n  pointer-events: none;\n  -webkit-transition: opacity 200ms;\n  transition: opacity 200ms;\n}\n.vue-puzzle-vcode.show_ {\n  opacity: 1;\n  pointer-events: auto;\n}\n.vue-auth-box_ {\n  position: absolute;\n  top: 40%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  padding: 20px;\n  background: #fff;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  border-radius: 3px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n}\n.vue-auth-box_ .auth-body_ {\n  position: relative;\n  overflow: hidden;\n  border-radius: 3px;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  z-index: 20;\n  opacity: 1;\n  -webkit-transition: opacity 200ms;\n  transition: opacity 200ms;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.vue-auth-box_ .auth-body_ .loading-box_.hide_ {\n  opacity: 0;\n  pointer-events: none;\n}\n.vue-auth-box_ .auth-body_ .loading-box_.hide_ .loading-gif_ span {\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ {\n  -webkit-box-flex: 0;\n  -webkit-flex: none;\n          flex: none;\n  height: 5px;\n  line-height: 0;\n}\n@-webkit-keyframes load {\n0% {\n    opacity: 1;\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3);\n}\n100% {\n    opacity: 0.2;\n    -webkit-transform: scale(0.3);\n            transform: scale(0.3);\n}\n}\n@keyframes load {\n0% {\n    opacity: 1;\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3);\n}\n100% {\n    opacity: 0.2;\n    -webkit-transform: scale(0.3);\n            transform: scale(0.3);\n}\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span {\n  display: inline-block;\n  width: 5px;\n  height: 100%;\n  margin-left: 2px;\n  border-radius: 50%;\n  background-color: #888;\n  -webkit-animation: load 1.04s ease infinite;\n          animation: load 1.04s ease infinite;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span:nth-child(1) {\n  margin-left: 0;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span:nth-child(2) {\n  -webkit-animation-delay: 0.13s;\n          animation-delay: 0.13s;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span:nth-child(3) {\n  -webkit-animation-delay: 0.26s;\n          animation-delay: 0.26s;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span:nth-child(4) {\n  -webkit-animation-delay: 0.39s;\n          animation-delay: 0.39s;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span:nth-child(5) {\n  -webkit-animation-delay: 0.52s;\n          animation-delay: 0.52s;\n}\n.vue-auth-box_ .auth-body_ .info-box_ {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 24px;\n  line-height: 24px;\n  text-align: center;\n  overflow: hidden;\n  font-size: 13px;\n  background-color: #83ce3f;\n  opacity: 0;\n  -webkit-transform: translateY(24px);\n          transform: translateY(24px);\n  -webkit-transition: all 200ms;\n  transition: all 200ms;\n  color: #fff;\n  z-index: 10;\n}\n.vue-auth-box_ .auth-body_ .info-box_.show {\n  opacity: 0.95;\n  -webkit-transform: translateY(0);\n          transform: translateY(0);\n}\n.vue-auth-box_ .auth-body_ .info-box_.fail {\n  background-color: #ce594b;\n}\n.vue-auth-box_ .auth-body_ .auth-canvas2_ {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 60px;\n  height: 100%;\n  z-index: 2;\n}\n.vue-auth-box_ .auth-body_ .auth-canvas3_ {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  -webkit-transition: opacity 600ms;\n  transition: opacity 600ms;\n  z-index: 3;\n}\n.vue-auth-box_ .auth-body_ .auth-canvas3_.show {\n  opacity: 1;\n}\n.vue-auth-box_ .auth-body_ .flash_ {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 30px;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.1);\n  z-index: 3;\n}\n.vue-auth-box_ .auth-body_ .flash_.show {\n  -webkit-transition: -webkit-transform 600ms;\n  transition: -webkit-transform 600ms;\n  transition: transform 600ms;\n  transition: transform 600ms, -webkit-transform 600ms;\n}\n.vue-auth-box_ .auth-body_ .info_ {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 35px;\n  height: auto;\n  z-index: 12;\n  cursor: pointer;\n  -webkit-transition: -webkit-transform 200ms;\n  transition: -webkit-transform 200ms;\n  transition: transform 200ms;\n  transition: transform 200ms, -webkit-transform 200ms;\n  -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n}\n.vue-auth-box_ .auth-body_ .btn-close_ {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 35px;\n  height: auto;\n  z-index: 12;\n  cursor: pointer;\n  -webkit-transition: -webkit-transform 200ms;\n  transition: -webkit-transform 200ms;\n  transition: transform 200ms;\n  transition: transform 200ms, -webkit-transform 200ms;\n  -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n}\n.vue-auth-box_ .auth-body_ .reset_ {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 35px;\n  height: auto;\n  z-index: 12;\n  cursor: pointer;\n  -webkit-transition: -webkit-transform 200ms;\n  transition: -webkit-transform 200ms;\n  transition: transform 200ms;\n  transition: transform 200ms, -webkit-transform 200ms;\n  -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n}\n.vue-auth-box_ .auth-body_ .reset_:hover {\n  -webkit-transform: rotate(-90deg);\n          transform: rotate(-90deg);\n}\n.vue-auth-box_ .auth-control_ .range-box {\n  position: relative;\n  width: 100%;\n  background-color: #eef1f8;\n  margin-top: 20px;\n  border-radius: 3px;\n  box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-text {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  font-size: 14px;\n  color: #b7bcd1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: center;\n  width: 100%;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider {\n  position: absolute;\n  height: 100%;\n  width: 50px;\n  background-color: rgba(106, 160, 255, 0.8);\n  border-radius: 3px;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn {\n  position: absolute;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  right: 0;\n  width: 50px;\n  height: 100%;\n  background-color: #fff;\n  border-radius: 3px;\n  box-shadow: 0 0 4px #ccc;\n  cursor: pointer;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn > div {\n  width: 0;\n  height: 40%;\n  -webkit-transition: all 200ms;\n  transition: all 200ms;\n  border: solid 1px #6aa0ff;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn > div:nth-child(2) {\n  margin: 0 4px;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn:hover > div:first-child,\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn.isDown > div:first-child {\n  border: solid 4px transparent;\n  height: 0;\n  border-right-color: #6aa0ff;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn:hover > div:nth-child(2),\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn.isDown > div:nth-child(2) {\n  border-width: 3px;\n  height: 0;\n  border-radius: 3px;\n  margin: 0 6px;\n  border-right-color: #6aa0ff;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn:hover > div:nth-child(3),\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn.isDown > div:nth-child(3) {\n  border: solid 4px transparent;\n  height: 0;\n  border-left-color: #6aa0ff;\n}\n.vue-puzzle-overflow {\n  overflow: hidden !important;\n}\n",
                        "",
                    ]),
                        (e.Z = o);
                },
                645: function (t) {
                    t.exports = function (t) {
                        var e = [];
                        return (
                            (e.toString = function () {
                                return this.map(function (e) {
                                    var n = "",
                                        i = void 0 !== e[5];
                                    return (
                                        e[4] &&
                                            (n += "@supports (".concat(
                                                e[4],
                                                ") {"
                                            )),
                                        e[2] &&
                                            (n += "@media ".concat(e[2], " {")),
                                        i &&
                                            (n += "@layer".concat(
                                                e[5].length > 0
                                                    ? " ".concat(e[5])
                                                    : "",
                                                " {"
                                            )),
                                        (n += t(e)),
                                        i && (n += "}"),
                                        e[2] && (n += "}"),
                                        e[4] && (n += "}"),
                                        n
                                    );
                                }).join("");
                            }),
                            (e.i = function (t, n, i, s, a) {
                                "string" == typeof t &&
                                    (t = [[null, t, void 0]]);
                                var o = {};
                                if (i)
                                    for (var r = 0; r < this.length; r++) {
                                        var h = this[r][0];
                                        null != h && (o[h] = !0);
                                    }
                                for (var l = 0; l < t.length; l++) {
                                    var c = [].concat(t[l]);
                                    (i && o[c[0]]) ||
                                        (void 0 !== a &&
                                            (void 0 === c[5] ||
                                                (c[1] = "@layer"
                                                    .concat(
                                                        c[5].length > 0
                                                            ? " ".concat(c[5])
                                                            : "",
                                                        " {"
                                                    )
                                                    .concat(c[1], "}")),
                                            (c[5] = a)),
                                        n &&
                                            (c[2]
                                                ? ((c[1] = "@media "
                                                      .concat(c[2], " {")
                                                      .concat(c[1], "}")),
                                                  (c[2] = n))
                                                : (c[2] = n)),
                                        s &&
                                            (c[4]
                                                ? ((c[1] = "@supports ("
                                                      .concat(c[4], ") {")
                                                      .concat(c[1], "}")),
                                                  (c[4] = s))
                                                : (c[4] = "".concat(s))),
                                        e.push(c));
                                }
                            }),
                            e
                        );
                    };
                },
                81: function (t) {
                    t.exports = function (t) {
                        return t[1];
                    };
                },
                379: function (t) {
                    var e = [];
                    function n(t) {
                        for (var n = -1, i = 0; i < e.length; i++)
                            if (e[i].identifier === t) {
                                n = i;
                                break;
                            }
                        return n;
                    }
                    function i(t, i) {
                        for (var a = {}, o = [], r = 0; r < t.length; r++) {
                            var h = t[r],
                                l = i.base ? h[0] + i.base : h[0],
                                c = a[l] || 0,
                                d = "".concat(l, " ").concat(c);
                            a[l] = c + 1;
                            var u = n(d),
                                p = {
                                    css: h[1],
                                    media: h[2],
                                    sourceMap: h[3],
                                    supports: h[4],
                                    layer: h[5],
                                };
                            if (-1 !== u) e[u].references++, e[u].updater(p);
                            else {
                                var f = s(p, i);
                                (i.byIndex = r),
                                    e.splice(r, 0, {
                                        identifier: d,
                                        updater: f,
                                        references: 1,
                                    });
                            }
                            o.push(d);
                        }
                        return o;
                    }
                    function s(t, e) {
                        var n = e.domAPI(e);
                        return (
                            n.update(t),
                            function (e) {
                                if (e) {
                                    if (
                                        e.css === t.css &&
                                        e.media === t.media &&
                                        e.sourceMap === t.sourceMap &&
                                        e.supports === t.supports &&
                                        e.layer === t.layer
                                    )
                                        return;
                                    n.update((t = e));
                                } else n.remove();
                            }
                        );
                    }
                    t.exports = function (t, s) {
                        var a = i((t = t || []), (s = s || {}));
                        return function (t) {
                            t = t || [];
                            for (var o = 0; o < a.length; o++) {
                                var r = n(a[o]);
                                e[r].references--;
                            }
                            for (var h = i(t, s), l = 0; l < a.length; l++) {
                                var c = n(a[l]);
                                0 === e[c].references &&
                                    (e[c].updater(), e.splice(c, 1));
                            }
                            a = h;
                        };
                    };
                },
                569: function (t) {
                    var e = {};
                    t.exports = function (t, n) {
                        var i = (function (t) {
                            if (void 0 === e[t]) {
                                var n = document.querySelector(t);
                                if (
                                    window.HTMLIFrameElement &&
                                    n instanceof window.HTMLIFrameElement
                                )
                                    try {
                                        n = n.contentDocument.head;
                                    } catch (t) {
                                        n = null;
                                    }
                                e[t] = n;
                            }
                            return e[t];
                        })(t);
                        if (!i)
                            throw new Error(
                                "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
                            );
                        i.appendChild(n);
                    };
                },
                216: function (t) {
                    t.exports = function (t) {
                        var e = document.createElement("style");
                        return (
                            t.setAttributes(e, t.attributes),
                            t.insert(e, t.options),
                            e
                        );
                    };
                },
                565: function (t, e, n) {
                    t.exports = function (t) {
                        var e = n.nc;
                        e && t.setAttribute("nonce", e);
                    };
                },
                795: function (t) {
                    t.exports = function (t) {
                        var e = t.insertStyleElement(t);
                        return {
                            update: function (n) {
                                !(function (t, e, n) {
                                    var i = "";
                                    n.supports &&
                                        (i += "@supports (".concat(
                                            n.supports,
                                            ") {"
                                        )),
                                        n.media &&
                                            (i += "@media ".concat(
                                                n.media,
                                                " {"
                                            ));
                                    var s = void 0 !== n.layer;
                                    s &&
                                        (i += "@layer".concat(
                                            n.layer.length > 0
                                                ? " ".concat(n.layer)
                                                : "",
                                            " {"
                                        )),
                                        (i += n.css),
                                        s && (i += "}"),
                                        n.media && (i += "}"),
                                        n.supports && (i += "}");
                                    var a = n.sourceMap;
                                    a &&
                                        "undefined" != typeof btoa &&
                                        (i +=
                                            "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                                                btoa(
                                                    unescape(
                                                        encodeURIComponent(
                                                            JSON.stringify(a)
                                                        )
                                                    )
                                                ),
                                                " */"
                                            )),
                                        e.styleTagTransform(i, t, e.options);
                                })(e, t, n);
                            },
                            remove: function () {
                                !(function (t) {
                                    if (null === t.parentNode) return !1;
                                    t.parentNode.removeChild(t);
                                })(e);
                            },
                        };
                    };
                },
                589: function (t) {
                    t.exports = function (t, e) {
                        if (e.styleSheet) e.styleSheet.cssText = t;
                        else {
                            for (; e.firstChild; ) e.removeChild(e.firstChild);
                            e.appendChild(document.createTextNode(t));
                        }
                    };
                },
            },
            e = {};
        function n(i) {
            var s = e[i];
            if (void 0 !== s) return s.exports;
            var a = (e[i] = { id: i, exports: {} });
            return t[i](a, a.exports, n), a.exports;
        }
        (n.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                          return t.default;
                      }
                    : function () {
                          return t;
                      };
            return n.d(e, { a: e }), e;
        }),
            (n.d = function (t, e) {
                for (var i in e)
                    n.o(e, i) &&
                        !n.o(t, i) &&
                        Object.defineProperty(t, i, {
                            enumerable: !0,
                            get: e[i],
                        });
            }),
            (n.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (n.r = function (t) {
                "undefined" != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(t, Symbol.toStringTag, {
                        value: "Module",
                    }),
                    Object.defineProperty(t, "__esModule", { value: !0 });
            });
        var i = {};
        return (
            (function () {
                n.r(i),
                    n.d(i, {
                        default: function () {
                            return x;
                        },
                    });
                var t = function () {
                    var t = this,
                        e = t.$createElement,
                        n = t._self._c || e;
                    return n(
                        "div",
                        {
                            class: ["vue-puzzle-vcode", { show_: t.show }],
                            on: {
                                mousedown: t.onCloseMouseDown,
                                mouseup: t.onCloseMouseUp,
                                touchstart: t.onCloseMouseDown,
                                touchend: t.onCloseMouseUp,
                            },
                        },
                        [
                            n(
                                "div",
                                {
                                    staticClass: "vue-auth-box_",
                                    on: {
                                        mousedown: function (t) {
                                            t.stopPropagation();
                                        },
                                        touchstart: function (t) {
                                            t.stopPropagation();
                                        },
                                    },
                                },
                                [
                                    n("p", { staticClass: "puzzle-title" }, [
                                        t._v(t._s(t.titleText)),
                                        n("img", {
                                            staticClass: "btn-close_",
                                            style:"float: right; max-width: 18px; min-height: 18px; margin-top:8px; cursor: pointer;",
                                            attrs: { src: t.closeSvg },
                                            on: { click: t.onClose },
                                        }),
                                    ]),
                                    t._v(" "),
                                    n(
                                        "div",
                                        {
                                            staticClass: "auth-body_",
                                            style:
                                                "height: " +
                                                t.canvasHeight +
                                                "px",
                                        },
                                        [
                                            n("canvas", {
                                                ref: "canvas1",
                                                style:
                                                    "width:" +
                                                    t.canvasWidth +
                                                    "px;height:" +
                                                    t.canvasHeight +
                                                    "px",
                                                attrs: {
                                                    width: t.canvasWidth,
                                                    height: t.canvasHeight,
                                                },
                                            }),
                                            t._v(" "),
                                            n("canvas", {
                                                ref: "canvas3",
                                                class: [
                                                    "auth-canvas3_",
                                                    { show: t.isSuccess },
                                                ],
                                                style:
                                                    "width:" +
                                                    t.canvasWidth +
                                                    "px;height:" +
                                                    t.canvasHeight +
                                                    "px",
                                                attrs: {
                                                    width: t.canvasWidth,
                                                    height: t.canvasHeight,
                                                },
                                            }),
                                            t._v(" "),
                                            n("canvas", {
                                                ref: "canvas2",
                                                staticClass: "auth-canvas2_",
                                                style:
                                                    "width:" +
                                                    t.puzzleBaseSize +
                                                    "px;height:" +
                                                    t.canvasHeight +
                                                    "px;transform:translateX(" +
                                                    (t.styleWidth -
                                                        t.sliderBaseSize -
                                                        (t.puzzleBaseSize -
                                                            t.sliderBaseSize) *
                                                            ((t.styleWidth -
                                                                t.sliderBaseSize) /
                                                                (t.canvasWidth -
                                                                    t.sliderBaseSize))) +
                                                    "px)",
                                                attrs: {
                                                    width: t.puzzleBaseSize,
                                                    height: t.canvasHeight,
                                                },
                                            }),
                                            t._v(" "),
                                            n(
                                                "div",
                                                {
                                                    class: [
                                                        "loading-box_",
                                                        { hide_: !t.loading },
                                                    ],
                                                },
                                                [t._m(0)]
                                            ),
                                            t._v(" "),
                                            n(
                                                "div",
                                                {
                                                    class: [
                                                        "info-box_",
                                                        { show: t.infoBoxShow },
                                                        { fail: t.infoBoxFail },
                                                    ],
                                                },
                                                [
                                                    t._v(
                                                        "\n        " +
                                                            t._s(t.infoText) +
                                                            "\n      "
                                                    ),
                                                ]
                                            ),
                                            t._v(" "),
                                            n("div", {
                                                class: [
                                                    "flash_",
                                                    { show: t.isSuccess },
                                                ],
                                                style:
                                                    "transform: translateX(" +
                                                    (t.isSuccess
                                                        ? t.canvasWidth +
                                                          0.578 *
                                                              t.canvasHeight +
                                                          "px"
                                                        : "-" +
                                                          0.578 *
                                                              t.canvasHeight +
                                                          "px") +
                                                    ") skew(-30deg, 0);",
                                            }),
                                            t._v(" "),
                                            n("img", {
                                                staticClass: "info_",
                                                attrs: { src: t.infoSvg },
                                                style:  'display:none; position: fixed;top: 380px;right: 60px;width: 24px;height: 24px;'
                                               
                                            }),
                                            // n("img", {
                                            //     staticClass: "reset_",
                                            //     attrs: { src: t.resetSvg },
                                            //     on: { click: t.reset },
                                            // }),
                                        ]
                                    ),
                                    t._v(" "),
                                    n("div", { staticClass: "auth-control_" }, [
                                        n(
                                            "div",
                                            {
                                                staticClass: "range-box",
                                                style:
                                                    "height:" +
                                                    t.sliderBaseSize +
                                                    "px",
                                            },
                                            [
                                                n(
                                                    "div",
                                                    {
                                                        staticClass:
                                                            "range-text",
                                                    },
                                                    [t._v(t._s(t.sliderText))]
                                                ),
                                                t._v(" "),
                                                n(
                                                    "div",
                                                    {
                                                        ref: "range-slider",
                                                        staticClass:
                                                            "range-slider",
                                                        style:
                                                            "width:" +
                                                            t.styleWidth +
                                                            "px",
                                                    },
                                                    [
                                                        n(
                                                            "div",
                                                            {
                                                                class: [
                                                                    "range-btn",
                                                                    {
                                                                        isDown: t.mouseDown,
                                                                    },
                                                                ],
                                                                style:
                                                                    "width:" +
                                                                    t.sliderBaseSize +
                                                                    "px",
                                                                on: {
                                                                    mousedown:
                                                                        function (
                                                                            e
                                                                        ) {
                                                                            return t.onRangeMouseDown(
                                                                                e
                                                                            );
                                                                        },
                                                                    touchstart:
                                                                        function (
                                                                            e
                                                                        ) {
                                                                            return t.onRangeMouseDown(
                                                                                e
                                                                            );
                                                                        },
                                                                },
                                                            },
                                                            [
                                                                n("div"),
                                                                t._v(" "),
                                                                n("div"),
                                                                t._v(" "),
                                                                n("div"),
                                                            ]
                                                        ),
                                                    ]
                                                ),
                                                t._v(" "),
                                                n("hr", {
                                                    staticStyle: {
                                                        position: "absolute",
                                                        top: "50px",
                                                        color: "#525252",
                                                    },
                                                }),
                                            ]
                                        ),
                                    ]),
                                ]
                            ),
                        ]
                    );
                };
                t._withStripped = !0;
                var e = {
                        props: {
                            canvasWidth: { type: Number, default: 310 },
                            canvasHeight: { type: Number, default: 160 },
                            show: { type: Boolean, default: !1 },
                            puzzleScale: { type: Number, default: 1 },
                            sliderSize: { type: Number, default: 50 },
                            range: { type: Number, default: 10 },
                            imgs: { type: Array },
                            successText: { type: String, default: "" },
                            failText: { type: String, default: "" },
                            sliderText: { type: String, default: "" },
                            titleText: { type: String, default: "" },
                        },
                        data: () => ({
                            mouseDown: !1,
                            startWidth: 50,
                            startX: 0,
                            newX: 0,
                            pinX: 0,
                            pinY: 0,
                            loading: !1,
                            isCanSlide: !1,
                            error: !1,
                            infoBoxShow: !1,
                            infoText: "",
                            infoBoxFail: !1,
                            timer1: null,
                            closeDown: !1,
                            isSuccess: !1,
                            imgIndex: -1,
                            isSubmting: !1,
                            closeSvg:
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wLjM1ODgxNyAwLjM1Nzk2NEMtMC4xMTg0NjkgMC44MzUyNTEgLTAuMTE4NDY5IDEuNjA5MDggMC4zNTg4MTcgMi4wODYzN0w3LjI3MjAyIDguOTk5NTdMMC4zNTc5NjQgMTUuOTEzNkMtMC4xMTkzMjIgMTYuMzkwOSAtMC4xMTkzMjIgMTcuMTY0NyAwLjM1Nzk2NCAxNy42NDJDMC44MzUyNSAxOC4xMTkzIDEuNjA5MDggMTguMTE5MyAyLjA4NjM3IDE3LjY0Mkw5LjAwMDQyIDEwLjcyOEwxNS45MTQ1IDE3LjY0MkMxNi4zOTE4IDE4LjExOTMgMTcuMTY1NiAxOC4xMTkzIDE3LjY0MjkgMTcuNjQyQzE4LjEyMDIgMTcuMTY0NyAxOC4xMjAyIDE2LjM5MDkgMTcuNjQyOSAxNS45MTM2TDEwLjcyODggOC45OTk1N0wxNy42NDIgMi4wODYzOEMxOC4xMTkzIDEuNjA5MSAxOC4xMTkzIDAuODM1MjYyIDE3LjY0MiAwLjM1Nzk3NkMxNy4xNjQ3IC0wLjExOTMxIDE2LjM5MDkgLTAuMTE5MzEgMTUuOTEzNiAwLjM1Nzk3Nkw5LjAwMDQyIDcuMjcxMTdMMi4wODcyMiAwLjM1Nzk2NUMxLjYwOTk0IC0wLjExOTMyMSAwLjgzNjEwMyAtMC4xMTkzMjIgMC4zNTg4MTcgMC4zNTc5NjRaIiBmaWxsPSIjNEE1MjVGIi8+Cjwvc3ZnPgo=",
                            resetSvg:
                                "data:image/png;base64,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",
                            infoSvg:
                                "data:image/png;base64,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",
                        }),
                        mounted() {
                            document.body.appendChild(this.$el),
                                document.addEventListener(
                                    "mousemove",
                                    this.onRangeMouseMove,
                                    !1
                                ),
                                document.addEventListener(
                                    "mouseup",
                                    this.onRangeMouseUp,
                                    !1
                                ),
                                document.addEventListener(
                                    "touchmove",
                                    this.onRangeMouseMove,
                                    { passive: !1 }
                                ),
                                document.addEventListener(
                                    "touchend",
                                    this.onRangeMouseUp,
                                    !1
                                ),
                                this.show &&
                                    (document.body.classList.add(
                                        "vue-puzzle-overflow"
                                    ),
                                    this.reset());
                        },
                        beforeDestroy() {
                            clearTimeout(this.timer1),
                                document.body.removeChild(this.$el),
                                document.removeEventListener(
                                    "mousemove",
                                    this.onRangeMouseMove,
                                    !1
                                ),
                                document.removeEventListener(
                                    "mouseup",
                                    this.onRangeMouseUp,
                                    !1
                                ),
                                document.removeEventListener(
                                    "touchmove",
                                    this.onRangeMouseMove,
                                    { passive: !1 }
                                ),
                                document.removeEventListener(
                                    "touchend",
                                    this.onRangeMouseUp,
                                    !1
                                );
                        },
                        watch: {
                            show(t) {
                                t
                                    ? (document.body.classList.add(
                                          "vue-puzzle-overflow"
                                      ),
                                      this.reset())
                                    : ((this.isSubmting = !1),
                                      (this.isSuccess = !1),
                                      (this.infoBoxShow = !1),
                                      document.body.classList.remove(
                                          "vue-puzzle-overflow"
                                      ));
                            },
                        },
                        computed: {
                            styleWidth() {
                                const t =
                                    this.startWidth + this.newX - this.startX;
                                return t < this.sliderBaseSize
                                    ? this.sliderBaseSize
                                    : t > this.canvasWidth
                                    ? this.canvasWidth
                                    : t;
                            },
                            puzzleBaseSize() {
                                return Math.round(
                                    52.5 *
                                        Math.max(
                                            Math.min(this.puzzleScale, 2),
                                            0.2
                                        ) +
                                        6
                                );
                            },
                            sliderBaseSize() {
                                return Math.max(
                                    Math.min(
                                        Math.round(this.sliderSize),
                                        Math.round(0.5 * this.canvasWidth)
                                    ),
                                    10
                                );
                            },
                        },
                        methods: {
                            onClose() {
                                this.mouseDown ||
                                    (clearTimeout(this.timer1),
                                    this.$emit("close"));
                            },
                            onCloseMouseDown() {
                                this.closeDown = !0;
                            },
                            onCloseMouseUp() {
                                this.closeDown && this.onClose(),
                                    (this.closeDown = !1);
                            },
                            onRangeMouseDown(t) {
                                this.isCanSlide &&
                                    ((this.mouseDown = !0),
                                    (this.startWidth =
                                        this.$refs["range-slider"].clientWidth),
                                    (this.newX =
                                        t.clientX ||
                                        t.changedTouches[0].clientX),
                                    (this.startX =
                                        t.clientX ||
                                        t.changedTouches[0].clientX));
                            },
                            onRangeMouseMove(t) {
                                this.mouseDown &&
                                    (t.preventDefault(),
                                    (this.newX =
                                        t.clientX ||
                                        t.changedTouches[0].clientX));
                            },
                            onRangeMouseUp() {
                                this.mouseDown &&
                                    ((this.mouseDown = !1), this.submit());
                            },
                            init(t) {
                                if (this.loading && !t) return;
                                (this.loading = !0), (this.isCanSlide = !1);
                                const e = this.$refs.canvas1,
                                    n = this.$refs.canvas2,
                                    i = this.$refs.canvas3,
                                    s = e.getContext("2d"),
                                    a = n.getContext("2d"),
                                    o = i.getContext("2d"),
                                    r =
                                        navigator.userAgent.indexOf(
                                            "Firefox"
                                        ) >= 0 &&
                                        navigator.userAgent.indexOf(
                                            "Windows"
                                        ) >= 0,
                                    h = document.createElement("img");
                                if (
                                    ((s.fillStyle = "rgba(255,255,255,1)"),
                                    (o.fillStyle = "rgba(255,255,255,1)"),
                                    s.clearRect(
                                        0,
                                        0,
                                        this.canvasWidth,
                                        this.canvasHeight
                                    ),
                                    a.clearRect(
                                        0,
                                        0,
                                        this.canvasWidth,
                                        this.canvasHeight
                                    ),
                                    (this.pinX = this.getRandom(
                                        this.puzzleBaseSize,
                                        this.canvasWidth -
                                            this.puzzleBaseSize -
                                            20
                                    )),
                                    (this.pinY = this.getRandom(
                                        20,
                                        this.canvasHeight -
                                            this.puzzleBaseSize -
                                            20
                                    )),
                                    (h.crossOrigin = "anonymous"),
                                    (h.onload = () => {
                                        const [t, e, n, i] =
                                            this.makeImgSize(h);
                                        s.save(),
                                            this.paintBrick(s),
                                            s.closePath(),
                                            r
                                                ? (s.clip(),
                                                  s.save(),
                                                  (s.shadowOffsetX = 0),
                                                  (s.shadowOffsetY = 0),
                                                  (s.shadowColor = "#000"),
                                                  (s.shadowBlur = 3),
                                                  s.fill(),
                                                  s.restore())
                                                : ((s.shadowOffsetX = 0),
                                                  (s.shadowOffsetY = 0),
                                                  (s.shadowColor = "#000"),
                                                  (s.shadowBlur = 3),
                                                  s.fill(),
                                                  s.clip()),
                                            s.drawImage(h, t, e, n, i),
                                            o.fillRect(
                                                0,
                                                0,
                                                this.canvasWidth,
                                                this.canvasHeight
                                            ),
                                            o.drawImage(h, t, e, n, i),
                                            (s.globalCompositeOperation =
                                                "source-atop"),
                                            this.paintBrick(s),
                                            s.arc(
                                                this.pinX +
                                                    Math.ceil(
                                                        this.puzzleBaseSize / 2
                                                    ),
                                                this.pinY +
                                                    Math.ceil(
                                                        this.puzzleBaseSize / 2
                                                    ),
                                                1.2 * this.puzzleBaseSize,
                                                0,
                                                2 * Math.PI,
                                                !0
                                            ),
                                            s.closePath(),
                                            (s.shadowColor =
                                                "rgba(255, 255, 255, .8)"),
                                            (s.shadowOffsetX = -1),
                                            (s.shadowOffsetY = -1),
                                            (s.shadowBlur = Math.min(
                                                Math.ceil(8 * this.puzzleScale),
                                                12
                                            )),
                                            (s.fillStyle = "#ffffaa"),
                                            s.fill();
                                        const l = s.getImageData(
                                            this.pinX - 3,
                                            this.pinY - 20,
                                            this.pinX + this.puzzleBaseSize + 5,
                                            this.pinY + this.puzzleBaseSize + 5
                                        );
                                        a.putImageData(l, 0, this.pinY - 20),
                                            s.restore(),
                                            s.clearRect(
                                                0,
                                                0,
                                                this.canvasWidth,
                                                this.canvasHeight
                                            ),
                                            s.save(),
                                            this.paintBrick(s),
                                            (s.globalAlpha = 0.8),
                                            (s.fillStyle = "#ffffff"),
                                            s.fill(),
                                            s.restore(),
                                            s.save(),
                                            (s.globalCompositeOperation =
                                                "source-atop"),
                                            this.paintBrick(s),
                                            s.arc(
                                                this.pinX +
                                                    Math.ceil(
                                                        this.puzzleBaseSize / 2
                                                    ),
                                                this.pinY +
                                                    Math.ceil(
                                                        this.puzzleBaseSize / 2
                                                    ),
                                                1.2 * this.puzzleBaseSize,
                                                0,
                                                2 * Math.PI,
                                                !0
                                            ),
                                            (s.shadowColor = "#000"),
                                            (s.shadowOffsetX = 2),
                                            (s.shadowOffsetY = 2),
                                            (s.shadowBlur = 16),
                                            s.fill(),
                                            s.restore(),
                                            s.save(),
                                            (s.globalCompositeOperation =
                                                "destination-over"),
                                            s.drawImage(h, t, e, n, i),
                                            s.restore(),
                                            (this.loading = !1),
                                            (this.isCanSlide = !0);
                                    }),
                                    (h.onerror = () => {
                                        this.init(!0);
                                    }),
                                    !t && this.imgs && this.imgs.length)
                                ) {
                                    let t = this.getRandom(
                                        0,
                                        this.imgs.length - 1
                                    );
                                    t === this.imgIndex &&
                                        (t === this.imgs.length - 1
                                            ? (t = 0)
                                            : t++),
                                        (this.imgIndex = t),
                                        (h.src = this.imgs[t]);
                                } else h.src = this.makeImgWithCanvas();
                            },
                            getRandom: (t, e) =>
                                Math.ceil(Math.random() * (e - t) + t),
                            makeImgSize(t) {
                                const e = t.width / t.height;
                                let n = 0,
                                    i = 0,
                                    s = 0,
                                    a = 0;
                                return (
                                    e > this.canvasWidth / this.canvasHeight
                                        ? ((a = this.canvasHeight),
                                          (s = e * a),
                                          (i = 0),
                                          (n = (this.canvasWidth - s) / 2))
                                        : ((s = this.canvasWidth),
                                          (a = s / e),
                                          (n = 0),
                                          (i = (this.canvasHeight - a) / 2)),
                                    [n, i, s, a]
                                );
                            },
                            paintBrick(t) {
                                const e = Math.ceil(15 * this.puzzleScale);
                                t.beginPath(),
                                    t.moveTo(this.pinX, this.pinY),
                                    t.lineTo(this.pinX + e, this.pinY),
                                    t.arcTo(
                                        this.pinX + e,
                                        this.pinY - e / 2,
                                        this.pinX + e + e / 2,
                                        this.pinY - e / 2,
                                        e / 2
                                    ),
                                    t.arcTo(
                                        this.pinX + e + e,
                                        this.pinY - e / 2,
                                        this.pinX + e + e,
                                        this.pinY,
                                        e / 2
                                    ),
                                    t.lineTo(this.pinX + e + e + e, this.pinY),
                                    t.lineTo(
                                        this.pinX + e + e + e,
                                        this.pinY + e
                                    ),
                                    t.arcTo(
                                        this.pinX + e + e + e + e / 2,
                                        this.pinY + e,
                                        this.pinX + e + e + e + e / 2,
                                        this.pinY + e + e / 2,
                                        e / 2
                                    ),
                                    t.arcTo(
                                        this.pinX + e + e + e + e / 2,
                                        this.pinY + e + e,
                                        this.pinX + e + e + e,
                                        this.pinY + e + e,
                                        e / 2
                                    ),
                                    t.lineTo(
                                        this.pinX + e + e + e,
                                        this.pinY + e + e + e
                                    ),
                                    t.lineTo(this.pinX, this.pinY + e + e + e),
                                    t.lineTo(this.pinX, this.pinY + e + e),
                                    t.arcTo(
                                        this.pinX + e / 2,
                                        this.pinY + e + e,
                                        this.pinX + e / 2,
                                        this.pinY + e + e / 2,
                                        e / 2
                                    ),
                                    t.arcTo(
                                        this.pinX + e / 2,
                                        this.pinY + e,
                                        this.pinX,
                                        this.pinY + e,
                                        e / 2
                                    ),
                                    t.lineTo(this.pinX, this.pinY);
                            },
                            makeImgWithCanvas() {
                                const t = document.createElement("canvas"),
                                    e = t.getContext("2d");
                                (t.width = this.canvasWidth),
                                    (t.height = this.canvasHeight),
                                    (e.fillStyle = `rgb(${this.getRandom(
                                        100,
                                        255
                                    )},${this.getRandom(
                                        100,
                                        255
                                    )},${this.getRandom(100, 255)})`),
                                    e.fillRect(
                                        0,
                                        0,
                                        this.canvasWidth,
                                        this.canvasHeight
                                    );
                                for (let n = 0; n < 12; n++)
                                    if (
                                        ((e.fillStyle = `rgb(${this.getRandom(
                                            100,
                                            255
                                        )},${this.getRandom(
                                            100,
                                            255
                                        )},${this.getRandom(100, 255)})`),
                                        (e.strokeStyle = `rgb(${this.getRandom(
                                            100,
                                            255
                                        )},${this.getRandom(
                                            100,
                                            255
                                        )},${this.getRandom(100, 255)})`),
                                        this.getRandom(0, 2) > 1)
                                    )
                                        e.save(),
                                            e.rotate(
                                                (this.getRandom(-90, 90) *
                                                    Math.PI) /
                                                    180
                                            ),
                                            e.fillRect(
                                                this.getRandom(
                                                    -20,
                                                    t.width - 20
                                                ),
                                                this.getRandom(
                                                    -20,
                                                    t.height - 20
                                                ),
                                                this.getRandom(
                                                    10,
                                                    t.width / 2 + 10
                                                ),
                                                this.getRandom(
                                                    10,
                                                    t.height / 2 + 10
                                                )
                                            ),
                                            e.restore();
                                    else {
                                        e.beginPath();
                                        const n = this.getRandom(
                                            -Math.PI,
                                            Math.PI
                                        );
                                        e.arc(
                                            this.getRandom(0, t.width),
                                            this.getRandom(0, t.height),
                                            this.getRandom(
                                                10,
                                                t.height / 2 + 10
                                            ),
                                            n,
                                            n + 1.5 * Math.PI
                                        ),
                                            e.closePath(),
                                            e.fill();
                                    }
                                return t.toDataURL("image/png");
                            },
                            submit() {
                                this.isSubmting = !0;
                                const t = Math.abs(
                                    this.pinX -
                                        (this.styleWidth -
                                            this.sliderBaseSize) +
                                        (this.puzzleBaseSize -
                                            this.sliderBaseSize) *
                                            ((this.styleWidth -
                                                this.sliderBaseSize) /
                                                (this.canvasWidth -
                                                    this.sliderBaseSize)) -
                                        3
                                );
                                t < this.range
                                    ? ((this.infoText = this.successText),
                                      (this.infoBoxFail = !1),
                                      (this.infoBoxShow = !0),
                                      (this.isCanSlide = !1),
                                      (this.isSuccess = !0),
                                      clearTimeout(this.timer1),
                                      (this.timer1 = setTimeout(() => {
                                          (this.isSubmting = !1),
                                              this.$emit("success", t);
                                      }, 800)))
                                    : ((this.infoText = this.failText),
                                      (this.infoBoxFail = !0),
                                      (this.infoBoxShow = !0),
                                      (this.isCanSlide = !1),
                                      this.$emit("fail", t),
                                      clearTimeout(this.timer1),
                                      (this.timer1 = setTimeout(() => {
                                          (this.isSubmting = !1), this.reset();
                                      }, 800)));
                            },
                            resetState() {
                                (this.infoBoxFail = !1),
                                    (this.infoBoxShow = !1),
                                    (this.isCanSlide = !1),
                                    (this.isSuccess = !1),
                                    (this.startWidth = this.sliderBaseSize),
                                    (this.startX = 0),
                                    (this.newX = 0);
                            },
                            reset() {
                                this.isSubmting ||
                                    (this.resetState(), this.init());
                            },
                        },
                    },
                    s = n(379),
                    a = n.n(s),
                    o = n(795),
                    r = n.n(o),
                    h = n(569),
                    l = n.n(h),
                    c = n(565),
                    d = n.n(c),
                    u = n(216),
                    p = n.n(u),
                    f = n(589),
                    g = n.n(f),
                    v = n(358),
                    b = {};
                (b.styleTagTransform = g()),
                    (b.setAttributes = d()),
                    (b.insert = l().bind(null, "head")),
                    (b.domAPI = r()),
                    (b.insertStyleElement = p()),
                    a()(v.Z, b),
                    v.Z && v.Z.locals && v.Z.locals;
                var m = (function (t, e, n, i, s, a, o, r) {
                    var h,
                        l = "function" == typeof t ? t.options : t;
                    if (
                        (e &&
                            ((l.render = e),
                            (l.staticRenderFns = [
                                function () {
                                    var t = this,
                                        e = t.$createElement,
                                        n = t._self._c || e;
                                    return n(
                                        "div",
                                        { staticClass: "loading-gif_" },
                                        [
                                            n("span"),
                                            t._v(" "),
                                            n("span"),
                                            t._v(" "),
                                            n("span"),
                                            t._v(" "),
                                            n("span"),
                                            t._v(" "),
                                            n("span"),
                                        ]
                                    );
                                },
                            ]),
                            (l._compiled = !0)),
                        h)
                    )
                        if (l.functional) {
                            l._injectStyles = h;
                            var c = l.render;
                            l.render = function (t, e) {
                                return h.call(e), c(t, e);
                            };
                        } else {
                            var d = l.beforeCreate;
                            l.beforeCreate = d ? [].concat(d, h) : [h];
                        }
                    return { exports: t, options: l };
                })(e, t);
                m.options.__file = "src/app.vue";
                var x = m.exports;
            })(),
            i
        );
    })();
});
