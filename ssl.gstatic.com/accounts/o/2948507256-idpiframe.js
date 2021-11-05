/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var m, aa = function(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    },
    ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    },
    ca = function(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    },
    da = ca(this),
    n = function(a, b) {
        if (b) a: {
            var c = da;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e]
            }
            a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && ba(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    };
n("Symbol", function(a) {
    if (a) return a;
    var b = function(f, g) {
        this.se = f;
        ba(this, "description", {
            configurable: !0,
            writable: !0,
            value: g
        })
    };
    b.prototype.toString = function() {
        return this.se
    };
    var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
        d = 0,
        e = function(f) {
            if (this instanceof e) throw new TypeError("Symbol is not a constructor");
            return new b(c + (f || "") + "_" + d++, f)
        };
    return e
});
n("Symbol.iterator", function(a) {
    if (a) return a;
    a = Symbol("Symbol.iterator");
    for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
        var d = da[b[c]];
        "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function() {
                return ea(aa(this))
            }
        })
    }
    return a
});
var ea = function(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        };
        return a
    },
    t = function(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : {
            next: aa(a)
        }
    },
    fa = function(a) {
        for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
        return c
    },
    ha = "function" == typeof Object.create ? Object.create : function(a) {
        var b = function() {};
        b.prototype = a;
        return new b
    },
    ia;
if ("function" == typeof Object.setPrototypeOf) ia = Object.setPrototypeOf;
else {
    var ja;
    a: {
        var ka = {
                a: !0
            },
            la = {};
        try {
            la.__proto__ = ka;
            ja = la.a;
            break a
        } catch (a) {}
        ja = !1
    }
    ia = ja ? function(a, b) {
        a.__proto__ = b;
        if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
        return a
    } : null
}
var ma = ia,
    u = function(a, b) {
        a.prototype = ha(b.prototype);
        a.prototype.constructor = a;
        if (ma) ma(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else a[c] = b[c];
        a.sa = b.prototype
    };
n("Promise", function(a) {
    function b() {
        this.ia = null
    }

    function c(g) {
        return g instanceof e ? g : new e(function(h) {
            h(g)
        })
    }
    if (a) return a;
    b.prototype.ad = function(g) {
        if (null == this.ia) {
            this.ia = [];
            var h = this;
            this.bd(function() {
                h.bf()
            })
        }
        this.ia.push(g)
    };
    var d = da.setTimeout;
    b.prototype.bd = function(g) {
        d(g, 0)
    };
    b.prototype.bf = function() {
        for (; this.ia && this.ia.length;) {
            var g = this.ia;
            this.ia = [];
            for (var h = 0; h < g.length; ++h) {
                var k = g[h];
                g[h] = null;
                try {
                    k()
                } catch (l) {
                    this.Ee(l)
                }
            }
        }
        this.ia = null
    };
    b.prototype.Ee = function(g) {
        this.bd(function() {
            throw g;
        })
    };
    var e = function(g) {
        this.Ka = 0;
        this.hb = void 0;
        this.Fa = [];
        this.Jd = !1;
        var h = this.cc();
        try {
            g(h.resolve, h.reject)
        } catch (k) {
            h.reject(k)
        }
    };
    e.prototype.cc = function() {
        function g(l) {
            return function(p) {
                k || (k = !0, l.call(h, p))
            }
        }
        var h = this,
            k = !1;
        return {
            resolve: g(this.Wf),
            reject: g(this.Cc)
        }
    };
    e.prototype.Wf = function(g) {
        if (g === this) this.Cc(new TypeError("A Promise cannot resolve to itself"));
        else if (g instanceof e) this.ig(g);
        else {
            a: switch (typeof g) {
                case "object":
                    var h = null != g;
                    break a;
                case "function":
                    h = !0;
                    break a;
                default:
                    h = !1
            }
            h ? this.Vf(g) : this.ud(g)
        }
    };
    e.prototype.Vf = function(g) {
        var h = void 0;
        try {
            h = g.then
        } catch (k) {
            this.Cc(k);
            return
        }
        "function" == typeof h ? this.jg(h, g) : this.ud(g)
    };
    e.prototype.Cc = function(g) {
        this.oe(2, g)
    };
    e.prototype.ud = function(g) {
        this.oe(1, g)
    };
    e.prototype.oe = function(g, h) {
        if (0 != this.Ka) throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.Ka);
        this.Ka = g;
        this.hb = h;
        2 === this.Ka && this.Zf();
        this.cf()
    };
    e.prototype.Zf = function() {
        var g = this;
        d(function() {
            if (g.Lf()) {
                var h = da.console;
                "undefined" !== typeof h && h.error(g.hb)
            }
        }, 1)
    };
    e.prototype.Lf = function() {
        if (this.Jd) return !1;
        var g = da.CustomEvent,
            h = da.Event,
            k = da.dispatchEvent;
        if ("undefined" === typeof k) return !0;
        "function" === typeof g ? g = new g("unhandledrejection", {
            cancelable: !0
        }) : "function" === typeof h ? g = new h("unhandledrejection", {
            cancelable: !0
        }) : (g = da.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
        g.promise = this;
        g.reason = this.hb;
        return k(g)
    };
    e.prototype.cf = function() {
        if (null != this.Fa) {
            for (var g =
                    0; g < this.Fa.length; ++g) f.ad(this.Fa[g]);
            this.Fa = null
        }
    };
    var f = new b;
    e.prototype.ig = function(g) {
        var h = this.cc();
        g.qb(h.resolve, h.reject)
    };
    e.prototype.jg = function(g, h) {
        var k = this.cc();
        try {
            g.call(h, k.resolve, k.reject)
        } catch (l) {
            k.reject(l)
        }
    };
    e.prototype.then = function(g, h) {
        function k(w, r) {
            return "function" == typeof w ? function(v) {
                try {
                    l(w(v))
                } catch (y) {
                    p(y)
                }
            } : r
        }
        var l, p, q = new e(function(w, r) {
            l = w;
            p = r
        });
        this.qb(k(g, l), k(h, p));
        return q
    };
    e.prototype.catch = function(g) {
        return this.then(void 0, g)
    };
    e.prototype.qb = function(g,
        h) {
        function k() {
            switch (l.Ka) {
                case 1:
                    g(l.hb);
                    break;
                case 2:
                    h(l.hb);
                    break;
                default:
                    throw Error("Unexpected state: " + l.Ka);
            }
        }
        var l = this;
        null == this.Fa ? f.ad(k) : this.Fa.push(k);
        this.Jd = !0
    };
    e.resolve = c;
    e.reject = function(g) {
        return new e(function(h, k) {
            k(g)
        })
    };
    e.race = function(g) {
        return new e(function(h, k) {
            for (var l = t(g), p = l.next(); !p.done; p = l.next()) c(p.value).qb(h, k)
        })
    };
    e.all = function(g) {
        var h = t(g),
            k = h.next();
        return k.done ? c([]) : new e(function(l, p) {
            function q(v) {
                return function(y) {
                    w[v] = y;
                    r--;
                    0 == r && l(w)
                }
            }
            var w = [],
                r = 0;
            do w.push(void 0), r++, c(k.value).qb(q(w.length - 1), p), k = h.next(); while (!k.done)
        })
    };
    return e
});
var na = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
n("WeakMap", function(a) {
    function b() {}

    function c(k) {
        var l = typeof k;
        return "object" === l && null !== k || "function" === l
    }

    function d(k) {
        if (!na(k, f)) {
            var l = new b;
            ba(k, f, {
                value: l
            })
        }
    }

    function e(k) {
        var l = Object[k];
        l && (Object[k] = function(p) {
            if (p instanceof b) return p;
            Object.isExtensible(p) && d(p);
            return l(p)
        })
    }
    if (function() {
            if (!a || !Object.seal) return !1;
            try {
                var k = Object.seal({}),
                    l = Object.seal({}),
                    p = new a([
                        [k, 2],
                        [l, 3]
                    ]);
                if (2 != p.get(k) || 3 != p.get(l)) return !1;
                p.delete(k);
                p.set(l, 4);
                return !p.has(k) && 4 == p.get(l)
            } catch (q) {
                return !1
            }
        }()) return a;
    var f = "$jscomp_hidden_" + Math.random();
    e("freeze");
    e("preventExtensions");
    e("seal");
    var g = 0,
        h = function(k) {
            this.Xa = (g += Math.random() + 1).toString();
            if (k) {
                k = t(k);
                for (var l; !(l = k.next()).done;) l = l.value, this.set(l[0], l[1])
            }
        };
    h.prototype.set = function(k, l) {
        if (!c(k)) throw Error("Invalid WeakMap key");
        d(k);
        if (!na(k, f)) throw Error("WeakMap key fail: " + k);
        k[f][this.Xa] = l;
        return this
    };
    h.prototype.get = function(k) {
        return c(k) && na(k, f) ? k[f][this.Xa] : void 0
    };
    h.prototype.has = function(k) {
        return c(k) && na(k, f) && na(k[f],
            this.Xa)
    };
    h.prototype.delete = function(k) {
        return c(k) && na(k, f) && na(k[f], this.Xa) ? delete k[f][this.Xa] : !1
    };
    return h
});
n("Map", function(a) {
    if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
            try {
                var h = Object.seal({
                        x: 4
                    }),
                    k = new a(t([
                        [h, "s"]
                    ]));
                if ("s" != k.get(h) || 1 != k.size || k.get({
                        x: 4
                    }) || k.set({
                        x: 4
                    }, "t") != k || 2 != k.size) return !1;
                var l = k.entries(),
                    p = l.next();
                if (p.done || p.value[0] != h || "s" != p.value[1]) return !1;
                p = l.next();
                return p.done || 4 != p.value[0].x || "t" != p.value[1] || !l.next().done ? !1 : !0
            } catch (q) {
                return !1
            }
        }()) return a;
    var b = new WeakMap,
        c = function(h) {
            this.Ta = {};
            this.ea =
                f();
            this.size = 0;
            if (h) {
                h = t(h);
                for (var k; !(k = h.next()).done;) k = k.value, this.set(k[0], k[1])
            }
        };
    c.prototype.set = function(h, k) {
        h = 0 === h ? 0 : h;
        var l = d(this, h);
        l.list || (l.list = this.Ta[l.id] = []);
        l.C ? l.C.value = k : (l.C = {
            next: this.ea,
            ga: this.ea.ga,
            head: this.ea,
            key: h,
            value: k
        }, l.list.push(l.C), this.ea.ga.next = l.C, this.ea.ga = l.C, this.size++);
        return this
    };
    c.prototype.delete = function(h) {
        h = d(this, h);
        return h.C && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this.Ta[h.id], h.C.ga.next = h.C.next, h.C.next.ga = h.C.ga,
            h.C.head = null, this.size--, !0) : !1
    };
    c.prototype.clear = function() {
        this.Ta = {};
        this.ea = this.ea.ga = f();
        this.size = 0
    };
    c.prototype.has = function(h) {
        return !!d(this, h).C
    };
    c.prototype.get = function(h) {
        return (h = d(this, h).C) && h.value
    };
    c.prototype.entries = function() {
        return e(this, function(h) {
            return [h.key, h.value]
        })
    };
    c.prototype.keys = function() {
        return e(this, function(h) {
            return h.key
        })
    };
    c.prototype.values = function() {
        return e(this, function(h) {
            return h.value
        })
    };
    c.prototype.forEach = function(h, k) {
        for (var l = this.entries(),
                p; !(p = l.next()).done;) p = p.value, h.call(k, p[1], p[0], this)
    };
    c.prototype[Symbol.iterator] = c.prototype.entries;
    var d = function(h, k) {
            var l = k && typeof k;
            "object" == l || "function" == l ? b.has(k) ? l = b.get(k) : (l = "" + ++g, b.set(k, l)) : l = "p_" + k;
            var p = h.Ta[l];
            if (p && na(h.Ta, l))
                for (h = 0; h < p.length; h++) {
                    var q = p[h];
                    if (k !== k && q.key !== q.key || k === q.key) return {
                        id: l,
                        list: p,
                        index: h,
                        C: q
                    }
                }
            return {
                id: l,
                list: p,
                index: -1,
                C: void 0
            }
        },
        e = function(h, k) {
            var l = h.ea;
            return ea(function() {
                if (l) {
                    for (; l.head != h.ea;) l = l.ga;
                    for (; l.next != l.head;) return l =
                        l.next, {
                            done: !1,
                            value: k(l)
                        };
                    l = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        },
        f = function() {
            var h = {};
            return h.ga = h.next = h.head = h
        },
        g = 0;
    return c
});
n("Array.prototype.find", function(a) {
    return a ? a : function(b, c) {
        a: {
            var d = this;d instanceof String && (d = String(d));
            for (var e = d.length, f = 0; f < e; f++) {
                var g = d[f];
                if (b.call(c, g, f, d)) {
                    b = g;
                    break a
                }
            }
            b = void 0
        }
        return b
    }
});
n("Set", function(a) {
    if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
            try {
                var c = Object.seal({
                        x: 4
                    }),
                    d = new a(t([c]));
                if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({
                        x: 4
                    }) != d || 2 != d.size) return !1;
                var e = d.entries(),
                    f = e.next();
                if (f.done || f.value[0] != c || f.value[1] != c) return !1;
                f = e.next();
                return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done
            } catch (g) {
                return !1
            }
        }()) return a;
    var b = function(c) {
        this.$ = new Map;
        if (c) {
            c =
                t(c);
            for (var d; !(d = c.next()).done;) this.add(d.value)
        }
        this.size = this.$.size
    };
    b.prototype.add = function(c) {
        c = 0 === c ? 0 : c;
        this.$.set(c, c);
        this.size = this.$.size;
        return this
    };
    b.prototype.delete = function(c) {
        c = this.$.delete(c);
        this.size = this.$.size;
        return c
    };
    b.prototype.clear = function() {
        this.$.clear();
        this.size = 0
    };
    b.prototype.has = function(c) {
        return this.$.has(c)
    };
    b.prototype.entries = function() {
        return this.$.entries()
    };
    b.prototype.values = function() {
        return this.$.values()
    };
    b.prototype.keys = b.prototype.values;
    b.prototype[Symbol.iterator] = b.prototype.values;
    b.prototype.forEach = function(c, d) {
        var e = this;
        this.$.forEach(function(f) {
            return c.call(d, f, f, e)
        })
    };
    return b
});
var oa = function(a, b) {
    a instanceof String && (a += "");
    var c = 0,
        d = !1,
        e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    e[Symbol.iterator] = function() {
        return e
    };
    return e
};
n("Array.prototype.entries", function(a) {
    return a ? a : function() {
        return oa(this, function(b, c) {
            return [b, c]
        })
    }
});
n("Array.prototype.values", function(a) {
    return a ? a : function() {
        return oa(this, function(b, c) {
            return c
        })
    }
});
n("Array.prototype.keys", function(a) {
    return a ? a : function() {
        return oa(this, function(b) {
            return b
        })
    }
});
n("Array.from", function(a) {
    return a ? a : function(b, c, d) {
        c = null != c ? c : function(h) {
            return h
        };
        var e = [],
            f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
        if ("function" == typeof f) {
            b = f.call(b);
            for (var g = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, g++))
        } else
            for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
        return e
    }
});
var pa = pa || {},
    x = this || self,
    qa = function() {},
    ra = function(a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    },
    sa = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    },
    ta = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    },
    va = function(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b,
                arguments)
        }
    },
    wa = function(a, b, c) {
        wa = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ta : va;
        return wa.apply(null, arguments)
    },
    xa = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    },
    z = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.sa = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.ug = function(d, e, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h -
                2] = arguments[h];
            return b.prototype[e].apply(d, g)
        }
    },
    ya = function(a) {
        return a
    };

function za(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, za);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a))
}
z(za, Error);
za.prototype.name = "CustomError";
var Aa = function(a, b) {
    a = a.split("%s");
    for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
    za.call(this, c + a[d])
};
z(Aa, za);
Aa.prototype.name = "AssertionError";
var Ba = function(a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            e += ": " + c;
            var f = d
        } else a && (e += ": " + a, f = b);
        throw new Aa("" + e, f || []);
    },
    A = function(a, b, c) {
        a || Ba("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    },
    Ca = function(a, b) {
        throw new Aa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    },
    Da = function(a, b, c) {
        "string" !== typeof a && Ba("Expected string but got %s: %s.", [ra(a), a], b, Array.prototype.slice.call(arguments, 2))
    },
    Ea = function(a, b, c) {
        Array.isArray(a) || Ba("Expected array but got %s: %s.", [ra(a), a], b, Array.prototype.slice.call(arguments, 2))
    },
    Ga = function(a, b, c, d) {
        a instanceof b || Ba("Expected instanceof %s but got %s.", [Fa(b), Fa(a)], c, Array.prototype.slice.call(arguments, 3));
        return a
    },
    Fa = function(a) {
        return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    };
var Ha = function(a) {
    for (var b = [], c = 0, d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        255 < e && (b[c++] = e & 255, e >>= 8);
        b[c++] = e
    }
    return b
};
var Ia = Array.prototype.indexOf ? function(a, b) {
        A(null != a.length);
        return Array.prototype.indexOf.call(a, b, void 0)
    } : function(a, b) {
        if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    },
    Ja = Array.prototype.forEach ? function(a, b) {
        A(null != a.length);
        Array.prototype.forEach.call(a, b, void 0)
    } : function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)
    };

function Ka(a, b) {
    b = Ia(a, b);
    var c;
    if (c = 0 <= b) A(null != a.length), Array.prototype.splice.call(a, b, 1);
    return c
};
var La = String.prototype.trim ? function(a) {
        return a.trim()
    } : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    },
    Ma = /&/g,
    Na = /</g,
    Oa = />/g,
    Pa = /"/g,
    Qa = /'/g,
    Ra = /\x00/g,
    Sa = /[\x00&<>"']/,
    Ua = function(a, b) {
        var c = 0;
        a = La(String(a)).split(".");
        b = La(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || "",
                g = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                if (0 == f[0].length && 0 == g[0].length) break;
                c = Ta(0 == f[1].length ? 0 : parseInt(f[1],
                    10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || Ta(0 == f[2].length, 0 == g[2].length) || Ta(f[2], g[2]);
                f = f[3];
                g = g[3]
            } while (0 == c)
        }
        return c
    },
    Ta = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
var Va;
a: {
    var Wa = x.navigator;
    if (Wa) {
        var Xa = Wa.userAgent;
        if (Xa) {
            Va = Xa;
            break a
        }
    }
    Va = ""
}

function B(a) {
    return -1 != Va.indexOf(a)
};

function Ya() {
    return B("Opera")
}

function Za() {
    return B("Trident") || B("MSIE")
}

function $a() {
    return B("Firefox") || B("FxiOS")
}

function ab() {
    return B("Safari") && !(bb() || B("Coast") || Ya() || B("Edge") || B("Edg/") || B("OPR") || $a() || B("Silk") || B("Android"))
}

function bb() {
    return (B("Chrome") || B("CriOS")) && !B("Edge")
}

function cb() {
    return B("Android") && !(bb() || $a() || Ya() || B("Silk"))
}

function db(a) {
    var b = {};
    a.forEach(function(c) {
        b[c[0]] = c[1]
    });
    return function(c) {
        return b[c.find(function(d) {
            return d in b
        })] || ""
    }
}

function eb() {
    var a = Va;
    if (Za()) {
        var b = /rv: *([\d\.]*)/.exec(a);
        if (b && b[1]) a = b[1];
        else {
            b = "";
            var c = /MSIE +([\d\.]+)/.exec(a);
            if (c && c[1])
                if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1])
                    if (a && a[1]) switch (a[1]) {
                        case "4.0":
                            b = "8.0";
                            break;
                        case "5.0":
                            b = "9.0";
                            break;
                        case "6.0":
                            b = "10.0";
                            break;
                        case "7.0":
                            b = "11.0"
                    } else b = "7.0";
                    else b = c[1];
            a = b
        }
        return a
    }
    c = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g");
    b = [];
    for (var d; d = c.exec(a);) b.push([d[1], d[2], d[3] || void 0]);
    a = db(b);
    return Ya() ? a(["Version", "Opera"]) : B("Edge") ?
        a(["Edge"]) : B("Edg/") ? a(["Edg"]) : bb() ? a(["Chrome", "CriOS", "HeadlessChrome"]) : (a = b[2]) && a[1] || ""
};

function fb() {
    return B("iPhone") && !B("iPod") && !B("iPad")
}

function gb() {
    var a = Va,
        b = "";
    B("Windows") ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : fb() || B("iPad") || B("iPod") ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : B("Macintosh") ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : -1 != Va.toLowerCase().indexOf("kaios") ? (b = /(?:KaiOS)\/(\S+)/i, b = (a = b.exec(a)) && a[1]) : B("Android") ? (b = /Android\s+([^\);]+)(\)|;)/, b = (a = b.exec(a)) && a[1]) : B("CrOS") && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,
        b = (a = b.exec(a)) && a[1]);
    return 0 <= Ua(b || "", 12)
};
var hb = function(a) {
    hb[" "](a);
    return a
};
hb[" "] = qa;
var jb = function(a, b) {
    var c = ib;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
};
var kb = Ya(),
    lb = Za(),
    mb = B("Edge"),
    nb = B("Gecko") && !(-1 != Va.toLowerCase().indexOf("webkit") && !B("Edge")) && !(B("Trident") || B("MSIE")) && !B("Edge"),
    ob = -1 != Va.toLowerCase().indexOf("webkit") && !B("Edge"),
    pb;
a: {
    var qb = "",
        rb = function() {
            var a = Va;
            if (nb) return /rv:([^\);]+)(\)|;)/.exec(a);
            if (mb) return /Edge\/([\d\.]+)/.exec(a);
            if (lb) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (ob) return /WebKit\/(\S+)/.exec(a);
            if (kb) return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();rb && (qb = rb ? rb[1] : "");
    if (lb) {
        var sb, tb = x.document;
        sb = tb ? tb.documentMode : void 0;
        if (null != sb && sb > parseFloat(qb)) {
            pb = String(sb);
            break a
        }
    }
    pb = qb
}
var ub = pb,
    ib = {},
    vb = function(a) {
        return jb(a, function() {
            return 0 <= Ua(ub, a)
        })
    };
var wb = $a();
cb();
var xb = bb(),
    yb = ab() && !(fb() || B("iPad") || B("iPod"));
