!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.Split = e());
})(this, function () {
  "use strict";
  var t = window,
    e = t.document,
    n = "addEventListener",
    r = "removeEventListener",
    i = "getBoundingClientRect",
    o = "horizontal",
    a = function () {
      return !1;
    },
    s = t.attachEvent && !t[n],
    c =
      ["", "-webkit-", "-moz-", "-o-"]
        .filter(function (t) {
          var n = e.createElement("div");
          return (
            (n.style.cssText = "width:" + t + "calc(9px)"), !!n.style.length
          );
        })
        .shift() + "calc",
    u = function (t) {
      return "string" == typeof t || t instanceof String;
    },
    l = function (t) {
      if (u(t)) {
        var n = e.querySelector(t);
        if (!n) throw Error("Selector " + t + " did not match a DOM element");
        return n;
      }
      return t;
    },
    f = function (t, e, n) {
      var r = t[e];
      return void 0 !== r ? r : n;
    },
    h = function (t, e, n, r) {
      if (e) {
        if ("end" === r) return 0;
        if ("center" === r) return t / 2;
      } else if (n) {
        if ("start" === r) return 0;
        if ("center" === r) return t / 2;
      }
      return t;
    },
    p = function (t, n) {
      var r = e.createElement("div");
      return (r.className = "gutter gutter-" + n), r;
    },
    d = function (t, e, n) {
      var r = {};
      return (
        u(e)
          ? (r[t] = e)
          : (r[t] = s ? e + "%" : c + "(" + e + "% - " + n + "px)"),
        r
      );
    },
    _ = function (t, e) {
      var n;
      return ((n = {})[t] = e + "px"), n;
    };
  return function (c, u) {
    void 0 === u && (u = {});
    var $,
      g,
      m,
      v,
      y,
      b,
      x = c;
    Array.from && (x = Array.from(x));
    var w = l(x[0]).parentNode,
      k = getComputedStyle ? getComputedStyle(w).flexDirection : null,
      C =
        f(u, "sizes") ||
        x.map(function () {
          return 100 / x.length;
        }),
      q = f(u, "minSize", 100),
      E = Array.isArray(q)
        ? q
        : x.map(function () {
            return q;
          }),
      j = f(u, "expandToMin", !1),
      S = f(u, "gutterSize", 10),
      A = f(u, "gutterAlign", "center"),
      M = f(u, "snapOffset", 30),
      T = f(u, "dragInterval", 1),
      O = f(u, "direction", o),
      L = f(u, "cursor", O === o ? "col-resize" : "row-resize"),
      z = f(u, "gutter", p),
      I = f(u, "elementStyle", d),
      D = f(u, "gutterStyle", _);
    function B(t, e, n, r) {
      var i = I($, e, n, r);
      Object.keys(i).forEach(function (e) {
        t.style[e] = i[e];
      });
    }
    function F() {
      return b.map(function (t) {
        return t.size;
      });
    }
    function N(t) {
      return "touches" in t ? t.touches[0][g] : t[g];
    }
    function P(t) {
      var e = b[this.a],
        n = b[this.b],
        r = e.size + n.size;
      (e.size = (t / this.size) * r),
        (n.size = r - (t / this.size) * r),
        B(e.element, e.size, this._b, e.i),
        B(n.element, n.size, this._c, n.i);
    }
    function R() {
      var t = b[this.a].element,
        e = b[this.b].element,
        n = t[i](),
        r = e[i]();
      (this.size = n[$] + r[$] + this._b + this._c),
        (this.start = n[m]),
        (this.end = n[v]);
    }
    function H(t) {
      var e = (function (t) {
        if (!getComputedStyle) return null;
        var e = getComputedStyle(t);
        return (
          t[y] -
          (O === o
            ? parseFloat(e.paddingLeft) + parseFloat(e.paddingRight)
            : parseFloat(e.paddingTop) + parseFloat(e.paddingBottom))
        );
      })(w);
      if (null === e) return t;
      var n = 0,
        r = [],
        i = t.map(function (i, o) {
          var a = (e * i) / 100,
            s = h(S, 0 === o, o === t.length - 1, A),
            c = E[o] + s;
          return a < c ? ((n += c - a), r.push(0), c) : (r.push(a - c), a);
        });
      return 0 === n
        ? t
        : i.map(function (t, i) {
            var o = t;
            if (0 < n && 0 < r[i] - n) {
              var a = Math.min(n, r[i] - n);
              (n -= a), (o = t - a);
            }
            return (o / e) * 100;
          });
    }
    O === o
      ? (($ = "width"),
        (g = "clientX"),
        (m = "left"),
        (v = "right"),
        (y = "clientWidth"))
      : "vertical" === O &&
        (($ = "height"),
        (g = "clientY"),
        (m = "top"),
        (v = "bottom"),
        (y = "clientHeight")),
      (C = H(C));
    var U = [];
    function G(t) {
      var e = t.i === U.length,
        n = e ? U[t.i - 1] : U[t.i];
      R.call(n);
      var r = e ? n.size - t.minSize - n._c : t.minSize + n._b;
      P.call(n, r);
    }
    function V(t) {
      var e = H(t);
      e.forEach(function (t, n) {
        if (0 < n) {
          var r = U[n - 1],
            i = b[r.a],
            o = b[r.b];
          (i.size = e[n - 1]),
            (o.size = t),
            B(i.element, i.size, r._b),
            B(o.element, o.size, r._c);
        }
      });
    }
    function K(t, e) {
      U.forEach(function (n) {
        !0 !== e
          ? n.parent.removeChild(n.gutter)
          : (n.gutter[r]("mousedown", n._a), n.gutter[r]("touchstart", n._a)),
          !0 !== t &&
            Object.keys(I($, n.a.size, n._b)).forEach(function (t) {
              (b[n.a].element.style[t] = ""), (b[n.b].element.style[t] = "");
            });
      });
    }
    return (
      (b = x.map(function (i, o) {
        var c,
          p,
          d,
          _ = { element: l(i), size: C[o], minSize: E[o], i: o };
        if (
          0 < o &&
          (((c = { a: o - 1, b: o, dragging: !1, direction: O, parent: w })._b =
            h(S, o - 1 == 0, !1, A)),
          (c._c = h(S, !1, o === x.length - 1, A)),
          "row-reverse" === k || "column-reverse" === k)
        ) {
          var g = c.a;
          (c.a = c.b), (c.b = g);
        }
        if (!s && 0 < o) {
          var m = z(o, O, _.element);
          (p = m),
            Object.keys((d = D($, S, o))).forEach(function (t) {
              p.style[t] = d[t];
            }),
            (c._a = function (i) {
              if (!("button" in i && 0 !== i.button)) {
                var o = this,
                  s = b[o.a].element,
                  c = b[o.b].element;
                o.dragging || f(u, "onDragStart", a)(F()),
                  i.preventDefault(),
                  (o.dragging = !0),
                  (o.move = function (t) {
                    var e,
                      n = b[this.a],
                      r = b[this.b];
                    this.dragging &&
                      ((e = N(t) - this.start + (this._b - this.dragOffset)),
                      1 < T && (e = Math.round(e / T) * T),
                      e <= n.minSize + M + this._b
                        ? (e = n.minSize + this._b)
                        : e >= this.size - (r.minSize + M + this._c) &&
                          (e = this.size - (r.minSize + this._c)),
                      P.call(this, e),
                      f(u, "onDrag", a)());
                  }.bind(o)),
                  (o.stop = function () {
                    var n = this,
                      i = b[n.a].element,
                      o = b[n.b].element;
                    n.dragging && f(u, "onDragEnd", a)(F()),
                      (n.dragging = !1),
                      t[r]("mouseup", n.stop),
                      t[r]("touchend", n.stop),
                      t[r]("touchcancel", n.stop),
                      t[r]("mousemove", n.move),
                      t[r]("touchmove", n.move),
                      (n.stop = null),
                      (n.move = null),
                      i[r]("selectstart", a),
                      i[r]("dragstart", a),
                      o[r]("selectstart", a),
                      o[r]("dragstart", a),
                      (i.style.userSelect = ""),
                      (i.style.webkitUserSelect = ""),
                      (i.style.MozUserSelect = ""),
                      (i.style.pointerEvents = ""),
                      (o.style.userSelect = ""),
                      (o.style.webkitUserSelect = ""),
                      (o.style.MozUserSelect = ""),
                      (o.style.pointerEvents = ""),
                      (n.gutter.style.cursor = ""),
                      (n.parent.style.cursor = ""),
                      (e.body.style.cursor = "");
                  }.bind(o)),
                  t[n]("mouseup", o.stop),
                  t[n]("touchend", o.stop),
                  t[n]("touchcancel", o.stop),
                  t[n]("mousemove", o.move),
                  t[n]("touchmove", o.move),
                  s[n]("selectstart", a),
                  s[n]("dragstart", a),
                  c[n]("selectstart", a),
                  c[n]("dragstart", a),
                  (s.style.userSelect = "none"),
                  (s.style.webkitUserSelect = "none"),
                  (s.style.MozUserSelect = "none"),
                  (s.style.pointerEvents = "none"),
                  (c.style.userSelect = "none"),
                  (c.style.webkitUserSelect = "none"),
                  (c.style.MozUserSelect = "none"),
                  (c.style.pointerEvents = "none"),
                  (o.gutter.style.cursor = L),
                  (o.parent.style.cursor = L),
                  (e.body.style.cursor = L),
                  R.call(o),
                  (o.dragOffset = N(i) - o.end);
              }
            }.bind(c)),
            m[n]("mousedown", c._a),
            m[n]("touchstart", c._a),
            w.insertBefore(m, _.element),
            (c.gutter = m);
        }
        return (
          B(_.element, _.size, h(S, 0 === o, o === x.length - 1, A)),
          0 < o && U.push(c),
          _
        );
      })).forEach(function (t) {
        var e = t.element[i]()[$];
        e < t.minSize && (j ? G(t) : (t.minSize = e));
      }),
      s
        ? { setSizes: V, destroy: K }
        : {
            setSizes: V,
            getSizes: F,
            collapse: function (t) {
              G(b[t]);
            },
            destroy: K,
            parent: w,
            pairs: U,
          }
    );
  };
}),
  (function (t) {
    var e = {};
    function n(r) {
      if (e[r]) return e[r].exports;
      var i = (e[r] = { i: r, l: !1, exports: {} });
      return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
    }
    (n.m = t),
      (n.c = e),
      (n.d = function (t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
      }),
      (n.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (n.t = function (t, e) {
        if (
          (1 & e && (t = n(t)),
          8 & e || (4 & e && "object" == typeof t && t && t.__esModule))
        )
          return t;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var i in t)
            n.d(
              r,
              i,
              function (e) {
                return t[e];
              }.bind(null, i)
            );
        return r;
      }),
      (n.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return n.d(e, "a", e), e;
      }),
      (n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ""),
      n((n.s = 9));
  })([
    function (t, e, n) {
      t.exports = n(10);
    },
    function (t, e) {
      function n(t, e, n, r, i, o, a) {
        try {
          var s = t[o](a),
            c = s.value;
        } catch (u) {
          return void n(u);
        }
        s.done ? e(c) : Promise.resolve(c).then(r, i);
      }
      t.exports = function (t) {
        return function () {
          var e = this,
            r = arguments;
          return new Promise(function (i, o) {
            var a = t.apply(e, r);
            function s(t) {
              n(a, i, o, s, c, "next", t);
            }
            function c(t) {
              n(a, i, o, s, c, "throw", t);
            }
            s(void 0);
          });
        };
      };
    },
    function (t, e, n) {
      var r = n(12),
        i = n(13),
        o = n(14);
      t.exports = function (t, e) {
        return r(t) || i(t, e) || o();
      };
    },
    function (t, e, n) {
      var r = n(15);
      t.exports = function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {},
            i = Object.keys(n);
          "function" == typeof Object.getOwnPropertySymbols &&
            (i = i.concat(
              Object.getOwnPropertySymbols(n).filter(function (t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable;
              })
            )),
            i.forEach(function (e) {
              r(t, e, n[e]);
            });
        }
        return t;
      };
    },
    function (t, e, n) {
      var r = n(5)(),
        i = function (t) {
          return t.reduce(function (t, e) {
            return (t[e[0]] = e[1].c), t;
          }, {});
        };
      t.exports = function (t, e) {
        var n = [],
          o = i(t),
          a = i(e);
        return (
          Object.keys(o).forEach(function (t) {
            if (a.hasOwnProperty(t)) {
              var e = r.calcStrDiff(o[t], a[t]);
              null !== e && n.push(["E", t, e]);
            } else
              n.push(["D", t, o[t]]),
                Object.keys(a).forEach(function (e) {
                  o[t] === a[e] && (n.push(["R", t, e]), delete a[e]);
                });
          }),
          Object.keys(a).forEach(function (t) {
            o.hasOwnProperty(t) || n.push(["N", t, a[t]]);
          }),
          n
        );
      };
    },
    function (t, e, n) {
      var r, i;
      function o() {
        (this.Diff_Timeout = 1),
          (this.Diff_EditCost = 4),
          (this.Match_Threshold = 0.5),
          (this.Match_Distance = 1e3),
          (this.Patch_DeleteThreshold = 0.5),
          (this.Patch_Margin = 4),
          (this.Match_MaxBits = 32);
      }
      function a(t) {
        return (a =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      (o.prototype.diff_main = function (t, e, n, r) {
        void 0 === r &&
          (r =
            this.Diff_Timeout <= 0
              ? Number.MAX_VALUE
              : new Date().getTime() + 1e3 * this.Diff_Timeout);
        var i = r;
        if (null == t || null == e) throw Error("Null input. (diff_main)");
        if (t == e) return t ? [[0, t]] : [];
        void 0 === n && (n = !0);
        var o = n,
          a = this.diff_commonPrefix(t, e),
          s = t.substring(0, a);
        (t = t.substring(a)),
          (e = e.substring(a)),
          (a = this.diff_commonSuffix(t, e));
        var c = t.substring(t.length - a);
        (t = t.substring(0, t.length - a)), (e = e.substring(0, e.length - a));
        var u = this.diff_compute_(t, e, o, i);
        return (
          s && u.unshift([0, s]),
          c && u.push([0, c]),
          this.diff_cleanupMerge(u),
          u
        );
      }),
        (o.prototype.diff_compute_ = function (t, e, n, r) {
          if (!t) return [[1, e]];
          if (!e) return [[-1, t]];
          var i,
            o = t.length > e.length ? t : e,
            a = t.length > e.length ? e : t,
            s = o.indexOf(a);
          if (-1 != s)
            return (
              (i = [
                [1, o.substring(0, s)],
                [0, a],
                [1, o.substring(s + a.length)],
              ]),
              t.length > e.length && (i[0][0] = i[2][0] = -1),
              i
            );
          if (1 == a.length)
            return [
              [-1, t],
              [1, e],
            ];
          var c = this.diff_halfMatch_(t, e);
          if (c) {
            var u = c[0],
              l = c[1],
              f = c[2],
              h = c[3],
              p = c[4],
              d = this.diff_main(u, f, n, r),
              _ = this.diff_main(l, h, n, r);
            return d.concat([[0, p]], _);
          }
          return n && 100 < t.length && 100 < e.length
            ? this.diff_lineMode_(t, e, r)
            : this.diff_bisect_(t, e, r);
        }),
        (o.prototype.diff_lineMode_ = function (t, e, n) {
          (t = (l = this.diff_linesToChars_(t, e)).chars1), (e = l.chars2);
          var r = l.lineArray,
            i = this.diff_main(t, e, !1, n);
          this.diff_charsToLines_(i, r),
            this.diff_cleanupSemantic(i),
            i.push([0, ""]);
          for (var o = 0, a = 0, s = 0, c = "", u = ""; o < i.length; ) {
            switch (i[o][0]) {
              case 1:
                s++, (u += i[o][1]);
                break;
              case -1:
                a++, (c += i[o][1]);
                break;
              case 0:
                if (1 <= a && 1 <= s) {
                  i.splice(o - a - s, a + s), (o = o - a - s);
                  for (
                    var l, f = (l = this.diff_main(c, u, !1, n)).length - 1;
                    0 <= f;
                    f--
                  )
                    i.splice(o, 0, l[f]);
                  o += l.length;
                }
                (a = s = 0), (u = c = "");
            }
            o++;
          }
          return i.pop(), i;
        }),
        (o.prototype.diff_bisect_ = function (t, e, n) {
          for (
            var r = t.length,
              i = e.length,
              o = Math.ceil((r + i) / 2),
              a = o,
              s = 2 * o,
              c = Array(s),
              u = Array(s),
              l = 0;
            l < s;
            l++
          )
            (c[l] = -1), (u[l] = -1);
          c[a + 1] = 0;
          for (
            var f = r - i,
              h = f % 2 != (u[a + 1] = 0),
              p = 0,
              d = 0,
              _ = 0,
              $ = 0,
              g = 0;
            g < o && !(new Date().getTime() > n);
            g++
          ) {
            for (var m = -g + p; m <= g - d; m += 2) {
              for (
                var v = a + m,
                  y =
                    (x =
                      m == -g || (m != g && c[v - 1] < c[v + 1])
                        ? c[v + 1]
                        : c[v - 1] + 1) - m;
                x < r && y < i && t.charAt(x) == e.charAt(y);

              )
                x++, y++;
              if (r < (c[v] = x)) d += 2;
              else if (i < y) p += 2;
              else if (
                h &&
                0 <= (k = a + f - m) &&
                k < s &&
                -1 != u[k] &&
                (w = r - u[k]) <= x
              )
                return this.diff_bisectSplit_(t, e, x, y, n);
            }
            for (var b = -g + _; b <= g - $; b += 2) {
              for (
                var x,
                  w,
                  k = a + b,
                  C =
                    (w =
                      b == -g || (b != g && u[k - 1] < u[k + 1])
                        ? u[k + 1]
                        : u[k - 1] + 1) - b;
                w < r && C < i && t.charAt(r - w - 1) == e.charAt(i - C - 1);

              )
                w++, C++;
              if (r < (u[k] = w)) $ += 2;
              else if (i < C) _ += 2;
              else if (
                !h &&
                0 <= (v = a + f - b) &&
                v < s &&
                -1 != c[v] &&
                ((y = a + (x = c[v]) - v), (w = r - w) <= x)
              )
                return this.diff_bisectSplit_(t, e, x, y, n);
            }
          }
          return [
            [-1, t],
            [1, e],
          ];
        }),
        (o.prototype.diff_bisectSplit_ = function (t, e, n, r, i) {
          var o = t.substring(0, n),
            a = e.substring(0, r),
            s = t.substring(n),
            c = e.substring(r),
            u = this.diff_main(o, a, !1, i),
            l = this.diff_main(s, c, !1, i);
          return u.concat(l);
        }),
        (o.prototype.diff_linesToChars_ = function (t, e) {
          var n = [],
            r = {};
          function i(t) {
            for (var e = "", i = 0, o = -1, a = n.length; o < t.length - 1; ) {
              -1 == (o = t.indexOf("\n", i)) && (o = t.length - 1);
              var s = t.substring(i, o + 1);
              (i = o + 1),
                (r.hasOwnProperty ? r.hasOwnProperty(s) : void 0 !== r[s])
                  ? (e += String.fromCharCode(r[s]))
                  : ((e += String.fromCharCode(a)), (r[s] = a), (n[a++] = s));
            }
            return e;
          }
          return (n[0] = ""), { chars1: i(t), chars2: i(e), lineArray: n };
        }),
        (o.prototype.diff_charsToLines_ = function (t, e) {
          for (var n = 0; n < t.length; n++) {
            for (var r = t[n][1], i = [], o = 0; o < r.length; o++)
              i[o] = e[r.charCodeAt(o)];
            t[n][1] = i.join("");
          }
        }),
        (o.prototype.diff_commonPrefix = function (t, e) {
          if (!t || !e || t.charAt(0) != e.charAt(0)) return 0;
          for (
            var n = 0, r = Math.min(t.length, e.length), i = r, o = 0;
            n < i;

          )
            t.substring(o, i) == e.substring(o, i) ? (o = n = i) : (r = i),
              (i = Math.floor((r - n) / 2 + n));
          return i;
        }),
        (o.prototype.diff_commonSuffix = function (t, e) {
          if (!t || !e || t.charAt(t.length - 1) != e.charAt(e.length - 1))
            return 0;
          for (
            var n = 0, r = Math.min(t.length, e.length), i = r, o = 0;
            n < i;

          )
            t.substring(t.length - i, t.length - o) ==
            e.substring(e.length - i, e.length - o)
              ? (o = n = i)
              : (r = i),
              (i = Math.floor((r - n) / 2 + n));
          return i;
        }),
        (o.prototype.diff_commonOverlap_ = function (t, e) {
          var n = t.length,
            r = e.length;
          if (0 == n || 0 == r) return 0;
          r < n ? (t = t.substring(n - r)) : n < r && (e = e.substring(0, n));
          var i = Math.min(n, r);
          if (t == e) return i;
          for (var o = 0, a = 1; ; ) {
            var s = t.substring(i - a),
              c = e.indexOf(s);
            if (-1 == c) return o;
            (a += c),
              (0 != c && t.substring(i - a) != e.substring(0, a)) ||
                ((o = a), a++);
          }
        }),
        (o.prototype.diff_halfMatch_ = function (t, e) {
          if (this.Diff_Timeout <= 0) return null;
          var n = t.length > e.length ? t : e,
            r = t.length > e.length ? e : t;
          if (n.length < 4 || 2 * r.length < n.length) return null;
          var i = this;
          function o(t, e, n) {
            for (
              var r,
                o,
                a,
                s,
                c = t.substring(n, n + Math.floor(t.length / 4)),
                u = -1,
                l = "";
              -1 != (u = e.indexOf(c, u + 1));

            ) {
              var f = i.diff_commonPrefix(t.substring(n), e.substring(u)),
                h = i.diff_commonSuffix(t.substring(0, n), e.substring(0, u));
              l.length < h + f &&
                ((l = e.substring(u - h, u) + e.substring(u, u + f)),
                (r = t.substring(0, n - h)),
                (o = t.substring(n + f)),
                (a = e.substring(0, u - h)),
                (s = e.substring(u + f)));
            }
            return 2 * l.length >= t.length ? [r, o, a, s, l] : null;
          }
          var a,
            s,
            c,
            u,
            l,
            f = o(n, r, Math.ceil(n.length / 4)),
            h = o(n, r, Math.ceil(n.length / 2));
          return f || h
            ? ((a = h ? (f && f[4].length > h[4].length ? f : h) : f),
              t.length > e.length
                ? ((s = a[0]), (c = a[1]), (u = a[2]), (l = a[3]))
                : ((u = a[0]), (l = a[1]), (s = a[2]), (c = a[3])),
              [s, c, u, l, a[4]])
            : null;
        }),
        (o.prototype.diff_cleanupSemantic = function (t) {
          for (
            var e = !1,
              n = [],
              r = 0,
              i = null,
              o = 0,
              a = 0,
              s = 0,
              c = 0,
              u = 0;
            o < t.length;

          )
            0 == t[o][0]
              ? ((a = c), (s = u), (u = c = 0), (i = t[(n[r++] = o)][1]))
              : (1 == t[o][0] ? (c += t[o][1].length) : (u += t[o][1].length),
                i &&
                  i.length <= Math.max(a, s) &&
                  i.length <= Math.max(c, u) &&
                  (t.splice(n[r - 1], 0, [-1, i]),
                  (t[n[r - 1] + 1][0] = 1),
                  r--,
                  (o = 0 < --r ? n[r - 1] : -1),
                  (u = c = s = a = 0),
                  (e = ((i = null), !0)))),
              o++;
          for (
            e && this.diff_cleanupMerge(t),
              this.diff_cleanupSemanticLossless(t),
              o = 1;
            o < t.length;

          ) {
            if (-1 == t[o - 1][0] && 1 == t[o][0]) {
              var l = t[o - 1][1],
                f = t[o][1],
                h = this.diff_commonOverlap_(l, f),
                p = this.diff_commonOverlap_(f, l);
              p <= h
                ? (h >= l.length / 2 || h >= f.length / 2) &&
                  (t.splice(o, 0, [0, f.substring(0, h)]),
                  (t[o - 1][1] = l.substring(0, l.length - h)),
                  (t[o + 1][1] = f.substring(h)),
                  o++)
                : (p >= l.length / 2 || p >= f.length / 2) &&
                  (t.splice(o, 0, [0, l.substring(0, p)]),
                  (t[o - 1][0] = 1),
                  (t[o - 1][1] = f.substring(0, f.length - p)),
                  (t[o + 1][0] = -1),
                  (t[o + 1][1] = l.substring(p)),
                  o++),
                o++;
            }
            o++;
          }
        }),
        (o.prototype.diff_cleanupSemanticLossless = function (t) {
          function e(t, e) {
            if (!t || !e) return 6;
            var n = t.charAt(t.length - 1),
              r = e.charAt(0),
              i = n.match(o.nonAlphaNumericRegex_),
              a = r.match(o.nonAlphaNumericRegex_),
              s = i && n.match(o.whitespaceRegex_),
              c = a && r.match(o.whitespaceRegex_),
              u = s && n.match(o.linebreakRegex_),
              l = c && r.match(o.linebreakRegex_),
              f = u && t.match(o.blanklineEndRegex_),
              h = l && e.match(o.blanklineStartRegex_);
            return f || h
              ? 5
              : u || l
              ? 4
              : i && !s && c
              ? 3
              : s || c
              ? 2
              : i || a
              ? 1
              : 0;
          }
          for (var n = 1; n < t.length - 1; ) {
            if (0 == t[n - 1][0] && 0 == t[n + 1][0]) {
              var r = t[n - 1][1],
                i = t[n][1],
                a = t[n + 1][1],
                s = this.diff_commonSuffix(r, i);
              if (s) {
                var c = i.substring(i.length - s);
                (r = r.substring(0, r.length - s)),
                  (i = c + i.substring(0, i.length - s)),
                  (a = c + a);
              }
              for (
                var u = r, l = i, f = a, h = e(r, i) + e(i, a);
                i.charAt(0) === a.charAt(0);

              ) {
                (r += i.charAt(0)),
                  (i = i.substring(1) + a.charAt(0)),
                  (a = a.substring(1));
                var p = e(r, i) + e(i, a);
                h <= p && ((h = p), (u = r), (l = i), (f = a));
              }
              t[n - 1][1] != u &&
                (u ? (t[n - 1][1] = u) : (t.splice(n - 1, 1), n--),
                (t[n][1] = l),
                f ? (t[n + 1][1] = f) : (t.splice(n + 1, 1), n--));
            }
            n++;
          }
        }),
        (o.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/),
        (o.whitespaceRegex_ = /\s/),
        (o.linebreakRegex_ = /[\r\n]/),
        (o.blanklineEndRegex_ = /\n\r?\n$/),
        (o.blanklineStartRegex_ = /^\r?\n\r?\n/),
        (o.prototype.diff_cleanupEfficiency = function (t) {
          for (
            var e = !1,
              n = [],
              r = 0,
              i = null,
              o = 0,
              a = !1,
              s = !1,
              c = !1,
              u = !1;
            o < t.length;

          )
            0 == t[o][0]
              ? ((i =
                  t[o][1].length < this.Diff_EditCost && (c || u)
                    ? ((a = c), (s = u), t[(n[r++] = o)][1])
                    : ((r = 0), null)),
                (c = u = !1))
              : (-1 == t[o][0] ? (u = !0) : (c = !0),
                i &&
                  ((a && s && c && u) ||
                    (i.length < this.Diff_EditCost / 2 &&
                      a + s + c + u == 3)) &&
                  (t.splice(n[r - 1], 0, [-1, i]),
                  (t[n[r - 1] + 1][0] = 1),
                  r--,
                  (i = null),
                  a && s
                    ? ((c = u = !0), (r = 0))
                    : ((o = 0 < --r ? n[r - 1] : -1), (c = u = !1)),
                  (e = !0))),
              o++;
          e && this.diff_cleanupMerge(t);
        }),
        (o.prototype.diff_cleanupMerge = function (t) {
          t.push([0, ""]);
          for (var e, n = 0, r = 0, i = 0, o = "", a = ""; n < t.length; )
            switch (t[n][0]) {
              case 1:
                i++, (a += t[n][1]), n++;
                break;
              case -1:
                r++, (o += t[n][1]), n++;
                break;
              case 0:
                1 < r + i
                  ? (0 !== r &&
                      0 !== i &&
                      (0 !== (e = this.diff_commonPrefix(a, o)) &&
                        (0 < n - r - i && 0 == t[n - r - i - 1][0]
                          ? (t[n - r - i - 1][1] += a.substring(0, e))
                          : (t.splice(0, 0, [0, a.substring(0, e)]), n++),
                        (a = a.substring(e)),
                        (o = o.substring(e))),
                      0 !== (e = this.diff_commonSuffix(a, o)) &&
                        ((t[n][1] = a.substring(a.length - e) + t[n][1]),
                        (a = a.substring(0, a.length - e)),
                        (o = o.substring(0, o.length - e)))),
                    0 === r
                      ? t.splice(n - i, r + i, [1, a])
                      : 0 === i
                      ? t.splice(n - r, r + i, [-1, o])
                      : t.splice(n - r - i, r + i, [-1, o], [1, a]),
                    (n = n - r - i + (r ? 1 : 0) + (i ? 1 : 0) + 1))
                  : 0 !== n && 0 == t[n - 1][0]
                  ? ((t[n - 1][1] += t[n][1]), t.splice(n, 1))
                  : n++,
                  (r = i = 0),
                  (a = o = "");
            }
          "" === t[t.length - 1][1] && t.pop();
          var s = !1;
          for (n = 1; n < t.length - 1; )
            0 == t[n - 1][0] &&
              0 == t[n + 1][0] &&
              (t[n][1].substring(t[n][1].length - t[n - 1][1].length) ==
              t[n - 1][1]
                ? ((t[n][1] =
                    t[n - 1][1] +
                    t[n][1].substring(0, t[n][1].length - t[n - 1][1].length)),
                  (t[n + 1][1] = t[n - 1][1] + t[n + 1][1]),
                  t.splice(n - 1, 1),
                  (s = !0))
                : t[n][1].substring(0, t[n + 1][1].length) == t[n + 1][1] &&
                  ((t[n - 1][1] += t[n + 1][1]),
                  (t[n][1] =
                    t[n][1].substring(t[n + 1][1].length) + t[n + 1][1]),
                  t.splice(n + 1, 1),
                  (s = !0))),
              n++;
          s && this.diff_cleanupMerge(t);
        }),
        (o.prototype.diff_xIndex = function (t, e) {
          var n,
            r = 0,
            i = 0,
            o = 0,
            a = 0;
          for (
            n = 0;
            n < t.length &&
            (1 !== t[n][0] && (r += t[n][1].length),
            -1 !== t[n][0] && (i += t[n][1].length),
            !(e < r));
            n++
          )
            (o = r), (a = i);
          return t.length != n && -1 === t[n][0] ? a : a + (e - o);
        }),
        (o.prototype.diff_prettyHtml = function (t) {
          for (
            var e = [], n = /&/g, r = /</g, i = />/g, o = /\n/g, a = 0;
            a < t.length;
            a++
          ) {
            var s = t[a][0],
              c = t[a][1]
                .replace(n, "&amp;")
                .replace(r, "&lt;")
                .replace(i, "&gt;")
                .replace(o, "&para;<br>");
            switch (s) {
              case 1:
                e[a] = '<ins style="background:#e6ffe6;">' + c + "</ins>";
                break;
              case -1:
                e[a] = '<del style="background:#ffe6e6;">' + c + "</del>";
                break;
              case 0:
                e[a] = "<span>" + c + "</span>";
            }
          }
          return e.join("");
        }),
        (o.prototype.diff_text1 = function (t) {
          for (var e = [], n = 0; n < t.length; n++)
            1 !== t[n][0] && (e[n] = t[n][1]);
          return e.join("");
        }),
        (o.prototype.diff_text2 = function (t) {
          for (var e = [], n = 0; n < t.length; n++)
            -1 !== t[n][0] && (e[n] = t[n][1]);
          return e.join("");
        }),
        (o.prototype.diff_levenshtein = function (t) {
          for (var e = 0, n = 0, r = 0, i = 0; i < t.length; i++) {
            var o = t[i][0],
              a = t[i][1];
            switch (o) {
              case 1:
                n += a.length;
                break;
              case -1:
                r += a.length;
                break;
              case 0:
                (e += Math.max(n, r)), (r = n = 0);
            }
          }
          return e + Math.max(n, r);
        }),
        (o.prototype.diff_toDelta = function (t) {
          for (var e = [], n = 0; n < t.length; n++)
            switch (t[n][0]) {
              case 1:
                e[n] = "+" + encodeURI(t[n][1]);
                break;
              case -1:
                e[n] = "-" + t[n][1].length;
                break;
              case 0:
                e[n] = "=" + t[n][1].length;
            }
          return e.join("	").replace(/%20/g, " ");
        }),
        (o.prototype.diff_fromDelta = function (t, e) {
          for (
            var n = [], r = 0, i = 0, o = e.split(/\t/g), a = 0;
            a < o.length;
            a++
          ) {
            var s = o[a].substring(1);
            switch (o[a].charAt(0)) {
              case "+":
                try {
                  n[r++] = [1, decodeURI(s)];
                } catch (c) {
                  throw Error("Illegal escape in diff_fromDelta: " + s);
                }
                break;
              case "-":
              case "=":
                var u = parseInt(s, 10);
                if (isNaN(u) || u < 0)
                  throw Error("Invalid number in diff_fromDelta: " + s);
                var l = t.substring(i, (i += u));
                "=" == o[a].charAt(0) ? (n[r++] = [0, l]) : (n[r++] = [-1, l]);
                break;
              default:
                if (o[a])
                  throw Error(
                    "Invalid diff operation in diff_fromDelta: " + o[a]
                  );
            }
          }
          if (i != t.length)
            throw Error(
              "Delta length (" +
                i +
                ") does not equal source text length (" +
                t.length +
                ")."
            );
          return n;
        }),
        (o.prototype.match_main = function (t, e, n) {
          if (null == t || null == e || null == n)
            throw Error("Null input. (match_main)");
          return (
            (n = Math.max(0, Math.min(n, t.length))),
            t == e
              ? 0
              : t.length
              ? t.substring(n, n + e.length) == e
                ? n
                : this.match_bitap_(t, e, n)
              : -1
          );
        }),
        (o.prototype.match_bitap_ = function (t, e, n) {
          if (e.length > this.Match_MaxBits)
            throw Error("Pattern too long for this browser.");
          var r = this.match_alphabet_(e),
            i = this;
          function o(t, r) {
            var o = t / e.length,
              a = Math.abs(n - r);
            return i.Match_Distance ? o + a / i.Match_Distance : a ? 1 : o;
          }
          var a = this.Match_Threshold,
            s = t.indexOf(e, n);
          -1 != s &&
            ((a = Math.min(o(0, s), a)),
            -1 != (s = t.lastIndexOf(e, n + e.length)) &&
              (a = Math.min(o(0, s), a)));
          var c,
            u,
            l = 1 << (e.length - 1);
          s = -1;
          for (var f, h = e.length + t.length, p = 0; p < e.length; p++) {
            for (c = 0, u = h; c < u; )
              o(p, n + u) <= a ? (c = u) : (h = u),
                (u = Math.floor((h - c) / 2 + c));
            h = u;
            var d = Math.max(1, n - u + 1),
              _ = Math.min(n + u, t.length) + e.length,
              $ = Array(_ + 2);
            $[_ + 1] = (1 << p) - 1;
            for (var g = _; d <= g; g--) {
              var m = r[t.charAt(g - 1)];
              if (
                (($[g] =
                  0 === p
                    ? (($[g + 1] << 1) | 1) & m
                    : ((($[g + 1] << 1) | 1) & m) |
                      ((f[g + 1] | f[g]) << 1) |
                      1 |
                      f[g + 1]),
                $[g] & l)
              ) {
                var v = o(p, g - 1);
                if (v <= a) {
                  if (((a = v), !(n < (s = g - 1)))) break;
                  d = Math.max(1, 2 * n - s);
                }
              }
            }
            if (o(p + 1, n) > a) break;
            f = $;
          }
          return s;
        }),
        (o.prototype.match_alphabet_ = function (t) {
          for (var e = {}, n = 0; n < t.length; n++) e[t.charAt(n)] = 0;
          for (n = 0; n < t.length; n++)
            e[t.charAt(n)] |= 1 << (t.length - n - 1);
          return e;
        }),
        (o.prototype.patch_addContext_ = function (t, e) {
          if (0 != e.length) {
            for (
              var n = e.substring(t.start2, t.start2 + t.length1), r = 0;
              e.indexOf(n) != e.lastIndexOf(n) &&
              n.length <
                this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin;

            )
              (r += this.Patch_Margin),
                (n = e.substring(t.start2 - r, t.start2 + t.length1 + r));
            r += this.Patch_Margin;
            var i = e.substring(t.start2 - r, t.start2);
            i && t.diffs.unshift([0, i]);
            var o = e.substring(t.start2 + t.length1, t.start2 + t.length1 + r);
            o && t.diffs.push([0, o]),
              (t.start1 -= i.length),
              (t.start2 -= i.length),
              (t.length1 += i.length + o.length),
              (t.length2 += i.length + o.length);
          }
        }),
        (o.prototype.patch_make = function (t, e, n) {
          var r, i;
          if ("string" == typeof t && "string" == typeof e && void 0 === n)
            (r = t),
              2 < (i = this.diff_main(r, e, !0)).length &&
                (this.diff_cleanupSemantic(i), this.diff_cleanupEfficiency(i));
          else if (t && "object" == typeof t && void 0 === e && void 0 === n)
            (i = t), (r = this.diff_text1(i));
          else if (
            "string" == typeof t &&
            e &&
            "object" == typeof e &&
            void 0 === n
          )
            (r = t), (i = e);
          else {
            if (
              "string" != typeof t ||
              "string" != typeof e ||
              !n ||
              "object" != typeof n
            )
              throw Error("Unknown call format to patch_make.");
            (r = t), (i = n);
          }
          if (0 === i.length) return [];
          for (
            var a = [],
              s = new o.patch_obj(),
              c = 0,
              u = 0,
              l = 0,
              f = r,
              h = r,
              p = 0;
            p < i.length;
            p++
          ) {
            var d = i[p][0],
              _ = i[p][1];
            switch ((c || 0 === d || ((s.start1 = u), (s.start2 = l)), d)) {
              case 1:
                (s.diffs[c++] = i[p]),
                  (s.length2 += _.length),
                  (h = h.substring(0, l) + _ + h.substring(l));
                break;
              case -1:
                (s.length1 += _.length),
                  (s.diffs[c++] = i[p]),
                  (h = h.substring(0, l) + h.substring(l + _.length));
                break;
              case 0:
                _.length <= 2 * this.Patch_Margin && c && i.length != p + 1
                  ? ((s.diffs[c++] = i[p]),
                    (s.length1 += _.length),
                    (s.length2 += _.length))
                  : _.length >= 2 * this.Patch_Margin &&
                    c &&
                    (this.patch_addContext_(s, f),
                    a.push(s),
                    (s = new o.patch_obj()),
                    (c = 0),
                    (f = h),
                    (u = l));
            }
            1 !== d && (u += _.length), -1 !== d && (l += _.length);
          }
          return c && (this.patch_addContext_(s, f), a.push(s)), a;
        }),
        (o.prototype.patch_deepCopy = function (t) {
          for (var e = [], n = 0; n < t.length; n++) {
            var r = t[n],
              i = new o.patch_obj();
            i.diffs = [];
            for (var a = 0; a < r.diffs.length; a++)
              i.diffs[a] = r.diffs[a].slice();
            (i.start1 = r.start1),
              (i.start2 = r.start2),
              (i.length1 = r.length1),
              (i.length2 = r.length2),
              (e[n] = i);
          }
          return e;
        }),
        (o.prototype.patch_apply = function (t, e) {
          if (0 == t.length) return [e, []];
          t = this.patch_deepCopy(t);
          var n = this.patch_addPadding(t);
          (e = n + e + n), this.patch_splitMax(t);
          for (var r = 0, i = [], o = 0; o < t.length; o++) {
            var a,
              s,
              c = t[o].start2 + r,
              u = this.diff_text1(t[o].diffs),
              l = -1;
            if (
              (u.length > this.Match_MaxBits
                ? -1 !=
                    (a = this.match_main(
                      e,
                      u.substring(0, this.Match_MaxBits),
                      c
                    )) &&
                  (-1 ==
                    (l = this.match_main(
                      e,
                      u.substring(u.length - this.Match_MaxBits),
                      c + u.length - this.Match_MaxBits
                    )) ||
                    l <= a) &&
                  (a = -1)
                : (a = this.match_main(e, u, c)),
              -1 == a)
            )
              (i[o] = !1), (r -= t[o].length2 - t[o].length1);
            else if (
              ((i[o] = !0),
              (r = a - c),
              u ==
                (s =
                  -1 == l
                    ? e.substring(a, a + u.length)
                    : e.substring(a, l + this.Match_MaxBits)))
            )
              e =
                e.substring(0, a) +
                this.diff_text2(t[o].diffs) +
                e.substring(a + u.length);
            else {
              var f = this.diff_main(u, s, !1);
              if (
                u.length > this.Match_MaxBits &&
                this.diff_levenshtein(f) / u.length > this.Patch_DeleteThreshold
              )
                i[o] = !1;
              else {
                this.diff_cleanupSemanticLossless(f);
                for (var h, p = 0, d = 0; d < t[o].diffs.length; d++) {
                  var _ = t[o].diffs[d];
                  0 !== _[0] && (h = this.diff_xIndex(f, p)),
                    1 === _[0]
                      ? (e = e.substring(0, a + h) + _[1] + e.substring(a + h))
                      : -1 === _[0] &&
                        (e =
                          e.substring(0, a + h) +
                          e.substring(
                            a + this.diff_xIndex(f, p + _[1].length)
                          )),
                    -1 !== _[0] && (p += _[1].length);
                }
              }
            }
          }
          return [(e = e.substring(n.length, e.length - n.length)), i];
        }),
        (o.prototype.patch_addPadding = function (t) {
          for (var e = this.Patch_Margin, n = "", r = 1; r <= e; r++)
            n += String.fromCharCode(r);
          for (r = 0; r < t.length; r++) (t[r].start1 += e), (t[r].start2 += e);
          var i = t[0],
            o = i.diffs;
          if (0 == o.length || 0 != o[0][0])
            o.unshift([0, n]),
              (i.start1 -= e),
              (i.start2 -= e),
              (i.length1 += e),
              (i.length2 += e);
          else if (e > o[0][1].length) {
            var a = e - o[0][1].length;
            (o[0][1] = n.substring(o[0][1].length) + o[0][1]),
              (i.start1 -= a),
              (i.start2 -= a),
              (i.length1 += a),
              (i.length2 += a);
          }
          return (
            0 == (o = (i = t[t.length - 1]).diffs).length ||
            0 != o[o.length - 1][0]
              ? (o.push([0, n]), (i.length1 += e), (i.length2 += e))
              : e > o[o.length - 1][1].length &&
                ((a = e - o[o.length - 1][1].length),
                (o[o.length - 1][1] += n.substring(0, a)),
                (i.length1 += a),
                (i.length2 += a)),
            n
          );
        }),
        (o.prototype.patch_splitMax = function (t) {
          for (var e = this.Match_MaxBits, n = 0; n < t.length; n++)
            if (!(t[n].length1 <= e)) {
              var r = t[n];
              t.splice(n--, 1);
              for (
                var i = r.start1, a = r.start2, s = "";
                0 !== r.diffs.length;

              ) {
                var c = new o.patch_obj(),
                  u = !0;
                for (
                  c.start1 = i - s.length,
                    c.start2 = a - s.length,
                    "" !== s &&
                      ((c.length1 = c.length2 = s.length),
                      c.diffs.push([0, s]));
                  0 !== r.diffs.length && c.length1 < e - this.Patch_Margin;

                ) {
                  var l = r.diffs[0][0],
                    f = r.diffs[0][1];
                  1 === l
                    ? ((c.length2 += f.length),
                      (a += f.length),
                      c.diffs.push(r.diffs.shift()),
                      (u = !1))
                    : -1 === l &&
                      1 == c.diffs.length &&
                      0 == c.diffs[0][0] &&
                      f.length > 2 * e
                    ? ((c.length1 += f.length),
                      (i += f.length),
                      (u = !1),
                      c.diffs.push([l, f]),
                      r.diffs.shift())
                    : ((f = f.substring(0, e - c.length1 - this.Patch_Margin)),
                      (c.length1 += f.length),
                      (i += f.length),
                      0 === l
                        ? ((c.length2 += f.length), (a += f.length))
                        : (u = !1),
                      c.diffs.push([l, f]),
                      f == r.diffs[0][1]
                        ? r.diffs.shift()
                        : (r.diffs[0][1] = r.diffs[0][1].substring(f.length)));
                }
                s = (s = this.diff_text2(c.diffs)).substring(
                  s.length - this.Patch_Margin
                );
                var h = this.diff_text1(r.diffs).substring(
                  0,
                  this.Patch_Margin
                );
                "" !== h &&
                  ((c.length1 += h.length),
                  (c.length2 += h.length),
                  0 !== c.diffs.length && 0 === c.diffs[c.diffs.length - 1][0]
                    ? (c.diffs[c.diffs.length - 1][1] += h)
                    : c.diffs.push([0, h])),
                  u || t.splice(++n, 0, c);
              }
            }
        }),
        (o.prototype.patch_toText = function (t) {
          for (var e = [], n = 0; n < t.length; n++) e[n] = t[n];
          return e.join("");
        }),
        (o.prototype.patch_fromText = function (t) {
          var e = [];
          if (!t) return e;
          for (
            var n = t.split("\n"),
              r = 0,
              i = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
            r < n.length;

          ) {
            var a = n[r].match(i);
            if (!a) throw Error("Invalid patch string: " + n[r]);
            var s = new o.patch_obj();
            for (
              e.push(s),
                s.start1 = parseInt(a[1], 10),
                "" === a[2]
                  ? (s.start1--, (s.length1 = 1))
                  : "0" == a[2]
                  ? (s.length1 = 0)
                  : (s.start1--, (s.length1 = parseInt(a[2], 10))),
                s.start2 = parseInt(a[3], 10),
                "" === a[4]
                  ? (s.start2--, (s.length2 = 1))
                  : "0" == a[4]
                  ? (s.length2 = 0)
                  : (s.start2--, (s.length2 = parseInt(a[4], 10))),
                r++;
              r < n.length;

            ) {
              var c = n[r].charAt(0);
              try {
                var u = n[r].substring(1);
              } catch (l) {
                throw Error("Illegal escape in patch_fromText: " + u);
              }
              if ("-" == c) s.diffs.push([-1, u]);
              else if ("+" == c) s.diffs.push([1, u]);
              else if (" " == c) s.diffs.push([0, u]);
              else {
                if ("@" == c) break;
                if ("" !== c)
                  throw Error('Invalid patch mode "' + c + '" in: ' + u);
              }
              r++;
            }
          }
          return e;
        }),
        ((o.patch_obj = function () {
          (this.diffs = []),
            (this.start1 = null),
            (this.start2 = null),
            (this.length1 = 0),
            (this.length2 = 0);
        }).prototype.toString = function () {
          for (
            var t,
              e = [
                "@@ -" +
                  (0 === this.length1
                    ? this.start1 + ",0"
                    : 1 == this.length1
                    ? this.start1 + 1
                    : this.start1 + 1 + "," + this.length1) +
                  " +" +
                  (0 === this.length2
                    ? this.start2 + ",0"
                    : 1 == this.length2
                    ? this.start2 + 1
                    : this.start2 + 1 + "," + this.length2) +
                  " @@\n",
              ],
              n = 0;
            n < this.diffs.length;
            n++
          ) {
            switch (this.diffs[n][0]) {
              case 1:
                t = "+";
                break;
              case -1:
                t = "-";
                break;
              case 0:
                t = " ";
            }
            e[n + 1] = t + encodeURI(this.diffs[n][1]) + "\n";
          }
          return e.join("").replace(/%20/g, " ");
        }),
        (t.exports = o),
        (t.exports.diff_match_patch = o),
        (t.exports.DIFF_DELETE = -1),
        (t.exports.DIFF_INSERT = 1),
        (t.exports.DIFF_EQUAL = 0),
        "undefined" != typeof self && self,
        void 0 ===
          (i =
            "function" ==
            typeof (r = function () {
              return function () {
                var t,
                  e = [],
                  n = {
                    ON_CHANGE: "s",
                    ON_ADD: "a",
                    ON_COMMIT: "c",
                    ON_CHECKOUT: "co",
                  },
                  r = { i: 0, commits: {}, stage: [], working: [], head: null },
                  i = function () {
                    return t || (t = new o());
                  },
                  s = function (t) {
                    return JSON.parse(JSON.stringify(t));
                  },
                  c = function (t) {
                    return JSON.stringify(t);
                  },
                  u = function (t) {
                    return JSON.parse(t);
                  },
                  l = function () {
                    var t = n.log(),
                      e = Object.keys(t),
                      r = e.find(function (e) {
                        return null === t[e].parent && t[e].files.match(/^\[/);
                      });
                    return r || (r = e.shift()), r;
                  },
                  f = function () {
                    var t,
                      e,
                      r = n.log(),
                      o = {},
                      s = ((t = n.log()), (e = l()) ? t[e] : null);
                    return (
                      Object.keys(r).forEach(function t(e) {
                        if (o[e]) return o[e];
                        if (!r[e]) return (o[e] = s.files);
                        if (null !== r[e].parent) {
                          var n,
                            c,
                            u,
                            l = t(r[e].parent);
                          return (
                            void 0 === a(l) &&
                              ((function (t) {
                                throw Error('"source" is read-only');
                              })(),
                              (l = s.files)),
                            (o[e] =
                              ((n = l),
                              (c = r[e].files),
                              (u = i())
                                .patch_apply(u.patch_fromText(c), n)
                                .shift()))
                          );
                        }
                        o[e] = r[e].files;
                      }),
                      o
                    );
                  },
                  h = function (t) {
                    var e = f();
                    if (!e[t]) throw Error("There is no commit with hash " + t);
                    return e[t];
                  },
                  p = function (t, e) {
                    var n = i(),
                      r = n.diff_main(t, e, !0);
                    return (
                      2 < r.length && n.diff_cleanupSemantic(r),
                      n.patch_toText(n.patch_make(t, e, r))
                    );
                  },
                  d = function (t, e) {
                    return decodeURI(p(h(e), t));
                  },
                  _ = function (t) {
                    return e.forEach(function (e) {
                      return e(t);
                    });
                  },
                  $ = function (t) {
                    return {
                      length: function () {
                        return t.length;
                      },
                      save: function (e, n) {
                        !(function (t, e) {
                          if (!t) throw Error("`filepath` is required.");
                          if (!e) throw Error("`file` object is required.");
                          if ("string" != typeof t)
                            throw Error("`filepath` must be a string.");
                          if ("object" !== a(e))
                            throw Error("`file` must be an object.");
                        })(e, n);
                        for (var r = 0, i = this.length(); r < i; ) {
                          if (t[r][0] === e)
                            return (t[r][1] = Object.assign({}, t[r][1], n));
                          r++;
                        }
                        t.push([e, n]);
                      },
                      saveAll: function (e) {
                        for (var n = 0, r = this.length(); n < r; )
                          (t[n][1] = Object.assign({}, t[n][1], e)), n++;
                      },
                      get: function (e) {
                        for (var n = 0, r = this.length(); n < r; ) {
                          if (t[n][0] === e) return t[n][1];
                          n++;
                        }
                      },
                      del: function (e) {
                        for (var n = 0, r = this.length(); n < r; ) {
                          if (t[n][0] === e || t[n][1] === e)
                            return void t.splice(n, 1);
                          n++;
                        }
                        throw Error(
                          "There is no file with path ".concat(e, ".")
                        );
                      },
                      getKey: function (e) {
                        for (var n = 0, r = this.length(); n < r; ) {
                          if (t[n][1] === e) return t[n][0];
                          n++;
                        }
                      },
                      rename: function (e, n) {
                        for (var r = 0, i = this.length(); r < i; ) {
                          if (t[r][0] === e) return (t[r][0] = n);
                          r++;
                        }
                        throw Error(
                          "There is no file with path ".concat(key, ".")
                        );
                      },
                      clone: function () {
                        return s(t);
                      },
                      replaceStorage: function (e) {
                        t = e;
                      },
                      toObject: function () {
                        return t.reduce(function (t, e) {
                          return (t[e[0]] = e[1]), t;
                        }, {});
                      },
                    };
                  },
                  g = function (t) {
                    var e = i().patch_fromText(t);
                    return e.reduce(function (t, n, r) {
                      return (
                        n.diffs &&
                          ((t += n.diffs.reduce(function (t, e) {
                            var n = y(decodeURI(e[1])).replace(/\n/g, "<br />");
                            return (
                              1 === e[0] && (t += "<ins>" + n + "</ins>"),
                              -1 === e[0] && (t += "<del>" + n + "</del>"),
                              0 === e[0] && (t += "<span>" + n + "</span>"),
                              t
                            );
                          }, "")),
                          r < e.length - 1 && (t += "<hr />")),
                        t
                      );
                    }, "");
                  },
                  m = function () {
                    var t = r.commits,
                      e = Object.keys(t),
                      n = l();
                    n &&
                      e.forEach(function (e) {
                        var r = t[e];
                        null === r.parent && e !== n && (r.parent = n),
                          null !== r.parent &&
                            void 0 === t[r.parent] &&
                            (r.parent = n);
                      });
                  },
                  v = function (t, e) {
                    return decodeURI(p(c(t), c(e)));
                  },
                  y = function (t) {
                    var e = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };
                    return t.replace(/[&<>]/g, function (t) {
                      return e[t] || t;
                    });
                  },
                  b = $(r.working),
                  x = $(r.stage);
                return (
                  (n.save = function (t, e) {
                    return "object" === a(t) && void 0 === e
                      ? (Object.keys(t).forEach(function (e) {
                          return b.save(e, t[e]);
                        }),
                        _(n.ON_CHANGE),
                        n)
                      : (b.save(t, e), _(n.ON_CHANGE), e);
                  }),
                  (n.saveAll = function (t) {
                    return b.saveAll(t), _(n.ON_CHANGE), n;
                  }),
                  (n.discard = function () {
                    return this.checkout(void 0, !0), n;
                  }),
                  (n.del = function (t) {
                    return b.del(t), _(n.ON_CHANGE), n;
                  }),
                  (n.rename = function (t, e) {
                    return b.rename(t, e), _(n.ON_CHANGE), r.working;
                  }),
                  (n.get = function (t) {
                    return b.get(t);
                  }),
                  (n.exists = function (t) {
                    return !!b.get(t);
                  }),
                  (n.getAll = function () {
                    return r.working;
                  }),
                  (n.getFilepath = function (t) {
                    return b.getKey(t);
                  }),
                  (n.add = function (t) {
                    if (void 0 === t) x.replaceStorage((r.stage = b.clone()));
                    else {
                      var e = b.get(t);
                      if (!e)
                        throw Error(
                          "There is no '".concat(
                            t,
                            "' in the working directory."
                          )
                        );
                      x.save(t, s(e));
                    }
                    return _(n.ON_ADD), n;
                  }),
                  (n.commit = function (t, e) {
                    if (0 === x.length()) throw Error("NOTHING_TO_COMMIT");
                    var i = "_" + ++r.i,
                      o = this.head(),
                      a = null !== o ? d(c(r.stage), o) : c(r.stage);
                    return (
                      (r.commits[i] = { message: t, parent: o, files: a }),
                      e && (r.commits[i].meta = e),
                      (r.head = i),
                      x.replaceStorage((r.stage = [])),
                      _(n.ON_COMMIT),
                      i
                    );
                  }),
                  (n.amend = function (t, e) {
                    if (void 0 === t && void 0 === e && null !== this.head)
                      return this.amend(this.head(), { files: b.toObject() });
                    var i = s(this.log()),
                      o = Object.keys(i);
                    if (0 !== o.length) {
                      var a = f();
                      return (
                        o.forEach(function (t) {
                          return (i[t].files = u(a[t]));
                        }),
                        o.forEach(function (n) {
                          var r = i[n];
                          t === n &&
                            ((r.message = e.message ? e.message : r.message),
                            (r.meta = e.meta ? e.meta : r.meta),
                            e.files &&
                              (r.files = Object.keys(e.files).reduce(function (
                                t,
                                n
                              ) {
                                return t.push([n, e.files[n]]), t;
                              },
                              [])));
                        }),
                        Object.keys(i).forEach(function (t) {
                          var e = i[t];
                          null === e.parent
                            ? (e._files = c(e.files))
                            : (e._files = v(i[e.parent].files, e.files));
                        }),
                        Object.keys(i).forEach(function (t) {
                          (i[t].files = i[t]._files), delete i[t]._files;
                        }),
                        (r.commits = i),
                        _(n.ON_COMMIT),
                        i[t]
                      );
                    }
                  }),
                  (n.show = function (t) {
                    t = t || this.head();
                    var e = n.log()[t];
                    if (!e)
                      throw Error(
                        'There is no commit with hash "'.concat(t, '".')
                      );
                    var r = s(e);
                    return (r.files = u(h(t))), r;
                  }),
                  (n.checkout = function (t) {
                    var e =
                      1 < arguments.length &&
                      void 0 !== arguments[1] &&
                      arguments[1];
                    if (!e && 0 < x.length()) throw Error("UNCOMMITED_CHANGES");
                    if (!e && "" !== d(c(r.working), this.head()))
                      throw Error("UNSTAGED_FILES");
                    return (
                      void 0 === t && (t = this.head()),
                      (r.head = t),
                      b.replaceStorage((r.working = u(h(t)))),
                      _(n.ON_CHECKOUT),
                      n
                    );
                  }),
                  (n.staged = function () {
                    return x;
                  }),
                  (n.head = function () {
                    return r.head;
                  }),
                  (n.log = function () {
                    return r.commits;
                  }),
                  (n.logAsTree = function () {
                    var t = s(r.commits);
                    return (function e(n) {
                      if (!n) return null;
                      var r = t[n];
                      return (
                        delete t[n],
                        (r.hash = n),
                        (r.derivatives = Object.keys(t)
                          .filter(function (e) {
                            return t[e].parent === n;
                          })
                          .map(e)),
                        r
                      );
                    })(
                      Object.keys(t).find(function (e) {
                        return null === t[e].parent;
                      })
                    );
                  }),
                  (n.rollOut = function () {
                    var t = this.log(),
                      e = f();
                    return Object.keys(t).reduce(function (n, r) {
                      return (
                        (n[r] = {}),
                        (n[r].message = t[r].message),
                        (n[r].parent = t[r].parent),
                        t[r].meta && (n[r].meta = t[r].meta),
                        (n[r].files = e[r] ? u(e[r]) : ""),
                        n
                      );
                    }, {});
                  }),
                  (n.adios = function (t) {
                    var e = s(this.log()),
                      i = e[t],
                      o = Object.keys(e);
                    if (0 !== o.length) {
                      var a,
                        l,
                        h = e[t].parent,
                        p = f();
                      return (
                        o.forEach(function (t) {
                          return (e[t].files = u(p[t]));
                        }),
                        delete e[t],
                        (o = Object.keys(e)).forEach(function (n) {
                          var r = e[n];
                          r.parent === t &&
                            null === (r.parent = h) &&
                            (a ? (r.parent = a) : (a = n)),
                            null === r.parent
                              ? (r._files = c(r.files))
                              : (r._files = v(e[r.parent].files, r.files));
                        }),
                        o.forEach(function (t) {
                          (e[t].files = e[t]._files), delete e[t]._files;
                        }),
                        this.head() === t &&
                          (0 === Object.keys((l = e)).length &&
                          l.constructor === Object
                            ? (r.head = null)
                            : this.checkout(
                                null === h ? Object.keys(e).shift() : h
                              )),
                        (r.commits = e),
                        _(n.ON_COMMIT),
                        m(),
                        i
                      );
                    }
                  }),
                  (n.diff = function () {
                    var t = d(c(r.working), this.head());
                    return "" === t ? null : { text: t, html: g(t) };
                  }),
                  (n.export = function () {
                    return s(r);
                  }),
                  (n.listen = function (t) {
                    e.push(t);
                  }),
                  (n.import = function (t) {
                    return (
                      (r = t).head || (r.head = null),
                      r.i ||
                        (r.i = r.head ? parseInt(r.head.replace("_", "")) : 0),
                      r.stage || (r.stage = []),
                      r.working ||
                        ((r.working = []), this.checkout(this.head(), !0)),
                      r.commits || (r.commits = {}),
                      b.replaceStorage(r.working),
                      x.replaceStorage(r.stage),
                      m(),
                      n
                    );
                  }),
                  (n.commitDiffToHTML = function (t) {
                    if (!r.commits[t])
                      throw Error(
                        "There is no commit with hash ".concat(t, ".")
                      );
                    return -1 === r.commits[t].files.indexOf("@@")
                      ? ""
                      : g(r.commits[t].files);
                  }),
                  (n.calcStrDiff = function (t, e) {
                    var n = p(t, e);
                    return "" === n ? null : { text: n, html: g(n) };
                  }),
                  n
                );
              };
            })
              ? r.apply(e, [])
              : r) || (t.exports = i);
    },
    function (t, e) {
      function n() {
        return document.getElementById("svg-canvas");
      }
      function r(t, e, r, i) {
        var o = n(),
          a = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        a.setAttributeNS(null, "cx", t),
          a.setAttributeNS(null, "cy", e),
          a.setAttributeNS(null, "r", r),
          a.setAttributeNS(null, "fill", i),
          o.appendChild(a);
      }
      t.exports = {
        connectCommits: function (t, e, i) {
          var o, a, s, c, u, l, f;
          r(t, e, 3, "#999"),
            r(t, i, 3, "#999"),
            (a = e),
            (s = o = t),
            (c = i),
            (u = n()),
            (l = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path"
            )),
            (f =
              "M " +
              o +
              " " +
              a +
              " C 40 " +
              (a + 15) +
              " " +
              (s + 15) +
              " " +
              c +
              " " +
              s +
              " " +
              c),
            l.setAttributeNS(null, "d", f),
            l.setAttributeNS(null, "fill", "none"),
            l.setAttributeNS(null, "stroke", "#999"),
            u.appendChild(l);
        },
        empty: function () {
          for (var t = n(); t.firstChild; ) t.removeChild(t.firstChild);
        },
      };
    },
    function (t) {
      t.exports = {
        name: "demoit",
        version: "7.10.0",
        description: "A live coding tool",
        main: "index.js",
        repository: {
          type: "git",
          url: "git+https://github.com/krasimir/demoit.git",
        },
        scripts: {
          "clean-demoit": "shx rm -rf ./dist/*",
          "copy-static":
            "shx cp ./src/index.html ./dist/index.html && shx cp ./src/sandbox.html ./dist/sandbox.html && shx cp -r ./src/resources ./dist && shx cp -r ./src/img ./dist",
          "produce-minified-js":
            "uglifyjs ./src/js-vendor/split.js ./.tmp/demoit.js -c -m -o ./dist/demoit.js",
          "produce-js":
            "shx cat ./src/js-vendor/split.js ./.tmp/demoit.js > ./dist/demoit.js",
          "produce-css":
            "shx cat ./src/css/codemirror.css ./src/css/la.css ./src/css/styles.css ./src/css/light_theme.css ./src/css/dark_theme.css | uglifycss > ./dist/styles.css",
          "produce-editor-js":
            "uglifyjs ./src/js-vendor/codemirror.js ./src/js-vendor/javascript.js ./src/js-vendor/xml.js ./src/js-vendor/jsx.js ./src/js-vendor/mark-selection.js ./src/js-vendor/matchbrackets.js ./src/js-vendor/comment.js ./src/js-vendor/search_cursor.js ./src/js-vendor/overlay.js ./src/js-vendor/markdown.js ./src/js-vendor/gfm.js ./src/js-vendor/runmode.js ./src/js-vendor/colorize.js ./src/js-vendor/closebrackets.js ./src/js-vendor/match-highlighter.js ./src/js-vendor/css.js ./src/js-vendor/htmlmixed.js ./src/js-vendor/deep-diff.js ./src/js-vendor/babel-6.26.0.min.js ./src/js-vendor/babel-polyfill@6.26.0.js ./src/js-vendor/babel-plugin-transform-es2015-modules-commonjs@6.26.2.js -c -m -o ./dist/resources/editor.js",
          dev: 'yarn build && concurrently "webpack" "onchange ./src/css/*.css -- yarn produce-css" "onchange ./.tmp/*.js -- yarn produce-js" "cpx ./src/index.html ./dist/ -w" "cpx ./src/sandbox.html ./dist/ -w"',
          build:
            "yarn clean-demoit && yarn copy-static && yarn produce-css && yarn produce-editor-js && webpack --config ./webpack.config.prod.js && yarn produce-minified-js",
          zip: "node ./scripts/zipit.js",
          release: "yarn test && yarn build && yarn zip",
          test: "jest",
          "test-watch": "jest --watch --verbose false",
          lint: "./node_modules/.bin/eslint --ext .js src/js",
        },
        keywords: ["demo", "code", "live", "coding"],
        author: "Krasimir Tsonev",
        license: "MIT",
        bugs: { url: "https://github.com/krasimir/demoit/issues" },
        homepage: "https://github.com/krasimir/demoit#readme",
        devDependencies: {
          "@babel/core": "7.1.5",
          "@babel/plugin-transform-runtime": "7.1.0",
          "@babel/preset-env": "7.1.5",
          "@babel/runtime": "7.1.5",
          "babel-core": "^7.0.0-bridge.0",
          "babel-eslint": "8.0.3",
          "babel-jest": "23.6.0",
          "babel-loader": "8.0.4",
          "clean-css-cli": "4.2.1",
          concurrently: "4.0.1",
          cpx: "1.5.0",
          eslint: "4.12.1",
          jest: "23.6.0",
          onchange: "5.1.3",
          "regenerator-runtime": "0.13.1",
          shx: "^0.3.2",
          "uglify-js": "3.4.9",
          uglifycss: "0.0.29",
          webpack: "4.25.1",
          "webpack-cli": "3.1.2",
          "zip-folder": "1.0.0",
        },
        dependencies: {
          gitfred: "7.2.4",
          hashids: "1.2.2",
          jszip: "3.1.5",
          "layout-architect": "3.0.0",
        },
      };
    },
    function (t, e, n) {
      "use strict";
      var r, i;
      "undefined" != typeof self && self,
        void 0 ===
          (i =
            "function" ==
            typeof (r = function () {
              return function (t, e, n) {
                if (!t)
                  throw Error(
                    "Please provide a HTML element as first argument!"
                  );
                if (!e)
                  throw Error(
                    "Please provide a list of strings as a second argument!"
                  );
                var r,
                  i = function (t) {
                    return document.createElement(t);
                  },
                  o = function (t, e, n) {
                    return t.setAttribute(e, n);
                  },
                  a = (function () {
                    var t = e.slice();
                    if (!n) return t;
                    var r = (function t(e, n) {
                      return (
                        0 === n.elements.length
                          ? e.push(n.name)
                          : n.elements.forEach(function (n) {
                              return t(e, n);
                            }),
                        e
                      );
                    })([], n);
                    return t.filter(function (t) {
                      return -1 === r.indexOf(t);
                    });
                  })(),
                  s = i("DIV"),
                  c = [],
                  u = n || null;
                function l(t) {
                  return { name: t, elements: [] };
                }
                function f(t, e, n, r) {
                  return e
                    .map(function (t) {
                      var e = i("A");
                      return (
                        o(e, "data-op", t[0]),
                        o(e, "href", "javascript:void(0);"),
                        o(e, "class", t[2]),
                        (e.innerHTML = t[1]),
                        (e.item = n),
                        (e.parent = r),
                        e
                      );
                    })
                    .forEach(function (e) {
                      return t.appendChild(e);
                    });
                }
                function h() {
                  var t;
                  return (
                    p(
                      ((t = i("DIV")),
                      a.forEach(function (e) {
                        var n = i("A");
                        o(n, "href", "javascript:void(0);"),
                          o(n, "data-op", "select"),
                          (n.item = e),
                          (n.innerHTML =
                            '<svg width="10" height="10" viewBox="0 0 1792 1792"><path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"/></svg> ' +
                            e),
                          t.appendChild(n);
                      }),
                      o(t, "class", "la-selector"),
                      t)
                    ),
                    new Promise(function (t) {
                      r = function (e) {
                        var n = a.indexOf(e);
                        -1 < n && a.splice(n, 1), t(e);
                      };
                    })
                  );
                }
                function p(t) {
                  for (
                    t =
                      t ||
                      (function t(e, n) {
                        var r = i("DIV");
                        return (
                          o(r, "class", "la-block"),
                          0 === e.elements.length
                            ? ((r.innerHTML =
                                '<div class="la-name">' + e.name + "</div>"),
                              f(
                                r,
                                [
                                  [
                                    "remove",
                                    '<svg width="14" height="14" viewBox="0 0 1792 1792"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>',
                                    "la-remove",
                                  ],
                                ],
                                e,
                                n
                              ))
                            : ((r.innerHTML =
                                '<div class="la-children" style="grid-template-' +
                                ("vertical" === e.direction
                                  ? "rows"
                                  : "columns") +
                                ": repeat(" +
                                e.elements.length +
                                ', 1fr);"></div>'),
                              e.elements.forEach(function (n) {
                                return r
                                  .querySelector(".la-children")
                                  .appendChild(t(n, e));
                              })),
                          f(
                            r,
                            [
                              ["horizontal:left", "", "la-left"],
                              ["vertical:top", "", "la-top"],
                              ["vertical:bottom", "", "la-bottom"],
                              ["horizontal:right", "", "la-right"],
                            ],
                            e,
                            n
                          ),
                          r
                        );
                      })(u);
                    s.firstChild;

                  )
                    s.removeChild(s.firstChild);
                  s.appendChild(t);
                }
                function d() {
                  c.forEach(function (t) {
                    return t(u);
                  });
                }
                function _() {
                  h().then(function (t) {
                    (u = l(t)), p(), d();
                  });
                }
                return (
                  o(s, "class", "la"),
                  s.addEventListener("click", function (t) {
                    var e,
                      n,
                      i,
                      o = t.target.getAttribute("data-op"),
                      s = t.target.item,
                      c = t.target.parent;
                    if (o && s) {
                      if ("remove" === o)
                        (function (t, e) {
                          if (!t)
                            return (
                              (u = null),
                              -1 === a.indexOf(e.name) && a.push(e.name)
                            );
                          var n = t.elements.findIndex(function (t) {
                            return t === e;
                          });
                          -1 < n &&
                            (t.elements.splice(n, 1),
                            1 === t.elements.length &&
                              (0 < t.elements[0].elements.length
                                ? ((t.direction = t.elements[0].direction),
                                  (t.elements = t.elements[0].elements))
                                : ((t.name = t.elements[0].name),
                                  (t.elements = []),
                                  delete t.direction)),
                            a.push(e.name));
                        })(c, s),
                          u ? p() : _(),
                          d();
                      else if ("select" === o) r(s);
                      else {
                        if (0 === a.length) return;
                        (o = o.split(":")),
                          ((e = s),
                          (n = o[0]),
                          (i =
                            "right" === o[1] || "bottom" === o[1]
                              ? "after"
                              : "before"),
                          h()
                            .then(function (t) {
                              return l(t);
                            })
                            .then(function (t) {
                              if (0 === e.elements.length)
                                (e.direction = n),
                                  (e.elements =
                                    "after" === i
                                      ? [l(e.name), t]
                                      : [t, l(e.name)]),
                                  delete e.name;
                              else {
                                if (e.direction !== n) {
                                  var r = {
                                    direction: e.direction,
                                    elements: e.elements,
                                  };
                                  e.elements = "after" === i ? [r, t] : [t, r];
                                } else
                                  "after" === i
                                    ? e.elements.push(t)
                                    : (e.elements = [t].concat(e.elements));
                                e.direction = n;
                              }
                            })).then(function () {
                            p(), d();
                          });
                      }
                    }
                  }),
                  u ? p() : _(),
                  t.appendChild(s),
                  {
                    onChange: function (t) {
                      c.push(t);
                    },
                    change: function (t) {
                      (u = t), p();
                    },
                    get: function () {
                      return u;
                    },
                  }
                );
              };
            })
              ? r.apply(e, [])
              : r) || (t.exports = i);
    },
    function (t, e, n) {
      t.exports = n(16);
    },
    function (t, e, n) {
      var r =
          (function () {
            return this || ("object" == typeof self && self);
          })() || Function("return this")(),
        i =
          r.regeneratorRuntime &&
          0 <= Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime"),
        o = i && r.regeneratorRuntime;
      if (((r.regeneratorRuntime = void 0), (t.exports = n(11)), i))
        r.regeneratorRuntime = o;
      else
        try {
          delete r.regeneratorRuntime;
        } catch (a) {
          r.regeneratorRuntime = void 0;
        }
    },
    function (t, e) {
      !(function (e) {
        "use strict";
        var n,
          r = Object.prototype,
          i = r.hasOwnProperty,
          o = "function" == typeof Symbol ? Symbol : {},
          a = o.iterator || "@@iterator",
          s = o.asyncIterator || "@@asyncIterator",
          c = o.toStringTag || "@@toStringTag",
          u = "object" == typeof t,
          l = e.regeneratorRuntime;
        if (l) u && (t.exports = l);
        else {
          (l = e.regeneratorRuntime = u ? t.exports : {}).wrap = y;
          var f = "suspendedStart",
            h = "suspendedYield",
            p = "executing",
            d = "completed",
            _ = {},
            $ = {};
          $[a] = function () {
            return this;
          };
          var g = Object.getPrototypeOf,
            m = g && g(g(M([])));
          m && m !== r && i.call(m, a) && ($ = m);
          var v = (k.prototype = x.prototype = Object.create($));
          (w.prototype = v.constructor = k),
            (k.constructor = w),
            (k[c] = w.displayName = "GeneratorFunction"),
            (l.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === w || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (l.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, k)
                  : ((t.__proto__ = k), c in t || (t[c] = "GeneratorFunction")),
                (t.prototype = Object.create(v)),
                t
              );
            }),
            (l.awrap = function (t) {
              return { __await: t };
            }),
            C(q.prototype),
            (q.prototype[s] = function () {
              return this;
            }),
            (l.AsyncIterator = q),
            (l.async = function (t, e, n, r) {
              var i = new q(y(t, e, n, r));
              return l.isGeneratorFunction(e)
                ? i
                : i.next().then(function (t) {
                    return t.done ? t.value : i.next();
                  });
            }),
            C(v),
            (v[c] = "Generator"),
            (v[a] = function () {
              return this;
            }),
            (v.toString = function () {
              return "[object Generator]";
            }),
            (l.keys = function (t) {
              var e = [];
              for (var n in t) e.push(n);
              return (
                e.reverse(),
                function n() {
                  for (; e.length; ) {
                    var r = e.pop();
                    if (r in t) return (n.value = r), (n.done = !1), n;
                  }
                  return (n.done = !0), n;
                }
              );
            }),
            (l.values = M),
            (A.prototype = {
              constructor: A,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = n),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = n),
                  this.tryEntries.forEach(S),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      i.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = n);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var e = this;
                function r(r, i) {
                  return (
                    (s.type = "throw"),
                    (s.arg = t),
                    (e.next = r),
                    i && ((e.method = "next"), (e.arg = n)),
                    !!i
                  );
                }
                for (var o = this.tryEntries.length - 1; 0 <= o; --o) {
                  var a = this.tryEntries[o],
                    s = a.completion;
                  if ("root" === a.tryLoc) return r("end");
                  if (a.tryLoc <= this.prev) {
                    var c = i.call(a, "catchLoc"),
                      u = i.call(a, "finallyLoc");
                    if (c && u) {
                      if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                    } else if (c) {
                      if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                    } else {
                      if (!u)
                        throw Error("try statement without catch or finally");
                      if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
                  var r = this.tryEntries[n];
                  if (
                    r.tryLoc <= this.prev &&
                    i.call(r, "finallyLoc") &&
                    this.prev < r.finallyLoc
                  ) {
                    var o = r;
                    break;
                  }
                }
                o &&
                  ("break" === t || "continue" === t) &&
                  o.tryLoc <= e &&
                  e <= o.finallyLoc &&
                  (o = null);
                var a = o ? o.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  o
                    ? ((this.method = "next"), (this.next = o.finallyLoc), _)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  _
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), S(n), _;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var r = n.completion;
                    if ("throw" === r.type) {
                      var i = r.arg;
                      S(n);
                    }
                    return i;
                  }
                }
                throw Error("illegal catch attempt");
              },
              delegateYield: function (t, e, r) {
                return (
                  (this.delegate = {
                    iterator: M(t),
                    resultName: e,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = n),
                  _
                );
              },
            });
        }
        function y(t, e, n, r) {
          var i,
            o,
            a,
            s,
            c = Object.create(
              (e && e.prototype instanceof x ? e : x).prototype
            ),
            u = new A(r || []);
          return (
            (c._invoke =
              ((i = t),
              (o = n),
              (a = u),
              (s = f),
              function (t, e) {
                if (s === p) throw Error("Generator is already running");
                if (s === d) {
                  if ("throw" === t) throw e;
                  return T();
                }
                for (a.method = t, a.arg = e; ; ) {
                  var n = a.delegate;
                  if (n) {
                    var r = E(n, a);
                    if (r) {
                      if (r === _) continue;
                      return r;
                    }
                  }
                  if ("next" === a.method) a.sent = a._sent = a.arg;
                  else if ("throw" === a.method) {
                    if (s === f) throw ((s = d), a.arg);
                    a.dispatchException(a.arg);
                  } else "return" === a.method && a.abrupt("return", a.arg);
                  s = p;
                  var c = b(i, o, a);
                  if ("normal" === c.type) {
                    if (((s = a.done ? d : h), c.arg === _)) continue;
                    return { value: c.arg, done: a.done };
                  }
                  "throw" === c.type &&
                    ((s = d), (a.method = "throw"), (a.arg = c.arg));
                }
              })),
            c
          );
        }
        function b(t, e, n) {
          try {
            return { type: "normal", arg: t.call(e, n) };
          } catch (r) {
            return { type: "throw", arg: r };
          }
        }
        function x() {}
        function w() {}
        function k() {}
        function C(t) {
          ["next", "throw", "return"].forEach(function (e) {
            t[e] = function (t) {
              return this._invoke(e, t);
            };
          });
        }
        function q(t) {
          var e;
          this._invoke = function (n, r) {
            function o() {
              return new Promise(function (e, o) {
                !(function e(n, r, o, a) {
                  var s = b(t[n], t, r);
                  if ("throw" !== s.type) {
                    var c = s.arg,
                      u = c.value;
                    return u && "object" == typeof u && i.call(u, "__await")
                      ? Promise.resolve(u.__await).then(
                          function (t) {
                            e("next", t, o, a);
                          },
                          function (t) {
                            e("throw", t, o, a);
                          }
                        )
                      : Promise.resolve(u).then(
                          function (t) {
                            (c.value = t), o(c);
                          },
                          function (t) {
                            return e("throw", t, o, a);
                          }
                        );
                  }
                  a(s.arg);
                })(n, r, e, o);
              });
            }
            return (e = e ? e.then(o, o) : o());
          };
        }
        function E(t, e) {
          var r = t.iterator[e.method];
          if (r === n) {
            if (((e.delegate = null), "throw" === e.method)) {
              if (
                t.iterator.return &&
                ((e.method = "return"),
                (e.arg = n),
                E(t, e),
                "throw" === e.method)
              )
                return _;
              (e.method = "throw"),
                (e.arg = TypeError(
                  "The iterator does not provide a 'throw' method"
                ));
            }
            return _;
          }
          var i = b(r, t.iterator, e.arg);
          if ("throw" === i.type)
            return (
              (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), _
            );
          var o = i.arg;
          return o
            ? o.done
              ? ((e[t.resultName] = o.value),
                (e.next = t.nextLoc),
                "return" !== e.method && ((e.method = "next"), (e.arg = n)),
                (e.delegate = null),
                _)
              : o
            : ((e.method = "throw"),
              (e.arg = TypeError("iterator result is not an object")),
              (e.delegate = null),
              _);
        }
        function j(t) {
          var e = { tryLoc: t[0] };
          1 in t && (e.catchLoc = t[1]),
            2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
            this.tryEntries.push(e);
        }
        function S(t) {
          var e = t.completion || {};
          (e.type = "normal"), delete e.arg, (t.completion = e);
        }
        function A(t) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            t.forEach(j, this),
            this.reset(!0);
        }
        function M(t) {
          if (t) {
            var e = t[a];
            if (e) return e.call(t);
            if ("function" == typeof t.next) return t;
            if (!isNaN(t.length)) {
              var r = -1,
                o = function e() {
                  for (; ++r < t.length; )
                    if (i.call(t, r)) return (e.value = t[r]), (e.done = !1), e;
                  return (e.value = n), (e.done = !0), e;
                };
              return (o.next = o);
            }
          }
          return { next: T };
        }
        function T() {
          return { value: n, done: !0 };
        }
      })(
        (function () {
          return this || ("object" == typeof self && self);
        })() || Function("return this")()
      );
    },
    function (t, e) {
      t.exports = function (t) {
        if (Array.isArray(t)) return t;
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        var n = [],
          r = !0,
          i = !1,
          o = void 0;
        try {
          for (
            var a, s = t[Symbol.iterator]();
            !(r = (a = s.next()).done) &&
            (n.push(a.value), !e || n.length !== e);
            r = !0
          );
        } catch (c) {
          (i = !0), (o = c);
        } finally {
          try {
            r || null == s.return || s.return();
          } finally {
            if (i) throw o;
          }
        }
        return n;
      };
    },
    function (t, e) {
      t.exports = function () {
        throw TypeError("Invalid attempt to destructure non-iterable instance");
      };
    },
    function (t, e) {
      t.exports = function (t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      };
    },
    function (t, e, n) {
      "use strict";
      n.r(e);
      var r = n(0),
        i = n.n(r),
        o = n(1),
        a = n.n(o),
        s = n(7),
        c = [];
      function u(t) {
        var e =
            1 < arguments.length && void 0 !== arguments[1]
              ? arguments[1]
              : document,
          n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
          r = 3 < arguments.length && void 0 !== arguments[3] && arguments[3],
          i = [],
          o = "string" == typeof t ? e.querySelector(t) : t,
          a = !0;
        if (!o) {
          if (((a = !1), !n))
            throw Error(
              'Ops! There is no DOM element matching "'.concat(t, '" selector.')
            );
          o = document.createElement("div");
        }
        var s = function (t, e) {
            o.addEventListener(t, e);
            var n = function () {
              return o.removeEventListener(t, e);
            };
            return i.push(n), n;
          },
          l = {
            e: o,
            found: function () {
              return a;
            },
            content: function (t) {
              return t
                ? (i.forEach(function (t) {
                    return t();
                  }),
                  (o.innerHTML = t),
                  this.exports())
                : o.innerHTML;
            },
            text: function (t) {
              return t ? (o.innerText = t) : o.innerText;
            },
            appendChild: function (t) {
              return o.appendChild(t), this;
            },
            appendChildren: function (t) {
              return (
                t.forEach(function (t) {
                  return o.appendChild(t.e);
                }),
                this
              );
            },
            css: function (t, e) {
              return void 0 !== e ? ((o.style[t] = e), this) : o.style[t];
            },
            clearCSS: function () {
              return (o.style = {}), this;
            },
            prop: function (t, e) {
              return void 0 !== e ? ((o[t] = e), this) : o[t];
            },
            attr: function (t, e) {
              return void 0 !== e
                ? (o.setAttribute(t, e), this)
                : o.getAttribute(t);
            },
            onClick: function (t) {
              return s("click", t);
            },
            onKeyUp: function (t) {
              return s("keyup", t);
            },
            onKeyDown: function (t) {
              return s("keydown", t);
            },
            onMouseOver: function (t) {
              return s("mouseover", t);
            },
            onMouseOut: function (t) {
              return s("mouseout", t);
            },
            onMouseUp: function (t) {
              return s("mouseup", t);
            },
            onRightClick: function (t) {
              var e = function (e) {
                e.preventDefault(), t();
              };
              o.addEventListener("contextmenu", e);
              var n = function () {
                return o.removeEventListener("oncontextmenu", e);
              };
              return i.push(n), n;
            },
            onChange: function (t) {
              o.addEventListener("change", function () {
                return t(o.value);
              });
              var e = function () {
                return o.removeEventListener("change", t);
              };
              return i.push(e), e;
            },
            find: function (t) {
              return u(t, o);
            },
            appendTo: function (t) {
              t.e.appendChild(o);
            },
            exports: function () {
              return Array.prototype.slice
                .call(o.querySelectorAll("[data-export]"))
                .map(function (t) {
                  return u(t, o);
                });
            },
            namedExports: function () {
              return this.exports().reduce(function (t, e) {
                return (t[e.attr("data-export")] = e), t;
              }, {});
            },
            detach: function () {
              o.parentNode &&
                o.parentNode.contains(o) &&
                o.parentNode.removeChild(o);
            },
            empty: function () {
              for (; o.firstChild; ) o.removeChild(o.firstChild);
              return this;
            },
            destroy: function () {
              i.forEach(function (t) {
                return t();
              }),
                r || (this.empty(), this.detach());
            },
            scrollToBottom: function () {
              o.scrollTop = o.scrollHeight;
            },
            selectOnClick: function () {
              var t = this.onClick(function () {
                o.select(), t();
              });
            },
          };
        return c.push(l), l;
      }
      function l(t) {
        return window.location.href.match(t);
      }
      (u.fromString = function (t) {
        var e = document.createElement("div");
        e.innerHTML = t;
        var n = Array.prototype.slice.call(e.childNodes).filter(function (t) {
          return 1 === t.nodeType;
        });
        if (0 < n.length) return u(n[0]);
        throw Error("fromString accepts HTMl with a single parent.");
      }),
        (u.wrap = function (t) {
          return u(document.createElement("div")).appendChildren(t);
        }),
        (u.fromTemplate = function (t) {
          return u.fromString(document.querySelector(t).innerHTML);
        }),
        (u.withFallback = function (t) {
          return u(t, document, !0);
        }),
        (u.withRelaxedCleanup = function (t) {
          return u(t, document, !1, !0);
        }),
        (u.destroy = function () {
          c.forEach(function (t) {
            return t.destroy();
          }),
            (c = []);
        });
      var f =
          ((u.exists = function (t) {
            return !!document.querySelector(t);
          }),
          !1),
        h =
          l(/^https:\/\/poet.krasimir.now.sh/) || l(/^http:\/\/localhost:8004/),
        p = l(/^http:\/\/localhost:8004/),
        d = p
          ? "http://localhost:8004/api/demo"
          : "https://poet.krasimir.now.sh/api/demo",
        _ = p
          ? "http://localhost:8004/api/profile"
          : "https://poet.krasimir.now.sh/api/profile",
        $ = ["editor", "HTML", "console", "story"];
      h &&
        ($.push("story-preview"),
        $.push("story-read-only"),
        $.push("annotate"));
      var g = {
          elements: [
            { name: "editor", elements: [] },
            {
              elements: [
                { name: "HTML", elements: [] },
                { name: "console", elements: [] },
              ],
              direction: "horizontal",
            },
          ],
          direction: "vertical",
        },
        m = function (t) {
          var e,
            n = u.withRelaxedCleanup(".app .layout"),
            r = u.withRelaxedCleanup("body");
          (e = t.getEditorSettings().theme),
            u.withRelaxedCleanup(".app").attr("class", "app " + e);
          var i,
            o = (function t(e) {
              return "string" == typeof e
                ? ("output" === e && (e = "HTML"),
                  "log" === e && (e = "console"),
                  { name: e, elements: [] })
                : (0 < e.elements.length &&
                    e.elements.forEach(function (n, r) {
                      return (e.elements[r] = t(n));
                    }),
                  e);
            })(t.getEditorSettings().layout || g),
            a = u.fromTemplate("#template-html"),
            s = u.fromTemplate("#template-console"),
            c = u.fromTemplate("#template-editor"),
            l = u.fromTemplate("#template-story"),
            f = u.fromTemplate("#template-story-preview"),
            h = u.fromTemplate("#template-story-read-only"),
            p = u.fromTemplate("#template-annotate"),
            d = u.withFallback(".does-not-exists"),
            _ = {
              HTML: a,
              console: s,
              editor: c,
              story: l,
              "story-preview": f,
              "story-read-only": h,
              annotate: p,
            },
            $ = [],
            m = [];
          n.empty().appendChildren(
            (function e(n) {
              var r = n.direction,
                a = n.elements,
                s = n.sizes,
                c = a.map(function (t) {
                  if (0 < t.elements.length) {
                    var n = u.wrap(e(t));
                    return n.attr("class", "editor-section"), n;
                  }
                  return $.push(t.name), _[t.name] ? _[t.name] : d;
                });
              return (
                s &&
                  s.length !== a.length &&
                  (s = a.map(function () {
                    return 100 / a.length;
                  })),
                m.push(function () {
                  var e;
                  return {
                    b: n,
                    split: Split(
                      c.map(function (t) {
                        return t.e;
                      }),
                      {
                        sizes:
                          s ||
                          (e = c).map(function () {
                            return 100 / e.length;
                          }),
                        gutterSize: 2,
                        direction: r,
                        onDragEnd: function () {
                          i.forEach(function (t) {
                            var e = t.b,
                              n = t.split;
                            e.sizes = n.getSizes();
                          }),
                            t.updateThemeAndLayout(o);
                        },
                      }
                    ),
                  };
                }),
                "horizontal" === r &&
                  c.map(function (t) {
                    return t.css("float", "left");
                  }),
                c
              );
            })({ elements: [o] })
          ),
            -1 === $.indexOf("HTML") &&
              (a.css("position", "absolute"),
              a.css("width", "10px"),
              a.css("height", "10px"),
              a.css("overflow", "hidden"),
              a.css("top", "-100px"),
              a.css("left", "-100px"),
              a.css("visibility", "hidden"),
              a.css("display", "none"),
              a.appendTo(r)),
            setTimeout(function () {
              return (i = m.map(function (t) {
                return t();
              }));
            }, 1);
        },
        v = n(2),
        y = n.n(v),
        b = {
          presets: [
            "react",
            ["es2015", { modules: !1 }],
            "es2016",
            "es2017",
            "stage-0",
            "stage-1",
            "stage-2",
            "stage-3",
          ],
          plugins: ["transform-es2015-modules-commonjs"],
        };
      function x(t) {
        return Babel.transform(t, b).code;
      }
      var w = function (t, e) {
          var n = (t || "").split(/\./).pop().toLowerCase();
          return (
            "css" === n || "scss" === n
              ? (e = 'window.executeCSS("'
                  .concat(t, '", ')
                  .concat(JSON.stringify(e), ");"))
              : "html" === n
              ? (e = 'window.executeHTML("'
                  .concat(t, '", ')
                  .concat(JSON.stringify(e), ");"))
              : "md" === n &&
                (e = "window.executeMarkdown(".concat(JSON.stringify(e), ");")),
            { filename: t, content: e }
          );
        },
        k = function (t) {
          var e = t.filename,
            n = t.content;
          return '\n  {\n    filename: "'
            .concat(e, '",\n    func: function (require, exports) {\n      ')
            .concat(x(n), "\n    },\n    exports: {}\n  }\n");
        };
      function C(t, e) {
        var n = [],
          r = 0;
        try {
          var i = e.findIndex(function (e) {
            return y()(e, 1)[0] === t;
          });
          return (
            e.forEach(function (t) {
              var e = y()(t, 2),
                o = e[0],
                a = e[1];
              n.push(k(w(o, a.c))), !0 === a.en && (i = r), (r += 1);
            }),
            {
              code: x(
                "\n      const imported = [];\n      const modules = [".concat(
                  n.join(","),
                  "];\n      const require = function(file) {\n        const module = modules.find(({ filename }) => filename === file);\n\n        if (!module) {\n          throw new Error('Can not find \"' + file + '\" file.');\n        }\n        imported.push(file);\n        module.func(require, module.exports);\n        return module.exports;\n      };\n\n      modules[index].func(require, modules[index].exports);\n    "
                )
              ),
              entryPoint: i,
            }
          );
        } catch (o) {
          return console.error(o), null;
        }
      }
      function q() {
        var t,
          e,
          n,
          r,
          i,
          o = u.withFallback(".console"),
          a = !0,
          s = function (t) {
            var e,
              n = document.createElement("div"),
              r = String(t);
            try {
              e = String(JSON.parse(r));
            } catch (i) {
              e = r;
            }
            (n.innerHTML =
              "<p>" +
              ("string" != typeof e
                ? e
                : e.replace(/[&<>"']/g, function (t) {
                    return (
                      "&" +
                      {
                        "&": "amp",
                        "<": "lt",
                        ">": "gt",
                        '"': "quot",
                        "'": "#39",
                      }[t] +
                      ";"
                    );
                  })
              ).replace(/\\n/, "<br />") +
              "</p>"),
              a && (o.empty(), (a = !1)),
              o.appendChild(n),
              o.scrollToBottom();
          };
        return (
          o.css("opacity", 1),
          (t = console.error),
          (e = console.log),
          (n = console.warn),
          (r = console.info),
          (i = console.clear),
          (console.error = function (e) {
            s(e.stack), t.apply(console, arguments);
          }),
          (console.log = function () {
            for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
              n[r] = arguments[r];
            n.forEach(s), e.apply(console, n);
          }),
          (console.warn = function () {
            for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
              e[r] = arguments[r];
            e.forEach(s), n.apply(console, e);
          }),
          (console.info = function () {
            for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
              e[n] = arguments[n];
            e.forEach(s), r.apply(console, e);
          }),
          (console.clear = function () {
            o.content("");
            for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
              e[n] = arguments[n];
            i.apply(console, e);
          }),
          {
            clearConsole: function () {
              var t =
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : "";
              (a = !0), o.empty().content(t);
            },
            addToConsole: s,
          }
        );
      }
      var E = 0,
        j = {},
        S = function (t, e, n) {
          return (
            window.addEventListener("message", function (t) {
              t.data.marker
                ? (f && console.log("<-- " + t.data.marker),
                  j[t.data.marker] &&
                    (j[t.data.marker].done(), delete j[t.data.marker]))
                : t.data.log
                ? e(t.data.log)
                : t.data.op && (f && console.log("<-- " + t.data.op), n());
            }),
            function (e, n) {
              var r =
                  2 < arguments.length && void 0 !== arguments[2]
                    ? arguments[2]
                    : null,
                i = ++E;
              return (
                f && console.log("Demoit -> op=" + e + " markerId=" + i),
                new Promise(function (o) {
                  (j[r || i] = { done: o, op: e, value: n }),
                    t.e.contentWindow &&
                      t.e.contentWindow.postMessage(
                        { op: e, value: n, marker: i },
                        "*"
                      );
                })
              );
            }
          );
        };
      function A(t, e, n) {
        return M.apply(this, arguments);
      }
      function M() {
        return (M = a()(
          i.a.mark(function t(e, n, r) {
            var o, s, c;
            return i.a.wrap(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (c = S(
                          (s = (o = u.withFallback(".output")).find(
                            "#sandbox"
                          )),
                          n,
                          r
                        )),
                        t.abrupt("return", {
                          setOutputHTML: (function () {
                            var t = a()(
                              i.a.mark(function t() {
                                var e,
                                  n = arguments;
                                return i.a.wrap(
                                  function (t) {
                                    for (;;)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          return (
                                            (e =
                                              0 < n.length && void 0 !== n[0]
                                                ? n[0]
                                                : '<div class="centered">&lt;div id="output" /&gt;</div>'),
                                            t.abrupt("return", c("html", e))
                                          );
                                        case 2:
                                        case "end":
                                          return t.stop();
                                      }
                                  },
                                  t,
                                  this
                                );
                              })
                            );
                            return function () {
                              return t.apply(this, arguments);
                            };
                          })(),
                          resetOutput: (function () {
                            var t = a()(
                              i.a.mark(function t() {
                                return i.a.wrap(
                                  function (t) {
                                    for (;;)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          return (
                                            (t.next = 2),
                                            c("reload", null, "loaded")
                                          );
                                        case 2:
                                          return t.abrupt("return", t.sent);
                                        case 3:
                                        case "end":
                                          return t.stop();
                                      }
                                  },
                                  t,
                                  this
                                );
                              })
                            );
                            return function () {
                              return t.apply(this, arguments);
                            };
                          })(),
                          loadDependenciesInOutput: (function () {
                            var t = a()(
                              i.a.mark(function t() {
                                return i.a.wrap(
                                  function (t) {
                                    for (;;)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          return t.abrupt(
                                            "return",
                                            c(
                                              "dependencies",
                                              e.getDependencies()
                                            )
                                          );
                                        case 1:
                                        case "end":
                                          return t.stop();
                                      }
                                  },
                                  t,
                                  this
                                );
                              })
                            );
                            return function () {
                              return t.apply(this, arguments);
                            };
                          })(),
                          executeInOut: (function () {
                            var t = a()(
                              i.a.mark(function t(e) {
                                return i.a.wrap(
                                  function (t) {
                                    for (;;)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          return t.abrupt(
                                            "return",
                                            c("code", e)
                                          );
                                        case 1:
                                        case "end":
                                          return t.stop();
                                      }
                                  },
                                  t,
                                  this
                                );
                              })
                            );
                            return function (e) {
                              return t.apply(this, arguments);
                            };
                          })(),
                        })
                      );
                    case 4:
                    case "end":
                      return t.stop();
                  }
              },
              t,
              this
            );
          })
        )).apply(this, arguments);
      }
      var T,
        O = {},
        L = function (t, e) {
          if (O[t]) return e();
          O[t] = !1;
          var n = document.createElement("script");
          return (
            (n.src = t),
            n.addEventListener("load", function () {
              (O[t] = !0), e();
            }),
            document.body.appendChild(n),
            !0
          );
        },
        z = function (t, e) {
          if (O[t]) return e();
          O[t] = !1;
          var n = document.createElement("link");
          return (
            n.setAttribute("rel", "stylesheet"),
            n.setAttribute("type", "text/css"),
            n.setAttribute("href", t),
            n.addEventListener("load", function () {
              (O[t] = !0), e();
            }),
            document.body.appendChild(n),
            !0
          );
        },
        I =
          ((T = a()(
            i.a.mark(function t(e) {
              var n,
                r = arguments;
              return i.a.wrap(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          (n =
                            1 < r.length && void 0 !== r[1]
                              ? r[1]
                              : function () {}),
                          t.abrupt(
                            "return",
                            new Promise(function (t) {
                              !(function r(i) {
                                if (i !== e.length) {
                                  n(
                                    Math.ceil((i / e.length) * 100),
                                    e[i].split(/\//).pop()
                                  );
                                  var o = e[i],
                                    a = o.split(".").pop().toLowerCase();
                                  "js" === a
                                    ? L(o, function () {
                                        return r(i + 1);
                                      })
                                    : "css" === a
                                    ? z(o, function () {
                                        return r(i + 1);
                                      })
                                    : r(i + 1);
                                } else t();
                              })(0);
                            })
                          )
                        );
                      case 2:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                this
              );
            })
          )),
          function (t) {
            return T.apply(this, arguments);
          });
      function D(t) {
        return B.apply(this, arguments);
      }
      function B() {
        return (B = a()(
          i.a.mark(function t(e) {
            var n;
            return i.a.wrap(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (n = ["./resources/editor.js"]), (t.next = 3), I(n, e)
                      );
                    case 3:
                    case "end":
                      return t.stop();
                  }
              },
              t,
              this
            );
          })
        )).apply(this, arguments);
      }
      var F,
        N = function (t) {
          var e = t.commands,
            n = t.Pos;
          (e.selectNextOccurrence = function (e) {
            var r = e.getCursor("from"),
              i = e.getCursor("to"),
              o = e.state.sublimeFindFullWord == e.doc.sel;
            if (0 == t.cmpPos(r, i)) {
              var a = wordAt(e, r);
              if (!a.word) return;
              e.setSelection(a.from, a.to), (o = !0);
            } else {
              var s = e.getRange(r, i),
                c = o ? RegExp("\\b" + s + "\\b") : s,
                u = e.getSearchCursor(c, i),
                l = u.findNext();
              if (
                (l ||
                  (l = (u = e.getSearchCursor(
                    c,
                    n(e.firstLine(), 0)
                  )).findNext()),
                !l ||
                  (function (t, e, n) {
                    for (var r = 0; r < t.length; r++)
                      if (t[r].from() == e && t[r].to() == n) return !0;
                    return !1;
                  })(e.listSelections(), u.from(), u.to()))
              )
                return t.Pass;
              e.addSelection(u.from(), u.to());
            }
            o && (e.state.sublimeFindFullWord = e.doc.sel);
          }),
            (e.toggleCommentIndented = function (t) {
              t.toggleComment({ indent: !0 });
            });
        },
        P = function (t, e) {
          var n = e,
            r = [];
          return (
            location.search
              .substr(1)
              .split("&")
              .forEach(function (e) {
                (r = e.split("="))[0] === t && (n = decodeURIComponent(r[1]));
              }),
            n
          );
        },
        R =
          ((F = a()(
            i.a.mark(function t(e) {
              var n;
              return i.a.wrap(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (t.next = 2), fetch(e);
                      case 2:
                        return (n = t.sent), (t.next = 5), n.json();
                      case 5:
                        return t.abrupt("return", t.sent);
                      case 6:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                this
              );
            })
          )),
          function (t) {
            return F.apply(this, arguments);
          }),
        H = function (t) {
          var e = window.location.href.split("#")[1];
          history.pushState(
            null,
            null,
            "/e/".concat(t).concat(e ? "#" + e : "")
          );
        },
        U = function (t) {
          var e = t.split(".");
          if (1 === e.length) return e[0] + ".1";
          if (2 === e.length) return "".concat(e[0], ".1.").concat(e[1]);
          var n = e.pop(),
            r = e.pop();
          return isNaN(parseInt(r, 10))
            ? "".concat(e.join("."), ".").concat(r, ".1.").concat(n)
            : ""
                .concat(e.join("."), ".")
                .concat(parseInt(r, 10) + 1, ".")
                .concat(n);
        };
      function G(t) {
        var e = "";
        t = t.toString();
        for (var n = 0; n < t.length; n++)
          e += String.fromCharCode(3 ^ t.charCodeAt(n));
        return e;
      }
      var V = function (t) {
          return JSON.parse(JSON.stringify(t));
        },
        K = function () {
          try {
            return window.self !== window.top;
          } catch (t) {
            return !0;
          }
        },
        W = function () {
          var t,
            e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : new Date(),
            n = e.getDate();
          return (
            n +
            " " +
            [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ][e.getMonth()] +
            " " +
            e.getFullYear().toString().substr(-2) +
            " " +
            e.getHours() +
            ":" +
            e.getMinutes()
          );
        },
        Y = "e_ON_SELECT",
        J = "e_ON_FILE_CHANGE",
        X = "e_ON_FILE_SAVE";
      function Q(t, e) {
        return Z.apply(this, arguments);
      }
      function Z() {
        return (Z = a()(
          i.a.mark(function t(e, n) {
            var r, o, s, c, l, f, h, p, d, _, $, g, m;
            return i.a.wrap(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (m = function () {
                          return (m = a()(
                            i.a.mark(function t() {
                              return i.a.wrap(
                                function (t) {
                                  for (;;)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        o(),
                                          $.setValue(e.getActiveFileContent()),
                                          K() || $.focus(),
                                          (t.t0 = e
                                            .getActiveFile()
                                            .split(".")
                                            .pop()
                                            .toLowerCase()),
                                          (t.next =
                                            "css" === t.t0
                                              ? 6
                                              : "scss" === t.t0
                                              ? 8
                                              : "html" === t.t0
                                              ? 10
                                              : "md" === t.t0
                                              ? 12
                                              : 14);
                                        break;
                                      case 6:
                                      case 8:
                                        return (
                                          $.setOption("mode", "css"),
                                          t.abrupt("break", 16)
                                        );
                                      case 10:
                                        return (
                                          $.setOption("mode", "htmlmixed"),
                                          t.abrupt("break", 16)
                                        );
                                      case 12:
                                        return (
                                          $.setOption("mode", {
                                            name: "gfm",
                                            highlightFormatting: !0,
                                            emoji: !0,
                                            xml: !0,
                                          }),
                                          t.abrupt("break", 16)
                                        );
                                      case 14:
                                        return (
                                          $.setOption("mode", "jsx"),
                                          t.abrupt("break", 16)
                                        );
                                      case 16:
                                        p();
                                      case 17:
                                      case "end":
                                        return t.stop();
                                    }
                                },
                                t,
                                this
                              );
                            })
                          )).apply(this, arguments);
                        }),
                        (g = function () {
                          return m.apply(this, arguments);
                        }),
                        (o = (r = q()).clearConsole),
                        (s = r.addToConsole),
                        (t.next = 5),
                        A(e, s, o)
                      );
                    case 5:
                      return (
                        (l = (c = t.sent).resetOutput),
                        (f = c.loadDependenciesInOutput),
                        (h = c.executeInOut),
                        (p = (function () {
                          var t = a()(
                            i.a.mark(function t() {
                              return i.a.wrap(
                                function (t) {
                                  for (;;)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        return (t.next = 2), l();
                                      case 2:
                                        return (t.next = 4), f();
                                      case 4:
                                        return (
                                          o(),
                                          (t.next = 7),
                                          h(C(e.getActiveFile(), e.getFiles()))
                                        );
                                      case 7:
                                      case "end":
                                        return t.stop();
                                    }
                                },
                                t,
                                this
                              );
                            })
                          );
                          return function () {
                            return t.apply(this, arguments);
                          };
                        })()),
                        (d = (function () {
                          var t = a()(
                            i.a.mark(function t(r) {
                              return i.a.wrap(
                                function (t) {
                                  for (;;)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        o(),
                                          e.editFile(e.getActiveFile(), {
                                            c: r,
                                          }),
                                          n(X, r, $),
                                          p();
                                      case 4:
                                      case "end":
                                        return t.stop();
                                    }
                                },
                                t,
                                this
                              );
                            })
                          );
                          return function (e) {
                            return t.apply(this, arguments);
                          };
                        })()),
                        (_ = u.withFallback(".js-code-editor")),
                        o(
                          '<div class="centered"><div class="spinner"></div></div>'
                        ),
                        (t.next = 15),
                        D()
                      );
                    case 15:
                      return (
                        ($ = tt(
                          _.empty(),
                          e.getEditorSettings(),
                          e.getActiveFileContent(),
                          d,
                          function () {
                            n(J);
                          },
                          function (t) {
                            e.setActiveFileByIndex(t), g();
                          },
                          function (t, e) {
                            n(Y, { code: t, list: e }, $);
                          }
                        )),
                        t.abrupt("return", {
                          loadFileInEditor: g,
                          save: function () {
                            d($.getValue()), $.focus();
                          },
                        })
                      );
                    case 17:
                    case "end":
                      return t.stop();
                  }
              },
              t,
              this
            );
          })
        )).apply(this, arguments);
      }
      function tt(t, e, n, r, i, o, a) {
        N(CodeMirror);
        var s = CodeMirror(t.e, {
            value: n || "",
            mode: "jsx",
            tabSize: 2,
            lineNumbers: !1,
            autofocus: !1,
            foldGutter: !1,
            gutters: [],
            styleSelectedText: !0,
            matchBrackets: !0,
            autoCloseBrackets: !0,
            lineWrapping: !0,
            theme: e.theme,
            highlightSelectionMatches: {
              showToken: /\w/,
              annotateScrollbar: !0,
            },
          }),
          c = function () {
            return r(s.getValue());
          };
        return (
          s.on("change", function (t, e) {
            "setValue" !== e.origin && i(s.getValue());
          }),
          s.setOption("extraKeys", {
            "Ctrl-S": c,
            "Cmd-S": c,
            "Cmd-1": function () {
              return o(0);
            },
            "Cmd-2": function () {
              return o(1);
            },
            "Cmd-3": function () {
              return o(2);
            },
            "Cmd-4": function () {
              return o(3);
            },
            "Cmd-5": function () {
              return o(4);
            },
            "Cmd-6": function () {
              return o(5);
            },
            "Cmd-7": function () {
              return o(6);
            },
            "Cmd-8": function () {
              return o(7);
            },
            "Cmd-9": function () {
              return o(8);
            },
            "Ctrl-1": function () {
              return o(0);
            },
            "Ctrl-2": function () {
              return o(1);
            },
            "Ctrl-3": function () {
              return o(2);
            },
            "Ctrl-4": function () {
              return o(3);
            },
            "Ctrl-5": function () {
              return o(4);
            },
            "Ctrl-6": function () {
              return o(5);
            },
            "Ctrl-7": function () {
              return o(6);
            },
            "Ctrl-8": function () {
              return o(7);
            },
            "Ctrl-9": function () {
              return o(8);
            },
            "Cmd-D": "selectNextOccurrence",
            "Ctrl-D": "selectNextOccurrence",
            "Cmd-/": "toggleCommentIndented",
            "Ctrl-/": "toggleCommentIndented",
          }),
          CodeMirror.normalizeKeyMap(),
          t.onMouseUp(function () {
            var t = s.getSelection(),
              e = s.listSelections();
            "" !== t && a(t, e);
          }),
          s
        );
      }
      var te,
        tn,
        tr = n(5),
        ti = n.n(tr),
        to = !1,
        ta = [],
        ts = function () {
          if (0 < ta.length) {
            var t,
              e = ta.shift(),
              n = e.state;
            tc(n, e.token, e.diff);
          }
        },
        tc =
          ((tn = a()(
            i.a.mark(function t(e, n, r) {
              var o, a;
              return i.a.wrap(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if (to)
                          return (
                            ta.push({ state: e, token: n, diff: r }),
                            t.abrupt("return")
                          );
                        t.next = 3;
                        break;
                      case 3:
                        return (
                          (t.prev = 3),
                          (to = !0),
                          (t.next = 7),
                          fetch(d, {
                            method: "POST",
                            body: JSON.stringify({ state: e, a: r }),
                            headers: { token: n },
                          })
                        );
                      case 7:
                        return (o = t.sent), (t.next = 10), o.json();
                      case 10:
                        if (((a = t.sent), (to = !1), ts(), !a.error)) {
                          t.next = 17;
                          break;
                        }
                        console.error(a.error), (t.next = 19);
                        break;
                      case 17:
                        if (a.demoId) return t.abrupt("return", a.demoId);
                        t.next = 19;
                        break;
                      case 19:
                        console.log(a), (t.next = 26);
                        break;
                      case 22:
                        (t.prev = 22),
                          (t.t0 = t.catch(3)),
                          ts(),
                          console.error(t.t0);
                      case 26:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                this,
                [[3, 22]]
              );
            })
          )),
          function (t, e, n) {
            return tn.apply(this, arguments);
          }),
        tu = {
          saveDemo: tc,
          getDemos:
            ((te = a()(
              i.a.mark(function t(e, n) {
                var r, o;
                return i.a.wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.prev = 0),
                            (t.next = 3),
                            fetch(_ + "/" + e, { headers: { token: n } })
                          );
                        case 3:
                          return (r = t.sent), (t.next = 6), r.json();
                        case 6:
                          if (!(o = t.sent).error) {
                            t.next = 11;
                            break;
                          }
                          console.error(o.error), (t.next = 16);
                          break;
                        case 11:
                          if (o) return t.abrupt("return", o);
                          t.next = 15;
                          break;
                        case 15:
                          console.log(o);
                        case 16:
                          t.next = 21;
                          break;
                        case 18:
                          (t.prev = 18),
                            (t.t0 = t.catch(0)),
                            console.error(t.t0);
                        case 21:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this,
                  [[0, 18]]
                );
              })
            )),
            function (t, e) {
              return te.apply(this, arguments);
            }),
        },
        tl = (function () {
          try {
            return (
              localStorage.setItem("test", "test"),
              localStorage.removeItem("test"),
              !0
            );
          } catch (t) {
            return !1;
          }
        })(),
        tf = function (t, e) {
          if (!tl) return null;
          void 0 !== e && localStorage.setItem(t, JSON.stringify(e));
          var n = localStorage.getItem(t);
          try {
            if (n) return JSON.parse(n);
          } catch (r) {
            console.error(
              "There is some data in the local storage under the ".concat(
                t,
                " key. However, it is not a valid JSON."
              )
            );
          }
          return null;
        },
        th = ti()(),
        tp = {
          editor: { theme: "dark", statusBar: !0, layout: g },
          dependencies: [],
          files: {
            working: [["code.js", { c: "//Write your code here" }]],
            head: null,
            i: 0,
            stage: [],
            commits: {},
          },
        },
        td = function () {
          return 0 === th.getAll().length ? "untitled.js" : th.getAll()[0][0];
        },
        t_ = function () {
          var t = location.hash.replace(/^#/, "");
          return "" !== t && th.get(t) ? t : td();
        };
      function t$() {
        return (t$ = a()(
          i.a.mark(function t(e) {
            var n, r, o, a, s, c, u, l, p;
            return i.a.wrap(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (
                        ((n = []),
                        (r = function (t) {
                          f && console.log("state:onChange event=" + t),
                            n.forEach(function (e) {
                              return e(t);
                            });
                        }),
                        (o = tf("DEMOIT_PROFILE")),
                        (a = window.state))
                      ) {
                        t.next = 19;
                        break;
                      }
                      if ((c = P("state")))
                        return (t.prev = 7), (t.next = 10), R(c);
                      t.next = 18;
                      break;
                    case 10:
                      (a = t.sent), (t.next = 16);
                      break;
                    case 13:
                      (t.prev = 13),
                        (t.t0 = t.catch(7)),
                        console.error("Error reading ".concat(c));
                    case 16:
                      t.next = 19;
                      break;
                    case 18:
                      a = tp;
                    case 19:
                      return (
                        (a.v = e),
                        (s = V(a)),
                        th.import(a.files),
                        th.listen(function (t) {
                          t === th.ON_COMMIT
                            ? (f && console.log("state:git:commit event=" + t),
                              l("git.listen"),
                              f && console.log("state:git:checkout event=" + t))
                            : t === th.ON_CHECKOUT &&
                              (p.setActiveFileByIndex(0), l("git.listen")),
                            r(t);
                        }),
                        (u = t_()),
                        (l = function (t) {
                          var e =
                              1 < arguments.length &&
                              void 0 !== arguments[1] &&
                              arguments[1],
                            n =
                              2 < arguments.length && void 0 !== arguments[2]
                                ? arguments[2]
                                : function () {};
                          if (
                            (f && console.log("state:persist reason=" + t),
                            p.isForkable())
                          ) {
                            if (!e && !p.isDemoOwner()) return;
                            var r,
                              i = DeepDiff.diff(s, a);
                            if (((s = V(a)), e))
                              (i = ""), delete a.owner, (r = a);
                            else {
                              if (void 0 === i || !i) return;
                              (i = G(JSON.stringify(i))),
                                (r = { demoId: a.demoId, owner: a.owner });
                            }
                            tu.saveDemo(r, o.token, i).then(function (t) {
                              t &&
                                t !== a.demoId &&
                                ((a.demoId = t), (a.owner = o.id), H(t)),
                                n();
                            });
                          }
                        }),
                        (p = {
                          getDemoId: function () {
                            return a.demoId;
                          },
                          getActiveFile: function () {
                            return u;
                          },
                          getActiveFileContent: function () {
                            return th.get(u).c;
                          },
                          setActiveFile: function (t) {
                            return (
                              (u = t),
                              (location.hash = t),
                              r("setActiveFile"),
                              t
                            );
                          },
                          setActiveFileByIndex: function (t) {
                            var e = th.getAll()[t][0];
                            e && (this.setActiveFile(e), r("FILE_CHANGED"));
                          },
                          isCurrentFile: function (t) {
                            return u === t;
                          },
                          isDemoOwner: function () {
                            return a.owner && o && a.owner === o.id;
                          },
                          getFiles: function () {
                            return th.getAll();
                          },
                          getNumOfFiles: function () {
                            return th.getAll().length;
                          },
                          meta: function (t) {
                            if (t) {
                              var e = t.name,
                                n = t.description,
                                i = t.published,
                                o = t.storyWithCode,
                                s = t.comments;
                              return (
                                (a.name = e),
                                (a.desc = n),
                                (a.published = !!i),
                                (a.storyWithCode = !!o),
                                (a.comments = !!s),
                                r("meta"),
                                l("meta"),
                                null
                              );
                            }
                            var c = {
                              name: a.name,
                              description: a.desc,
                              published: !!a.published,
                              storyWithCode: !!a.storyWithCode,
                              comments: !!a.comments,
                            };
                            return a.demoId && (c.id = a.demoId), c;
                          },
                          getDependencies: function () {
                            return a.dependencies;
                          },
                          setDependencies: function (t) {
                            (a.dependencies = t), l("setDependencies");
                          },
                          getEditorSettings: function () {
                            return a.editor;
                          },
                          editFile: function (t, e) {
                            th.save(t, e), l("editFile");
                          },
                          renameFile: function (t, e) {
                            u === t && this.setActiveFile(e),
                              th.rename(t, e),
                              l("renameFile");
                          },
                          addNewFile: function () {
                            var t =
                              0 < arguments.length && void 0 !== arguments[0]
                                ? arguments[0]
                                : "untitled.js";
                            (t = th.get(t) ? U(t) : t),
                              th.save(t, { c: "" }),
                              this.setActiveFile(t),
                              l("addNewFile");
                          },
                          deleteFile: function (t) {
                            th.del(t),
                              t === u && this.setActiveFile(td()),
                              l("deleteFile");
                          },
                          listen: function (t) {
                            n.push(t);
                          },
                          removeListeners: function () {
                            n = [];
                          },
                          updateThemeAndLayout: function (t, e) {
                            t && (a.editor.layout = t),
                              e && (a.editor.theme = e),
                              l("updateThemeAndLayout");
                          },
                          updateStatusBarVisibility: function (t) {
                            a.editor.statusBar !== t &&
                              ((a.editor.statusBar = t),
                              l("updateStatusBarVisibility"));
                          },
                          setEntryPoint: function (t) {
                            var e = !th.get(t).en;
                            th.saveAll({ en: !1 }), th.save(t, { en: e }), l();
                          },
                          dump: function () {
                            return a;
                          },
                          isForkable: function () {
                            return h && p.loggedIn();
                          },
                          fork: function () {
                            l("fork", !0, function () {
                              return r("fork");
                            });
                          },
                          loggedIn: function () {
                            return null !== o;
                          },
                          getProfile: function () {
                            return o;
                          },
                          getDemos: function () {
                            return tu.getDemos(o.id, o.token);
                          },
                          version: function () {
                            return a.v;
                          },
                          git: function () {
                            return th;
                          },
                          export: function () {
                            return a;
                          },
                          getStoryURL: function () {
                            var t = this.meta(),
                              e = "story";
                            return (
                              t &&
                                t.name &&
                                (e = t.name
                                  .toLowerCase()
                                  .replace(/ /g, "-")
                                  .replace(/[^\w-]+/g, "")),
                              "/s/".concat(this.getDemoId(), "/").concat(e)
                            );
                          },
                        }),
                        (window.__state = p),
                        t.abrupt("return", p)
                      );
                    case 28:
                    case "end":
                      return t.stop();
                  }
              },
              t,
              this,
              [[7, 13]]
            );
          })
        )).apply(this, arguments);
      }
      var tg = n(3),
        tm = n.n(tg),
        tv = function () {
          var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 20;
          return '<svg width="'
            .concat(t, '" height="')
            .concat(
              t,
              '" viewBox="0 0 1792 1792"><path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"/></svg>'
            );
        },
        t0 = function () {
          var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 20;
          return '<svg width="'
            .concat(t, '" height="')
            .concat(
              t,
              '" viewBox="0 0 1792 1792"><path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"/></svg>'
            );
        },
        ty = function () {
          var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 24;
          return '<svg width="'
            .concat(t, '" height="')
            .concat(
              t,
              '" viewBox="0 0 1792 1792"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>'
            );
        },
        t6 = function () {
          var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 24;
          return '<svg width="'
            .concat(t, '" height="')
            .concat(
              t,
              '" viewBox="0 0 1792 1792"><path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"/></svg>'
            );
        },
        tb = function () {
          var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 24;
          return '<svg width="'
            .concat(t, '" height="')
            .concat(
              t,
              '" viewBox="0 0 1792 1792"><path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"/></svg>'
            );
        },
        tx = function () {
          var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 24;
          return '<svg width="'
            .concat(t, '" height="')
            .concat(
              t,
              '" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>'
            );
        },
        t4 = function () {
          var t =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : 16,
            e =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : 14;
          return '<svg width="'
            .concat(t, '" height="')
            .concat(
              e,
              '" viewBox="0 0 2048 1792"><path d="M704 896q-159 0-271.5-112.5t-112.5-271.5 112.5-271.5 271.5-112.5 271.5 112.5 112.5 271.5-112.5 271.5-271.5 112.5zm1077 320l249 249q9 9 9 23 0 13-9 22l-136 136q-9 9-22 9-14 0-23-9l-249-249-249 249q-9 9-23 9-13 0-22-9l-136-136q-9-9-9-22 0-14 9-23l249-249-249-249q-9-9-9-23 0-13 9-22l136-136q9-9 22-9 14 0 23 9l249 249 249-249q9-9 23-9 13 0 22 9l136 136q9 9 9 22 0 14-9 23zm-498 0l-181 181q-37 37-37 91 0 53 37 90l83 83q-21 3-44 3h-874q-121 0-194-69t-73-190q0-53 3.5-103.5t14-109 26.5-108.5 43-97.5 62-81 85.5-53.5 111.5-20q19 0 39 17 154 122 319 122t319-122q20-17 39-17 28 0 57 6-28 27-41 50t-13 56q0 54 37 91z"/></svg>'
            );
        },
        t1 = function () {
          var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 14;
          return '<svg width="'
            .concat(t, '" height="')
            .concat(
              t,
              '" viewBox="0 0 1792 1792"><path d="M672 1472q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm0-1152q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm640 128q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm96 0q0 52-26 96.5t-70 69.5q-2 287-226 414-67 38-203 81-128 40-169.5 71t-41.5 100v26q44 25 70 69.5t26 96.5q0 80-56 136t-136 56-136-56-56-136q0-52 26-96.5t70-69.5v-820q-44-25-70-69.5t-26-96.5q0-80 56-136t136-56 136 56 56 136q0 52-26 96.5t-70 69.5v497q54-26 154-57 55-17 87.5-29.5t70.5-31 59-39.5 40.5-51 28-69.5 8.5-91.5q-44-25-70-69.5t-26-96.5q0-80 56-136t136-56 136 56 56 136z"/></svg>'
            );
        },
        t2 = function () {
          var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 14;
          return '<svg width="'
            .concat(t, '" height="')
            .concat(
              t,
              '" viewBox="0 0 1792 1792" ><path d="M1472 989v259q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h255q13 0 22.5 9.5t9.5 22.5q0 27-26 32-77 26-133 60-10 4-16 4h-112q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-214q0-19 18-29 28-13 54-37 16-16 35-8 21 9 21 29zm237-496l-384 384q-18 19-45 19-12 0-25-5-39-17-39-59v-192h-160q-323 0-438 131-119 137-74 473 3 23-20 34-8 2-12 2-16 0-26-13-10-14-21-31t-39.5-68.5-49.5-99.5-38.5-114-17.5-122q0-49 3.5-91t14-90 28-88 47-81.5 68.5-74 94.5-61.5 124.5-48.5 159.5-30.5 196.5-11h160v-192q0-42 39-59 13-5 25-5 26 0 45 19l384 384q19 19 19 45t-19 45z"/></svg>'
            );
        },
        t7 = function () {
          var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 14;
          return '<svg width="'
            .concat(t, '" height="')
            .concat(
              t,
              '" viewBox="0 0 1792 1792"><path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"/></svg>'
            );
        },
        t3 = function () {
          var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 14;
          return '<svg width="'
            .concat(t, '" height="')
            .concat(
              t,
              '" viewBox="0 0 1792 1792" ><path d="M1703 478q40 57 18 129l-275 906q-19 64-76.5 107.5t-122.5 43.5h-923q-77 0-148.5-53.5t-99.5-131.5q-24-67-2-127 0-4 3-27t4-37q1-8-3-21.5t-3-19.5q2-11 8-21t16.5-23.5 16.5-23.5q23-38 45-91.5t30-91.5q3-10 .5-30t-.5-28q3-11 17-28t17-23q21-36 42-92t25-90q1-9-2.5-32t.5-28q4-13 22-30.5t22-22.5q19-26 42.5-84.5t27.5-96.5q1-8-3-25.5t-2-26.5q2-8 9-18t18-23 17-21q8-12 16.5-30.5t15-35 16-36 19.5-32 26.5-23.5 36-11.5 47.5 5.5l-1 3q38-9 51-9h761q74 0 114 56t18 130l-274 906q-36 119-71.5 153.5t-128.5 34.5h-869q-27 0-38 15-11 16-1 43 24 70 144 70h923q29 0 56-15.5t35-41.5l300-987q7-22 5-57 38 15 59 43zm-1064 2q-4 13 2 22.5t20 9.5h608q13 0 25.5-9.5t16.5-22.5l21-64q4-13-2-22.5t-20-9.5h-608q-13 0-25.5 9.5t-16.5 22.5zm-83 256q-4 13 2 22.5t20 9.5h608q13 0 25.5-9.5t16.5-22.5l21-64q4-13-2-22.5t-20-9.5h-608q-13 0-25.5 9.5t-16.5 22.5z"/></svg>'
            );
        },
        tw = function (t) {
          var e = t.title,
            n = t.content;
          return "<section>\n  <h2>"
            .concat(
              e,
              '</h2>\n  <button class="close" data-export="close"><svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg></button>\n  '
            )
            .concat(n, "\n</section>");
        },
        tk = function (t, e) {
          var n = t.buttons,
            r = t.content;
          return '<section class="multiple-pages">\n  <ul class="sub-nav">\n    '
            .concat(
              n
                .map(function (t, n) {
                  return '<li class="'
                    .concat(
                      n === e ? "active" : "",
                      '"><a href="javascript:void(0);" data-export="page:'
                    )
                    .concat(n, '">')
                    .concat(t, "</a></li>");
                })
                .join(""),
              '\n  </ul>\n  <button class="close" data-export="close">'
            )
            .concat(ty(24), '</button>\n  <div class="content">')
            .concat(r[e], "</div>\n</section>");
        };
      function t8(t) {
        var e = u.fromString('<div class="popup"></div>'),
          n = u.withRelaxedCleanup("body"),
          r = u.withRelaxedCleanup(".layout"),
          i = n.onKeyUp(function (t) {
            return 27 === t.keyCode && o();
          }),
          o = function () {
            i(),
              e.css("opacity", 0),
              t.cleanUp && t.cleanUp(),
              setTimeout(function () {
                return e.destroy();
              }, 200),
              r.css("filter", "none");
          };
        r.css("filter", "blur(2px)"),
          e.appendTo(n),
          (function n(r) {
            e.content(r).forEach(function (e) {
              var r = e.attr("data-export");
              "close" === r
                ? e.onClick(o)
                : r.match(/^page/) &&
                  e.onClick(function () {
                    return n(tk(t, Number(r.split(":").pop())));
                  });
            }),
              t.onRender &&
                t.onRender(tm()({ closePopup: o }, e.namedExports()));
          })("buttons" in t ? tk(t, t.defaultTab) : tw(t)),
          setTimeout(function () {
            return e.css("opacity", 1);
          }, 1);
      }
      function t5(t, e, n, r, i) {
        t8({
          title: "Edit",
          content:
            '\n      <input name="filename" data-export="filenameInput" value="'
              .concat(
                t,
                '"/>\n      <button class="save secondary" data-export="saveButton">'
              )
              .concat(
                t0(),
                '<span>Update</span></button>\n      <button class="save secondary" data-export="setAsEntryPointButton">'
              )
              .concat(
                tx(20),
                '<span>Entry point</span></button>\n      <button class="delete secondary right" data-export="deleteButton">'
              )
              .concat(tv(), "<span>Delete</span></button>\n    "),
          onRender: function (o) {
            var a = o.filenameInput,
              s = o.saveButton,
              c = o.closePopup,
              u = o.deleteButton,
              l = o.setAsEntryPointButton,
              f = function () {
                "" !== a.e.value && r(a.e.value), c();
              };
            a.e.focus(),
              a.e.setSelectionRange(0, t.lastIndexOf(".")),
              a.onKeyUp(function (t) {
                13 === t.keyCode && f();
              }),
              s.onClick(f),
              1 < e ? u.css("display", "block") : u.css("display", "none"),
              u.onClick(function () {
                return n(), c();
              }),
              l.onClick(function () {
                return i(), c();
              });
          },
        });
      }
      var tC = n(8),
        tq = n.n(tC);
      function tE(t) {
        return tj.apply(this, arguments);
      }
      function tj() {
        return (tj = a()(
          i.a.mark(function t(e) {
            var n,
              r = arguments;
            return i.a.wrap(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (n = 1 < r.length && void 0 !== r[1] && r[1]),
                        (t.next = 3),
                        fetch(e)
                      );
                    case 3:
                      return (
                        (t.t0 = n ? "blob" : "text"),
                        (t.next = 6),
                        t.sent[t.t0]()
                      );
                    case 6:
                      return (
                        (t.t1 = t.sent),
                        (t.t2 = e),
                        t.abrupt("return", { content: t.t1, url: t.t2 })
                      );
                    case 9:
                    case "end":
                      return t.stop();
                  }
              },
              t,
              this
            );
          })
        )).apply(this, arguments);
      }
      function tS(t) {
        return tA.apply(this, arguments);
      }
      function tA() {
        return (tA = a()(
          i.a.mark(function t(e) {
            return i.a.wrap(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (t.next = 2),
                        Promise.all(
                          e
                            .filter(function (t) {
                              return t.match(/^(http|https)/);
                            })
                            .map(tE)
                        )
                      );
                    case 2:
                      return t.abrupt("return", t.sent);
                    case 3:
                    case "end":
                      return t.stop();
                  }
              },
              t,
              this
            );
          })
        )).apply(this, arguments);
      }
      function tM(t, e, n) {
        return function (r) {
          var o, s, c, u, l, f, p, d, _, m;
          return (
            (d = t),
            (_ = a()(
              i.a.mark(function t(e) {
                var n, r;
                return i.a.wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            e
                              .prop("disabled", "disabled")
                              .prop(
                                "innerHTML",
                                "Please wait. Preparing the zip file."
                              ),
                            (t.prev = 1),
                            (t.next = 4),
                            tS(d.getDependencies())
                          );
                        case 4:
                          return (
                            (n = t.sent),
                            (t.next = 7),
                            I([
                              "./resources/jszip.min.js",
                              "./resources/FileSaver.min.js",
                            ])
                          );
                        case 7:
                          return (
                            (t.t0 = JSZip),
                            (t.next = 10),
                            tE("/poet.krasimir.now.sh.zip", !0)
                          );
                        case 10:
                          return (
                            (t.t1 = t.sent.content),
                            (t.next = 13),
                            t.t0.loadAsync.call(t.t0, t.t1)
                          );
                        case 13:
                          (r = t.sent),
                            e
                              .prop("disabled", !1)
                              .prop(
                                "innerHTML",
                                "Download poet.krasimir.now.sh.zip"
                              ),
                            e.onClick(
                              a()(
                                i.a.mark(function t() {
                                  var e, o;
                                  return i.a.wrap(
                                    function (t) {
                                      for (;;)
                                        switch ((t.prev = t.next)) {
                                          case 0:
                                            return (
                                              (t.next = 2),
                                              r
                                                .file("index.html")
                                                .async("string")
                                            );
                                          case 2:
                                            return (
                                              (e = t.sent),
                                              ((o = V(d.dump())).dependencies =
                                                n.map(function (t) {
                                                  var e = t.content,
                                                    n =
                                                      "./resources/" +
                                                      t.url.split("/").pop();
                                                  return r.file(n, e), n;
                                                })),
                                              r.file(
                                                "index.html",
                                                e.replace(
                                                  "var state = null;",
                                                  "var state = ".concat(
                                                    JSON.stringify(o, null, 2),
                                                    ";"
                                                  )
                                                )
                                              ),
                                              (t.t0 = saveAs),
                                              (t.next = 9),
                                              r.generateAsync({ type: "blob" })
                                            );
                                          case 9:
                                            (t.t1 = t.sent),
                                              (0, t.t0)(
                                                t.t1,
                                                "poet.krasimir.now.sh.zip"
                                              );
                                          case 11:
                                          case "end":
                                            return t.stop();
                                        }
                                    },
                                    t,
                                    this
                                  );
                                })
                              )
                            ),
                            (t.next = 22);
                          break;
                        case 18:
                          (t.prev = 18),
                            (t.t2 = t.catch(1)),
                            console.error(t.t2),
                            e.prop(
                              "innerHTML",
                              "There is an error creating the zip file."
                            );
                        case 22:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this,
                  [[1, 18]]
                );
              })
            )),
            (o = function (t) {
              return _.apply(this, arguments);
            }),
            (s = t.getEditorSettings()),
            (c = (m = t.getDependencies())
              .filter(function (t) {
                return "" !== t && "\n" !== t;
              })
              .join("\n")),
            (u = r),
            (l = t.version()),
            (f = s.layout),
            (p = s.theme),
            new Promise(function (r) {
              var i;
              return t8({
                defaultTab: u || 0,
                buttons: ["General", "About"],
                content: [
                  '\n        <p>\n          Theme:\n          <select data-export="themePicker">\n            <option value="light">light</option>\n            <option value="dark">dark</option>\n          </select>\n        </p>\n        <p class="mt1">Layout:</p>\n        <div class="mb1" data-export="layoutArchitectContainer"></div>\n        <button class="save" data-export="saveGeneral">Save</button>\n      ',

                  "\n        <p>\n          v".concat(
                    l,
                    '<br />\n          On the web: <a href="https://poet.krasimir.now.sh" target="_blank">poet.krasimir.now.sh</a><br />\n          GitHub repo: <a href="https://github.com/krasimir/poet.krasimir.now.sh.feedback/issues" target="_blank">github.com/krasimir/poet.krasimir.now.sh.feedback</a>\n        </p>\n      '
                  ),
                ],
                cleanUp: function () {
                  r();
                },
                onRender: function (r) {
                  var i = r.closePopup,
                    a = r.saveGeneral,
                    s = r.dependenciesTextarea,
                    u = r.saveDependenciesButton,
                    l = r.themePicker,
                    h = r.iframeTextarea,
                    d = r.layoutArchitectContainer,
                    _ = r.downloadButton;
                  if (d && l) {
                    var m = tq()(d.e, $, f);
                    (l.e.value = p || "light"),
                      a.onClick(function () {
                        var n, r;
                        (n = l.e.value),
                          (r = m.get() || g),
                          t.updateThemeAndLayout(r, n),
                          e(),
                          i();
                      });
                  }
                  h && h.selectOnClick(),
                    _ && o(_),
                    s &&
                      u &&
                      (s.prop("value", c),
                      u.onClick(function () {
                        var e;
                        (e = s.prop("value").split(/\r?\n/)) &&
                          (t.setDependencies(e), n()),
                          i();
                      }));
                },
              });
            })
          );
        };
      }
      var tT = "36px",
        tO = function (t, e) {
          var n =
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : "",
            r =
              3 < arguments.length && void 0 !== arguments[3]
                ? arguments[3]
                : "javascript:void(0)";
          return '<a data-export="'
            .concat(t, '" class="')
            .concat(n, '" href="')
            .concat(r, '">')
            .concat(e, "</a>");
        };
      function tL(t, e, n, r, i, o, a) {
        var s = u.withRelaxedCleanup(".status-bar"),
          c = u.withRelaxedCleanup(".app .layout"),
          l = u.withRelaxedCleanup(".status-bar-menu"),
          f = !!t.getEditorSettings().statusBar,
          p = !1,
          d = !1,
          _ = function () {
            l.css("display", (p = !p) ? "block" : "none");
          },
          $ = function () {
            var u,
              p = [],
              $ = [],
              g = t.getFiles();
            p.push('<div data-export="buttons">'),
              g.forEach(function (e) {
                var n = y()(e, 2),
                  r = n[0],
                  i = n[1],
                  o = t.isCurrentFile(r);
                p.push(
                  tO(
                    "file:" + r,
                    "<span>".concat(r).concat(o && d ? "*" : "", "</span>"),
                    "file"
                      .concat(o ? " active" : "")
                      .concat(i.en ? " entry" : "")
                  )
                );
              }),
              p.push(tO("newFileButton", t6(14), "new-file")),
              p.push(
                '\n      <div class="meta-and-status">\n        '
                  .concat(t.meta().published ? "&#10004; " : "", "\n        ")
                  .concat(
                    t.meta().name ? t.meta().name : "unnamed",
                    "\n        "
                  )
                  .concat(
                    t.loggedIn() && !t.isDemoOwner()
                      ? '<span class="badge warning">not yours</span>'
                      : "",
                    "\n        "
                  )
                  .concat(
                    h
                      ? '<a href="'.concat(
                          t.getStoryURL(),
                          '" class="badge" target="blank">view Story</a>'
                        )
                      : "",
                    "\n      </div>\n    "
                  )
              ),
              p.push(tO("menuButton", t7(14))),
              p.push(tO("closeButton", ty(14))),
              p.push("</div>"),
              h &&
                $.push(
                  tO(
                    "profileButton",
                    t.loggedIn()
                      ? ((u = t.getProfile()),
                        '<img src="'.concat(u.avatar, '"/>') + " Profile")
                      : t4() + " Log in",
                    "profile",
                    t.loggedIn()
                      ? "/u/" + t.getProfile().id
                      : "/login?did=".concat(t.getDemoId())
                  )
                ),
              h && $.push(tO("", t6(14) + " New story", "", "/new")),
              t.isForkable() && $.push(tO("forkButton", t1(14) + " Fork")),
              h && $.push(tO("shareButton", t2(14) + " Share/Embed")),
              t.isDemoOwner() && $.push(tO("nameButton", tb(14) + " Story")),
              $.push(tO("settingsButton", tb(14) + " Editor")),
              t.isForkable() &&
                $.push(
                  tO(
                    "",
                    t4() + " Log out",
                    "",
                    "/logout?r=e/".concat(t.getDemoId())
                  )
                ),
              s.content(p.join("")).forEach(function (n) {
                if (0 === n.attr("data-export").indexOf("file")) {
                  var i = n.attr("data-export").split(":").pop();
                  n.onClick(function () {
                    t.isCurrentFile(i) ? d && o() : e(i);
                  }),
                    n.onRightClick(function () {
                      return r(i);
                    });
                }
              }),
              l.content($.join(""));
            var m = s.namedExports(),
              v = m.newFileButton,
              b = m.closeButton,
              x = m.menuButton,
              w = l.namedExports(),
              k = w.forkButton,
              C = w.shareButton,
              q = w.nameButton,
              E = w.settingsButton,
              j = function () {
                var e,
                  n = s.namedExports().buttons;
                n.css("display", f ? "grid" : "none"),
                  n.css(
                    "gridTemplateColumns",
                    [
                      Array((e = t.getNumOfFiles() + 1)).join(
                        "minmax(auto, 135px) "
                      ),
                      "30px",
                      "1fr",
                      "30px",
                      "30px",
                    ]
                      .filter(function (t) {
                        return t;
                      })
                      .join(" ")
                  ),
                  s.css("height", f ? tT : "6px"),
                  c.css("height", "calc(100% - ".concat(f ? tT : "6px", ")")),
                  t.updateStatusBarVisibility(f);
              };
            v && v.onClick(n),
              C &&
                C.onClick(function () {
                  return i(2), _();
                }),
              E &&
                E.onClick(function () {
                  return i(), _();
                }),
              t.isDemoOwner() &&
                q &&
                q.onClick(function () {
                  return a(), _();
                }),
              k &&
                k.onClick(function () {
                  return t.fork(), _();
                }),
              x && x.onClick(_),
              b.onClick(function (t) {
                t.stopPropagation(), (f = !1), j();
              }),
              s.onClick(function () {
                f || ((f = !0), j());
              }),
              j();
          };
        return (
          $(),
          t.listen($),
          function (t) {
            (d = t), $();
          }
        );
      }
      var tz = n(4),
        tI = n.n(tz);
      function tD(t, e, n) {
        t8({
          title: t,
          content: '\n      <p class="mb3">'
            .concat(
              e,
              '</p>\n      <button class="save secondary" data-export="yesButton">'
            )
            .concat(
              t0(),
              '<span>Yes</span></button>\n      <button class="save secondary right" data-export="noButton">'
            )
            .concat(ty(), "<span>No</span></button>\n    "),
          onRender: function (t) {
            var e = t.yesButton,
              r = t.noButton,
              i = t.closePopup,
              o = function (t) {
                n(t), i();
              };
            e.onClick(function () {
              return o(!0);
            }),
              r.onClick(function () {
                return o(!1);
              });
          },
        });
      }
      function tB(t) {
        var e;
        return (function (t, e) {
          ((e = e || {}).listUnicodeChar =
            !!e.hasOwnProperty("listUnicodeChar") && e.listUnicodeChar),
            (e.stripListLeaders =
              !e.hasOwnProperty("stripListLeaders") || e.stripListLeaders),
            (e.gfm = !e.hasOwnProperty("gfm") || e.gfm),
            (e.useImgAltText =
              !e.hasOwnProperty("useImgAltText") || e.useImgAltText);
          var n = t || "";
          n = n.replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gm, "");
          try {
            e.stripListLeaders &&
              (n = e.listUnicodeChar
                ? n.replace(
                    /^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm,
                    e.listUnicodeChar + " $1"
                  )
                : n.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, "$1")),
              e.gfm &&
                (n = n
                  .replace(/\n={2,}/g, "\n")
                  .replace(/~{3}.*\n/g, "")
                  .replace(/~~/g, "")
                  .replace(/`{3}.*\n/g, "")),
              (n = n
                .replace(/<[^>]*>/g, "")
                .replace(/^[=\-]{2,}\s*$/g, "")
                .replace(/\[\^.+?\](\: .*?$)?/g, "")
                .replace(/\s{0,2}\[.*?\]: .*?$/g, "")
                .replace(
                  /\!\[(.*?)\][\[\(].*?[\]\)]/g,
                  e.useImgAltText ? "$1" : ""
                )
                .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, "$1")
                .replace(/^\s{0,3}>\s?/g, "")
                .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, "")
                .replace(
                  /^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,} {0,}(\n)?\s{0,}$/gm,
                  "$1$2$3"
                )
                .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, "$2")
                .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, "$2")
                .replace(/(`{3,})(.*?)\1/gm, "$2")
                .replace(/`(.+?)`/g, "$1")
                .replace(/\n{2,}/g, "\n\n"));
          } catch (r) {
            return console.error(r), t;
          }
          return n;
        })(
          (e = t.split("\n").shift()).length > 36 ? e.substr(0, 36) + "..." : e
        );
      }
      function tF(t) {
        var e = "",
          n = "";
        switch (t[0]) {
          case "E":
            (e = "edit"), (n = t[2].html);
            break;
          case "N":
            e = "new";
            break;
          case "D":
            e = "deleted";
            break;
          case "R":
            (e = "renamed"), (n = t[2]);
        }
        return '\n    <div class="diff">\n      <div><span class="label label-'
          .concat(t[0], '">')
          .concat(e, '</span></div>\n      <div class="diffA">')
          .concat(t[1], '</div>\n      <div class="diffB">')
          .concat(n, "</div>\n    </div>\n  ");
      }
      var tN = n(6);
      function tP(t, e) {
        setTimeout(function () {
          Object(tN.empty)(),
            f &&
              console.log(
                JSON.stringify(
                  t.map(function (t) {
                    return { hash: t.hash, position: t.position };
                  }),
                  null,
                  2
                )
              );
          var n = (function t(e, n) {
              var r = n.parent,
                i = n.hash,
                o = n.derivatives,
                a =
                  2 < arguments.length && void 0 !== arguments[2]
                    ? arguments[2]
                    : { commitsYs: {}, connections: [] };
              return (
                (a.commitsYs[i] = tR(i) - e),
                null !== r && a.connections.push([r, i]),
                0 < o.length &&
                  o.forEach(function (n) {
                    return t(e, n, a);
                  }),
                a
              );
            })(tR(t[0].hash), e),
            r = n.connections,
            i = n.commitsYs;
          r.forEach(function (t) {
            var e = y()(t, 2),
              n = e[0],
              r = e[1];
            return Object(tN.connectCommits)(4, 25 + i[n], 25 + i[r]);
          });
        }, 30);
      }
      function tR(t) {
        return u.exists("#c" + t)
          ? u("#c" + t).e.getBoundingClientRect().top + 0.3
          : 0;
      }
      function tH(t, e) {
        var n,
          r = u.withFallback(".story"),
          i = t.git(),
          o = null,
          a = !1,
          s = function (t) {
            return i.amend(n, { message: t });
          },
          c = function (t) {
            (a = !1), (o = null), "" === t && i.amend(n, { message: W() }), l();
          };
        if (!r.found()) return function () {};
        var l = function l() {
          f && console.log("story:render");
          var h,
            p,
            d,
            _,
            $,
            g,
            m = i.log(),
            v = Object.keys(m)
              .map(function (t) {
                return {
                  hash: t,
                  message: m[t].message,
                  position:
                    (m[t].meta && parseInt(m[t].meta.position, 10)) || null,
                };
              })
              .sort(function (t, e) {
                return null !== t.position && null !== e.position
                  ? t.position - e.position
                  : null !== t.position && null === e.position
                  ? -1
                  : null === t.position && null !== e.position
                  ? 1
                  : t.hash - e.hash;
              }),
            y = v.length,
            b = tI()(0 < y ? i.show().files : [], i.getAll()),
            x =
              ((h = i),
              (d = a),
              (_ = n),
              0 === (p = v).length
                ? ""
                : p
                    .map(function (t) {
                      var e,
                        n = t.hash,
                        r = t.message,
                        i = t.position,
                        o = _ === n && d,
                        a =
                          i && 0 < i
                            ? '<span class="current-position">'.concat(
                                i,
                                "</span>"
                              )
                            : "",
                        s = tB(r),
                        c = h.head() === n,
                        u = "";
                      return (
                        (u += '<div class="commit '
                          .concat(c ? "commit-head" : "", '" id="c')
                          .concat(n, '">')),
                        (u += o
                          ? ""
                          : '\n      <a href="javascript:void(0);" data-export="checkoutLink" data-hash="'
                              .concat(n, '" class="checkout">\n        ')
                              .concat(a, '<span class="commit-message-text">')
                              .concat(s || "...", "</span>\n      </a>\n    ")),
                        (u += o
                          ? '\n        <a href="javascript:void(0);" data-export="confirmButton">'
                              .concat(t0(12), " save</a>\n        ")
                              .concat(
                                h.head() !== n
                                  ? '<a href="javascript:void(0);" data-export="checkoutLink" data-hash="'
                                      .concat(n, '">')
                                      .concat(tx(12), " checkout</a>")
                                  : "",
                                '\n        <a href="javascript:void(0);" data-export="deleteCommit" data-hash="'
                              )
                              .concat(n, '" data-commit-message="')
                              .concat(s, '">')
                              .concat(
                                tv(12),
                                ' delete</a>\n        <a href="javascript:void(0);" data-export="editMessage" data-hash="'
                              )
                              .concat(n, '" class="edit right">\n          ')
                              .concat(
                                ty(12),
                                '\n        </a>\n        <hr />\n        <select data-export="publishStatus" data-hash="'
                              )
                              .concat(n, '">\n          ')
                              .concat(
                                (function (t, e) {
                                  var n = h.log(),
                                    r = n[e].meta,
                                    i = r ? parseInt(r.position, 10) : 0,
                                    o = [];
                                  o.push(
                                    '<option value="0"'.concat(
                                      0 === i ? 'selected="selected"' : "",
                                      ">not in story</option>"
                                    )
                                  );
                                  for (
                                    var a = 1;
                                    a < Object.keys(n).length + 1;
                                    a++
                                  )
                                    o.push(
                                      '<option value="'
                                        .concat(a, '" ')
                                        .concat(
                                          i === a ? 'selected="selected"' : "",
                                          ">position #"
                                        )
                                        .concat(a, "</option>")
                                    );
                                  return o.join("");
                                })(0, n),
                                '\n        </select>\n        <select data-export="injector">\n          <option value="">inject</option>\n          <option value="{inject:all}">All files</option>\n          '
                              )
                              .concat(
                                ((e = n),
                                h.show(e).files.map(function (t) {
                                  return '<option value="{inject:'
                                    .concat(t[0], '}">')
                                    .concat(t[0], "</option>");
                                })),
                                "\n        </select>\n      "
                              )
                          : '\n        <a href="javascript:void(0);" data-export="editMessage" data-hash="'
                              .concat(n, '" class="edit ')
                              .concat(o ? "" : "right", '">\n          ')
                              .concat(
                                t3(12) + " edit",
                                "\n        </a>\n      "
                              )),
                        (u += "</div>"),
                        o &&
                          (u += '\n        <div class="commit commit-edit '
                            .concat(c ? "commit-head" : "", '" id="c')
                            .concat(
                              n,
                              '">\n          <div data-export="messageArea" class="message-area" spellcheck="true"></div>\n        </div>\n      '
                            )),
                        u
                      );
                    })
                    .join(""));
          r.attr(
            "class",
            y <= 1 || a
              ? "editor-section story no-graph"
              : "editor-section story"
          ),
            r
              .content(
                "\n      "
                  .concat(
                    "" !== x ? '<div data-export="list">' + x + "</div>" : "",
                    "\n      "
                  )
                  .concat(
                    a
                      ? ""
                      : (($ = i),
                        0 === (g = b).length
                          ? '\n      <div class="working-directory">\n        <div class="clear commit-buttons-nav">\n          <a href="javascript:void(0)" data-export="addButton" class="commit-button left">\n            &#10004; New commit\n          </a>\n        </div>\n      </div>\n    '
                          : '\n    <div class="working-directory">\n      <div class="diffs">\n        '
                              .concat(
                                g.map(tF).join(""),
                                '\n      </div>\n      <div class="clear commit-buttons-nav">\n        '
                              )
                              .concat(
                                null !== $.head()
                                  ? '<a href="javascript:void(0)" data-export="editButton" class="commit-button left">\n          &#10004; Save\n        </a>'
                                  : "",
                                '\n        <a href="javascript:void(0)" data-export="addButton" class="commit-button left">\n          &#10004; New commit\n        </a>\n        '
                              )
                              .concat(
                                0 < $.getAll().length && null !== $.head()
                                  ? '<a href="javascript:void(0)" data-export="discardButton" class="commit-button right">\n            &#10006; Discard changes\n          </a>'
                                  : "",
                                "\n      </div>\n    </div>\n  "
                              )),
                    '\n      <div class="story-arrows"><svg id="svg-canvas" width="32px" height="100%"></svg></div>\n    '
                  )
              )
              .forEach(function (t) {
                "checkoutLink" === t.attr("data-export") &&
                  t.onClick(function () {
                    var n = t.attr("data-hash");
                    0 < b.length
                      ? tD(
                          "Checkout",
                          "You are about to checkout another commit. You have an unstaged changes. Are you sure?",
                          function (t) {
                            t && m[n] && (i.checkout(n, !0), e(), l());
                          }
                        )
                      : m[n] && (i.checkout(n), e(), l());
                  }),
                  "editMessage" === t.attr("data-export") &&
                    t.onClick(function () {
                      var e = t.attr("data-hash");
                      a && n === e
                        ? ((a = !1), c())
                        : ((a = !0), (n = t.attr("data-hash")), l());
                    }),
                  "deleteCommit" === t.attr("data-export") &&
                    t.onClick(function () {
                      tD(
                        "Deleting a commit",
                        'Deleting "'.concat(
                          t.attr("data-commit-message"),
                          '" commit. Are you sure?'
                        ),
                        function (n) {
                          n && ((a = !1), i.adios(t.attr("data-hash")), e());
                        }
                      );
                    }),
                  "publishStatus" === t.attr("data-export") &&
                    t.onChange(function (e) {
                      var n = t.attr("data-hash");
                      i.amend(n, {
                        message: i.show(n).message,
                        meta: { position: e },
                      }),
                        l();
                    });
              });
          var w,
            k,
            C,
            q,
            E,
            j,
            S = r.namedExports(),
            A = S.editButton,
            M = S.addButton,
            T = S.discardButton,
            O = S.messageArea,
            L = S.confirmButton,
            z = S.injector;
          A &&
            A.onClick(function () {
              i.amend(), l();
            }),
            M &&
              M.onClick(function () {
                (a = !0), i.add(), (n = i.commit("")), l();
              }),
            T &&
              T.onClick(function () {
                tD(
                  "Discard changes",
                  "You are about to discard your current changes. Are you sure?",
                  function (t) {
                    t && (i.discard(), e());
                  }
                );
              }),
            O &&
              ((o =
                ((w = O),
                (k = t.getEditorSettings()),
                (C = i.show(n).message),
                (q = c),
                N(CodeMirror),
                (E = CodeMirror(
                  w.e,
                  tm()(
                    {
                      value: C || "",
                      mode: "gfm",
                      tabSize: 2,
                      lineNumbers: !1,
                      autofocus: !0,
                      foldGutter: !1,
                      gutters: [],
                      styleSelectedText: !0,
                      lineWrapping: !0,
                      highlightFormatting: !0,
                    },
                    k
                  )
                )),
                (j = function () {
                  var t;
                  return (
                    (t = E.getValue()),
                    L.css("opacity", "0.3"),
                    s(t),
                    void u
                      .withFallback(
                        '[data-hash="'.concat(n, '"] > .commit-message-text')
                      )
                      .text(tB(t))
                  );
                }),
                E.on("change", function () {
                  return (
                    E.getValue(),
                    L.css("opacity", "1"),
                    void (1 < y && tP(v, i.logAsTree()))
                  );
                }),
                E.setOption("extraKeys", {
                  "Ctrl-S": j,
                  "Cmd-S": j,
                  Esc: function () {
                    return q(E.getValue());
                  },
                  "Ctrl-Enter": function () {
                    return j(), q(E.getValue());
                  },
                  "Cmd-Enter": function () {
                    return j(), q(E.getValue());
                  },
                }),
                CodeMirror.normalizeKeyMap(),
                setTimeout(function () {
                  E.focus(), console.log(E.defaultTextHeight());
                }, 50),
                E)),
              L.css("opacity", "0.3"),
              L.onClick(function () {
                s(o.getValue()), (a = !1), (o = null), l();
              }),
              z.onChange(function (t) {
                setTimeout(function () {
                  o.focus(),
                    o.refresh(),
                    o.replaceSelection(t),
                    (z.e.value = "");
                }, 1);
              })),
            1 < y && tP(v, i.logAsTree());
        };
        return (
          t.listen(function (t) {
            a || l();
          }),
          l(),
          function (e, n) {
            var r = e.code,
              i = e.list;
            a &&
              o &&
              (n.setCursor({ line: 0, ch: 0 }),
              setTimeout(function () {
                o.focus(),
                  o.refresh(),
                  (function (t, e, n, r) {
                    var i = "";
                    try {
                      var o = t.getCursor(),
                        a = o.line,
                        s = o.ch,
                        c = t.getValue().split("\n")[a];
                      if (
                        ")" === c.charAt(s) &&
                        "(" === c.charAt(s - 1) &&
                        "]" === c.charAt(s - 2)
                      ) {
                        var u = n.shift(),
                          l = u.anchor,
                          f = u.head;
                        i = ["a", r, l.line, l.ch, f.line, f.ch].join(":");
                      } else
                        "" === c.charAt(s - 1) &&
                          "" === c.charAt(s + 1) &&
                          (i = e);
                    } catch (h) {
                      console.log("Error while setting annotation.");
                    }
                    t.replaceSelection(i);
                  })(o, r, i, t.getActiveFile());
              }, 1));
          }
        );
      }
      function tU(t, e) {
        var n = u.withFallback(".read-only"),
          r = t.git();
        if (n.found()) {
          var i = function t() {
            f && console.log("story:render");
            var i,
              o,
              a = r.log(),
              s = Object.keys(a)
                .map(function (t) {
                  return {
                    hash: t,
                    message: a[t].message,
                    position:
                      (a[t].meta && parseInt(a[t].meta.position, 10)) || null,
                  };
                })
                .sort(function (t, e) {
                  return null !== t.position && null !== e.position
                    ? t.position - e.position
                    : null !== t.position && null === e.position
                    ? -1
                    : null === t.position && null !== e.position
                    ? 1
                    : t.hash - e.hash;
                }),
              c = s.length,
              u = tI()(0 < c ? r.show().files : [], r.getAll()),
              l =
                ((i = r),
                0 === (o = s).length
                  ? ""
                  : o
                      .map(function (t) {
                        var e = t.hash,
                          n = t.message,
                          r = t.position,
                          o =
                            r && 0 < r
                              ? '<span class="current-position">'.concat(
                                  r,
                                  "</span>"
                                )
                              : "",
                          a = tB(n),
                          s = i.head() === e,
                          c = "";
                        return (
                          (c += '<div class="commit '
                            .concat(s ? "commit-head" : "", '" id="c')
                            .concat(e, '">')),
                          (c +=
                            '\n      <a href="javascript:void(0);" data-export="checkoutLink" data-hash="'
                              .concat(e, '" class="checkout">\n        ')
                              .concat(o, '<span class="commit-message-text">')
                              .concat(
                                a || "...",
                                "</span>\n      </a>\n    "
                              )) + "</div>"
                        );
                      })
                      .join(""));
            n.attr("class", "editor-section story"),
              n
                .content(
                  "\n      ".concat(
                    "" !== l ? '<div data-export="list">' + l + "</div>" : "",
                    "\n    "
                  )
                )
                .forEach(function (n) {
                  "checkoutLink" === n.attr("data-export") &&
                    n.onClick(function () {
                      var i = n.attr("data-hash");
                      0 < u.length
                        ? tD(
                            "Checkout",
                            "You are about to checkout another commit. You have an unstaged changes. Are you sure?",
                            function (n) {
                              n && a[i] && (r.checkout(i, !0), e(), t());
                            }
                          )
                        : a[i] && (r.checkout(i), e(), t());
                    });
                });
          };
          t.listen(function (t) {
            i();
          }),
            i();
        }
      }
      var tG = function (t) {
          if (u.exists("#preview")) {
            var e = t.git();
            window.addEventListener("message", function (t) {
              t.data.checkoutTo && e.checkout(t.data.checkoutTo);
            });
            var n = u.withFallback("#preview"),
              r = t.getDemoId(),
              i = function (t, n, r) {
                null !== e.head() &&
                  (t.prop("value", JSON.stringify(e.export())),
                  n.prop("value", e.head()),
                  r.e.submit());
              };
            n.content(
              '\n    <form data-export="form" action="/e/'
                .concat(t.getDemoId(), '/story.local" target="frame')
                .concat(
                  r,
                  '" method="post">\n      <input type="hidden" data-export="input" name="git"/>\n      <input type="hidden" data-export="hash" name="hash"/>\n    </form>\n    <iframe name="frame'
                )
                .concat(
                  r,
                  '" src="" style="display: block; width:100%; height: 100%; border:0; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin allow-top-navigation-by-user-activation"/>\n  '
                )
            );
            var o = n.namedExports(),
              a = o.form,
              s = o.input,
              c = o.hash;
            t.listen(function (t) {
              i(s, c, a);
            }),
              i(s, c, a);
          }
        },
        tV = function (t) {
          if (u.exists("#annotate")) {
            var e = t.git();
            window.addEventListener("message", function (t) {
              t.data.checkoutTo && e.checkout(t.data.checkoutTo);
            });
            var n = u.withFallback("#annotate"),
              r = t.getDemoId(),
              i = function (t, n, r) {
                null !== e.head() &&
                  (t.prop("value", JSON.stringify(e.export())),
                  n.prop("value", e.head()),
                  r.e.submit());
              };
            n.content(
              '\n    <form data-export="form" action="/e/'
                .concat(t.getDemoId(), '/story.annotate" target="frame')
                .concat(
                  r,
                  '" method="post">\n      <input type="hidden" data-export="input" name="git"/>\n      <input type="hidden" data-export="hash" name="hash"/>\n    </form>\n    <iframe name="frame'
                )
                .concat(
                  r,
                  '" src="" style="display: block; width:100%; height: 100%; border:0; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin allow-top-navigation-by-user-activation"/>\n  '
                )
            );
            var o = n.namedExports(),
              a = o.form,
              s = o.input,
              c = o.hash;
            t.listen(function (t) {
              i(s, c, a);
            }),
              i(s, c, a);
          }
        };
      (function (t) {
        return t$.apply(this, arguments);
      })(s.version).then(function (t) {
        function e() {
          return n.apply(this, arguments);
        }
        function n() {
          return (n = a()(
            i.a.mark(function n() {
              var r, o, s, c, l, h;
              return i.a.wrap(
                function (n) {
                  for (;;)
                    switch ((n.prev = n.next)) {
                      case 0:
                        return (
                          m(t),
                          (r = function () {}),
                          (o = tH(t, function () {
                            return c();
                          })),
                          (n.next = 5),
                          Q(t, function (t, e, n) {
                            switch (
                              (f && console.log("editor event=" + t), t)
                            ) {
                              case Y:
                                o(e, n);
                                break;
                              case J:
                                r(!0);
                                break;
                              case X:
                                r(!1);
                            }
                          })
                        );
                      case 5:
                        (c = (s = n.sent).loadFileInEditor),
                          (l = s.save),
                          tU(t, function () {
                            return c();
                          }),
                          tG(t),
                          tV(t),
                          c(),
                          (h = tM(
                            t,
                            function () {
                              t.removeListeners(), u.destroy(), e();
                            },
                            function () {
                              return c();
                            }
                          )),
                          (r = tL(
                            t,
                            function (e) {
                              t.setActiveFile(e), c();
                            },
                            (function () {
                              var e = a()(
                                i.a.mark(function e() {
                                  var n;
                                  return i.a.wrap(
                                    function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (
                                              (e.next = 2),
                                              new Promise(function (t) {
                                                return t8({
                                                  title: "New file",
                                                  content:
                                                    '\n      <input name="filename" data-export="filenameInput" placeholder="untitled.js"/>\n      <button class="save secondary" data-export="saveButton">'.concat(
                                                      t0(),
                                                      "<span>Create</span></button>\n    "
                                                    ),
                                                  cleanUp: function () {
                                                    t();
                                                  },
                                                  onRender: function (e) {
                                                    var n = e.filenameInput,
                                                      r = e.saveButton,
                                                      i = e.closePopup,
                                                      o = function () {
                                                        "" !== n.e.value &&
                                                          t(n.e.value),
                                                          i();
                                                      };
                                                    n.e.focus(),
                                                      n.onKeyUp(function (t) {
                                                        13 === t.keyCode && o();
                                                      }),
                                                      r.onClick(o);
                                                  },
                                                });
                                              })
                                            );
                                          case 2:
                                            (n = e.sent) &&
                                              (t.addNewFile(n), c());
                                          case 4:
                                          case "end":
                                            return e.stop();
                                        }
                                    },
                                    e,
                                    this
                                  );
                                })
                              );
                              return function () {
                                return e.apply(this, arguments);
                              };
                            })(),
                            (function () {
                              var e = a()(
                                i.a.mark(function e(n) {
                                  return i.a.wrap(
                                    function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            t5(
                                              n,
                                              t.getNumOfFiles(),
                                              function () {
                                                t.deleteFile(n), c();
                                              },
                                              function (e) {
                                                t.renameFile(n, e), c();
                                              },
                                              function () {
                                                t.setEntryPoint(n), c();
                                              }
                                            );
                                          case 1:
                                          case "end":
                                            return e.stop();
                                        }
                                    },
                                    e,
                                    this
                                  );
                                })
                              );
                              return function (t) {
                                return e.apply(this, arguments);
                              };
                            })(),
                            h,
                            l,
                            function () {
                              var e, n, r, i, o, a, s, c;
                              (e = t.meta()),
                                (n = function (e) {
                                  return t.meta(e);
                                }),
                                (r = e.name),
                                (i = e.id),
                                (o = e.description),
                                (a = e.published),
                                (s = e.storyWithCode),
                                (c = e.comments),
                                t8({
                                  title: "Edit story name",
                                  content:
                                    '\n      <input data-export="nameInput" value="'
                                      .concat(
                                        (r = r || ""),
                                        '" placeholder="Name"/>\n      <textarea placeholder="Description" data-export="descriptionInput">'
                                      )
                                      .concat(
                                        o || "",
                                        '</textarea>\n      <label>\n        <input type="checkbox" data-export="publishCheckbox" '
                                      )
                                      .concat(
                                        a ? 'checked="checked"' : "",
                                        '/> Publish as a story at <a href="/e/'
                                      )
                                      .concat(i, '/story" target="_blank">/e/')
                                      .concat(
                                        i,
                                        '/story</a>\n      </label>\n      <label>\n        <input type="checkbox" data-export="withCode" '
                                      )
                                      .concat(
                                        s ? 'checked="checked"' : "",
                                        '/> Add the editor at the end of the story\n      </label>\n      <label>\n        <input type="checkbox" data-export="withComments" '
                                      )
                                      .concat(
                                        c ? 'checked="checked"' : "",
                                        '/> Add a comments section at the end of the story\n      </label>\n      <button class="save secondary" data-export="saveButton">'
                                      )
                                      .concat(
                                        t0(),
                                        "<span>Update</span></button>\n    "
                                      ),
                                  onRender: function (t) {
                                    var e = t.nameInput,
                                      i = t.descriptionInput,
                                      o = t.publishCheckbox,
                                      a = t.saveButton,
                                      s = t.closePopup,
                                      c = t.withCode,
                                      u = t.withComments,
                                      l = function () {
                                        "" !== e.e.value &&
                                          n({
                                            name: e.e.value,
                                            description: i.e.value,
                                            published: o.e.checked,
                                            storyWithCode: c.e.checked,
                                            comments: u.e.checked,
                                          }),
                                          s();
                                      };
                                    e.e.focus(),
                                      e.e.setSelectionRange(
                                        0,
                                        r.lastIndexOf(".")
                                      ),
                                      e.onKeyUp(function (t) {
                                        13 === t.keyCode && l();
                                      }),
                                      a.onClick(l);
                                  },
                                });
                            }
                          ));
                      case 14:
                      case "end":
                        return n.stop();
                    }
                },
                n,
                this
              );
            })
          )).apply(this, arguments);
        }
        e();
      });
    },
  ]);