var zb = {},
    Ab = null,
    Bb = function(a, b) {
        var c = ra(a);
        A("array" == c || "object" == c && "number" == typeof a.length, "encodeByteArray takes an array as a parameter");
        void 0 === b && (b = 0);
        if (!Ab) {
            Ab = {};
            c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
            for (var d = ["+/=", "+/", "-_=", "-_.", "-_"], e = 0; 5 > e; e++) {
                var f = c.concat(d[e].split(""));
                zb[e] = f;
                for (var g = 0; g < f.length; g++) {
                    var h = f[g],
                        k = Ab[h];
                    void 0 === k ? Ab[h] = g : A(k === g)
                }
            }
        }
        b = zb[b];
        c = Array(Math.floor(a.length / 3));
        d = b[64] || "";
        for (e = f = 0; f < a.length - 2; f +=
            3) {
            k = a[f];
            var l = a[f + 1];
            h = a[f + 2];
            g = b[k >> 2];
            k = b[(k & 3) << 4 | l >> 4];
            l = b[(l & 15) << 2 | h >> 6];
            h = b[h & 63];
            c[e++] = "" + g + k + l + h
        }
        g = 0;
        h = d;
        switch (a.length - f) {
            case 2:
                g = a[f + 1], h = b[(g & 15) << 2] || d;
            case 1:
                a = a[f], c[e] = "" + b[a >> 2] + b[(a & 3) << 4 | g >> 4] + h + d
        }
        return c.join("")
    };
var Cb = function() {
    this.blockSize = -1
};
var Db = function(a, b, c) {
    this.blockSize = -1;
    this.N = a;
    this.blockSize = c || a.blockSize || 16;
    this.Nd = Array(this.blockSize);
    this.wc = Array(this.blockSize);
    a = b;
    a.length > this.blockSize && (this.N.update(a), a = this.N.digest(), this.N.reset());
    for (c = 0; c < this.blockSize; c++) b = c < a.length ? a[c] : 0, this.Nd[c] = b ^ 92, this.wc[c] = b ^ 54;
    this.N.update(this.wc)
};
z(Db, Cb);
Db.prototype.reset = function() {
    this.N.reset();
    this.N.update(this.wc)
};
Db.prototype.update = function(a, b) {
    this.N.update(a, b)
};
Db.prototype.digest = function() {
    var a = this.N.digest();
    this.N.reset();
    this.N.update(this.Nd);
    this.N.update(a);
    return this.N.digest()
};
var Eb = function() {
    this.blockSize = -1;
    this.blockSize = 64;
    this.A = Array(4);
    this.He = Array(this.blockSize);
    this.Lb = this.Ra = 0;
    this.reset()
};
z(Eb, Cb);
Eb.prototype.reset = function() {
    this.A[0] = 1732584193;
    this.A[1] = 4023233417;
    this.A[2] = 2562383102;
    this.A[3] = 271733878;
    this.Lb = this.Ra = 0
};
var Fb = function(a, b, c) {
    c || (c = 0);
    var d = Array(16);
    if ("string" === typeof b)
        for (var e = 0; 16 > e; ++e) d[e] = b.charCodeAt(c++) | b.charCodeAt(c++) << 8 | b.charCodeAt(c++) << 16 | b.charCodeAt(c++) << 24;
    else
        for (e = 0; 16 > e; ++e) d[e] = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24;
    b = a.A[0];
    c = a.A[1];
    e = a.A[2];
    var f = a.A[3];
    var g = b + (f ^ c & (e ^ f)) + d[0] + 3614090360 & 4294967295;
    b = c + (g << 7 & 4294967295 | g >>> 25);
    g = f + (e ^ b & (c ^ e)) + d[1] + 3905402710 & 4294967295;
    f = b + (g << 12 & 4294967295 | g >>> 20);
    g = e + (c ^ f & (b ^ c)) + d[2] + 606105819 & 4294967295;
    e = f + (g << 17 & 4294967295 | g >>>
        15);
    g = c + (b ^ e & (f ^ b)) + d[3] + 3250441966 & 4294967295;
    c = e + (g << 22 & 4294967295 | g >>> 10);
    g = b + (f ^ c & (e ^ f)) + d[4] + 4118548399 & 4294967295;
    b = c + (g << 7 & 4294967295 | g >>> 25);
    g = f + (e ^ b & (c ^ e)) + d[5] + 1200080426 & 4294967295;
    f = b + (g << 12 & 4294967295 | g >>> 20);
    g = e + (c ^ f & (b ^ c)) + d[6] + 2821735955 & 4294967295;
    e = f + (g << 17 & 4294967295 | g >>> 15);
    g = c + (b ^ e & (f ^ b)) + d[7] + 4249261313 & 4294967295;
    c = e + (g << 22 & 4294967295 | g >>> 10);
    g = b + (f ^ c & (e ^ f)) + d[8] + 1770035416 & 4294967295;
    b = c + (g << 7 & 4294967295 | g >>> 25);
    g = f + (e ^ b & (c ^ e)) + d[9] + 2336552879 & 4294967295;
    f = b + (g << 12 & 4294967295 |
        g >>> 20);
    g = e + (c ^ f & (b ^ c)) + d[10] + 4294925233 & 4294967295;
    e = f + (g << 17 & 4294967295 | g >>> 15);
    g = c + (b ^ e & (f ^ b)) + d[11] + 2304563134 & 4294967295;
    c = e + (g << 22 & 4294967295 | g >>> 10);
    g = b + (f ^ c & (e ^ f)) + d[12] + 1804603682 & 4294967295;
    b = c + (g << 7 & 4294967295 | g >>> 25);
    g = f + (e ^ b & (c ^ e)) + d[13] + 4254626195 & 4294967295;
    f = b + (g << 12 & 4294967295 | g >>> 20);
    g = e + (c ^ f & (b ^ c)) + d[14] + 2792965006 & 4294967295;
    e = f + (g << 17 & 4294967295 | g >>> 15);
    g = c + (b ^ e & (f ^ b)) + d[15] + 1236535329 & 4294967295;
    c = e + (g << 22 & 4294967295 | g >>> 10);
    g = b + (e ^ f & (c ^ e)) + d[1] + 4129170786 & 4294967295;
    b = c + (g <<
        5 & 4294967295 | g >>> 27);
    g = f + (c ^ e & (b ^ c)) + d[6] + 3225465664 & 4294967295;
    f = b + (g << 9 & 4294967295 | g >>> 23);
    g = e + (b ^ c & (f ^ b)) + d[11] + 643717713 & 4294967295;
    e = f + (g << 14 & 4294967295 | g >>> 18);
    g = c + (f ^ b & (e ^ f)) + d[0] + 3921069994 & 4294967295;
    c = e + (g << 20 & 4294967295 | g >>> 12);
    g = b + (e ^ f & (c ^ e)) + d[5] + 3593408605 & 4294967295;
    b = c + (g << 5 & 4294967295 | g >>> 27);
    g = f + (c ^ e & (b ^ c)) + d[10] + 38016083 & 4294967295;
    f = b + (g << 9 & 4294967295 | g >>> 23);
    g = e + (b ^ c & (f ^ b)) + d[15] + 3634488961 & 4294967295;
    e = f + (g << 14 & 4294967295 | g >>> 18);
    g = c + (f ^ b & (e ^ f)) + d[4] + 3889429448 & 4294967295;
    c =
        e + (g << 20 & 4294967295 | g >>> 12);
    g = b + (e ^ f & (c ^ e)) + d[9] + 568446438 & 4294967295;
    b = c + (g << 5 & 4294967295 | g >>> 27);
    g = f + (c ^ e & (b ^ c)) + d[14] + 3275163606 & 4294967295;
    f = b + (g << 9 & 4294967295 | g >>> 23);
    g = e + (b ^ c & (f ^ b)) + d[3] + 4107603335 & 4294967295;
    e = f + (g << 14 & 4294967295 | g >>> 18);
    g = c + (f ^ b & (e ^ f)) + d[8] + 1163531501 & 4294967295;
    c = e + (g << 20 & 4294967295 | g >>> 12);
    g = b + (e ^ f & (c ^ e)) + d[13] + 2850285829 & 4294967295;
    b = c + (g << 5 & 4294967295 | g >>> 27);
    g = f + (c ^ e & (b ^ c)) + d[2] + 4243563512 & 4294967295;
    f = b + (g << 9 & 4294967295 | g >>> 23);
    g = e + (b ^ c & (f ^ b)) + d[7] + 1735328473 & 4294967295;
    e = f + (g << 14 & 4294967295 | g >>> 18);
    g = c + (f ^ b & (e ^ f)) + d[12] + 2368359562 & 4294967295;
    c = e + (g << 20 & 4294967295 | g >>> 12);
    g = b + (c ^ e ^ f) + d[5] + 4294588738 & 4294967295;
    b = c + (g << 4 & 4294967295 | g >>> 28);
    g = f + (b ^ c ^ e) + d[8] + 2272392833 & 4294967295;
    f = b + (g << 11 & 4294967295 | g >>> 21);
    g = e + (f ^ b ^ c) + d[11] + 1839030562 & 4294967295;
    e = f + (g << 16 & 4294967295 | g >>> 16);
    g = c + (e ^ f ^ b) + d[14] + 4259657740 & 4294967295;
    c = e + (g << 23 & 4294967295 | g >>> 9);
    g = b + (c ^ e ^ f) + d[1] + 2763975236 & 4294967295;
    b = c + (g << 4 & 4294967295 | g >>> 28);
    g = f + (b ^ c ^ e) + d[4] + 1272893353 & 4294967295;
    f = b + (g << 11 & 4294967295 |
        g >>> 21);
    g = e + (f ^ b ^ c) + d[7] + 4139469664 & 4294967295;
    e = f + (g << 16 & 4294967295 | g >>> 16);
    g = c + (e ^ f ^ b) + d[10] + 3200236656 & 4294967295;
    c = e + (g << 23 & 4294967295 | g >>> 9);
    g = b + (c ^ e ^ f) + d[13] + 681279174 & 4294967295;
    b = c + (g << 4 & 4294967295 | g >>> 28);
    g = f + (b ^ c ^ e) + d[0] + 3936430074 & 4294967295;
    f = b + (g << 11 & 4294967295 | g >>> 21);
    g = e + (f ^ b ^ c) + d[3] + 3572445317 & 4294967295;
    e = f + (g << 16 & 4294967295 | g >>> 16);
    g = c + (e ^ f ^ b) + d[6] + 76029189 & 4294967295;
    c = e + (g << 23 & 4294967295 | g >>> 9);
    g = b + (c ^ e ^ f) + d[9] + 3654602809 & 4294967295;
    b = c + (g << 4 & 4294967295 | g >>> 28);
    g = f + (b ^ c ^ e) + d[12] +
        3873151461 & 4294967295;
    f = b + (g << 11 & 4294967295 | g >>> 21);
    g = e + (f ^ b ^ c) + d[15] + 530742520 & 4294967295;
    e = f + (g << 16 & 4294967295 | g >>> 16);
    g = c + (e ^ f ^ b) + d[2] + 3299628645 & 4294967295;
    c = e + (g << 23 & 4294967295 | g >>> 9);
    g = b + (e ^ (c | ~f)) + d[0] + 4096336452 & 4294967295;
    b = c + (g << 6 & 4294967295 | g >>> 26);
    g = f + (c ^ (b | ~e)) + d[7] + 1126891415 & 4294967295;
    f = b + (g << 10 & 4294967295 | g >>> 22);
    g = e + (b ^ (f | ~c)) + d[14] + 2878612391 & 4294967295;
    e = f + (g << 15 & 4294967295 | g >>> 17);
    g = c + (f ^ (e | ~b)) + d[5] + 4237533241 & 4294967295;
    c = e + (g << 21 & 4294967295 | g >>> 11);
    g = b + (e ^ (c | ~f)) + d[12] + 1700485571 &
        4294967295;
    b = c + (g << 6 & 4294967295 | g >>> 26);
    g = f + (c ^ (b | ~e)) + d[3] + 2399980690 & 4294967295;
    f = b + (g << 10 & 4294967295 | g >>> 22);
    g = e + (b ^ (f | ~c)) + d[10] + 4293915773 & 4294967295;
    e = f + (g << 15 & 4294967295 | g >>> 17);
    g = c + (f ^ (e | ~b)) + d[1] + 2240044497 & 4294967295;
    c = e + (g << 21 & 4294967295 | g >>> 11);
    g = b + (e ^ (c | ~f)) + d[8] + 1873313359 & 4294967295;
    b = c + (g << 6 & 4294967295 | g >>> 26);
    g = f + (c ^ (b | ~e)) + d[15] + 4264355552 & 4294967295;
    f = b + (g << 10 & 4294967295 | g >>> 22);
    g = e + (b ^ (f | ~c)) + d[6] + 2734768916 & 4294967295;
    e = f + (g << 15 & 4294967295 | g >>> 17);
    g = c + (f ^ (e | ~b)) + d[13] + 1309151649 &
        4294967295;
    c = e + (g << 21 & 4294967295 | g >>> 11);
    g = b + (e ^ (c | ~f)) + d[4] + 4149444226 & 4294967295;
    b = c + (g << 6 & 4294967295 | g >>> 26);
    g = f + (c ^ (b | ~e)) + d[11] + 3174756917 & 4294967295;
    f = b + (g << 10 & 4294967295 | g >>> 22);
    g = e + (b ^ (f | ~c)) + d[2] + 718787259 & 4294967295;
    e = f + (g << 15 & 4294967295 | g >>> 17);
    g = c + (f ^ (e | ~b)) + d[9] + 3951481745 & 4294967295;
    a.A[0] = a.A[0] + b & 4294967295;
    a.A[1] = a.A[1] + (e + (g << 21 & 4294967295 | g >>> 11)) & 4294967295;
    a.A[2] = a.A[2] + e & 4294967295;
    a.A[3] = a.A[3] + f & 4294967295
};
Eb.prototype.update = function(a, b) {
    void 0 === b && (b = a.length);
    for (var c = b - this.blockSize, d = this.He, e = this.Ra, f = 0; f < b;) {
        if (0 == e)
            for (; f <= c;) Fb(this, a, f), f += this.blockSize;
        if ("string" === typeof a)
            for (; f < b;) {
                if (d[e++] = a.charCodeAt(f++), e == this.blockSize) {
                    Fb(this, d);
                    e = 0;
                    break
                }
            } else
                for (; f < b;)
                    if (d[e++] = a[f++], e == this.blockSize) {
                        Fb(this, d);
                        e = 0;
                        break
                    }
    }
    this.Ra = e;
    this.Lb += b
};
Eb.prototype.digest = function() {
    var a = Array((56 > this.Ra ? this.blockSize : 2 * this.blockSize) - this.Ra);
    a[0] = 128;
    for (var b = 1; b < a.length - 8; ++b) a[b] = 0;
    var c = 8 * this.Lb;
    for (b = a.length - 8; b < a.length; ++b) a[b] = c & 255, c /= 256;
    this.update(a);
    a = Array(16);
    for (b = c = 0; 4 > b; ++b)
        for (var d = 0; 32 > d; d += 8) a[c++] = this.A[b] >>> d & 255;
    return a
};
/*

 SPDX-License-Identifier: Apache-2.0
*/
var Gb = {};
var Hb = function() {},
    Ib = function(a, b) {
        if (b !== Gb) throw Error("Bad secret");
        this.ce = a
    };
u(Ib, Hb);
Ib.prototype.toString = function() {
    return this.ce
};
var Jb = new Ib("about:invalid#zTSz", Gb);
var Kb = function(a) {
    this.Cf = a
};

function Lb(a) {
    return new Kb(function(b) {
        return b.substr(0, a.length + 1).toLowerCase() === a + ":"
    })
}
var Mb = [Lb("data"), Lb("http"), Lb("https"), Lb("mailto"), Lb("ftp"), new Kb(function(a) {
    return /^[^:]*([/?#]|$)/.test(a)
})];

function Nb(a) {
    var b = void 0 === b ? Mb : b;
    a: {
        b = void 0 === b ? Mb : b;
        for (var c = 0; c < b.length; ++c) {
            var d = b[c];
            if (d instanceof Kb && d.Cf(a)) {
                a = new Ib(a, Gb);
                break a
            }
        }
        a = void 0
    }
    return a || Jb
};

function Ob(a, b) {
    for (var c in a)
        if (b.call(void 0, a[c], c, a)) return !0;
    return !1
}
var Pb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function Qb(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < Pb.length; f++) c = Pb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};
var Rb;
var Ub = function(a, b) {
    this.Kc = a === Sb && b || "";
    this.Ae = Tb
};
Ub.prototype.vb = !0;
Ub.prototype.Wa = function() {
    return this.Kc
};
Ub.prototype.toString = function() {
    return "Const{" + this.Kc + "}"
};
var Vb = function(a) {
        if (a instanceof Ub && a.constructor === Ub && a.Ae === Tb) return a.Kc;
        Ca("expected object of type Const, got '" + a + "'");
        return "type_error:Const"
    },
    Tb = {},
    Sb = {};
var Xb = function(a, b) {
    this.Bc = b === Wb ? a : ""
};
m = Xb.prototype;
m.vb = !0;
m.Wa = function() {
    return this.Bc.toString()
};
m.Dd = !0;
m.lc = function() {
    return 1
};
m.toString = function() {
    return this.Bc.toString()
};
var Yb = function(a) {
        if (a instanceof Xb && a.constructor === Xb) return a.Bc;
        Ca("expected object of type SafeUrl, got '" + a + "' of type " + ra(a));
        return "type_error:SafeUrl"
    },
    Zb = RegExp('^(?:audio/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font/\\w+|image/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|video/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\\w+=(?:\\w+|"[\\w;,= ]+"))*$', "i"),
    $b = /^data:(.*);base64,[a-z0-9+\/]+=*$/i,
    ac = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
    Wb = {},
    bc = new Xb("about:invalid#zClosurez", Wb);
var cc = {},
    dc = function(a, b, c) {
        this.Ac = c === cc ? a : "";
        this.Ve = b;
        this.vb = this.Dd = !0
    };
dc.prototype.lc = function() {
    return this.Ve
};
dc.prototype.Wa = function() {
    return this.Ac.toString()
};
dc.prototype.toString = function() {
    return this.Ac.toString()
};
var ec = function(a) {
        if (a instanceof dc && a.constructor === dc) return a.Ac;
        Ca("expected object of type SafeHtml, got '" + a + "' of type " + ra(a));
        return "type_error:SafeHtml"
    },
    gc = function(a) {
        if (a instanceof dc) return a;
        var b = "object" == typeof a,
            c = null;
        b && a.Dd && (c = a.lc());
        a = b && a.vb ? a.Wa() : String(a);
        Sa.test(a) && (-1 != a.indexOf("&") && (a = a.replace(Ma, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(Na, "&lt;")), -1 != a.indexOf(">") && (a = a.replace(Oa, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(Pa, "&quot;")), -1 != a.indexOf("'") &&
            (a = a.replace(Qa, "&#39;")), -1 != a.indexOf("\x00") && (a = a.replace(Ra, "&#0;")));
        return fc(a, c)
    },
    fc = function(a, b) {
        if (void 0 === Rb) {
            var c = null;
            var d = x.trustedTypes;
            if (d && d.createPolicy) try {
                c = d.createPolicy("goog#html", {
                    createHTML: ya,
                    createScript: ya,
                    createScriptURL: ya
                })
            } catch (e) {
                x.console && x.console.error(e.message)
            }
            Rb = c
        }
        a = (c = Rb) ? c.createHTML(a) : a;
        return new dc(a, b, cc)
    },
    hc = new dc(x.trustedTypes && x.trustedTypes.emptyHTML || "", 0, cc);
var jc = function(a) {
    var b = b || 0;
    return function() {
        return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
    }
};
var kc = function(a) {
    var b = !1,
        c;
    return function() {
        b || (c = a(), b = !0);
        return c
    }
}(function() {
    if ("undefined" === typeof document) return !1;
    var a = document.createElement("div"),
        b = document.createElement("div");
    b.appendChild(document.createElement("div"));
    a.appendChild(b);
    if (!a.firstChild) return !1;
    b = a.firstChild.firstChild;
    a.innerHTML = ec(hc);
    return !b.parentElement
});
var lc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"),
    mc = function(a, b) {
        if (!b) return a;
        var c = a.indexOf("#");
        0 > c && (c = a.length);
        var d = a.indexOf("?");
        if (0 > d || d > c) {
            d = c;
            var e = ""
        } else e = a.substring(d + 1, c);
        a = [a.substr(0, d), e, a.substr(c)];
        c = a[1];
        a[1] = b ? c ? c + "&" + b : b : c;
        return a[0] + (a[1] ? "?" + a[1] : "") + a[2]
    },
    nc = function(a, b, c) {
        Da(a);
        if (Array.isArray(b)) {
            Ea(b);
            for (var d = 0; d < b.length; d++) nc(a, String(b[d]), c)
        } else null != b &&
            c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))))
    },
    oc = function(a, b) {
        A(0 == Math.max(a.length - (b || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
        var c = [];
        for (b = b || 0; b < a.length; b += 2) nc(a[b], a[b + 1], c);
        return c.join("&")
    },
    pc = function(a, b) {
        var c = 2 == arguments.length ? oc(arguments[1], 0) : oc(arguments, 1);
        return mc(a, c)
    },
    qc = function(a, b, c) {
        c = null != c ? "=" + encodeURIComponent(String(c)) : "";
        return mc(a, b + c)
    },
    rc = function(a, b, c, d) {
        for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d;) {
            var f = a.charCodeAt(b -
                1);
            if (38 == f || 63 == f)
                if (f = a.charCodeAt(b + e), !f || 61 == f || 38 == f || 35 == f) return b;
            b += e + 1
        }
        return -1
    },
    sc = /#|$/,
    tc = /[?&]($|#)/,
    uc = function(a, b) {
        for (var c = a.search(sc), d = 0, e, f = []; 0 <= (e = rc(a, d, b, c));) f.push(a.substring(d, e)), d = Math.min(a.indexOf("&", e) + 1 || c, c);
        f.push(a.substr(d));
        return f.join("").replace(tc, "$1")
    },
    vc = function(a) {
        return qc(uc(document.location.href, "hl"), "hl", a)
    };
var wc = {
        Bg: !0
    },
    xc = function() {
        throw Error("Do not instantiate directly");
    };
xc.prototype.bc = null;
xc.prototype.toString = function() {
    return this.content
};
var yc = function() {
    xc.call(this)
};
z(yc, xc);
yc.prototype.ya = wc;
var zc = function(a) {
    var b = null != a && a.ya === wc;
    b && A(a.constructor === yc);
    return b
};
var Ac = Object.freeze || function(a) {
    return a
};
var Bc = function(a) {
        if (null != a) switch (a.bc) {
            case 1:
                return 1;
            case -1:
                return -1;
            case 0:
                return 0
        }
        return null
    },
    Ec = function(a) {
        return zc(a) ? a : a instanceof dc ? C(ec(a).toString(), a.lc()) : C(String(String(a)).replace(Cc, Dc), Bc(a))
    },
    C = function(a) {
        function b(c) {
            this.content = c
        }
        b.prototype = a.prototype;
        return function(c, d) {
            c = new b(String(c));
            void 0 !== d && (c.bc = d);
            return c
        }
    }(yc),
    D = {},
    E = function(a) {
        if (zc(a)) {
            var b = String;
            a = String(a.content).replace(Fc, "").replace(Gc, "&lt;");
            b = b(a).replace(Hc, Dc)
        } else b = String(a).replace(Cc,
            Dc);
        return b
    },
    Ic = function(a, b) {
        a || (a = b instanceof Function ? b.displayName || b.name || "unknown type name" : b instanceof Object ? b.constructor.displayName || b.constructor.name || Object.prototype.toString.call(b) : null === b ? "null" : typeof b, Ca("expected @param origin of type string, but got " + a + "."))
    },
    Jc = {},
    Kc = function() {
        A(Jc === Jc, "found an incorrect call marker, was an internal function called from the top level?")
    },
    Lc = {
        "\x00": "&#0;",
        "\t": "&#9;",
        "\n": "&#10;",
        "\x0B": "&#11;",
        "\f": "&#12;",
        "\r": "&#13;",
        " ": "&#32;",
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "-": "&#45;",
        "/": "&#47;",
        "<": "&lt;",
        "=": "&#61;",
        ">": "&gt;",
        "`": "&#96;",
        "\u0085": "&#133;",
        "\u00a0": "&#160;",
        "\u2028": "&#8232;",
        "\u2029": "&#8233;"
    },
    Dc = function(a) {
        return Lc[a]
    },
    Cc = /[\x00\x22\x26\x27\x3c\x3e]/g,
    Hc = /[\x00\x22\x27\x3c\x3e]/g,
    Fc = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
    Gc = /</g;
var Mc = function(a, b) {
    return a + Math.random() * (b - a)
};
var Nc = function(a) {
    var b = document;
    return "string" === typeof a ? b.getElementById(a) : a
};
/*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
function Oc(a, b, c, d) {
    c = b(c || Pc, d);
    if (sa(c))
        if (c instanceof xc) {
            if (c.ya !== wc) throw Error("Sanitized content was not of kind HTML.");
            b = c.toString();
            c = c.bc;
            d = new Ub(Sb, "Soy SanitizedContent of kind HTML produces SafeHtml-contract-compliant value.");
            Da(Vb(d), "must provide justification");
            A(!/^[\s\xa0]*$/.test(Vb(d)), "must provide non-empty justification");
            b = fc(b, c || null)
        } else Ca("Soy template output is unsafe for use as HTML: " + c), b = gc("zSoyz");
    else b = gc(String(c));
    a = A(a);
    if (kc())
        for (; a.lastChild;) a.removeChild(a.lastChild);
    a.innerHTML = ec(b)
}
var Pc = {};
var Qc = function(a) {
        if (D["oauth2.gsi.soy.common.dialogHeader"]) return D["oauth2.gsi.soy.common.dialogHeader"](null, a);
        var b = '<div class="' + E("dialog-header") + '"><div class="' + E("google-icon") + '">';
        a = D["oauth2.gsi.soy.common.googleIcon"] ? D["oauth2.gsi.soy.common.googleIcon"](null, a) : C('<svg class="' + E("icon") + '" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/><path fill="none" d="M2 2h44v44H2z"/></svg>');
        return C(b + a + "</div><p>Continue with Google</p></div>")
    },
    Rc = function(a) {
        if (D["oauth2.gsi.soy.common.dialogFooter"]) var b = D["oauth2.gsi.soy.common.dialogFooter"](null, a);
        else {
            b = C;
            var c = '<div class="' + E("dialog-footer") + '">';
            if (D["oauth2.gsi.soy.common.languageSelector"]) var d = D["oauth2.gsi.soy.common.languageSelector"](null, a);
            else {
                var e = a.dc;
                d = a.languages;
                var f = '<div id="language_selector" class="' + E("language-selector") + '"><div class="' + E("language-selected") + '">';
                if ((e instanceof xc ? e.content : e) &&
                    (d instanceof xc ? d.content : d)) {
                    for (var g = "", h = d.length, k = 0; k < h; k++) {
                        var l = d[k],
                            p = l.code;
                        g += (p && e && p.zf && e.zf ? p.ya !== e.ya ? 0 : p.toString() === e.toString() : p instanceof xc && e instanceof xc ? p.ya != e.ya ? 0 : p.toString() == e.toString() : p == e) ? "" + l.displayName : ""
                    }
                    f += "<div>" + Ec(g) + "</div>"
                }
                f += '<div class="' + E("chevron") + '"></div></div><div id="language_list" class="' + E("language-list") + '">';
                if (d)
                    for (e = d.length, g = 0; g < e; g++) h = d[g], f += '<div class="' + E("language-option") + '" data-languagecode="' + E(h.code) + '">' + Ec(h.displayName) +
                        "</div>";
                d = C(f + "</div></div>")
            }
            c += d;
            D["oauth2.gsi.soy.common.footerMenu"] ? a = D["oauth2.gsi.soy.common.footerMenu"](null, a) : (a = '<ul class="' + E("footer-menu") + '"><li class="' + E("menu-item") + '"><a class="' + E("menu-content") + '" href="#">', a = a + 'Help</a></li><li class="' + (E("menu-item") + '"><a class="' + E("menu-content") + '" href="#">'), a = a + 'Privacy</a></li><li class="' + (E("menu-item") + '"><a class="' + E("menu-content") + '" href="#">'), a = C(a + "Terms</a></li></ul>"));
            b = b(c + a + "</div>")
        }
        return b
    };
var Sc = function(a, b) {
    var c = a.origin;
    Kc();
    if (D["oauth2.gsi.soy.itp.newgrant.dialog"]) b = D["oauth2.gsi.soy.itp.newgrant.dialog"]({
        origin: c
    }, b);
    else {
        Ic("string" === typeof c, c);
        a = C;
        var d = '<div class="' + E("dialog-container dialog-modal") + '"><div class="' + E("dialog inflated-dialog") + '"><div class="' + E("dialog-body") + '">' + Qc(b) + '<div class="' + E("dialog-content") + '">';
        if (D["oauth2.gsi.soy.itp.newgrant.title"]) var e = D["oauth2.gsi.soy.itp.newgrant.title"](null, b);
        else e = '<h1 class="' + E("title") + '">', e = C(e + "You'll need to give Safari permission to continue</h1>");
        d += e;
        Kc();
        D["oauth2.gsi.soy.itp.newgrant.consentForm"] ? c = D["oauth2.gsi.soy.itp.newgrant.consentForm"]({
            origin: c
        }, b) : (Ic("string" === typeof c, c), e = '<div class="' + E("consent-form") + '"><p class="' + E("consent-text") + '">', c = "In order to continue with your Google Account, Safari will ask if it's ok for Google to use cookies on " + Ec(c) + ".", c = C(e + c + "</p></div>"));
        c = d + c;
        D["oauth2.gsi.soy.itp.newgrant.buttonGroup"] ? d = D["oauth2.gsi.soy.itp.newgrant.buttonGroup"](null, b) : (d = '<div class="' + E("button-group") + '"><div class="' +
            E("button button-cancel") + '" id="confirm_no">', d = d + 'Cancel</div><div class="' + (E("button button-confirm") + '" id="confirm_yes">'), d = C(d + "Continue</div></div>"));
        b = a(c + d + "</div></div>" + Rc(b) + "</div></div>")
    }
    return b
};
var Tc = function(a, b) {
    var c = a.origin;
    Kc();
    if (D["oauth2.gsi.soy.itp.regrant.dialog"]) b = D["oauth2.gsi.soy.itp.regrant.dialog"]({
        origin: c
    }, b);
    else {
        Ic("string" === typeof c, c);
        a = C;
        var d = '<div class="' + E("dialog-container dialog-modal") + '"><div class="' + E("dialog") + '"><div class="' + E("dialog-body") + '">' + Qc(b) + '<div class="' + E("dialog-content") + '">';
        Kc();
        if (D["oauth2.gsi.soy.itp.regrant.title"]) var e = D["oauth2.gsi.soy.itp.regrant.title"]({
            origin: c
        }, b);
        else Ic("string" === typeof c, c), e = '<h1 class="' + E("title") +
            '">', c = "Do you still want Safari to let Google use cookies on " + Ec(c) + "?", e = C(e + c + "</h1>");
        d += e;
        D["oauth2.gsi.soy.itp.regrant.buttonGroup"] ? e = D["oauth2.gsi.soy.itp.regrant.buttonGroup"](null, b) : (e = '<div class="' + E("button-group button-group-high") + '"><div class="' + E("button button-cancel") + '" id="confirm_no">', e = e + 'No thanks</div><div class="' + (E("button button-confirm") + '" id="confirm_yes">'), e = C(e + "Yes</div></div>"));
        b = a(d + e + "</div></div>" + Rc(b) + "</div></div>")
    }
    return b
};

function Uc(a) {
    a && "function" == typeof a.U && a.U()
};
var Vc = function() {
    this.Ca = this.Ca;
    this.ra = this.ra
};
Vc.prototype.Ca = !1;
Vc.prototype.U = function() {
    this.Ca || (this.Ca = !0, this.da())
};
var Wc = function(a, b) {
    a.Ca ? b() : (a.ra || (a.ra = []), a.ra.push(b))
};
Vc.prototype.da = function() {
    if (this.ra)
        for (; this.ra.length;) this.ra.shift()()
};
var Xc = function(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.bb = !1
};
Xc.prototype.stopPropagation = function() {
    this.bb = !0
};
Xc.prototype.preventDefault = function() {
    this.defaultPrevented = !0
};
var Yc = function() {
    if (!x.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
        b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
    try {
        x.addEventListener("test", qa, b), x.removeEventListener("test", qa, b)
    } catch (c) {}
    return a
}();
var Zc;
Zc = ob ? "webkitTransitionEnd" : "transitionend";
var $c = function(a, b) {
    Xc.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.key = "";
    this.charCode = this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.Va = null;
    a && this.V(a, b)
};
z($c, Xc);
var ad = Ac({
    2: "touch",
    3: "pen",
    4: "mouse"
});
$c.prototype.V = function(a, b) {
    var c = this.type = a.type,
        d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    if (b = a.relatedTarget) {
        if (nb) {
            a: {
                try {
                    hb(b.nodeName);
                    var e = !0;
                    break a
                } catch (f) {}
                e = !1
            }
            e || (b = null)
        }
    } else "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
    this.relatedTarget = b;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY =
        d.screenY || 0) : (this.offsetX = ob || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = ob || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.key = a.key || "";
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId =
        a.pointerId || 0;
    this.pointerType = "string" === typeof a.pointerType ? a.pointerType : ad[a.pointerType] || "";
    this.state = a.state;
    this.Va = a;
    a.defaultPrevented && $c.sa.preventDefault.call(this)
};
$c.prototype.stopPropagation = function() {
    $c.sa.stopPropagation.call(this);
    this.Va.stopPropagation ? this.Va.stopPropagation() : this.Va.cancelBubble = !0
};
$c.prototype.preventDefault = function() {
    $c.sa.preventDefault.call(this);
    var a = this.Va;
    a.preventDefault ? a.preventDefault() : a.returnValue = !1
};
var bd = "closure_listenable_" + (1E6 * Math.random() | 0);
var cd = 0;
var dd = function(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.m = e;
        this.key = ++cd;
        this.gb = this.pb = !1
    },
    ed = function(a) {
        a.gb = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.m = null
    };
var fd = function(a) {
    this.src = a;
    this.D = {};
    this.mb = 0
};
fd.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.D[f];
    a || (a = this.D[f] = [], this.mb++);
    var g = gd(a, b, d, e); - 1 < g ? (b = a[g], c || (b.pb = !1)) : (b = new dd(b, this.src, f, !!d, e), b.pb = c, a.push(b));
    return b
};
fd.prototype.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.D)) return !1;
    var e = this.D[a];
    b = gd(e, b, c, d);
    return -1 < b ? (ed(e[b]), A(null != e.length), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.D[a], this.mb--), !0) : !1
};
var hd = function(a, b) {
    var c = b.type;
    c in a.D && Ka(a.D[c], b) && (ed(b), 0 == a.D[c].length && (delete a.D[c], a.mb--))
};
fd.prototype.mc = function(a, b, c, d) {
    a = this.D[a.toString()];
    var e = -1;
    a && (e = gd(a, b, c, d));
    return -1 < e ? a[e] : null
};
fd.prototype.hasListener = function(a, b) {
    var c = void 0 !== a,
        d = c ? a.toString() : "",
        e = void 0 !== b;
    return Ob(this.D, function(f) {
        for (var g = 0; g < f.length; ++g)
            if (!(c && f[g].type != d || e && f[g].capture != b)) return !0;
        return !1
    })
};
var gd = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.gb && f.listener == b && f.capture == !!c && f.m == d) return e
    }
    return -1
};
var id = "closure_lm_" + (1E6 * Math.random() | 0),
    jd = {},
    kd = 0,
    md = function(a, b, c, d, e) {
        if (d && d.once) return ld(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) md(a, b[f], c, d, e);
            return null
        }
        c = nd(c);
        return a && a[bd] ? a.O(b, c, sa(d) ? !!d.capture : !!d, e) : od(a, b, c, !1, d, e)
    },
    od = function(a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var g = sa(e) ? !!e.capture : !!e,
            h = pd(a);
        h || (a[id] = h = new fd(a));
        c = h.add(b, c, d, g, f);
        if (c.proxy) return c;
        d = qd();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) Yc || (e = g), void 0 ===
            e && (e = !1), a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent) a.attachEvent(rd(b.toString()), d);
        else if (a.addListener && a.removeListener) A("change" === b, "MediaQueryList only has a change event"), a.addListener(d);
        else throw Error("addEventListener and attachEvent are unavailable.");
        kd++;
        return c
    },
    qd = function() {
        var a = sd,
            b = function(c) {
                return a.call(b.src, b.listener, c)
            };
        return b
    },
    ld = function(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) ld(a, b[f], c, d, e);
            return null
        }
        c = nd(c);
        return a &&
            a[bd] ? a.M.add(String(b), c, !0, sa(d) ? !!d.capture : !!d, e) : od(a, b, c, !0, d, e)
    },
    td = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++) td(a, b[f], c, d, e);
        else d = sa(d) ? !!d.capture : !!d, c = nd(c), a && a[bd] ? a.nb(b, c, d, e) : a && (a = pd(a)) && (b = a.mc(b, c, d, e)) && ud(b)
    },
    ud = function(a) {
        if ("number" !== typeof a && a && !a.gb) {
            var b = a.src;
            if (b && b[bd]) hd(b.M, a);
            else {
                var c = a.type,
                    d = a.proxy;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(rd(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                kd--;
                (c = pd(b)) ? (hd(c, a), 0 == c.mb && (c.src = null, b[id] = null)) : ed(a)
            }
        }
    },
    rd = function(a) {
        return a in jd ? jd[a] : jd[a] = "on" + a
    },
    sd = function(a, b) {
        if (a.gb) a = !0;
        else {
            b = new $c(b, this);
            var c = a.listener,
                d = a.m || a.src;
            a.pb && ud(a);
            a = c.call(d, b)
        }
        return a
    },
    pd = function(a) {
        a = a[id];
        return a instanceof fd ? a : null
    },
    vd = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
    nd = function(a) {
        A(a, "Listener can not be null.");
        if ("function" === typeof a) return a;
        A(a.handleEvent, "An object listener must have handleEvent method.");
        a[vd] || (a[vd] =
            function(b) {
                return a.handleEvent(b)
            });
        return a[vd]
    };
var wd = function() {
    this.Bb = new Set;
    this.qd = !1
};
wd.prototype.O = function(a, b, c) {
    a = md(a, b, c);
    this.Bb.add(a);
    return a
};
wd.prototype.nb = function(a) {
    ud(a);
    this.Bb.delete(a)
};
wd.prototype.U = function() {
    this.qd || (this.Bb.forEach(function(a) {
        ud(a)
    }), this.Bb.clear(), this.qd = !0)
};
var xd = function() {
    wd.call(this);
    this.sb = null;
    this.ac = !1
};
u(xd, wd);
var yd = function(a, b) {
    if (a.sb) throw Error("Component already rendered.");
    a.ac = !1;
    a.sb = b
};
xd.prototype.U = function() {
    if (!this.ac) {
        wd.prototype.U.call(this);
        for (var a = this.sb, b; b = a.firstChild;) a.removeChild(b);
        this.sb = null;
        this.ac = !0
    }
};

function zd(a) {
    if (a instanceof Hb)
        if (a instanceof Ib) a = a.ce;
        else throw Error("Unexpected type when unwrapping SafeUrl");
    else a = Yb(a);
    return a
};

function Ad(a, b) {
    a.href = zd(b)
};
var Bd = function() {
    wd.call(this);
    this.la = this.Hb = this.Gb = null;
    this.ee = this.Qd = !1
};
u(Bd, wd);
Bd.prototype.register = function(a, b) {
    var c = this;
    if (this.ee) throw Error("LanguageSelectorModel is already registered.");
    this.ee = !0;
    this.Hb = a;
    this.la = b;
    this.Pd = this.O(this.Hb, "click", function() {
        return Cd(c)
    })
};
var Cd = function(a) {
        a.la.style.visibility = "visible";
        a.la.style.opacity = 1;
        a.nb(a.Pd);
        a.Ff = a.O(document, "mouseup", function(b) {
            return Dd(a, b)
        })
    },
    Dd = function(a, b) {
        a.Gb = b.target.getAttribute("data-languagecode");
        if (null != a.Gb || b.target != a.la) a.nb(a.Ff), a.Ef = a.O(a.la, Zc, function() {
            return Ed(a)
        }), a.la.style.opacity = 0
    },
    Ed = function(a) {
        a.nb(a.Ef);
        a.la.style.visibility = "hidden";
        a.Pd = a.O(a.Hb, "click", function() {
            return Cd(a)
        });
        if (null != a.Gb) {
            var b = vc(a.Gb);
            Ad(document.location, Nb(b))
        }
    };
Bd.prototype.U = function() {
    this.Qd || (wd.prototype.U.call(this), this.la = this.Hb = null, this.Qd = !0)
};
var Fd = function(a) {
    var b = a.origin,
        c = a.dc;
    a = a.languages;
    xd.call(this);
    this.j = b;
    this.nd = c;
    this.Rd = a;
    this.Md = !1
};
u(Fd, xd);
Fd.prototype.Sf = function(a, b, c) {
    yd(this, a);
    Oc(a, Sc, {
        origin: this.j
    }, {
        dc: this.nd,
        languages: this.Rd
    });
    a = Nc("confirm_yes");
    this.O(a, "click", function() {
        (void 0 == document.hasStorageAccess ? Promise.resolve() : document.requestStorageAccess()).then(function() {
            return b()
        }, function() {
            return c()
        })
    });
    a = Nc("confirm_no");
    this.O(a, "click", function() {
        return c()
    });
    Gd(this)
};
Fd.prototype.Tf = function(a, b, c) {
    yd(this, a);
    Oc(a, Tc, {
        origin: this.j
    }, {
        dc: this.nd,
        languages: this.Rd
    });
    a = Nc("confirm_yes");
    this.O(a, "click", function() {
        return b()
    });
    a = Nc("confirm_no");
    this.O(a, "click", function() {
        return c()
    });
    Gd(this)
};
var Gd = function(a) {
    void 0 == a.zb && (a.zb = new Bd);
    var b = Nc("language_selector"),
        c = Nc("language_list");
    a.zb.register(b, c)
};
Fd.prototype.U = function() {
    this.Md || (xd.prototype.U.call(this), void 0 != this.zb && this.zb.U(), this.Md = !0)
};
var Hd, Id, Jd = void 0,
    Kd = function(a) {
        try {
            return x.JSON.parse.call(x.JSON, a)
        } catch (b) {
            return !1
        }
    },
    Ld = function(a) {
        return Object.prototype.toString.call(a)
    },
    Md = Ld(0),
    Nd = Ld(new Date(0)),
    Od = Ld(!0),
    Pd = Ld(""),
    Qd = Ld({}),
    Rd = Ld([]),
    Sd = function(a, b) {
        if (b)
            for (var c = 0, d = b.length; c < d; ++c)
                if (a === b[c]) throw new TypeError("Converting circular structure to JSON");
        d = typeof a;
        if ("undefined" !== d) {
            c = Array.prototype.slice.call(b || [], 0);
            c[c.length] = a;
            b = [];
            var e = Ld(a);
            if (null != a && "function" === typeof a.toJSON && (Object.prototype.hasOwnProperty.call(a,
                    "toJSON") || (e !== Rd || a.constructor !== Array && a.constructor !== Object) && (e !== Qd || a.constructor !== Array && a.constructor !== Object) && e !== Pd && e !== Md && e !== Od && e !== Nd)) return Sd(a.toJSON.call(a), c);
            if (null == a) b[b.length] = "null";
            else if (e === Md) a = Number(a), isNaN(a) || isNaN(a - a) ? a = "null" : -0 === a && 0 > 1 / a && (a = "-0"), b[b.length] = String(a);
            else if (e === Od) b[b.length] = String(!!Number(a));
            else {
                if (e === Nd) return Sd(a.toISOString.call(a), c);
                if (e === Rd && Ld(a.length) === Md) {
                    b[b.length] = "[";
                    var f = 0;
                    for (d = Number(a.length) >> 0; f < d; ++f) f &&
                        (b[b.length] = ","), b[b.length] = Sd(a[f], c) || "null";
                    b[b.length] = "]"
                } else if (e == Pd && Ld(a.length) === Md) {
                    b[b.length] = '"';
                    f = 0;
                    for (c = Number(a.length) >> 0; f < c; ++f) d = String.prototype.charAt.call(a, f), e = String.prototype.charCodeAt.call(a, f), b[b.length] = "\b" === d ? "\\b" : "\f" === d ? "\\f" : "\n" === d ? "\\n" : "\r" === d ? "\\r" : "\t" === d ? "\\t" : "\\" === d || '"' === d ? "\\" + d : 31 >= e ? "\\u" + (e + 65536).toString(16).substr(1) : 32 <= e && 65535 >= e ? d : "\ufffd";
                    b[b.length] = '"'
                } else if ("object" === d) {
                    b[b.length] = "{";
                    d = 0;
                    for (f in a) Object.prototype.hasOwnProperty.call(a,
                        f) && (e = Sd(a[f], c), void 0 !== e && (d++ && (b[b.length] = ","), b[b.length] = Sd(f), b[b.length] = ":", b[b.length] = e));
                    b[b.length] = "}"
                } else return
            }
            return b.join("")
        }
    },
    Td = /[\0-\x07\x0b\x0e-\x1f]/,
    Ud = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*[\0-\x1f]/,
    Vd = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\[^\\\/"bfnrtu]/,
    Wd = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\u([0-9a-fA-F]{0,3}[^0-9a-fA-F])/,
    Xd = /"([^\0-\x1f\\"]|\\[\\\/"bfnrt]|\\u[0-9a-fA-F]{4})*"/g,
    Yd = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/g,
    Zd = /[ \t\n\r]+/g,
    $d = /[^"]:/,
    ae = /""/g,
    be = /true|false|null/g,
    ce = /00/,
    de = /[\{]([^0\}]|0[^:])/,
    ee = /(^|\[)[,:]|[,:](\]|\}|[,:]|$)/,
    fe = /[^\[,:][\[\{]/,
    ge = /^(\{|\}|\[|\]|,|:|0)+/,
    he = /\u2028/g,
    ie = /\u2029/g,
    je = function(a) {
        a = String(a);
        if (Td.test(a) || Ud.test(a) || Vd.test(a) || Wd.test(a)) return !1;
        var b = a.replace(Xd, '""');
        b = b.replace(Yd, "0");
        b = b.replace(Zd, "");
        if ($d.test(b)) return !1;
        b = b.replace(ae, "0");
        b = b.replace(be, "0");
        if (ce.test(b) || de.test(b) || ee.test(b) || fe.test(b) || !b || (b = b.replace(ge, ""))) return !1;
        a = a.replace(he, "\\u2028").replace(ie,
            "\\u2029");
        b = void 0;
        try {
            b = Jd ? [Kd(a)] : eval("(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n" + a + "\n)")
        } catch (c) {
            return !1
        }
        return b && 1 === b.length ? b[0] : !1
    },
    ke = function() {
        var a = ((x.document || {}).scripts || []).length;
        if ((void 0 === Hd || void 0 === Jd || Id !== a) && -1 !== Id) {
            Hd = Jd = !1;
            Id = -1;
            try {
                try {
                    Jd = !!x.JSON && '{"a":[3,true,"1970-01-01T00:00:00.000Z"]}' === x.JSON.stringify.call(x.JSON, {
                        a: [3, !0, new Date(0)],
                        c: function() {}
                    }) && !0 === Kd("true") && 3 === Kd('[{"a":3}]')[0].a
                } catch (b) {}
                Hd = Jd &&
                    !Kd("[00]") && !Kd('"\u0007"') && !Kd('"\\0"') && !Kd('"\\v"')
            } finally {
                Id = a
            }
        }
    },
    le = !Date.prototype.toISOString || "function" !== typeof Date.prototype.toISOString || "1970-01-01T00:00:00.000Z" !== (new Date(0)).toISOString(),
    me = function() {
        var a = Date.prototype.getUTCFullYear.call(this);
        return [0 > a ? "-" + String(1E6 - a).substr(1) : 9999 >= a ? String(1E4 + a).substr(1) : "+" + String(1E6 + a).substr(1), "-", String(101 + Date.prototype.getUTCMonth.call(this)).substr(1), "-", String(100 + Date.prototype.getUTCDate.call(this)).substr(1), "T",
            String(100 + Date.prototype.getUTCHours.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCMinutes.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCSeconds.call(this)).substr(1), ".", String(1E3 + Date.prototype.getUTCMilliseconds.call(this)).substr(1), "Z"
        ].join("")
    };
Date.prototype.toISOString = le ? me : Date.prototype.toISOString;
var ne, oe = !1,
    F = function(a) {
        try {
            oe && window.console && window.console.log && window.console.log(a)
        } catch (b) {}
    },
    pe = function(a, b) {
        if (!a) return -1;
        if (a.indexOf) return a.indexOf(b, void 0);
        for (var c = 0, d = a.length; c < d; c++)
            if (a[c] === b) return c;
        return -1
    },
    G = function(a, b) {
        function c() {}
        if (!a) throw Error("Child class cannot be empty.");
        if (!b) throw Error("Parent class cannot be empty.");
        c.prototype = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a
    },
    qe = function(a) {
        return "[object Function]" === Object.prototype.toString.call(a)
    },
    re = function(a) {
        var b = [],
            c;
        for (c in a)
            if (a.hasOwnProperty(c)) {
                var d = a[c];
                if (null === d || void 0 === d) d = "";
                b.push(encodeURIComponent(c) + "=" + encodeURIComponent(d))
            }
        return b.join("&")
    },
    se = function(a) {
        var b = window.location.hash;
        a = new RegExp("[&#]" + a + "=([^&]*)");
        b = decodeURIComponent(b);
        b = a.exec(b);
        return null == b ? "" : b[1].replace(/\+/g, " ")
    },
    te = function(a, b, c) {
        if (a.addEventListener) a.addEventListener(b, c, !1);
        else if (a.attachEvent) a.attachEvent("on" + b, c);
        else throw Error("Add event handler for " + b + " failed.");
    },
    ue = function(a, b) {
        a = (a || "").split(" ");
        b = (b || "").split(" ");
        for (var c = 0; c < b.length; c++)
            if (b[c] && 0 > pe(a, b[c])) return !1;
        return !0
    },
    ve = function() {
        if ("undefined" != typeof ne) return ne;
        a: {
            try {
                if (window.localStorage) {
                    var a = window.localStorage;
                    break a
                }
            } catch (b) {}
            a = void 0
        }
        if (!a) return ne = !1;
        try {
            a.setItem("test", "test"), a.removeItem("test"), ne = !0
        } catch (b) {
            ne = !1
        }
        return ne
    },
    we = function() {
        var a = navigator.userAgent.toLowerCase();
        return -1 != a.indexOf("msie") && 8 == parseInt(a.split("msie")[1], 10)
    },
    xe = function() {
        return Object.hasOwnProperty.call(window,
            "ActiveXObject") && !window.ActiveXObject
    },
    ye = function() {
        var a = navigator.userAgent.toLowerCase();
        return 0 > a.indexOf("edge/") && (-1 < a.indexOf("chrome/") || -1 < a.indexOf("crios/"))
    },
    ze = function() {
        var a = navigator.userAgent,
            b;
        if (b = !!a && -1 != a.indexOf("CriOS")) b = -1, (a = a.match(/CriOS\/(\d+)/)) && a[1] && (b = parseInt(a[1], 10) || -1), b = 48 > b;
        return b
    },
    Ae = function() {
        var a = navigator.userAgent.toLowerCase();
        return -1 < a.indexOf("safari/") && 0 > a.indexOf("chrome/") && 0 > a.indexOf("crios/") && 0 > a.indexOf("android")
    },
    I = window.JSON,
    Be = function(a) {
        this.Sc = a || [];
        this.P = {}
    };
Be.prototype.addEventListener = function(a, b) {
    if (!(0 <= pe(this.Sc, a))) throw Error("Unrecognized event type: " + a);
    if (!qe(b)) throw Error("The listener for event '" + a + "' is not a function.");
    this.P[a] || (this.P[a] = []);
    0 > pe(this.P[a], b) && this.P[a].push(b)
};
Be.prototype.removeEventListener = function(a, b) {
    if (!(0 <= pe(this.Sc, a))) throw Error("Unrecognized event type: " + a);
    qe(b) && this.P[a] && this.P[a].length && (b = pe(this.P[a], b), 0 <= b && this.P[a].splice(b, 1))
};
Be.prototype.dispatchEvent = function(a) {
    var b = a.type;
    if (!(b && 0 <= pe(this.Sc, b))) throw Error("Failed to dispatch unrecognized event type: " + b);
    if (this.P[b] && this.P[b].length)
        for (var c = 0, d = this.P[b].length; c < d; c++) this.P[b][c](a)
};
I = {
    parse: function(a) {
        a = "[" + String(a) + "]"; - 1 === Id ? a = !1 : (ke(), a = (Hd ? Kd : je)(a));
        if (!1 === a || 1 !== a.length) throw new SyntaxError("JSON parsing failed.");
        return a[0]
    },
    stringify: function(a) {
        -1 !== Id ? (ke(), a = Jd ? x.JSON.stringify.call(x.JSON, a) : Sd(a)) : a = void 0;
        return a
    }
};
var Ce = function(a) {
    this.gd = a
};
var De = function(a, b, c) {
    this.Za = a;
    this.Le = b;
    this.ub = c || [];
    this.wa = new Map
};
m = De.prototype;
m.eg = function(a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    this.wa.set(this.yd(c), [new Ce(a)])
};
m.wd = function(a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    b = this.yd(b);
    return this.wa.has(b) ? this.wa.get(b) : void 0
};
m.lf = function(a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    return (b = this.wd(b)) && b.length ? b[0] : void 0
};
m.clear = function() {
    this.wa.clear()
};
m.yd = function(a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    return b ? b.join(",") : "key"
};
var Ee = function(a, b) {
    De.call(this, a, 3, b)
};
u(Ee, De);
Ee.prototype.Ed = function(a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    this.xb(1, b)
};
Ee.prototype.xb = function(a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    d = 0;
    var e = this.lf(c);
    e && (d = e.gd);
    this.eg(d + a, c)
};
var J = function() {
    Vc.call(this);
    this.M = new fd(this);
    this.Be = this;
    this.zc = null
};
z(J, Vc);
J.prototype[bd] = !0;
m = J.prototype;
m.addEventListener = function(a, b, c, d) {
    md(this, a, b, c, d)
};
m.removeEventListener = function(a, b, c, d) {
    td(this, a, b, c, d)
};
m.dispatchEvent = function(a) {
    Fe(this);
    var b = this.zc;
    if (b) {
        var c = [];
        for (var d = 1; b; b = b.zc) c.push(b), A(1E3 > ++d, "infinite loop")
    }
    b = this.Be;
    d = a.type || a;
    if ("string" === typeof a) a = new Xc(a, b);
    else if (a instanceof Xc) a.target = a.target || b;
    else {
        var e = a;
        a = new Xc(d, b);
        Qb(a, e)
    }
    e = !0;
    if (c)
        for (var f = c.length - 1; !a.bb && 0 <= f; f--) {
            var g = a.currentTarget = c[f];
            e = Ge(g, d, !0, a) && e
        }
    a.bb || (g = a.currentTarget = b, e = Ge(g, d, !0, a) && e, a.bb || (e = Ge(g, d, !1, a) && e));
    if (c)
        for (f = 0; !a.bb && f < c.length; f++) g = a.currentTarget = c[f], e = Ge(g, d, !1, a) &&
            e;
    return e
};
m.da = function() {
    J.sa.da.call(this);
    if (this.M) {
        var a = this.M,
            b = 0,
            c;
        for (c in a.D) {
            for (var d = a.D[c], e = 0; e < d.length; e++) ++b, ed(d[e]);
            delete a.D[c];
            a.mb--
        }
    }
    this.zc = null
};
m.O = function(a, b, c, d) {
    Fe(this);
    return this.M.add(String(a), b, !1, c, d)
};
m.nb = function(a, b, c, d) {
    this.M.remove(String(a), b, c, d)
};
var Ge = function(a, b, c, d) {
    b = a.M.D[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
        var g = b[f];
        if (g && !g.gb && g.capture == c) {
            var h = g.listener,
                k = g.m || g.src;
            g.pb && hd(a.M, g);
            e = !1 !== h.call(k, d) && e
        }
    }
    return e && !d.defaultPrevented
};
J.prototype.mc = function(a, b, c, d) {
    return this.M.mc(String(a), b, c, d)
};
J.prototype.hasListener = function(a, b) {
    return this.M.hasListener(void 0 !== a ? String(a) : void 0, b)
};
var Fe = function(a) {
    A(a.M, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
};
var He = function(a, b) {
    J.call(this);
    this.yb = a || 1;
    this.lb = b || x;
    this.cd = wa(this.qg, this);
    this.Ud = Date.now()
};
z(He, J);
m = He.prototype;
m.enabled = !1;
m.l = null;
m.setInterval = function(a) {
    this.yb = a;
    this.l && this.enabled ? (this.stop(), this.start()) : this.l && this.stop()
};
m.qg = function() {
    if (this.enabled) {
        var a = Date.now() - this.Ud;
        0 < a && a < .8 * this.yb ? this.l = this.lb.setTimeout(this.cd, this.yb - a) : (this.l && (this.lb.clearTimeout(this.l), this.l = null), this.dispatchEvent("tick"), this.enabled && (this.stop(), this.start()))
    }
};
m.start = function() {
    this.enabled = !0;
    this.l || (this.l = this.lb.setTimeout(this.cd, this.yb), this.Ud = Date.now())
};
m.stop = function() {
    this.enabled = !1;
    this.l && (this.lb.clearTimeout(this.l), this.l = null)
};
m.da = function() {
    He.sa.da.call(this);
    this.stop();
    delete this.lb
};
var Ie = function(a, b, c) {
    if ("function" === typeof a) c && (a = wa(a, c));
    else if (a && "function" == typeof a.handleEvent) a = wa(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(b) ? -1 : x.setTimeout(a, b || 0)
};
var Je = function(a) {
    this.og = a;
    this.Db = new Map;
    this.Xe = new Set;
    this.uc = 0;
    this.yf = 100;
    this.jf = 3E4;
    this.s = new He(this.jf);
    this.s.O("tick", this.Gc, !1, this);
    this.ag = !1
};
m = Je.prototype;
m.Gc = function() {
    var a = this.Db.values();
    a = [].concat(a instanceof Array ? a : fa(t(a))).filter(function(b) {
        return b.wa.size
    });
    a.length && this.og.flush(a, this.ag);
    Ke(a);
    this.uc = 0;
    this.s.enabled && this.s.stop()
};
m.Ce = function(a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    this.Db.has(a) || this.Db.set(a, new Ee(a, c))
};
m.nc = function(a) {
    return this.Xe.has(a) ? void 0 : this.Db.get(a)
};
m.Ed = function(a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    this.xb.apply(this, [a, 1].concat(c instanceof Array ? c : fa(t(c))))
};
m.xb = function(a, b, c) {
    for (var d = [], e = 2; e < arguments.length; ++e) d[e - 2] = arguments[e];
    (e = this.nc(a)) && e instanceof Ee && (e.xb(b, d), this.s.enabled || this.s.start(), this.uc++, this.uc >= this.yf && this.Gc())
};
var Ke = function(a) {
    for (var b = 0; b < a.length; b++) a[b].clear()
};
var Le = function(a) {
    this.Za = "/client_streamz/google_sign_in_web_client/idpiframe/cookie_blocked_count";
    this.Jc = a;
    this.Jc.Ce(this.Za, {
        sd: 3,
        rd: "browser"
    }, {
        sd: 3,
        rd: "browser_version"
    })
};
Le.prototype.sc = function(a, b) {
    this.Jc.Ed(this.Za, a, b)
};
Le.prototype.nc = function() {
    return this.Jc.nc(this.Za)
};
A(!0);
var Me = "function" === typeof Uint8Array;

function Ne(a) {
    return null !== a && "object" === typeof a && a.constructor === Object
}

function Oe(a, b) {
    if (null != a) return Array.isArray(a) || Ne(a) ? Pe(a, b) : b(a)
}

function Pe(a, b) {
    if (Array.isArray(a)) {
        for (var c = Array(a.length), d = 0; d < a.length; d++) c[d] = Oe(a[d], b);
        Array.isArray(a) && a.Bf && Qe(c);
        return c
    }
    c = {};
    for (d in a) c[d] = Oe(a[d], b);
    return c
}

function Re(a) {
    switch (typeof a) {
        case "number":
            return isFinite(a) ? a : String(a);
        case "object":
            return Me && null != a && a instanceof Uint8Array ? Bb(a) : a;
        default:
            return a
    }
}

function Se(a) {
    return Me && null != a && a instanceof Uint8Array ? new Uint8Array(a) : a
}
var Te = {
        Bf: {
            value: !0,
            configurable: !0
        }
    },
    Qe = function(a) {
        Array.isArray(a) && !Object.isFrozen(a) && Object.defineProperties(a, Te);
        return a
    },
    Ue, Ve = Symbol("exempted jspb subclass"),
    We = Symbol("generated by jspb");
var Ye = function(a, b) {
    this.ba = a;
    this.Na = b;
    this.map = {};
    this.Qa = !0;
    this.Vd = null;
    if (0 < this.ba.length) {
        for (a = 0; a < this.ba.length; a++) {
            b = this.ba[a];
            var c = b[0];
            this.map[c.toString()] = new Xe(c, b[1])
        }
        this.Qa = !0
    }
};
m = Ye.prototype;
m.isFrozen = function() {
    return !1
};
m.toJSON = function() {
    var a = this.S();
    return Ue ? a : Pe(a, Re)
};
m.S = function() {
    if (this.Qa) {
        if (this.Na) {
            var a = this.map,
                b;
            for (b in a)
                if (Object.prototype.hasOwnProperty.call(a, b)) {
                    var c = a[b].ta;
                    c && c.S()
                }
        }
    } else {
        this.ba.length = 0;
        a = Ze(this);
        a.sort();
        for (b = 0; b < a.length; b++) {
            c = this.map[a[b]];
            var d = c.ta;
            d && d.S();
            this.ba.push([c.key, c.value])
        }
        this.Qa = !0
    }
    return this.ba
};
m.clear = function() {
    this.map = {};
    this.Qa = !1
};
m.entries = function() {
    var a = [],
        b = Ze(this);
    b.sort();
    for (var c = 0; c < b.length; c++) {
        var d = this.map[b[c]];
        a.push([d.key, $e(this, d)])
    }
    return new af(a)
};
m.keys = function() {
    var a = [],
        b = Ze(this);
    b.sort();
    for (var c = 0; c < b.length; c++) a.push(this.map[b[c]].key);
    return new af(a)
};
m.values = function() {
    var a = [],
        b = Ze(this);
    b.sort();
    for (var c = 0; c < b.length; c++) a.push($e(this, this.map[b[c]]));
    return new af(a)
};
m.forEach = function(a, b) {
    var c = Ze(this);
    c.sort();
    for (var d = 0; d < c.length; d++) {
        var e = this.map[c[d]];
        a.call(b, $e(this, e), e.key, this)
    }
};
m.set = function(a, b) {
    var c = new Xe(a);
    this.Na ? (c.ta = b, c.value = b.S()) : c.value = b;
    this.map[a.toString()] = c;
    this.Qa = !1;
    return this
};
var $e = function(a, b) {
    return a.Na ? (b.ta || (b.ta = new a.Na(b.value), a.isFrozen() && (A(null != a.Vd), a.Vd(b.ta))), b.ta) : b.value
};
Ye.prototype.get = function(a) {
    if (a = this.map[a.toString()]) return $e(this, a)
};
Ye.prototype.has = function(a) {
    return a.toString() in this.map
};
var Ze = function(a) {
    a = a.map;
    var b = [],
        c;
    for (c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
    return b
};
Ye.prototype[Symbol.iterator] = function() {
    return this.entries()
};
var Xe = function(a, b) {
        this.key = a;
        this.value = b;
        this.ta = void 0
    },
    af = function(a) {
        this.Bd = 0;
        this.ba = a
    };
af.prototype.next = function() {
    return this.Bd < this.ba.length ? {
        done: !1,
        value: this.ba[this.Bd++]
    } : {
        done: !0,
        value: void 0
    }
};
af.prototype[Symbol.iterator] = function() {
    return this
};
var bf;
var K = function(a, b, c) {
        Ga(this, K, "The message constructor should only be used by subclasses");
        A(this.constructor !== K, "Message is an abstract class and cannot be directly constructed");
        if (!0 !== this[Ve]) {
            A(!0 === this[We], "Message can only be subclassed by proto gencode.");
            var d = Object.getPrototypeOf(A(Object.getPrototypeOf(this)));
            A(d.hasOwnProperty(We), "Generated jspb classes should not be extended")
        }
        d = bf;
        bf = null;
        a || (a = d);
        d = this.constructor.zg;
        a || (a = d ? [d] : []);
        this.ua = (d ? 0 : -1) - (this.constructor.xg || 0);
        this.i = null;
        this.fa = a;
        a: {
            d = this.fa.length;a = d - 1;
            if (d && (d = this.fa[a], Ne(d))) {
                this.Ha = a - this.ua;
                this.ka = d;
                break a
            }
            void 0 !== b && -1 < b ? (this.Ha = Math.max(b, a + 1 - this.ua), this.ka = null) : this.Ha = Number.MAX_VALUE
        }
        if (c)
            for (b = 0; b < c.length; b++) a = c[b], a < this.Ha ? (a += this.ua, (d = this.fa[a]) ? Qe(d) : this.fa[a] = cf) : (df(this), (d = this.ka[a]) ? Qe(d) : this.ka[a] = cf)
    },
    cf = Object.freeze(Qe([])),
    df = function(a) {
        var b = a.Ha + a.ua;
        a.fa[b] || (a.ka = a.fa[b] = {})
    },
    ef = function(a, b, c) {
        return -1 === b ? null : (void 0 === c ? 0 : c) || b >= a.Ha ? a.ka ? a.ka[b] :
            void 0 : a.fa[b + a.ua]
    },
    ff = function(a, b) {
        var c = void 0 === c ? !1 : c;
        var d = ef(a, b, c);
        null == d && (d = cf);
        d === cf && (d = Qe([]), L(a, b, d, c));
        return d
    },
    gf = function(a, b) {
        a = ef(a, 1);
        return null == a ? b : a
    },
    hf = function(a, b, c) {
        a.i || (a.i = {});
        if (b in a.i) return a.i[b];
        var d = ef(a, b);
        d || (d = Qe([]), L(a, b, d));
        c = new Ye(d, c);
        return a.i[b] = c
    },
    L = function(a, b, c, d) {
        (void 0 === d ? 0 : d) || b >= a.Ha ? (df(a), a.ka[b] = c) : a.fa[b + a.ua] = c;
        return a
    },
    jf = function(a, b, c) {
        var d = void 0 === d ? !1 : d;
        return L(a, b, Qe(c || []), d)
    },
    kf = function(a, b, c, d) {
        for (var e = 0, f = 0; f <
            c.length; f++) {
            var g = c[f];
            null != ef(a, g) && (0 !== e && L(a, e, void 0), e = g)
        }(c = e) && c !== b && null != d && (a.i && c in a.i && (a.i[c] = void 0), L(a, c, void 0));
        L(a, b, d)
    },
    lf = function(a, b, c, d, e) {
        if (-1 === c) return null;
        a.i || (a.i = {});
        !a.i[c] && (e = ef(a, c, void 0 === e ? !1 : e), d || e) && (a.i[c] = new b(e));
        return a.i[c]
    },
    mf = function(a, b, c) {
        a.i || (a.i = {});
        var d = a.i[c];
        if (!d) {
            var e = ff(a, c);
            d = [];
            for (var f = 0; f < e.length; f++) d[f] = new b(e[f]);
            a.i[c] = d
        }
        return d
    },
    nf = function(a, b, c) {
        var d = void 0 === d ? !1 : d;
        a.i || (a.i = {});
        var e = c ? c.S() : c;
        a.i[b] = c;
        return L(a,
            b, e, d)
    },
    of = function(a, b, c) {
        var d = void 0 === d ? !1 : d;
        if (c) {
            var e = Qe([]);
            for (var f = 0; f < c.length; f++) e[f] = c[f].S();
            a.i || (a.i = {});
            a.i[b] = c
        } else a.i && (a.i[b] = void 0), e = cf;
        return L(a, b, e, d)
    };
K.prototype.toJSON = function() {
    var a = this.S();
    return Ue ? a : Pe(a, Re)
};
K.prototype.S = function() {
    if (this.i)
        for (var a in this.i) {
            var b = this.i[a];
            if (Array.isArray(b))
                for (var c = 0; c < b.length; c++) b[c] && b[c].S();
            else b && b.S()
        }
    return this.fa
};

function pf(a, b) {
    return Re(b)
}
var qf = function(a) {
    Ue = !0;
    try {
        return JSON.stringify(a.toJSON(), pf)
    } finally {
        Ue = !1
    }
};
K.prototype.toString = function() {
    return this.S().toString()
};
K.prototype.getExtension = function(a) {
    var b = a.hf,
        c = a.Re;
    return a.Af ? c ? mf(this, c, b) : ff(this, b) : c ? lf(this, c, b, void 0, !0) : ef(this, b, !0)
};
K.prototype.clone = function() {
    var a = Ga(this, K),
        b = a.constructor,
        c = Pe(a.S(), Se);
    bf = c;
    b = new b(c);
    bf = null;
    rf(b, a);
    return b
};

function rf(a, b) {
    A(a, "expected `to` to be non-null");
    A(b, "expected `from` to be non-null");
    b.Gd && (a.Gd = b.Gd.slice());
    var c = b.i;
    if (c) {
        b = b.ka;
        var d = {},
            e;
        for (e in c) {
            var f = c[e];
            if (f) {
                var g = !(!b || !b[e]),
                    h = +e;
                if (Array.isArray(f)) {
                    if (f.length)
                        for (g = mf(a, f[0].constructor, h), h = 0; h < Math.min(g.length, f.length); h++) rf(g[h], Ga(f[h], K))
                } else f instanceof Ye ? f.Na && (d.Pb = hf(a, h, f.Na), f.forEach(function(k) {
                    return function(l, p) {
                        return rf(k.Pb.get(p), l)
                    }
                }(d))) : (Ga(f, K), (g = lf(a, f.constructor, h, void 0, g)) && rf(g, f))
            }
            d = {
                Pb: d.Pb
            }
        }
    }
};
var M = function() {
    K.apply(this, arguments)
};
u(M, K);
M.prototype[We] = !0;
var tf = function(a) {
    M.call(this, a, -1, sf)
};
u(tf, M);
var sf = [2];
var uf = function(a) {
    if (!a) return "";
    a = a.split("#")[0].split("?")[0];
    a = a.toLowerCase();
    0 == a.indexOf("//") && (a = window.location.protocol + a);
    /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
    var b = a.substring(a.indexOf("://") + 3),
        c = b.indexOf("/"); - 1 != c && (b = b.substring(0, c));
    c = a.substring(0, a.indexOf("://"));
    if (!c) throw Error("URI is missing protocol: " + a);
    if ("http" !== c && "https" !== c && "chrome-extension" !== c && "moz-extension" !== c && "file" !== c && "android-app" !== c && "chrome-search" !== c && "chrome-untrusted" !== c && "chrome" !==
        c && "app" !== c && "devtools" !== c) throw Error("Invalid URI scheme in origin: " + c);
    a = "";
    var d = b.indexOf(":");
    if (-1 != d) {
        var e = b.substring(d + 1);
        b = b.substring(0, d);
        if ("http" === c && "80" !== e || "https" === c && "443" !== e) a = ":" + e
    }
    return c + "://" + b + a
};

function vf() {
    function a() {
        e[0] = 1732584193;
        e[1] = 4023233417;
        e[2] = 2562383102;
        e[3] = 271733878;
        e[4] = 3285377520;
        p = l = 0
    }

    function b(q) {
        for (var w = g, r = 0; 64 > r; r += 4) w[r / 4] = q[r] << 24 | q[r + 1] << 16 | q[r + 2] << 8 | q[r + 3];
        for (r = 16; 80 > r; r++) q = w[r - 3] ^ w[r - 8] ^ w[r - 14] ^ w[r - 16], w[r] = (q << 1 | q >>> 31) & 4294967295;
        q = e[0];
        var v = e[1],
            y = e[2],
            H = e[3],
            X = e[4];
        for (r = 0; 80 > r; r++) {
            if (40 > r)
                if (20 > r) {
                    var U = H ^ v & (y ^ H);
                    var ua = 1518500249
                } else U = v ^ y ^ H, ua = 1859775393;
            else 60 > r ? (U = v & y | H & (v | y), ua = 2400959708) : (U = v ^ y ^ H, ua = 3395469782);
            U = ((q << 5 | q >>> 27) & 4294967295) +
                U + X + ua + w[r] & 4294967295;
            X = H;
            H = y;
            y = (v << 30 | v >>> 2) & 4294967295;
            v = q;
            q = U
        }
        e[0] = e[0] + q & 4294967295;
        e[1] = e[1] + v & 4294967295;
        e[2] = e[2] + y & 4294967295;
        e[3] = e[3] + H & 4294967295;
        e[4] = e[4] + X & 4294967295
    }

    function c(q, w) {
        if ("string" === typeof q) {
            q = unescape(encodeURIComponent(q));
            for (var r = [], v = 0, y = q.length; v < y; ++v) r.push(q.charCodeAt(v));
            q = r
        }
        w || (w = q.length);
        r = 0;
        if (0 == l)
            for (; r + 64 < w;) b(q.slice(r, r + 64)), r += 64, p += 64;
        for (; r < w;)
            if (f[l++] = q[r++], p++, 64 == l)
                for (l = 0, b(f); r + 64 < w;) b(q.slice(r, r + 64)), r += 64, p += 64
    }

    function d() {
        var q = [],
            w = 8 * p;
        56 > l ? c(h, 56 - l) : c(h, 64 - (l - 56));
        for (var r = 63; 56 <= r; r--) f[r] = w & 255, w >>>= 8;
        b(f);
        for (r = w = 0; 5 > r; r++)
            for (var v = 24; 0 <= v; v -= 8) q[w++] = e[r] >> v & 255;
        return q
    }
    for (var e = [], f = [], g = [], h = [128], k = 1; 64 > k; ++k) h[k] = 0;
    var l, p;
    a();
    return {
        reset: a,
        update: c,
        digest: d,
        Ue: function() {
            for (var q = d(), w = "", r = 0; r < q.length; r++) w += "0123456789ABCDEF".charAt(Math.floor(q[r] / 16)) + "0123456789ABCDEF".charAt(q[r] % 16);
            return w
        }
    }
};
var xf = function(a, b, c) {
        var d = String(x.location.href);
        return d && a && b ? [b, wf(uf(d), a, c || null)].join(" ") : null
    },
    wf = function(a, b, c) {
        var d = [],
            e = [];
        if (1 == (Array.isArray(c) ? 2 : 1)) return e = [b, a], Ja(d, function(h) {
            e.push(h)
        }), yf(e.join(" "));
        var f = [],
            g = [];
        Ja(c, function(h) {
            g.push(h.key);
            f.push(h.value)
        });
        c = Math.floor((new Date).getTime() / 1E3);
        e = 0 == f.length ? [c, b, a] : [f.join(":"), c, b, a];
        Ja(d, function(h) {
            e.push(h)
        });
        a = yf(e.join(" "));
        a = [c, a];
        0 == g.length || a.push(g.join(""));
        return a.join("_")
    },
    yf = function(a) {
        var b =
            vf();
        b.update(a);
        return b.Ue().toLowerCase()
    };
var zf = {};
var Af = function(a) {
    this.tb = a || {
        cookie: ""
    }
};
m = Af.prototype;
m.isEnabled = function() {
    if (!x.navigator.cookieEnabled) return !1;
    if (this.tb.cookie) return !0;
    this.set("TESTCOOKIESENABLED", "1", {
        Wd: 60
    });
    if ("1" !== this.get("TESTCOOKIESENABLED")) return !1;
    this.remove("TESTCOOKIESENABLED");
    return !0
};
m.set = function(a, b, c) {
    var d = !1;
    if ("object" === typeof c) {
        var e = c.Ag;
        d = c.$f || !1;
        var f = c.domain || void 0;
        var g = c.path || void 0;
        var h = c.Wd
    }
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === h && (h = -1);
    this.tb.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (g ? ";path=" + g : "") + (0 > h ? "" : 0 == h ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * h)).toUTCString()) + (d ? ";secure" : "") + (null != e ? ";samesite=" + e : "")
};
m.get = function(a, b) {
    for (var c = a + "=", d = (this.tb.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
        f = La(d[e]);
        if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
        if (f == a) return ""
    }
    return b
};
m.remove = function(a, b, c) {
    var d = void 0 !== this.get(a);
    this.set(a, "", {
        Wd: 0,
        path: b,
        domain: c
    });
    return d
};
m.clear = function() {
    for (var a = Bf(this).keys, b = a.length - 1; 0 <= b; b--) this.remove(a[b])
};
var Bf = function(a) {
        a = (a.tb.cookie || "").split(";");
        for (var b = [], c = [], d, e, f = 0; f < a.length; f++) e = La(a[f]), d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
        return {
            keys: b,
            values: c
        }
    },
    Cf = new Af("undefined" == typeof document ? null : document);
var Df = function(a) {
        return !!zf.FPA_SAMESITE_PHASE2_MOD || !(void 0 === a || !a)
    },
    Ef = function(a, b, c, d) {
        (a = x[a]) || (a = (new Af(document)).get(b));
        return a ? xf(a, c, d) : null
    },
    Ff = function(a, b) {
        b = void 0 === b ? !1 : b;
        var c = uf(String(x.location.href)),
            d = [];
        var e = b;
        e = void 0 === e ? !1 : e;
        var f = x.__SAPISID || x.__APISID || x.__3PSAPISID || x.__OVERRIDE_SID;
        Df(e) && (f = f || x.__1PSAPISID);
        if (f) e = !0;
        else {
            var g = new Af(document);
            f = g.get("SAPISID") || g.get("APISID") || g.get("__Secure-3PAPISID") || g.get("SID");
            Df(e) && (f = f || g.get("__Secure-1PAPISID"));
            e = !!f
        }
        e && (e = (c = 0 == c.indexOf("https:") || 0 == c.indexOf("chrome-extension:") || 0 == c.indexOf("moz-extension:")) ? x.__SAPISID : x.__APISID, e || (e = new Af(document), e = e.get(c ? "SAPISID" : "APISID") || e.get("__Secure-3PAPISID")), (e = e ? xf(e, c ? "SAPISIDHASH" : "APISIDHASH", a) : null) && d.push(e), c && Df(b) && ((b = Ef("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", a)) && d.push(b), (a = Ef("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", a)) && d.push(a)));
        return 0 == d.length ? null : d.join(" ")
    };
var Hf = function(a) {
    M.call(this, a, -1, Gf)
};
u(Hf, M);
var Jf = function(a) {
    M.call(this, a, -1, If)
};
u(Jf, M);
var Kf = function(a) {
    M.call(this, a)
};
u(Kf, M);
var Lf = function(a) {
    M.call(this, a)
};
u(Lf, M);
var Gf = [3, 6, 4],
    If = [1],
    Mf = [1, 2, 3],
    Nf = [1, 2, 3];
var Pf = function(a) {
    M.call(this, a, -1, Of)
};
u(Pf, M);
var Of = [1];
var Qf = function(a, b) {
    this.name = a;
    this.value = b
};
Qf.prototype.toString = function() {
    return this.name
};
var Rf = new Qf("OFF", Infinity),
    Sf = new Qf("SEVERE", 1E3),
    Tf = new Qf("WARNING", 900),
    Uf = new Qf("INFO", 800),
    Vf = new Qf("CONFIG", 700),
    Wf = new Qf("FINE", 500),
    Xf = function() {
        this.rb = 0;
        this.clear()
    },
    Yf;
Xf.prototype.clear = function() {
    this.dd = Array(this.rb);
    this.md = -1;
    this.Hd = !1
};
var Zf = function(a, b, c) {
    this.reset(a || Rf, b, c, void 0, void 0)
};
Zf.prototype.reset = function() {};
var $f = function(a, b) {
        this.level = null;
        this.uf = [];
        this.parent = (void 0 === b ? null : b) || null;
        this.children = [];
        this.R = {
            oc: function() {
                return a
            }
        }
    },
    ag = function(a) {
        if (a.level) return a.level;
        if (a.parent) return ag(a.parent);
        Ca("Root logger has no level set.");
        return Rf
    },
    bg = function(a, b) {
        for (; a;) a.uf.forEach(function(c) {
            c(b)
        }), a = a.parent
    },
    cg = function() {
        this.entries = {};
        var a = new $f("");
        a.level = Vf;
        this.entries[""] = a
    },
    dg, eg = function(a, b, c) {
        var d = a.entries[b];
        if (d) return void 0 !== c && (d.level = c), d;
        d = eg(a, b.substr(0,
            b.lastIndexOf(".")));
        var e = new $f(b, d);
        a.entries[b] = e;
        d.children.push(e);
        void 0 !== c && (e.level = c);
        return e
    },
    fg = function() {
        dg || (dg = new cg);
        return dg
    },
    gg = function(a, b, c) {
        var d;
        if (d = a)
            if (d = a && b) {
                d = b.value;
                var e = a ? ag(eg(fg(), a.oc())) : Rf;
                d = d >= e.value
            }
        if (d) {
            b = b || Rf;
            d = eg(fg(), a.oc());
            "function" === typeof c && (c = c());
            Yf || (Yf = new Xf);
            e = Yf;
            a = a.oc();
            if (0 < e.rb) {
                var f = (e.md + 1) % e.rb;
                e.md = f;
                e.Hd ? (e = e.dd[f], e.reset(b, c, a), a = e) : (e.Hd = f == e.rb - 1, a = e.dd[f] = new Zf(b, c, a))
            } else a = new Zf(b, c, a);
            bg(d, a)
        }
    },
    hg = function(a, b) {
        a &&
            gg(a, Uf, b)
    },
    N = function(a, b) {
        a && gg(a, Wf, b)
    };
var ig = function(a) {
    A(0 < a, "Initial value must be greater than zero.");
    A(3E5 >= a, "Max value should be at least as large as initial value.");
    A(!0, "Randomness factor should be between 0 and 1.");
    this.Fd = a;
    this.Xd = 3E5;
    this.Sa = this.za = a;
    this.de = .1;
    this.Ge = 2
};
ig.prototype.reset = function() {
    this.Sa = this.za = this.Fd
};
var jg = function() {};
jg.prototype.fd = null;
var lg = function(a) {
    var b;
    (b = a.fd) || (b = {}, kg(a) && (b[0] = !0, b[1] = !0), b = a.fd = b);
    return b
};
var mg, ng = function() {};
z(ng, jg);
var og = function(a) {
        return (a = kg(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    },
    kg = function(a) {
        if (!a.Cd && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.Cd = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.Cd
    };
mg = new ng;
var O = function(a) {
    J.call(this);
    this.headers = new Map;
    this.Ob = a || null;
    this.ha = !1;
    this.Nb = this.g = null;
    this.Ya = this.Td = this.Ab = "";
    this.qa = this.rc = this.wb = this.hc = !1;
    this.La = 0;
    this.Kb = null;
    this.fe = "";
    this.Mb = this.Qf = this.Tc = !1;
    this.Nc = null
};
z(O, J);
O.prototype.K = eg(fg(), "goog.net.XhrIo", void 0).R;
var pg = /^https?$/i,
    qg = ["POST", "PUT"],
    rg = [],
    sg = function(a, b, c, d, e, f, g) {
        var h = new O;
        rg.push(h);
        b && h.O("complete", b);
        h.M.add("ready", h.Ne, !0, void 0, void 0);
        f && (h.La = Math.max(0, f));
        g && (h.Tc = g);
        h.send(a, c, d, e)
    };
O.prototype.Ne = function() {
    this.U();
    Ka(rg, this)
};
O.prototype.setTrustToken = function(a) {
    this.Nc = a
};
O.prototype.send = function(a, b, c, d) {
    if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.Ab + "; newUri=" + a);
    b = b ? b.toUpperCase() : "GET";
    this.Ab = a;
    this.Ya = "";
    this.Td = b;
    this.hc = !1;
    this.ha = !0;
    this.g = this.Ob ? og(this.Ob) : og(mg);
    this.Nb = this.Ob ? lg(this.Ob) : lg(mg);
    this.g.onreadystatechange = wa(this.ae, this);
    this.Qf && "onprogress" in this.g && (this.g.onprogress = wa(function(g) {
        this.$d(g, !0)
    }, this), this.g.upload && (this.g.upload.onprogress = wa(this.$d, this)));
    try {
        N(this.K, P(this, "Opening Xhr")),
            this.rc = !0, this.g.open(b, String(a), !0), this.rc = !1
    } catch (g) {
        N(this.K, P(this, "Error opening Xhr: " + g.message));
        tg(this, g);
        return
    }
    a = c || "";
    c = new Map(this.headers);
    if (d)
        if (Object.getPrototypeOf(d) === Object.prototype)
            for (var e in d) c.set(e, d[e]);
        else if ("function" === typeof d.keys && "function" === typeof d.get) {
        e = t(d.keys());
        for (var f = e.next(); !f.done; f = e.next()) f = f.value, c.set(f, d.get(f))
    } else throw Error("Unknown input type for opt_headers: " + String(d));
    d = Array.from(c.keys()).find(function(g) {
        return "content-type" ==
            g.toLowerCase()
    });
    e = x.FormData && a instanceof x.FormData;
    !(0 <= Ia(qg, b)) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    b = t(c);
    for (d = b.next(); !d.done; d = b.next()) c = t(d.value), d = c.next().value, c = c.next().value, this.g.setRequestHeader(d, c);
    this.fe && (this.g.responseType = this.fe);
    "withCredentials" in this.g && this.g.withCredentials !== this.Tc && (this.g.withCredentials = this.Tc);
    if ("setTrustToken" in this.g && this.Nc) try {
        this.g.setTrustToken(this.Nc)
    } catch (g) {
        N(this.K, P(this, "Error SetTrustToken: " +
            g.message))
    }
    try {
        ug(this), 0 < this.La && (this.Mb = vg(this.g), N(this.K, P(this, "Will abort after " + this.La + "ms if incomplete, xhr2 " + this.Mb)), this.Mb ? (this.g.timeout = this.La, this.g.ontimeout = wa(this.pe, this)) : this.Kb = Ie(this.pe, this.La, this)), N(this.K, P(this, "Sending request")), this.wb = !0, this.g.send(a), this.wb = !1
    } catch (g) {
        N(this.K, P(this, "Send error: " + g.message)), tg(this, g)
    }
};
var vg = function(a) {
    return lb && vb(9) && "number" === typeof a.timeout && void 0 !== a.ontimeout
};
O.prototype.pe = function() {
    "undefined" != typeof pa && this.g && (this.Ya = "Timed out after " + this.La + "ms, aborting", N(this.K, P(this, this.Ya)), this.dispatchEvent("timeout"), this.abort(8))
};
var tg = function(a, b) {
        a.ha = !1;
        a.g && (a.qa = !0, a.g.abort(), a.qa = !1);
        a.Ya = b;
        wg(a);
        xg(a)
    },
    wg = function(a) {
        a.hc || (a.hc = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    };
O.prototype.abort = function() {
    this.g && this.ha && (N(this.K, P(this, "Aborting")), this.ha = !1, this.qa = !0, this.g.abort(), this.qa = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), xg(this))
};
O.prototype.da = function() {
    this.g && (this.ha && (this.ha = !1, this.qa = !0, this.g.abort(), this.qa = !1), xg(this, !0));
    O.sa.da.call(this)
};
O.prototype.ae = function() {
    this.Ca || (this.rc || this.wb || this.qa ? yg(this) : this.Mf())
};
O.prototype.Mf = function() {
    yg(this)
};
var yg = function(a) {
    if (a.ha && "undefined" != typeof pa)
        if (a.Nb[1] && 4 == zg(a) && 2 == Ag(a)) N(a.K, P(a, "Local request error detected and ignored"));
        else if (a.wb && 4 == zg(a)) Ie(a.ae, 0, a);
    else if (a.dispatchEvent("readystatechange"), 4 == zg(a)) {
        N(a.K, P(a, "Request complete"));
        a.ha = !1;
        try {
            if (Bg(a)) a.dispatchEvent("complete"), a.dispatchEvent("success");
            else {
                try {
                    var b = 2 < zg(a) ? a.g.statusText : ""
                } catch (c) {
                    N(a.K, "Can not get status: " + c.message), b = ""
                }
                a.Ya = b + " [" + Ag(a) + "]";
                wg(a)
            }
        } finally {
            xg(a)
        }
    }
};
O.prototype.$d = function(a, b) {
    A("progress" === a.type, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
    this.dispatchEvent(Cg(a, "progress"));
    this.dispatchEvent(Cg(a, b ? "downloadprogress" : "uploadprogress"))
};
var Cg = function(a, b) {
        return {
            type: b,
            lengthComputable: a.lengthComputable,
            loaded: a.loaded,
            total: a.total
        }
    },
    xg = function(a, b) {
        if (a.g) {
            ug(a);
            var c = a.g,
                d = a.Nb[0] ? qa : null;
            a.g = null;
            a.Nb = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {
                (a = a.K) && gg(a, Sf, "Problem encountered resetting onreadystatechange: " + e.message)
            }
        }
    },
    ug = function(a) {
        a.g && a.Mb && (a.g.ontimeout = null);
        a.Kb && (x.clearTimeout(a.Kb), a.Kb = null)
    },
    Bg = function(a) {
        var b = Ag(a);
        a: switch (b) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
                var c = !0;
                break a;
            default:
                c = !1
        }
        if (!c) {
            if (b = 0 === b) a = String(a.Ab).match(lc)[1] || null, !a && x.self && x.self.location && (a = x.self.location.protocol, a = a.substr(0, a.length - 1)), b = !pg.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    },
    zg = function(a) {
        return a.g ? a.g.readyState : 0
    },
    Ag = function(a) {
        try {
            return 2 < zg(a) ? a.g.status : -1
        } catch (b) {
            return -1
        }
    };
O.prototype.getResponseHeader = function(a) {
    if (this.g && 4 == zg(this)) return a = this.g.getResponseHeader(a), null === a ? void 0 : a
};
O.prototype.getAllResponseHeaders = function() {
    return this.g && 4 == zg(this) ? this.g.getAllResponseHeaders() || "" : ""
};
var P = function(a, b) {
    return b + " [" + a.Td + " " + a.Ab + " " + Ag(a) + "]"
};
var Dg = function(a) {
    M.call(this, a)
};
u(Dg, M);
var Eg = function() {
    var a = new Dg,
        b = document.documentElement.getAttribute("lang");
    return L(a, 5, b)
};
Dg.prototype.ib = function(a) {
    L(this, 7, a)
};
var Fg = function(a) {
    M.call(this, a)
};
u(Fg, M);
var Hg = function(a) {
    M.call(this, a, 31, Gg)
};
u(Hg, M);
Hg.prototype.jb = function(a) {
    return L(this, 26, a)
};
var Gg = [3, 20, 27];
var Jg = function(a) {
    M.call(this, a, 17, Ig)
};
u(Jg, M);
var Kg = function(a, b) {
        return of(a, 3, b)
    },
    Lg = function(a, b) {
        return L(a, 14, b)
    };
Jg.prototype.je = function(a) {
    nf(this, 13, a)
};
var Ig = [3, 5];
var Ng = function(a) {
    M.call(this, a, 6, Mg)
};
u(Ng, M);
var Mg = [5];
var Og = function(a) {
    M.call(this, a)
};
u(Og, M);
var Pg = new function(a, b, c) {
    this.hf = a;
    this.Re = b;
    this.Af = c
}(175237375, Og, 0);
var Rg = function(a, b, c, d, e, f, g, h, k, l, p) {
    J.call(this);
    var q = this;
    this.ja = "";
    this.L = [];
    this.Sd = "";
    this.Oc = this.Qc = this.Zb = !1;
    this.Yd = this.Hc = -1;
    this.kd = !1;
    this.pa = this.Y = null;
    this.$a = 0;
    this.bg = 1;
    this.$b = null;
    this.Lc = 0;
    this.Ib = !1;
    J.call(this);
    this.Cb = a;
    this.vd = b || qa;
    this.va = new Jg;
    this.xc = d;
    this.Eb = p;
    this.bufferSize = 1E3;
    this.rg = xa(Mc, 0, 1);
    this.Yb = e || null;
    this.Ia = c || null;
    this.fc = g || !1;
    this.yc = k || null;
    this.R = eg(fg(), "playlog.clearcut.ClearcutBase", void 0).R;
    this.withCredentials = !h;
    this.Ld = f || !1;
    this.Kd = !this.Ld && (xb && vb(65) || wb && vb(45) || yb && vb(12) || (fb() || B("iPad") || B("iPod")) && gb()) && !!window && !!window.navigator && !!window.navigator.sendBeacon;
    a = L(new Fg, 1, 1);
    f || (f = Eg(), nf(a, 11, f));
    nf(this.va, 1, a);
    L(this.va, 2, this.Cb);
    this.oa = new ig(1E4);
    this.s = new He(this.oa.za);
    Wc(this, xa(Uc, this.s));
    md(this.s, "tick", jc(Qg(this, l)), !1, this);
    this.Xb = new He(6E5);
    Wc(this, xa(Uc, this.Xb));
    md(this.Xb, "tick", jc(Qg(this, l)), !1, this);
    this.fc || this.Xb.start();
    this.Ld || (md(document, "visibilitychange", function() {
        "hidden" ===
        document.visibilityState && q.ic()
    }), md(document, "pagehide", this.ic, !1, this))
};
u(Rg, J);
var Qg = function(a, b) {
    return b ? function() {
        b().then(a.flush.bind(a))
    } : a.flush
};
Rg.prototype.da = function() {
    this.ic();
    J.prototype.da.call(this)
};
var Sg = function(a) {
    a.Yb || (a.Yb = .01 > a.rg() ? "https://www.google.com/log?format=json&hasfast=true" : "https://play.google.com/log?format=json&hasfast=true");
    return a.Yb
};
m = Rg.prototype;
m.Fc = function(a) {
    ef(a, 1) || L(a, 1, 1);
    nf(this.va, 1, a)
};
m.jb = function(a) {
    this.ja = a
};
m.ne = function(a) {
    this.Y || (this.Y = new tf);
    jf(this.Y, 2, a)
};
m.ie = function(a) {
    a ? (this.Y || (this.Y = new tf), a = qf(a), L(this.Y, 4, a)) : this.Y && L(this.Y, 4, void 0)
};
m.je = function(a) {
    this.$b = a
};
m.me = function(a) {
    this.pa = a
};
m.ib = function(a) {
    var b = lf(this.va, Fg, 1),
        c = lf(b, Dg, 11);
    c || (c = new Dg);
    c.ib(a);
    nf(b, 11, c);
    this.Fc(b)
};
m.le = function(a) {
    this.kd = !0;
    Tg(this, a)
};
var Tg = function(a, b) {
    a.oa = new ig(1 > b ? 1 : b);
    a.s.setInterval(a.oa.za)
};
Rg.prototype.log = function(a) {
    a = a.clone();
    var b = this.bg++;
    L(a, 21, b);
    this.ja && a.jb(this.ja);
    ef(a, 1) || L(a, 1, Date.now().toString());
    null != ef(a, 15) || L(a, 15, 60 * (new Date).getTimezoneOffset());
    this.Y && (b = this.Y.clone(), nf(a, 16, b));
    for (; this.L.length >= this.bufferSize;) this.L.shift(), ++this.$a;
    this.L.push(a);
    this.dispatchEvent(new Ug(a));
    this.fc || this.s.enabled || this.s.start()
};
Rg.prototype.flush = function(a, b) {
    var c = this;
    if (0 === this.L.length) a && a();
    else if (this.Ib) Vg(this);
    else {
        var d = Date.now();
        if (this.Yd > d && this.Hc < d) hg(this.R, "Not flushing because server requested delay."), b && b("throttled");
        else {
            var e = Lg(Kg(L(this.va.clone(), 4, Date.now().toString()), this.L), this.$a);
            this.$b && e.je(this.$b);
            d = {};
            var f = this.vd();
            f && (d.Authorization = f);
            var g = Sg(this);
            this.Ia && (d["X-Goog-AuthUser"] = this.Ia, g = qc(g, "authuser", this.Ia));
            this.yc && (d["X-Goog-PageId"] = this.yc, g = qc(g, "pageId", this.yc));
            if (f && this.Sd === f) hg(this.R, "XHR with unauthorized request not retried"), b && b("stale-auth-token");
            else if (hg(this.R, "Flushing log to clearcut."), this.L = [], this.s.enabled && this.s.stop(), this.$a = 0, this.Zb) hg(this.R, qf(e)), d && hg(this.R, JSON.stringify(d)), a && a();
            else {
                var h = qf(e),
                    k;
                this.pa && this.pa.yg(h.length) && (k = this.pa.wg(h));
                var l = {
                        url: g,
                        body: h,
                        Ie: 1,
                        Dc: d,
                        Uf: "POST",
                        withCredentials: this.withCredentials,
                        Lc: this.Lc
                    },
                    p = function(r) {
                        c.oa.reset();
                        c.s.setInterval(c.oa.za);
                        if (r) {
                            var v = null;
                            try {
                                var y = JSON.parse(r.replace(")]}'\n",
                                    ""));
                                v = new Ng(y)
                            } catch (H) {
                                (r = c.R) && gg(r, Tf, "Response parse failed: " + H.toString())
                            }
                            v && (r = Number(gf(v, "-1")), 0 < r && (c.Hc = Date.now(), c.Yd = c.Hc + r), v = v.getExtension(Pg)) && (v = gf(v, -1), -1 != v && (c.kd || Tg(c, v)))
                        }
                        a && a()
                    },
                    q = function(r) {
                        var v = mf(e, Hg, 3),
                            y = c.oa;
                        y.Sa = Math.min(y.Xd, y.Sa * y.Ge);
                        y.za = Math.min(y.Xd, y.Sa + (y.de ? Math.round(y.de * (Math.random() - .5) * 2 * y.Sa) : 0));
                        c.s.setInterval(c.oa.za);
                        401 === r && f && (c.Sd = f);
                        if (500 <= r && 600 > r || 401 === r || 0 === r) c.L = v.concat(c.L), c.fc || c.s.enabled || c.s.start();
                        (v = c.R) && gg(v, Tf, "Flush failed. Status code: " +
                            r);
                        b && b("net-send-failed", r)
                    },
                    w = function() {
                        c.Eb ? c.Eb.send(l, p, q) : c.xc(l, p, q)
                    };
                k ? k.then(function(r) {
                    l.Dc["Content-Encoding"] = "gzip";
                    l.Dc["Content-Type"] = "application/binary";
                    l.body = r;
                    l.Ie = 2;
                    w()
                }, function() {
                    w()
                }) : w()
            }
        }
    }
};
Rg.prototype.ic = function() {
    this.Zb || (this.Qc && Vg(this), this.Oc && Wg(this), this.flush())
};
var Vg = function(a) {
        hg(a.R, "Flushing log using sendBeacon.");
        Xg(a, 32, 10, function(b, c) {
            b = qc(b, "format", "json");
            b = window.navigator.sendBeacon(b, qf(c));
            a.Ib && !b && (a.Ib = !1);
            return b
        })
    },
    Wg = function(a) {
        hg(a.R, "Flushing log using Image GET.");
        Xg(a, 6, 5, function(b, c) {
            c = qf(c);
            c = Bb(Ha(c), 3);
            c = pc(b, "format", "base64json", "p", c);
            if (15360 < c.length) return !1;
            b = new Image;
            a: {
                try {
                    var d = b && b.ownerDocument,
                        e = d && (d.defaultView || d.parentWindow);
                    e = e || x;
                    if (e.Element && e.Location) {
                        var f = e;
                        break a
                    }
                } catch (h) {}
                f = null
            }
            if (f && "undefined" !=
                typeof f.HTMLImageElement && (!b || !(b instanceof f.HTMLImageElement) && (b instanceof f.Location || b instanceof f.Element))) {
                if (sa(b)) try {
                    var g = b.constructor.displayName || b.constructor.name || Object.prototype.toString.call(b)
                } catch (h) {
                    g = "<object could not be stringified>"
                } else g = void 0 === b ? "undefined" : null === b ? "null" : typeof b;
                Ca("Argument is not a %s (or a non-Element, non-Location mock); got: %s", "HTMLImageElement", g)
            }
            if (c instanceof Xb) f = c;
            else a: if (f = c, d = /^data:image\//i.test(c), !(f instanceof Xb)) {
                f =
                    "object" == typeof f && f.vb ? f.Wa() : String(f);
                if (d && /^data:/i.test(f) && (d = String(f), d = d.replace(/(%0A|%0D)/g, ""), d = ((e = d.match($b)) && Zb.test(e[1]) ? new Xb(d, Wb) : null) || bc, d.Wa() == f)) {
                    f = d;
                    break a
                }
                A(ac.test(f), "%s does not match the safe URL pattern", f) || (f = "about:invalid#zClosurez");
                f = new Xb(f, Wb)
            }
            b.src = Yb(f);
            return !0
        })
    },
    Xg = function(a, b, c, d) {
        if (0 !== a.L.length) {
            var e = uc(Sg(a), "format");
            e = pc(e, "auth", a.vd(), "authuser", a.Ia || "0");
            for (var f = 0; f < c && a.L.length; ++f) {
                var g = a.L.slice(0, b),
                    h = Kg(L(a.va.clone(), 4,
                        Date.now().toString()), g);
                0 === f && Lg(h, a.$a);
                if (!d(e, h)) break;
                a.L = a.L.slice(g.length)
            }
            a.s.enabled && a.s.stop();
            a.$a = 0
        }
    },
    Ug = function() {
        Xc.call(this, "event-logged", void 0)
    };
u(Ug, Xc);

function Yg(a, b, c) {
    sg(a.url, function(d) {
        d = d.target;
        if (Bg(d)) {
            try {
                var e = d.g ? d.g.responseText : ""
            } catch (f) {
                N(d.K, "Can not get responseText: " + f.message), e = ""
            }
            b(e)
        } else c(Ag(d))
    }, a.Uf, a.body, a.Dc, a.Lc, a.withCredentials)
};

function Zg(a) {
    this.Cb = a;
    this.Ia = "0";
    this.od = "https://play.google.com/log?format=json&hasfast=true";
    this.We = !1;
    this.Df = !0;
    this.pd = !1;
    this.xc = Yg;
    this.ja = "";
    this.Ze = this.Pc = this.Rc = !1
}
m = Zg.prototype;
m.ib = function(a) {
    this.ed = a
};
m.me = function(a) {
    this.pa = a
};
m.jb = function(a) {
    this.ja = a;
    return this
};
m.ie = function(a) {
    this.hd = a
};
m.ne = function(a) {
    this.be = a
};
m.Fc = function(a) {
    this.jd = a
};
m.Qc = function() {
    this.Rc = !0;
    return this
};
m.Oc = function() {
    this.Pc = !0;
    return this
};
m.le = function(a) {
    this.td = Math.max(a, 5E3)
};
var $g = function() {
    var a = 1609;
    a = void 0 === a ? -1 : a;
    var b = void 0 === b ? "" : b;
    var c = void 0 === c ? "" : c;
    var d = void 0 === d ? !1 : d;
    var e = void 0 === e ? "" : e;
    var f = (new Zg(a)).jb(b);
    "" != c && (f.od = c);
    d && (f.pd = !0);
    e && f.ib(e);
    c = new Rg(f.Cb, f.kf ? f.kf : Ff, f.Ia, f.xc, f.od, f.pd, f.We, void 0, void 0, void 0, f.Eb ? f.Eb : void 0);
    f.Df || (c.Zb = !0);
    f.jd && c.Fc(f.jd);
    f.ed && c.ib(f.ed);
    f.pa && c.me(f.pa);
    f.ja && c.jb(f.ja);
    f.hd && c.ie(f.hd);
    f.be && c.ne(f.be);
    f.Rc && (c.Qc = f.Rc && c.Kd);
    f.Pc && (c.Oc = f.Pc);
    f.td && c.le(f.td);
    f.Ze && (c.Ib = c.Kd);
    this.Cb = a;
    this.ja =
        b;
    this.qe = c
};
$g.prototype.flush = function(a) {
    var b = a || [];
    if (b.length) {
        a = new Pf;
        for (var c = [], d = 0; d < b.length; d++) {
            var e = b[d],
                f = e;
            var g = new Hf;
            g = L(g, 1, f.Za);
            for (var h = f, k = [], l = 0; l < h.ub.length; l++) k.push(h.ub[l].rd);
            g = jf(g, 3, k);
            h = [];
            k = [];
            l = t(f.wa.keys());
            for (var p = l.next(); !p.done; p = l.next()) k.push(p.value.split(","));
            for (l = 0; l < k.length; l++) {
                p = k[l];
                var q = f.Le;
                for (var w = f.wd(p) || [], r = [], v = 0; v < w.length; v++) {
                    var y = w[v];
                    y = y && y.gd;
                    var H = new Lf;
                    switch (q) {
                        case 3:
                            kf(H, 1, Nf, Number(y));
                            break;
                        case 2:
                            kf(H, 2, Nf, Number(y))
                    }
                    r.push(H)
                }
                q = r;
                for (w = 0; w < q.length; w++) {
                    r = q[w];
                    v = new Jf;
                    r = nf(v, 2, r);
                    v = p;
                    y = [];
                    H = f;
                    for (var X = [], U = 0; U < H.ub.length; U++) X.push(H.ub[U].sd);
                    H = X;
                    for (X = 0; X < H.length; X++) {
                        U = H[X];
                        var ua = v[X],
                            ic = new Kf;
                        switch (U) {
                            case 3:
                                kf(ic, 1, Mf, String(ua));
                                break;
                            case 2:
                                kf(ic, 2, Mf, Number(ua));
                                break;
                            case 1:
                                kf(ic, 3, Mf, "true" == ua)
                        }
                        y.push(ic)
                    } of (r, 1, y);
                    h.push(r)
                }
            } of (g, 4, h);
            c.push(g);
            e.clear()
        } of (a, 1, c);
        b = this.qe;
        a instanceof Hg ? b.log(a) : (c = new Hg, a = qf(a), a = L(c, 8, a), b.log(a));
        this.qe.flush()
    }
};
var Q = {
        tg: {}
    },
    R = R || {};
R.Wb = "APISID";
R.Vb = "SAPISID";
R.Tb = "__Secure-3PAPISID";
R.Z = function(a) {
    a = encodeURIComponent(a);
    if (a = Cf.get(a)) return decodeURIComponent(a)
};
R.jc = function(a) {
    var b;
    (a = R.Z(a)) && (b = String(ah(a)));
    return b
};
R.fg = function(a, b, c) {
    Cf.set(a, b, c)
};
Q = Q || {};
Q.wf = function(a, b, c, d) {
    d = void 0 === d ? !1 : d;
    if (!0 === Q.tc) a();
    else {
        var e = 2,
            f = function() {
                e--;
                0 == e && (Q.tc = !0, a())
            },
            g = function(h) {
                b(h)
            };
        switch (bh()) {
            case "sessionStorage":
                Q.kb = new ch;
                Q.kb.V(f, g);
                if (c) try {
                    Q.kb.clear()
                } catch (h) {}
                break;
            case "inMemoryStorage":
                Q.kb = new dh;
                Q.kb.V(f, g);
                break;
            default:
                c = Error("Unsupported storage type: " + bh());
                b(c);
                return
        }
        switch (eh()) {
            case "localStorage":
                Q.Ga = new fh;
                Q.Ga.V(f, g);
                break;
            case "indexedDb":
                Q.Ga = new gh;
                Q.Ga.V(f, g);
                break;
            case "cookieStorage":
                Q.Ga = new hh;
                d ? f() : Q.Ga.V(f, g);
                break;
            default:
                c = Error("Unsupported storage type: " + eh()), b(c)
        }
    }
};
Q.zd = function() {
    if (!Q.tc) throw Error("Storages are not initialized yet!");
    return Q.Ga
};
Q.sf = function() {
    if (!Q.tc) throw Error("Storages are not initialized yet!");
    return Q.kb
};
var fh = function() {
    this.Da = null
};
m = fh.prototype;
m.V = function(a, b) {
    ve() ? (this.Da = window.localStorage, a()) : b && b(Error("localStorage is not available in the current environment."))
};
m.getItem = function(a, b) {
    b(this.Da.getItem(a))
};
m.setItem = function(a, b, c) {
    void 0 === b || null === b ? this.Da.removeItem(a) : this.Da.setItem(a, b);
    c && c()
};
m.removeItem = function(a, b) {
    this.Da.removeItem(a);
    b && b()
};
m.clear = function(a) {
    this.Da.clear();
    a && a()
};
var gh = function() {
    this.Ua = void 0
};
m = gh.prototype;
m.V = function(a, b) {
    var c = this,
        d = window.indexedDB.open("oauth");
    d.onsuccess = function(e) {
        c.Ua = e.target.result;
        a()
    };
    d.onupgradeneeded = function(e) {
        e.target.result.createObjectStore("oauth")
    };
    d.onerror = function(e) {
        e = e.target.errorCode;
        b && b(Error("IndexedDb initialization failed: " + e))
    }
};
m.getItem = function(a, b) {
    var c = this.Ua.transaction("oauth", "readwrite").objectStore("oauth").get(a);
    c.onsuccess = function() {
        b(c.result)
    }
};
m.setItem = function(a, b, c) {
    var d = this.Ua.transaction("oauth", "readwrite").objectStore("oauth");
    if (void 0 === b || null === b) d["delete"](a);
    else d.put(b, a);
    d.transaction.oncomplete = function() {
        c && c()
    }
};
m.removeItem = function(a, b) {
    var c = this.Ua.transaction("oauth", "readwrite").objectStore("oauth");
    c["delete"](a);
    c.transaction.oncomplete = function() {
        b && b()
    }
};
m.clear = function(a) {
    var b = this.Ua.transaction("oauth", "readwrite").objectStore("oauth");
    b.clear();
    b.transaction.oncomplete = function() {
        a && a()
    }
};
var dh = function() {};
m = dh.prototype;
m.V = function(a) {
    this.Jb = {};
    a()
};
m.getItem = function(a, b) {
    b(this.Jb[a] || null)
};
m.setItem = function(a, b, c) {
    this.Jb[a] = b;
    c && c()
};
m.removeItem = function(a, b) {
    delete this.Jb[a];
    b && b()
};
m.clear = function(a) {
    this.Jb = {};
    a && a()
};
var ch = function() {
    this.Ja = null
};
m = ch.prototype;
m.V = function(a, b) {
    ve() ? (this.Ja = window.sessionStorage, a()) : b && b(Error("sessionStorage is not available in the current environment."))
};
m.getItem = function(a, b) {
    b(this.Ja.getItem(a))
};
m.setItem = function(a, b, c) {
    void 0 === b || null === b ? this.Ja.removeItem(a) : this.Ja.setItem(a, b);
    c && c()
};
m.removeItem = function(a, b) {
    this.Ja.removeItem(a);
    b && b()
};
m.clear = function(a) {
    this.Ja.clear();
    a && a()
};
var hh = function() {
    this.If = S.ue
};
m = hh.prototype;
m.V = function(a, b) {
    navigator.cookieEnabled ? a() : b && b(Error("Cookies are not enabled in current environment."))
};
m.getItem = function(a, b) {
    for (var c = null, d = ih(a), e = 0; e < d.length; e++)
        if (d[e].key == a) {
            c = d[e].value;
            break
        }
    b(c)
};
m.setItem = function(a, b, c) {
    var d = S.kc(a.split(S.v)[0]);
    if (d) {
        var e = jh(d);
        b = {
            key: a,
            value: b
        };
        for (var f = 0; f < e.length; f++)
            if (e[f].key == a) {
                e.splice(f, 1);
                break
            }
        e.push(b);
        kh(this, d, e)
    }
    c && c()
};
m.removeItem = function(a, b) {
    for (var c = ih(a), d = 0; d < c.length; d++)
        if (c[d].key == a) {
            c.splice(d, 1);
            break
        }(a = S.kc(a.split(S.v)[0])) && kh(this, a, c);
    b && b()
};
m.clear = function(a) {
    Q.Pe();
    a && a()
};
var ih = function(a) {
        return (a = S.kc(a.split(S.v)[0])) ? jh(a) : []
    },
    jh = function(a) {
        a = R.Z(a);
        return Q.Te(a || null)
    },
    kh = function(a, b, c) {
        var d = Q.af(c);
        d.length > a.If ? (c.splice(0, 1), 0 < c.length ? kh(a, b, c) : F("Failed to write Cookie based cache due to the big size.")) : Q.ke(b, d)
    };
Q.Se = function(a) {
    try {
        return atob(a)
    } catch (b) {
        return a
    }
};
Q.$e = function(a) {
    try {
        return btoa(a)
    } catch (b) {
        return a
    }
};
Q.Te = function(a) {
    if (!a) return [];
    a = Q.Se(a);
    try {
        return I.parse(a).items || []
    } catch (b) {
        return F("Error while parsing items from cookie:" + b.message), []
    }
};
Q.af = function(a) {
    return Q.$e(I.stringify({
        items: a
    }))
};
Q.ke = function(a, b) {
    var c = window.location.pathname;
    c = {
        domain: window.location.hostname,
        path: -1 != navigator.userAgent.toLowerCase().indexOf("msie") || xe() ? void 0 : c,
        $f: "https:" === window.location.protocol ? !0 : void 0
    };
    R.fg(encodeURIComponent(a), encodeURIComponent(b), c)
};
Q.Pe = function() {
    var a = S.Rb;
    var b = Bf(Cf).keys;
    for (var c = 0; c < b.length; c++) {
        var d = decodeURIComponent(b[c]);
        0 == d.indexOf(a) && Q.ke(d, "")
    }
};
var lh = function(a) {
    this.Od = a;
    this.l = void 0;
    Be.call(this, ["storageValueChanged"])
};
G(lh, Be);
var mh = function(a, b) {
    Q.zd().getItem(a.Od, b)
};
lh.prototype.addListener = function(a) {
    this.addEventListener("storageValueChanged", a)
};
lh.prototype.start = function() {
    var a = this;
    mh(this, function(b) {
        a.Of = b;
        a.Zd = 0;
        a.l = new He;
        md(a.l, "tick", nh(a));
        a.l.setInterval(200);
        a.l.start()
    })
};
lh.prototype.stop = function() {
    void 0 !== this.l && (this.l.stop(), this.l = void 0)
};
var nh = function(a) {
        return function() {
            a.Zd++;
            mh(a, function(b) {
                b != a.Of ? (a.dispatchEvent({
                    type: "storageValueChanged",
                    key: a.Od,
                    newValue: b
                }), a.stop()) : 1500 <= a.Zd && a.stop()
            })
        }
    },
    ah = function(a) {
        var b = 0,
            c;
        if (a) {
            var d = 0;
            for (c = a.length; d < c; d++) {
                var e = a.charCodeAt(d);
                b = (b << 5) - b + e;
                b |= 0
            }
        }
        return b
    },
    T = function(a) {
        return !!a && 0 <= a.indexOf(S.v)
    },
    oh = function(a, b) {
        if (!a && !b) return !0;
        if (!a || !b) return !1;
        a = a.extraQueryParams;
        b = b.extraQueryParams;
        if (!a && !b) return !0;
        if (!a || !b || Object.keys && Object.keys(a).length != Object.keys(b).length) return !1;
        for (var c in a)
            if (a[c] !== b[c]) return !1;
        if (!Object.keys)
            for (c in b)
                if (a[c] !== b[c]) return !1;
        return !0
    },
    S = S || {};
S.te = 100;
S.$c = "/oauth2/sessionstate/action/updateState";
S.Uc = "/oauth2/sessionstate/action/checkOrigin";
S.Yc = "/oauth2/permission/action/refresh";
S.Xc = "/oauth2/permission/action/code";
S.Ub = "/oauth2/permission/action/listSessions";
S.ze = "/o/oauth2/revoke";
S.ob = "response_type login_hint client_id origin scope ss_domain authuser hd enable_serial_consent include_granted_scopes nonce".split(" ");
S.we = "login_hint client_id origin scope ss_domain authuser hd enable_serial_consent include_granted_scopes".split(" ");
S.xe = "client_id origin scope ss_domain authuser hd enable_serial_consent".split(" ");
S.v = "::";
S.Sb = "_ss_";
S.Wc = "_tr_";
S.Pa = "oauth2_ss";
S.Vc = "oauth2_cs";
S.Zc = "oauth2_tr";
S.ve = "oauth2_is";
S.Oa = "oauth2_ar";
S.Rb = "oauth2c_";
S.ue = 1500;
S.sg = function() {
    var a = {
            Sb: 1,
            Wc: 2,
            Pa: 3,
            Vc: 4,
            Zc: 5,
            Oa: 6
        },
        b;
    for (b in a)
        if (a = S[b], !a || 0 <= a.indexOf(S.v)) throw Error("Invalid value for 'oauth2.spi." + b + "'.");
};
S.sg();
S.ye = 512;
S.De = function(a) {
    var b;
    (b = void 0 === a.hint) || (b = a.hint, b = ("" === b ? !0 : b ? "string" == typeof b || "object" == typeof b && b.constructor === String : !1) && a.hint.length <= S.ye);
    return !a.id && b
};
S.qf = function() {
    var a = R.Z("https:" == window.location.protocol ? R.Vb : R.Wb);
    a || (a = R.Z(R.Tb));
    return a
};
S.kc = function(a) {
    switch (a) {
        case S.Oa:
            return S.Rb + S.Oa;
        case S.Pa:
            return S.Rb + S.Pa;
        default:
            return null
    }
};
var eh = function() {
        return (Ae() || ye()) && !ve() || xe() && !window.indexedDB ? "cookieStorage" : xe() ? "indexedDb" : "localStorage"
    },
    bh = function() {
        return !Ae() && !ye() || ve() ? "sessionStorage" : "inMemoryStorage"
    };
R = R || {};
R.Qb = "cookieValueChanged";
var ph = function(a) {
    this.l = void 0;
    this.xf = a;
    Be.call(this, [R.Qb])
};
G(ph, Be);
ph.prototype.Z = function() {
    return R.Z(R.Wb) || R.Z(R.Vb) || R.Z(R.Tb)
};
var qh = function() {
    return R.jc(R.Wb) || R.jc(R.Vb) || R.jc(R.Tb)
};
ph.prototype.addListener = function(a) {
    this.addEventListener(R.Qb, a)
};
var th = function(a) {
        rh(a);
        a.Fb = a.Z();
        a.l = new He;
        md(a.l, "tick", sh(a));
        a.l.setInterval(a.xf);
        a.l.start();
        F("IDP Session Cookie monitor is started.")
    },
    rh = function(a) {
        void 0 !== a.l && (a.l.stop(), a.l = void 0, F("IDP Session Cookie monitor is stoped."))
    },
    sh = function(a) {
        return function() {
            var b = a.Z();
            if (a.Fb != b) {
                var c = {
                    type: R.Qb,
                    newHash: b && ah(b),
                    oldHash: a.Fb && ah(a.Fb)
                };
                a.Fb = b;
                a.dispatchEvent(c)
            }
        }
    },
    uh = function(a) {
        this.j = a;
        this.re = void 0
    },
    vh = function(a, b, c) {
        var d = S.ze,
            e = new XMLHttpRequest;
        e.onreadystatechange = function() {
            if (4 ==
                e.readyState && 200 == e.status) {
                var h;
                e.responseText && (h = I.parse(e.responseText));
                c(h)
            } else 4 == e.readyState && 0 == e.status ? c({
                error: "network_error"
            }) : 4 == e.readyState && c({
                error: "server_error",
                error_subtype: e.responseText
            })
        };
        e.open("POST", d, !0);
        e.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var f = "xsrfToken=";
        a.re && (f += a.re);
        if (b)
            for (var g in b) g && b[g] && (f += "&" + g + "=" + encodeURIComponent(b[g]));
        F("Call " + d + " with postData: " + f);
        e.send(f)
    },
    wh = function(a, b, c, d) {
        var e = new XMLHttpRequest;
        e.onreadystatechange = function() {
            if (4 == e.readyState && 200 == e.status) {
                var g;
                if (e.responseText && (g = I.parse(e.responseText))) {
                    var h = g;
                    if (h.error) {
                        h.thrown_by = "server";
                        try {
                            h.error = h.error.toLowerCase()
                        } catch (k) {}
                    }
                }
                d(g)
            } else 4 == e.readyState && 0 == e.status ? d({
                error: "network_error"
            }) : 4 == e.readyState && d({
                error: "server_error",
                error_subtype: e.responseText
            })
        };
        if (b = re(b)) a += 0 > a.indexOf("?") ? "?" : "&", a += b;
        e.open("GET", a, !0);
        e.setRequestHeader("X-Requested-With", "XmlHttpRequest");
        if (c)
            for (var f in c)
                if (c.hasOwnProperty(f)) {
                    b =
                        c[f];
                    if (null === b || void 0 === b) b = "";
                    e.setRequestHeader(f, b)
                }
        F("Call " + a + " with Get method.");
        e.send()
    },
    xh = function(a, b, c) {
        wh(S.Uc, {
            origin: a.j,
            client_id: b
        }, null, c)
    },
    yh = function(a, b, c) {
        b && b.length ? wh(S.$c, {
            login_hint: b.join(" "),
            origin: a.j
        }, null, c) : c({
            activeHints: {}
        })
    },
    Ah = function(a, b, c) {
        b.origin = a.j;
        0 > S.ob.indexOf("enable_serial_consent") && S.ob.push("enable_serial_consent");
        b = zh(b, S.ob);
        wh(S.Yc, b, null, c)
    },
    Bh = function(a, b, c) {
        b.origin = a.j;
        b = zh(b, S.we);
        wh(S.Xc, b, null, c)
    },
    Ch = function(a, b, c) {
        b.origin = a.j;
        b = zh(b, S.xe);
        wh(S.Ub, b, null, c)
    };
uh.prototype.revoke = function(a, b) {
    vh(this, {
        token: a
    }, b)
};
var zh = function(a, b) {
    for (var c = {}, d = 0; d < b.length; d++) {
        var e = b[d];
        void 0 !== a[e] && null !== a[e] && (c[e] = a[e])
    }
    return c
};
Q = Q || {};
var Dh = function() {};
Dh.prototype.J = function() {
    return !1
};
var Eh = {};
Q.Rf = function() {
    var a = new Fh;
    if (!a) throw Error("policy cannot be empty.");
    if (Q.Id("DEFAULT")) throw Error("Duplicate policyName [DEFAULT].");
    Eh.DEFAULT = a
};
Q.Id = function(a) {
    for (var b in Eh)
        if (a == b) return !0;
    return !1
};
Q.xd = function(a) {
    return a && Q.Id(a) ? a : "DEFAULT"
};
Q.mf = function(a) {
    return Eh[Q.xd(a)]
};
Q.J = function(a, b, c, d) {
    return Q.mf(d).J(a, b, c)
};
Q.vg = function(a, b, c, d) {
    if (!Q.J(a, b, c, d)) throw Error("permission_error");
};
var Gh = function() {};
G(Gh, Dh);
Gh.prototype.J = function(a, b, c) {
    a = c ? this.pc(a) : this.qc(a);
    return 0 <= pe(a, b)
};
Gh.prototype.qc = function(a) {
    var b = [];
    if (a && (b.push(a), "http://" == a.substring(0, 7) || "https://" == a.substring(0, 8))) {
        var c = document.createElement("a");
        c.href = a;
        a != c.protocol + "//" + c.hostname && b.push(c.protocol + "//" + c.hostname);
        "https:" == c.protocol && b.push("http://" + c.hostname)
    }
    return b
};
Gh.prototype.pc = function(a) {
    var b = [];
    if (a) {
        b.push(a);
        var c = document.createElement("a");
        c.href = a;
        if ("http:" == c.protocol || "https:" == c.protocol)
            for (a = c.hostname.split("."); 1 < a.length;) b.push(c.protocol + "//" + a.join(".")), "https:" == c.protocol && b.push("http://" + a.join(".")), a.shift()
    }
    return b
};
var Fh = function() {};
G(Fh, Dh);
Fh.prototype.J = function(a, b, c) {
    a = c ? this.pc(a) : this.qc(a);
    return 0 <= pe(a, b)
};
Fh.prototype.qc = function(a) {
    var b = [];
    if (a && (b.push(a), "https://" == a.substring(0, 8))) {
        var c = document.createElement("a");
        c.href = a;
        "" != c.port && 0 != c.port && 443 != c.port || b.push("http://" + c.hostname)
    }
    return b
};
Fh.prototype.pc = function(a) {
    var b = [];
    if (a) {
        var c = document.createElement("a");
        c.href = a;
        if ("https:" == c.protocol && ("" == c.port || 0 == c.port || 443 == c.port) || "http:" == c.protocol && ("" == c.port || 0 == c.port || 80 == c.port))
            for (a = c.hostname.split("."); 1 < a.length;) b.push(c.protocol + "//" + a.join(".")), "https:" == c.protocol && b.push("http://" + a.join(".")), a.shift();
        else b.push(a)
    }
    return b
};
Q.Rf();
var Hh = function() {};
Hh.prototype.vc = function() {
    return !0
};
var V = function(a) {
    return a.vc() ? Q.sf() : Q.zd()
};
Hh.prototype.u = function() {
    throw Error("unimplemented abstract method");
};
Hh.prototype.Ea = function() {
    throw Error("unimplemented abstract method");
};
Hh.prototype.G = function() {
    throw Error("unimplemented abstract method");
};
Hh.prototype.H = function() {
    throw Error("unimplemented abstract method");
};
var W = function() {};
G(W, Hh);
W.prototype.G = function(a, b, c) {
    var d = this,
        e = this.u(a);
    V(this).getItem(e, function(f) {
        if (f) try {
            var g = I.parse(f);
            if (g.cookieHash != b) {
                V(d).removeItem(e, function() {
                    c(void 0)
                });
                return
            }
            var h = g && g.cachedValue
        } catch (k) {}
        c(h)
    })
};
W.prototype.H = function(a, b, c, d) {
    a = this.u(a);
    void 0 === b || null === b ? V(this).removeItem(a, d) : (b = I.stringify({
        cookieHash: c,
        cachedValue: b
    }), V(this).setItem(a, b, d))
};
var Ih = function() {};
G(Ih, Hh);
Ih.prototype.G = function(a, b, c) {
    V(this).getItem(this.u(a), function(d) {
        if (d) try {
            var e = I.parse(d);
            var f = e && e.cachedValue
        } catch (g) {}
        c(f)
    })
};
Ih.prototype.H = function(a, b, c, d) {
    a = this.u(a);
    void 0 === b || null === b ? V(this).removeItem(a, d) : (b = I.stringify({
        cachedValue: b
    }), V(this).setItem(a, b, d))
};
var Jh = function() {};
G(Jh, Ih);
Jh.prototype.vc = function() {
    return !1
};
Jh.prototype.u = function(a) {
    return [S.Oa, a.origin, a.clientId, a.id].join(S.v)
};
Jh.prototype.Ea = function(a) {
    var b = {};
    a && (a = a.split(S.v), 4 == a.length && (b.origin = a[1], b.clientId = a[2], b.id = a[3]));
    return b
};
var Kh = function() {};
G(Kh, W);
Kh.prototype.u = function(a) {
    return [S.Vc, a.origin, a.clientId].join(S.v)
};
Kh.prototype.Ea = function(a) {
    a = a.split(S.v);
    var b = {};
    3 == a.length && (b.origin = a[1], b.clientId = a[2]);
    return b
};
var Lh = function() {};
G(Lh, W);
Lh.prototype.u = function(a) {
    return [S.ve, a.origin, a.clientId].join(S.v)
};
Lh.prototype.G = function(a, b, c) {
    var d = this;
    W.prototype.G.call(this, a, b, function(e) {
        e && e.expires_at ? 6E4 > e.expires_at - (new Date).getTime() ? V(d).removeItem(d.u(a), c) : ue(e.scope, a.scope) && ue(a.scope, e.scope) ? (e.expires_in = Math.floor((e.expires_at - (new Date).getTime()) / 1E3), c && c(e)) : V(d).removeItem(d.u(a), c) : c && c(void 0)
    })
};
Lh.prototype.H = function(a, b, c, d) {
    var e;
    b && b.expires_at && 18E4 < b.expires_at - (new Date).getTime() && (e = b);
    W.prototype.H.call(this, a, e, c, d)
};
var Mh = function() {};
G(Mh, Ih);
Mh.prototype.vc = function() {
    return !1
};
Mh.prototype.u = function(a) {
    return [S.Pa, a.domain, a.crossSubDomains ? "1" : "0", Q.xd(a.policy), a.id || S.Sb].join(S.v)
};
Mh.prototype.Ea = function(a) {
    a = a.split(S.v);
    var b = {};
    5 == a.length && (b.domain = a[1], b.crossSubDomains = "1" == a[2], b.policy = a[3], b.id = a[4]);
    "DEFAULT" == b.policy && delete b.policy;
    b.id == S.Sb && delete b.id;
    return b
};
var Nh = function(a) {
    this.Nf = a || S.Zc
};
G(Nh, W);
Nh.prototype.u = function(a) {
    return [this.Nf, a.origin, a.clientId, a.id || S.Wc].join(S.v)
};
Nh.prototype.G = function(a, b, c) {
    var d = this;
    W.prototype.G.call(this, a, b, function(e) {
        e && e.Ma && e.Ma.expires_at ? a.loginHint != e.Ma.login_hint ? V(d).removeItem(d.u(a), c) : 6E4 > e.Ma.expires_at - (new Date).getTime() ? V(d).removeItem(d.u(a), c) : ue(e.Ma.scope, a.scope) ? ue(e.responseType, a.responseType) ? (e = e.Ma, e.expires_in = Math.floor((e.expires_at - (new Date).getTime()) / 1E3), c && c(e)) : V(d).removeItem(d.u(a), c) : V(d).removeItem(d.u(a), c) : c && c(void 0)
    })
};
Nh.prototype.H = function(a, b, c, d) {
    var e;
    b && b.expires_at && 18E4 < b.expires_at - (new Date).getTime() && (e = {
        Ma: b,
        responseType: a.responseType
    });
    W.prototype.H.call(this, a, e, c, d)
};
var Oh = function(a, b) {
        this.j = a;
        this.Ec = b;
        this.ec = !1;
        this.fb = {};
        this.eb = {};
        this.cb = {}
    },
    Ph = function(a, b) {
        if (!b) throw Error("message object cannot be null.");
        b.rpcToken = a.Ec;
        b = I.stringify(b);
        F("IDP IFrame sends message: " + b);
        window.parent.postMessage(b, a.j)
    },
    Y = function(a, b, c) {
        b && Ph(a, {
            id: b,
            result: c
        })
    };
Oh.prototype.Pf = function(a) {
    if (a.source == window.parent && a.origin == this.j) {
        F("IDP Session State IFrame receive message:" + a.data);
        try {
            var b = I.parse(a.data)
        } catch (d) {
            return
        }
        if ((b.rpcToken || this.Ec) && b.rpcToken != this.Ec) F("RPC token mismatch.");
        else if (b && b.method && ("showDialog" == b.method || this.fb[b.method]))
            if ("showDialog" == b.method)
                if (this.ec) Ph(this, {
                    id: b.id,
                    error: "dialog_already_displayed"
                });
                else if (a = b.params, b.id && a && a.dialogType && this.cb[a.dialogType]) {
            var c = this.cb[a.dialogType];
            c.B && !c.B(a) ?
                (F("Bad request."), Ph(this, {
                    id: b.id,
                    error: "bad_request"
                })) : c.m(b)
        } else F("Bad dialog request.");
        else a = this.fb[b.method], a.aa && !b.id ? F("Bad request.") : a.B && !a.B(b) ? (F("Bad request."), Ph(this, {
            id: b.id,
            error: "bad_request"
        })) : a.m(b);
        else F("Bad request.")
    }
};
var Qh = function(a, b) {
        if (b && b.type && a.eb[b.type]) {
            var c = a.eb[b.type].filter;
            c && !c(b) || Ph(a, {
                method: "fireIdpEvent",
                params: b
            })
        } else F("Invalid event type.")
    },
    Rh = function(a) {
        Qh(a, {
            type: "displayIFrame",
            vf: !1,
            options: {
                fullScreen: !0
            }
        });
        a.ec = !0
    },
    Sh = function(a) {
        Qh(a, {
            type: "displayIFrame",
            vf: !0
        });
        a.ec = !1
    },
    Th = function(a, b) {
        a.fb = {};
        a.eb = {};
        a.cb = {};
        if (b) {
            if (b.F)
                for (var c = 0; c < b.F.length; c++) {
                    var d = b.F[c];
                    if (!d.method || !d.m) throw Error("Error in RPC policy: method or handler is empty.");
                    if (a.fb[d.method]) throw Error("Error in RPC policy: duplicate entry for RPC '" +
                        d.method + "'.");
                    var e = d.method;
                    a.fb[e] = {
                        m: d.m,
                        aa: d.aa,
                        B: d.B,
                        method: e
                    }
                }
            if (b.X)
                for (c = 0; c < b.X.length; c++) {
                    d = b.X[c];
                    if (!d.type) throw Error("Error in Event policy: type is empty.");
                    if (a.eb[d.type]) throw Error("Error in Event policy: duplicate entry for type '" + d.type + "'.");
                    e = d.type;
                    a.eb[e] = {
                        filter: d.filter,
                        type: e
                    }
                }
            if (b.Aa)
                for (c = 0; c < b.Aa.length; c++) {
                    d = b.Aa[c];
                    if (!d.Ba) throw Error("Error in Dialog policy: dialogType is empty.");
                    if (a.cb[d.Ba]) throw Error("Error in Dialog policy: duplicate entry for dialogType '" +
                        d.Ba + "'.");
                    e = d.Ba;
                    a.cb[e] = {
                        Ba: e,
                        m: d.m,
                        B: d.B
                    }
                }
        }
    },
    Uh = function(a, b, c, d) {
        Qh(a, {
            type: "sessionStateChanged",
            clientId: b,
            user: c,
            sessionState: d
        })
    },
    Vh = function(a) {
        var b = new Mh,
            c = S.Pa + S.v;
        return function(d) {
            if (d.key && 0 === d.key.indexOf(c)) {
                var e = b.Ea(d.key);
                if (Q.J(a.j, e.domain, e.crossSubDomains, e.policy)) {
                    var f;
                    if (d.newValue) try {
                        var g = I.parse(d.newValue);
                        g && (f = g.cachedValue)
                    } catch (h) {
                        return
                    }
                    Qh(a, {
                        type: "sessionSelectorChanged",
                        newValue: f,
                        crossSubDomains: e.crossSubDomains,
                        domain: e.domain,
                        policy: e.policy,
                        id: e.id
                    })
                }
            }
        }
    },
    Wh = function(a) {
        var b = new Jh,
            c = [S.Oa, a.j].join(S.v) + S.v;
        return function(d) {
            if (!d.key && we()) {
                var e = null,
                    f = [];
                for (d = 0; d < window.localStorage.length; d++) {
                    var g = window.localStorage.key(d);
                    if (0 === g.indexOf(c))
                        if (e) f.push(g);
                        else {
                            var h = window.localStorage.getItem(g);
                            f.push(g);
                            if (h) {
                                try {
                                    var k = I.parse(h)
                                } catch (l) {
                                    continue
                                }
                                k && k.cachedValue && (e = b.Ea(g), e = {
                                    type: "authResult",
                                    clientId: e.clientId,
                                    id: e.id,
                                    authResult: k.cachedValue
                                })
                            }
                        }
                }
                for (d = 0; d < f.length; d++) window.localStorage.removeItem(f[d]);
                (k = e) && Qh(a, k)
            } else if (d.key &&
                0 === d.key.indexOf(c) && d.newValue) {
                try {
                    f = I.parse(d.newValue)
                } catch (l) {
                    return
                }
                f && f.cachedValue && (k = b.Ea(d.key), k = {
                    type: "authResult",
                    clientId: k.clientId,
                    id: k.id,
                    authResult: f.cachedValue
                }, Qh(a, k))
            }
        }
    },
    Xh = function(a, b) {
        this.j = a;
        this.na = b;
        this.ld = new Kh;
        this.he = new Mh;
        this.Mc = new Nh;
        this.Ad = new Lh
    },
    Yh = function(a, b, c, d, e) {
        a.ld.H({
            origin: a.j,
            clientId: b
        }, {
            user: c.T,
            session: c.T ? c.ma : void 0
        }, d, e)
    },
    Zh = function(a, b, c) {
        a.ld.G({
            origin: a.j,
            clientId: b
        }, qh(), c)
    },
    $h = function(a, b, c, d, e, f, g) {
        a.Mc.G({
            loginHint: b,
            origin: a.j,
            clientId: c,
            responseType: d,
            scope: e,
            id: f
        }, qh(), g)
    },
    ai = function(a, b, c, d, e, f, g) {
        a.Mc.H({
            origin: a.j,
            clientId: c,
            responseType: d,
            id: f
        }, e, b, g)
    },
    bi = function(a, b, c) {
        var d = a.Mc;
        a = {
            origin: a.j,
            clientId: b
        };
        V(d).removeItem(d.u(a), c)
    },
    ci = function(a, b, c, d, e, f) {
        if (!a.J(b, c, e)) throw Error("Permission denied for '" + a.j + "' to read session selector for domain '" + b + "'.");
        a.he.G({
            domain: b,
            crossSubDomains: c,
            policy: e,
            id: d
        }, void 0, function(g) {
            f && f(g)
        })
    },
    di = function(a, b, c, d, e, f, g) {
        if (!a.J(b, c, f)) throw Error("Permission denied for '" +
            a.j + "' to write session selector for domain '" + b + "'.");
        a.he.H({
            domain: b,
            crossSubDomains: c,
            policy: f,
            id: e
        }, d, void 0, g)
    };
Xh.prototype.J = function(a, b, c) {
    return Q.J(this.j, a, b, c)
};
var ei = function(a, b, c, d) {
        a.Ad.G({
            origin: a.j,
            clientId: b,
            scope: c
        }, qh(), d)
    },
    fi = function(a, b, c, d, e) {
        a.Ad.H({
            origin: a.j,
            clientId: c
        }, d, b, e)
    },
    gi = function(a, b, c) {
        this.xa = a;
        this.h = b;
        this.o = c;
        this.ma = this.T = void 0
    },
    hi = function(a, b, c) {
        a.T ? c && void 0 !== c[a.T] ? (c = c[a.T], oh(a.ma, c) || (a.ma = c, Yh(a.o, a.xa, a, b, function() {
            Uh(a.h, a.xa, a.T, a.ma)
        }))) : a.ma && (a.ma = void 0, Yh(a.o, a.xa, a, b, function() {
            Uh(a.h, a.xa, a.T, void 0)
        })) : b && Uh(a.h, a.xa, a.T, void 0)
    },
    ji = function(a, b, c, d) {
        this.na = a;
        this.h = b;
        this.W = c;
        this.o = d;
        this.ab = void 0;
        this.I = {};
        this.Ic = [];
        var e = this;
        this.na.addListener(function(f) {
            ii(e, f)
        })
    },
    ki = function(a) {
        var b = [],
            c;
        for (c in a.I) {
            var d = a.I[c].T;
            d && b.push(d)
        }
        return b
    },
    ii = function(a, b) {
        if (b.newHash) yh(a.W, ki(a), function(d) {
            for (var e in a.I) hi(a.I[e], b.newHash, d && d.activeHints)
        });
        else
            for (var c in a.I) hi(a.I[c], b.newHash, void 0)
    },
    li = function(a, b, c, d, e) {
        var f = a.I[b];
        f || (f = new gi(b, a.h, a.o), a.I[b] = f);
        a = f;
        b = c.login_hint;
        c = c.session_state;
        a.T != b ? (a.T = b, a.ma = b ? c : void 0, Yh(a.o, a.xa, a, d, e)) : e && e()
    },
    mi = function(a, b, c) {
        var d =
            a.I[b];
        d ? c(!0) : Zh(a.o, b, function(e) {
            e ? (d = new gi(b, a.h, a.o), a.I[b] = d, d.T = e.user, d.ma = e.session, c(!0)) : xh(a.W, b, function(f) {
                f && f.valid ? (f = new gi(b, a.h, a.o), a.I[b] = f, Yh(a.o, b, f, qh(), function() {
                    c(!0)
                })) : c(!1)
            })
        })
    },
    ni = function(a, b) {
        xe() || ze() ? a.Ic.push(b) : te(we() ? document : window, "storage", b)
    },
    oi = function(a, b, c, d) {
        this.j = a;
        this.Oe = c;
        this.pg = void 0 === d ? !1 : d;
        this.h = new Oh(a, b);
        this.na = new ph(S.te);
        this.W = new uh(a);
        this.o = new Xh(a, this.na);
        this.ca = new ji(this.na, this.h, this.W, this.o)
    };
m = oi.prototype;
m.start = function() {
    var a = this,
        b = function() {
            a.h.Pf.apply(a.h, arguments)
        },
        c = function() {
            Qh(a.h, {
                type: "idpReady",
                cookieDisabled: !navigator.cookieEnabled
            });
            F("Initialize IDP IFrame successfully.")
        },
        d = function(e) {
            var f = window;
            if (f.removeEventListener) f.removeEventListener("message", b, !1);
            else if (f.detachEvent) f.detachEvent("onmessage", b);
            else throw Error("Remove event handler for message failed.");
            rh(a.na);
            Qh(a.h, {
                type: "idpError",
                error: e.message
            })
        };
    try {
        Th(this.h, this.createPolicy()), te(window, "message",
            b), ni(this.ca, Vh(this.h)), ni(this.ca, Wh(this.h)), th(this.na), Q.wf(c, d, this.Oe, this.pg)
    } catch (e) {
        d(e)
    }
};
m.Jf = function(a) {
    var b = this;
    mi(this.ca, (a.params || {}).clientId, function(c) {
        Y(b.h, a.id, c)
    })
};
m.gf = function(a) {
    var b = a.params || {},
        c = this,
        d = function(q) {
            Y(c.h, a.id, q)
        },
        e = b.clientId,
        f = b.loginHint,
        g = b.request,
        h = b.sessionSelector;
    g.client_id = e;
    g.login_hint = f;
    g.ss_domain = h.domain;
    var k = qh();
    if (k) {
        var l = !!g.enable_serial_consent,
            p = function(q) {
                q && !q.error && q.login_hint ? (q.first_issued_at = (new Date).getTime(), q.expires_at = q.first_issued_at + 1E3 * q.expires_in, q.session_state || (q.session_state = {}), l || q.scope || (q.scope = g.scope), b.skipCache ? li(c.ca, e, q, k, function() {
                    d(q)
                }) : ai(c.o, k, e, g.response_type, q, b.id,
                    function() {
                        li(c.ca, e, q, k, function() {
                            d(q)
                        })
                    })) : (q = q || {}, d(q))
            };
        b.forceRefresh ? Ah(this.W, g, p) : $h(this.o, f, e, g.response_type, g.scope, b.id, function(q) {
            q && 18E4 < q.expires_at - (new Date).getTime() ? li(c.ca, e, q, k, function() {
                d(q)
            }) : Ah(c.W, g, p)
        })
    } else Y(c.h, a.id, {
        error: "user_logged_out"
    }), b.userInteracted && (f = pi(), qi(f).sc(), f.flush())
};
m.nf = function(a) {
    var b = this,
        c = function(g) {
            Y(b.h, a.id, g)
        };
    if (qh()) {
        var d = a.params || {},
            e = d.request,
            f = d.sessionSelector;
        e.client_id = d.clientId;
        e.login_hint = d.loginHint;
        e.ss_domain = f.domain;
        Bh(this.W, e, c)
    } else c({
        error: "user_logged_out"
    })
};
m.Xf = function(a) {
    var b = a.params || {},
        c = b.clientId,
        d = this;
    this.W.revoke(b.token, function(e) {
        bi(d.o, c, function() {
            Y(d.h, a.id, e)
        })
    })
};
m.mg = function(a) {
    if (xe() || ze()) {
        var b = a.params || {},
            c = (new Jh).u({
                clientId: b.clientId,
                id: b.id,
                origin: b.origin
            });
        b = this.ca;
        if (xe() || ze()) {
            b.ab && b.ab.stop();
            b.ab = new lh(c);
            for (c = 0; c < b.Ic.length; c++) b.ab.addListener(b.Ic[c]);
            b.ab.start()
        }
    }
    Y(this.h, a.id, !0)
};
m.ff = function(a) {
    var b = this,
        c = a.params || {};
    ci(this.o, c.domain, c.crossSubDomains, c.id, c.policy, function(d) {
        Y(b.h, a.id, d)
    })
};
m.gg = function(a) {
    var b = a.params || {},
        c = b.hint,
        d = !!b.disabled,
        e = b.domain,
        f = b.crossSubDomains,
        g = b.id,
        h = b.policy,
        k = this;
    if (c || d) var l = {
        hint: c,
        disabled: d
    };
    di(this.o, e, f, l, g, h, function() {
        Qh(k.h, {
            type: "sessionSelectorChanged",
            newValue: l,
            domain: e,
            crossSubDomains: f,
            id: g,
            policy: h
        });
        Y(k.h, a.id, !0)
    })
};
m.Gf = function(a) {
    var b = a.params || {},
        c = this,
        d = function(l) {
            Y(c.h, a.id, l)
        },
        e = b.clientId,
        f = b.request,
        g = b.sessionSelector;
    f.client_id = e;
    f.response_type = "id_token";
    f.ss_domain = g.domain;
    var h = qh();
    if (h) {
        var k = function(l) {
            l && !l.error ? (l.first_issued_at = (new Date).getTime(), l.expires_at = l.first_issued_at + 1E3 * l.expires_in, l.scope = f.scope, fi(c.o, h, e, l, function() {
                d(l)
            })) : (l = l || {
                error: "No response returned from Server."
            }, d(l))
        };
        b.forceRefresh ? Ch(this.W, f, k) : ei(this.o, e, f.scope, function(l) {
            l ? d(l) : Ch(c.W, f, k)
        })
    } else d({
        scope: f.scope,
        sessions: []
    })
};
m.Me = function(a) {
    if (document.hasStorageAccess && qe(document.hasStorageAccess)) {
        var b = this;
        document.hasStorageAccess().then(function(c) {
            Y(b.h, a.id, {
                hasAccess: c
            })
        }, function(c) {
            F("CheckStorageAccess failed: " + c);
            Y(b.h, a.id, {
                hasAccess: !1
            })
        })
    } else Y(this.h, a.id, {
        hasAccess: !0
    })
};
m.Kf = function(a) {
    a = a && a.params || {};
    return a.clientId && !T(a.clientId)
};
m.tf = function(a) {
    var b = a && a.params || {};
    a = b.loginHint;
    var c = !T(b.id),
        d = b.clientId && !T(b.clientId),
        e = !!b.request,
        f = e && b.request.scope;
    (b = (e = e && b.request.response_type) && 0 <= b.request.response_type.indexOf("code")) && F("Bad request: 'code' response_type is not supported.");
    return a && c && d && f && e && !b
};
m.pf = function(a) {
    a = a && a.params || {};
    var b = !T(a.id),
        c = a.clientId && !T(a.clientId),
        d = !!a.request && a.request.scope;
    return a.loginHint && b && c && d
};
m.rf = function(a) {
    a = a && a.params || {};
    var b = a.domain && !T(a.domain),
        c = !T(a.policy);
    return !T(a.id) && b && c && this.o.J(a.domain, !!a.crossSubDomains, a.policy)
};
m.hg = function(a) {
    a = a && a.params || {};
    var b = a.domain && !T(a.domain),
        c = !T(a.policy);
    return !T(a.id) && b && c && this.o.J(a.domain, !!a.crossSubDomains, a.policy) && S.De(a)
};
m.Hf = function(a) {
    a = a && a.params || {};
    var b = a.clientId && !T(a.clientId),
        c = !!a.request && a.request.scope;
    return !T(a.id) && b && c
};
m.Yf = function(a) {
    a = a && a.params || {};
    var b = !!a.token,
        c = a.clientId && !T(a.clientId);
    return !T(a.id) && b && c
};
m.ng = function(a) {
    a = a && a.params || {};
    var b = a.origin && !T(a.origin),
        c = a.id && !T(a.id);
    return a.clientId && !T(a.clientId) && b && c
};
m.dg = function(a) {
    var b;
    if (b = a.clientId) a = a.clientId, b = !(!a || !this.ca.I[a]);
    return b
};
m.Fe = function(a) {
    var b;
    if (b = a.clientId) b = a.clientId, b = !(!b || !this.ca.I[b]);
    return b && a.id && a.authResult
};
m.Ye = function(a) {
    return !!a.hide || !!a.options
};
m.cg = function(a) {
    return a.domain && this.o.J(a.domain, a.crossSubDomains, a.policy)
};
var Z = function(a, b) {
    return function() {
        return b.apply(a, arguments)
    }
};
oi.prototype.createPolicy = function() {
    var a = {
        F: [],
        X: [],
        Aa: []
    };
    ri(this, a);
    return a
};
var ri = function(a, b) {
        b.F.push({
            method: "monitorClient",
            m: Z(a, a.Jf),
            aa: !1,
            B: Z(a, a.Kf)
        });
        b.F.push({
            method: "getTokenResponse",
            m: Z(a, a.gf),
            aa: !0,
            B: Z(a, a.tf)
        });
        b.F.push({
            method: "getOnlineCode",
            m: Z(a, a.nf),
            aa: !0,
            B: Z(a, a.pf)
        });
        b.F.push({
            method: "getSessionSelector",
            m: Z(a, a.ff),
            aa: !0,
            B: Z(a, a.rf)
        });
        b.F.push({
            method: "setSessionSelector",
            m: Z(a, a.gg),
            aa: !1,
            B: Z(a, a.hg)
        });
        b.F.push({
            method: "listIdpSessions",
            m: Z(a, a.Gf),
            aa: !0,
            B: Z(a, a.Hf)
        });
        b.F.push({
            method: "revoke",
            m: Z(a, a.Xf),
            B: Z(a, a.Yf)
        });
        b.F.push({
            method: "startPolling",
            m: Z(a, a.mg),
            B: Z(a, a.ng)
        });
        b.X.push({
            type: "idpReady"
        });
        b.X.push({
            type: "idpError"
        });
        b.X.push({
            type: "sessionStateChanged",
            filter: Z(a, a.dg)
        });
        b.X.push({
            type: "sessionSelectorChanged",
            filter: Z(a, a.cg)
        });
        b.X.push({
            type: "authResult",
            filter: Z(a, a.Fe)
        });
        b.X.push({
            type: "displayIFrame",
            filter: Z(a, a.Ye)
        });
        b.F.push({
            method: "checkStorageAccess",
            m: Z(a, a.Me),
            aa: !0
        })
    },
    si = function(a) {
        this.ge = a
    },
    qi = function(a) {
        a = new Le(a.ge);
        return new ti(a)
    };
si.prototype.flush = function() {
    this.ge.Gc()
};
var pi = function() {
        var a = new $g;
        a = new Je(a);
        return new si(a)
    },
    ti = function(a) {
        this.Qe = a;
        this.Ke = Za() ? "IE" : Ya() ? "Opera" : B("OPR") ? "OPR" : B("Edge") ? "Edge" : B("Edg/") ? "Edg" : cb() ? "Android" : bb() ? "Chrome" : $a() ? "Firefox" : !B("iPad") && !B("iPhone") || ab() || bb() || B("Coast") || $a() || !B("AppleWebKit") ? ab() ? "Safari" : "Other" : "iOS Webview";
        (a = eb()) ? (a = a.split("."), a = 2 > a.length ? a[0] : a[0] + "." + a[1]) : a = "N/A";
        this.Je = a
    };
ti.prototype.sc = function() {
    this.Qe.sc(this.Ke, this.Je)
};
var ui = "client_id origin ss_domain scope privileged authuser".split(" ");
S.ob = "response_type login_hint client_id origin scope ss_domain authuser hd include_granted_scopes nonce spec_compliant".split(" ");
var vi = function() {};
G(vi, W);
vi.prototype.u = function(a) {
    a = void 0 === a ? {} : a;
    return ["gsi_gs", void 0 === a.origin ? null : a.origin, void 0 === a.clientId ? null : a.clientId].join(S.v)
};
vi.prototype.G = function(a, b, c) {
    var d = this;
    c = void 0 === c ? function() {} : c;
    W.prototype.G.call(this, a, b, function(e) {
        e ? !e.expires_at || e.expires_at <= (new Date).getTime() ? V(d).removeItem(d.u(a), function() {
            return c(null)
        }) : (e.expires_at = void 0, c(e)) : c(null)
    })
};
vi.prototype.H = function(a, b, c, d) {
    b && (b.expires_at = (new Date).getTime() + 864E5);
    W.prototype.H.call(this, a, b, c, d)
};
var xi = function(a, b, c) {
    b.origin = a.j;
    b.privileged = !0;
    b = zh(b, ui);
    wh(S.Ub, b, wi(a.j), function(d) {
        c(d)
    })
};

function wi(a) {
    var b = {},
        c = S.qf();
    if (c) {
        if (!c) throw Error("Session cookie value cannot be empty.");
        c = new Db(new Eb, Ha(c));
        a = Ha(a);
        c.reset();
        c.update(a);
        a = c.digest();
        a = Bb(a);
        b["X-Csrf-Token"] = a
    }
    return b
};
oi.prototype.df = function(a) {
    var b = this;
    a = void 0 === a ? {} : a;
    var c = a.id,
        d = void 0 === a.params ? {} : a.params,
        e = function(p) {
            p && p.sessions ? (p = yi(f, p.sessions), Y(b.h, c, p)) : Y(b.h, c, null)
        },
        f = d.loginHint;
    delete d.loginHint;
    var g = qh();
    if (g) {
        a = d.clientId;
        var h = d.request;
        d = d.sessionSelector;
        h.client_id = a;
        h.ss_domain = d.domain;
        var k = new vi,
            l = {
                clientId: a,
                origin: this.j
            };
        k.G(l, g, function(p) {
            p ? e(p) : xi(b.W, h, function(q) {
                !q || q.error ? e(null) : k.H(l, q, g, function() {
                    e(q)
                })
            })
        })
    } else e(null)
};

function yi(a, b) {
    if (!b.length) return null;
    var c = a.toLowerCase();
    b = t(b);
    for (var d = b.next(); !d.done; d = b.next())
        if (d = d.value, d.login_hint) {
            if (a === d.obfuscatedGaiaId) return d.login_hint;
            if (d.emails && d.emails.length)
                for (var e = t(d.emails), f = e.next(); !f.done; f = e.next())
                    if (c === f.value.toLowerCase()) return d.login_hint
        }
    return null
}
oi.prototype.kg = function(a) {
    zi(this, a, !1)
};
oi.prototype.lg = function(a) {
    zi(this, a, !0)
};
var zi = function(a, b, c) {
    document.requestStorageAccess && qe(document.requestStorageAccess) ? document.hasStorageAccess().then(function(d) {
        if (d) Y(a.h, b.id, {
            hasAccess: !0
        });
        else {
            d = new Fd({
                origin: a.j
            });
            var e = document.getElementById("container");
            (c ? d.Tf : d.Sf).call(d, e, function() {
                Sh(a.h);
                Y(a.h, b.id, {
                    hasAccess: !0
                })
            }, function() {
                Sh(a.h);
                Y(a.h, b.id, {
                    hasAccess: !1
                })
            });
            Rh(a.h)
        }
    }, function(d) {
        F("StorageAccess check failed: " + d);
        Y(a.h, b.id, {
            hasAccess: !1
        })
    }) : Y(a.h, b.id, {
        hasAccess: !0
    })
};
oi.prototype.ef = function(a) {
    a = void 0 === a ? {} : a;
    a = void 0 === a.params ? {} : a.params;
    var b = !!a.clientId && !T(a.clientId),
        c = !!a.request,
        d = !!a.sessionSelector;
    return !!a.loginHint && b && c && d
};
oi.prototype.createPolicy = function() {
    var a = {
        F: [],
        Aa: [],
        X: []
    };
    ri(this, a);
    a.F.push({
        method: "gsi:fetchLoginHint",
        m: Z(this, this.df),
        aa: !0,
        B: Z(this, this.ef)
    });
    a.Aa.push({
        Ba: "itpNewGrant",
        m: Z(this, this.kg)
    });
    a.Aa.push({
        Ba: "itpRegrant",
        m: Z(this, this.lg)
    });
    return a
};
S.$c = "/o/oauth2/iframerpc?action=sessionState";
S.Uc = "/o/oauth2/iframerpc?action=checkOrigin";
S.Yc = "/o/oauth2/iframerpc?action=issueToken";
S.Xc = "/o/oauth2/iframerpc?action=issueOnlineCode";
S.Ub = "/o/oauth2/iframerpc?action=listSessions";
var Ai = function() {
        var a = se("origin"),
            b = !!se("supportBlocked3PCookies");
        if (!a) throw Error("Failed to get parent origin from URL hash!");
        var c = se("rpcToken");
        if (!c) throw Error("Failed to get rpcToken from URL hash!");
        var d = !!se("clearCache"),
            e = se("debug");
        oe = "0" != e && !!e;
        (new oi(a, c, d, b)).start()
    },
    Bi = ["lso", "startIdpIFrame"],
    Ci = x;
Bi[0] in Ci || "undefined" == typeof Ci.execScript || Ci.execScript("var " + Bi[0]);
for (var Di; Bi.length && (Di = Bi.shift());) Bi.length || void 0 === Ai ? Ci = Ci[Di] && Ci[Di] !== Object.prototype[Di] ? Ci[Di] : Ci[Di] = {} : Ci[Di] = Ai;