!function(e) {
    "function" == typeof define && define.amd ? define("inputmask", ["inputmask.dependencyLib"], e) : "object" == typeof exports ? module.exports = e(require("./inputmask.dependencyLib")) : e(window.dependencyLib || jQuery)
}(function(e) {
    function t(i, a) {
        return this instanceof t ? (e.isPlainObject(i) ? a = i : (a = a || {},
        a.alias = i),
        this.el = void 0,
        this.opts = e.extend(!0, {}, this.defaults, a),
        this.maskset = void 0,
        this.noMasksCache = a && void 0 !== a.definitions,
        this.userOptions = a || {},
        this.events = {},
        this.dataAttribute = "data-inputmask",
        this.isRTL = this.opts.numericInput,
        this.refreshValue = !1,
        n(this.opts.alias, a, this.opts),
        void 0) : new t(i,a)
    }
    function n(t, i, a) {
        var o = a.aliases[t];
        return o ? (o.alias && n(o.alias, void 0, a),
        e.extend(!0, a, o),
        e.extend(!0, a, i),
        !0) : (null === a.mask && (a.mask = t),
        !1)
    }
    function i(n, i) {
        function a(n, a, o) {
            if (null !== n && "" !== n) {
                if (1 === n.length && o.greedy === !1 && 0 !== o.repeat && (o.placeholder = ""),
                o.repeat > 0 || "*" === o.repeat || "+" === o.repeat) {
                    var r = "*" === o.repeat ? 0 : "+" === o.repeat ? 1 : o.repeat;
                    n = o.groupmarker.start + n + o.groupmarker.end + o.quantifiermarker.start + r + "," + o.repeat + o.quantifiermarker.end
                }
                var s;
                return void 0 === t.prototype.masksCache[n] || i === !0 ? (s = {
                    mask: n,
                    maskToken: t.prototype.analyseMask(n, o),
                    validPositions: {},
                    _buffer: void 0,
                    buffer: void 0,
                    tests: {},
                    metadata: a,
                    maskLength: void 0
                },
                i !== !0 && (t.prototype.masksCache[o.numericInput ? n.split("").reverse().join("") : n] = s,
                s = e.extend(!0, {}, t.prototype.masksCache[o.numericInput ? n.split("").reverse().join("") : n]))) : s = e.extend(!0, {}, t.prototype.masksCache[o.numericInput ? n.split("").reverse().join("") : n]),
                s
            }
        }
        var o;
        if (e.isFunction(n.mask) && (n.mask = n.mask(n)),
        e.isArray(n.mask)) {
            if (n.mask.length > 1) {
                n.keepStatic = null === n.keepStatic || n.keepStatic;
                var r = n.groupmarker.start;
                return e.each(n.numericInput ? n.mask.reverse() : n.mask, function(t, i) {
                    r.length > 1 && (r += n.groupmarker.end + n.alternatormarker + n.groupmarker.start),
                    r += void 0 === i.mask || e.isFunction(i.mask) ? i : i.mask
                }),
                r += n.groupmarker.end,
                a(r, n.mask, n)
            }
            n.mask = n.mask.pop()
        }
        return n.mask && (o = void 0 === n.mask.mask || e.isFunction(n.mask.mask) ? a(n.mask, n.mask, n) : a(n.mask.mask, n.mask, n)),
        o
    }
    function a(n, i, o) {
        function u(e, t, n) {
            t = t || 0;
            var i, a, r, s = [], l = 0, c = p();
            V = void 0 !== q ? q.maxLength : void 0,
            V === -1 && (V = void 0);
            do
                e === !0 && d().validPositions[l] ? (r = d().validPositions[l],
                a = r.match,
                i = r.locator.slice(),
                s.push(n === !0 ? r.input : n === !1 ? a.nativeDef : j(l, a))) : (r = m(l, i, l - 1),
                a = r.match,
                i = r.locator.slice(),
                (o.jitMasking === !1 || l < c || "number" == typeof o.jitMasking && isFinite(o.jitMasking) && o.jitMasking > l) && s.push(n === !1 ? a.nativeDef : j(l, a))),
                l++;
            while ((void 0 === V || l < V) && (null !== a.fn || "" !== a.def) || t > l);
            return "" === s[s.length - 1] && s.pop(),
            d().maskLength = l + 1,
            s
        }
        function d() {
            return i
        }
        function f(e) {
            var t = d();
            t.buffer = void 0,
            e !== !0 && (t._buffer = void 0,
            t.validPositions = {},
            t.p = 0)
        }
        function p(e, t, n) {
            var i = -1
              , a = -1
              , o = n || d().validPositions;
            void 0 === e && (e = -1);
            for (var r in o) {
                var s = parseInt(r);
                o[s] && (t || o[s].generatedInput !== !0) && (s <= e && (i = s),
                s >= e && (a = s))
            }
            return i !== -1 && e - i > 1 || a < e ? i : a
        }
        function v(t, n, i, a) {
            function r(e) {
                var t = d().validPositions[e];
                if (void 0 !== t && null === t.match.fn) {
                    var n = d().validPositions[e - 1]
                      , i = d().validPositions[e + 1];
                    return void 0 !== n && void 0 !== i
                }
                return !1
            }
            var s, l = t, c = e.extend(!0, {}, d().validPositions), u = !1;
            for (d().p = t,
            s = n - 1; s >= l; s--)
                void 0 !== d().validPositions[s] && (i !== !0 && (!d().validPositions[s].match.optionality && r(s) || o.canClearPosition(d(), s, p(), a, o) === !1) || delete d().validPositions[s]);
            for (f(!0),
            s = l + 1; s <= p(); ) {
                for (; void 0 !== d().validPositions[l]; )
                    l++;
                if (s < l && (s = l + 1),
                void 0 === d().validPositions[s] && A(s))
                    s++;
                else {
                    var v = m(s);
                    u === !1 && c[l] && c[l].match.def === v.match.def ? (d().validPositions[l] = e.extend(!0, {}, c[l]),
                    d().validPositions[l].input = v.input,
                    delete d().validPositions[s],
                    s++) : g(l, v.match.def) ? _(l, v.input || j(s), !0) !== !1 && (delete d().validPositions[s],
                    s++,
                    u = !0) : A(s) || (s++,
                    l--),
                    l++
                }
            }
            f(!0)
        }
        function h(e, t) {
            for (var n, i = e, a = p(), r = d().validPositions[a] || y(0)[0], s = void 0 !== r.alternation ? r.locator[r.alternation].toString().split(",") : [], l = 0; l < i.length && (n = i[l],
            !(n.match && (o.greedy && n.match.optionalQuantifier !== !0 || (n.match.optionality === !1 || n.match.newBlockMarker === !1) && n.match.optionalQuantifier !== !0) && (void 0 === r.alternation || r.alternation !== n.alternation || void 0 !== n.locator[r.alternation] && w(n.locator[r.alternation].toString().split(","), s))) || t === !0 && (null !== n.match.fn || /[0-9a-bA-Z]/.test(n.match.def))); l++)
                ;
            return n
        }
        function m(e, t, n) {
            return d().validPositions[e] || h(y(e, t ? t.slice() : t, n))
        }
        function k(e) {
            return d().validPositions[e] ? d().validPositions[e] : y(e)[0]
        }
        function g(e, t) {
            for (var n = !1, i = y(e), a = 0; a < i.length; a++)
                if (i[a].match && i[a].match.def === t) {
                    n = !0;
                    break
                }
            return n
        }
        function y(t, n, i) {
            function a(n, i, r, s) {
                function c(r, s, f) {
                    function h(t, n) {
                        var i = 0 === e.inArray(t, n.matches);
                        return i || e.each(n.matches, function(e, a) {
                            if (a.isQuantifier === !0 && (i = h(t, n.matches[e - 1])))
                                return !1
                        }),
                        i
                    }
                    function k(t, n, i) {
                        var a, o;
                        return (d().tests[t] || d().validPositions[t]) && e.each(d().tests[t] || [d().validPositions[t]], function(e, t) {
                            var r = void 0 !== i ? i : t.alternation
                              , s = void 0 !== t.locator[r] ? t.locator[r].toString().indexOf(n) : -1;
                            (void 0 === o || s < o) && s !== -1 && (a = t,
                            o = s)
                        }),
                        a ? a.locator.slice((void 0 !== i ? i : a.alternation) + 1) : void 0 !== i ? k(t, n) : void 0
                    }
                    function g(e, n) {
                        return null === e.match.fn && null !== n.match.fn && n.match.fn.test(e.match.def, d(), t, !1, o, !1)
                    }
                    if (u > 1e4)
                        throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + d().mask;
                    if (u === t && void 0 === r.matches)
                        return p.push({
                            match: r,
                            locator: s.reverse(),
                            cd: m
                        }),
                        !0;
                    if (void 0 !== r.matches) {
                        if (r.isGroup && f !== r) {
                            if (r = c(n.matches[e.inArray(r, n.matches) + 1], s))
                                return !0
                        } else if (r.isOptional) {
                            var y = r;
                            if (r = a(r, i, s, f)) {
                                if (l = p[p.length - 1].match,
                                !h(l, y))
                                    return !0;
                                v = !0,
                                u = t
                            }
                        } else if (r.isAlternator) {
                            var b, P = r, E = [], C = p.slice(), w = s.length, _ = i.length > 0 ? i.shift() : -1;
                            if (_ === -1 || "string" == typeof _) {
                                var A, x = u, M = i.slice(), O = [];
                                if ("string" == typeof _)
                                    O = _.split(",");
                                else
                                    for (A = 0; A < P.matches.length; A++)
                                        O.push(A);
                                for (var S = 0; S < O.length; S++) {
                                    if (A = parseInt(O[S]),
                                    p = [],
                                    i = k(u, A, w) || M.slice(),
                                    r = c(P.matches[A] || n.matches[A], [A].concat(s), f) || r,
                                    r !== !0 && void 0 !== r && O[O.length - 1] < P.matches.length) {
                                        var j = e.inArray(r, n.matches) + 1;
                                        n.matches.length > j && (r = c(n.matches[j], [j].concat(s.slice(1, s.length)), f),
                                        r && (O.push(j.toString()),
                                        e.each(p, function(e, t) {
                                            t.alternation = s.length - 1
                                        })))
                                    }
                                    b = p.slice(),
                                    u = x,
                                    p = [];
                                    for (var D = 0; D < b.length; D++) {
                                        var T = b[D]
                                          , I = !1;
                                        T.alternation = T.alternation || w;
                                        for (var G = 0; G < E.length; G++) {
                                            var L = E[G];
                                            if (("string" != typeof _ || e.inArray(T.locator[T.alternation].toString(), O) !== -1) && (T.match.def === L.match.def || g(T, L))) {
                                                I = T.match.nativeDef === L.match.nativeDef,
                                                T.alternation == L.alternation && L.locator[L.alternation].toString().indexOf(T.locator[T.alternation]) === -1 && (L.locator[L.alternation] = L.locator[L.alternation] + "," + T.locator[T.alternation],
                                                L.alternation = T.alternation,
                                                null == T.match.fn && (L.na = L.na || T.locator[T.alternation].toString(),
                                                L.na.indexOf(T.locator[T.alternation]) === -1 && (L.na = L.na + "," + T.locator[T.alternation])));
                                                break
                                            }
                                        }
                                        I || E.push(T)
                                    }
                                }
                                "string" == typeof _ && (E = e.map(E, function(t, n) {
                                    if (isFinite(n)) {
                                        var i, a = t.alternation, o = t.locator[a].toString().split(",");
                                        t.locator[a] = void 0,
                                        t.alternation = void 0;
                                        for (var r = 0; r < o.length; r++)
                                            i = e.inArray(o[r], O) !== -1,
                                            i && (void 0 !== t.locator[a] ? (t.locator[a] += ",",
                                            t.locator[a] += o[r]) : t.locator[a] = parseInt(o[r]),
                                            t.alternation = a);
                                        if (void 0 !== t.locator[a])
                                            return t
                                    }
                                })),
                                p = C.concat(E),
                                u = t,
                                v = p.length > 0,
                                i = M.slice()
                            } else
                                r = c(P.matches[_] || n.matches[_], [_].concat(s), f);
                            if (r)
                                return !0
                        } else if (r.isQuantifier && f !== n.matches[e.inArray(r, n.matches) - 1])
                            for (var B = r, F = i.length > 0 ? i.shift() : 0; F < (isNaN(B.quantifier.max) ? F + 1 : B.quantifier.max) && u <= t; F++) {
                                var N = n.matches[e.inArray(B, n.matches) - 1];
                                if (r = c(N, [F].concat(s), N)) {
                                    if (l = p[p.length - 1].match,
                                    l.optionalQuantifier = F > B.quantifier.min - 1,
                                    h(l, N)) {
                                        if (F > B.quantifier.min - 1) {
                                            v = !0,
                                            u = t;
                                            break
                                        }
                                        return !0
                                    }
                                    return !0
                                }
                            }
                        else if (r = a(r, i, s, f))
                            return !0
                    } else
                        u++
                }
                for (var f = i.length > 0 ? i.shift() : 0; f < n.matches.length; f++)
                    if (n.matches[f].isQuantifier !== !0) {
                        var h = c(n.matches[f], [f].concat(r), s);
                        if (h && u === t)
                            return h;
                        if (u > t)
                            break
                    }
            }
            function r(t) {
                var n = [];
                return e.isArray(t) || (t = [t]),
                t.length > 0 && (void 0 === t[0].alternation ? (n = h(t.slice()).locator.slice(),
                0 === n.length && (n = t[0].locator.slice())) : e.each(t, function(e, t) {
                    if ("" !== t.def)
                        if (0 === n.length)
                            n = t.locator.slice();
                        else
                            for (var i = 0; i < n.length; i++)
                                t.locator[i] && n[i].toString().indexOf(t.locator[i]) === -1 && (n[i] += "," + t.locator[i])
                })),
                n
            }
            function s(e) {
                return o.keepStatic && t > 0 && e.length > 1 + ("" === e[e.length - 1].match.def ? 1 : 0) && e[0].match.optionality !== !0 && e[0].match.optionalQuantifier !== !0 && null === e[0].match.fn && !/[0-9a-bA-Z]/.test(e[0].match.def) ? [h(e)] : e
            }
            var l, c = d().maskToken, u = n ? i : 0, f = n ? n.slice() : [0], p = [], v = !1, m = n ? n.join("") : "";
            if (t > -1) {
                if (void 0 === n) {
                    for (var k, g = t - 1; void 0 === (k = d().validPositions[g] || d().tests[g]) && g > -1; )
                        g--;
                    void 0 !== k && g > -1 && (f = r(k),
                    m = f.join(""),
                    u = g)
                }
                if (d().tests[t] && d().tests[t][0].cd === m)
                    return s(d().tests[t]);
                for (var y = f.shift(); y < c.length; y++) {
                    var b = a(c[y], f, [y]);
                    if (b && u === t || u > t)
                        break
                }
            }
            return (0 === p.length || v) && p.push({
                match: {
                    fn: null,
                    cardinality: 0,
                    optionality: !0,
                    casing: null,
                    def: "",
                    placeholder: ""
                },
                locator: [],
                cd: m
            }),
            void 0 !== n && d().tests[t] ? s(e.extend(!0, [], p)) : (d().tests[t] = e.extend(!0, [], p),
            s(d().tests[t]))
        }
        function b() {
            return void 0 === d()._buffer && (d()._buffer = u(!1, 1),
            void 0 === d().buffer && d()._buffer.slice()),
            d()._buffer
        }
        function P(e) {
            return void 0 !== d().buffer && e !== !0 || (d().buffer = u(!0, p(), !0)),
            d().buffer
        }
        function E(e, t, n) {
            var i;
            if (e === !0)
                f(),
                e = 0,
                t = n.length;
            else
                for (i = e; i < t; i++)
                    delete d().validPositions[i];
            for (i = e; i < t; i++)
                f(!0),
                n[i] !== o.skipOptionalPartCharacter && _(i, n[i], !0, !0)
        }
        function C(e, n, i) {
            switch (o.casing || n.casing) {
            case "upper":
                e = e.toUpperCase();
                break;
            case "lower":
                e = e.toLowerCase();
                break;
            case "title":
                var a = d().validPositions[i - 1];
                e = 0 === i || a && a.input === String.fromCharCode(t.keyCode.SPACE) ? e.toUpperCase() : e.toLowerCase()
            }
            return e
        }
        function w(t, n) {
            for (var i = o.greedy ? n : n.slice(0, 1), a = !1, r = 0; r < t.length; r++)
                if (e.inArray(t[r], i) !== -1) {
                    a = !0;
                    break
                }
            return a
        }
        function _(n, i, a, r, s) {
            function l(e) {
                var t = z ? e.begin - e.end > 1 || e.begin - e.end === 1 && o.insertMode : e.end - e.begin > 1 || e.end - e.begin === 1 && o.insertMode;
                return t && 0 === e.begin && e.end === d().maskLength ? "full" : t
            }
            function c(t, i, a) {
                var s = !1;
                return e.each(y(t), function(c, u) {
                    for (var h = u.match, m = i ? 1 : 0, k = "", g = h.cardinality; g > m; g--)
                        k += O(t - (g - 1));
                    if (i && (k += i),
                    P(!0),
                    s = null != h.fn ? h.fn.test(k, d(), t, a, o, l(n)) : (i === h.def || i === o.skipOptionalPartCharacter) && "" !== h.def && {
                        c: h.placeholder || h.def,
                        pos: t
                    },
                    s !== !1) {
                        var y = void 0 !== s.c ? s.c : i;
                        y = y === o.skipOptionalPartCharacter && null === h.fn ? h.placeholder || h.def : y;
                        var w = t
                          , A = P();
                        if (void 0 !== s.remove && (e.isArray(s.remove) || (s.remove = [s.remove]),
                        e.each(s.remove.sort(function(e, t) {
                            return t - e
                        }), function(e, t) {
                            v(t, t + 1, !0)
                        })),
                        void 0 !== s.insert && (e.isArray(s.insert) || (s.insert = [s.insert]),
                        e.each(s.insert.sort(function(e, t) {
                            return e - t
                        }), function(e, t) {
                            _(t.pos, t.c, !0, r)
                        })),
                        s.refreshFromBuffer) {
                            var x = s.refreshFromBuffer;
                            if (a = !0,
                            E(x === !0 ? x : x.start, x.end, A),
                            void 0 === s.pos && void 0 === s.c)
                                return s.pos = p(),
                                !1;
                            if (w = void 0 !== s.pos ? s.pos : t,
                            w !== t)
                                return s = e.extend(s, _(w, y, !0, r)),
                                !1
                        } else if (s !== !0 && void 0 !== s.pos && s.pos !== t && (w = s.pos,
                        E(t, w, P().slice()),
                        w !== t))
                            return s = e.extend(s, _(w, y, !0)),
                            !1;
                        return (s === !0 || void 0 !== s.pos || void 0 !== s.c) && (c > 0 && f(!0),
                        b(w, e.extend({}, u, {
                            input: C(y, h, w)
                        }), r, l(n)) || (s = !1),
                        !1)
                    }
                }),
                s
            }
            function u(t, n, i) {
                var a, s, l, c, u, v, h, m, k = e.extend(!0, {}, d().validPositions), g = !1, b = p();
                for (c = d().validPositions[b]; b >= 0; b--)
                    if (l = d().validPositions[b],
                    l && void 0 !== l.alternation) {
                        if (a = b,
                        s = d().validPositions[a].alternation,
                        c.locator[l.alternation] !== l.locator[l.alternation])
                            break;
                        c = l
                    }
                if (void 0 !== s) {
                    m = parseInt(a);
                    var P = void 0 !== c.locator[c.alternation || s] ? c.locator[c.alternation || s] : h[0];
                    P.length > 0 && (P = P.split(",")[0]);
                    var E = d().validPositions[m]
                      , C = d().validPositions[m - 1];
                    e.each(y(m, C ? C.locator : void 0, m - 1), function(a, l) {
                        h = l.locator[s] ? l.locator[s].toString().split(",") : [];
                        for (var c = 0; c < h.length; c++) {
                            var y = []
                              , b = 0
                              , C = 0
                              , w = !1;
                            if (P < h[c] && (void 0 === l.na || e.inArray(h[c], l.na.split(",")) === -1)) {
                                d().validPositions[m] = e.extend(!0, {}, l);
                                var A = d().validPositions[m].locator;
                                for (d().validPositions[m].locator[s] = parseInt(h[c]),
                                null == l.match.fn ? (E.input !== l.match.def && (w = !0,
                                E.generatedInput !== !0 && y.push(E.input)),
                                C++,
                                d().validPositions[m].generatedInput = !/[0-9a-bA-Z]/.test(l.match.def),
                                d().validPositions[m].input = l.match.def) : d().validPositions[m].input = E.input,
                                u = m + 1; u < p(void 0, !0) + 1; u++)
                                    v = d().validPositions[u],
                                    v && v.generatedInput !== !0 && /[0-9a-bA-Z]/.test(v.input) ? y.push(v.input) : u < t && b++,
                                    delete d().validPositions[u];
                                for (w && y[0] === l.match.def && y.shift(),
                                f(!0),
                                g = !0; y.length > 0; ) {
                                    var x = y.shift();
                                    if (x !== o.skipOptionalPartCharacter && !(g = _(p(void 0, !0) + 1, x, !1, r, !0)))
                                        break
                                }
                                if (g) {
                                    d().validPositions[m].locator = A;
                                    var M = p(t) + 1;
                                    for (u = m + 1; u < p() + 1; u++)
                                        v = d().validPositions[u],
                                        (void 0 === v || null == v.match.fn) && u < t + (C - b) && C++;
                                    t += C - b,
                                    g = _(t > M ? M : t, n, i, r, !0)
                                }
                                if (g)
                                    return !1;
                                f(),
                                d().validPositions = e.extend(!0, {}, k)
                            }
                        }
                    })
                }
                return g
            }
            function k(t, n) {
                var i = d().validPositions[n];
                if (i)
                    for (var a = i.locator, o = a.length, r = t; r < n; r++)
                        if (void 0 === d().validPositions[r] && !A(r, !0)) {
                            var s = y(r)
                              , l = s[0]
                              , c = -1;
                            e.each(s, function(e, t) {
                                for (var n = 0; n < o && (void 0 !== t.locator[n] && w(t.locator[n].toString().split(","), a[n].toString().split(","))); n++)
                                    c < n && (c = n,
                                    l = t)
                            }),
                            b(r, e.extend({}, l, {
                                input: l.match.placeholder || l.match.def
                            }), !0)
                        }
            }
            function b(t, n, i, a) {
                if (a || o.insertMode && void 0 !== d().validPositions[t] && void 0 === i) {
                    var r, s = e.extend(!0, {}, d().validPositions), l = p(void 0, !0);
                    for (r = t; r <= l; r++)
                        delete d().validPositions[r];
                    d().validPositions[t] = e.extend(!0, {}, n);
                    var c, u = !0, v = d().validPositions, h = !1, m = d().maskLength;
                    for (r = c = t; r <= l; r++) {
                        var k = s[r];
                        if (void 0 !== k)
                            for (var y = c; y < d().maskLength && (null === k.match.fn && v[r] && (v[r].match.optionalQuantifier === !0 || v[r].match.optionality === !0) || null != k.match.fn); ) {
                                if (y++,
                                h === !1 && s[y] && s[y].match.def === k.match.def)
                                    d().validPositions[y] = e.extend(!0, {}, s[y]),
                                    d().validPositions[y].input = k.input,
                                    M(y),
                                    c = y,
                                    u = !0;
                                else if (g(y, k.match.def)) {
                                    var b = _(y, k.input, !0, !0);
                                    u = b !== !1,
                                    c = b.caret || b.insert ? p() : y,
                                    h = !0
                                } else
                                    u = k.generatedInput === !0;
                                if (d().maskLength < m && (d().maskLength = m),
                                u)
                                    break
                            }
                        if (!u)
                            break
                    }
                    if (!u)
                        return d().validPositions = e.extend(!0, {}, s),
                        f(!0),
                        !1
                } else
                    d().validPositions[t] = e.extend(!0, {}, n);
                return f(!0),
                !0
            }
            function M(t) {
                for (var n = t - 1; n > -1 && !d().validPositions[n]; n--)
                    ;
                var i, a;
                for (n++; n < t; n++)
                    void 0 === d().validPositions[n] && (o.jitMasking === !1 || o.jitMasking > n) && (a = y(n, m(n - 1).locator, n - 1).slice(),
                    "" === a[a.length - 1].match.def && a.pop(),
                    i = h(a),
                    i && (i.match.def === o.radixPointDefinitionSymbol || !A(n, !0) || e.inArray(o.radixPoint, P()) < n && i.match.fn && i.match.fn.test(j(n), d(), n, !1, o)) && (D = c(n, i.match.placeholder || (null == i.match.fn ? i.match.def : "" !== j(n) ? j(n) : P()[n]), !0),
                    D !== !1 && (d().validPositions[D.pos || n].generatedInput = !0)))
            }
            a = a === !0;
            var S = n;
            void 0 !== n.begin && (S = z && !l(n) ? n.end : n.begin);
            var D = !1
              , T = e.extend(!0, {}, d().validPositions);
            if (M(S),
            l(n) && (F(void 0, t.keyCode.DELETE, n),
            S = d().p),
            S < d().maskLength && (D = c(S, i, a),
            (!a || r === !0) && D === !1)) {
                var I = d().validPositions[S];
                if (!I || null !== I.match.fn || I.match.def !== i && i !== o.skipOptionalPartCharacter) {
                    if ((o.insertMode || void 0 === d().validPositions[x(S)]) && !A(S, !0)) {
                        var G = y(S).slice();
                        "" === G[G.length - 1].match.def && G.pop();
                        var L = h(G, !0);
                        L && null === L.match.fn && (L = L.match.placeholder || L.match.def,
                        c(S, L, a),
                        d().validPositions[S].generatedInput = !0);
                        for (var B = S + 1, N = x(S); B <= N; B++)
                            if (D = c(B, i, a),
                            D !== !1) {
                                k(S, void 0 !== D.pos ? D.pos : B),
                                S = B;
                                break
                            }
                    }
                } else
                    D = {
                        caret: x(S)
                    }
            }
            return D === !1 && o.keepStatic && !a && s !== !0 && (D = u(S, i, a)),
            D === !0 && (D = {
                pos: S
            }),
            e.isFunction(o.postValidation) && D !== !1 && !a && r !== !0 && (D = !!o.postValidation(P(!0), D, o) && D),
            void 0 === D.pos && (D.pos = S),
            D === !1 && (f(!0),
            d().validPositions = e.extend(!0, {}, T)),
            D
        }
        function A(e, t) {
            var n;
            if (t ? (n = m(e).match,
            "" === n.def && (n = k(e).match)) : n = k(e).match,
            null != n.fn)
                return n.fn;
            if (t !== !0 && e > -1) {
                var i = y(e);
                return i.length > 1 + ("" === i[i.length - 1].match.def ? 1 : 0)
            }
            return !1
        }
        function x(e, t) {
            var n = d().maskLength;
            if (e >= n)
                return n;
            for (var i = e; ++i < n && (t === !0 && (k(i).match.newBlockMarker !== !0 || !A(i)) || t !== !0 && !A(i)); )
                ;
            return i
        }
        function M(e, t) {
            var n, i = e;
            if (i <= 0)
                return 0;
            for (; --i > 0 && (t === !0 && k(i).match.newBlockMarker !== !0 || t !== !0 && !A(i) && (n = y(i),
            n.length < 2 || 2 === n.length && "" === n[1].match.def)); )
                ;
            return i
        }
        function O(e) {
            return void 0 === d().validPositions[e] ? j(e) : d().validPositions[e].input
        }
        function S(t, n, i, a, r) {
            if (a && e.isFunction(o.onBeforeWrite)) {
                var s = o.onBeforeWrite(a, n, i, o);
                if (s) {
                    if (s.refreshFromBuffer) {
                        var l = s.refreshFromBuffer;
                        E(l === !0 ? l : l.start, l.end, s.buffer || n),
                        n = P(!0)
                    }
                    void 0 !== i && (i = void 0 !== s.caret ? s.caret : i)
                }
            }
            t.inputmask._valueSet(n.join("")),
            void 0 === i || void 0 !== a && "blur" === a.type ? R(t, n, i) : I(t, i),
            r === !0 && (X = !0,
            e(t).trigger("input"))
        }
        function j(e, t) {
            if (t = t || k(e).match,
            void 0 !== t.placeholder)
                return t.placeholder;
            if (null === t.fn) {
                if (e > -1 && void 0 === d().validPositions[e]) {
                    var n, i = y(e), a = [];
                    if (i.length > 1 + ("" === i[i.length - 1].match.def ? 1 : 0))
                        for (var r = 0; r < i.length; r++)
                            if (i[r].match.optionality !== !0 && i[r].match.optionalQuantifier !== !0 && (null === i[r].match.fn || void 0 === n || i[r].match.fn.test(n.match.def, d(), e, !0, o) !== !1) && (a.push(i[r]),
                            null === i[r].match.fn && (n = i[r]),
                            a.length > 1 && /[0-9a-bA-Z]/.test(a[0].match.def)))
                                return o.placeholder.charAt(e % o.placeholder.length)
                }
                return t.def
            }
            return o.placeholder.charAt(e % o.placeholder.length)
        }
        function D(n, i, a, r, s, l) {
            function c() {
                var e = !1
                  , t = b().slice(h, x(h)).join("").indexOf(v);
                if (t !== -1 && !A(h)) {
                    e = !0;
                    for (var n = b().slice(h, h + t), i = 0; i < n.length; i++)
                        if (" " !== n[i]) {
                            e = !1;
                            break
                        }
                }
                return e
            }
            var u = r.slice()
              , v = ""
              , h = 0
              , k = void 0;
            if (f(),
            d().p = x(-1),
            !a)
                if (o.autoUnmask !== !0) {
                    var g = b().slice(0, x(-1)).join("")
                      , y = u.join("").match(new RegExp("^" + t.escapeRegex(g),"g"));
                    y && y.length > 0 && (u.splice(0, y.length * g.length),
                    h = x(h))
                } else
                    h = x(h);
            if (e.each(u, function(t, i) {
                if (void 0 !== i) {
                    var r = new e.Event("keypress");
                    r.which = i.charCodeAt(0),
                    v += i;
                    var s = p(void 0, !0)
                      , l = d().validPositions[s]
                      , u = m(s + 1, l ? l.locator.slice() : void 0, s);
                    if (!c() || a || o.autoUnmask) {
                        var g = a ? t : null == u.match.fn && u.match.optionality && s + 1 < d().p ? s + 1 : d().p;
                        k = ee.keypressEvent.call(n, r, !0, !1, a, g),
                        h = g + 1,
                        v = ""
                    } else
                        k = ee.keypressEvent.call(n, r, !0, !1, !0, s + 1);
                    if (!a && e.isFunction(o.onBeforeWrite) && (k = o.onBeforeWrite(r, P(), k.forwardPosition, o),
                    k && k.refreshFromBuffer)) {
                        var y = k.refreshFromBuffer;
                        E(y === !0 ? y : y.start, y.end, k.buffer),
                        f(!0),
                        k.caret && (d().p = k.caret)
                    }
                }
            }),
            i) {
                var C = void 0
                  , w = p();
                document.activeElement === n && (s || k) && (C = I(n).begin,
                s && k === !1 && (C = x(p(C))),
                k && l !== !0 && (C < w + 1 || w === -1) && (C = o.numericInput && void 0 === k.caret ? M(k.forwardPosition) : k.forwardPosition)),
                S(n, P(), C, s || new e.Event("checkval"))
            }
        }
        function T(t) {
            if (t) {
                if (void 0 === t.inputmask)
                    return t.value;
                t.inputmask && t.inputmask.refreshValue && ee.setValueEvent.call(t)
            }
            var n = []
              , i = d().validPositions;
            for (var a in i)
                i[a].match && null != i[a].match.fn && n.push(i[a].input);
            var r = 0 === n.length ? "" : (z ? n.reverse() : n).join("");
            if (e.isFunction(o.onUnMask)) {
                var s = (z ? P().slice().reverse() : P()).join("");
                r = o.onUnMask(s, r, o) || r
            }
            return r
        }
        function I(e, t, n, i) {
            function a(e) {
                if (i !== !0 && z && "number" == typeof e && (!o.greedy || "" !== o.placeholder)) {
                    var t = P().join("").length;
                    e = t - e
                }
                return e
            }
            var s;
            if ("number" != typeof t)
                return e.setSelectionRange ? (t = e.selectionStart,
                n = e.selectionEnd) : window.getSelection ? (s = window.getSelection().getRangeAt(0),
                s.commonAncestorContainer.parentNode !== e && s.commonAncestorContainer !== e || (t = s.startOffset,
                n = s.endOffset)) : document.selection && document.selection.createRange && (s = document.selection.createRange(),
                t = 0 - s.duplicate().moveStart("character", -e.inputmask._valueGet().length),
                n = t + s.text.length),
                {
                    begin: a(t),
                    end: a(n)
                };
            t = a(t),
            n = a(n),
            n = "number" == typeof n ? n : t;
            var l = parseInt(((e.ownerDocument.defaultView || window).getComputedStyle ? (e.ownerDocument.defaultView || window).getComputedStyle(e, null) : e.currentStyle).fontSize) * n;
            if (e.scrollLeft = l > e.scrollWidth ? l : 0,
            r || o.insertMode !== !1 || t !== n || n++,
            e.setSelectionRange)
                switch (e.selectionStart = t,
                t) {
                case 0:
                case 3:
                    e.selectionEnd = n + 1;
                    break;
                case 2:
                    e.selectionStart = t + 1,
                    e.selectionEnd = n + 2;
                    break;
                case 5:
                    e.selectionStart = t + 1,
                    e.selectionEnd = n + 4;
                    break;
                case 6:
                    e.selectionEnd = n + 4;
                    break;
                default:
                    e.selectionEnd = n
                }
            else if (window.getSelection) {
                if (s = document.createRange(),
                void 0 === e.firstChild || null === e.firstChild) {
                    var c = document.createTextNode("");
                    e.appendChild(c)
                }
                s.setStart(e.firstChild, t < e.inputmask._valueGet().length ? t : e.inputmask._valueGet().length),
                s.setEnd(e.firstChild, n < e.inputmask._valueGet().length ? n : e.inputmask._valueGet().length),
                s.collapse(!0);
                var u = window.getSelection();
                u.removeAllRanges(),
                u.addRange(s)
            } else
                e.createTextRange && (s = e.createTextRange(),
                s.collapse(!0),
                s.moveEnd("character", n),
                s.moveStart("character", t),
                s.select());
            R(e, void 0, {
                begin: t,
                end: n
            })
        }
        function G(t) {
            var n, i, a = P(), o = a.length, r = p(), s = {}, l = d().validPositions[r], c = void 0 !== l ? l.locator.slice() : void 0;
            for (n = r + 1; n < a.length; n++)
                i = m(n, c, n - 1),
                c = i.locator.slice(),
                s[n] = e.extend(!0, {}, i);
            var u = l && void 0 !== l.alternation ? l.locator[l.alternation] : void 0;
            for (n = o - 1; n > r && (i = s[n],
            (i.match.optionality || i.match.optionalQuantifier || u && (u !== s[n].locator[l.alternation] && null != i.match.fn || null === i.match.fn && i.locator[l.alternation] && w(i.locator[l.alternation].toString().split(","), u.toString().split(",")) && "" !== y(n)[0].def)) && a[n] === j(n, i.match)); n--)
                o--;
            return t ? {
                l: o,
                def: s[o] ? s[o].match : void 0
            } : o
        }
        function L(e) {
            for (var t, n = G(), i = e.length; n < i && !A(n + 1) && (t = k(n + 1)) && t.match.optionality !== !0 && t.match.optionalQuantifier !== !0; )
                n++;
            for (; (t = k(n - 1)) && t.match.optionality && t.input === o.skipOptionalPartCharacter; )
                n--;
            return e.splice(n),
            e
        }
        function B(t) {
            if (e.isFunction(o.isComplete))
                return o.isComplete(t, o);
            if ("*" !== o.repeat) {
                var n = !1
                  , i = G(!0)
                  , a = M(i.l);
                if (void 0 === i.def || i.def.newBlockMarker || i.def.optionality || i.def.optionalQuantifier) {
                    n = !0;
                    for (var r = 0; r <= a; r++) {
                        var s = m(r).match;
                        if (null !== s.fn && void 0 === d().validPositions[r] && s.optionality !== !0 && s.optionalQuantifier !== !0 || null === s.fn && t[r] !== j(r, s)) {
                            n = !1;
                            break
                        }
                    }
                }
                return n
            }
        }
        function F(n, i, a, r) {
            function s() {
                if (o.keepStatic) {
                    for (var t = [], i = p(-1, !0), a = e.extend(!0, {}, d().validPositions), r = d().validPositions[i]; i >= 0; i--) {
                        var s = d().validPositions[i];
                        if (s) {
                            if (s.generatedInput !== !0 && /[0-9a-bA-Z]/.test(s.input) && t.push(s.input),
                            delete d().validPositions[i],
                            void 0 !== s.alternation && s.locator[s.alternation] !== r.locator[s.alternation])
                                break;
                            r = s
                        }
                    }
                    if (i > -1)
                        for (d().p = x(p(-1, !0)); t.length > 0; ) {
                            var l = new e.Event("keypress");
                            l.which = t.pop().charCodeAt(0),
                            ee.keypressEvent.call(n, l, !0, !1, !1, d().p)
                        }
                    else
                        d().validPositions = e.extend(!0, {}, a)
                }
            }
            if ((o.numericInput || z) && (i === t.keyCode.BACKSPACE ? i = t.keyCode.DELETE : i === t.keyCode.DELETE && (i = t.keyCode.BACKSPACE),
            z)) {
                var l = a.end;
                a.end = a.begin,
                a.begin = l
            }
            i === t.keyCode.BACKSPACE && (a.end - a.begin < 1 || o.insertMode === !1) ? (a.begin = M(a.begin),
            void 0 === d().validPositions[a.begin] || d().validPositions[a.begin].input !== o.groupSeparator && d().validPositions[a.begin].input !== o.radixPoint || a.begin--) : i === t.keyCode.DELETE && a.begin === a.end && (a.end = A(a.end, !0) ? a.end + 1 : x(a.end) + 1,
            void 0 === d().validPositions[a.begin] || d().validPositions[a.begin].input !== o.groupSeparator && d().validPositions[a.begin].input !== o.radixPoint || a.end++),
            v(a.begin, a.end, !1, r),
            r !== !0 && s();
            var c = p(a.begin, !0);
            c < a.begin ? d().p = x(c) : r !== !0 && (d().p = a.begin)
        }
        function N(t) {
            function n(e) {
                var n, i = document.createElement("span");
                for (var a in r)
                    isNaN(a) && a.indexOf("font") !== -1 && (i.style[a] = r[a]);
                i.style.textTransform = r.textTransform,
                i.style.letterSpacing = r.letterSpacing,
                i.style.position = "absolute",
                i.style.height = "auto",
                i.style.width = "auto",
                i.style.visibility = "hidden",
                i.style.whiteSpace = "nowrap",
                document.body.appendChild(i);
                var o, s = t.inputmask._valueGet(), l = 0;
                for (n = 0,
                o = s.length; n <= o; n++) {
                    if (i.innerHTML += s.charAt(n) || "_",
                    i.offsetWidth >= e) {
                        var c = e - l
                          , u = i.offsetWidth - e;
                        i.innerHTML = s.charAt(n),
                        c -= i.offsetWidth / 3,
                        n = c < u ? n - 1 : n;
                        break
                    }
                    l = i.offsetWidth
                }
                return document.body.removeChild(i),
                n
            }
            function i() {
                W.style.position = "absolute",
                W.style.top = a.top + "px",
                W.style.left = a.left + "px",
                W.style.width = parseInt(t.offsetWidth) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth) + "px",
                W.style.height = parseInt(t.offsetHeight) - parseInt(r.paddingTop) - parseInt(r.paddingBottom) - parseInt(r.borderTopWidth) - parseInt(r.borderBottomWidth) + "px",
                W.style.lineHeight = W.style.height,
                W.style.zIndex = isNaN(r.zIndex) ? -1 : r.zIndex - 1,
                W.style.webkitAppearance = "textfield",
                W.style.mozAppearance = "textfield",
                W.style.Appearance = "textfield"
            }
            var a = e(t).position()
              , r = (t.ownerDocument.defaultView || window).getComputedStyle(t, null);
            t.parentNode;
            W = document.createElement("div"),
            document.body.appendChild(W);
            for (var s in r)
                isNaN(s) && "cssText" !== s && s.indexOf("webkit") == -1 && (W.style[s] = r[s]);
            t.style.backgroundColor = "transparent",
            t.style.color = "transparent",
            t.style.webkitAppearance = "caret",
            t.style.mozAppearance = "caret",
            t.style.Appearance = "caret",
            i(),
            e(window).on("resize", function(n) {
                a = e(t).position(),
                r = (t.ownerDocument.defaultView || window).getComputedStyle(t, null),
                i()
            }),
            e(t).on("click", function(e) {
                return I(t, n(e.clientX)),
                ee.clickEvent.call(this, [e])
            }),
            e(t).on("keydown", function(e) {
                e.shiftKey || o.insertMode === !1 || setTimeout(function() {
                    R(t)
                }, 0)
            })
        }
        function R(e, t, n) {
            function i() {
                r || null !== l.fn && void 0 !== c.input ? r && null !== l.fn && void 0 !== c.input && (r = !1,
                a += "</span>") : (r = !0,
                a += "<span class='im-static''>")
            }
            if (void 0 !== W) {
                t = t || P(),
                void 0 === n ? n = I(e) : void 0 === n.begin && (n = {
                    begin: n,
                    end: n
                });
                var a = ""
                  , r = !1;
                if ("" != t) {
                    var s, l, c, u = 0, f = p();
                    do
                        u === n.begin && document.activeElement === e && (a += "<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>"),
                        d().validPositions[u] ? (c = d().validPositions[u],
                        l = c.match,
                        s = c.locator.slice(),
                        i(),
                        a += c.input) : (c = m(u, s, u - 1),
                        l = c.match,
                        s = c.locator.slice(),
                        (o.jitMasking === !1 || u < f || "number" == typeof o.jitMasking && isFinite(o.jitMasking) && o.jitMasking > u) && (i(),
                        a += j(u, l))),
                        u++;
                    while ((void 0 === V || u < V) && (null !== l.fn || "" !== l.def) || f > u)
                }
                W.innerHTML = a
            }
        }
        function K(t) {
            function n(t, n) {
                function i(t) {
                    function i(t) {
                        if (e.valHooks && (void 0 === e.valHooks[t] || e.valHooks[t].inputmaskpatch !== !0)) {
                            var i = e.valHooks[t] && e.valHooks[t].get ? e.valHooks[t].get : function(e) {
                                return e.value
                            }
                              , a = e.valHooks[t] && e.valHooks[t].set ? e.valHooks[t].set : function(e, t) {
                                return e.value = t,
                                e
                            }
                            ;
                            e.valHooks[t] = {
                                get: function(e) {
                                    if (e.inputmask) {
                                        if (e.inputmask.opts.autoUnmask)
                                            return e.inputmask.unmaskedvalue();
                                        var t = i(e);
                                        return p(void 0, void 0, e.inputmask.maskset.validPositions) !== -1 || n.nullable !== !0 ? t : ""
                                    }
                                    return i(e)
                                },
                                set: function(t, n) {
                                    var i, o = e(t);
                                    return i = a(t, n),
                                    t.inputmask && o.trigger("setvalue"),
                                    i
                                },
                                inputmaskpatch: !0
                            }
                        }
                    }
                    function a() {
                        return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : p() !== -1 || n.nullable !== !0 ? document.activeElement === this && n.clearMaskOnLostFocus ? (z ? L(P().slice()).reverse() : L(P().slice())).join("") : s.call(this) : "" : s.call(this)
                    }
                    function o(t) {
                        l.call(this, t),
                        this.inputmask && e(this).trigger("setvalue")
                    }
                    function r(t) {
                        Y.on(t, "mouseenter", function(t) {
                            var n = e(this)
                              , i = this
                              , a = i.inputmask._valueGet();
                            a !== P().join("") && n.trigger("setvalue")
                        })
                    }
                    var s, l;
                    if (!t.inputmask.__valueGet) {
                        if (n.noValuePatching !== !0) {
                            if (Object.getOwnPropertyDescriptor) {
                                "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" == typeof "test".__proto__ ? function(e) {
                                    return e.__proto__
                                }
                                : function(e) {
                                    return e.constructor.prototype
                                }
                                );
                                var c = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t), "value") : void 0;
                                c && c.get && c.set ? (s = c.get,
                                l = c.set,
                                Object.defineProperty(t, "value", {
                                    get: a,
                                    set: o,
                                    configurable: !0
                                })) : "INPUT" !== t.tagName && (s = function() {
                                    return this.textContent
                                }
                                ,
                                l = function(e) {
                                    this.textContent = e
                                }
                                ,
                                Object.defineProperty(t, "value", {
                                    get: a,
                                    set: o,
                                    configurable: !0
                                }))
                            } else
                                document.__lookupGetter__ && t.__lookupGetter__("value") && (s = t.__lookupGetter__("value"),
                                l = t.__lookupSetter__("value"),
                                t.__defineGetter__("value", a),
                                t.__defineSetter__("value", o));
                            t.inputmask.__valueGet = s,
                            t.inputmask.__valueSet = l
                        }
                        t.inputmask._valueGet = function(e) {
                            return z && e !== !0 ? s.call(this.el).split("").reverse().join("") : s.call(this.el)
                        }
                        ,
                        t.inputmask._valueSet = function(e, t) {
                            l.call(this.el, null === e || void 0 === e ? "" : t !== !0 && z ? e.split("").reverse().join("") : e)
                        }
                        ,
                        void 0 === s && (s = function() {
                            return this.value
                        }
                        ,
                        l = function(e) {
                            this.value = e
                        }
                        ,
                        i(t.type),
                        r(t))
                    }
                }
                var a = t.getAttribute("type")
                  , o = "INPUT" === t.tagName && e.inArray(a, n.supportsInputType) !== -1 || t.isContentEditable || "TEXTAREA" === t.tagName;
                if (!o)
                    if ("INPUT" === t.tagName) {
                        var r = document.createElement("input");
                        r.setAttribute("type", a),
                        o = "text" === r.type,
                        r = null
                    } else
                        o = "partial";
                return o !== !1 && i(t),
                o
            }
            var i = n(t, o);
            if (i !== !1 && (q = t,
            U = e(q),
            ("rtl" === q.dir || o.rightAlign) && (q.style.textAlign = "right"),
            ("rtl" === q.dir || o.numericInput) && (q.dir = "ltr",
            q.removeAttribute("dir"),
            q.inputmask.isRTL = !0,
            z = !0),
            o.colorMask === !0 && N(q),
            c && (q.hasOwnProperty("inputmode") && (q.inputmode = o.inputmode,
            q.setAttribute("inputmode", o.inputmode)),
            "rtfm" === o.androidHack && (o.colorMask !== !0 && N(q),
            q.type = "password")),
            Y.off(q),
            i === !0 && (Y.on(q, "submit", ee.submitEvent),
            Y.on(q, "reset", ee.resetEvent),
            Y.on(q, "mouseenter", ee.mouseenterEvent),
            Y.on(q, "blur", ee.blurEvent),
            Y.on(q, "focus", ee.focusEvent),
            Y.on(q, "mouseleave", ee.mouseleaveEvent),
            o.colorMask !== !0 && Y.on(q, "click", ee.clickEvent),
            Y.on(q, "dblclick", ee.dblclickEvent),
            Y.on(q, "paste", ee.pasteEvent),
            Y.on(q, "dragdrop", ee.pasteEvent),
            Y.on(q, "drop", ee.pasteEvent),
            Y.on(q, "cut", ee.cutEvent),
            Y.on(q, "complete", o.oncomplete),
            Y.on(q, "incomplete", o.onincomplete),
            Y.on(q, "cleared", o.oncleared),
            o.inputEventOnly !== !0 && (Y.on(q, "keydown", ee.keydownEvent),
            Y.on(q, "keypress", ee.keypressEvent)),
            Y.on(q, "compositionstart", e.noop),
            Y.on(q, "compositionupdate", e.noop),
            Y.on(q, "compositionend", e.noop),
            Y.on(q, "keyup", e.noop),
            Y.on(q, "input", ee.inputFallBackEvent)),
            Y.on(q, "setvalue", ee.setValueEvent),
            b(),
            "" !== q.inputmask._valueGet() || o.clearMaskOnLostFocus === !1 || document.activeElement === q)) {
                var a = e.isFunction(o.onBeforeMask) ? o.onBeforeMask(q.inputmask._valueGet(), o) || q.inputmask._valueGet() : q.inputmask._valueGet();
                D(q, !0, !1, a.split(""));
                var r = P().slice();
                H = r.join(""),
                B(r) === !1 && o.clearIncomplete && f(),
                o.clearMaskOnLostFocus && document.activeElement !== q && (p() === -1 ? r = [] : L(r)),
                S(q, r),
                document.activeElement === q && I(q, x(p()))
            }
        }
        i = i || this.maskset,
        o = o || this.opts;
        var H, U, V, W, Q, q = this.el, z = this.isRTL, Z = !1, X = !1, $ = !1, J = !1, Y = {
            on: function(n, i, a) {
                var r = function(n) {
                    if (void 0 === this.inputmask && "FORM" !== this.nodeName) {
                        var i = e.data(this, "_inputmask_opts");
                        i ? new t(i).mask(this) : Y.off(this)
                    } else {
                        if ("setvalue" === n.type || "FORM" === this.nodeName || !(this.disabled || this.readOnly && !("keydown" === n.type && n.ctrlKey && 67 === n.keyCode || o.tabThrough === !1 && n.keyCode === t.keyCode.TAB))) {
                            switch (n.type) {
                            case "input":
                                if (X === !0)
                                    return X = !1,
                                    n.preventDefault();
                                break;
                            case "keydown":
                                Z = !1,
                                X = !1;
                                break;
                            case "keypress":
                                if (Z === !0)
                                    return n.preventDefault();
                                Z = !0;
                                break;
                            case "click":
                                if (s || l) {
                                    var r = this
                                      , c = arguments;
                                    return setTimeout(function() {
                                        a.apply(r, c)
                                    }, 0),
                                    !1
                                }
                            }
                            var u = a.apply(this, arguments);
                            return u === !1 && (n.preventDefault(),
                            n.stopPropagation()),
                            u
                        }
                        n.preventDefault()
                    }
                };
                n.inputmask.events[i] = n.inputmask.events[i] || [],
                n.inputmask.events[i].push(r),
                e.inArray(i, ["submit", "reset"]) !== -1 ? null != n.form && e(n.form).on(i, r) : e(n).on(i, r)
            },
            off: function(t, n) {
                if (t.inputmask && t.inputmask.events) {
                    var i;
                    n ? (i = [],
                    i[n] = t.inputmask.events[n]) : i = t.inputmask.events,
                    e.each(i, function(n, i) {
                        for (; i.length > 0; ) {
                            var a = i.pop();
                            e.inArray(n, ["submit", "reset"]) !== -1 ? null != t.form && e(t.form).off(n, a) : e(t).off(n, a)
                        }
                        delete t.inputmask.events[n]
                    })
                }
            }
        }, ee = {
            keydownEvent: function(n) {
                function i(e) {
                    var t = document.createElement("input")
                      , n = "on" + e
                      , i = n in t;
                    return i || (t.setAttribute(n, "return;"),
                    i = "function" == typeof t[n]),
                    t = null,
                    i
                }
                var a = this
                  , r = e(a)
                  , s = n.keyCode
                  , c = I(a);
                if (s === t.keyCode.BACKSPACE || s === t.keyCode.DELETE || l && s === t.keyCode.BACKSPACE_SAFARI || n.ctrlKey && s === t.keyCode.X && !i("cut"))
                    n.preventDefault(),
                    F(a, s, c),
                    S(a, P(!0), d().p, n, a.inputmask._valueGet() !== P().join("")),
                    a.inputmask._valueGet() === b().join("") ? r.trigger("cleared") : B(P()) === !0 && r.trigger("complete");
                else if (s === t.keyCode.END || s === t.keyCode.PAGE_DOWN) {
                    n.preventDefault();
                    var u = x(p());
                    o.insertMode || u !== d().maskLength || n.shiftKey || u--,
                    I(a, n.shiftKey ? c.begin : u, u, !0)
                } else
                    s === t.keyCode.HOME && !n.shiftKey || s === t.keyCode.PAGE_UP ? (n.preventDefault(),
                    I(a, 0, n.shiftKey ? c.begin : 0, !0)) : (o.undoOnEscape && s === t.keyCode.ESCAPE || 90 === s && n.ctrlKey) && n.altKey !== !0 ? (D(a, !0, !1, H.split("")),
                    r.trigger("click")) : s !== t.keyCode.INSERT || n.shiftKey || n.ctrlKey ? o.tabThrough === !0 && s === t.keyCode.TAB ? (n.shiftKey === !0 ? (null === k(c.begin).match.fn && (c.begin = x(c.begin)),
                    c.end = M(c.begin, !0),
                    c.begin = M(c.end, !0)) : (c.begin = x(c.begin, !0),
                    c.end = x(c.begin, !0),
                    c.end < d().maskLength && c.end--),
                    c.begin < d().maskLength && (n.preventDefault(),
                    I(a, c.begin, c.end))) : n.shiftKey || o.insertMode === !1 && (s === t.keyCode.RIGHT ? setTimeout(function() {
                        var e = I(a);
                        3 === e.begin || 5 === e.begin ? I(a, e.begin + 1) : I(a, e.begin)
                    }, 0) : s === t.keyCode.LEFT && setTimeout(function() {
                        var e = I(a);
                        3 === e.begin || 6 === e.begin ? I(a, z ? e.begin + 2 : e.begin - 2) : I(a, z ? e.begin + 1 : e.begin - 1)
                    }, 0)) : (o.insertMode = !o.insertMode,
                    I(a, o.insertMode || c.begin !== d().maskLength ? c.begin : c.begin - 1));
                o.onKeyDown.call(this, n, P(), I(a).begin, o),
                $ = e.inArray(s, o.ignorables) !== -1
            },
            keypressEvent: function(n, i, a, r, s) {
                var l = this
                  , c = e(l)
                  , u = n.which || n.charCode || n.keyCode;
                if (!(i === !0 || n.ctrlKey && n.altKey) && (n.ctrlKey || n.metaKey || $))
                    return u === t.keyCode.ENTER && H !== P().join("") && (H = P().join(""),
                    setTimeout(function() {
                        c.trigger("change")
                    }, 0)),
                    !0;
                if (u) {
                    46 === u && n.shiftKey === !1 && "," === o.radixPoint && (u = 44);
                    var p, v = i ? {
                        begin: s,
                        end: s
                    } : I(l), h = String.fromCharCode(u);
                    d().writeOutBuffer = !0;
                    var m = _(v, h, r);
                    if (m !== !1 && (f(!0),
                    p = void 0 !== m.caret ? m.caret : i ? m.pos + 1 : x(m.pos),
                    d().p = p),
                    a !== !1) {
                        var k = this;
                        if (setTimeout(function() {
                            o.onKeyValidation.call(k, u, m, o)
                        }, 0),
                        d().writeOutBuffer && m !== !1) {
                            var g = P();
                            S(l, g, o.numericInput && void 0 === m.caret ? M(p) : p, n, i !== !0),
                            i !== !0 && setTimeout(function() {
                                B(g) === !0 && c.trigger("complete")
                            }, 0)
                        }
                    }
                    if (n.preventDefault(),
                    i)
                        return m.forwardPosition = p,
                        m
                }
            },
            pasteEvent: function(t) {
                var n, i = this, a = t.originalEvent || t, r = e(i), s = i.inputmask._valueGet(!0), l = I(i);
                z && (n = l.end,
                l.end = l.begin,
                l.begin = n);
                var c = s.substr(0, l.begin)
                  , u = s.substr(l.end, s.length);
                if (c === (z ? b().reverse() : b()).slice(0, l.begin).join("") && (c = ""),
                u === (z ? b().reverse() : b()).slice(l.end).join("") && (u = ""),
                z && (n = c,
                c = u,
                u = n),
                window.clipboardData && window.clipboardData.getData)
                    s = c + window.clipboardData.getData("Text") + u;
                else {
                    if (!a.clipboardData || !a.clipboardData.getData)
                        return !0;
                    s = c + a.clipboardData.getData("text/plain") + u
                }
                var d = s;
                if (e.isFunction(o.onBeforePaste)) {
                    if (d = o.onBeforePaste(s, o),
                    d === !1)
                        return t.preventDefault();
                    d || (d = s)
                }
                return D(i, !1, !1, z ? d.split("").reverse() : d.toString().split("")),
                S(i, P(), x(p()), t, H !== P().join("")),
                B(P()) === !0 && r.trigger("complete"),
                t.preventDefault()
            },
            inputFallBackEvent: function(n) {
                var i = this
                  , a = i.inputmask._valueGet();
                if (P().join("") !== a) {
                    var o = I(i);
                    if (a = a.replace(new RegExp("(" + t.escapeRegex(b().join("")) + ")*"), ""),
                    s) {
                        var r = a.replace(P().join(""), "");
                        if (1 === r.length) {
                            var l = new e.Event("keypress");
                            return l.which = r.charCodeAt(0),
                            ee.keypressEvent.call(i, l, !0, !0, !1, d().validPositions[o.begin - 1] ? o.begin : o.begin - 1),
                            !1
                        }
                    }
                    if (o.begin > a.length && (I(i, a.length),
                    o = I(i)),
                    P().length - a.length !== 1 || a.charAt(o.begin) === P()[o.begin] || a.charAt(o.begin + 1) === P()[o.begin] || A(o.begin)) {
                        for (var c = p() + 1, u = b().join(""); null === a.match(t.escapeRegex(u) + "$"); )
                            u = u.slice(1);
                        a = a.replace(u, ""),
                        a = a.split(""),
                        D(i, !0, !1, a, n, o.begin < c),
                        B(P()) === !0 && e(i).trigger("complete")
                    } else
                        n.keyCode = t.keyCode.BACKSPACE,
                        ee.keydownEvent.call(i, n);
                    n.preventDefault()
                }
            },
            setValueEvent: function(t) {
                this.inputmask.refreshValue = !1;
                var n = this
                  , i = n.inputmask._valueGet();
                D(n, !0, !1, (e.isFunction(o.onBeforeMask) ? o.onBeforeMask(i, o) || i : i).split("")),
                H = P().join(""),
                (o.clearMaskOnLostFocus || o.clearIncomplete) && n.inputmask._valueGet() === b().join("") && n.inputmask._valueSet("")
            },
            focusEvent: function(e) {
                var t = this
                  , n = t.inputmask._valueGet();
                o.showMaskOnFocus && (!o.showMaskOnHover || o.showMaskOnHover && "" === n) && (t.inputmask._valueGet() !== P().join("") ? S(t, P(), x(p())) : J === !1 && I(t, x(p()))),
                o.positionCaretOnTab === !0 && ee.clickEvent.apply(t, [e, !0]),
                H = P().join("")
            },
            mouseleaveEvent: function(e) {
                var t = this;
                if (J = !1,
                o.clearMaskOnLostFocus && document.activeElement !== t) {
                    var n = P().slice()
                      , i = t.inputmask._valueGet();
                    i !== t.getAttribute("placeholder") && "" !== i && (p() === -1 && i === b().join("") ? n = [] : L(n),
                    S(t, n))
                }
            },
            clickEvent: function(t, n) {
                function i(t) {
                    if ("" !== o.radixPoint) {
                        var n = d().validPositions;
                        if (void 0 === n[t] || n[t].input === j(t)) {
                            if (t < x(-1))
                                return !0;
                            var i = e.inArray(o.radixPoint, P());
                            if (i !== -1) {
                                for (var a in n)
                                    if (i < a && n[a].input !== j(a))
                                        return !1;
                                return !0
                            }
                        }
                    }
                    return !1
                }
                var a = this;
                setTimeout(function() {
                    if (document.activeElement === a) {
                        var t = I(a);
                        if (n && (t.begin = t.end),
                        t.begin === t.end)
                            switch (o.positionCaretOnClick) {
                            case "none":
                                break;
                            case "radixFocus":
                                if (i(t.begin)) {
                                    var r = e.inArray(o.radixPoint, P().join(""));
                                    I(a, o.numericInput ? x(r) : r);
                                    break
                                }
                            default:
                                var s = t.begin
                                  , l = p(s, !0)
                                  , c = x(l);
                                if (s < c)
                                    I(a, A(s) || A(s - 1) ? s : x(s));
                                else {
                                    var u = j(c);
                                    ("" !== u && P()[c] !== u && k(c).match.optionalQuantifier !== !0 || !A(c) && k(c).match.def === u) && (c = x(c)),
                                    I(a, c)
                                }
                            }
                    }
                }, 0)
            },
            dblclickEvent: function(e) {
                var t = this;
                setTimeout(function() {
                    I(t, 0, x(p()))
                }, 0)
            },
            cutEvent: function(n) {
                var i = this
                  , a = e(i)
                  , o = I(i)
                  , r = n.originalEvent || n
                  , s = window.clipboardData || r.clipboardData
                  , l = z ? P().slice(o.end, o.begin) : P().slice(o.begin, o.end);
                s.setData("text", z ? l.reverse().join("") : l.join("")),
                document.execCommand && document.execCommand("copy"),
                F(i, t.keyCode.DELETE, o),
                S(i, P(), d().p, n, H !== P().join("")),
                i.inputmask._valueGet() === b().join("") && a.trigger("cleared")
            },
            blurEvent: function(t) {
                var n = e(this)
                  , i = this;
                if (i.inputmask) {
                    var a = i.inputmask._valueGet()
                      , r = P().slice();
                    H !== r.join("") && setTimeout(function() {
                        n.trigger("change"),
                        H = r.join("")
                    }, 0),
                    "" !== a && (o.clearMaskOnLostFocus && (p() === -1 && a === b().join("") ? r = [] : L(r)),
                    B(r) === !1 && (setTimeout(function() {
                        n.trigger("incomplete")
                    }, 0),
                    o.clearIncomplete && (f(),
                    r = o.clearMaskOnLostFocus ? [] : b().slice())),
                    S(i, r, void 0, t))
                }
            },
            mouseenterEvent: function(e) {
                var t = this;
                J = !0,
                document.activeElement !== t && o.showMaskOnHover && t.inputmask._valueGet() !== P().join("") && S(t, P())
            },
            submitEvent: function(e) {
                H !== P().join("") && U.trigger("change"),
                o.clearMaskOnLostFocus && p() === -1 && q.inputmask._valueGet && q.inputmask._valueGet() === b().join("") && q.inputmask._valueSet(""),
                o.removeMaskOnSubmit && (q.inputmask._valueSet(q.inputmask.unmaskedvalue(), !0),
                setTimeout(function() {
                    S(q, P())
                }, 0))
            },
            resetEvent: function(e) {
                q.inputmask.refreshValue = !0,
                setTimeout(function() {
                    U.trigger("setvalue")
                }, 0)
            }
        };
        if (void 0 !== n)
            switch (n.action) {
            case "isComplete":
                return q = n.el,
                B(P());
            case "unmaskedvalue":
                return void 0 !== q && void 0 === n.value || (Q = n.value,
                Q = (e.isFunction(o.onBeforeMask) ? o.onBeforeMask(Q, o) || Q : Q).split(""),
                D(void 0, !1, !1, z ? Q.reverse() : Q),
                e.isFunction(o.onBeforeWrite) && o.onBeforeWrite(void 0, P(), 0, o)),
                T(q);
            case "mask":
                K(q);
                break;
            case "format":
                return Q = (e.isFunction(o.onBeforeMask) ? o.onBeforeMask(n.value, o) || n.value : n.value).split(""),
                D(void 0, !1, !1, z ? Q.reverse() : Q),
                e.isFunction(o.onBeforeWrite) && o.onBeforeWrite(void 0, P(), 0, o),
                n.metadata ? {
                    value: z ? P().slice().reverse().join("") : P().join(""),
                    metadata: a.call(this, {
                        action: "getmetadata"
                    }, i, o)
                } : z ? P().slice().reverse().join("") : P().join("");
            case "isValid":
                n.value ? (Q = n.value.split(""),
                D(void 0, !1, !0, z ? Q.reverse() : Q)) : n.value = P().join("");
                for (var te = P(), ne = G(), ie = te.length - 1; ie > ne && !A(ie); ie--)
                    ;
                return te.splice(ne, ie + 1 - ne),
                B(te) && n.value === P().join("");
            case "getemptymask":
                return b().join("");
            case "remove":
                if (q) {
                    U = e(q),
                    q.inputmask._valueSet(T(q)),
                    Y.off(q);
                    var ae;
                    Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (ae = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(q), "value"),
                    ae && q.inputmask.__valueGet && Object.defineProperty(q, "value", {
                        get: q.inputmask.__valueGet,
                        set: q.inputmask.__valueSet,
                        configurable: !0
                    })) : document.__lookupGetter__ && q.__lookupGetter__("value") && q.inputmask.__valueGet && (q.__defineGetter__("value", q.inputmask.__valueGet),
                    q.__defineSetter__("value", q.inputmask.__valueSet)),
                    q.inputmask = void 0
                }
                return q;
            case "getmetadata":
                if (e.isArray(i.metadata)) {
                    var oe = u(!0, 0, !1).join("");
                    return e.each(i.metadata, function(e, t) {
                        if (t.mask === oe)
                            return oe = t,
                            !1
                    }),
                    oe
                }
                return i.metadata
            }
    }
    var o = navigator.userAgent
      , r = /mobile/i.test(o)
      , s = /iemobile/i.test(o)
      , l = /iphone/i.test(o) && !s
      , c = /android/i.test(o) && !s;
    return t.prototype = {
        defaults: {
            placeholder: "_",
            optionalmarker: {
                start: "[",
                end: "]"
            },
            quantifiermarker: {
                start: "{",
                end: "}"
            },
            groupmarker: {
                start: "(",
                end: ")"
            },
            alternatormarker: "|",
            escapeChar: "\\",
            mask: null,
            oncomplete: e.noop,
            onincomplete: e.noop,
            oncleared: e.noop,
            repeat: 0,
            greedy: !0,
            autoUnmask: !1,
            removeMaskOnSubmit: !1,
            clearMaskOnLostFocus: !0,
            insertMode: !0,
            clearIncomplete: !1,
            aliases: {},
            alias: null,
            onKeyDown: e.noop,
            onBeforeMask: null,
            onBeforePaste: function(t, n) {
                return e.isFunction(n.onBeforeMask) ? n.onBeforeMask(t, n) : t
            },
            onBeforeWrite: null,
            onUnMask: null,
            showMaskOnFocus: !0,
            showMaskOnHover: !0,
            onKeyValidation: e.noop,
            skipOptionalPartCharacter: " ",
            numericInput: !1,
            rightAlign: !1,
            undoOnEscape: !0,
            radixPoint: "",
            radixPointDefinitionSymbol: void 0,
            groupSeparator: "",
            keepStatic: null,
            positionCaretOnTab: !0,
            tabThrough: !1,
            supportsInputType: ["text", "tel", "password"],
            definitions: {
                9: {
                    validator: "[0-9]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                a: {
                    validator: "[A-Za-zÐ-ÑÐÑ‘Ã€-Ã¿Âµ]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                "*": {
                    validator: "[0-9A-Za-zÐ-ÑÐÑ‘Ã€-Ã¿Âµ]",
                    cardinality: 1
                }
            },
            ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
            isComplete: null,
            canClearPosition: e.noop,
            postValidation: null,
            staticDefinitionSymbol: void 0,
            jitMasking: !1,
            nullable: !0,
            inputEventOnly: !1,
            noValuePatching: !1,
            positionCaretOnClick: "lvp",
            casing: null,
            inputmode: "verbatim",
            colorMask: !1,
            androidHack: !1
        },
        masksCache: {},
        mask: function(o) {
            function r(t, i, a, o) {
                function r(e, n) {
                    n = void 0 !== n ? n : t.getAttribute(o + "-" + e),
                    null !== n && ("string" == typeof n && (0 === e.indexOf("on") ? n = window[n] : "false" === n ? n = !1 : "true" === n && (n = !0)),
                    a[e] = n)
                }
                var s, l, c, u, d = t.getAttribute(o);
                if (d && "" !== d && (d = d.replace(new RegExp("'","g"), '"'),
                l = JSON.parse("{" + d + "}")),
                l) {
                    c = void 0;
                    for (u in l)
                        if ("alias" === u.toLowerCase()) {
                            c = l[u];
                            break
                        }
                }
                r("alias", c),
                a.alias && n(a.alias, a, i);
                for (s in i) {
                    if (l) {
                        c = void 0;
                        for (u in l)
                            if (u.toLowerCase() === s.toLowerCase()) {
                                c = l[u];
                                break
                            }
                    }
                    r(s, c)
                }
                return e.extend(!0, i, a),
                i
            }
            var s = this;
            return "string" == typeof o && (o = document.getElementById(o) || document.querySelectorAll(o)),
            o = o.nodeName ? [o] : o,
            e.each(o, function(n, o) {
                var l = e.extend(!0, {}, s.opts);
                r(o, l, e.extend(!0, {}, s.userOptions), s.dataAttribute);
                var c = i(l, s.noMasksCache);
                void 0 !== c && (void 0 !== o.inputmask && o.inputmask.remove(),
                o.inputmask = new t,
                o.inputmask.opts = l,
                o.inputmask.noMasksCache = s.noMasksCache,
                o.inputmask.userOptions = e.extend(!0, {}, s.userOptions),
                o.inputmask.el = o,
                o.inputmask.maskset = c,
                e.data(o, "_inputmask_opts", l),
                a.call(o.inputmask, {
                    action: "mask"
                }))
            }),
            o && o[0] ? o[0].inputmask || this : this
        },
        option: function(t, n) {
            return "string" == typeof t ? this.opts[t] : "object" == typeof t ? (e.extend(this.userOptions, t),
            this.el && n !== !0 && this.mask(this.el),
            this) : void 0
        },
        unmaskedvalue: function(e) {
            return this.maskset = this.maskset || i(this.opts, this.noMasksCache),
            a.call(this, {
                action: "unmaskedvalue",
                value: e
            })
        },
        remove: function() {
            return a.call(this, {
                action: "remove"
            })
        },
        getemptymask: function() {
            return this.maskset = this.maskset || i(this.opts, this.noMasksCache),
            a.call(this, {
                action: "getemptymask"
            })
        },
        hasMaskedValue: function() {
            return !this.opts.autoUnmask
        },
        isComplete: function() {
            return this.maskset = this.maskset || i(this.opts, this.noMasksCache),
            a.call(this, {
                action: "isComplete"
            })
        },
        getmetadata: function() {
            return this.maskset = this.maskset || i(this.opts, this.noMasksCache),
            a.call(this, {
                action: "getmetadata"
            })
        },
        isValid: function(e) {
            return this.maskset = this.maskset || i(this.opts, this.noMasksCache),
            a.call(this, {
                action: "isValid",
                value: e
            })
        },
        format: function(e, t) {
            return this.maskset = this.maskset || i(this.opts, this.noMasksCache),
            a.call(this, {
                action: "format",
                value: e,
                metadata: t
            })
        },
        analyseMask: function(t, n) {
            function i(e, t, n, i) {
                this.matches = [],
                this.openGroup = e || !1,
                this.isGroup = e || !1,
                this.isOptional = t || !1,
                this.isQuantifier = n || !1,
                this.isAlternator = i || !1,
                this.quantifier = {
                    min: 1,
                    max: 1
                }
            }
            function a(t, i, a) {
                var o = n.definitions[i];
                a = void 0 !== a ? a : t.matches.length;
                var r = t.matches[a - 1];
                if (o && !m) {
                    o.placeholder = e.isFunction(o.placeholder) ? o.placeholder(n) : o.placeholder;
                    for (var s = o.prevalidator, l = s ? s.length : 0, c = 1; c < o.cardinality; c++) {
                        var u = l >= c ? s[c - 1] : []
                          , d = u.validator
                          , f = u.cardinality;
                        t.matches.splice(a++, 0, {
                            fn: d ? "string" == typeof d ? new RegExp(d) : new function() {
                                this.test = d
                            }
                            : new RegExp("."),
                            cardinality: f ? f : 1,
                            optionality: t.isOptional,
                            newBlockMarker: void 0 === r || r.def !== (o.definitionSymbol || i),
                            casing: o.casing,
                            def: o.definitionSymbol || i,
                            placeholder: o.placeholder,
                            nativeDef: i
                        }),
                        r = t.matches[a - 1]
                    }
                    t.matches.splice(a++, 0, {
                        fn: o.validator ? "string" == typeof o.validator ? new RegExp(o.validator) : new function() {
                            this.test = o.validator
                        }
                        : new RegExp("."),
                        cardinality: o.cardinality,
                        optionality: t.isOptional,
                        newBlockMarker: void 0 === r || r.def !== (o.definitionSymbol || i),
                        casing: o.casing,
                        def: o.definitionSymbol || i,
                        placeholder: o.placeholder,
                        nativeDef: i
                    })
                } else
                    t.matches.splice(a++, 0, {
                        fn: null,
                        cardinality: 0,
                        optionality: t.isOptional,
                        newBlockMarker: void 0 === r || r.def !== i,
                        casing: null,
                        def: n.staticDefinitionSymbol || i,
                        placeholder: void 0 !== n.staticDefinitionSymbol ? i : void 0,
                        nativeDef: i
                    }),
                    m = !1
            }
            function o(t) {
                t && t.matches && e.each(t.matches, function(e, i) {
                    var r = t.matches[e + 1];
                    (void 0 === r || void 0 === r.matches || r.isQuantifier === !1) && i && i.isGroup && (i.isGroup = !1,
                    a(i, n.groupmarker.start, 0),
                    i.openGroup !== !0 && a(i, n.groupmarker.end)),
                    o(i)
                })
            }
            function r() {
                if (g.length > 0) {
                    if (d = g[g.length - 1],
                    a(d, c),
                    d.isAlternator) {
                        f = g.pop();
                        for (var e = 0; e < f.matches.length; e++)
                            f.matches[e].isGroup = !1;
                        g.length > 0 ? (d = g[g.length - 1],
                        d.matches.push(f)) : k.matches.push(f)
                    }
                } else
                    a(k, c)
            }
            function s(e) {
                function t(e) {
                    return e === n.optionalmarker.start ? e = n.optionalmarker.end : e === n.optionalmarker.end ? e = n.optionalmarker.start : e === n.groupmarker.start ? e = n.groupmarker.end : e === n.groupmarker.end && (e = n.groupmarker.start),
                    e
                }
                e.matches = e.matches.reverse();
                for (var i in e.matches) {
                    var a = parseInt(i);
                    if (e.matches[i].isQuantifier && e.matches[a + 1] && e.matches[a + 1].isGroup) {
                        var o = e.matches[i];
                        e.matches.splice(i, 1),
                        e.matches.splice(a + 1, 0, o)
                    }
                    void 0 !== e.matches[i].matches ? e.matches[i] = s(e.matches[i]) : e.matches[i] = t(e.matches[i])
                }
                return e
            }
            for (var l, c, u, d, f, p, v, h = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, m = !1, k = new i, g = [], y = []; l = h.exec(t); )
                if (c = l[0],
                m)
                    r();
                else
                    switch (c.charAt(0)) {
                    case n.escapeChar:
                        m = !0;
                        break;
                    case n.optionalmarker.end:
                    case n.groupmarker.end:
                        if (u = g.pop(),
                        u.openGroup = !1,
                        void 0 !== u)
                            if (g.length > 0) {
                                if (d = g[g.length - 1],
                                d.matches.push(u),
                                d.isAlternator) {
                                    f = g.pop();
                                    for (var b = 0; b < f.matches.length; b++)
                                        f.matches[b].isGroup = !1;
                                    g.length > 0 ? (d = g[g.length - 1],
                                    d.matches.push(f)) : k.matches.push(f)
                                }
                            } else
                                k.matches.push(u);
                        else
                            r();
                        break;
                    case n.optionalmarker.start:
                        g.push(new i((!1),(!0)));
                        break;
                    case n.groupmarker.start:
                        g.push(new i((!0)));
                        break;
                    case n.quantifiermarker.start:
                        var P = new i((!1),(!1),(!0));
                        c = c.replace(/[{}]/g, "");
                        var E = c.split(",")
                          , C = isNaN(E[0]) ? E[0] : parseInt(E[0])
                          , w = 1 === E.length ? C : isNaN(E[1]) ? E[1] : parseInt(E[1]);
                        if ("*" !== w && "+" !== w || (C = "*" === w ? 0 : 1),
                        P.quantifier = {
                            min: C,
                            max: w
                        },
                        g.length > 0) {
                            var _ = g[g.length - 1].matches;
                            l = _.pop(),
                            l.isGroup || (v = new i((!0)),
                            v.matches.push(l),
                            l = v),
                            _.push(l),
                            _.push(P)
                        } else
                            l = k.matches.pop(),
                            l.isGroup || (v = new i((!0)),
                            v.matches.push(l),
                            l = v),
                            k.matches.push(l),
                            k.matches.push(P);
                        break;
                    case n.alternatormarker:
                        g.length > 0 ? (d = g[g.length - 1],
                        p = d.matches.pop()) : p = k.matches.pop(),
                        p.isAlternator ? g.push(p) : (f = new i((!1),(!1),(!1),(!0)),
                        f.matches.push(p),
                        g.push(f));
                        break;
                    default:
                        r()
                    }
            for (; g.length > 0; )
                u = g.pop(),
                k.matches.push(u);
            return k.matches.length > 0 && (o(k),
            y.push(k)),
            n.numericInput && s(y[0]),
            y
        }
    },
    t.extendDefaults = function(n) {
        e.extend(!0, t.prototype.defaults, n)
    }
    ,
    t.extendDefinitions = function(n) {
        e.extend(!0, t.prototype.defaults.definitions, n)
    }
    ,
    t.extendAliases = function(n) {
        e.extend(!0, t.prototype.defaults.aliases, n)
    }
    ,
    t.format = function(e, n, i) {
        return t(n).format(e, i)
    }
    ,
    t.unmask = function(e, n) {
        return t(n).unmaskedvalue(e)
    }
    ,
    t.isValid = function(e, n) {
        return t(n).isValid(e)
    }
    ,
    t.remove = function(t) {
        e.each(t, function(e, t) {
            t.inputmask && t.inputmask.remove()
        })
    }
    ,
    t.escapeRegex = function(e) {
        var t = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"];
        return e.replace(new RegExp("(\\" + t.join("|\\") + ")","gim"), "\\$1")
    }
    ,
    t.keyCode = {
        ALT: 18,
        BACKSPACE: 8,
        BACKSPACE_SAFARI: 127,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91,
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        MENU: 93,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        WINDOWS: 91,
        X: 88
    },
    window.Inputmask = t,
    t
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0bWFzay5qcyJdLCJuYW1lcyI6WyJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwiZXhwb3J0cyIsIm1vZHVsZSIsInJlcXVpcmUiLCJ3aW5kb3ciLCJkZXBlbmRlbmN5TGliIiwialF1ZXJ5IiwiJCIsIklucHV0bWFzayIsImFsaWFzIiwib3B0aW9ucyIsInRoaXMiLCJpc1BsYWluT2JqZWN0IiwiZWwiLCJ1bmRlZmluZWQiLCJvcHRzIiwiZXh0ZW5kIiwiZGVmYXVsdHMiLCJtYXNrc2V0Iiwibm9NYXNrc0NhY2hlIiwiZGVmaW5pdGlvbnMiLCJ1c2VyT3B0aW9ucyIsImV2ZW50cyIsImRhdGFBdHRyaWJ1dGUiLCJpc1JUTCIsIm51bWVyaWNJbnB1dCIsInJlZnJlc2hWYWx1ZSIsInJlc29sdmVBbGlhcyIsImFsaWFzU3RyIiwiYWxpYXNEZWZpbml0aW9uIiwiYWxpYXNlcyIsIm1hc2siLCJnZW5lcmF0ZU1hc2tTZXQiLCJub2NhY2hlIiwiZ2VuZXJhdGVNYXNrIiwibWV0YWRhdGEiLCJsZW5ndGgiLCJncmVlZHkiLCJyZXBlYXQiLCJwbGFjZWhvbGRlciIsInJlcGVhdFN0YXJ0IiwiZ3JvdXBtYXJrZXIiLCJzdGFydCIsImVuZCIsInF1YW50aWZpZXJtYXJrZXIiLCJtYXNrc2V0RGVmaW5pdGlvbiIsInByb3RvdHlwZSIsIm1hc2tzQ2FjaGUiLCJtYXNrVG9rZW4iLCJhbmFseXNlTWFzayIsInZhbGlkUG9zaXRpb25zIiwiX2J1ZmZlciIsImJ1ZmZlciIsInRlc3RzIiwibWFza0xlbmd0aCIsInNwbGl0IiwicmV2ZXJzZSIsImpvaW4iLCJtcyIsImlzRnVuY3Rpb24iLCJpc0FycmF5Iiwia2VlcFN0YXRpYyIsImFsdE1hc2siLCJlYWNoIiwibmR4IiwibXNrIiwiYWx0ZXJuYXRvcm1hcmtlciIsInBvcCIsIm1hc2tTY29wZSIsImFjdGlvbk9iaiIsImdldE1hc2tUZW1wbGF0ZSIsImJhc2VPbklucHV0IiwibWluaW1hbFBvcyIsImluY2x1ZGVNb2RlIiwibmR4SW50bHpyIiwidGVzdCIsInRlc3RQb3MiLCJtYXNrVGVtcGxhdGUiLCJwb3MiLCJsdnAiLCJnZXRMYXN0VmFsaWRQb3NpdGlvbiIsIm1heExlbmd0aCIsImdldE1hc2tTZXQiLCJtYXRjaCIsImxvY2F0b3IiLCJzbGljZSIsInB1c2giLCJpbnB1dCIsIm5hdGl2ZURlZiIsImdldFBsYWNlaG9sZGVyIiwiZ2V0VGVzdFRlbXBsYXRlIiwiaml0TWFza2luZyIsImlzRmluaXRlIiwiZm4iLCJkZWYiLCJyZXNldE1hc2tTZXQiLCJzb2Z0IiwicCIsImNsb3Nlc3RUbyIsInN0cmljdCIsImJlZm9yZSIsImFmdGVyIiwidmFsaWRzIiwicG9zTmR4IiwicHNOZHgiLCJwYXJzZUludCIsImdlbmVyYXRlZElucHV0Iiwic3RyaXBWYWxpZFBvc2l0aW9ucyIsIm5vY2hlY2siLCJJc0VuY2xvc2VkU3RhdGljIiwicG9zTWF0Y2giLCJwcmV2TWF0Y2giLCJuZXh0TWF0Y2giLCJpIiwic3RhcnRQb3MiLCJwb3NpdGlvbnNDbG9uZSIsIm5lZWRzVmFsaWRhdGlvbiIsIm9wdGlvbmFsaXR5IiwiY2FuQ2xlYXJQb3NpdGlvbiIsImlzTWFzayIsInQiLCJwb3NpdGlvbkNhbk1hdGNoRGVmaW5pdGlvbiIsImlzVmFsaWQiLCJkZXRlcm1pbmVUZXN0VGVtcGxhdGUiLCJndWVzc05leHRCZXN0IiwidGVzdFBvc2l0aW9ucyIsImx2VGVzdCIsImdldFRlc3RzIiwibHZUZXN0QWx0QXJyIiwiYWx0ZXJuYXRpb24iLCJ0b1N0cmluZyIsIm9wdGlvbmFsUXVhbnRpZmllciIsIm5ld0Jsb2NrTWFya2VyIiwiY2hlY2tBbHRlcm5hdGlvbk1hdGNoIiwidHN0UHMiLCJnZXRUZXN0IiwidmFsaWQiLCJ0bmR4IiwicmVzb2x2ZVRlc3RGcm9tVG9rZW4iLCJuZHhJbml0aWFsaXplciIsImxvb3BOZHgiLCJxdWFudGlmaWVyUmVjdXJzZSIsImhhbmRsZU1hdGNoIiwiaXNGaXJzdE1hdGNoIiwibGF0ZXN0TWF0Y2giLCJ0b2tlbkdyb3VwIiwiZmlyc3RNYXRjaCIsImluQXJyYXkiLCJtYXRjaGVzIiwiaXNRdWFudGlmaWVyIiwicmVzb2x2ZU5keEluaXRpYWxpemVyIiwiYWx0ZXJuYXRlTmR4IiwidGFyZ2V0QWx0ZXJuYXRpb24iLCJiZXN0TWF0Y2giLCJpbmRleFBvcyIsImxtbnQiLCJuZHhQb3MiLCJpbmRleE9mIiwic3RhdGljQ2FuTWF0Y2hEZWZpbml0aW9uIiwic291cmNlIiwidGFyZ2V0IiwiY2QiLCJjYWNoZURlcGVuZGVuY3kiLCJpc0dyb3VwIiwiaXNPcHRpb25hbCIsIm9wdGlvbmFsVG9rZW4iLCJpbnNlcnRTdG9wIiwiaXNBbHRlcm5hdG9yIiwibWFsdE1hdGNoZXMiLCJhbHRlcm5hdGVUb2tlbiIsIm1hbHRlcm5hdGVNYXRjaGVzIiwiY3VycmVudE1hdGNoZXMiLCJsb29wTmR4Q250IiwiYWx0SW5kZXgiLCJzaGlmdCIsImFtbmR4IiwiY3VycmVudFBvcyIsIm5keEluaXRpYWxpemVyQ2xvbmUiLCJhbHRJbmRleEFyciIsImNvbmNhdCIsIm50bmR4IiwibmR4MSIsImFsdE1hdGNoIiwiaGFzTWF0Y2giLCJuZHgyIiwiYWx0TWF0Y2gyIiwibmEiLCJtYXAiLCJtYW1hdGNoIiwiYWx0TG9jQXJyIiwiYWxuZHgiLCJxdCIsInFuZHgiLCJpc05hTiIsInF1YW50aWZpZXIiLCJtYXgiLCJtaW4iLCJtZXJnZUxvY2F0b3JzIiwidHN0IiwiZmlsdGVyVGVzdHMiLCJtYXNrVG9rZW5zIiwicHJldmlvdXNQb3MiLCJtdG5keCIsImNhcmRpbmFsaXR5IiwiY2FzaW5nIiwiZ2V0QnVmZmVyVGVtcGxhdGUiLCJnZXRCdWZmZXIiLCJub0NhY2hlIiwicmVmcmVzaEZyb21CdWZmZXIiLCJza2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyIiwiZWxlbSIsInRvVXBwZXJDYXNlIiwidG9Mb3dlckNhc2UiLCJwb3NCZWZvcmUiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJrZXlDb2RlIiwiU1BBQ0UiLCJhbHRBcnIxIiwiYWx0QXJyMiIsImFsdEFyckMiLCJpc01hdGNoIiwiYyIsImZyb21TZXRWYWxpZCIsImZyb21BbHRlcm5hdGUiLCJpc1NlbGVjdGlvbiIsInBvc09iaiIsInNlbGVjdGlvbiIsImJlZ2luIiwiaW5zZXJ0TW9kZSIsIl9pc1ZhbGlkIiwicG9zaXRpb24iLCJyc2x0IiwibG9vcGVuZCIsImNocnMiLCJnZXRCdWZmZXJFbGVtZW50IiwidmFsaWRhdGVkUG9zIiwicG9zc2libGVNb2RpZmllZEJ1ZmZlciIsInJlbW92ZSIsInNvcnQiLCJhIiwiYiIsImluc2VydCIsInJlZnJlc2giLCJzZXRWYWxpZFBvc2l0aW9uIiwiYWx0ZXJuYXRlIiwibGFzdEFsdCIsImFsdFBvcyIsInByZXZBbHRQb3MiLCJ2YWxpZFBvcyIsImFsdE5keHMiLCJkZWNpc2lvblBvcyIsInZhbGlkUHNDbG9uZSIsImlzVmFsaWRSc2x0IiwibEFsdFBvcyIsImRlY2lzaW9uVGFrZXIiLCJwb3NzaWJpbGl0eVBvcyIsInByZXZQb3MiLCJtbmR4IiwidmFsaWRJbnB1dHMiLCJzdGF0aWNJbnB1dHNCZWZvcmVQb3MiLCJzdGF0aWNJbnB1dHNCZWZvcmVQb3NBbHRlcm5hdGUiLCJ2ZXJpZnlWYWxpZElucHV0IiwicG9zc2liaWxpdGllcyIsInRhcmdldEx2cCIsInRyYWNrYmFja0FsdGVybmF0aW9ucyIsIm9yaWdpbmFsUG9zIiwibmV3UG9zIiwidnAiLCJ0YXJnZXRMb2NhdG9yIiwidGxsIiwicHMiLCJlcXVhbGl0eSIsInZhbGlkVGVzdCIsImoiLCJ2cHMiLCJpbml0aWFsTGVuZ3RoIiwiZmlsbE1pc3NpbmdOb25NYXNrIiwicmVzdWx0IiwiY2FyZXQiLCJtYXNrUG9zIiwicG5keCIsInRlc3RUZW1wbGF0ZSIsInRlc3RzRnJvbVBvcyIsInJhZGl4UG9pbnREZWZpbml0aW9uU3ltYm9sIiwicmFkaXhQb2ludCIsImhhbmRsZVJlbW92ZSIsIkRFTEVURSIsImN1cnJlbnRQb3NWYWxpZCIsInNlZWtOZXh0Iiwic3RhdGljQ2hhciIsIm5Qb3MiLCJzblBvcyIsInBvc3RWYWxpZGF0aW9uIiwibmV3QmxvY2siLCJtYXNrTCIsInNlZWtQcmV2aW91cyIsIndyaXRlQnVmZmVyIiwiY2FyZXRQb3MiLCJldmVudCIsInRyaWdnZXJJbnB1dEV2ZW50Iiwib25CZWZvcmVXcml0ZSIsImlucHV0bWFzayIsIl92YWx1ZVNldCIsInR5cGUiLCJyZW5kZXJDb2xvck1hc2siLCJza2lwSW5wdXRFdmVudCIsInRyaWdnZXIiLCJwcmV2VGVzdCIsInN0YXRpY0FsdGVybmF0aW9ucyIsImNoYXJBdCIsImNoZWNrVmFsIiwid3JpdGVPdXQiLCJucHR2bCIsImluaXRpYXRpbmdFdmVudCIsInN0aWNreUNhcmV0IiwiaXNUZW1wbGF0ZU1hdGNoIiwiY2hhckNvZGVOZHgiLCJpbml0aWFsTmR4IiwiY2hhckNvZGVzIiwiYnVmZmVyVGVtcGxhdGVBcnIiLCJpbnB1dFZhbHVlIiwiYXV0b1VubWFzayIsInN0YXRpY0lucHV0IiwiUmVnRXhwIiwiZXNjYXBlUmVnZXgiLCJzcGxpY2UiLCJjaGFyQ29kZSIsImtleXByZXNzIiwiRXZlbnQiLCJ3aGljaCIsImNoYXJDb2RlQXQiLCJuZXh0VGVzdCIsIkV2ZW50SGFuZGxlcnMiLCJrZXlwcmVzc0V2ZW50IiwiY2FsbCIsImZvcndhcmRQb3NpdGlvbiIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsInVubWFza2VkdmFsdWUiLCJ2YWx1ZSIsInNldFZhbHVlRXZlbnQiLCJ1bVZhbHVlIiwidW5tYXNrZWRWYWx1ZSIsIm9uVW5NYXNrIiwiYnVmZmVyVmFsdWUiLCJub3RyYW5zbGF0ZSIsInRyYW5zbGF0ZVBvc2l0aW9uIiwiYmZmckxnaHQiLCJyYW5nZSIsInNldFNlbGVjdGlvblJhbmdlIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJnZXRTZWxlY3Rpb24iLCJnZXRSYW5nZUF0IiwiY29tbW9uQW5jZXN0b3JDb250YWluZXIiLCJwYXJlbnROb2RlIiwic3RhcnRPZmZzZXQiLCJlbmRPZmZzZXQiLCJjcmVhdGVSYW5nZSIsImR1cGxpY2F0ZSIsIm1vdmVTdGFydCIsIl92YWx1ZUdldCIsInRleHQiLCJzY3JvbGxDYWxjIiwib3duZXJEb2N1bWVudCIsImRlZmF1bHRWaWV3IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImN1cnJlbnRTdHlsZSIsImZvbnRTaXplIiwic2Nyb2xsTGVmdCIsInNjcm9sbFdpZHRoIiwibW9iaWxlIiwiZmlyc3RDaGlsZCIsInRleHROb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJhcHBlbmRDaGlsZCIsInNldFN0YXJ0Iiwic2V0RW5kIiwiY29sbGFwc2UiLCJzZWwiLCJyZW1vdmVBbGxSYW5nZXMiLCJhZGRSYW5nZSIsImNyZWF0ZVRleHRSYW5nZSIsIm1vdmVFbmQiLCJzZWxlY3QiLCJkZXRlcm1pbmVMYXN0UmVxdWlyZWRQb3NpdGlvbiIsInJldHVybkRlZmluaXRpb24iLCJibCIsInBvc2l0aW9ucyIsImx2VGVzdEFsdCIsImwiLCJjbGVhck9wdGlvbmFsVGFpbCIsInJsIiwiaXNDb21wbGV0ZSIsImNvbXBsZXRlIiwibHJwIiwiYW1sIiwiayIsImdlbmVyYWxpemUiLCJCQUNLU1BBQ0UiLCJwZW5kIiwiZ3JvdXBTZXBhcmF0b3IiLCJpbml0aWFsaXplQ29sb3JNYXNrIiwiZmluZENhcmV0UG9zIiwiY2xpZW50eCIsImUiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJjb21wdXRlZFN0eWxlIiwidGV4dFRyYW5zZm9ybSIsImxldHRlclNwYWNpbmciLCJoZWlnaHQiLCJ3aWR0aCIsInZpc2liaWxpdHkiLCJ3aGl0ZVNwYWNlIiwiYm9keSIsIml0bCIsImlucHV0VGV4dCIsInByZXZpb3VzV2lkdGgiLCJpbm5lckhUTUwiLCJvZmZzZXRXaWR0aCIsIm9mZnNldDEiLCJvZmZzZXQyIiwicmVtb3ZlQ2hpbGQiLCJjb2xvck1hc2siLCJ0b3AiLCJvZmZzZXQiLCJsZWZ0IiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSaWdodFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJib3JkZXJUb3BXaWR0aCIsImJvcmRlckJvdHRvbVdpZHRoIiwibGluZUhlaWdodCIsInpJbmRleCIsIndlYmtpdEFwcGVhcmFuY2UiLCJtb3pBcHBlYXJhbmNlIiwiQXBwZWFyYW5jZSIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwib24iLCJjbGllbnRYIiwiY2xpY2tFdmVudCIsInNoaWZ0S2V5Iiwic2V0VGltZW91dCIsImhhbmRsZVN0YXRpYyIsImlzU3RhdGljIiwiaXNFbGVtZW50VHlwZVN1cHBvcnRlZCIsInBhdGNoVmFsdWVQcm9wZXJ0eSIsIm5wdCIsInBhdGNoVmFsaG9vayIsInZhbEhvb2tzIiwiaW5wdXRtYXNrcGF0Y2giLCJ2YWxob29rR2V0IiwiZ2V0IiwidmFsaG9va1NldCIsInNldCIsIm51bGxhYmxlIiwiJGVsZW0iLCJnZXR0ZXIiLCJjbGVhck1hc2tPbkxvc3RGb2N1cyIsInZhbHVlR2V0Iiwic2V0dGVyIiwidmFsdWVTZXQiLCJpbnN0YWxsTmF0aXZlVmFsdWVTZXRGYWxsYmFjayIsIkV2ZW50UnVsZXIiLCIkaW5wdXQiLCJfX3ZhbHVlR2V0Iiwibm9WYWx1ZVBhdGNoaW5nIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJvYmplY3QiLCJjb25zdHJ1Y3RvciIsInZhbHVlUHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsInRhZ05hbWUiLCJ0ZXh0Q29udGVudCIsIl9fbG9va3VwR2V0dGVyX18iLCJfX2xvb2t1cFNldHRlcl9fIiwiX19kZWZpbmVHZXR0ZXJfXyIsIl9fZGVmaW5lU2V0dGVyX18iLCJfX3ZhbHVlU2V0Iiwib3ZlcnJ1bGVSVEwiLCJlbGVtZW50VHlwZSIsImdldEF0dHJpYnV0ZSIsImlzU3VwcG9ydGVkIiwic3VwcG9ydHNJbnB1dFR5cGUiLCJpc0NvbnRlbnRFZGl0YWJsZSIsInNldEF0dHJpYnV0ZSIsIiRlbCIsImRpciIsInJpZ2h0QWxpZ24iLCJ0ZXh0QWxpZ24iLCJyZW1vdmVBdHRyaWJ1dGUiLCJhbmRyb2lkIiwiaGFzT3duUHJvcGVydHkiLCJpbnB1dG1vZGUiLCJhbmRyb2lkSGFjayIsIm9mZiIsInN1Ym1pdEV2ZW50IiwicmVzZXRFdmVudCIsIm1vdXNlZW50ZXJFdmVudCIsImJsdXJFdmVudCIsImZvY3VzRXZlbnQiLCJtb3VzZWxlYXZlRXZlbnQiLCJkYmxjbGlja0V2ZW50IiwicGFzdGVFdmVudCIsImN1dEV2ZW50Iiwib25jb21wbGV0ZSIsIm9uaW5jb21wbGV0ZSIsIm9uY2xlYXJlZCIsImlucHV0RXZlbnRPbmx5Iiwia2V5ZG93bkV2ZW50Iiwibm9vcCIsImlucHV0RmFsbEJhY2tFdmVudCIsImluaXRpYWxWYWx1ZSIsIm9uQmVmb3JlTWFzayIsInVuZG9WYWx1ZSIsImNsZWFySW5jb21wbGV0ZSIsInZhbHVlQnVmZmVyIiwic2tpcEtleVByZXNzRXZlbnQiLCJpZ25vcmFibGUiLCJtb3VzZUVudGVyIiwiZXZlbnROYW1lIiwiZXZlbnRIYW5kbGVyIiwiZXYiLCJub2RlTmFtZSIsImltT3B0cyIsImRhdGEiLCJkaXNhYmxlZCIsInJlYWRPbmx5IiwiY3RybEtleSIsInRhYlRocm91Z2giLCJUQUIiLCJwcmV2ZW50RGVmYXVsdCIsImllbW9iaWxlIiwiaXBob25lIiwidGhhdCIsImFyZ3MiLCJhcmd1bWVudHMiLCJhcHBseSIsInJldHVyblZhbCIsInN0b3BQcm9wYWdhdGlvbiIsImZvcm0iLCJldkFyciIsImlzSW5wdXRFdmVudFN1cHBvcnRlZCIsImV2TmFtZSIsIkJBQ0tTUEFDRV9TQUZBUkkiLCJYIiwiRU5EIiwiUEFHRV9ET1dOIiwiSE9NRSIsIlBBR0VfVVAiLCJ1bmRvT25Fc2NhcGUiLCJFU0NBUEUiLCJhbHRLZXkiLCJJTlNFUlQiLCJSSUdIVCIsIkxFRlQiLCJvbktleURvd24iLCJpZ25vcmFibGVzIiwiY2hlY2t2YWwiLCJtZXRhS2V5IiwiRU5URVIiLCJ3cml0ZU91dEJ1ZmZlciIsInZhbFJlc3VsdCIsInNlbGYiLCJvbktleVZhbGlkYXRpb24iLCJ0ZW1wVmFsdWUiLCJvcmlnaW5hbEV2ZW50IiwidmFsdWVCZWZvcmVDYXJldCIsInN1YnN0ciIsInZhbHVlQWZ0ZXJDYXJldCIsImNsaXBib2FyZERhdGEiLCJnZXREYXRhIiwicGFzdGVWYWx1ZSIsIm9uQmVmb3JlUGFzdGUiLCJyZXBsYWNlIiwiaW5wdXRDaGFyIiwiYnVmZmVyVGVtcGxhdGUiLCJucHRWYWx1ZSIsInNob3dNYXNrT25Gb2N1cyIsInNob3dNYXNrT25Ib3ZlciIsInBvc2l0aW9uQ2FyZXRPblRhYiIsInRhYmJlZCIsImRvUmFkaXhGb2N1cyIsImNsaWNrUG9zIiwicmFkaXhQb3MiLCJzZWxlY3RlZENhcmV0IiwicG9zaXRpb25DYXJldE9uQ2xpY2siLCJjbGlja1Bvc2l0aW9uIiwibHZjbGlja1Bvc2l0aW9uIiwibGFzdFBvc2l0aW9uIiwiY2xpcERhdGEiLCJzZXREYXRhIiwiZXhlY0NvbW1hbmQiLCJyZW1vdmVNYXNrT25TdWJtaXQiLCJhY3Rpb24iLCJsbWliIiwibWFza1RhcmdldCIsIm10ZHQiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm9wdGlvbmFsbWFya2VyIiwiZXNjYXBlQ2hhciIsInBhc3RlZFZhbHVlIiwiOSIsInZhbGlkYXRvciIsImRlZmluaXRpb25TeW1ib2wiLCIqIiwic3RhdGljRGVmaW5pdGlvblN5bWJvbCIsImVsZW1zIiwiaW1wb3J0QXR0cmlidXRlT3B0aW9ucyIsImltcG9ydE9wdGlvbiIsIm9wdGlvbiIsIm9wdGlvbkRhdGEiLCJkYXRhb3B0aW9ucyIsImF0dHJPcHRpb25zIiwiSlNPTiIsInBhcnNlIiwiZ2V0RWxlbWVudEJ5SWQiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2NvcGVkT3B0cyIsIm5vcmVtYXNrIiwiZ2V0ZW1wdHltYXNrIiwiaGFzTWFza2VkVmFsdWUiLCJnZXRtZXRhZGF0YSIsImZvcm1hdCIsIk1hc2tUb2tlbiIsIm9wZW5Hcm91cCIsImluc2VydFRlc3REZWZpbml0aW9uIiwibXRva2VuIiwiZWxlbWVudCIsIm1hc2tkZWYiLCJlc2NhcGVkIiwicHJldmFsaWRhdG9ycyIsInByZXZhbGlkYXRvciIsInByZXZhbGlkYXRvcnNMIiwidmVyaWZ5R3JvdXBNYXJrZXIiLCJ0b2tlbiIsIm5leHRUb2tlbiIsImRlZmF1bHRDYXNlIiwib3BlbmVuaW5ncyIsImN1cnJlbnRPcGVuaW5nVG9rZW4iLCJtIiwiYWx0ZXJuYXRvciIsImN1cnJlbnRUb2tlbiIsInJldmVyc2VUb2tlbnMiLCJyZXZlcnNlU3RhdGljIiwic3QiLCJpbnRNYXRjaCIsIm9wZW5pbmdUb2tlbiIsImxhc3RNYXRjaCIsImdyb3VwVG9rZW4iLCJ0b2tlbml6ZXIiLCJleGVjIiwibXEiLCJtcTAiLCJtcTEiLCJleHRlbmREZWZhdWx0cyIsImV4dGVuZERlZmluaXRpb25zIiwiZGVmaW5pdGlvbiIsImV4dGVuZEFsaWFzZXMiLCJ1bm1hc2siLCJzdHIiLCJzcGVjaWFscyIsIkFMVCIsIkNBUFNfTE9DSyIsIkNPTU1BIiwiQ09NTUFORCIsIkNPTU1BTkRfTEVGVCIsIkNPTU1BTkRfUklHSFQiLCJDT05UUk9MIiwiRE9XTiIsIk1FTlUiLCJOVU1QQURfQUREIiwiTlVNUEFEX0RFQ0lNQUwiLCJOVU1QQURfRElWSURFIiwiTlVNUEFEX0VOVEVSIiwiTlVNUEFEX01VTFRJUExZIiwiTlVNUEFEX1NVQlRSQUNUIiwiUEVSSU9EIiwiU0hJRlQiLCJVUCIsIldJTkRPV1MiXSwibWFwcGluZ3MiOiJDQU9DLFNBQVVBLEdBQ1ksa0JBQVhDLFNBQXlCQSxPQUFPQyxJQUMxQ0QsT0FBTyxhQUFjLDJCQUE0QkQsR0FDcEIsZ0JBQVpHLFNBQ2pCQyxPQUFPRCxRQUFVSCxFQUFRSyxRQUFRLDhCQUVqQ0wsRUFBUU0sT0FBT0MsZUFBaUJDLFNBR2pDLFNBQVVDLEdBT1YsUUFBU0MsR0FBVUMsRUFBT0MsR0FFekIsTUFBTUMsZ0JBQWdCSCxJQUlsQkQsRUFBRUssY0FBY0gsR0FDbkJDLEVBQVVELEdBRVZDLEVB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Q0xuUixVQUFXLEVBQ1gySixpQkFBa0IsSUFDbEJ5SCxVQUFXLEdBQ1hDLE1BQU8sSUFDUEMsUUFBUyxHQUNUQyxhQUFjLEdBQ2RDLGNBQWUsR0FDZkMsUUFBUyxHQUNUMVksT0FBUSxHQUNSMlksS0FBTSxHQUNON0gsSUFBSyxHQUNMYyxNQUFPLEdBQ1BULE9BQVEsR0FDUkgsS0FBTSxHQUNOSyxPQUFRLEdBQ1JFLEtBQU0sR0FDTnFILEtBQU0sR0FDTkMsV0FBWSxJQUNaQyxlQUFnQixJQUNoQkMsY0FBZSxJQUNmQyxhQUFjLElBQ2RDLGdCQUFpQixJQUNqQkMsZ0JBQWlCLElBQ2pCbkksVUFBVyxHQUNYRSxRQUFTLEdBQ1RrSSxPQUFRLElBQ1I3SCxNQUFPLEdBQ1A4SCxNQUFPLEdBQ1AxZCxNQUFPLEdBQ1BvVSxJQUFLLEVBQ0x1SixHQUFJLEdBQ0pDLFFBQVMsR0FDVHpJLEVBQUcsSUE0NEVKeGlCLE9BQU9JLFVBQVlBLEVBQ1pBIiwiZmlsZSI6ImlucHV0bWFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIElucHV0IE1hc2sgQ29yZVxyXG4gKiBodHRwOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvanF1ZXJ5LmlucHV0bWFza1xyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTAgLVx0Um9iaW4gSGVyYm90c1xyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgKGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwKVxyXG4gKiBWZXJzaW9uOiAwLjAuMC1kZXZcclxuICovXHJcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xyXG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xyXG5cdFx0ZGVmaW5lKFwiaW5wdXRtYXNrXCIsIFtcImlucHV0bWFzay5kZXBlbmRlbmN5TGliXCJdLCBmYWN0b3J5KTtcclxuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XHJcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vaW5wdXRtYXNrLmRlcGVuZGVuY3lMaWJcIikpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRmYWN0b3J5KHdpbmRvdy5kZXBlbmRlbmN5TGliIHx8IGpRdWVyeSk7XHJcblx0fVxyXG59XHJcbihmdW5jdGlvbiAoJCkge1xyXG5cdHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQsXHJcblx0XHRtb2JpbGUgPSAvbW9iaWxlL2kudGVzdCh1YSksXHJcblx0XHRpZW1vYmlsZSA9IC9pZW1vYmlsZS9pLnRlc3QodWEpLFxyXG5cdFx0aXBob25lID0gL2lwaG9uZS9pLnRlc3QodWEpICYmICFpZW1vYmlsZSxcclxuXHRcdGFuZHJvaWQgPSAvYW5kcm9pZC9pLnRlc3QodWEpICYmICFpZW1vYmlsZTtcclxuXHJcblx0ZnVuY3Rpb24gSW5wdXRtYXNrKGFsaWFzLCBvcHRpb25zKSB7XHJcblx0XHQvL2FsbG93IGluc3RhbmNpYXRpbmcgd2l0aG91dCBuZXdcclxuXHRcdGlmICghKHRoaXMgaW5zdGFuY2VvZiBJbnB1dG1hc2spKSB7XHJcblx0XHRcdHJldHVybiBuZXcgSW5wdXRtYXNrKGFsaWFzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KGFsaWFzKSkge1xyXG5cdFx0XHRvcHRpb25zID0gYWxpYXM7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHRcdFx0b3B0aW9ucy5hbGlhcyA9IGFsaWFzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZWwgPSB1bmRlZmluZWQ7XHJcblx0XHQvL2luaXQgb3B0aW9uc1xyXG5cdFx0dGhpcy5vcHRzID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5tYXNrc2V0ID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5ub01hc2tzQ2FjaGUgPSBvcHRpb25zICYmIG9wdGlvbnMuZGVmaW5pdGlvbnMgIT09IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMudXNlck9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvL3VzZXIgcGFzc2VkIG9wdGlvbnNcclxuXHRcdHRoaXMuZXZlbnRzID0ge307XHJcblx0XHR0aGlzLmRhdGFBdHRyaWJ1dGUgPSBcImRhdGEtaW5wdXRtYXNrXCI7IC8vZGF0YSBhdHRyaWJ1dGUgcHJlZml4IHVzZWQgZm9yIGF0dHJpYnV0ZSBiaW5kaW5nXHJcblx0XHR0aGlzLmlzUlRMID0gdGhpcy5vcHRzLm51bWVyaWNJbnB1dDtcclxuXHRcdHRoaXMucmVmcmVzaFZhbHVlID0gZmFsc2UsIC8vaW5kaWNhdGUgYSByZWZyZXNoIGZyb20gdGhlIGlucHV0dmFsdWUgaXMgbmVlZGVkIChmb3JtLnJlc2V0KVxyXG5cdFx0XHRyZXNvbHZlQWxpYXModGhpcy5vcHRzLmFsaWFzLCBvcHRpb25zLCB0aGlzLm9wdHMpO1xyXG5cdH1cclxuXHJcblx0SW5wdXRtYXNrLnByb3RvdHlwZSA9IHtcclxuXHRcdC8vb3B0aW9ucyBkZWZhdWx0XHJcblx0XHRkZWZhdWx0czoge1xyXG5cdFx0XHRwbGFjZWhvbGRlcjogXCJfXCIsXHJcblx0XHRcdG9wdGlvbmFsbWFya2VyOiB7XHJcblx0XHRcdFx0c3RhcnQ6IFwiW1wiLFxyXG5cdFx0XHRcdGVuZDogXCJdXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0cXVhbnRpZmllcm1hcmtlcjoge1xyXG5cdFx0XHRcdHN0YXJ0OiBcIntcIixcclxuXHRcdFx0XHRlbmQ6IFwifVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGdyb3VwbWFya2VyOiB7XHJcblx0XHRcdFx0c3RhcnQ6IFwiKFwiLFxyXG5cdFx0XHRcdGVuZDogXCIpXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0YWx0ZXJuYXRvcm1hcmtlcjogXCJ8XCIsXHJcblx0XHRcdGVzY2FwZUNoYXI6IFwiXFxcXFwiLFxyXG5cdFx0XHRtYXNrOiBudWxsLCAvL25lZWRzIHRvYmUgbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZCBhcyB0aGUgZXh0ZW5kIG1ldGhvZCBkb2VzIG5vdCBjb25zaWRlciBwcm9wcyB3aXRoIHRoZSB1bmRlZmluZWQgdmFsdWVcclxuXHRcdFx0b25jb21wbGV0ZTogJC5ub29wLCAvL2V4ZWN1dGVzIHdoZW4gdGhlIG1hc2sgaXMgY29tcGxldGVcclxuXHRcdFx0b25pbmNvbXBsZXRlOiAkLm5vb3AsIC8vZXhlY3V0ZXMgd2hlbiB0aGUgbWFzayBpcyBpbmNvbXBsZXRlIGFuZCBmb2N1cyBpcyBsb3N0XHJcblx0XHRcdG9uY2xlYXJlZDogJC5ub29wLCAvL2V4ZWN1dGVzIHdoZW4gdGhlIG1hc2sgaXMgY2xlYXJlZFxyXG5cdFx0XHRyZXBlYXQ6IDAsIC8vcmVwZXRpdGlvbnMgb2YgdGhlIG1hc2s6ICogfiBmb3JldmVyLCBvdGhlcndpc2Ugc3BlY2lmeSBhbiBpbnRlZ2VyXHJcblx0XHRcdGdyZWVkeTogdHJ1ZSwgLy90cnVlOiBhbGxvY2F0ZWQgYnVmZmVyIGZvciB0aGUgbWFzayBhbmQgcmVwZXRpdGlvbnMgLSBmYWxzZTogYWxsb2NhdGUgb25seSBpZiBuZWVkZWRcclxuXHRcdFx0YXV0b1VubWFzazogZmFsc2UsIC8vYXV0b21hdGljYWxseSB1bm1hc2sgd2hlbiByZXRyaWV2aW5nIHRoZSB2YWx1ZSB3aXRoICQuZm4udmFsIG9yIHZhbHVlIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIF9fbG9va3VwR2V0dGVyX18gb3IgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yXHJcblx0XHRcdHJlbW92ZU1hc2tPblN1Ym1pdDogZmFsc2UsIC8vcmVtb3ZlIHRoZSBtYXNrIGJlZm9yZSBzdWJtaXR0aW5nIHRoZSBmb3JtLlxyXG5cdFx0XHRjbGVhck1hc2tPbkxvc3RGb2N1czogdHJ1ZSxcclxuXHRcdFx0aW5zZXJ0TW9kZTogdHJ1ZSwgLy9pbnNlcnQgdGhlIGlucHV0IG9yIG92ZXJ3cml0ZSB0aGUgaW5wdXRcclxuXHRcdFx0Y2xlYXJJbmNvbXBsZXRlOiBmYWxzZSwgLy9jbGVhciB0aGUgaW5jb21wbGV0ZSBpbnB1dCBvbiBibHVyXHJcblx0XHRcdGFsaWFzZXM6IHt9LCAvL2FsaWFzZXMgZGVmaW5pdGlvbnMgPT4gc2VlIGpxdWVyeS5pbnB1dG1hc2suZXh0ZW5zaW9ucy5qc1xyXG5cdFx0XHRhbGlhczogbnVsbCxcclxuXHRcdFx0b25LZXlEb3duOiAkLm5vb3AsIC8vY2FsbGJhY2sgdG8gaW1wbGVtZW50IGF1dG9jb21wbGV0ZSBvbiBjZXJ0YWluIGtleXMgZm9yIGV4YW1wbGUuIGFyZ3MgPT4gZXZlbnQsIGJ1ZmZlciwgY2FyZXRQb3MsIG9wdHNcclxuXHRcdFx0b25CZWZvcmVNYXNrOiBudWxsLCAvL2V4ZWN1dGVzIGJlZm9yZSBtYXNraW5nIHRoZSBpbml0aWFsIHZhbHVlIHRvIGFsbG93IHByZXByb2Nlc3Npbmcgb2YgdGhlIGluaXRpYWwgdmFsdWUuXHRhcmdzID0+IGluaXRpYWxWYWx1ZSwgb3B0cyA9PiByZXR1cm4gcHJvY2Vzc2VkVmFsdWVcclxuXHRcdFx0b25CZWZvcmVQYXN0ZTogZnVuY3Rpb24gKHBhc3RlZFZhbHVlLCBvcHRzKSB7XHJcblx0XHRcdFx0cmV0dXJuICQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlTWFzaykgPyBvcHRzLm9uQmVmb3JlTWFzayhwYXN0ZWRWYWx1ZSwgb3B0cykgOiBwYXN0ZWRWYWx1ZTtcclxuXHRcdFx0fSwgLy9leGVjdXRlcyBiZWZvcmUgbWFza2luZyB0aGUgcGFzdGVkIHZhbHVlIHRvIGFsbG93IHByZXByb2Nlc3Npbmcgb2YgdGhlIHBhc3RlZCB2YWx1ZS5cdGFyZ3MgPT4gcGFzdGVkVmFsdWUsIG9wdHMgPT4gcmV0dXJuIHByb2Nlc3NlZFZhbHVlXHJcblx0XHRcdG9uQmVmb3JlV3JpdGU6IG51bGwsIC8vZXhlY3V0ZXMgYmVmb3JlIHdyaXRpbmcgdG8gdGhlIG1hc2tlZCBlbGVtZW50LiBhcmdzID0+IGV2ZW50LCBvcHRzXHJcblx0XHRcdG9uVW5NYXNrOiBudWxsLCAvL2V4ZWN1dGVzIGFmdGVyIHVubWFza2luZyB0byBhbGxvdyBwb3N0cHJvY2Vzc2luZyBvZiB0aGUgdW5tYXNrZWR2YWx1ZS5cdGFyZ3MgPT4gbWFza2VkVmFsdWUsIHVubWFza2VkVmFsdWUsIG9wdHNcclxuXHRcdFx0c2hvd01hc2tPbkZvY3VzOiB0cnVlLCAvL3Nob3cgdGhlIG1hc2stcGxhY2Vob2xkZXIgd2hlbiB0aGUgaW5wdXQgaGFzIGZvY3VzXHJcblx0XHRcdHNob3dNYXNrT25Ib3ZlcjogdHJ1ZSwgLy9zaG93IHRoZSBtYXNrLXBsYWNlaG9sZGVyIHdoZW4gaG92ZXJpbmcgdGhlIGVtcHR5IGlucHV0XHJcblx0XHRcdG9uS2V5VmFsaWRhdGlvbjogJC5ub29wLCAvL2V4ZWN1dGVzIG9uIGV2ZXJ5IGtleS1wcmVzcyB3aXRoIHRoZSByZXN1bHQgb2YgaXNWYWxpZC4gUGFyYW1zOiBrZXksIHJlc3VsdCwgb3B0c1xyXG5cdFx0XHRza2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyOiBcIiBcIiwgLy9hIGNoYXJhY3RlciB3aGljaCBjYW4gYmUgdXNlZCB0byBza2lwIGFuIG9wdGlvbmFsIHBhcnQgb2YgYSBtYXNrXHJcblx0XHRcdG51bWVyaWNJbnB1dDogZmFsc2UsIC8vbnVtZXJpY0lucHV0IGlucHV0IGRpcmVjdGlvbiBzdHlsZSAoaW5wdXQgc2hpZnRzIHRvIHRoZSBsZWZ0IHdoaWxlIGhvbGRpbmcgdGhlIGNhcmV0IHBvc2l0aW9uKVxyXG5cdFx0XHRyaWdodEFsaWduOiBmYWxzZSwgLy9hbGlnbiB0byB0aGUgcmlnaHRcclxuXHRcdFx0dW5kb09uRXNjYXBlOiB0cnVlLCAvL3ByZXNzaW5nIGVzY2FwZSByZXZlcnRzIHRoZSB2YWx1ZSB0byB0aGUgdmFsdWUgYmVmb3JlIGZvY3VzXHJcblx0XHRcdC8vbnVtZXJpYyBiYXNpYyBwcm9wZXJ0aWVzXHJcblx0XHRcdHJhZGl4UG9pbnQ6IFwiXCIsIC8vXCIuXCIsIC8vIHwgXCIsXCJcclxuXHRcdFx0cmFkaXhQb2ludERlZmluaXRpb25TeW1ib2w6IHVuZGVmaW5lZCwgLy9zZXQgdGhlIHJhZGl4UG9pbnQgZGVmaW5pdGlvblN5bWJvbCB+IHVzZWQgZm9yIGF3YXJlbmVzcyBvZiB0aGUgcmFkaXhwb2ludFxyXG5cdFx0XHRncm91cFNlcGFyYXRvcjogXCJcIiwgLy9cIixcIiwgLy8gfCBcIi5cIlxyXG5cdFx0XHQvL251bWVyaWMgYmFzaWMgcHJvcGVydGllc1xyXG5cdFx0XHRrZWVwU3RhdGljOiBudWxsLCAvL3RyeSB0byBrZWVwIHRoZSBtYXNrIHN0YXRpYyB3aGlsZSB0eXBpbmcuIERlY2lzaW9ucyB0byBhbHRlciB0aGUgbWFzayB3aWxsIGJlIHBvc3BvbmVkIGlmIHBvc3NpYmxlIC0gbnVsbCBzZWUgYXV0byBzZWxlY3Rpb24gZm9yIG11bHRpIG1hc2tzXHJcblx0XHRcdHBvc2l0aW9uQ2FyZXRPblRhYjogdHJ1ZSwgLy93aGVuIGVuYWJsZWQgdGhlIGNhcmV0IHBvc2l0aW9uIGlzIHNldCBhZnRlciB0aGUgbGF0ZXN0IHZhbGlkIHBvc2l0aW9uIG9uIFRBQlxyXG5cdFx0XHR0YWJUaHJvdWdoOiBmYWxzZSwgLy9hbGxvd3MgZm9yIHRhYmJpbmcgdGhyb3VnaCB0aGUgZGlmZmVyZW50IHBhcnRzIG9mIHRoZSBtYXNrZWQgZmllbGRcclxuXHRcdFx0c3VwcG9ydHNJbnB1dFR5cGU6IFtcInRleHRcIiwgXCJ0ZWxcIiwgXCJwYXNzd29yZFwiXSwgLy9saXN0IHdpdGggdGhlIHN1cHBvcnRlZCBpbnB1dCB0eXBlc1xyXG5cdFx0XHRkZWZpbml0aW9uczoge1xyXG5cdFx0XHRcdFwiOVwiOiB7XHJcblx0XHRcdFx0XHR2YWxpZGF0b3I6IFwiWzAtOV1cIixcclxuXHRcdFx0XHRcdGNhcmRpbmFsaXR5OiAxLFxyXG5cdFx0XHRcdFx0ZGVmaW5pdGlvblN5bWJvbDogXCIqXCJcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdFwiYVwiOiB7XHJcblx0XHRcdFx0XHR2YWxpZGF0b3I6IFwiW0EtWmEtelxcdTA0MTAtXFx1MDQ0RlxcdTA0MDFcXHUwNDUxXFx1MDBDMC1cXHUwMEZGXFx1MDBCNV1cIixcclxuXHRcdFx0XHRcdGNhcmRpbmFsaXR5OiAxLFxyXG5cdFx0XHRcdFx0ZGVmaW5pdGlvblN5bWJvbDogXCIqXCJcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdFwiKlwiOiB7XHJcblx0XHRcdFx0XHR2YWxpZGF0b3I6IFwiWzAtOUEtWmEtelxcdTA0MTAtXFx1MDQ0RlxcdTA0MDFcXHUwNDUxXFx1MDBDMC1cXHUwMEZGXFx1MDBCNV1cIixcclxuXHRcdFx0XHRcdGNhcmRpbmFsaXR5OiAxXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQvL3NwZWNpZnkga2V5Q29kZXMgd2hpY2ggc2hvdWxkIG5vdCBiZSBjb25zaWRlcmVkIGluIHRoZSBrZXlwcmVzcyBldmVudCwgb3RoZXJ3aXNlIHRoZSBwcmV2ZW50RGVmYXVsdCB3aWxsIHN0b3AgdGhlaXIgZGVmYXVsdCBiZWhhdmlvciBlc3BlY2lhbGx5IGluIEZGXHJcblx0XHRcdGlnbm9yYWJsZXM6IFs4LCA5LCAxMywgMTksIDI3LCAzMywgMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDAsIDQ1LCA0NiwgOTMsIDExMiwgMTEzLCAxMTQsIDExNSwgMTE2LCAxMTcsIDExOCwgMTE5LCAxMjAsIDEyMSwgMTIyLCAxMjNdLFxyXG5cdFx0XHRpc0NvbXBsZXRlOiBudWxsLCAvL292ZXJyaWRlIGZvciBpc0NvbXBsZXRlIC0gYXJncyA9PiBidWZmZXIsIG9wdHMgLSByZXR1cm4gdHJ1ZSB8fCBmYWxzZVxyXG5cdFx0XHRjYW5DbGVhclBvc2l0aW9uOiAkLm5vb3AsIC8vaG9vayB0byBhbHRlciB0aGUgY2xlYXIgYmVoYXZpb3IgaW4gdGhlIHN0cmlwVmFsaWRQb3NpdGlvbnMgYXJncyA9PiBtYXNrc2V0LCBwb3NpdGlvbiwgbGFzdFZhbGlkUG9zaXRpb24sIG9wdHMgPT4gcmV0dXJuIHRydWV8ZmFsc2VcclxuXHRcdFx0cG9zdFZhbGlkYXRpb246IG51bGwsIC8vaG9vayB0byBwb3N0VmFsaWRhdGUgdGhlIHJlc3VsdCBmcm9tIGlzVmFsaWQuXHRVc2VmdWxsIGZvciB2YWxpZGF0aW5nIHRoZSBlbnRyeSBhcyBhIHdob2xlLlx0YXJncyA9PiBidWZmZXIsIGN1cnJlbnRSZXN1bHQsIG9wdHMgPT4gcmV0dXJuIHRydWUvZmFsc2VcclxuXHRcdFx0c3RhdGljRGVmaW5pdGlvblN5bWJvbDogdW5kZWZpbmVkLCAvL3NwZWNpZnkgYSBkZWZpbml0aW9uU3ltYm9sIGZvciBzdGF0aWMgY29udGVudCwgdXNlZCB0byBtYWtlIG1hdGNoZXMgZm9yIGFsdGVybmF0b3JzXHJcblx0XHRcdGppdE1hc2tpbmc6IGZhbHNlLCAvL2p1c3QgaW4gdGltZSBtYXNraW5nIH4gb25seSBtYXNrIHdoaWxlIHR5cGluZywgY2FuIG4gKG51bWJlciksIHRydWUgb3IgZmFsc2VcclxuXHRcdFx0bnVsbGFibGU6IHRydWUsIC8vcmV0dXJuIG5vdGhpbmcgaW5zdGVhZCBvZiB0aGUgYnVmZmVydGVtcGxhdGUgd2hlbiB0aGUgdXNlciBoYXNuJ3QgZW50ZXJlZCBhbnl0aGluZy5cclxuXHRcdFx0aW5wdXRFdmVudE9ubHk6IGZhbHNlLCAvL2RldiBvcHRpb24gLSB0ZXN0aW5nIGlucHV0ZmFsbGJhY2sgYmVoYXZpb3JcclxuXHRcdFx0bm9WYWx1ZVBhdGNoaW5nOiBmYWxzZSwgLy9kZXYgb3B0aW9uIC0gZGlzYWJsZSB2YWx1ZSBwcm9wZXJ0eSBwYXRjaGluZ1xyXG5cdFx0XHRwb3NpdGlvbkNhcmV0T25DbGljazogXCJsdnBcIiwgLy9ub25lLCBsdnAgKGJhc2VkIG9uIHRoZSBsYXN0IHZhbGlkIHBvc2l0aW9uIChkZWZhdWx0KSwgcmFkaXhGb2N1cyAocG9zaXRpb24gY2FyZXQgdG8gcmFkaXhwb2ludCBvbiBpbml0aWFsIGNsaWNrKVxyXG5cdFx0XHRjYXNpbmc6IG51bGwsIC8vbWFzay1sZXZlbCBjYXNpbmcuIE9wdGlvbnM6IG51bGwsIFwidXBwZXJcIiwgXCJsb3dlclwiIG9yIFwidGl0bGVcIlxyXG5cdFx0XHRpbnB1dG1vZGU6IFwidmVyYmF0aW1cIiwgLy9zcGVjaWZ5IHRoZSBpbnB1dG1vZGUgIC0gYWxyZWFkeSBpbiBwbGFjZSBmb3Igd2hlbiBicm93c2VycyB3aWxsIHN1cHBvcnQgaXRcclxuXHRcdFx0Y29sb3JNYXNrOiBmYWxzZSwgLy9lbmFibGUgY3NzIHN0eWxlYWJsZSBtYXNrXHJcblx0XHRcdGFuZHJvaWRIYWNrOiBmYWxzZSAvL3NlZSBSRUFETUVfYW5kcm9pZC5tZFxyXG5cdFx0fSxcclxuXHRcdG1hc2tzQ2FjaGU6IHt9LFxyXG5cdFx0bWFzazogZnVuY3Rpb24gKGVsZW1zKSB7XHJcblx0XHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHRcdGZ1bmN0aW9uIGltcG9ydEF0dHJpYnV0ZU9wdGlvbnMobnB0LCBvcHRzLCB1c2VyT3B0aW9ucywgZGF0YUF0dHJpYnV0ZSkge1xyXG5cdFx0XHRcdHZhciBhdHRyT3B0aW9ucyA9IG5wdC5nZXRBdHRyaWJ1dGUoZGF0YUF0dHJpYnV0ZSksXHJcblx0XHRcdFx0XHRvcHRpb24sIGRhdGFvcHRpb25zLCBvcHRpb25EYXRhLCBwO1xyXG5cclxuXHRcdFx0XHRmdW5jdGlvbiBpbXBvcnRPcHRpb24ob3B0aW9uLCBvcHRpb25EYXRhKSB7XHJcblx0XHRcdFx0XHRvcHRpb25EYXRhID0gb3B0aW9uRGF0YSAhPT0gdW5kZWZpbmVkID8gb3B0aW9uRGF0YSA6IG5wdC5nZXRBdHRyaWJ1dGUoZGF0YUF0dHJpYnV0ZSArIFwiLVwiICsgb3B0aW9uKTtcclxuXHRcdFx0XHRcdGlmIChvcHRpb25EYXRhICE9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0eXBlb2Ygb3B0aW9uRGF0YSA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChvcHRpb24uaW5kZXhPZihcIm9uXCIpID09PSAwKSBvcHRpb25EYXRhID0gd2luZG93W29wdGlvbkRhdGFdOyAvL2dldCBmdW5jdGlvbiBkZWZpbml0aW9uXHJcblx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAob3B0aW9uRGF0YSA9PT0gXCJmYWxzZVwiKSBvcHRpb25EYXRhID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAob3B0aW9uRGF0YSA9PT0gXCJ0cnVlXCIpIG9wdGlvbkRhdGEgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHVzZXJPcHRpb25zW29wdGlvbl0gPSBvcHRpb25EYXRhO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGF0dHJPcHRpb25zICYmIGF0dHJPcHRpb25zICE9PSBcIlwiKSB7XHJcblx0XHRcdFx0XHRhdHRyT3B0aW9ucyA9IGF0dHJPcHRpb25zLnJlcGxhY2UobmV3IFJlZ0V4cChcIidcIiwgXCJnXCIpLCAnXCInKTtcclxuXHRcdFx0XHRcdGRhdGFvcHRpb25zID0gSlNPTi5wYXJzZShcIntcIiArIGF0dHJPcHRpb25zICsgXCJ9XCIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly9yZXNvbHZlIGFsaWFzZXNcclxuXHRcdFx0XHRpZiAoZGF0YW9wdGlvbnMpIHsgLy9waWNrdXAgYWxpYXMgZnJvbSBkYXRhQXR0cmlidXRlXHJcblx0XHRcdFx0XHRvcHRpb25EYXRhID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0Zm9yIChwIGluIGRhdGFvcHRpb25zKSB7XHJcblx0XHRcdFx0XHRcdGlmIChwLnRvTG93ZXJDYXNlKCkgPT09IFwiYWxpYXNcIikge1xyXG5cdFx0XHRcdFx0XHRcdG9wdGlvbkRhdGEgPSBkYXRhb3B0aW9uc1twXTtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbXBvcnRPcHRpb24oXCJhbGlhc1wiLCBvcHRpb25EYXRhKTsgLy9waWNrdXAgYWxpYXMgZnJvbSBkYXRhQXR0cmlidXRlLWFsaWFzXHJcblx0XHRcdFx0aWYgKHVzZXJPcHRpb25zLmFsaWFzKSB7XHJcblx0XHRcdFx0XHRyZXNvbHZlQWxpYXModXNlck9wdGlvbnMuYWxpYXMsIHVzZXJPcHRpb25zLCBvcHRzKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvciAob3B0aW9uIGluIG9wdHMpIHtcclxuXHRcdFx0XHRcdGlmIChkYXRhb3B0aW9ucykge1xyXG5cdFx0XHRcdFx0XHRvcHRpb25EYXRhID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0XHRmb3IgKHAgaW4gZGF0YW9wdGlvbnMpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAocC50b0xvd2VyQ2FzZSgpID09PSBvcHRpb24udG9Mb3dlckNhc2UoKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uRGF0YSA9IGRhdGFvcHRpb25zW3BdO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpbXBvcnRPcHRpb24ob3B0aW9uLCBvcHRpb25EYXRhKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdCQuZXh0ZW5kKHRydWUsIG9wdHMsIHVzZXJPcHRpb25zKTtcclxuXHRcdFx0XHRyZXR1cm4gb3B0cztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBlbGVtcyA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdGVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbXMpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbXMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsZW1zID0gZWxlbXMubm9kZU5hbWUgPyBbZWxlbXNdIDogZWxlbXM7XHJcblx0XHRcdCQuZWFjaChlbGVtcywgZnVuY3Rpb24gKG5keCwgZWwpIHtcclxuXHRcdFx0XHR2YXIgc2NvcGVkT3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGF0Lm9wdHMpO1xyXG5cdFx0XHRcdGltcG9ydEF0dHJpYnV0ZU9wdGlvbnMoZWwsIHNjb3BlZE9wdHMsICQuZXh0ZW5kKHRydWUsIHt9LCB0aGF0LnVzZXJPcHRpb25zKSwgdGhhdC5kYXRhQXR0cmlidXRlKTtcclxuXHRcdFx0XHR2YXIgbWFza3NldCA9IGdlbmVyYXRlTWFza1NldChzY29wZWRPcHRzLCB0aGF0Lm5vTWFza3NDYWNoZSk7XHJcblx0XHRcdFx0aWYgKG1hc2tzZXQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0aWYgKGVsLmlucHV0bWFzayAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdGVsLmlucHV0bWFzay5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vc3RvcmUgaW5wdXRtYXNrIGluc3RhbmNlIG9uIHRoZSBpbnB1dCB3aXRoIGVsZW1lbnQgcmVmZXJlbmNlXHJcblx0XHRcdFx0XHRlbC5pbnB1dG1hc2sgPSBuZXcgSW5wdXRtYXNrKCk7XHJcblx0XHRcdFx0XHRlbC5pbnB1dG1hc2sub3B0cyA9IHNjb3BlZE9wdHM7XHJcblx0XHRcdFx0XHRlbC5pbnB1dG1hc2subm9NYXNrc0NhY2hlID0gdGhhdC5ub01hc2tzQ2FjaGU7XHJcblx0XHRcdFx0XHRlbC5pbnB1dG1hc2sudXNlck9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhhdC51c2VyT3B0aW9ucyk7XHJcblx0XHRcdFx0XHRlbC5pbnB1dG1hc2suZWwgPSBlbDtcclxuXHRcdFx0XHRcdGVsLmlucHV0bWFzay5tYXNrc2V0ID0gbWFza3NldDtcclxuXHJcblx0XHRcdFx0XHQkLmRhdGEoZWwsIFwiX2lucHV0bWFza19vcHRzXCIsIHNjb3BlZE9wdHMpO1xyXG5cclxuXHRcdFx0XHRcdG1hc2tTY29wZS5jYWxsKGVsLmlucHV0bWFzaywge1xyXG5cdFx0XHRcdFx0XHRcImFjdGlvblwiOiBcIm1hc2tcIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIGVsZW1zICYmIGVsZW1zWzBdID8gKGVsZW1zWzBdLmlucHV0bWFzayB8fCB0aGlzKSA6IHRoaXM7XHJcblx0XHR9LFxyXG5cdFx0b3B0aW9uOiBmdW5jdGlvbiAob3B0aW9ucywgbm9yZW1hc2spIHsgLy9zZXQgZXh0cmEgb3B0aW9ucyB8fCByZXRyaWV2ZSB2YWx1ZSBvZiBhIGN1cnJlbnQgb3B0aW9uXHJcblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLm9wdHNbb3B0aW9uc107XHJcblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0XHQkLmV4dGVuZCh0aGlzLnVzZXJPcHRpb25zLCBvcHRpb25zKTsgLy91c2VyIHBhc3NlZCBvcHRpb25zXHJcblx0XHRcdFx0Ly9yZW1hc2tcclxuXHRcdFx0XHRpZiAodGhpcy5lbCAmJiBub3JlbWFzayAhPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5tYXNrKHRoaXMuZWwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHVubWFza2VkdmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHR0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgZ2VuZXJhdGVNYXNrU2V0KHRoaXMub3B0cywgdGhpcy5ub01hc2tzQ2FjaGUpO1xyXG5cdFx0XHRyZXR1cm4gbWFza1Njb3BlLmNhbGwodGhpcywge1xyXG5cdFx0XHRcdFwiYWN0aW9uXCI6IFwidW5tYXNrZWR2YWx1ZVwiLFxyXG5cdFx0XHRcdFwidmFsdWVcIjogdmFsdWVcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0cmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBtYXNrU2NvcGUuY2FsbCh0aGlzLCB7XHJcblx0XHRcdFx0XCJhY3Rpb25cIjogXCJyZW1vdmVcIlxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRnZXRlbXB0eW1hc2s6IGZ1bmN0aW9uICgpIHsgLy9yZXR1cm4gdGhlIGRlZmF1bHQgKGVtcHR5KSBtYXNrIHZhbHVlLCB1c2VmdWxsIGZvciBzZXR0aW5nIHRoZSBkZWZhdWx0IHZhbHVlIGluIHZhbGlkYXRpb25cclxuXHRcdFx0dGhpcy5tYXNrc2V0ID0gdGhpcy5tYXNrc2V0IHx8IGdlbmVyYXRlTWFza1NldCh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKTtcclxuXHRcdFx0cmV0dXJuIG1hc2tTY29wZS5jYWxsKHRoaXMsIHtcclxuXHRcdFx0XHRcImFjdGlvblwiOiBcImdldGVtcHR5bWFza1wiXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGhhc01hc2tlZFZhbHVlOiBmdW5jdGlvbiAoKSB7IC8vY2hlY2sgd2hldGVyIHRoZSByZXR1cm5lZCB2YWx1ZSBpcyBtYXNrZWQgb3Igbm90OyBjdXJyZW50bHkgb25seSB3b3JrcyByZWxpYWJsZSB3aGVuIHVzaW5nIGpxdWVyeS52YWwgZm4gdG8gcmV0cmlldmUgdGhlIHZhbHVlXHJcblx0XHRcdHJldHVybiAhdGhpcy5vcHRzLmF1dG9Vbm1hc2s7XHJcblx0XHR9LFxyXG5cdFx0aXNDb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgZ2VuZXJhdGVNYXNrU2V0KHRoaXMub3B0cywgdGhpcy5ub01hc2tzQ2FjaGUpO1xyXG5cdFx0XHRyZXR1cm4gbWFza1Njb3BlLmNhbGwodGhpcywge1xyXG5cdFx0XHRcdFwiYWN0aW9uXCI6IFwiaXNDb21wbGV0ZVwiXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGdldG1ldGFkYXRhOiBmdW5jdGlvbiAoKSB7IC8vcmV0dXJuIG1hc2sgbWV0YWRhdGEgaWYgZXhpc3RzXHJcblx0XHRcdHRoaXMubWFza3NldCA9IHRoaXMubWFza3NldCB8fCBnZW5lcmF0ZU1hc2tTZXQodGhpcy5vcHRzLCB0aGlzLm5vTWFza3NDYWNoZSk7XHJcblx0XHRcdHJldHVybiBtYXNrU2NvcGUuY2FsbCh0aGlzLCB7XHJcblx0XHRcdFx0XCJhY3Rpb25cIjogXCJnZXRtZXRhZGF0YVwiXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGlzVmFsaWQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHR0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgZ2VuZXJhdGVNYXNrU2V0KHRoaXMub3B0cywgdGhpcy5ub01hc2tzQ2FjaGUpO1xyXG5cdFx0XHRyZXR1cm4gbWFza1Njb3BlLmNhbGwodGhpcywge1xyXG5cdFx0XHRcdFwiYWN0aW9uXCI6IFwiaXNWYWxpZFwiLFxyXG5cdFx0XHRcdFwidmFsdWVcIjogdmFsdWVcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0Zm9ybWF0OiBmdW5jdGlvbiAodmFsdWUsIG1ldGFkYXRhKSB7XHJcblx0XHRcdHRoaXMubWFza3NldCA9IHRoaXMubWFza3NldCB8fCBnZW5lcmF0ZU1hc2tTZXQodGhpcy5vcHRzLCB0aGlzLm5vTWFza3NDYWNoZSk7XHJcblx0XHRcdHJldHVybiBtYXNrU2NvcGUuY2FsbCh0aGlzLCB7XHJcblx0XHRcdFx0XCJhY3Rpb25cIjogXCJmb3JtYXRcIixcclxuXHRcdFx0XHRcInZhbHVlXCI6IHZhbHVlLFxyXG5cdFx0XHRcdFwibWV0YWRhdGFcIjogbWV0YWRhdGEgLy90cnVlL2ZhbHNlIGdldG1ldGFkYXRhXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGFuYWx5c2VNYXNrOiBmdW5jdGlvbiAobWFzaywgb3B0cykge1xyXG5cdFx0XHR2YXIgdG9rZW5pemVyID0gLyg/Ols/KitdfFxce1swLTlcXCtcXCpdKyg/OixbMC05XFwrXFwqXSopP1xcfSl8W14uPyorXiR7W10oKXxcXFxcXSt8Li9nLFxyXG5cdFx0XHRcdGVzY2FwZWQgPSBmYWxzZSxcclxuXHRcdFx0XHRjdXJyZW50VG9rZW4gPSBuZXcgTWFza1Rva2VuKCksXHJcblx0XHRcdFx0bWF0Y2gsXHJcblx0XHRcdFx0bSxcclxuXHRcdFx0XHRvcGVuZW5pbmdzID0gW10sXHJcblx0XHRcdFx0bWFza1Rva2VucyA9IFtdLFxyXG5cdFx0XHRcdG9wZW5pbmdUb2tlbixcclxuXHRcdFx0XHRjdXJyZW50T3BlbmluZ1Rva2VuLFxyXG5cdFx0XHRcdGFsdGVybmF0b3IsXHJcblx0XHRcdFx0bGFzdE1hdGNoLFxyXG5cdFx0XHRcdGdyb3VwVG9rZW47XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBNYXNrVG9rZW4oaXNHcm91cCwgaXNPcHRpb25hbCwgaXNRdWFudGlmaWVyLCBpc0FsdGVybmF0b3IpIHtcclxuXHRcdFx0XHR0aGlzLm1hdGNoZXMgPSBbXTtcclxuXHRcdFx0XHR0aGlzLm9wZW5Hcm91cCA9IGlzR3JvdXAgfHwgZmFsc2U7XHJcblx0XHRcdFx0dGhpcy5pc0dyb3VwID0gaXNHcm91cCB8fCBmYWxzZTtcclxuXHRcdFx0XHR0aGlzLmlzT3B0aW9uYWwgPSBpc09wdGlvbmFsIHx8IGZhbHNlO1xyXG5cdFx0XHRcdHRoaXMuaXNRdWFudGlmaWVyID0gaXNRdWFudGlmaWVyIHx8IGZhbHNlO1xyXG5cdFx0XHRcdHRoaXMuaXNBbHRlcm5hdG9yID0gaXNBbHRlcm5hdG9yIHx8IGZhbHNlO1xyXG5cdFx0XHRcdHRoaXMucXVhbnRpZmllciA9IHtcclxuXHRcdFx0XHRcdG1pbjogMSxcclxuXHRcdFx0XHRcdG1heDogMVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vdGVzdCBkZWZpbml0aW9uID0+IHtmbjogUmVnRXhwL2Z1bmN0aW9uLCBjYXJkaW5hbGl0eTogaW50LCBvcHRpb25hbGl0eTogYm9vbCwgbmV3QmxvY2tNYXJrZXI6IGJvb2wsIGNhc2luZzogbnVsbC91cHBlci9sb3dlciwgZGVmOiBkZWZpbml0aW9uU3ltYm9sLCBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXIsIG1hc2s6IHJlYWwgbWFza0RlZmluaXRpb259XHJcblx0XHRcdGZ1bmN0aW9uIGluc2VydFRlc3REZWZpbml0aW9uKG10b2tlbiwgZWxlbWVudCwgcG9zaXRpb24pIHtcclxuXHRcdFx0XHR2YXIgbWFza2RlZiA9IG9wdHMuZGVmaW5pdGlvbnNbZWxlbWVudF07XHJcblx0XHRcdFx0cG9zaXRpb24gPSBwb3NpdGlvbiAhPT0gdW5kZWZpbmVkID8gcG9zaXRpb24gOiBtdG9rZW4ubWF0Y2hlcy5sZW5ndGg7XHJcblx0XHRcdFx0dmFyIHByZXZNYXRjaCA9IG10b2tlbi5tYXRjaGVzW3Bvc2l0aW9uIC0gMV07XHJcblx0XHRcdFx0aWYgKG1hc2tkZWYgJiYgIWVzY2FwZWQpIHtcclxuXHRcdFx0XHRcdG1hc2tkZWYucGxhY2Vob2xkZXIgPSAkLmlzRnVuY3Rpb24obWFza2RlZi5wbGFjZWhvbGRlcikgPyBtYXNrZGVmLnBsYWNlaG9sZGVyKG9wdHMpIDogbWFza2RlZi5wbGFjZWhvbGRlcjtcclxuXHRcdFx0XHRcdHZhciBwcmV2YWxpZGF0b3JzID0gbWFza2RlZi5wcmV2YWxpZGF0b3IsXHJcblx0XHRcdFx0XHRcdHByZXZhbGlkYXRvcnNMID0gcHJldmFsaWRhdG9ycyA/IHByZXZhbGlkYXRvcnMubGVuZ3RoIDogMDtcclxuXHRcdFx0XHRcdC8vaGFuZGxlIHByZXZhbGlkYXRvcnNcclxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDwgbWFza2RlZi5jYXJkaW5hbGl0eTsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdHZhciBwcmV2YWxpZGF0b3IgPSBwcmV2YWxpZGF0b3JzTCA+PSBpID8gcHJldmFsaWRhdG9yc1tpIC0gMV0gOiBbXSxcclxuXHRcdFx0XHRcdFx0XHR2YWxpZGF0b3IgPSBwcmV2YWxpZGF0b3IudmFsaWRhdG9yLFxyXG5cdFx0XHRcdFx0XHRcdGNhcmRpbmFsaXR5ID0gcHJldmFsaWRhdG9yLmNhcmRpbmFsaXR5O1xyXG5cdFx0XHRcdFx0XHRtdG9rZW4ubWF0Y2hlcy5zcGxpY2UocG9zaXRpb24rKywgMCwge1xyXG5cdFx0XHRcdFx0XHRcdGZuOiB2YWxpZGF0b3IgPyB0eXBlb2YgdmFsaWRhdG9yID09PSBcInN0cmluZ1wiID8gbmV3IFJlZ0V4cCh2YWxpZGF0b3IpIDogbmV3IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMudGVzdCA9IHZhbGlkYXRvcjtcclxuXHRcdFx0XHRcdFx0XHR9IDogbmV3IFJlZ0V4cChcIi5cIiksXHJcblx0XHRcdFx0XHRcdFx0Y2FyZGluYWxpdHk6IGNhcmRpbmFsaXR5ID8gY2FyZGluYWxpdHkgOiAxLFxyXG5cdFx0XHRcdFx0XHRcdG9wdGlvbmFsaXR5OiBtdG9rZW4uaXNPcHRpb25hbCxcclxuXHRcdFx0XHRcdFx0XHRuZXdCbG9ja01hcmtlcjogcHJldk1hdGNoID09PSB1bmRlZmluZWQgfHwgcHJldk1hdGNoLmRlZiAhPT0gKG1hc2tkZWYuZGVmaW5pdGlvblN5bWJvbCB8fCBlbGVtZW50KSxcclxuXHRcdFx0XHRcdFx0XHRjYXNpbmc6IG1hc2tkZWYuY2FzaW5nLFxyXG5cdFx0XHRcdFx0XHRcdGRlZjogbWFza2RlZi5kZWZpbml0aW9uU3ltYm9sIHx8IGVsZW1lbnQsXHJcblx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI6IG1hc2tkZWYucGxhY2Vob2xkZXIsXHJcblx0XHRcdFx0XHRcdFx0bmF0aXZlRGVmOiBlbGVtZW50XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRwcmV2TWF0Y2ggPSBtdG9rZW4ubWF0Y2hlc1twb3NpdGlvbiAtIDFdO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bXRva2VuLm1hdGNoZXMuc3BsaWNlKHBvc2l0aW9uKyssIDAsIHtcclxuXHRcdFx0XHRcdFx0Zm46IG1hc2tkZWYudmFsaWRhdG9yID8gdHlwZW9mIG1hc2tkZWYudmFsaWRhdG9yID09IFwic3RyaW5nXCIgPyBuZXcgUmVnRXhwKG1hc2tkZWYudmFsaWRhdG9yKSA6IG5ldyBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy50ZXN0ID0gbWFza2RlZi52YWxpZGF0b3I7XHJcblx0XHRcdFx0XHRcdH0gOiBuZXcgUmVnRXhwKFwiLlwiKSxcclxuXHRcdFx0XHRcdFx0Y2FyZGluYWxpdHk6IG1hc2tkZWYuY2FyZGluYWxpdHksXHJcblx0XHRcdFx0XHRcdG9wdGlvbmFsaXR5OiBtdG9rZW4uaXNPcHRpb25hbCxcclxuXHRcdFx0XHRcdFx0bmV3QmxvY2tNYXJrZXI6IHByZXZNYXRjaCA9PT0gdW5kZWZpbmVkIHx8IHByZXZNYXRjaC5kZWYgIT09IChtYXNrZGVmLmRlZmluaXRpb25TeW1ib2wgfHwgZWxlbWVudCksXHJcblx0XHRcdFx0XHRcdGNhc2luZzogbWFza2RlZi5jYXNpbmcsXHJcblx0XHRcdFx0XHRcdGRlZjogbWFza2RlZi5kZWZpbml0aW9uU3ltYm9sIHx8IGVsZW1lbnQsXHJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyOiBtYXNrZGVmLnBsYWNlaG9sZGVyLFxyXG5cdFx0XHRcdFx0XHRuYXRpdmVEZWY6IGVsZW1lbnRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtdG9rZW4ubWF0Y2hlcy5zcGxpY2UocG9zaXRpb24rKywgMCwge1xyXG5cdFx0XHRcdFx0XHRmbjogbnVsbCxcclxuXHRcdFx0XHRcdFx0Y2FyZGluYWxpdHk6IDAsXHJcblx0XHRcdFx0XHRcdG9wdGlvbmFsaXR5OiBtdG9rZW4uaXNPcHRpb25hbCxcclxuXHRcdFx0XHRcdFx0bmV3QmxvY2tNYXJrZXI6IHByZXZNYXRjaCA9PT0gdW5kZWZpbmVkIHx8IHByZXZNYXRjaC5kZWYgIT09IGVsZW1lbnQsXHJcblx0XHRcdFx0XHRcdGNhc2luZzogbnVsbCxcclxuXHRcdFx0XHRcdFx0ZGVmOiBvcHRzLnN0YXRpY0RlZmluaXRpb25TeW1ib2wgfHwgZWxlbWVudCxcclxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI6IG9wdHMuc3RhdGljRGVmaW5pdGlvblN5bWJvbCAhPT0gdW5kZWZpbmVkID8gZWxlbWVudCA6IHVuZGVmaW5lZCxcclxuXHRcdFx0XHRcdFx0bmF0aXZlRGVmOiBlbGVtZW50XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGVzY2FwZWQgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIHZlcmlmeUdyb3VwTWFya2VyKG1hc2tUb2tlbikge1xyXG5cdFx0XHRcdGlmIChtYXNrVG9rZW4gJiYgbWFza1Rva2VuLm1hdGNoZXMpIHtcclxuXHRcdFx0XHRcdCQuZWFjaChtYXNrVG9rZW4ubWF0Y2hlcywgZnVuY3Rpb24gKG5keCwgdG9rZW4pIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgbmV4dFRva2VuID0gbWFza1Rva2VuLm1hdGNoZXNbbmR4ICsgMV07XHJcblx0XHRcdFx0XHRcdFx0aWYgKChuZXh0VG9rZW4gPT09IHVuZGVmaW5lZCB8fCAobmV4dFRva2VuLm1hdGNoZXMgPT09IHVuZGVmaW5lZCB8fCBuZXh0VG9rZW4uaXNRdWFudGlmaWVyID09PSBmYWxzZSkpICYmIHRva2VuICYmIHRva2VuLmlzR3JvdXApIHsgLy90aGlzIGlzIG5vdCBhIGdyb3VwIGJ1dCBhIG5vcm1hbCBtYXNrID0+IGNvbnZlcnRcclxuXHRcdFx0XHRcdFx0XHRcdHRva2VuLmlzR3JvdXAgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdGluc2VydFRlc3REZWZpbml0aW9uKHRva2VuLCBvcHRzLmdyb3VwbWFya2VyLnN0YXJ0LCAwKTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICh0b2tlbi5vcGVuR3JvdXAgIT09IHRydWUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aW5zZXJ0VGVzdERlZmluaXRpb24odG9rZW4sIG9wdHMuZ3JvdXBtYXJrZXIuZW5kKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0dmVyaWZ5R3JvdXBNYXJrZXIodG9rZW4pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gZGVmYXVsdENhc2UoKSB7XHJcblx0XHRcdFx0aWYgKG9wZW5lbmluZ3MubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0Y3VycmVudE9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3Nbb3BlbmVuaW5ncy5sZW5ndGggLSAxXTtcclxuXHRcdFx0XHRcdGluc2VydFRlc3REZWZpbml0aW9uKGN1cnJlbnRPcGVuaW5nVG9rZW4sIG0pO1xyXG5cdFx0XHRcdFx0aWYgKGN1cnJlbnRPcGVuaW5nVG9rZW4uaXNBbHRlcm5hdG9yKSB7IC8vaGFuZGxlIGFsdGVybmF0b3IgYSB8IGIgY2FzZVxyXG5cdFx0XHRcdFx0XHRhbHRlcm5hdG9yID0gb3BlbmVuaW5ncy5wb3AoKTtcclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgbW5keCA9IDA7IG1uZHggPCBhbHRlcm5hdG9yLm1hdGNoZXMubGVuZ3RoOyBtbmR4KyspIHtcclxuXHRcdFx0XHRcdFx0XHRhbHRlcm5hdG9yLm1hdGNoZXNbbW5keF0uaXNHcm91cCA9IGZhbHNlOyAvL2Rvbid0IG1hcmsgYWx0ZXJuYXRlIGdyb3VwcyBhcyBncm91cFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChvcGVuZW5pbmdzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50T3BlbmluZ1Rva2VuID0gb3BlbmVuaW5nc1tvcGVuZW5pbmdzLmxlbmd0aCAtIDFdO1xyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRPcGVuaW5nVG9rZW4ubWF0Y2hlcy5wdXNoKGFsdGVybmF0b3IpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRUb2tlbi5tYXRjaGVzLnB1c2goYWx0ZXJuYXRvcik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aW5zZXJ0VGVzdERlZmluaXRpb24oY3VycmVudFRva2VuLCBtKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIHJldmVyc2VUb2tlbnMobWFza1Rva2VuKSB7XHJcblx0XHRcdFx0ZnVuY3Rpb24gcmV2ZXJzZVN0YXRpYyhzdCkge1xyXG5cdFx0XHRcdFx0aWYgKHN0ID09PSBvcHRzLm9wdGlvbmFsbWFya2VyLnN0YXJ0KSBzdCA9IG9wdHMub3B0aW9uYWxtYXJrZXIuZW5kO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoc3QgPT09IG9wdHMub3B0aW9uYWxtYXJrZXIuZW5kKSBzdCA9IG9wdHMub3B0aW9uYWxtYXJrZXIuc3RhcnQ7XHJcblx0XHRcdFx0XHRlbHNlIGlmIChzdCA9PT0gb3B0cy5ncm91cG1hcmtlci5zdGFydCkgc3QgPSBvcHRzLmdyb3VwbWFya2VyLmVuZDtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKHN0ID09PSBvcHRzLmdyb3VwbWFya2VyLmVuZCkgc3QgPSBvcHRzLmdyb3VwbWFya2VyLnN0YXJ0O1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBzdDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdG1hc2tUb2tlbi5tYXRjaGVzID0gbWFza1Rva2VuLm1hdGNoZXMucmV2ZXJzZSgpO1xyXG5cdFx0XHRcdGZvciAodmFyIG1hdGNoIGluIG1hc2tUb2tlbi5tYXRjaGVzKSB7XHJcblx0XHRcdFx0XHR2YXIgaW50TWF0Y2ggPSBwYXJzZUludChtYXRjaCk7XHJcblx0XHRcdFx0XHRpZiAobWFza1Rva2VuLm1hdGNoZXNbbWF0Y2hdLmlzUXVhbnRpZmllciAmJiBtYXNrVG9rZW4ubWF0Y2hlc1tpbnRNYXRjaCArIDFdICYmIG1hc2tUb2tlbi5tYXRjaGVzW2ludE1hdGNoICsgMV0uaXNHcm91cCkgeyAvL3JlcG9zaXRpb24gcXVhbnRpZmllclxyXG5cdFx0XHRcdFx0XHR2YXIgcXQgPSBtYXNrVG9rZW4ubWF0Y2hlc1ttYXRjaF07XHJcblx0XHRcdFx0XHRcdG1hc2tUb2tlbi5tYXRjaGVzLnNwbGljZShtYXRjaCwgMSk7XHJcblx0XHRcdFx0XHRcdG1hc2tUb2tlbi5tYXRjaGVzLnNwbGljZShpbnRNYXRjaCArIDEsIDAsIHF0KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChtYXNrVG9rZW4ubWF0Y2hlc1ttYXRjaF0ubWF0Y2hlcyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdG1hc2tUb2tlbi5tYXRjaGVzW21hdGNoXSA9IHJldmVyc2VUb2tlbnMobWFza1Rva2VuLm1hdGNoZXNbbWF0Y2hdKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdG1hc2tUb2tlbi5tYXRjaGVzW21hdGNoXSA9IHJldmVyc2VTdGF0aWMobWFza1Rva2VuLm1hdGNoZXNbbWF0Y2hdKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBtYXNrVG9rZW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdoaWxlIChtYXRjaCA9IHRva2VuaXplci5leGVjKG1hc2spKSB7XHJcblx0XHRcdFx0bSA9IG1hdGNoWzBdO1xyXG5cclxuXHRcdFx0XHRpZiAoZXNjYXBlZCkge1xyXG5cdFx0XHRcdFx0ZGVmYXVsdENhc2UoKTtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzd2l0Y2ggKG0uY2hhckF0KDApKSB7XHJcblx0XHRcdFx0XHRjYXNlIG9wdHMuZXNjYXBlQ2hhcjpcclxuXHRcdFx0XHRcdFx0ZXNjYXBlZCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSBvcHRzLm9wdGlvbmFsbWFya2VyLmVuZDpcclxuXHRcdFx0XHRcdC8vIG9wdGlvbmFsIGNsb3NpbmdcclxuXHRcdFx0XHRcdGNhc2Ugb3B0cy5ncm91cG1hcmtlci5lbmQ6XHJcblx0XHRcdFx0XHRcdC8vIEdyb3VwIGNsb3NpbmdcclxuXHRcdFx0XHRcdFx0b3BlbmluZ1Rva2VuID0gb3BlbmVuaW5ncy5wb3AoKTtcclxuXHRcdFx0XHRcdFx0b3BlbmluZ1Rva2VuLm9wZW5Hcm91cCA9IGZhbHNlOyAvL21hcmsgZ3JvdXAgYXMgY29tcGxldGVcclxuXHRcdFx0XHRcdFx0aWYgKG9wZW5pbmdUb2tlbiAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKG9wZW5lbmluZ3MubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y3VycmVudE9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3Nbb3BlbmVuaW5ncy5sZW5ndGggLSAxXTtcclxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRPcGVuaW5nVG9rZW4ubWF0Y2hlcy5wdXNoKG9wZW5pbmdUb2tlbik7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoY3VycmVudE9wZW5pbmdUb2tlbi5pc0FsdGVybmF0b3IpIHsgLy9oYW5kbGUgYWx0ZXJuYXRvciAoYSkgfCAoYikgY2FzZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRhbHRlcm5hdG9yID0gb3BlbmVuaW5ncy5wb3AoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgbW5keCA9IDA7IG1uZHggPCBhbHRlcm5hdG9yLm1hdGNoZXMubGVuZ3RoOyBtbmR4KyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhbHRlcm5hdG9yLm1hdGNoZXNbbW5keF0uaXNHcm91cCA9IGZhbHNlOyAvL2Rvbid0IG1hcmsgYWx0ZXJuYXRlIGdyb3VwcyBhcyBncm91cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcGVuZW5pbmdzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjdXJyZW50T3BlbmluZ1Rva2VuID0gb3BlbmVuaW5nc1tvcGVuZW5pbmdzLmxlbmd0aCAtIDFdO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRPcGVuaW5nVG9rZW4ubWF0Y2hlcy5wdXNoKGFsdGVybmF0b3IpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRUb2tlbi5tYXRjaGVzLnB1c2goYWx0ZXJuYXRvcik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y3VycmVudFRva2VuLm1hdGNoZXMucHVzaChvcGVuaW5nVG9rZW4pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSBlbHNlIGRlZmF1bHRDYXNlKCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSBvcHRzLm9wdGlvbmFsbWFya2VyLnN0YXJ0OlxyXG5cdFx0XHRcdFx0XHQvLyBvcHRpb25hbCBvcGVuaW5nXHJcblx0XHRcdFx0XHRcdG9wZW5lbmluZ3MucHVzaChuZXcgTWFza1Rva2VuKGZhbHNlLCB0cnVlKSk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSBvcHRzLmdyb3VwbWFya2VyLnN0YXJ0OlxyXG5cdFx0XHRcdFx0XHQvLyBHcm91cCBvcGVuaW5nXHJcblx0XHRcdFx0XHRcdG9wZW5lbmluZ3MucHVzaChuZXcgTWFza1Rva2VuKHRydWUpKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlIG9wdHMucXVhbnRpZmllcm1hcmtlci5zdGFydDpcclxuXHRcdFx0XHRcdFx0Ly9RdWFudGlmaWVyXHJcblx0XHRcdFx0XHRcdHZhciBxdWFudGlmaWVyID0gbmV3IE1hc2tUb2tlbihmYWxzZSwgZmFsc2UsIHRydWUpO1xyXG5cclxuXHRcdFx0XHRcdFx0bSA9IG0ucmVwbGFjZSgvW3t9XS9nLCBcIlwiKTtcclxuXHRcdFx0XHRcdFx0dmFyIG1xID0gbS5zcGxpdChcIixcIiksXHJcblx0XHRcdFx0XHRcdFx0bXEwID0gaXNOYU4obXFbMF0pID8gbXFbMF0gOiBwYXJzZUludChtcVswXSksXHJcblx0XHRcdFx0XHRcdFx0bXExID0gbXEubGVuZ3RoID09PSAxID8gbXEwIDogKGlzTmFOKG1xWzFdKSA/IG1xWzFdIDogcGFyc2VJbnQobXFbMV0pKTtcclxuXHRcdFx0XHRcdFx0aWYgKG1xMSA9PT0gXCIqXCIgfHwgbXExID09PSBcIitcIikge1xyXG5cdFx0XHRcdFx0XHRcdG1xMCA9IG1xMSA9PT0gXCIqXCIgPyAwIDogMTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRxdWFudGlmaWVyLnF1YW50aWZpZXIgPSB7XHJcblx0XHRcdFx0XHRcdFx0bWluOiBtcTAsXHJcblx0XHRcdFx0XHRcdFx0bWF4OiBtcTFcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0aWYgKG9wZW5lbmluZ3MubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBtYXRjaGVzID0gb3BlbmVuaW5nc1tvcGVuZW5pbmdzLmxlbmd0aCAtIDFdLm1hdGNoZXM7XHJcblx0XHRcdFx0XHRcdFx0bWF0Y2ggPSBtYXRjaGVzLnBvcCgpO1xyXG5cdFx0XHRcdFx0XHRcdGlmICghbWF0Y2guaXNHcm91cCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Z3JvdXBUb2tlbiA9IG5ldyBNYXNrVG9rZW4odHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRncm91cFRva2VuLm1hdGNoZXMucHVzaChtYXRjaCk7XHJcblx0XHRcdFx0XHRcdFx0XHRtYXRjaCA9IGdyb3VwVG9rZW47XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdG1hdGNoZXMucHVzaChtYXRjaCk7XHJcblx0XHRcdFx0XHRcdFx0bWF0Y2hlcy5wdXNoKHF1YW50aWZpZXIpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdG1hdGNoID0gY3VycmVudFRva2VuLm1hdGNoZXMucG9wKCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCFtYXRjaC5pc0dyb3VwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRncm91cFRva2VuID0gbmV3IE1hc2tUb2tlbih0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHRcdGdyb3VwVG9rZW4ubWF0Y2hlcy5wdXNoKG1hdGNoKTtcclxuXHRcdFx0XHRcdFx0XHRcdG1hdGNoID0gZ3JvdXBUb2tlbjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudFRva2VuLm1hdGNoZXMucHVzaChtYXRjaCk7XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudFRva2VuLm1hdGNoZXMucHVzaChxdWFudGlmaWVyKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2VcclxuXHRcdFx0XHRcdG9wdHMuYWx0ZXJuYXRvcm1hcmtlcjpcclxuXHRcdFx0XHRcdFx0aWYgKG9wZW5lbmluZ3MubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRPcGVuaW5nVG9rZW4gPSBvcGVuZW5pbmdzW29wZW5lbmluZ3MubGVuZ3RoIC0gMV07XHJcblx0XHRcdFx0XHRcdFx0bGFzdE1hdGNoID0gY3VycmVudE9wZW5pbmdUb2tlbi5tYXRjaGVzLnBvcCgpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGxhc3RNYXRjaCA9IGN1cnJlbnRUb2tlbi5tYXRjaGVzLnBvcCgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChsYXN0TWF0Y2guaXNBbHRlcm5hdG9yKSB7XHJcblx0XHRcdFx0XHRcdFx0b3BlbmVuaW5ncy5wdXNoKGxhc3RNYXRjaCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0YWx0ZXJuYXRvciA9IG5ldyBNYXNrVG9rZW4oZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0YWx0ZXJuYXRvci5tYXRjaGVzLnB1c2gobGFzdE1hdGNoKTtcclxuXHRcdFx0XHRcdFx0XHRvcGVuZW5pbmdzLnB1c2goYWx0ZXJuYXRvcik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0Q2FzZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2hpbGUgKG9wZW5lbmluZ3MubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdG9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3MucG9wKCk7XHJcblx0XHRcdFx0Y3VycmVudFRva2VuLm1hdGNoZXMucHVzaChvcGVuaW5nVG9rZW4pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChjdXJyZW50VG9rZW4ubWF0Y2hlcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dmVyaWZ5R3JvdXBNYXJrZXIoY3VycmVudFRva2VuKTtcclxuXHRcdFx0XHRtYXNrVG9rZW5zLnB1c2goY3VycmVudFRva2VuKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG9wdHMubnVtZXJpY0lucHV0KSB7XHJcblx0XHRcdFx0cmV2ZXJzZVRva2VucyhtYXNrVG9rZW5zWzBdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtYXNrVG9rZW5zKSk7XHJcblx0XHRcdHJldHVybiBtYXNrVG9rZW5zO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8vYXBwbHkgZGVmYXVsdHMsIGRlZmluaXRpb25zLCBhbGlhc2VzXHJcblx0SW5wdXRtYXNrLmV4dGVuZERlZmF1bHRzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRcdCQuZXh0ZW5kKHRydWUsIElucHV0bWFzay5wcm90b3R5cGUuZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cdH07XHJcblx0SW5wdXRtYXNrLmV4dGVuZERlZmluaXRpb25zID0gZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcclxuXHRcdCQuZXh0ZW5kKHRydWUsIElucHV0bWFzay5wcm90b3R5cGUuZGVmYXVsdHMuZGVmaW5pdGlvbnMsIGRlZmluaXRpb24pO1xyXG5cdH07XHJcblx0SW5wdXRtYXNrLmV4dGVuZEFsaWFzZXMgPSBmdW5jdGlvbiAoYWxpYXMpIHtcclxuXHRcdCQuZXh0ZW5kKHRydWUsIElucHV0bWFzay5wcm90b3R5cGUuZGVmYXVsdHMuYWxpYXNlcywgYWxpYXMpO1xyXG5cdH07XHJcblx0Ly9zdGF0aWMgZm4gb24gaW5wdXRtYXNrXHJcblx0SW5wdXRtYXNrLmZvcm1hdCA9IGZ1bmN0aW9uICh2YWx1ZSwgb3B0aW9ucywgbWV0YWRhdGEpIHtcclxuXHRcdHJldHVybiBJbnB1dG1hc2sob3B0aW9ucykuZm9ybWF0KHZhbHVlLCBtZXRhZGF0YSk7XHJcblx0fTtcclxuXHRJbnB1dG1hc2sudW5tYXNrID0gZnVuY3Rpb24gKHZhbHVlLCBvcHRpb25zKSB7XHJcblx0XHRyZXR1cm4gSW5wdXRtYXNrKG9wdGlvbnMpLnVubWFza2VkdmFsdWUodmFsdWUpO1xyXG5cdH07XHJcblx0SW5wdXRtYXNrLmlzVmFsaWQgPSBmdW5jdGlvbiAodmFsdWUsIG9wdGlvbnMpIHtcclxuXHRcdHJldHVybiBJbnB1dG1hc2sob3B0aW9ucykuaXNWYWxpZCh2YWx1ZSk7XHJcblx0fTtcclxuXHRJbnB1dG1hc2sucmVtb3ZlID0gZnVuY3Rpb24gKGVsZW1zKSB7XHJcblx0XHQkLmVhY2goZWxlbXMsIGZ1bmN0aW9uIChuZHgsIGVsKSB7XHJcblx0XHRcdGlmIChlbC5pbnB1dG1hc2spIGVsLmlucHV0bWFzay5yZW1vdmUoKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblx0SW5wdXRtYXNrLmVzY2FwZVJlZ2V4ID0gZnVuY3Rpb24gKHN0cikge1xyXG5cdFx0dmFyIHNwZWNpYWxzID0gW1wiL1wiLCBcIi5cIiwgXCIqXCIsIFwiK1wiLCBcIj9cIiwgXCJ8XCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiwgXCJ9XCIsIFwiXFxcXFwiLCBcIiRcIiwgXCJeXCJdO1xyXG5cdFx0cmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXFxcXFwiICsgc3BlY2lhbHMuam9pbihcInxcXFxcXCIpICsgXCIpXCIsIFwiZ2ltXCIpLCBcIlxcXFwkMVwiKTtcclxuXHR9O1xyXG5cdElucHV0bWFzay5rZXlDb2RlID0ge1xyXG5cdFx0QUxUOiAxOCxcclxuXHRcdEJBQ0tTUEFDRTogOCxcclxuXHRcdEJBQ0tTUEFDRV9TQUZBUkk6IDEyNyxcclxuXHRcdENBUFNfTE9DSzogMjAsXHJcblx0XHRDT01NQTogMTg4LFxyXG5cdFx0Q09NTUFORDogOTEsXHJcblx0XHRDT01NQU5EX0xFRlQ6IDkxLFxyXG5cdFx0Q09NTUFORF9SSUdIVDogOTMsXHJcblx0XHRDT05UUk9MOiAxNyxcclxuXHRcdERFTEVURTogNDYsXHJcblx0XHRET1dOOiA0MCxcclxuXHRcdEVORDogMzUsXHJcblx0XHRFTlRFUjogMTMsXHJcblx0XHRFU0NBUEU6IDI3LFxyXG5cdFx0SE9NRTogMzYsXHJcblx0XHRJTlNFUlQ6IDQ1LFxyXG5cdFx0TEVGVDogMzcsXHJcblx0XHRNRU5VOiA5MyxcclxuXHRcdE5VTVBBRF9BREQ6IDEwNyxcclxuXHRcdE5VTVBBRF9ERUNJTUFMOiAxMTAsXHJcblx0XHROVU1QQURfRElWSURFOiAxMTEsXHJcblx0XHROVU1QQURfRU5URVI6IDEwOCxcclxuXHRcdE5VTVBBRF9NVUxUSVBMWTogMTA2LFxyXG5cdFx0TlVNUEFEX1NVQlRSQUNUOiAxMDksXHJcblx0XHRQQUdFX0RPV046IDM0LFxyXG5cdFx0UEFHRV9VUDogMzMsXHJcblx0XHRQRVJJT0Q6IDE5MCxcclxuXHRcdFJJR0hUOiAzOSxcclxuXHRcdFNISUZUOiAxNixcclxuXHRcdFNQQUNFOiAzMixcclxuXHRcdFRBQjogOSxcclxuXHRcdFVQOiAzOCxcclxuXHRcdFdJTkRPV1M6IDkxLFxyXG5cdFx0WDogODhcclxuXHR9O1xyXG5cclxuXHRmdW5jdGlvbiByZXNvbHZlQWxpYXMoYWxpYXNTdHIsIG9wdGlvbnMsIG9wdHMpIHtcclxuXHRcdHZhciBhbGlhc0RlZmluaXRpb24gPSBvcHRzLmFsaWFzZXNbYWxpYXNTdHJdO1xyXG5cdFx0aWYgKGFsaWFzRGVmaW5pdGlvbikge1xyXG5cdFx0XHRpZiAoYWxpYXNEZWZpbml0aW9uLmFsaWFzKSByZXNvbHZlQWxpYXMoYWxpYXNEZWZpbml0aW9uLmFsaWFzLCB1bmRlZmluZWQsIG9wdHMpOyAvL2FsaWFzIGlzIGFub3RoZXIgYWxpYXNcclxuXHRcdFx0JC5leHRlbmQodHJ1ZSwgb3B0cywgYWxpYXNEZWZpbml0aW9uKTsgLy9tZXJnZSBhbGlhcyBkZWZpbml0aW9uIGluIHRoZSBvcHRpb25zXHJcblx0XHRcdCQuZXh0ZW5kKHRydWUsIG9wdHMsIG9wdGlvbnMpOyAvL3JlYXBwbHkgZXh0cmEgZ2l2ZW4gb3B0aW9uc1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSAvL2FsaWFzIG5vdCBmb3VuZCAtIHRyeSBhcyBtYXNrXHJcblx0XHRpZiAob3B0cy5tYXNrID09PSBudWxsKSB7XHJcblx0XHRcdG9wdHMubWFzayA9IGFsaWFzU3RyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdlbmVyYXRlTWFza1NldChvcHRzLCBub2NhY2hlKSB7XHJcblx0XHRmdW5jdGlvbiBnZW5lcmF0ZU1hc2sobWFzaywgbWV0YWRhdGEsIG9wdHMpIHtcclxuXHRcdFx0aWYgKG1hc2sgPT09IG51bGwgfHwgbWFzayA9PT0gXCJcIikge1xyXG5cdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKG1hc2subGVuZ3RoID09PSAxICYmIG9wdHMuZ3JlZWR5ID09PSBmYWxzZSAmJiBvcHRzLnJlcGVhdCAhPT0gMCkge1xyXG5cdFx0XHRcdFx0b3B0cy5wbGFjZWhvbGRlciA9IFwiXCI7XHJcblx0XHRcdFx0fSAvL2hpZGUgcGxhY2Vob2xkZXIgd2l0aCBzaW5nbGUgbm9uLWdyZWVkeSBtYXNrXHJcblx0XHRcdFx0aWYgKG9wdHMucmVwZWF0ID4gMCB8fCBvcHRzLnJlcGVhdCA9PT0gXCIqXCIgfHwgb3B0cy5yZXBlYXQgPT09IFwiK1wiKSB7XHJcblx0XHRcdFx0XHR2YXIgcmVwZWF0U3RhcnQgPSBvcHRzLnJlcGVhdCA9PT0gXCIqXCIgPyAwIDogKG9wdHMucmVwZWF0ID09PSBcIitcIiA/IDEgOiBvcHRzLnJlcGVhdCk7XHJcblx0XHRcdFx0XHRtYXNrID0gb3B0cy5ncm91cG1hcmtlci5zdGFydCArIG1hc2sgKyBvcHRzLmdyb3VwbWFya2VyLmVuZCArIG9wdHMucXVhbnRpZmllcm1hcmtlci5zdGFydCArIHJlcGVhdFN0YXJ0ICsgXCIsXCIgKyBvcHRzLnJlcGVhdCArIG9wdHMucXVhbnRpZmllcm1hcmtlci5lbmQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhtYXNrKTtcclxuXHRcdFx0XHR2YXIgbWFza3NldERlZmluaXRpb247XHJcblx0XHRcdFx0aWYgKElucHV0bWFzay5wcm90b3R5cGUubWFza3NDYWNoZVttYXNrXSA9PT0gdW5kZWZpbmVkIHx8IG5vY2FjaGUgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdG1hc2tzZXREZWZpbml0aW9uID0ge1xyXG5cdFx0XHRcdFx0XHRcIm1hc2tcIjogbWFzayxcclxuXHRcdFx0XHRcdFx0XCJtYXNrVG9rZW5cIjogSW5wdXRtYXNrLnByb3RvdHlwZS5hbmFseXNlTWFzayhtYXNrLCBvcHRzKSxcclxuXHRcdFx0XHRcdFx0XCJ2YWxpZFBvc2l0aW9uc1wiOiB7fSxcclxuXHRcdFx0XHRcdFx0XCJfYnVmZmVyXCI6IHVuZGVmaW5lZCxcclxuXHRcdFx0XHRcdFx0XCJidWZmZXJcIjogdW5kZWZpbmVkLFxyXG5cdFx0XHRcdFx0XHRcInRlc3RzXCI6IHt9LFxyXG5cdFx0XHRcdFx0XHRcIm1ldGFkYXRhXCI6IG1ldGFkYXRhLFxyXG5cdFx0XHRcdFx0XHRtYXNrTGVuZ3RoOiB1bmRlZmluZWRcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRpZiAobm9jYWNoZSAhPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0XHRJbnB1dG1hc2sucHJvdG90eXBlLm1hc2tzQ2FjaGVbb3B0cy5udW1lcmljSW5wdXQgPyBtYXNrLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpIDogbWFza10gPSBtYXNrc2V0RGVmaW5pdGlvbjtcclxuXHRcdFx0XHRcdFx0bWFza3NldERlZmluaXRpb24gPSAkLmV4dGVuZCh0cnVlLCB7fSwgSW5wdXRtYXNrLnByb3RvdHlwZS5tYXNrc0NhY2hlW29wdHMubnVtZXJpY0lucHV0ID8gbWFzay5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKSA6IG1hc2tdKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2UgbWFza3NldERlZmluaXRpb24gPSAkLmV4dGVuZCh0cnVlLCB7fSwgSW5wdXRtYXNrLnByb3RvdHlwZS5tYXNrc0NhY2hlW29wdHMubnVtZXJpY0lucHV0ID8gbWFzay5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKSA6IG1hc2tdKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIG1hc2tzZXREZWZpbml0aW9uO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIG1zO1xyXG5cclxuXHRcdGlmICgkLmlzRnVuY3Rpb24ob3B0cy5tYXNrKSkgeyAvL2FsbG93IG1hc2sgdG8gYmUgYSBwcmVwcm9jZXNzaW5nIGZuIC0gc2hvdWxkIHJldHVybiBhIHZhbGlkIG1hc2tcclxuXHRcdFx0b3B0cy5tYXNrID0gb3B0cy5tYXNrKG9wdHMpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQuaXNBcnJheShvcHRzLm1hc2spKSB7XHJcblx0XHRcdGlmIChvcHRzLm1hc2subGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdG9wdHMua2VlcFN0YXRpYyA9IG9wdHMua2VlcFN0YXRpYyA9PT0gbnVsbCA/IHRydWUgOiBvcHRzLmtlZXBTdGF0aWM7IC8vZW5hYmxlIGJ5IGRlZmF1bHQgd2hlbiBwYXNzaW5nIG11bHRpcGxlIG1hc2tzIHdoZW4gdGhlIG9wdGlvbiBpcyBub3QgZXhwbGljaXRseSBzcGVjaWZpZWRcclxuXHRcdFx0XHR2YXIgYWx0TWFzayA9IG9wdHMuZ3JvdXBtYXJrZXIuc3RhcnQ7XHJcblx0XHRcdFx0JC5lYWNoKG9wdHMubnVtZXJpY0lucHV0ID8gb3B0cy5tYXNrLnJldmVyc2UoKSA6IG9wdHMubWFzaywgZnVuY3Rpb24gKG5keCwgbXNrKSB7XHJcblx0XHRcdFx0XHRpZiAoYWx0TWFzay5sZW5ndGggPiAxKSB7XHJcblx0XHRcdFx0XHRcdGFsdE1hc2sgKz0gb3B0cy5ncm91cG1hcmtlci5lbmQgKyBvcHRzLmFsdGVybmF0b3JtYXJrZXIgKyBvcHRzLmdyb3VwbWFya2VyLnN0YXJ0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKG1zay5tYXNrICE9PSB1bmRlZmluZWQgJiYgISQuaXNGdW5jdGlvbihtc2subWFzaykpIHtcclxuXHRcdFx0XHRcdFx0YWx0TWFzayArPSBtc2subWFzaztcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGFsdE1hc2sgKz0gbXNrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGFsdE1hc2sgKz0gb3B0cy5ncm91cG1hcmtlci5lbmQ7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coYWx0TWFzayk7XHJcblx0XHRcdFx0cmV0dXJuIGdlbmVyYXRlTWFzayhhbHRNYXNrLCBvcHRzLm1hc2ssIG9wdHMpO1xyXG5cdFx0XHR9IGVsc2Ugb3B0cy5tYXNrID0gb3B0cy5tYXNrLnBvcCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvcHRzLm1hc2spIHtcclxuXHRcdFx0aWYgKG9wdHMubWFzay5tYXNrICE9PSB1bmRlZmluZWQgJiYgISQuaXNGdW5jdGlvbihvcHRzLm1hc2subWFzaykpIHtcclxuXHRcdFx0XHRtcyA9IGdlbmVyYXRlTWFzayhvcHRzLm1hc2subWFzaywgb3B0cy5tYXNrLCBvcHRzKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRtcyA9IGdlbmVyYXRlTWFzayhvcHRzLm1hc2ssIG9wdHMubWFzaywgb3B0cyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbXM7XHJcblx0fTtcclxuXHJcblxyXG5cdC8vbWFza2luZyBzY29wZVxyXG5cdC8vYWN0aW9uT2JqIGRlZmluaXRpb24gc2VlIGJlbG93XHJcblx0ZnVuY3Rpb24gbWFza1Njb3BlKGFjdGlvbk9iaiwgbWFza3NldCwgb3B0cykge1xyXG5cdFx0bWFza3NldCA9IG1hc2tzZXQgfHwgdGhpcy5tYXNrc2V0O1xyXG5cdFx0b3B0cyA9IG9wdHMgfHwgdGhpcy5vcHRzO1xyXG5cdFx0dmFyIGVsID0gdGhpcy5lbCxcclxuXHRcdFx0aXNSVEwgPSB0aGlzLmlzUlRMLFxyXG5cdFx0XHR1bmRvVmFsdWUsXHJcblx0XHRcdCRlbCxcclxuXHRcdFx0c2tpcEtleVByZXNzRXZlbnQgPSBmYWxzZSwgLy9TYWZhcmkgNS4xLnggLSBtb2RhbCBkaWFsb2cgZmlyZXMga2V5cHJlc3MgdHdpY2Ugd29ya2Fyb3VuZFxyXG5cdFx0XHRza2lwSW5wdXRFdmVudCA9IGZhbHNlLCAvL3NraXAgd2hlbiB0cmlnZ2VyZWQgZnJvbSB3aXRoaW4gaW5wdXRtYXNrXHJcblx0XHRcdGlnbm9yYWJsZSA9IGZhbHNlLFxyXG5cdFx0XHRtYXhMZW5ndGgsXHJcblx0XHRcdG1vdXNlRW50ZXIgPSBmYWxzZSxcclxuXHRcdFx0Y29sb3JNYXNrO1xyXG5cclxuXHRcdC8vbWFza3NldCBoZWxwZXJmdW5jdGlvbnNcclxuXHRcdGZ1bmN0aW9uIGdldE1hc2tUZW1wbGF0ZShiYXNlT25JbnB1dCwgbWluaW1hbFBvcywgaW5jbHVkZU1vZGUpIHtcclxuXHRcdFx0Ly9pbmNsdWRlTW9kZSB0cnVlID0+IGlucHV0LCB1bmRlZmluZWQgPT4gcGxhY2Vob2xkZXIsIGZhbHNlID0+IG1hc2tcclxuXHRcdFx0bWluaW1hbFBvcyA9IG1pbmltYWxQb3MgfHwgMDtcclxuXHRcdFx0dmFyIG1hc2tUZW1wbGF0ZSA9IFtdLFxyXG5cdFx0XHRcdG5keEludGx6ciwgcG9zID0gMCxcclxuXHRcdFx0XHR0ZXN0LCB0ZXN0UG9zLCBsdnAgPSBnZXRMYXN0VmFsaWRQb3NpdGlvbigpO1xyXG5cdFx0XHRtYXhMZW5ndGggPSBlbCAhPT0gdW5kZWZpbmVkID8gZWwubWF4TGVuZ3RoIDogdW5kZWZpbmVkO1xyXG5cdFx0XHRpZiAobWF4TGVuZ3RoID09PSAtMSkgbWF4TGVuZ3RoID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRkbyB7XHJcblx0XHRcdFx0aWYgKGJhc2VPbklucHV0ID09PSB0cnVlICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdKSB7XHJcblx0XHRcdFx0XHR0ZXN0UG9zID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc107XHJcblx0XHRcdFx0XHR0ZXN0ID0gdGVzdFBvcy5tYXRjaDtcclxuXHRcdFx0XHRcdG5keEludGx6ciA9IHRlc3RQb3MubG9jYXRvci5zbGljZSgpO1xyXG5cdFx0XHRcdFx0bWFza1RlbXBsYXRlLnB1c2goaW5jbHVkZU1vZGUgPT09IHRydWUgPyB0ZXN0UG9zLmlucHV0IDogaW5jbHVkZU1vZGUgPT09IGZhbHNlID8gdGVzdC5uYXRpdmVEZWYgOiBnZXRQbGFjZWhvbGRlcihwb3MsIHRlc3QpKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGVzdFBvcyA9IGdldFRlc3RUZW1wbGF0ZShwb3MsIG5keEludGx6ciwgcG9zIC0gMSk7XHJcblx0XHRcdFx0XHR0ZXN0ID0gdGVzdFBvcy5tYXRjaDtcclxuXHRcdFx0XHRcdG5keEludGx6ciA9IHRlc3RQb3MubG9jYXRvci5zbGljZSgpO1xyXG5cdFx0XHRcdFx0aWYgKG9wdHMuaml0TWFza2luZyA9PT0gZmFsc2UgfHwgcG9zIDwgbHZwIHx8ICh0eXBlb2Ygb3B0cy5qaXRNYXNraW5nID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKG9wdHMuaml0TWFza2luZykgJiYgb3B0cy5qaXRNYXNraW5nID4gcG9zKSkge1xyXG5cdFx0XHRcdFx0XHRtYXNrVGVtcGxhdGUucHVzaChpbmNsdWRlTW9kZSA9PT0gZmFsc2UgPyB0ZXN0Lm5hdGl2ZURlZiA6IGdldFBsYWNlaG9sZGVyKHBvcywgdGVzdCkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRwb3MrKztcclxuXHRcdFx0fSB3aGlsZSAoKG1heExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IHBvcyA8IG1heExlbmd0aCkgJiYgKHRlc3QuZm4gIT09IG51bGwgfHwgdGVzdC5kZWYgIT09IFwiXCIpIHx8IG1pbmltYWxQb3MgPiBwb3MpO1xyXG5cdFx0XHRpZiAobWFza1RlbXBsYXRlW21hc2tUZW1wbGF0ZS5sZW5ndGggLSAxXSA9PT0gXCJcIikge1xyXG5cdFx0XHRcdG1hc2tUZW1wbGF0ZS5wb3AoKTsgLy9kcm9wIHRoZSBsYXN0IG9uZSB3aGljaCBpcyBlbXB0eVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRnZXRNYXNrU2V0KCkubWFza0xlbmd0aCA9IHBvcyArIDE7XHJcblx0XHRcdHJldHVybiBtYXNrVGVtcGxhdGU7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0TWFza1NldCgpIHtcclxuXHRcdFx0cmV0dXJuIG1hc2tzZXQ7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gcmVzZXRNYXNrU2V0KHNvZnQpIHtcclxuXHRcdFx0dmFyIG1hc2tzZXQgPSBnZXRNYXNrU2V0KCk7XHJcblx0XHRcdG1hc2tzZXQuYnVmZmVyID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRpZiAoc29mdCAhPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdG1hc2tzZXQuX2J1ZmZlciA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRtYXNrc2V0LnZhbGlkUG9zaXRpb25zID0ge307XHJcblx0XHRcdFx0bWFza3NldC5wID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdldExhc3RWYWxpZFBvc2l0aW9uKGNsb3Nlc3RUbywgc3RyaWN0LCB2YWxpZFBvc2l0aW9ucykge1xyXG5cdFx0XHR2YXIgYmVmb3JlID0gLTEsXHJcblx0XHRcdFx0YWZ0ZXIgPSAtMSxcclxuXHRcdFx0XHR2YWxpZHMgPSB2YWxpZFBvc2l0aW9ucyB8fCBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnM7IC8vZm9yIHVzZSBpbiB2YWxob29rIH4gY29udGV4dCBzd2l0Y2hcclxuXHRcdFx0aWYgKGNsb3Nlc3RUbyA9PT0gdW5kZWZpbmVkKSBjbG9zZXN0VG8gPSAtMTtcclxuXHRcdFx0Zm9yICh2YXIgcG9zTmR4IGluIHZhbGlkcykge1xyXG5cdFx0XHRcdHZhciBwc05keCA9IHBhcnNlSW50KHBvc05keCk7XHJcblx0XHRcdFx0aWYgKHZhbGlkc1twc05keF0gJiYgKHN0cmljdCB8fCB2YWxpZHNbcHNOZHhdLmdlbmVyYXRlZElucHV0ICE9PSB0cnVlKSkge1xyXG5cdFx0XHRcdFx0aWYgKHBzTmR4IDw9IGNsb3Nlc3RUbykgYmVmb3JlID0gcHNOZHg7XHJcblx0XHRcdFx0XHRpZiAocHNOZHggPj0gY2xvc2VzdFRvKSBhZnRlciA9IHBzTmR4O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gKGJlZm9yZSAhPT0gLTEgJiYgKGNsb3Nlc3RUbyAtIGJlZm9yZSkgPiAxKSB8fCBhZnRlciA8IGNsb3Nlc3RUbyA/IGJlZm9yZSA6IGFmdGVyO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBzdHJpcFZhbGlkUG9zaXRpb25zKHN0YXJ0LCBlbmQsIG5vY2hlY2ssIHN0cmljdCkge1xyXG5cdFx0XHRmdW5jdGlvbiBJc0VuY2xvc2VkU3RhdGljKHBvcykge1xyXG5cdFx0XHRcdHZhciBwb3NNYXRjaCA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdO1xyXG5cdFx0XHRcdGlmIChwb3NNYXRjaCAhPT0gdW5kZWZpbmVkICYmIHBvc01hdGNoLm1hdGNoLmZuID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHR2YXIgcHJldk1hdGNoID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3BvcyAtIDFdLFxyXG5cdFx0XHRcdFx0XHRuZXh0TWF0Y2ggPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zICsgMV07XHJcblx0XHRcdFx0XHRyZXR1cm4gcHJldk1hdGNoICE9PSB1bmRlZmluZWQgJiYgbmV4dE1hdGNoICE9PSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGksIHN0YXJ0UG9zID0gc3RhcnQsXHJcblx0XHRcdFx0cG9zaXRpb25zQ2xvbmUgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zKSwgbmVlZHNWYWxpZGF0aW9uID0gZmFsc2U7XHJcblx0XHRcdGdldE1hc2tTZXQoKS5wID0gc3RhcnQ7IC8vbmVlZGVkIGZvciBhbHRlcm5hdGVkIHBvc2l0aW9uIGFmdGVyIG92ZXJ0eXBlIHNlbGVjdGlvblxyXG5cclxuXHRcdFx0Zm9yIChpID0gZW5kIC0gMTsgaSA+PSBzdGFydFBvczsgaS0tKSB7IC8vY2xlYXIgc2VsZWN0aW9uXHJcblx0XHRcdFx0aWYgKGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRpZiAobm9jaGVjayA9PT0gdHJ1ZSB8fFxyXG5cdFx0XHRcdFx0XHQoKGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXS5tYXRjaC5vcHRpb25hbGl0eSB8fCAhSXNFbmNsb3NlZFN0YXRpYyhpKSkgJiYgb3B0cy5jYW5DbGVhclBvc2l0aW9uKGdldE1hc2tTZXQoKSwgaSwgZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSwgc3RyaWN0LCBvcHRzKSAhPT0gZmFsc2UpKSB7XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbaV07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL2NsZWFyIGJ1ZmZlclxyXG5cdFx0XHRyZXNldE1hc2tTZXQodHJ1ZSk7XHJcblx0XHRcdGZvciAoaSA9IHN0YXJ0UG9zICsgMTsgaSA8PSBnZXRMYXN0VmFsaWRQb3NpdGlvbigpOykge1xyXG5cdFx0XHRcdHdoaWxlIChnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbc3RhcnRQb3NdICE9PSB1bmRlZmluZWQpIHN0YXJ0UG9zKys7XHJcblx0XHRcdFx0aWYgKGkgPCBzdGFydFBvcykgaSA9IHN0YXJ0UG9zICsgMTtcclxuXHRcdFx0XHRpZiAoZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2ldICE9PSB1bmRlZmluZWQgfHwgIWlzTWFzayhpKSkge1xyXG5cdFx0XHRcdFx0dmFyIHQgPSBnZXRUZXN0VGVtcGxhdGUoaSk7XHJcblx0XHRcdFx0XHRpZiAobmVlZHNWYWxpZGF0aW9uID09PSBmYWxzZSAmJiBwb3NpdGlvbnNDbG9uZVtzdGFydFBvc10gJiYgcG9zaXRpb25zQ2xvbmVbc3RhcnRQb3NdLm1hdGNoLmRlZiA9PT0gdC5tYXRjaC5kZWYpIHsgLy9vYnZpb3VzIG1hdGNoXHJcblx0XHRcdFx0XHRcdGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tzdGFydFBvc10gPSAkLmV4dGVuZCh0cnVlLCB7fSwgcG9zaXRpb25zQ2xvbmVbc3RhcnRQb3NdKTtcclxuXHRcdFx0XHRcdFx0Z2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3N0YXJ0UG9zXS5pbnB1dCA9IHQuaW5wdXQ7XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbaV07XHJcblx0XHRcdFx0XHRcdGkrKztcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocG9zaXRpb25DYW5NYXRjaERlZmluaXRpb24oc3RhcnRQb3MsIHQubWF0Y2guZGVmKSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoaXNWYWxpZChzdGFydFBvcywgdC5pbnB1dCB8fCBnZXRQbGFjZWhvbGRlcihpKSwgdHJ1ZSkgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXTtcclxuXHRcdFx0XHRcdFx0XHRpKys7XHJcblx0XHRcdFx0XHRcdFx0bmVlZHNWYWxpZGF0aW9uID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICghaXNNYXNrKGkpKSB7XHJcblx0XHRcdFx0XHRcdGkrKztcclxuXHRcdFx0XHRcdFx0c3RhcnRQb3MtLTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHN0YXJ0UG9zKys7XHJcblx0XHRcdFx0fSBlbHNlIGkrKztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmVzZXRNYXNrU2V0KHRydWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGRldGVybWluZVRlc3RUZW1wbGF0ZSh0ZXN0cywgZ3Vlc3NOZXh0QmVzdCkge1xyXG5cdFx0XHR2YXIgdGVzdFBvcyxcclxuXHRcdFx0XHR0ZXN0UG9zaXRpb25zID0gdGVzdHMsXHJcblx0XHRcdFx0bHZwID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSxcclxuXHRcdFx0XHRsdlRlc3QgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbbHZwXSB8fCBnZXRUZXN0cygwKVswXSxcclxuXHRcdFx0XHRsdlRlc3RBbHRBcnIgPSAobHZUZXN0LmFsdGVybmF0aW9uICE9PSB1bmRlZmluZWQpID8gbHZUZXN0LmxvY2F0b3JbbHZUZXN0LmFsdGVybmF0aW9uXS50b1N0cmluZygpLnNwbGl0KFwiLFwiKSA6IFtdO1xyXG5cdFx0XHRmb3IgKHZhciBuZHggPSAwOyBuZHggPCB0ZXN0UG9zaXRpb25zLmxlbmd0aDsgbmR4KyspIHtcclxuXHRcdFx0XHR0ZXN0UG9zID0gdGVzdFBvc2l0aW9uc1tuZHhdO1xyXG5cclxuXHRcdFx0XHRpZiAodGVzdFBvcy5tYXRjaCAmJlxyXG5cdFx0XHRcdFx0KCgob3B0cy5ncmVlZHkgJiYgdGVzdFBvcy5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgIT09IHRydWUpIHx8ICh0ZXN0UG9zLm1hdGNoLm9wdGlvbmFsaXR5ID09PSBmYWxzZSB8fCB0ZXN0UG9zLm1hdGNoLm5ld0Jsb2NrTWFya2VyID09PSBmYWxzZSkgJiYgdGVzdFBvcy5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgIT09IHRydWUpICYmXHJcblx0XHRcdFx0XHQoKGx2VGVzdC5hbHRlcm5hdGlvbiA9PT0gdW5kZWZpbmVkIHx8IGx2VGVzdC5hbHRlcm5hdGlvbiAhPT0gdGVzdFBvcy5hbHRlcm5hdGlvbikgfHxcclxuXHRcdFx0XHRcdCh0ZXN0UG9zLmxvY2F0b3JbbHZUZXN0LmFsdGVybmF0aW9uXSAhPT0gdW5kZWZpbmVkICYmIGNoZWNrQWx0ZXJuYXRpb25NYXRjaCh0ZXN0UG9zLmxvY2F0b3JbbHZUZXN0LmFsdGVybmF0aW9uXS50b1N0cmluZygpLnNwbGl0KFwiLFwiKSwgbHZUZXN0QWx0QXJyKSkpKSkge1xyXG5cclxuXHRcdFx0XHRcdGlmIChndWVzc05leHRCZXN0ICE9PSB0cnVlIHx8ICh0ZXN0UG9zLm1hdGNoLmZuID09PSBudWxsICYmICEvWzAtOWEtYkEtWl0vLnRlc3QodGVzdFBvcy5tYXRjaC5kZWYpKSlcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGVzdFBvcztcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRUZXN0VGVtcGxhdGUocG9zLCBuZHhJbnRsenIsIHRzdFBzKSB7XHJcblx0XHRcdHJldHVybiBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXSB8fCBkZXRlcm1pbmVUZXN0VGVtcGxhdGUoZ2V0VGVzdHMocG9zLCBuZHhJbnRsenIgPyBuZHhJbnRsenIuc2xpY2UoKSA6IG5keEludGx6ciwgdHN0UHMpKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRUZXN0KHBvcykge1xyXG5cdFx0XHRpZiAoZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10pIHtcclxuXHRcdFx0XHRyZXR1cm4gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc107XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGdldFRlc3RzKHBvcylbMF07XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gcG9zaXRpb25DYW5NYXRjaERlZmluaXRpb24ocG9zLCBkZWYpIHtcclxuXHRcdFx0dmFyIHZhbGlkID0gZmFsc2UsXHJcblx0XHRcdFx0dGVzdHMgPSBnZXRUZXN0cyhwb3MpO1xyXG5cdFx0XHRmb3IgKHZhciB0bmR4ID0gMDsgdG5keCA8IHRlc3RzLmxlbmd0aDsgdG5keCsrKSB7XHJcblx0XHRcdFx0aWYgKHRlc3RzW3RuZHhdLm1hdGNoICYmIHRlc3RzW3RuZHhdLm1hdGNoLmRlZiA9PT0gZGVmKSB7XHJcblx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHZhbGlkO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRUZXN0cyhwb3MsIG5keEludGx6ciwgdHN0UHMpIHtcclxuXHRcdFx0dmFyIG1hc2tUb2tlbnMgPSBnZXRNYXNrU2V0KCkubWFza1Rva2VuLFxyXG5cdFx0XHRcdHRlc3RQb3MgPSBuZHhJbnRsenIgPyB0c3RQcyA6IDAsXHJcblx0XHRcdFx0bmR4SW5pdGlhbGl6ZXIgPSBuZHhJbnRsenIgPyBuZHhJbnRsenIuc2xpY2UoKSA6IFswXSxcclxuXHRcdFx0XHRtYXRjaGVzID0gW10sXHJcblx0XHRcdFx0aW5zZXJ0U3RvcCA9IGZhbHNlLFxyXG5cdFx0XHRcdGxhdGVzdE1hdGNoLFxyXG5cdFx0XHRcdGNhY2hlRGVwZW5kZW5jeSA9IG5keEludGx6ciA/IG5keEludGx6ci5qb2luKFwiXCIpIDogXCJcIjtcclxuXHJcblx0XHRcdGZ1bmN0aW9uIHJlc29sdmVUZXN0RnJvbVRva2VuKG1hc2tUb2tlbiwgbmR4SW5pdGlhbGl6ZXIsIGxvb3BOZHgsIHF1YW50aWZpZXJSZWN1cnNlKSB7IC8vbmR4SW5pdGlhbGl6ZXIgY29udGFpbnMgYSBzZXQgb2YgaW5kZXhlcyB0byBzcGVlZHVwIHNlYXJjaGVzIGluIHRoZSBtdG9rZW5zXHJcblx0XHRcdFx0ZnVuY3Rpb24gaGFuZGxlTWF0Y2gobWF0Y2gsIGxvb3BOZHgsIHF1YW50aWZpZXJSZWN1cnNlKSB7XHJcblx0XHRcdFx0XHRmdW5jdGlvbiBpc0ZpcnN0TWF0Y2gobGF0ZXN0TWF0Y2gsIHRva2VuR3JvdXApIHtcclxuXHRcdFx0XHRcdFx0dmFyIGZpcnN0TWF0Y2ggPSAkLmluQXJyYXkobGF0ZXN0TWF0Y2gsIHRva2VuR3JvdXAubWF0Y2hlcykgPT09IDA7XHJcblx0XHRcdFx0XHRcdGlmICghZmlyc3RNYXRjaCkge1xyXG5cdFx0XHRcdFx0XHRcdCQuZWFjaCh0b2tlbkdyb3VwLm1hdGNoZXMsIGZ1bmN0aW9uIChuZHgsIG1hdGNoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAobWF0Y2guaXNRdWFudGlmaWVyID09PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGZpcnN0TWF0Y2ggPSBpc0ZpcnN0TWF0Y2gobGF0ZXN0TWF0Y2gsIHRva2VuR3JvdXAubWF0Y2hlc1tuZHggLSAxXSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChmaXJzdE1hdGNoKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZpcnN0TWF0Y2g7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gcmVzb2x2ZU5keEluaXRpYWxpemVyKHBvcywgYWx0ZXJuYXRlTmR4LCB0YXJnZXRBbHRlcm5hdGlvbikge1xyXG5cdFx0XHRcdFx0XHR2YXIgYmVzdE1hdGNoLCBpbmRleFBvcztcclxuXHRcdFx0XHRcdFx0aWYgKGdldE1hc2tTZXQoKS50ZXN0c1twb3NdIHx8IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdKSB7XHJcblx0XHRcdFx0XHRcdFx0JC5lYWNoKGdldE1hc2tTZXQoKS50ZXN0c1twb3NdIHx8IFtnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXV0sIGZ1bmN0aW9uIChuZHgsIGxtbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBhbHRlcm5hdGlvbiA9IHRhcmdldEFsdGVybmF0aW9uICE9PSB1bmRlZmluZWQgPyB0YXJnZXRBbHRlcm5hdGlvbiA6IGxtbnQuYWx0ZXJuYXRpb24sXHJcblx0XHRcdFx0XHRcdFx0XHRcdG5keFBvcyA9IGxtbnQubG9jYXRvclthbHRlcm5hdGlvbl0gIT09IHVuZGVmaW5lZCA/IGxtbnQubG9jYXRvclthbHRlcm5hdGlvbl0udG9TdHJpbmcoKS5pbmRleE9mKGFsdGVybmF0ZU5keCkgOiAtMTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICgoaW5kZXhQb3MgPT09IHVuZGVmaW5lZCB8fCBuZHhQb3MgPCBpbmRleFBvcykgJiYgbmR4UG9zICE9PSAtMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRiZXN0TWF0Y2ggPSBsbW50O1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpbmRleFBvcyA9IG5keFBvcztcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYmVzdE1hdGNoID9cclxuXHRcdFx0XHRcdFx0XHRiZXN0TWF0Y2gubG9jYXRvci5zbGljZSgodGFyZ2V0QWx0ZXJuYXRpb24gIT09IHVuZGVmaW5lZCA/IHRhcmdldEFsdGVybmF0aW9uIDogYmVzdE1hdGNoLmFsdGVybmF0aW9uKSArIDEpIDpcclxuXHRcdFx0XHRcdFx0XHR0YXJnZXRBbHRlcm5hdGlvbiAhPT0gdW5kZWZpbmVkID8gcmVzb2x2ZU5keEluaXRpYWxpemVyKHBvcywgYWx0ZXJuYXRlTmR4KSA6IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmdW5jdGlvbiBzdGF0aWNDYW5NYXRjaERlZmluaXRpb24oc291cmNlLCB0YXJnZXQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHNvdXJjZS5tYXRjaC5mbiA9PT0gbnVsbCAmJiB0YXJnZXQubWF0Y2guZm4gIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0Lm1hdGNoLmZuLnRlc3Qoc291cmNlLm1hdGNoLmRlZiwgZ2V0TWFza1NldCgpLCBwb3MsIGZhbHNlLCBvcHRzLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0ZXN0UG9zID4gMTAwMDApIHtcclxuXHRcdFx0XHRcdFx0dGhyb3cgXCJJbnB1dG1hc2s6IFRoZXJlIGlzIHByb2JhYmx5IGFuIGVycm9yIGluIHlvdXIgbWFzayBkZWZpbml0aW9uIG9yIGluIHRoZSBjb2RlLiBDcmVhdGUgYW4gaXNzdWUgb24gZ2l0aHViIHdpdGggYW4gZXhhbXBsZSBvZiB0aGUgbWFzayB5b3UgYXJlIHVzaW5nLiBcIiArIGdldE1hc2tTZXQoKS5tYXNrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKHRlc3RQb3MgPT09IHBvcyAmJiBtYXRjaC5tYXRjaGVzID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0bWF0Y2hlcy5wdXNoKHtcclxuXHRcdFx0XHRcdFx0XHRcIm1hdGNoXCI6IG1hdGNoLFxyXG5cdFx0XHRcdFx0XHRcdFwibG9jYXRvclwiOiBsb29wTmR4LnJldmVyc2UoKSxcclxuXHRcdFx0XHRcdFx0XHRcImNkXCI6IGNhY2hlRGVwZW5kZW5jeVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG1hdGNoLm1hdGNoZXMgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRpZiAobWF0Y2guaXNHcm91cCAmJiBxdWFudGlmaWVyUmVjdXJzZSAhPT0gbWF0Y2gpIHsgLy93aGVuIGEgZ3JvdXAgcGFzcyBhbG9uZyB0byB0aGUgcXVhbnRpZmllclxyXG5cdFx0XHRcdFx0XHRcdG1hdGNoID0gaGFuZGxlTWF0Y2gobWFza1Rva2VuLm1hdGNoZXNbJC5pbkFycmF5KG1hdGNoLCBtYXNrVG9rZW4ubWF0Y2hlcykgKyAxXSwgbG9vcE5keCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKG1hdGNoKSByZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChtYXRjaC5pc09wdGlvbmFsKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIG9wdGlvbmFsVG9rZW4gPSBtYXRjaDtcclxuXHRcdFx0XHRcdFx0XHRtYXRjaCA9IHJlc29sdmVUZXN0RnJvbVRva2VuKG1hdGNoLCBuZHhJbml0aWFsaXplciwgbG9vcE5keCwgcXVhbnRpZmllclJlY3Vyc2UpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0bGF0ZXN0TWF0Y2ggPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0ubWF0Y2g7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNGaXJzdE1hdGNoKGxhdGVzdE1hdGNoLCBvcHRpb25hbFRva2VuKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpbnNlcnRTdG9wID0gdHJ1ZTsgLy9pbnNlcnQgYSBzdG9wXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRlc3RQb3MgPSBwb3M7IC8vbWF0Y2ggdGhlIHBvc2l0aW9uIGFmdGVyIHRoZSBncm91cFxyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChtYXRjaC5pc0FsdGVybmF0b3IpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgYWx0ZXJuYXRlVG9rZW4gPSBtYXRjaCxcclxuXHRcdFx0XHRcdFx0XHRcdG1hbHRlcm5hdGVNYXRjaGVzID0gW10sXHJcblx0XHRcdFx0XHRcdFx0XHRtYWx0TWF0Y2hlcyxcclxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRNYXRjaGVzID0gbWF0Y2hlcy5zbGljZSgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0bG9vcE5keENudCA9IGxvb3BOZHgubGVuZ3RoO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBhbHRJbmRleCA9IG5keEluaXRpYWxpemVyLmxlbmd0aCA+IDAgPyBuZHhJbml0aWFsaXplci5zaGlmdCgpIDogLTE7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGFsdEluZGV4ID09PSAtMSB8fCB0eXBlb2YgYWx0SW5kZXggPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBjdXJyZW50UG9zID0gdGVzdFBvcyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0bmR4SW5pdGlhbGl6ZXJDbG9uZSA9IG5keEluaXRpYWxpemVyLnNsaWNlKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdGFsdEluZGV4QXJyID0gW10sXHJcblx0XHRcdFx0XHRcdFx0XHRcdGFtbmR4O1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBhbHRJbmRleCA9PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGFsdEluZGV4QXJyID0gYWx0SW5kZXguc3BsaXQoXCIsXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChhbW5keCA9IDA7IGFtbmR4IDwgYWx0ZXJuYXRlVG9rZW4ubWF0Y2hlcy5sZW5ndGg7IGFtbmR4KyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhbHRJbmRleEFyci5wdXNoKGFtbmR4KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgbmR4ID0gMDsgbmR4IDwgYWx0SW5kZXhBcnIubGVuZ3RoOyBuZHgrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRhbW5keCA9IHBhcnNlSW50KGFsdEluZGV4QXJyW25keF0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRtYXRjaGVzID0gW107XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vc2V0IHRoZSBjb3JyZWN0IG5keEluaXRpYWxpemVyXHJcblx0XHRcdFx0XHRcdFx0XHRcdG5keEluaXRpYWxpemVyID0gcmVzb2x2ZU5keEluaXRpYWxpemVyKHRlc3RQb3MsIGFtbmR4LCBsb29wTmR4Q250KSB8fCBuZHhJbml0aWFsaXplckNsb25lLnNsaWNlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1hdGNoID0gaGFuZGxlTWF0Y2goYWx0ZXJuYXRlVG9rZW4ubWF0Y2hlc1thbW5keF0gfHwgbWFza1Rva2VuLm1hdGNoZXNbYW1uZHhdLCBbYW1uZHhdLmNvbmNhdChsb29wTmR4KSwgcXVhbnRpZmllclJlY3Vyc2UpIHx8IG1hdGNoO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAobWF0Y2ggIT09IHRydWUgJiYgbWF0Y2ggIT09IHVuZGVmaW5lZCAmJiAoYWx0SW5kZXhBcnJbYWx0SW5kZXhBcnIubGVuZ3RoIC0gMV0gPCBhbHRlcm5hdGVUb2tlbi5tYXRjaGVzLmxlbmd0aCkpIHsgLy9ubyBtYXRjaCBpbiB0aGUgYWx0ZXJuYXRpb25zIChsZW5ndGggbWlzbWF0Y2gpID0+IGxvb2sgZnVydGhlclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBudG5keCA9ICQuaW5BcnJheShtYXRjaCwgbWFza1Rva2VuLm1hdGNoZXMpICsgMTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAobWFza1Rva2VuLm1hdGNoZXMubGVuZ3RoID4gbnRuZHgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1hdGNoID0gaGFuZGxlTWF0Y2gobWFza1Rva2VuLm1hdGNoZXNbbnRuZHhdLCBbbnRuZHhdLmNvbmNhdChsb29wTmR4LnNsaWNlKDEsIGxvb3BOZHgubGVuZ3RoKSksIHF1YW50aWZpZXJSZWN1cnNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhbHRJbmRleEFyci5wdXNoKG50bmR4LnRvU3RyaW5nKCkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkLmVhY2gobWF0Y2hlcywgZnVuY3Rpb24gKG5keCwgbG1udCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxtbnQuYWx0ZXJuYXRpb24gPSBsb29wTmR4Lmxlbmd0aCAtIDE7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRtYWx0TWF0Y2hlcyA9IG1hdGNoZXMuc2xpY2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGVzdFBvcyA9IGN1cnJlbnRQb3M7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1hdGNoZXMgPSBbXTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vZnV6enkgbWVyZ2UgbWF0Y2hlc1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBuZHgxID0gMDsgbmR4MSA8IG1hbHRNYXRjaGVzLmxlbmd0aDsgbmR4MSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIGFsdE1hdGNoID0gbWFsdE1hdGNoZXNbbmR4MV0sIGhhc01hdGNoID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YWx0TWF0Y2guYWx0ZXJuYXRpb24gPSBhbHRNYXRjaC5hbHRlcm5hdGlvbiB8fCBsb29wTmR4Q250O1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIG5keDIgPSAwOyBuZHgyIDwgbWFsdGVybmF0ZU1hdGNoZXMubGVuZ3RoOyBuZHgyKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBhbHRNYXRjaDIgPSBtYWx0ZXJuYXRlTWF0Y2hlc1tuZHgyXTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdmVyaWZ5IGVxdWFsaXR5XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGFsdEluZGV4ICE9PSBcInN0cmluZ1wiIHx8ICQuaW5BcnJheShhbHRNYXRjaC5sb2NhdG9yW2FsdE1hdGNoLmFsdGVybmF0aW9uXS50b1N0cmluZygpLCBhbHRJbmRleEFycikgIT09IC0xKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChhbHRNYXRjaC5tYXRjaC5kZWYgPT09IGFsdE1hdGNoMi5tYXRjaC5kZWYgfHwgc3RhdGljQ2FuTWF0Y2hEZWZpbml0aW9uKGFsdE1hdGNoLCBhbHRNYXRjaDIpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aGFzTWF0Y2ggPSBhbHRNYXRjaC5tYXRjaC5uYXRpdmVEZWYgPT09IGFsdE1hdGNoMi5tYXRjaC5uYXRpdmVEZWY7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gaWYgKGFsdE1hdGNoLmFsdGVybmF0aW9uICE9IGFsdE1hdGNoMi5hbHRlcm5hdGlvbikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFx0Y29uc29sZS5sb2coXCJhbHRlcm5hdGlvbiBtaXNtYXRjaFwiKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGFsdE1hdGNoLmFsdGVybmF0aW9uID09IGFsdE1hdGNoMi5hbHRlcm5hdGlvbiAmJiAvL2NhbiB3ZSBtZXJnZSBpZiB0aGUgYWx0ZXJuYXRpb24gaXMgZGlmZmVyZW50Pz8gIFRPRE8gVE9DSEVDSyBJTlZFU1RJR0FURVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YWx0TWF0Y2gyLmxvY2F0b3JbYWx0TWF0Y2gyLmFsdGVybmF0aW9uXS50b1N0cmluZygpLmluZGV4T2YoYWx0TWF0Y2gubG9jYXRvclthbHRNYXRjaC5hbHRlcm5hdGlvbl0pID09PSAtMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YWx0TWF0Y2gyLmxvY2F0b3JbYWx0TWF0Y2gyLmFsdGVybmF0aW9uXSA9IGFsdE1hdGNoMi5sb2NhdG9yW2FsdE1hdGNoMi5hbHRlcm5hdGlvbl0gKyBcIixcIiArIGFsdE1hdGNoLmxvY2F0b3JbYWx0TWF0Y2guYWx0ZXJuYXRpb25dO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YWx0TWF0Y2gyLmFsdGVybmF0aW9uID0gYWx0TWF0Y2guYWx0ZXJuYXRpb247IC8vd2UgcGFzcyB0aGUgYWx0ZXJuYXRpb24gaW5kZXggPT4gdXNlZCBpbiBkZXRlcm1pbmVMYXN0UmVxdWlyZWRQb3NpdGlvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGFsdE1hdGNoLm1hdGNoLmZuID09IG51bGwpIHsgLy9zdGF0aWNDYW5NYXRjaERlZmluaXRpb24gPT4gc2V0IG5vIGFsdGVybmF0ZSBvbiBtYXRjaFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhbHRNYXRjaDIubmEgPSBhbHRNYXRjaDIubmEgfHwgYWx0TWF0Y2gubG9jYXRvclthbHRNYXRjaC5hbHRlcm5hdGlvbl0udG9TdHJpbmcoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGFsdE1hdGNoMi5uYS5pbmRleE9mKGFsdE1hdGNoLmxvY2F0b3JbYWx0TWF0Y2guYWx0ZXJuYXRpb25dKSA9PT0gLTEpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YWx0TWF0Y2gyLm5hID0gYWx0TWF0Y2gyLm5hICsgXCIsXCIgKyBhbHRNYXRjaC5sb2NhdG9yW2FsdE1hdGNoLmFsdGVybmF0aW9uXTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFoYXNNYXRjaCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWFsdGVybmF0ZU1hdGNoZXMucHVzaChhbHRNYXRjaCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGFsdEluZGV4ID09IFwic3RyaW5nXCIpIHsgLy9maWx0ZXIgbWF0Y2hlc1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRtYWx0ZXJuYXRlTWF0Y2hlcyA9ICQubWFwKG1hbHRlcm5hdGVNYXRjaGVzLCBmdW5jdGlvbiAobG1udCwgbmR4KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGlzRmluaXRlKG5keCkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBtYW1hdGNoLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhbHRlcm5hdGlvbiA9IGxtbnQuYWx0ZXJuYXRpb24sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFsdExvY0FyciA9IGxtbnQubG9jYXRvclthbHRlcm5hdGlvbl0udG9TdHJpbmcoKS5zcGxpdChcIixcIik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsbW50LmxvY2F0b3JbYWx0ZXJuYXRpb25dID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bG1udC5hbHRlcm5hdGlvbiA9IHVuZGVmaW5lZDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBhbG5keCA9IDA7IGFsbmR4IDwgYWx0TG9jQXJyLmxlbmd0aDsgYWxuZHgrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtYW1hdGNoID0gJC5pbkFycmF5KGFsdExvY0FyclthbG5keF0sIGFsdEluZGV4QXJyKSAhPT0gLTE7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChtYW1hdGNoKSB7IC8vcmVidWlsZCB0aGUgbG9jYXRvciB3aXRoIHZhbGlkIGVudHJpZXNcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAobG1udC5sb2NhdG9yW2FsdGVybmF0aW9uXSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsbW50LmxvY2F0b3JbYWx0ZXJuYXRpb25dICs9IFwiLFwiO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bG1udC5sb2NhdG9yW2FsdGVybmF0aW9uXSArPSBhbHRMb2NBcnJbYWxuZHhdO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBsbW50LmxvY2F0b3JbYWx0ZXJuYXRpb25dID0gcGFyc2VJbnQoYWx0TG9jQXJyW2FsbmR4XSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxtbnQuYWx0ZXJuYXRpb24gPSBhbHRlcm5hdGlvbjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChsbW50LmxvY2F0b3JbYWx0ZXJuYXRpb25dICE9PSB1bmRlZmluZWQpIHJldHVybiBsbW50O1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0bWF0Y2hlcyA9IGN1cnJlbnRNYXRjaGVzLmNvbmNhdChtYWx0ZXJuYXRlTWF0Y2hlcyk7XHJcblx0XHRcdFx0XHRcdFx0XHR0ZXN0UG9zID0gcG9zO1xyXG5cdFx0XHRcdFx0XHRcdFx0aW5zZXJ0U3RvcCA9IG1hdGNoZXMubGVuZ3RoID4gMDsgLy9pbnNlcnQgYSBzdG9wZWxlbW50IHdoZW4gdGhlcmUgaXMgYW4gYWx0ZXJuYXRlIC0gbmVlZGVkIGZvciBub24tZ3JlZWR5IG9wdGlvblxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdC8vY2xvbmViYWNrXHJcblx0XHRcdFx0XHRcdFx0XHRuZHhJbml0aWFsaXplciA9IG5keEluaXRpYWxpemVyQ2xvbmUuc2xpY2UoKTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gaWYgKGFsdGVybmF0ZVRva2VuLm1hdGNoZXNbYWx0SW5kZXhdKSB7IC8vaWYgbm90IGluIHRoZSBpbml0aWFsIGFsdGVybmF0aW9uID0+IGxvb2sgZnVydGhlclxyXG5cdFx0XHRcdFx0XHRcdFx0bWF0Y2ggPSBoYW5kbGVNYXRjaChhbHRlcm5hdGVUb2tlbi5tYXRjaGVzW2FsdEluZGV4XSB8fCBtYXNrVG9rZW4ubWF0Y2hlc1thbHRJbmRleF0sIFthbHRJbmRleF0uY29uY2F0KGxvb3BOZHgpLCBxdWFudGlmaWVyUmVjdXJzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyB9IGVsc2UgbWF0Y2ggPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0aWYgKG1hdGNoKSByZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChtYXRjaC5pc1F1YW50aWZpZXIgJiYgcXVhbnRpZmllclJlY3Vyc2UgIT09IG1hc2tUb2tlbi5tYXRjaGVzWyQuaW5BcnJheShtYXRjaCwgbWFza1Rva2VuLm1hdGNoZXMpIC0gMV0pIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcXQgPSBtYXRjaDtcclxuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBxbmR4ID0gKG5keEluaXRpYWxpemVyLmxlbmd0aCA+IDApID8gbmR4SW5pdGlhbGl6ZXIuc2hpZnQoKSA6IDA7IChxbmR4IDwgKGlzTmFOKHF0LnF1YW50aWZpZXIubWF4KSA/IHFuZHggKyAxIDogcXQucXVhbnRpZmllci5tYXgpKSAmJiB0ZXN0UG9zIDw9IHBvczsgcW5keCsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgdG9rZW5Hcm91cCA9IG1hc2tUb2tlbi5tYXRjaGVzWyQuaW5BcnJheShxdCwgbWFza1Rva2VuLm1hdGNoZXMpIC0gMV07XHJcblx0XHRcdFx0XHRcdFx0XHRtYXRjaCA9IGhhbmRsZU1hdGNoKHRva2VuR3JvdXAsIFtxbmR4XS5jb25jYXQobG9vcE5keCksIHRva2VuR3JvdXApOyAvL3NldCB0aGUgdG9rZW5Hcm91cCBhcyBxdWFudGlmaWVyUmVjdXJzZSBtYXJrZXJcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBsYXRlc3QgbWF0Y2hcclxuXHRcdFx0XHRcdFx0XHRcdFx0bGF0ZXN0TWF0Y2ggPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0ubWF0Y2g7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxhdGVzdE1hdGNoLm9wdGlvbmFsUXVhbnRpZmllciA9IHFuZHggPiAocXQucXVhbnRpZmllci5taW4gLSAxKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGlzRmlyc3RNYXRjaChsYXRlc3RNYXRjaCwgdG9rZW5Hcm91cCkpIHsgLy9zZWFyY2ggZm9yIG5leHQgcG9zc2libGUgbWF0Y2hcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAocW5keCA+IChxdC5xdWFudGlmaWVyLm1pbiAtIDEpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpbnNlcnRTdG9wID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRlc3RQb3MgPSBwb3M7IC8vbWF0Y2ggdGhlIHBvc2l0aW9uIGFmdGVyIHRoZSBncm91cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7IC8vc3RvcCBxdWFudGlmaWVybG9vcFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSByZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRtYXRjaCA9IHJlc29sdmVUZXN0RnJvbVRva2VuKG1hdGNoLCBuZHhJbml0aWFsaXplciwgbG9vcE5keCwgcXVhbnRpZmllclJlY3Vyc2UpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChtYXRjaCkgcmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHRlc3RQb3MrKztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIHRuZHggPSAobmR4SW5pdGlhbGl6ZXIubGVuZ3RoID4gMCA/IG5keEluaXRpYWxpemVyLnNoaWZ0KCkgOiAwKTsgdG5keCA8IG1hc2tUb2tlbi5tYXRjaGVzLmxlbmd0aDsgdG5keCsrKSB7XHJcblx0XHRcdFx0XHRpZiAobWFza1Rva2VuLm1hdGNoZXNbdG5keF0uaXNRdWFudGlmaWVyICE9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRcdHZhciBtYXRjaCA9IGhhbmRsZU1hdGNoKG1hc2tUb2tlbi5tYXRjaGVzW3RuZHhdLCBbdG5keF0uY29uY2F0KGxvb3BOZHgpLCBxdWFudGlmaWVyUmVjdXJzZSk7XHJcblx0XHRcdFx0XHRcdGlmIChtYXRjaCAmJiB0ZXN0UG9zID09PSBwb3MpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbWF0Y2g7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodGVzdFBvcyA+IHBvcykge1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBtZXJnZUxvY2F0b3JzKHRlc3RzKSB7XHJcblx0XHRcdFx0dmFyIGxvY2F0b3IgPSBbXTtcclxuXHRcdFx0XHRpZiAoISQuaXNBcnJheSh0ZXN0cykpIHRlc3RzID0gW3Rlc3RzXTtcclxuXHRcdFx0XHRpZiAodGVzdHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0aWYgKHRlc3RzWzBdLmFsdGVybmF0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0bG9jYXRvciA9IGRldGVybWluZVRlc3RUZW1wbGF0ZSh0ZXN0cy5zbGljZSgpKS5sb2NhdG9yLnNsaWNlKCk7XHJcblx0XHRcdFx0XHRcdGlmIChsb2NhdG9yLmxlbmd0aCA9PT0gMCkgbG9jYXRvciA9IHRlc3RzWzBdLmxvY2F0b3Iuc2xpY2UoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkLmVhY2godGVzdHMsIGZ1bmN0aW9uIChuZHgsIHRzdCkge1xyXG5cdFx0XHRcdFx0XHRcdGlmICh0c3QuZGVmICE9PSBcIlwiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAobG9jYXRvci5sZW5ndGggPT09IDApIGxvY2F0b3IgPSB0c3QubG9jYXRvci5zbGljZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRvci5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh0c3QubG9jYXRvcltpXSAmJiBsb2NhdG9yW2ldLnRvU3RyaW5nKCkuaW5kZXhPZih0c3QubG9jYXRvcltpXSkgPT09IC0xKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsb2NhdG9yW2ldICs9IFwiLFwiICsgdHN0LmxvY2F0b3JbaV07XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGxvY2F0b3I7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGZpbHRlclRlc3RzKHRlc3RzKSB7XHJcblx0XHRcdFx0aWYgKG9wdHMua2VlcFN0YXRpYyAmJiBwb3MgPiAwKSB7XHJcblx0XHRcdFx0XHRpZiAodGVzdHMubGVuZ3RoID4gMSArICh0ZXN0c1t0ZXN0cy5sZW5ndGggLSAxXS5tYXRjaC5kZWYgPT09IFwiXCIgPyAxIDogMCkpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRlc3RzWzBdLm1hdGNoLm9wdGlvbmFsaXR5ICE9PSB0cnVlICYmXHJcblx0XHRcdFx0XHRcdFx0dGVzdHNbMF0ubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyICE9PSB0cnVlICYmXHJcblx0XHRcdFx0XHRcdFx0dGVzdHNbMF0ubWF0Y2guZm4gPT09IG51bGwgJiYgIS9bMC05YS1iQS1aXS8udGVzdCh0ZXN0c1swXS5tYXRjaC5kZWYpKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtkZXRlcm1pbmVUZXN0VGVtcGxhdGUodGVzdHMpXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRlc3RzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocG9zID4gLTEpIHtcclxuXHRcdFx0XHRpZiAobmR4SW50bHpyID09PSB1bmRlZmluZWQpIHsgLy9kZXRlcm1pbmUgaW5kZXggaW5pdGlhbGl6ZXJcclxuXHRcdFx0XHRcdHZhciBwcmV2aW91c1BvcyA9IHBvcyAtIDEsXHJcblx0XHRcdFx0XHRcdHRlc3Q7XHJcblx0XHRcdFx0XHR3aGlsZSAoKHRlc3QgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcHJldmlvdXNQb3NdIHx8IGdldE1hc2tTZXQoKS50ZXN0c1twcmV2aW91c1Bvc10pID09PSB1bmRlZmluZWQgJiYgcHJldmlvdXNQb3MgPiAtMSkge1xyXG5cdFx0XHRcdFx0XHRwcmV2aW91c1Bvcy0tO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKHRlc3QgIT09IHVuZGVmaW5lZCAmJiBwcmV2aW91c1BvcyA+IC0xKSB7XHJcblx0XHRcdFx0XHRcdG5keEluaXRpYWxpemVyID0gbWVyZ2VMb2NhdG9ycyh0ZXN0KTtcclxuXHRcdFx0XHRcdFx0Y2FjaGVEZXBlbmRlbmN5ID0gbmR4SW5pdGlhbGl6ZXIuam9pbihcIlwiKTtcclxuXHRcdFx0XHRcdFx0dGVzdFBvcyA9IHByZXZpb3VzUG9zO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoZ2V0TWFza1NldCgpLnRlc3RzW3Bvc10gJiYgZ2V0TWFza1NldCgpLnRlc3RzW3Bvc11bMF0uY2QgPT09IGNhY2hlRGVwZW5kZW5jeSkgeyAvL2NhY2hlRGVwZW5kZW5jeSBpcyBzZXQgb24gYWxsIHRlc3RzLCBqdXN0IGNoZWNrIG9uIHRoZSBmaXJzdFxyXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcImNhY2hlIGhpdCBcIiArIHBvcyArIFwiIC0gXCIgKyBuZHhJbnRsenIpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZpbHRlclRlc3RzKGdldE1hc2tTZXQoKS50ZXN0c1twb3NdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Zm9yICh2YXIgbXRuZHggPSBuZHhJbml0aWFsaXplci5zaGlmdCgpOyBtdG5keCA8IG1hc2tUb2tlbnMubGVuZ3RoOyBtdG5keCsrKSB7XHJcblx0XHRcdFx0XHR2YXIgbWF0Y2ggPSByZXNvbHZlVGVzdEZyb21Ub2tlbihtYXNrVG9rZW5zW210bmR4XSwgbmR4SW5pdGlhbGl6ZXIsIFttdG5keF0pO1xyXG5cdFx0XHRcdFx0aWYgKChtYXRjaCAmJiB0ZXN0UG9zID09PSBwb3MpIHx8IHRlc3RQb3MgPiBwb3MpIHtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMCB8fCBpbnNlcnRTdG9wKSB7XHJcblx0XHRcdFx0bWF0Y2hlcy5wdXNoKHtcclxuXHRcdFx0XHRcdG1hdGNoOiB7XHJcblx0XHRcdFx0XHRcdGZuOiBudWxsLFxyXG5cdFx0XHRcdFx0XHRjYXJkaW5hbGl0eTogMCxcclxuXHRcdFx0XHRcdFx0b3B0aW9uYWxpdHk6IHRydWUsXHJcblx0XHRcdFx0XHRcdGNhc2luZzogbnVsbCxcclxuXHRcdFx0XHRcdFx0ZGVmOiBcIlwiLFxyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcjogXCJcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGxvY2F0b3I6IFtdLFxyXG5cdFx0XHRcdFx0Y2Q6IGNhY2hlRGVwZW5kZW5jeVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobmR4SW50bHpyICE9PSB1bmRlZmluZWQgJiYgZ2V0TWFza1NldCgpLnRlc3RzW3Bvc10pIHsgLy9wcmlvcml0aXplIGZ1bGwgdGVzdHMgZm9yIGNhY2hpbmdcclxuXHRcdFx0XHRyZXR1cm4gZmlsdGVyVGVzdHMoJC5leHRlbmQodHJ1ZSwgW10sIG1hdGNoZXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRnZXRNYXNrU2V0KCkudGVzdHNbcG9zXSA9ICQuZXh0ZW5kKHRydWUsIFtdLCBtYXRjaGVzKTsgLy9zZXQgYSBjbG9uZSB0byBwcmV2ZW50IG92ZXJ3cml0aW5nIHNvbWUgcHJvcHNcclxuXHRcdFx0Ly8gY29uc29sZS5sb2cocG9zICsgXCIgLSBcIiArIEpTT04uc3RyaW5naWZ5KG1hdGNoZXMpKTtcclxuXHRcdFx0cmV0dXJuIGZpbHRlclRlc3RzKGdldE1hc2tTZXQoKS50ZXN0c1twb3NdKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRCdWZmZXJUZW1wbGF0ZSgpIHtcclxuXHRcdFx0aWYgKGdldE1hc2tTZXQoKS5fYnVmZmVyID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHQvL2dlbmVyYXRlIHRlbXBsYXRlXHJcblx0XHRcdFx0Z2V0TWFza1NldCgpLl9idWZmZXIgPSBnZXRNYXNrVGVtcGxhdGUoZmFsc2UsIDEpO1xyXG5cdFx0XHRcdGlmIChnZXRNYXNrU2V0KCkuYnVmZmVyID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdGdldE1hc2tTZXQoKS5fYnVmZmVyLnNsaWNlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBnZXRNYXNrU2V0KCkuX2J1ZmZlcjtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRCdWZmZXIobm9DYWNoZSkge1xyXG5cdFx0XHRpZiAoZ2V0TWFza1NldCgpLmJ1ZmZlciA9PT0gdW5kZWZpbmVkIHx8IG5vQ2FjaGUgPT09IHRydWUpIHtcclxuXHRcdFx0XHRnZXRNYXNrU2V0KCkuYnVmZmVyID0gZ2V0TWFza1RlbXBsYXRlKHRydWUsIGdldExhc3RWYWxpZFBvc2l0aW9uKCksIHRydWUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBnZXRNYXNrU2V0KCkuYnVmZmVyO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJlZnJlc2hGcm9tQnVmZmVyKHN0YXJ0LCBlbmQsIGJ1ZmZlcikge1xyXG5cdFx0XHR2YXIgaTtcclxuXHRcdFx0aWYgKHN0YXJ0ID09PSB0cnVlKSB7XHJcblx0XHRcdFx0cmVzZXRNYXNrU2V0KCk7XHJcblx0XHRcdFx0c3RhcnQgPSAwO1xyXG5cdFx0XHRcdGVuZCA9IGJ1ZmZlci5sZW5ndGg7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xyXG5cdFx0XHRcdHJlc2V0TWFza1NldCh0cnVlKTsgLy9wcmV2ZW50cyBjbG9iYmVyIGZyb20gdGhlIGJ1ZmZlclxyXG5cdFx0XHRcdGlmIChidWZmZXJbaV0gIT09IG9wdHMuc2tpcE9wdGlvbmFsUGFydENoYXJhY3Rlcikge1xyXG5cdFx0XHRcdFx0aXNWYWxpZChpLCBidWZmZXJbaV0sIHRydWUsIHRydWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGNhc2luZyhlbGVtLCB0ZXN0LCBwb3MpIHtcclxuXHRcdFx0c3dpdGNoIChvcHRzLmNhc2luZyB8fCB0ZXN0LmNhc2luZykge1xyXG5cdFx0XHRcdGNhc2UgXCJ1cHBlclwiOlxyXG5cdFx0XHRcdFx0ZWxlbSA9IGVsZW0udG9VcHBlckNhc2UoKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgXCJsb3dlclwiOlxyXG5cdFx0XHRcdFx0ZWxlbSA9IGVsZW0udG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgXCJ0aXRsZVwiOlxyXG5cdFx0XHRcdFx0dmFyIHBvc0JlZm9yZSA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3MgLSAxXTtcclxuXHRcdFx0XHRcdGlmIChwb3MgPT09IDAgfHwgcG9zQmVmb3JlICYmIHBvc0JlZm9yZS5pbnB1dCA9PT0gU3RyaW5nLmZyb21DaGFyQ29kZShJbnB1dG1hc2sua2V5Q29kZS5TUEFDRSkpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbSA9IGVsZW0udG9VcHBlckNhc2UoKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGVsZW0gPSBlbGVtLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGVsZW07XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gY2hlY2tBbHRlcm5hdGlvbk1hdGNoKGFsdEFycjEsIGFsdEFycjIpIHtcclxuXHRcdFx0dmFyIGFsdEFyckMgPSBvcHRzLmdyZWVkeSA/IGFsdEFycjIgOiBhbHRBcnIyLnNsaWNlKDAsIDEpLFxyXG5cdFx0XHRcdGlzTWF0Y2ggPSBmYWxzZTtcclxuXHRcdFx0Zm9yICh2YXIgYWxuZHggPSAwOyBhbG5keCA8IGFsdEFycjEubGVuZ3RoOyBhbG5keCsrKSB7XHJcblx0XHRcdFx0aWYgKCQuaW5BcnJheShhbHRBcnIxW2FsbmR4XSwgYWx0QXJyQykgIT09IC0xKSB7XHJcblx0XHRcdFx0XHRpc01hdGNoID0gdHJ1ZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gaXNNYXRjaDtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBpc1ZhbGlkKHBvcywgYywgc3RyaWN0LCBmcm9tU2V0VmFsaWQsIGZyb21BbHRlcm5hdGUpIHsgLy9zdHJpY3QgdHJ1ZSB+IG5vIGNvcnJlY3Rpb24gb3IgYXV0b2ZpbGxcclxuXHRcdFx0ZnVuY3Rpb24gaXNTZWxlY3Rpb24ocG9zT2JqKSB7XHJcblx0XHRcdFx0dmFyIHNlbGVjdGlvbiA9IGlzUlRMID8gKHBvc09iai5iZWdpbiAtIHBvc09iai5lbmQpID4gMSB8fCAoKHBvc09iai5iZWdpbiAtIHBvc09iai5lbmQpID09PSAxICYmIG9wdHMuaW5zZXJ0TW9kZSkgOlxyXG5cdFx0XHRcdChwb3NPYmouZW5kIC0gcG9zT2JqLmJlZ2luKSA+IDEgfHwgKChwb3NPYmouZW5kIC0gcG9zT2JqLmJlZ2luKSA9PT0gMSAmJiBvcHRzLmluc2VydE1vZGUpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gc2VsZWN0aW9uICYmIHBvc09iai5iZWdpbiA9PT0gMCAmJiBwb3NPYmouZW5kID09PSBnZXRNYXNrU2V0KCkubWFza0xlbmd0aCA/IFwiZnVsbFwiIDogc2VsZWN0aW9uO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzdHJpY3QgPSBzdHJpY3QgPT09IHRydWU7IC8vYWx3YXlzIHNldCBhIHZhbHVlIHRvIHN0cmljdCB0byBwcmV2ZW50IHBvc3NpYmxlIHN0cmFuZ2UgYmVoYXZpb3IgaW4gdGhlIGV4dGVuc2lvbnNcclxuXHJcblx0XHRcdHZhciBtYXNrUG9zID0gcG9zO1xyXG5cdFx0XHRpZiAocG9zLmJlZ2luICE9PSB1bmRlZmluZWQpIHsgLy9wb3NpdGlvbiB3YXMgYSBwb3NpdGlvbiBvYmplY3QgLSB1c2VkIHRvIGhhbmRsZSBhIGRlbGV0ZSBieSB0eXBpbmcgb3ZlciBhIHNlbGVjdGlvblxyXG5cdFx0XHRcdG1hc2tQb3MgPSBpc1JUTCAmJiAhaXNTZWxlY3Rpb24ocG9zKSA/IHBvcy5lbmQgOiBwb3MuYmVnaW47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIF9pc1ZhbGlkKHBvc2l0aW9uLCBjLCBzdHJpY3QpIHtcclxuXHRcdFx0XHR2YXIgcnNsdCA9IGZhbHNlO1xyXG5cdFx0XHRcdCQuZWFjaChnZXRUZXN0cyhwb3NpdGlvbiksIGZ1bmN0aW9uIChuZHgsIHRzdCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgdGVzdCA9IHRzdC5tYXRjaCxcclxuXHRcdFx0XHRcdFx0XHRsb29wZW5kID0gYyA/IDEgOiAwLFxyXG5cdFx0XHRcdFx0XHRcdGNocnMgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gdGVzdC5jYXJkaW5hbGl0eTsgaSA+IGxvb3BlbmQ7IGktLSkge1xyXG5cdFx0XHRcdFx0XHRcdGNocnMgKz0gZ2V0QnVmZmVyRWxlbWVudChwb3NpdGlvbiAtIChpIC0gMSkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChjKSB7XHJcblx0XHRcdFx0XHRcdFx0Y2hycyArPSBjO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQvL21ha2Ugc3VyZSB0aGUgYnVmZmVyIGlzIHNldCBhbmQgY29ycmVjdFxyXG5cdFx0XHRcdFx0XHRnZXRCdWZmZXIodHJ1ZSk7XHJcblx0XHRcdFx0XHRcdC8vcmV0dXJuIGlzIGZhbHNlIG9yIGEganNvbiBvYmplY3QgPT4geyBwb3M6ID8/LCBjOiA/P30gb3IgdHJ1ZVxyXG5cdFx0XHRcdFx0XHRyc2x0ID0gdGVzdC5mbiAhPSBudWxsID9cclxuXHRcdFx0XHRcdFx0XHR0ZXN0LmZuLnRlc3QoY2hycywgZ2V0TWFza1NldCgpLCBwb3NpdGlvbiwgc3RyaWN0LCBvcHRzLCBpc1NlbGVjdGlvbihwb3MpKSA6IChjID09PSB0ZXN0LmRlZiB8fCBjID09PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIpICYmIHRlc3QuZGVmICE9PSBcIlwiID8gLy9ub24gbWFza1xyXG5cdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdGM6IHRlc3QucGxhY2Vob2xkZXIgfHwgdGVzdC5kZWYsXHJcblx0XHRcdFx0XHRcdFx0XHRwb3M6IHBvc2l0aW9uXHJcblx0XHRcdFx0XHRcdFx0fSA6IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHJzbHQgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGVsZW0gPSByc2x0LmMgIT09IHVuZGVmaW5lZCA/IHJzbHQuYyA6IGM7XHJcblx0XHRcdFx0XHRcdFx0ZWxlbSA9IChlbGVtID09PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIgJiYgdGVzdC5mbiA9PT0gbnVsbCkgPyAodGVzdC5wbGFjZWhvbGRlciB8fCB0ZXN0LmRlZikgOiBlbGVtO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgdmFsaWRhdGVkUG9zID0gcG9zaXRpb24sXHJcblx0XHRcdFx0XHRcdFx0XHRwb3NzaWJsZU1vZGlmaWVkQnVmZmVyID0gZ2V0QnVmZmVyKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChyc2x0LnJlbW92ZSAhPT0gdW5kZWZpbmVkKSB7IC8vcmVtb3ZlIHBvc2l0aW9uKHMpXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoISQuaXNBcnJheShyc2x0LnJlbW92ZSkpIHJzbHQucmVtb3ZlID0gW3JzbHQucmVtb3ZlXTtcclxuXHRcdFx0XHRcdFx0XHRcdCQuZWFjaChyc2x0LnJlbW92ZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBiIC0gYTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pLCBmdW5jdGlvbiAobmR4LCBsbW50KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHN0cmlwVmFsaWRQb3NpdGlvbnMobG1udCwgbG1udCArIDEsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGlmIChyc2x0Lmluc2VydCAhPT0gdW5kZWZpbmVkKSB7IC8vaW5zZXJ0IHBvc2l0aW9uKHMpXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoISQuaXNBcnJheShyc2x0Lmluc2VydCkpIHJzbHQuaW5zZXJ0ID0gW3JzbHQuaW5zZXJ0XTtcclxuXHRcdFx0XHRcdFx0XHRcdCQuZWFjaChyc2x0Lmluc2VydC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBhIC0gYjtcclxuXHRcdFx0XHRcdFx0XHRcdH0pLCBmdW5jdGlvbiAobmR4LCBsbW50KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlzVmFsaWQobG1udC5wb3MsIGxtbnQuYywgdHJ1ZSwgZnJvbVNldFZhbGlkKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKHJzbHQucmVmcmVzaEZyb21CdWZmZXIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciByZWZyZXNoID0gcnNsdC5yZWZyZXNoRnJvbUJ1ZmZlcjtcclxuXHRcdFx0XHRcdFx0XHRcdHN0cmljdCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRyZWZyZXNoRnJvbUJ1ZmZlcihyZWZyZXNoID09PSB0cnVlID8gcmVmcmVzaCA6IHJlZnJlc2guc3RhcnQsIHJlZnJlc2guZW5kLCBwb3NzaWJsZU1vZGlmaWVkQnVmZmVyKTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChyc2x0LnBvcyA9PT0gdW5kZWZpbmVkICYmIHJzbHQuYyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJzbHQucG9zID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlOyAvL2JyZWFrb3V0IGlmIHJlZnJlc2hGcm9tQnVmZmVyICYmIG5vdGhpbmcgdG8gaW5zZXJ0XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR2YWxpZGF0ZWRQb3MgPSByc2x0LnBvcyAhPT0gdW5kZWZpbmVkID8gcnNsdC5wb3MgOiBwb3NpdGlvbjtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICh2YWxpZGF0ZWRQb3MgIT09IHBvc2l0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJzbHQgPSAkLmV4dGVuZChyc2x0LCBpc1ZhbGlkKHZhbGlkYXRlZFBvcywgZWxlbSwgdHJ1ZSwgZnJvbVNldFZhbGlkKSk7IC8vcmV2YWxpZGF0ZSBuZXcgcG9zaXRpb24gc3RyaWN0XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChyc2x0ICE9PSB0cnVlICYmIHJzbHQucG9zICE9PSB1bmRlZmluZWQgJiYgcnNsdC5wb3MgIT09IHBvc2l0aW9uKSB7IC8vdGhlaXIgaXMgYSBwb3NpdGlvbiBvZmZzZXRcclxuXHRcdFx0XHRcdFx0XHRcdHZhbGlkYXRlZFBvcyA9IHJzbHQucG9zO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVmcmVzaEZyb21CdWZmZXIocG9zaXRpb24sIHZhbGlkYXRlZFBvcywgZ2V0QnVmZmVyKCkuc2xpY2UoKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAodmFsaWRhdGVkUG9zICE9PSBwb3NpdGlvbikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyc2x0ID0gJC5leHRlbmQocnNsdCwgaXNWYWxpZCh2YWxpZGF0ZWRQb3MsIGVsZW0sIHRydWUpKTsgLy9yZXZhbGlkYXRlIG5ldyBwb3NpdGlvbiBzdHJpY3RcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKHJzbHQgIT09IHRydWUgJiYgcnNsdC5wb3MgPT09IHVuZGVmaW5lZCAmJiByc2x0LmMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlOyAvL2JyZWFrb3V0IGlmIG5vdGhpbmcgdG8gaW5zZXJ0XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAobmR4ID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVzZXRNYXNrU2V0KHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCFzZXRWYWxpZFBvc2l0aW9uKHZhbGlkYXRlZFBvcywgJC5leHRlbmQoe30sIHRzdCwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcImlucHV0XCI6IGNhc2luZyhlbGVtLCB0ZXN0LCB2YWxpZGF0ZWRQb3MpXHJcblx0XHRcdFx0XHRcdFx0XHR9KSwgZnJvbVNldFZhbGlkLCBpc1NlbGVjdGlvbihwb3MpKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cnNsdCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7IC8vYnJlYWsgZnJvbSAkLmVhY2hcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdFx0cmV0dXJuIHJzbHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGFsdGVybmF0ZShwb3MsIGMsIHN0cmljdCkge1xyXG5cdFx0XHRcdHZhciB2YWxpZFBzQ2xvbmUgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zKSxcclxuXHRcdFx0XHRcdGxhc3RBbHQsXHJcblx0XHRcdFx0XHRhbHRlcm5hdGlvbixcclxuXHRcdFx0XHRcdGlzVmFsaWRSc2x0ID0gZmFsc2UsXHJcblx0XHRcdFx0XHRhbHRQb3MsIHByZXZBbHRQb3MsIGksIHZhbGlkUG9zLCBsQWx0UG9zID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSwgYWx0TmR4cywgZGVjaXNpb25Qb3M7XHJcblx0XHRcdFx0Ly9maW5kIGxhc3QgbW9kaWZpZWQgYWx0ZXJuYXRpb25cclxuXHRcdFx0XHRwcmV2QWx0UG9zID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2xBbHRQb3NdO1xyXG5cdFx0XHRcdGZvciAoOyBsQWx0UG9zID49IDA7IGxBbHRQb3MtLSkge1xyXG5cdFx0XHRcdFx0YWx0UG9zID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2xBbHRQb3NdO1xyXG5cdFx0XHRcdFx0aWYgKGFsdFBvcyAmJiBhbHRQb3MuYWx0ZXJuYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRsYXN0QWx0ID0gbEFsdFBvcztcclxuXHRcdFx0XHRcdFx0YWx0ZXJuYXRpb24gPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbbGFzdEFsdF0uYWx0ZXJuYXRpb247XHJcblx0XHRcdFx0XHRcdGlmIChwcmV2QWx0UG9zLmxvY2F0b3JbYWx0UG9zLmFsdGVybmF0aW9uXSAhPT0gYWx0UG9zLmxvY2F0b3JbYWx0UG9zLmFsdGVybmF0aW9uXSkge1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHByZXZBbHRQb3MgPSBhbHRQb3M7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChhbHRlcm5hdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRkZWNpc2lvblBvcyA9IHBhcnNlSW50KGxhc3RBbHQpO1xyXG5cdFx0XHRcdFx0dmFyIGRlY2lzaW9uVGFrZXIgPSBwcmV2QWx0UG9zLmxvY2F0b3JbcHJldkFsdFBvcy5hbHRlcm5hdGlvbiB8fCBhbHRlcm5hdGlvbl0gIT09IHVuZGVmaW5lZCA/IHByZXZBbHRQb3MubG9jYXRvcltwcmV2QWx0UG9zLmFsdGVybmF0aW9uIHx8IGFsdGVybmF0aW9uXSA6IGFsdE5keHNbMF07IC8vbm8gbWF0Y2ggaW4gdGhlIGFsdGVybmF0aW9ucyAobGVuZ3RoIG1pc21hdGNoKVxyXG5cdFx0XHRcdFx0aWYgKGRlY2lzaW9uVGFrZXIubGVuZ3RoID4gMCkgeyAvL25vIGRlY2lzaW9uIHRha2VuIH4gdGFrZSBmaXJzdCBvbmUgYXMgZGVjaWRlclxyXG5cdFx0XHRcdFx0XHRkZWNpc2lvblRha2VyID0gZGVjaXNpb25UYWtlci5zcGxpdChcIixcIilbMF07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR2YXIgcG9zc2liaWxpdHlQb3MgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbZGVjaXNpb25Qb3NdLCBwcmV2UG9zID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2RlY2lzaW9uUG9zIC0gMV07XHJcblx0XHRcdFx0XHQkLmVhY2goZ2V0VGVzdHMoZGVjaXNpb25Qb3MsIHByZXZQb3MgPyBwcmV2UG9zLmxvY2F0b3IgOiB1bmRlZmluZWQsIGRlY2lzaW9uUG9zIC0gMSksIGZ1bmN0aW9uIChuZHgsIHRlc3QpIHtcclxuXHRcdFx0XHRcdFx0YWx0TmR4cyA9IHRlc3QubG9jYXRvclthbHRlcm5hdGlvbl0gPyB0ZXN0LmxvY2F0b3JbYWx0ZXJuYXRpb25dLnRvU3RyaW5nKCkuc3BsaXQoXCIsXCIpIDogW107XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIG1uZHggPSAwOyBtbmR4IDwgYWx0TmR4cy5sZW5ndGg7IG1uZHgrKykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciB2YWxpZElucHV0cyA9IFtdLFxyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdGljSW5wdXRzQmVmb3JlUG9zID0gMCxcclxuXHRcdFx0XHRcdFx0XHRcdHN0YXRpY0lucHV0c0JlZm9yZVBvc0FsdGVybmF0ZSA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHR2ZXJpZnlWYWxpZElucHV0ID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGRlY2lzaW9uVGFrZXIgPCBhbHROZHhzW21uZHhdICYmICh0ZXN0Lm5hID09PSB1bmRlZmluZWQgfHwgJC5pbkFycmF5KGFsdE5keHNbbW5keF0sIHRlc3QubmEuc3BsaXQoXCIsXCIpKSA9PT0gLTEpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbZGVjaXNpb25Qb3NdID0gJC5leHRlbmQodHJ1ZSwge30sIHRlc3QpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBvc3NpYmlsaXRpZXMgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbZGVjaXNpb25Qb3NdLmxvY2F0b3I7XHJcblx0XHRcdFx0XHRcdFx0XHRnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbZGVjaXNpb25Qb3NdLmxvY2F0b3JbYWx0ZXJuYXRpb25dID0gcGFyc2VJbnQoYWx0TmR4c1ttbmR4XSk7IC8vc2V0IGZvcmNlZCBkZWNpc2lvblxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRlc3QubWF0Y2guZm4gPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAocG9zc2liaWxpdHlQb3MuaW5wdXQgIT09IHRlc3QubWF0Y2guZGVmKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmVyaWZ5VmFsaWRJbnB1dCA9IHRydWU7IC8vdmVyaWZ5IHRoYXQgdGhlIG5ldyBkZWZpbml0aW9uIG1hdGNoZXMgdGhlIGlucHV0XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHBvc3NpYmlsaXR5UG9zLmdlbmVyYXRlZElucHV0ICE9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWxpZElucHV0cy5wdXNoKHBvc3NpYmlsaXR5UG9zLmlucHV0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhdGljSW5wdXRzQmVmb3JlUG9zQWx0ZXJuYXRlKys7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tkZWNpc2lvblBvc10uZ2VuZXJhdGVkSW5wdXQgPSAhL1swLTlhLWJBLVpdLy50ZXN0KHRlc3QubWF0Y2guZGVmKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Z2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2RlY2lzaW9uUG9zXS5pbnB1dCA9IHRlc3QubWF0Y2guZGVmO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Z2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2RlY2lzaW9uUG9zXS5pbnB1dCA9IHBvc3NpYmlsaXR5UG9zLmlucHV0O1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChpID0gZGVjaXNpb25Qb3MgKyAxOyBpIDwgZ2V0TGFzdFZhbGlkUG9zaXRpb24odW5kZWZpbmVkLCB0cnVlKSArIDE7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWxpZFBvcyA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHZhbGlkUG9zICYmIHZhbGlkUG9zLmdlbmVyYXRlZElucHV0ICE9PSB0cnVlICYmIC9bMC05YS1iQS1aXS8udGVzdCh2YWxpZFBvcy5pbnB1dCkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YWxpZElucHV0cy5wdXNoKHZhbGlkUG9zLmlucHV0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChpIDwgcG9zKSBzdGF0aWNJbnB1dHNCZWZvcmVQb3MrKztcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGlmICh2ZXJpZnlWYWxpZElucHV0ICYmIHZhbGlkSW5wdXRzWzBdID09PSB0ZXN0Lm1hdGNoLmRlZikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWxpZElucHV0cy5zaGlmdCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzZXRNYXNrU2V0KHRydWUpOyAvL2NsZWFyIGdldGJ1ZmZlclxyXG5cdFx0XHRcdFx0XHRcdFx0aXNWYWxpZFJzbHQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKHZhbGlkSW5wdXRzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGlucHV0ID0gdmFsaWRJbnB1dHMuc2hpZnQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGlucHV0ICE9PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIShpc1ZhbGlkUnNsdCA9IGlzVmFsaWQoZ2V0TGFzdFZhbGlkUG9zaXRpb24odW5kZWZpbmVkLCB0cnVlKSArIDEsIGlucHV0LCBmYWxzZSwgZnJvbVNldFZhbGlkLCB0cnVlKSkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChpc1ZhbGlkUnNsdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbZGVjaXNpb25Qb3NdLmxvY2F0b3IgPSBwb3NzaWJpbGl0aWVzOyAvL3Jlc2V0IGZvcmNlZGRlY2lzaW9uIH4gbmVlZGVkIGZvciBwcm9wZXIgZGVsZXRlXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciB0YXJnZXRMdnAgPSBnZXRMYXN0VmFsaWRQb3NpdGlvbihwb3MpICsgMTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChpID0gZGVjaXNpb25Qb3MgKyAxOyBpIDwgZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSArIDE7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhbGlkUG9zID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2ldO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICgodmFsaWRQb3MgPT09IHVuZGVmaW5lZCB8fCB2YWxpZFBvcy5tYXRjaC5mbiA9PSBudWxsKSAmJiBpIDwgKHBvcyArIChzdGF0aWNJbnB1dHNCZWZvcmVQb3NBbHRlcm5hdGUgLSBzdGF0aWNJbnB1dHNCZWZvcmVQb3MpKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3RhdGljSW5wdXRzQmVmb3JlUG9zQWx0ZXJuYXRlKys7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdHBvcyA9IHBvcyArIChzdGF0aWNJbnB1dHNCZWZvcmVQb3NBbHRlcm5hdGUgLSBzdGF0aWNJbnB1dHNCZWZvcmVQb3MpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpc1ZhbGlkUnNsdCA9IGlzVmFsaWQocG9zID4gdGFyZ2V0THZwID8gdGFyZ2V0THZwIDogcG9zLCBjLCBzdHJpY3QsIGZyb21TZXRWYWxpZCwgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzVmFsaWRSc2x0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc2V0TWFza1NldCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdmFsaWRQc0Nsb25lKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSByZXR1cm4gZmFsc2U7IC8vZXhpdCAkLmVhY2hcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIGlzVmFsaWRSc2x0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL3NldCBhbHRlcm5hdG9yIGNob2ljZSBvbiBwcmV2aW91cyBza2lwcGVkIHBsYWNlaG9sZGVyIHBvc2l0aW9uc1xyXG5cdFx0XHRmdW5jdGlvbiB0cmFja2JhY2tBbHRlcm5hdGlvbnMob3JpZ2luYWxQb3MsIG5ld1Bvcykge1xyXG5cdFx0XHRcdHZhciB2cCA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tuZXdQb3NdO1xyXG5cdFx0XHRcdGlmICh2cCkge1xyXG5cdFx0XHRcdFx0dmFyIHRhcmdldExvY2F0b3IgPSB2cC5sb2NhdG9yLFxyXG5cdFx0XHRcdFx0XHR0bGwgPSB0YXJnZXRMb2NhdG9yLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0XHRmb3IgKHZhciBwcyA9IG9yaWdpbmFsUG9zOyBwcyA8IG5ld1BvczsgcHMrKykge1xyXG5cdFx0XHRcdFx0XHRpZiAoZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3BzXSA9PT0gdW5kZWZpbmVkICYmICFpc01hc2socHMsIHRydWUpKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHRlc3RzID0gZ2V0VGVzdHMocHMpLFxyXG5cdFx0XHRcdFx0XHRcdFx0YmVzdE1hdGNoID0gdGVzdHNbMF0sXHJcblx0XHRcdFx0XHRcdFx0XHRlcXVhbGl0eSA9IC0xO1xyXG5cdFx0XHRcdFx0XHRcdCQuZWFjaCh0ZXN0cywgZnVuY3Rpb24gKG5keCwgdHN0KSB7IC8vZmluZCBiZXN0IG1hdGNoaW5nXHJcblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRsbDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0c3QubG9jYXRvcltpXSAhPT0gdW5kZWZpbmVkICYmIGNoZWNrQWx0ZXJuYXRpb25NYXRjaCh0c3QubG9jYXRvcltpXS50b1N0cmluZygpLnNwbGl0KFwiLFwiKSwgdGFyZ2V0TG9jYXRvcltpXS50b1N0cmluZygpLnNwbGl0KFwiLFwiKSkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoZXF1YWxpdHkgPCBpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcXVhbGl0eSA9IGk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiZXN0TWF0Y2ggPSB0c3Q7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0c2V0VmFsaWRQb3NpdGlvbihwcywgJC5leHRlbmQoe30sIGJlc3RNYXRjaCwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XCJpbnB1dFwiOiBiZXN0TWF0Y2gubWF0Y2gucGxhY2Vob2xkZXIgfHwgYmVzdE1hdGNoLm1hdGNoLmRlZlxyXG5cdFx0XHRcdFx0XHRcdH0pLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gc2V0VmFsaWRQb3NpdGlvbihwb3MsIHZhbGlkVGVzdCwgZnJvbVNldFZhbGlkLCBpc1NlbGVjdGlvbikge1xyXG5cdFx0XHRcdGlmIChpc1NlbGVjdGlvbiB8fCAob3B0cy5pbnNlcnRNb2RlICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdICE9PSB1bmRlZmluZWQgJiYgZnJvbVNldFZhbGlkID09PSB1bmRlZmluZWQpKSB7XHJcblx0XHRcdFx0XHQvL3JlcG9zaXRpb24gJiByZXZhbGlkYXRlIG90aGVyc1xyXG5cdFx0XHRcdFx0dmFyIHBvc2l0aW9uc0Nsb25lID0gJC5leHRlbmQodHJ1ZSwge30sIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucyksXHJcblx0XHRcdFx0XHRcdGx2cCA9IGdldExhc3RWYWxpZFBvc2l0aW9uKHVuZGVmaW5lZCwgdHJ1ZSksXHJcblx0XHRcdFx0XHRcdGk7XHJcblx0XHRcdFx0XHRmb3IgKGkgPSBwb3M7IGkgPD0gbHZwOyBpKyspIHsgLy9jbGVhciBzZWxlY3Rpb25cclxuXHRcdFx0XHRcdFx0ZGVsZXRlIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdID0gJC5leHRlbmQodHJ1ZSwge30sIHZhbGlkVGVzdCk7XHJcblx0XHRcdFx0XHR2YXIgdmFsaWQgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRqLCB2cHMgPSBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnMsIG5lZWRzVmFsaWRhdGlvbiA9IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRpbml0aWFsTGVuZ3RoID0gZ2V0TWFza1NldCgpLm1hc2tMZW5ndGg7XHJcblx0XHRcdFx0XHRmb3IgKGkgPSAoaiA9IHBvcyk7IGkgPD0gbHZwOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0dmFyIHQgPSBwb3NpdGlvbnNDbG9uZVtpXTtcclxuXHRcdFx0XHRcdFx0aWYgKHQgIT09IHVuZGVmaW5lZCAvKiYmICh0LmdlbmVyYXRlZElucHV0ICE9PSB0cnVlIHx8IHQubWF0Y2guZm4gPT09IG51bGwpKi8pIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcG9zTWF0Y2ggPSBqO1xyXG5cdFx0XHRcdFx0XHRcdHdoaWxlIChwb3NNYXRjaCA8IGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoICYmICgodC5tYXRjaC5mbiA9PT0gbnVsbCAmJiB2cHNbaV0gJiYgKHZwc1tpXS5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgPT09IHRydWUgfHwgdnBzW2ldLm1hdGNoLm9wdGlvbmFsaXR5ID09PSB0cnVlKSkgfHwgdC5tYXRjaC5mbiAhPSBudWxsKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cG9zTWF0Y2grKztcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChuZWVkc1ZhbGlkYXRpb24gPT09IGZhbHNlICYmIHBvc2l0aW9uc0Nsb25lW3Bvc01hdGNoXSAmJiBwb3NpdGlvbnNDbG9uZVtwb3NNYXRjaF0ubWF0Y2guZGVmID09PSB0Lm1hdGNoLmRlZikgeyAvL29idmlvdXMgbWF0Y2hcclxuXHRcdFx0XHRcdFx0XHRcdFx0Z2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc01hdGNoXSA9ICQuZXh0ZW5kKHRydWUsIHt9LCBwb3NpdGlvbnNDbG9uZVtwb3NNYXRjaF0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zTWF0Y2hdLmlucHV0ID0gdC5pbnB1dDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZmlsbE1pc3NpbmdOb25NYXNrKHBvc01hdGNoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aiA9IHBvc01hdGNoO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHBvc2l0aW9uQ2FuTWF0Y2hEZWZpbml0aW9uKHBvc01hdGNoLCB0Lm1hdGNoLmRlZikpIHsgLy92YWxpZGF0ZWQgbWF0Y2hcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IGlzVmFsaWQocG9zTWF0Y2gsIHQuaW5wdXQsIHRydWUsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWxpZCA9IHJlc3VsdCAhPT0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGogPSAocmVzdWx0LmNhcmV0IHx8IHJlc3VsdC5pbnNlcnQpID8gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSA6IHBvc01hdGNoO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRuZWVkc1ZhbGlkYXRpb24gPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsaWQgPSB0LmdlbmVyYXRlZElucHV0ID09PSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoIDwgaW5pdGlhbExlbmd0aCkgZ2V0TWFza1NldCgpLm1hc2tMZW5ndGggPSBpbml0aWFsTGVuZ3RoOyAvL2EgYml0IGhhY2t5IGJ1dCB0aGUgbWFza2xlbmd0aCBpcyBjb3JyZWN0ZWQgbGF0ZXIgb25cclxuXHRcdFx0XHRcdFx0XHRcdGlmICh2YWxpZCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmICghdmFsaWQpIGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICghdmFsaWQpIHtcclxuXHRcdFx0XHRcdFx0Z2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHBvc2l0aW9uc0Nsb25lKTtcclxuXHRcdFx0XHRcdFx0cmVzZXRNYXNrU2V0KHRydWUpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zXSA9ICQuZXh0ZW5kKHRydWUsIHt9LCB2YWxpZFRlc3QpO1xyXG5cdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0cmVzZXRNYXNrU2V0KHRydWUpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBmaWxsTWlzc2luZ05vbk1hc2sobWFza1Bvcykge1xyXG5cdFx0XHRcdC8vQ2hlY2sgZm9yIGEgbm9ubWFzayBiZWZvcmUgdGhlIHBvc1xyXG5cdFx0XHRcdC8vZmluZCBwcmV2aW91cyB2YWxpZFxyXG5cdFx0XHRcdGZvciAodmFyIHBuZHggPSBtYXNrUG9zIC0gMTsgcG5keCA+IC0xOyBwbmR4LS0pIHtcclxuXHRcdFx0XHRcdGlmIChnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG5keF0pIGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLy8vZmlsbCBtaXNzaW5nIG5vbm1hc2sgYW5kIHZhbGlkIHBsYWNlaG9sZGVyc1xyXG5cdFx0XHRcdHZhciB0ZXN0VGVtcGxhdGUsIHRlc3RzRnJvbVBvcztcclxuXHRcdFx0XHRmb3IgKHBuZHgrKzsgcG5keCA8IG1hc2tQb3M7IHBuZHgrKykge1xyXG5cdFx0XHRcdFx0aWYgKGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twbmR4XSA9PT0gdW5kZWZpbmVkICYmIChvcHRzLmppdE1hc2tpbmcgPT09IGZhbHNlIHx8IG9wdHMuaml0TWFza2luZyA+IHBuZHgpKSB7XHJcblx0XHRcdFx0XHRcdHRlc3RzRnJvbVBvcyA9IGdldFRlc3RzKHBuZHgsIGdldFRlc3RUZW1wbGF0ZShwbmR4IC0gMSkubG9jYXRvciwgcG5keCAtIDEpLnNsaWNlKCk7XHJcblx0XHRcdFx0XHRcdGlmICh0ZXN0c0Zyb21Qb3NbdGVzdHNGcm9tUG9zLmxlbmd0aCAtIDFdLm1hdGNoLmRlZiA9PT0gXCJcIikgdGVzdHNGcm9tUG9zLnBvcCgpO1xyXG5cdFx0XHRcdFx0XHR0ZXN0VGVtcGxhdGUgPSBkZXRlcm1pbmVUZXN0VGVtcGxhdGUodGVzdHNGcm9tUG9zKTtcclxuXHRcdFx0XHRcdFx0aWYgKHRlc3RUZW1wbGF0ZSAmJiAodGVzdFRlbXBsYXRlLm1hdGNoLmRlZiA9PT0gb3B0cy5yYWRpeFBvaW50RGVmaW5pdGlvblN5bWJvbCB8fCAhaXNNYXNrKHBuZHgsIHRydWUpIHx8XHJcblx0XHRcdFx0XHRcdFx0KCQuaW5BcnJheShvcHRzLnJhZGl4UG9pbnQsIGdldEJ1ZmZlcigpKSA8IHBuZHggJiYgdGVzdFRlbXBsYXRlLm1hdGNoLmZuICYmIHRlc3RUZW1wbGF0ZS5tYXRjaC5mbi50ZXN0KGdldFBsYWNlaG9sZGVyKHBuZHgpLCBnZXRNYXNrU2V0KCksIHBuZHgsIGZhbHNlLCBvcHRzKSkpKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gX2lzVmFsaWQocG5keCwgdGVzdFRlbXBsYXRlLm1hdGNoLnBsYWNlaG9sZGVyIHx8ICh0ZXN0VGVtcGxhdGUubWF0Y2guZm4gPT0gbnVsbCA/IHRlc3RUZW1wbGF0ZS5tYXRjaC5kZWYgOiAoZ2V0UGxhY2Vob2xkZXIocG5keCkgIT09IFwiXCIgPyBnZXRQbGFjZWhvbGRlcihwbmR4KSA6IGdldEJ1ZmZlcigpW3BuZHhdKSksIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcmVzdWx0LnBvcyB8fCBwbmR4XS5nZW5lcmF0ZWRJbnB1dCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcmVzdWx0ID0gZmFsc2UsXHJcblx0XHRcdFx0cG9zaXRpb25zQ2xvbmUgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zKTsgLy9jbG9uZSB0aGUgY3VycmVudFBvc2l0aW9uc1xyXG5cclxuXHRcdFx0ZmlsbE1pc3NpbmdOb25NYXNrKG1hc2tQb3MpO1xyXG5cclxuXHRcdFx0aWYgKGlzU2VsZWN0aW9uKHBvcykpIHtcclxuXHRcdFx0XHRoYW5kbGVSZW1vdmUodW5kZWZpbmVkLCBJbnB1dG1hc2sua2V5Q29kZS5ERUxFVEUsIHBvcyk7XHJcblx0XHRcdFx0bWFza1BvcyA9IGdldE1hc2tTZXQoKS5wO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobWFza1BvcyA8IGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVzdWx0ID0gX2lzVmFsaWQobWFza1BvcywgYywgc3RyaWN0KTtcclxuXHRcdFx0XHRpZiAoKCFzdHJpY3QgfHwgZnJvbVNldFZhbGlkID09PSB0cnVlKSAmJiByZXN1bHQgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHR2YXIgY3VycmVudFBvc1ZhbGlkID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW21hc2tQb3NdO1xyXG5cdFx0XHRcdFx0aWYgKGN1cnJlbnRQb3NWYWxpZCAmJiBjdXJyZW50UG9zVmFsaWQubWF0Y2guZm4gPT09IG51bGwgJiYgKGN1cnJlbnRQb3NWYWxpZC5tYXRjaC5kZWYgPT09IGMgfHwgYyA9PT0gb3B0cy5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyKSkge1xyXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB7XHJcblx0XHRcdFx0XHRcdFx0XCJjYXJldFwiOiBzZWVrTmV4dChtYXNrUG9zKVxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICgob3B0cy5pbnNlcnRNb2RlIHx8IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tzZWVrTmV4dChtYXNrUG9zKV0gPT09IHVuZGVmaW5lZCkgJiYgIWlzTWFzayhtYXNrUG9zLCB0cnVlKSkgeyAvL2RvZXMgdGhlIGlucHV0IG1hdGNoIG9uIGEgZnVydGhlciBwb3NpdGlvbj9cclxuXHRcdFx0XHRcdFx0dmFyIHRlc3RzRnJvbVBvcyA9IGdldFRlc3RzKG1hc2tQb3MpLnNsaWNlKCk7XHJcblx0XHRcdFx0XHRcdGlmICh0ZXN0c0Zyb21Qb3NbdGVzdHNGcm9tUG9zLmxlbmd0aCAtIDFdLm1hdGNoLmRlZiA9PT0gXCJcIikgdGVzdHNGcm9tUG9zLnBvcCgpO1xyXG5cdFx0XHRcdFx0XHR2YXIgc3RhdGljQ2hhciA9IGRldGVybWluZVRlc3RUZW1wbGF0ZSh0ZXN0c0Zyb21Qb3MsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRpZiAoc3RhdGljQ2hhciAmJiBzdGF0aWNDaGFyLm1hdGNoLmZuID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0c3RhdGljQ2hhciA9IHN0YXRpY0NoYXIubWF0Y2gucGxhY2Vob2xkZXIgfHwgc3RhdGljQ2hhci5tYXRjaC5kZWY7XHJcblx0XHRcdFx0XHRcdFx0X2lzVmFsaWQobWFza1Bvcywgc3RhdGljQ2hhciwgc3RyaWN0KTtcclxuXHRcdFx0XHRcdFx0XHRnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbbWFza1Bvc10uZ2VuZXJhdGVkSW5wdXQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIG5Qb3MgPSBtYXNrUG9zICsgMSwgc25Qb3MgPSBzZWVrTmV4dChtYXNrUG9zKTsgblBvcyA8PSBzblBvczsgblBvcysrKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gX2lzVmFsaWQoblBvcywgYywgc3RyaWN0KTtcclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzdWx0ICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dHJhY2tiYWNrQWx0ZXJuYXRpb25zKG1hc2tQb3MsIHJlc3VsdC5wb3MgIT09IHVuZGVmaW5lZCA/IHJlc3VsdC5wb3MgOiBuUG9zKTtcclxuXHRcdFx0XHRcdFx0XHRcdG1hc2tQb3MgPSBuUG9zO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChyZXN1bHQgPT09IGZhbHNlICYmIG9wdHMua2VlcFN0YXRpYyAmJiAhc3RyaWN0ICYmIGZyb21BbHRlcm5hdGUgIT09IHRydWUpIHsgLy90cnkgZnV6enkgYWx0ZXJuYXRvciBsb2dpY1xyXG5cdFx0XHRcdHJlc3VsdCA9IGFsdGVybmF0ZShtYXNrUG9zLCBjLCBzdHJpY3QpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSB7XHJcblx0XHRcdFx0XHRcInBvc1wiOiBtYXNrUG9zXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKG9wdHMucG9zdFZhbGlkYXRpb24pICYmIHJlc3VsdCAhPT0gZmFsc2UgJiYgIXN0cmljdCAmJiBmcm9tU2V0VmFsaWQgIT09IHRydWUpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSBvcHRzLnBvc3RWYWxpZGF0aW9uKGdldEJ1ZmZlcih0cnVlKSwgcmVzdWx0LCBvcHRzKSA/IHJlc3VsdCA6IGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocmVzdWx0LnBvcyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0cmVzdWx0LnBvcyA9IG1hc2tQb3M7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmVzZXRNYXNrU2V0KHRydWUpO1xyXG5cdFx0XHRcdGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBwb3NpdGlvbnNDbG9uZSk7IC8vcmV2ZXJ0IHZhbGlkYXRpb24gY2hhbmdlc1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGlzTWFzayhwb3MsIHN0cmljdCkge1xyXG5cdFx0XHR2YXIgdGVzdDtcclxuXHRcdFx0aWYgKHN0cmljdCkge1xyXG5cdFx0XHRcdHRlc3QgPSBnZXRUZXN0VGVtcGxhdGUocG9zKS5tYXRjaDtcclxuXHRcdFx0XHRpZiAodGVzdC5kZWYgPT09IFwiXCIpIHRlc3QgPSBnZXRUZXN0KHBvcykubWF0Y2g7XHJcblx0XHRcdH0gZWxzZSB0ZXN0ID0gZ2V0VGVzdChwb3MpLm1hdGNoO1xyXG5cclxuXHRcdFx0aWYgKHRlc3QuZm4gIT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB0ZXN0LmZuO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHN0cmljdCAhPT0gdHJ1ZSAmJiBwb3MgPiAtMSkge1xyXG5cdFx0XHRcdHZhciB0ZXN0cyA9IGdldFRlc3RzKHBvcyk7XHJcblx0XHRcdFx0cmV0dXJuIHRlc3RzLmxlbmd0aCA+IDEgKyAodGVzdHNbdGVzdHMubGVuZ3RoIC0gMV0ubWF0Y2guZGVmID09PSBcIlwiID8gMSA6IDApO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZWVrTmV4dChwb3MsIG5ld0Jsb2NrKSB7XHJcblx0XHRcdHZhciBtYXNrTCA9IGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoO1xyXG5cdFx0XHRpZiAocG9zID49IG1hc2tMKSByZXR1cm4gbWFza0w7XHJcblx0XHRcdHZhciBwb3NpdGlvbiA9IHBvcztcclxuXHRcdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBtYXNrTCAmJlxyXG5cdFx0XHQoKG5ld0Jsb2NrID09PSB0cnVlICYmIChnZXRUZXN0KHBvc2l0aW9uKS5tYXRjaC5uZXdCbG9ja01hcmtlciAhPT0gdHJ1ZSB8fCAhaXNNYXNrKHBvc2l0aW9uKSkpIHx8XHJcblx0XHRcdChuZXdCbG9jayAhPT0gdHJ1ZSAmJiAhaXNNYXNrKHBvc2l0aW9uKSkpKSB7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHBvc2l0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNlZWtQcmV2aW91cyhwb3MsIG5ld0Jsb2NrKSB7XHJcblx0XHRcdHZhciBwb3NpdGlvbiA9IHBvcywgdGVzdHM7XHJcblx0XHRcdGlmIChwb3NpdGlvbiA8PSAwKSByZXR1cm4gMDtcclxuXHJcblx0XHRcdHdoaWxlICgtLXBvc2l0aW9uID4gMCAmJlxyXG5cdFx0XHQoKG5ld0Jsb2NrID09PSB0cnVlICYmIGdldFRlc3QocG9zaXRpb24pLm1hdGNoLm5ld0Jsb2NrTWFya2VyICE9PSB0cnVlKSB8fFxyXG5cdFx0XHQobmV3QmxvY2sgIT09IHRydWUgJiYgIWlzTWFzayhwb3NpdGlvbikgJiZcclxuXHRcdFx0KHRlc3RzID0gZ2V0VGVzdHMocG9zaXRpb24pLCB0ZXN0cy5sZW5ndGggPCAyIHx8ICh0ZXN0cy5sZW5ndGggPT09IDIgJiYgdGVzdHNbMV0ubWF0Y2guZGVmID09PSBcIlwiKSkpKSkge1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcG9zaXRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0QnVmZmVyRWxlbWVudChwb3NpdGlvbikge1xyXG5cdFx0XHRyZXR1cm4gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc2l0aW9uXSA9PT0gdW5kZWZpbmVkID8gZ2V0UGxhY2Vob2xkZXIocG9zaXRpb24pIDogZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc2l0aW9uXS5pbnB1dDtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiB3cml0ZUJ1ZmZlcihpbnB1dCwgYnVmZmVyLCBjYXJldFBvcywgZXZlbnQsIHRyaWdnZXJJbnB1dEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCAmJiAkLmlzRnVuY3Rpb24ob3B0cy5vbkJlZm9yZVdyaXRlKSkge1xyXG5cdFx0XHRcdHZhciByZXN1bHQgPSBvcHRzLm9uQmVmb3JlV3JpdGUoZXZlbnQsIGJ1ZmZlciwgY2FyZXRQb3MsIG9wdHMpO1xyXG5cdFx0XHRcdGlmIChyZXN1bHQpIHtcclxuXHRcdFx0XHRcdGlmIChyZXN1bHQucmVmcmVzaEZyb21CdWZmZXIpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHJlZnJlc2ggPSByZXN1bHQucmVmcmVzaEZyb21CdWZmZXI7XHJcblx0XHRcdFx0XHRcdHJlZnJlc2hGcm9tQnVmZmVyKHJlZnJlc2ggPT09IHRydWUgPyByZWZyZXNoIDogcmVmcmVzaC5zdGFydCwgcmVmcmVzaC5lbmQsIHJlc3VsdC5idWZmZXIgfHwgYnVmZmVyKTtcclxuXHRcdFx0XHRcdFx0YnVmZmVyID0gZ2V0QnVmZmVyKHRydWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly9vbmx5IGFsdGVyIHdoZW4gaW50ZW50ZWQgIT09IHVuZGVmaW5lZFxyXG5cdFx0XHRcdFx0aWYgKGNhcmV0UG9zICE9PSB1bmRlZmluZWQpIGNhcmV0UG9zID0gcmVzdWx0LmNhcmV0ICE9PSB1bmRlZmluZWQgPyByZXN1bHQuY2FyZXQgOiBjYXJldFBvcztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aW5wdXQuaW5wdXRtYXNrLl92YWx1ZVNldChidWZmZXIuam9pbihcIlwiKSk7XHJcblx0XHRcdGlmIChjYXJldFBvcyAhPT0gdW5kZWZpbmVkICYmIChldmVudCA9PT0gdW5kZWZpbmVkIHx8IGV2ZW50LnR5cGUgIT09IFwiYmx1clwiKSkge1xyXG5cdFx0XHRcdGNhcmV0KGlucHV0LCBjYXJldFBvcyk7XHJcblx0XHRcdH0gZWxzZSByZW5kZXJDb2xvck1hc2soaW5wdXQsIGJ1ZmZlciwgY2FyZXRQb3MpO1xyXG5cdFx0XHRpZiAodHJpZ2dlcklucHV0RXZlbnQgPT09IHRydWUpIHtcclxuXHRcdFx0XHRza2lwSW5wdXRFdmVudCA9IHRydWU7XHJcblx0XHRcdFx0JChpbnB1dCkudHJpZ2dlcihcImlucHV0XCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0UGxhY2Vob2xkZXIocG9zLCB0ZXN0KSB7XHJcblx0XHRcdHRlc3QgPSB0ZXN0IHx8IGdldFRlc3QocG9zKS5tYXRjaDtcclxuXHRcdFx0aWYgKHRlc3QucGxhY2Vob2xkZXIgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHJldHVybiB0ZXN0LnBsYWNlaG9sZGVyO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRlc3QuZm4gPT09IG51bGwpIHtcclxuXHRcdFx0XHRpZiAocG9zID4gLTEgJiYgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvc10gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0dmFyIHRlc3RzID0gZ2V0VGVzdHMocG9zKSxcclxuXHRcdFx0XHRcdFx0c3RhdGljQWx0ZXJuYXRpb25zID0gW10sXHJcblx0XHRcdFx0XHRcdHByZXZUZXN0O1xyXG5cdFx0XHRcdFx0aWYgKHRlc3RzLmxlbmd0aCA+IDEgKyAodGVzdHNbdGVzdHMubGVuZ3RoIC0gMV0ubWF0Y2guZGVmID09PSBcIlwiID8gMSA6IDApKSB7XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGVzdHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAodGVzdHNbaV0ubWF0Y2gub3B0aW9uYWxpdHkgIT09IHRydWUgJiYgdGVzdHNbaV0ubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyICE9PSB0cnVlICYmXHJcblx0XHRcdFx0XHRcdFx0XHQodGVzdHNbaV0ubWF0Y2guZm4gPT09IG51bGwgfHwgKHByZXZUZXN0ID09PSB1bmRlZmluZWQgfHwgdGVzdHNbaV0ubWF0Y2guZm4udGVzdChwcmV2VGVzdC5tYXRjaC5kZWYsIGdldE1hc2tTZXQoKSwgcG9zLCB0cnVlLCBvcHRzKSAhPT0gZmFsc2UpKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdGljQWx0ZXJuYXRpb25zLnB1c2godGVzdHNbaV0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRlc3RzW2ldLm1hdGNoLmZuID09PSBudWxsKSBwcmV2VGVzdCA9IHRlc3RzW2ldO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHN0YXRpY0FsdGVybmF0aW9ucy5sZW5ndGggPiAxKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICgvWzAtOWEtYkEtWl0vLnRlc3Qoc3RhdGljQWx0ZXJuYXRpb25zWzBdLm1hdGNoLmRlZikpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gb3B0cy5wbGFjZWhvbGRlci5jaGFyQXQocG9zICUgb3B0cy5wbGFjZWhvbGRlci5sZW5ndGgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiB0ZXN0LmRlZjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIG9wdHMucGxhY2Vob2xkZXIuY2hhckF0KHBvcyAlIG9wdHMucGxhY2Vob2xkZXIubGVuZ3RoKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBjaGVja1ZhbChpbnB1dCwgd3JpdGVPdXQsIHN0cmljdCwgbnB0dmwsIGluaXRpYXRpbmdFdmVudCwgc3RpY2t5Q2FyZXQpIHtcclxuXHRcdFx0dmFyIGlucHV0VmFsdWUgPSBucHR2bC5zbGljZSgpLFxyXG5cdFx0XHRcdGNoYXJDb2RlcyA9IFwiXCIsXHJcblx0XHRcdFx0aW5pdGlhbE5keCA9IDAsIHJlc3VsdCA9IHVuZGVmaW5lZDtcclxuXHJcblx0XHRcdGZ1bmN0aW9uIGlzVGVtcGxhdGVNYXRjaCgpIHtcclxuXHRcdFx0XHR2YXIgaXNNYXRjaCA9IGZhbHNlO1xyXG5cdFx0XHRcdHZhciBjaGFyQ29kZU5keCA9IGdldEJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoaW5pdGlhbE5keCwgc2Vla05leHQoaW5pdGlhbE5keCkpLmpvaW4oXCJcIikuaW5kZXhPZihjaGFyQ29kZXMpO1xyXG5cdFx0XHRcdGlmIChjaGFyQ29kZU5keCAhPT0gLTEgJiYgIWlzTWFzayhpbml0aWFsTmR4KSkge1xyXG5cdFx0XHRcdFx0aXNNYXRjaCA9IHRydWU7XHJcblx0XHRcdFx0XHR2YXIgYnVmZmVyVGVtcGxhdGVBcnIgPSBnZXRCdWZmZXJUZW1wbGF0ZSgpLnNsaWNlKGluaXRpYWxOZHgsIGluaXRpYWxOZHggKyBjaGFyQ29kZU5keCk7XHJcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGJ1ZmZlclRlbXBsYXRlQXJyLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdGlmIChidWZmZXJUZW1wbGF0ZUFycltpXSAhPT0gXCIgXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRpc01hdGNoID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBpc01hdGNoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXNldE1hc2tTZXQoKTtcclxuXHRcdFx0Z2V0TWFza1NldCgpLnAgPSBzZWVrTmV4dCgtMSk7XHJcblx0XHRcdC8vIGlmICh3cml0ZU91dCkgaW5wdXQuaW5wdXRtYXNrLl92YWx1ZVNldChcIlwiKTsgLy9pbml0aWFsIGNsZWFyXHJcblxyXG5cdFx0XHRpZiAoIXN0cmljdCkge1xyXG5cdFx0XHRcdGlmIChvcHRzLmF1dG9Vbm1hc2sgIT09IHRydWUpIHtcclxuXHRcdFx0XHRcdHZhciBzdGF0aWNJbnB1dCA9IGdldEJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoMCwgc2Vla05leHQoLTEpKS5qb2luKFwiXCIpLFxyXG5cdFx0XHRcdFx0XHRtYXRjaGVzID0gaW5wdXRWYWx1ZS5qb2luKFwiXCIpLm1hdGNoKG5ldyBSZWdFeHAoXCJeXCIgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgoc3RhdGljSW5wdXQpLCBcImdcIikpO1xyXG5cdFx0XHRcdFx0aWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdGlucHV0VmFsdWUuc3BsaWNlKDAsIG1hdGNoZXMubGVuZ3RoICogc3RhdGljSW5wdXQubGVuZ3RoKTtcclxuXHRcdFx0XHRcdFx0aW5pdGlhbE5keCA9IHNlZWtOZXh0KGluaXRpYWxOZHgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpbml0aWFsTmR4ID0gc2Vla05leHQoaW5pdGlhbE5keCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0JC5lYWNoKGlucHV0VmFsdWUsIGZ1bmN0aW9uIChuZHgsIGNoYXJDb2RlKSB7XHJcblx0XHRcdFx0aWYgKGNoYXJDb2RlICE9PSB1bmRlZmluZWQpIHsgLy9pbnB1dGZhbGxiYWNrIHN0cmlwcyBzb21lIGVsZW1lbnRzIG91dCBvZiB0aGUgaW5wdXRhcnJheS4gICQuZWFjaCBsb2dpY2FsbHkgcHJlc2VudHMgdGhlbSBhcyB1bmRlZmluZWRcclxuXHRcdFx0XHRcdHZhciBrZXlwcmVzcyA9IG5ldyAkLkV2ZW50KFwia2V5cHJlc3NcIik7XHJcblx0XHRcdFx0XHRrZXlwcmVzcy53aGljaCA9IGNoYXJDb2RlLmNoYXJDb2RlQXQoMCk7XHJcblx0XHRcdFx0XHRjaGFyQ29kZXMgKz0gY2hhckNvZGU7XHJcblx0XHRcdFx0XHR2YXIgbHZwID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24odW5kZWZpbmVkLCB0cnVlKSxcclxuXHRcdFx0XHRcdFx0bHZUZXN0ID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2x2cF0sXHJcblx0XHRcdFx0XHRcdG5leHRUZXN0ID0gZ2V0VGVzdFRlbXBsYXRlKGx2cCArIDEsIGx2VGVzdCA/IGx2VGVzdC5sb2NhdG9yLnNsaWNlKCkgOiB1bmRlZmluZWQsIGx2cCk7XHJcblx0XHRcdFx0XHRpZiAoIWlzVGVtcGxhdGVNYXRjaCgpIHx8IHN0cmljdCB8fCBvcHRzLmF1dG9Vbm1hc2spIHtcclxuXHRcdFx0XHRcdFx0dmFyIHBvcyA9IHN0cmljdCA/IG5keCA6IChuZXh0VGVzdC5tYXRjaC5mbiA9PSBudWxsICYmIG5leHRUZXN0Lm1hdGNoLm9wdGlvbmFsaXR5ICYmIChsdnAgKyAxKSA8IGdldE1hc2tTZXQoKS5wID8gbHZwICsgMSA6IGdldE1hc2tTZXQoKS5wKTtcclxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gRXZlbnRIYW5kbGVycy5rZXlwcmVzc0V2ZW50LmNhbGwoaW5wdXQsIGtleXByZXNzLCB0cnVlLCBmYWxzZSwgc3RyaWN0LCBwb3MpO1xyXG5cdFx0XHRcdFx0XHRpbml0aWFsTmR4ID0gcG9zICsgMTtcclxuXHRcdFx0XHRcdFx0Y2hhckNvZGVzID0gXCJcIjtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJlc3VsdCA9IEV2ZW50SGFuZGxlcnMua2V5cHJlc3NFdmVudC5jYWxsKGlucHV0LCBrZXlwcmVzcywgdHJ1ZSwgZmFsc2UsIHRydWUsIGx2cCArIDEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKCFzdHJpY3QgJiYgJC5pc0Z1bmN0aW9uKG9wdHMub25CZWZvcmVXcml0ZSkpIHtcclxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gb3B0cy5vbkJlZm9yZVdyaXRlKGtleXByZXNzLCBnZXRCdWZmZXIoKSwgcmVzdWx0LmZvcndhcmRQb3NpdGlvbiwgb3B0cyk7XHJcblx0XHRcdFx0XHRcdGlmIChyZXN1bHQgJiYgcmVzdWx0LnJlZnJlc2hGcm9tQnVmZmVyKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHJlZnJlc2ggPSByZXN1bHQucmVmcmVzaEZyb21CdWZmZXI7XHJcblx0XHRcdFx0XHRcdFx0cmVmcmVzaEZyb21CdWZmZXIocmVmcmVzaCA9PT0gdHJ1ZSA/IHJlZnJlc2ggOiByZWZyZXNoLnN0YXJ0LCByZWZyZXNoLmVuZCwgcmVzdWx0LmJ1ZmZlcik7XHJcblx0XHRcdFx0XHRcdFx0cmVzZXRNYXNrU2V0KHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQuY2FyZXQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGdldE1hc2tTZXQoKS5wID0gcmVzdWx0LmNhcmV0O1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmICh3cml0ZU91dCkge1xyXG5cdFx0XHRcdHZhciBjYXJldFBvcyA9IHVuZGVmaW5lZCwgbHZwID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oKTtcclxuXHRcdFx0XHRpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gaW5wdXQgJiYgKGluaXRpYXRpbmdFdmVudCB8fCByZXN1bHQpKSB7XHJcblx0XHRcdFx0XHRjYXJldFBvcyA9IGNhcmV0KGlucHV0KS5iZWdpbjtcclxuXHRcdFx0XHRcdGlmIChpbml0aWF0aW5nRXZlbnQgJiYgcmVzdWx0ID09PSBmYWxzZSkgY2FyZXRQb3MgPSBzZWVrTmV4dChnZXRMYXN0VmFsaWRQb3NpdGlvbihjYXJldFBvcykpO1xyXG5cdFx0XHRcdFx0aWYgKHJlc3VsdCAmJiBzdGlja3lDYXJldCAhPT0gdHJ1ZSAmJiAoY2FyZXRQb3MgPCBsdnAgKyAxIHx8IGx2cCA9PT0gLTEpKVxyXG5cdFx0XHRcdFx0XHRjYXJldFBvcyA9IChvcHRzLm51bWVyaWNJbnB1dCAmJiByZXN1bHQuY2FyZXQgPT09IHVuZGVmaW5lZCkgPyBzZWVrUHJldmlvdXMocmVzdWx0LmZvcndhcmRQb3NpdGlvbikgOiByZXN1bHQuZm9yd2FyZFBvc2l0aW9uO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QnVmZmVyKCksIGNhcmV0UG9zLCBpbml0aWF0aW5nRXZlbnQgfHwgbmV3ICQuRXZlbnQoXCJjaGVja3ZhbFwiKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiB1bm1hc2tlZHZhbHVlKGlucHV0KSB7XHJcblx0XHRcdGlmIChpbnB1dCkge1xyXG5cdFx0XHRcdGlmIChpbnB1dC5pbnB1dG1hc2sgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGlucHV0LnZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoaW5wdXQuaW5wdXRtYXNrICYmIGlucHV0LmlucHV0bWFzay5yZWZyZXNoVmFsdWUpIHsgLy9mb3JjZWQgcmVmcmVzaCBmcm9tIHRoZSB2YWx1ZSBmb3JtLnJlc2V0XHJcblx0XHRcdFx0XHRFdmVudEhhbmRsZXJzLnNldFZhbHVlRXZlbnQuY2FsbChpbnB1dCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHZhciB1bVZhbHVlID0gW10sXHJcblx0XHRcdFx0dnBzID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zO1xyXG5cdFx0XHRmb3IgKHZhciBwbmR4IGluIHZwcykge1xyXG5cdFx0XHRcdGlmICh2cHNbcG5keF0ubWF0Y2ggJiYgdnBzW3BuZHhdLm1hdGNoLmZuICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdHVtVmFsdWUucHVzaCh2cHNbcG5keF0uaW5wdXQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgdW5tYXNrZWRWYWx1ZSA9IHVtVmFsdWUubGVuZ3RoID09PSAwID8gXCJcIiA6IChpc1JUTCA/IHVtVmFsdWUucmV2ZXJzZSgpIDogdW1WYWx1ZSkuam9pbihcIlwiKTtcclxuXHRcdFx0aWYgKCQuaXNGdW5jdGlvbihvcHRzLm9uVW5NYXNrKSkge1xyXG5cdFx0XHRcdHZhciBidWZmZXJWYWx1ZSA9IChpc1JUTCA/IGdldEJ1ZmZlcigpLnNsaWNlKCkucmV2ZXJzZSgpIDogZ2V0QnVmZmVyKCkpLmpvaW4oXCJcIik7XHJcblx0XHRcdFx0dW5tYXNrZWRWYWx1ZSA9IChvcHRzLm9uVW5NYXNrKGJ1ZmZlclZhbHVlLCB1bm1hc2tlZFZhbHVlLCBvcHRzKSB8fCB1bm1hc2tlZFZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdW5tYXNrZWRWYWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBjYXJldChpbnB1dCwgYmVnaW4sIGVuZCwgbm90cmFuc2xhdGUpIHtcclxuXHRcdFx0ZnVuY3Rpb24gdHJhbnNsYXRlUG9zaXRpb24ocG9zKSB7XHJcblx0XHRcdFx0aWYgKG5vdHJhbnNsYXRlICE9PSB0cnVlICYmIGlzUlRMICYmIHR5cGVvZiBwb3MgPT09IFwibnVtYmVyXCIgJiYgKCFvcHRzLmdyZWVkeSB8fCBvcHRzLnBsYWNlaG9sZGVyICE9PSBcIlwiKSkge1xyXG5cdFx0XHRcdFx0dmFyIGJmZnJMZ2h0ID0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKS5sZW5ndGg7IC8vam9pbiBpcyBuZWVkZWQgYmVjYXVzZSBzb21ldGltZXMgd2UgZ2V0IGFuIGVtcHR5IGJ1ZmZlciBlbGVtZW50IHdoaWNoIG11c3Qgbm90IGJlIGNvdW50ZWQgZm9yIHRoZSBjYXJldCBwb3NpdGlvbiAobnVtZXJpYyBhbGlhcylcclxuXHRcdFx0XHRcdHBvcyA9IGJmZnJMZ2h0IC0gcG9zO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gcG9zO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcmFuZ2U7XHJcblx0XHRcdGlmICh0eXBlb2YgYmVnaW4gPT09IFwibnVtYmVyXCIpIHtcclxuXHRcdFx0XHRiZWdpbiA9IHRyYW5zbGF0ZVBvc2l0aW9uKGJlZ2luKTtcclxuXHRcdFx0XHRlbmQgPSB0cmFuc2xhdGVQb3NpdGlvbihlbmQpO1xyXG5cdFx0XHRcdGVuZCA9ICh0eXBlb2YgZW5kID09IFwibnVtYmVyXCIpID8gZW5kIDogYmVnaW47XHJcblx0XHRcdFx0Ly8gaWYgKCEkKGlucHV0KS5pcyhcIjp2aXNpYmxlXCIpKSB7XHJcblx0XHRcdFx0Ly8gXHRyZXR1cm47XHJcblx0XHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0XHR2YXIgc2Nyb2xsQ2FsYyA9IHBhcnNlSW50KCgoaW5wdXQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cpLmdldENvbXB1dGVkU3R5bGUgPyAoaW5wdXQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cpLmdldENvbXB1dGVkU3R5bGUoaW5wdXQsIG51bGwpIDogaW5wdXQuY3VycmVudFN0eWxlKS5mb250U2l6ZSkgKiBlbmQ7XHJcblx0XHRcdFx0aW5wdXQuc2Nyb2xsTGVmdCA9IHNjcm9sbENhbGMgPiBpbnB1dC5zY3JvbGxXaWR0aCA/IHNjcm9sbENhbGMgOiAwO1xyXG5cclxuXHRcdFx0XHRpZiAoIW1vYmlsZSAmJiBvcHRzLmluc2VydE1vZGUgPT09IGZhbHNlICYmIGJlZ2luID09PSBlbmQpIGVuZCsrOyAvL3NldCB2aXN1YWxpemF0aW9uIGZvciBpbnNlcnQvb3ZlcndyaXRlIG1vZGVcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5zZXRTZWxlY3Rpb25SYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICBpbnB1dC5zZWxlY3Rpb25TdGFydCA9IGJlZ2luO1xyXG4gICAgICAgICAgICAgICAgICBzd2l0Y2goYmVnaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0aW9uRW5kID0gZW5kICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gYmVnaW4gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0aW9uRW5kID0gZW5kICsgMjtcclxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gYmVnaW4gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0aW9uRW5kID0gZW5kICsgNDtcclxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdGlvbkVuZCA9IGVuZCArIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0aW9uRW5kID0gZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHR9IGVsc2UgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcclxuXHRcdFx0XHRcdHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdGlmIChpbnB1dC5maXJzdENoaWxkID09PSB1bmRlZmluZWQgfHwgaW5wdXQuZmlyc3RDaGlsZCA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcclxuXHRcdFx0XHRcdFx0aW5wdXQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnQoaW5wdXQuZmlyc3RDaGlsZCwgYmVnaW4gPCBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoID8gYmVnaW4gOiBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoKTtcclxuXHRcdFx0XHRcdHJhbmdlLnNldEVuZChpbnB1dC5maXJzdENoaWxkLCBlbmQgPCBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoID8gZW5kIDogaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpLmxlbmd0aCk7XHJcblx0XHRcdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuXHRcdFx0XHRcdHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRcdFx0XHRzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblx0XHRcdFx0XHRzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG5cdFx0XHRcdFx0Ly9pbnB1dC5mb2N1cygpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoaW5wdXQuY3JlYXRlVGV4dFJhbmdlKSB7XHJcblx0XHRcdFx0XHRyYW5nZSA9IGlucHV0LmNyZWF0ZVRleHRSYW5nZSgpO1xyXG5cdFx0XHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHRyYW5nZS5tb3ZlRW5kKFwiY2hhcmFjdGVyXCIsIGVuZCk7XHJcblx0XHRcdFx0XHRyYW5nZS5tb3ZlU3RhcnQoXCJjaGFyYWN0ZXJcIiwgYmVnaW4pO1xyXG5cdFx0XHRcdFx0cmFuZ2Uuc2VsZWN0KCk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZW5kZXJDb2xvck1hc2soaW5wdXQsIHVuZGVmaW5lZCwge2JlZ2luOiBiZWdpbiwgZW5kOiBlbmR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAoaW5wdXQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcclxuXHRcdFx0XHRcdGJlZ2luID0gaW5wdXQuc2VsZWN0aW9uU3RhcnQ7XHJcblx0XHRcdFx0XHRlbmQgPSBpbnB1dC5zZWxlY3Rpb25FbmQ7XHJcblx0XHRcdFx0fSBlbHNlIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XHJcblx0XHRcdFx0XHRyYW5nZSA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5nZXRSYW5nZUF0KDApO1xyXG5cdFx0XHRcdFx0aWYgKHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyLnBhcmVudE5vZGUgPT09IGlucHV0IHx8IHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyID09PSBpbnB1dCkge1xyXG5cdFx0XHRcdFx0XHRiZWdpbiA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xyXG5cdFx0XHRcdFx0XHRlbmQgPSByYW5nZS5lbmRPZmZzZXQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKSB7XHJcblx0XHRcdFx0XHRyYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0XHRcdFx0YmVnaW4gPSAwIC0gcmFuZ2UuZHVwbGljYXRlKCkubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIC1pbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoKTtcclxuXHRcdFx0XHRcdGVuZCA9IGJlZ2luICsgcmFuZ2UudGV4dC5sZW5ndGg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8qZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XCJiZWdpblwiOiB0cmFuc2xhdGVQb3NpdGlvbihiZWdpbiksXHJcblx0XHRcdFx0XHRcImVuZFwiOiB0cmFuc2xhdGVQb3NpdGlvbihlbmQpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHQvKmVzbGludC1lbmFibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGRldGVybWluZUxhc3RSZXF1aXJlZFBvc2l0aW9uKHJldHVybkRlZmluaXRpb24pIHtcclxuXHRcdFx0dmFyIGJ1ZmZlciA9IGdldEJ1ZmZlcigpLFxyXG5cdFx0XHRcdGJsID0gYnVmZmVyLmxlbmd0aCxcclxuXHRcdFx0XHRwb3MsIGx2cCA9IGdldExhc3RWYWxpZFBvc2l0aW9uKCksXHJcblx0XHRcdFx0cG9zaXRpb25zID0ge30sXHJcblx0XHRcdFx0bHZUZXN0ID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2x2cF0sXHJcblx0XHRcdFx0bmR4SW50bHpyID0gbHZUZXN0ICE9PSB1bmRlZmluZWQgPyBsdlRlc3QubG9jYXRvci5zbGljZSgpIDogdW5kZWZpbmVkLFxyXG5cdFx0XHRcdHRlc3RQb3M7XHJcblx0XHRcdGZvciAocG9zID0gbHZwICsgMTsgcG9zIDwgYnVmZmVyLmxlbmd0aDsgcG9zKyspIHtcclxuXHRcdFx0XHR0ZXN0UG9zID0gZ2V0VGVzdFRlbXBsYXRlKHBvcywgbmR4SW50bHpyLCBwb3MgLSAxKTtcclxuXHRcdFx0XHRuZHhJbnRsenIgPSB0ZXN0UG9zLmxvY2F0b3Iuc2xpY2UoKTtcclxuXHRcdFx0XHRwb3NpdGlvbnNbcG9zXSA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0ZXN0UG9zKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGx2VGVzdEFsdCA9IGx2VGVzdCAmJiBsdlRlc3QuYWx0ZXJuYXRpb24gIT09IHVuZGVmaW5lZCA/IGx2VGVzdC5sb2NhdG9yW2x2VGVzdC5hbHRlcm5hdGlvbl0gOiB1bmRlZmluZWQ7XHJcblx0XHRcdGZvciAocG9zID0gYmwgLSAxOyBwb3MgPiBsdnA7IHBvcy0tKSB7XHJcblx0XHRcdFx0dGVzdFBvcyA9IHBvc2l0aW9uc1twb3NdO1xyXG5cdFx0XHRcdGlmICgodGVzdFBvcy5tYXRjaC5vcHRpb25hbGl0eSB8fFxyXG5cdFx0XHRcdFx0dGVzdFBvcy5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgfHxcclxuXHRcdFx0XHRcdChsdlRlc3RBbHQgJiZcclxuXHRcdFx0XHRcdCgobHZUZXN0QWx0ICE9PSBwb3NpdGlvbnNbcG9zXS5sb2NhdG9yW2x2VGVzdC5hbHRlcm5hdGlvbl0gJiYgdGVzdFBvcy5tYXRjaC5mbiAhPSBudWxsKSB8fFxyXG5cdFx0XHRcdFx0KHRlc3RQb3MubWF0Y2guZm4gPT09IG51bGwgJiYgdGVzdFBvcy5sb2NhdG9yW2x2VGVzdC5hbHRlcm5hdGlvbl0gJiYgY2hlY2tBbHRlcm5hdGlvbk1hdGNoKHRlc3RQb3MubG9jYXRvcltsdlRlc3QuYWx0ZXJuYXRpb25dLnRvU3RyaW5nKCkuc3BsaXQoXCIsXCIpLCBsdlRlc3RBbHQudG9TdHJpbmcoKS5zcGxpdChcIixcIikpICYmIGdldFRlc3RzKHBvcylbMF0uZGVmICE9PSBcIlwiKSkpKSAmJlxyXG5cdFx0XHRcdFx0YnVmZmVyW3Bvc10gPT09IGdldFBsYWNlaG9sZGVyKHBvcywgdGVzdFBvcy5tYXRjaCkpIHtcclxuXHRcdFx0XHRcdGJsLS07XHJcblx0XHRcdFx0fSBlbHNlIGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiByZXR1cm5EZWZpbml0aW9uID8ge1xyXG5cdFx0XHRcdFwibFwiOiBibCxcclxuXHRcdFx0XHRcImRlZlwiOiBwb3NpdGlvbnNbYmxdID8gcG9zaXRpb25zW2JsXS5tYXRjaCA6IHVuZGVmaW5lZFxyXG5cdFx0XHR9IDogYmw7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gY2xlYXJPcHRpb25hbFRhaWwoYnVmZmVyKSB7XHJcblx0XHRcdHZhciBybCA9IGRldGVybWluZUxhc3RSZXF1aXJlZFBvc2l0aW9uKCksXHJcblx0XHRcdFx0dmFsaWRQb3MsIGJsID0gYnVmZmVyLmxlbmd0aDtcclxuXHJcblx0XHRcdHdoaWxlIChybCA8IGJsICYmICFpc01hc2socmwgKyAxKSAmJiAodmFsaWRQb3MgPSBnZXRUZXN0KHJsICsgMSkpICYmIHZhbGlkUG9zLm1hdGNoLm9wdGlvbmFsaXR5ICE9PSB0cnVlICYmIHZhbGlkUG9zLm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllciAhPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHJsKys7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdoaWxlICgodmFsaWRQb3MgPSBnZXRUZXN0KHJsIC0gMSkpICYmIHZhbGlkUG9zLm1hdGNoLm9wdGlvbmFsaXR5ICYmIHZhbGlkUG9zLmlucHV0ID09PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIpIHtcclxuXHRcdFx0XHRybC0tO1xyXG5cdFx0XHR9XHJcblx0XHRcdGJ1ZmZlci5zcGxpY2UocmwpO1xyXG5cdFx0XHRyZXR1cm4gYnVmZmVyO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGlzQ29tcGxldGUoYnVmZmVyKSB7IC8vcmV0dXJuIHRydWUgLyBmYWxzZSAvIHVuZGVmaW5lZCAocmVwZWF0ICopXHJcblx0XHRcdGlmICgkLmlzRnVuY3Rpb24ob3B0cy5pc0NvbXBsZXRlKSkgcmV0dXJuIG9wdHMuaXNDb21wbGV0ZShidWZmZXIsIG9wdHMpO1xyXG5cdFx0XHRpZiAob3B0cy5yZXBlYXQgPT09IFwiKlwiKSByZXR1cm4gdW5kZWZpbmVkO1xyXG5cdFx0XHR2YXIgY29tcGxldGUgPSBmYWxzZSxcclxuXHRcdFx0XHRscnAgPSBkZXRlcm1pbmVMYXN0UmVxdWlyZWRQb3NpdGlvbih0cnVlKSxcclxuXHRcdFx0XHRhbWwgPSBzZWVrUHJldmlvdXMobHJwLmwpO1xyXG5cclxuXHRcdFx0aWYgKGxycC5kZWYgPT09IHVuZGVmaW5lZCB8fCBscnAuZGVmLm5ld0Jsb2NrTWFya2VyIHx8IGxycC5kZWYub3B0aW9uYWxpdHkgfHwgbHJwLmRlZi5vcHRpb25hbFF1YW50aWZpZXIpIHtcclxuXHRcdFx0XHRjb21wbGV0ZSA9IHRydWU7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gYW1sOyBpKyspIHtcclxuXHRcdFx0XHRcdHZhciB0ZXN0ID0gZ2V0VGVzdFRlbXBsYXRlKGkpLm1hdGNoO1xyXG5cdFx0XHRcdFx0aWYgKCh0ZXN0LmZuICE9PSBudWxsICYmIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tpXSA9PT0gdW5kZWZpbmVkICYmIHRlc3Qub3B0aW9uYWxpdHkgIT09IHRydWUgJiYgdGVzdC5vcHRpb25hbFF1YW50aWZpZXIgIT09IHRydWUpIHx8ICh0ZXN0LmZuID09PSBudWxsICYmIGJ1ZmZlcltpXSAhPT0gZ2V0UGxhY2Vob2xkZXIoaSwgdGVzdCkpKSB7XHJcblx0XHRcdFx0XHRcdGNvbXBsZXRlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gY29tcGxldGU7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIGhhbmRsZVJlbW92ZShpbnB1dCwgaywgcG9zLCBzdHJpY3QpIHtcclxuXHRcdFx0ZnVuY3Rpb24gZ2VuZXJhbGl6ZSgpIHtcclxuXHRcdFx0XHRpZiAob3B0cy5rZWVwU3RhdGljKSB7XHJcblx0XHRcdFx0XHR2YXIgdmFsaWRJbnB1dHMgPSBbXSxcclxuXHRcdFx0XHRcdFx0bGFzdEFsdCA9IGdldExhc3RWYWxpZFBvc2l0aW9uKC0xLCB0cnVlKSwgcG9zaXRpb25zQ2xvbmUgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zKSxcclxuXHRcdFx0XHRcdFx0cHJldkFsdFBvcyA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tsYXN0QWx0XTtcclxuXHRcdFx0XHRcdC8vZmluZCBsYXN0IGFsdGVybmF0aW9uXHJcblx0XHRcdFx0XHRmb3IgKDsgbGFzdEFsdCA+PSAwOyBsYXN0QWx0LS0pIHtcclxuXHRcdFx0XHRcdFx0dmFyIGFsdFBvcyA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tsYXN0QWx0XTtcclxuXHRcdFx0XHRcdFx0aWYgKGFsdFBvcykge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChhbHRQb3MuZ2VuZXJhdGVkSW5wdXQgIT09IHRydWUgJiYgL1swLTlhLWJBLVpdLy50ZXN0KGFsdFBvcy5pbnB1dCkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhbGlkSW5wdXRzLnB1c2goYWx0UG9zLmlucHV0KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1tsYXN0QWx0XTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoYWx0UG9zLmFsdGVybmF0aW9uICE9PSB1bmRlZmluZWQgJiYgYWx0UG9zLmxvY2F0b3JbYWx0UG9zLmFsdGVybmF0aW9uXSAhPT0gcHJldkFsdFBvcy5sb2NhdG9yW2FsdFBvcy5hbHRlcm5hdGlvbl0pIHtcclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRwcmV2QWx0UG9zID0gYWx0UG9zO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGxhc3RBbHQgPiAtMSkge1xyXG5cdFx0XHRcdFx0XHRnZXRNYXNrU2V0KCkucCA9IHNlZWtOZXh0KGdldExhc3RWYWxpZFBvc2l0aW9uKC0xLCB0cnVlKSk7XHJcblx0XHRcdFx0XHRcdHdoaWxlICh2YWxpZElucHV0cy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGtleXByZXNzID0gbmV3ICQuRXZlbnQoXCJrZXlwcmVzc1wiKTtcclxuXHRcdFx0XHRcdFx0XHRrZXlwcmVzcy53aGljaCA9IHZhbGlkSW5wdXRzLnBvcCgpLmNoYXJDb2RlQXQoMCk7XHJcblx0XHRcdFx0XHRcdFx0RXZlbnRIYW5kbGVycy5rZXlwcmVzc0V2ZW50LmNhbGwoaW5wdXQsIGtleXByZXNzLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGdldE1hc2tTZXQoKS5wKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBwb3NpdGlvbnNDbG9uZSk7IC8vcmVzdG9yZSBvcmlnaW5hbCBwb3NpdGlvbnNcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChvcHRzLm51bWVyaWNJbnB1dCB8fCBpc1JUTCkge1xyXG5cdFx0XHRcdGlmIChrID09PSBJbnB1dG1hc2sua2V5Q29kZS5CQUNLU1BBQ0UpIHtcclxuXHRcdFx0XHRcdGsgPSBJbnB1dG1hc2sua2V5Q29kZS5ERUxFVEU7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChrID09PSBJbnB1dG1hc2sua2V5Q29kZS5ERUxFVEUpIHtcclxuXHRcdFx0XHRcdGsgPSBJbnB1dG1hc2sua2V5Q29kZS5CQUNLU1BBQ0U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoaXNSVEwpIHtcclxuXHRcdFx0XHRcdHZhciBwZW5kID0gcG9zLmVuZDtcclxuXHRcdFx0XHRcdHBvcy5lbmQgPSBwb3MuYmVnaW47XHJcblx0XHRcdFx0XHRwb3MuYmVnaW4gPSBwZW5kO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGsgPT09IElucHV0bWFzay5rZXlDb2RlLkJBQ0tTUEFDRSAmJiAocG9zLmVuZCAtIHBvcy5iZWdpbiA8IDEgfHwgb3B0cy5pbnNlcnRNb2RlID09PSBmYWxzZSkpIHtcclxuXHRcdFx0XHRwb3MuYmVnaW4gPSBzZWVrUHJldmlvdXMocG9zLmJlZ2luKTtcclxuXHRcdFx0XHRpZiAoZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvcy5iZWdpbl0gIT09IHVuZGVmaW5lZCAmJiAoZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvcy5iZWdpbl0uaW5wdXQgPT09IG9wdHMuZ3JvdXBTZXBhcmF0b3IgfHwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW3Bvcy5iZWdpbl0uaW5wdXQgPT09IG9wdHMucmFkaXhQb2ludCkpIHtcclxuXHRcdFx0XHRcdHBvcy5iZWdpbi0tO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmIChrID09PSBJbnB1dG1hc2sua2V5Q29kZS5ERUxFVEUgJiYgcG9zLmJlZ2luID09PSBwb3MuZW5kKSB7XHJcblx0XHRcdFx0cG9zLmVuZCA9IGlzTWFzayhwb3MuZW5kLCB0cnVlKSA/IHBvcy5lbmQgKyAxIDogc2Vla05leHQocG9zLmVuZCkgKyAxO1xyXG5cdFx0XHRcdGlmIChnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zLmJlZ2luXSAhPT0gdW5kZWZpbmVkICYmIChnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zLmJlZ2luXS5pbnB1dCA9PT0gb3B0cy5ncm91cFNlcGFyYXRvciB8fCBnZXRNYXNrU2V0KCkudmFsaWRQb3NpdGlvbnNbcG9zLmJlZ2luXS5pbnB1dCA9PT0gb3B0cy5yYWRpeFBvaW50KSkge1xyXG5cdFx0XHRcdFx0cG9zLmVuZCsrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3RyaXBWYWxpZFBvc2l0aW9ucyhwb3MuYmVnaW4sIHBvcy5lbmQsIGZhbHNlLCBzdHJpY3QpO1xyXG5cdFx0XHRpZiAoc3RyaWN0ICE9PSB0cnVlKSB7XHJcblx0XHRcdFx0Z2VuZXJhbGl6ZSgpOyAvL3JldmVydCB0aGUgYWx0ZXJuYXRpb25cclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgbHZwID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24ocG9zLmJlZ2luLCB0cnVlKTtcclxuXHRcdFx0aWYgKGx2cCA8IHBvcy5iZWdpbikge1xyXG5cdFx0XHRcdC8vaWYgKGx2cCA9PT0gLTEpIHJlc2V0TWFza1NldCgpO1xyXG5cdFx0XHRcdGdldE1hc2tTZXQoKS5wID0gc2Vla05leHQobHZwKTtcclxuXHRcdFx0fSBlbHNlIGlmIChzdHJpY3QgIT09IHRydWUpIHtcclxuXHRcdFx0XHRnZXRNYXNrU2V0KCkucCA9IHBvcy5iZWdpbjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBFdmVudFJ1bGVyID0ge1xyXG5cdFx0XHRvbjogZnVuY3Rpb24gKGlucHV0LCBldmVudE5hbWUsIGV2ZW50SGFuZGxlcikge1xyXG5cdFx0XHRcdHZhciBldiA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhcInRyaWdnZXJlZCBcIiArIGUudHlwZSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuaW5wdXRtYXNrID09PSB1bmRlZmluZWQgJiYgdGhpcy5ub2RlTmFtZSAhPT0gXCJGT1JNXCIpIHsgLy9oYXBwZW5zIHdoZW4gY2xvbmluZyBhbiBvYmplY3Qgd2l0aCBqcXVlcnkuY2xvbmVcclxuXHRcdFx0XHRcdFx0dmFyIGltT3B0cyA9ICQuZGF0YSh0aGlzLCBcIl9pbnB1dG1hc2tfb3B0c1wiKTtcclxuXHRcdFx0XHRcdFx0aWYgKGltT3B0cykgKG5ldyBJbnB1dG1hc2soaW1PcHRzKSkubWFzayh0aGlzKTtcclxuXHRcdFx0XHRcdFx0ZWxzZSBFdmVudFJ1bGVyLm9mZih0aGlzKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoZS50eXBlICE9PSBcInNldHZhbHVlXCIgJiYgdGhpcy5ub2RlTmFtZSAhPT0gXCJGT1JNXCIgJiYgKHRoaXMuZGlzYWJsZWQgfHwgKHRoaXMucmVhZE9ubHkgJiYgIShlLnR5cGUgPT09IFwia2V5ZG93blwiICYmIChlLmN0cmxLZXkgJiYgZS5rZXlDb2RlID09PSA2NykgfHwgKG9wdHMudGFiVGhyb3VnaCA9PT0gZmFsc2UgJiYgZS5rZXlDb2RlID09PSBJbnB1dG1hc2sua2V5Q29kZS5UQUIpKSkpKSB7XHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHN3aXRjaCAoZS50eXBlKSB7XHJcblx0XHRcdFx0XHRcdFx0Y2FzZSBcImlucHV0XCI6XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoc2tpcElucHV0RXZlbnQgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2tpcElucHV0RXZlbnQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdGNhc2UgXCJrZXlkb3duXCI6XHJcblx0XHRcdFx0XHRcdFx0XHQvL1NhZmFyaSA1LjEueCAtIG1vZGFsIGRpYWxvZyBmaXJlcyBrZXlwcmVzcyB0d2ljZSB3b3JrYXJvdW5kXHJcblx0XHRcdFx0XHRcdFx0XHRza2lwS2V5UHJlc3NFdmVudCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0c2tpcElucHV0RXZlbnQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdGNhc2UgXCJrZXlwcmVzc1wiOlxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNraXBLZXlQcmVzc0V2ZW50ID09PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRza2lwS2V5UHJlc3NFdmVudCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRjYXNlIFwiY2xpY2tcIjpcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChpZW1vYmlsZSB8fCBpcGhvbmUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHRoYXQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRldmVudEhhbmRsZXIuYXBwbHkodGhhdCwgYXJncyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0sIDApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhcImV4ZWN1dGVkIFwiICsgZS50eXBlKTtcclxuXHRcdFx0XHRcdFx0dmFyIHJldHVyblZhbCA9IGV2ZW50SGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRcdFx0XHRpZiAocmV0dXJuVmFsID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXR1cm5WYWw7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHQvL2tlZXAgaW5zdGFuY2Ugb2YgdGhlIGV2ZW50XHJcblx0XHRcdFx0aW5wdXQuaW5wdXRtYXNrLmV2ZW50c1tldmVudE5hbWVdID0gaW5wdXQuaW5wdXRtYXNrLmV2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xyXG5cdFx0XHRcdGlucHV0LmlucHV0bWFzay5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGV2KTtcclxuXHJcblx0XHRcdFx0aWYgKCQuaW5BcnJheShldmVudE5hbWUsIFtcInN1Ym1pdFwiLCBcInJlc2V0XCJdKSAhPT0gLTEpIHtcclxuXHRcdFx0XHRcdGlmIChpbnB1dC5mb3JtICE9IG51bGwpICQoaW5wdXQuZm9ybSkub24oZXZlbnROYW1lLCBldik7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQoaW5wdXQpLm9uKGV2ZW50TmFtZSwgZXYpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0b2ZmOiBmdW5jdGlvbiAoaW5wdXQsIGV2ZW50KSB7XHJcblx0XHRcdFx0aWYgKGlucHV0LmlucHV0bWFzayAmJiBpbnB1dC5pbnB1dG1hc2suZXZlbnRzKSB7XHJcblx0XHRcdFx0XHR2YXIgZXZlbnRzO1xyXG5cdFx0XHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0XHRcdGV2ZW50cyA9IFtdO1xyXG5cdFx0XHRcdFx0XHRldmVudHNbZXZlbnRdID0gaW5wdXQuaW5wdXRtYXNrLmV2ZW50c1tldmVudF07XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRldmVudHMgPSBpbnB1dC5pbnB1dG1hc2suZXZlbnRzO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0JC5lYWNoKGV2ZW50cywgZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZBcnIpIHtcclxuXHRcdFx0XHRcdFx0d2hpbGUgKGV2QXJyLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgZXYgPSBldkFyci5wb3AoKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoJC5pbkFycmF5KGV2ZW50TmFtZSwgW1wic3VibWl0XCIsIFwicmVzZXRcIl0pICE9PSAtMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGlucHV0LmZvcm0gIT0gbnVsbCkgJChpbnB1dC5mb3JtKS5vZmYoZXZlbnROYW1lLCBldik7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdCQoaW5wdXQpLm9mZihldmVudE5hbWUsIGV2KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZGVsZXRlIGlucHV0LmlucHV0bWFzay5ldmVudHNbZXZlbnROYW1lXTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHZhciBFdmVudEhhbmRsZXJzID0ge1xyXG5cdFx0XHRrZXlkb3duRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0ZnVuY3Rpb24gaXNJbnB1dEV2ZW50U3VwcG9ydGVkKGV2ZW50TmFtZSkge1xyXG5cdFx0XHRcdFx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpLFxyXG5cdFx0XHRcdFx0XHRldk5hbWUgPSBcIm9uXCIgKyBldmVudE5hbWUsXHJcblx0XHRcdFx0XHRcdGlzU3VwcG9ydGVkID0gKGV2TmFtZSBpbiBlbCk7XHJcblx0XHRcdFx0XHRpZiAoIWlzU3VwcG9ydGVkKSB7XHJcblx0XHRcdFx0XHRcdGVsLnNldEF0dHJpYnV0ZShldk5hbWUsIFwicmV0dXJuO1wiKTtcclxuXHRcdFx0XHRcdFx0aXNTdXBwb3J0ZWQgPSB0eXBlb2YgZWxbZXZOYW1lXSA9PSBcImZ1bmN0aW9uXCI7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbCA9IG51bGw7XHJcblx0XHRcdFx0XHRyZXR1cm4gaXNTdXBwb3J0ZWQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR2YXIgaW5wdXQgPSB0aGlzLFxyXG5cdFx0XHRcdFx0JGlucHV0ID0gJChpbnB1dCksXHJcblx0XHRcdFx0XHRrID0gZS5rZXlDb2RlLFxyXG5cdFx0XHRcdFx0cG9zID0gY2FyZXQoaW5wdXQpO1xyXG5cclxuXHRcdFx0XHQvL2JhY2tzcGFjZSwgZGVsZXRlLCBhbmQgZXNjYXBlIGdldCBzcGVjaWFsIHRyZWF0bWVudFxyXG5cdFx0XHRcdGlmIChrID09PSBJbnB1dG1hc2sua2V5Q29kZS5CQUNLU1BBQ0UgfHwgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuREVMRVRFIHx8IChpcGhvbmUgJiYgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuQkFDS1NQQUNFX1NBRkFSSSkgfHwgKGUuY3RybEtleSAmJiBrID09PSBJbnB1dG1hc2sua2V5Q29kZS5YICYmICFpc0lucHV0RXZlbnRTdXBwb3J0ZWQoXCJjdXRcIikpKSB7IC8vYmFja3NwYWNlL2RlbGV0ZVxyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvL3N0b3AgZGVmYXVsdCBhY3Rpb24gYnV0IGFsbG93IHByb3BhZ2F0aW9uXHJcblx0XHRcdFx0XHRoYW5kbGVSZW1vdmUoaW5wdXQsIGssIHBvcyk7XHJcblx0XHRcdFx0XHR3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QnVmZmVyKHRydWUpLCBnZXRNYXNrU2V0KCkucCwgZSwgaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpICE9PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpKTtcclxuXHRcdFx0XHRcdGlmIChpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkgPT09IGdldEJ1ZmZlclRlbXBsYXRlKCkuam9pbihcIlwiKSkge1xyXG5cdFx0XHRcdFx0XHQkaW5wdXQudHJpZ2dlcihcImNsZWFyZWRcIik7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGlzQ29tcGxldGUoZ2V0QnVmZmVyKCkpID09PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRcdCRpbnB1dC50cmlnZ2VyKFwiY29tcGxldGVcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIGlmIChrID09PSBJbnB1dG1hc2sua2V5Q29kZS5FTkQgfHwgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuUEFHRV9ET1dOKSB7IC8vd2hlbiBFTkQgb3IgUEFHRV9ET1dOIHByZXNzZWQgc2V0IHBvc2l0aW9uIGF0IGxhc3RtYXRjaFxyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0dmFyIGNhcmV0UG9zID0gc2Vla05leHQoZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSk7XHJcblx0XHRcdFx0XHRpZiAoIW9wdHMuaW5zZXJ0TW9kZSAmJiBjYXJldFBvcyA9PT0gZ2V0TWFza1NldCgpLm1hc2tMZW5ndGggJiYgIWUuc2hpZnRLZXkpIGNhcmV0UG9zLS07XHJcblx0XHRcdFx0XHRjYXJldChpbnB1dCwgZS5zaGlmdEtleSA/IHBvcy5iZWdpbiA6IGNhcmV0UG9zLCBjYXJldFBvcywgdHJ1ZSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmICgoayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuSE9NRSAmJiAhZS5zaGlmdEtleSkgfHwgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuUEFHRV9VUCkgeyAvL0hvbWUgb3IgcGFnZV91cFxyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0Y2FyZXQoaW5wdXQsIDAsIGUuc2hpZnRLZXkgPyBwb3MuYmVnaW4gOiAwLCB0cnVlKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKCgob3B0cy51bmRvT25Fc2NhcGUgJiYgayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuRVNDQVBFKSB8fCAoayA9PT0gOTAgJiYgZS5jdHJsS2V5KSkgJiYgZS5hbHRLZXkgIT09IHRydWUpIHsgLy9lc2NhcGUgJiYgdW5kbyAmJiAjNzYyXHJcblx0XHRcdFx0XHRjaGVja1ZhbChpbnB1dCwgdHJ1ZSwgZmFsc2UsIHVuZG9WYWx1ZS5zcGxpdChcIlwiKSk7XHJcblx0XHRcdFx0XHQkaW5wdXQudHJpZ2dlcihcImNsaWNrXCIpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuSU5TRVJUICYmICEoZS5zaGlmdEtleSB8fCBlLmN0cmxLZXkpKSB7IC8vaW5zZXJ0XHJcblx0XHRcdFx0XHRvcHRzLmluc2VydE1vZGUgPSAhb3B0cy5pbnNlcnRNb2RlO1xyXG5cdFx0XHRcdFx0Y2FyZXQoaW5wdXQsICFvcHRzLmluc2VydE1vZGUgJiYgcG9zLmJlZ2luID09PSBnZXRNYXNrU2V0KCkubWFza0xlbmd0aCA/IHBvcy5iZWdpbiAtIDEgOiBwb3MuYmVnaW4pO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAob3B0cy50YWJUaHJvdWdoID09PSB0cnVlICYmIGsgPT09IElucHV0bWFzay5rZXlDb2RlLlRBQikge1xyXG5cdFx0XHRcdFx0aWYgKGUuc2hpZnRLZXkgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGdldFRlc3QocG9zLmJlZ2luKS5tYXRjaC5mbiA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdHBvcy5iZWdpbiA9IHNlZWtOZXh0KHBvcy5iZWdpbik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cG9zLmVuZCA9IHNlZWtQcmV2aW91cyhwb3MuYmVnaW4sIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRwb3MuYmVnaW4gPSBzZWVrUHJldmlvdXMocG9zLmVuZCwgdHJ1ZSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRwb3MuYmVnaW4gPSBzZWVrTmV4dChwb3MuYmVnaW4sIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRwb3MuZW5kID0gc2Vla05leHQocG9zLmJlZ2luLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0aWYgKHBvcy5lbmQgPCBnZXRNYXNrU2V0KCkubWFza0xlbmd0aCkgcG9zLmVuZC0tO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKHBvcy5iZWdpbiA8IGdldE1hc2tTZXQoKS5tYXNrTGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0Y2FyZXQoaW5wdXQsIHBvcy5iZWdpbiwgcG9zLmVuZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIGlmICghZS5zaGlmdEtleSkge1xyXG5cdFx0XHRcdFx0aWYgKG9wdHMuaW5zZXJ0TW9kZSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGsgPT09IElucHV0bWFzay5rZXlDb2RlLlJJR0hUKSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgY2FyZXRQb3MgPSBjYXJldChpbnB1dCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FyZXRQb3MuYmVnaW4gPT09IDMgfHwgY2FyZXRQb3MuYmVnaW4gPT09IDUpIHtcclxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgY2FyZXRQb3MuYmVnaW4gKyAxKTtcclxuXHRcdFx0XHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgY2FyZXRQb3MuYmVnaW4pO1xyXG5cdFx0XHRcdCAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0XHRcdFx0fSwgMCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuTEVGVCkge1xyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGNhcmV0UG9zID0gY2FyZXQoaW5wdXQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNhcmV0UG9zLmJlZ2luID09PSAzIHx8IGNhcmV0UG9zLmJlZ2luID09PSA2KSB7XHJcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIGlzUlRMID8gY2FyZXRQb3MuYmVnaW4gKyAyIDogY2FyZXRQb3MuYmVnaW4gLSAyKTtcclxuXHRcdFx0XHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgaXNSVEwgPyBjYXJldFBvcy5iZWdpbiArIDEgOiBjYXJldFBvcy5iZWdpbiAtIDEpO1xyXG5cdFx0XHRcdCAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0XHRcdFx0fSwgMCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0b3B0cy5vbktleURvd24uY2FsbCh0aGlzLCBlLCBnZXRCdWZmZXIoKSwgY2FyZXQoaW5wdXQpLmJlZ2luLCBvcHRzKTtcclxuXHRcdFx0XHRpZ25vcmFibGUgPSAkLmluQXJyYXkoaywgb3B0cy5pZ25vcmFibGVzKSAhPT0gLTE7XHJcblx0XHRcdH0sXHJcblx0XHRcdGtleXByZXNzRXZlbnQ6IGZ1bmN0aW9uIChlLCBjaGVja3ZhbCwgd3JpdGVPdXQsIHN0cmljdCwgbmR4KSB7XHJcblx0XHRcdFx0dmFyIGlucHV0ID0gdGhpcyxcclxuXHRcdFx0XHRcdCRpbnB1dCA9ICQoaW5wdXQpLFxyXG5cdFx0XHRcdFx0ayA9IGUud2hpY2ggfHwgZS5jaGFyQ29kZSB8fCBlLmtleUNvZGU7XHJcblxyXG5cdFx0XHRcdGlmIChjaGVja3ZhbCAhPT0gdHJ1ZSAmJiAoIShlLmN0cmxLZXkgJiYgZS5hbHRLZXkpICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5IHx8IGlnbm9yYWJsZSkpKSB7XHJcblx0XHRcdFx0XHRpZiAoayA9PT0gSW5wdXRtYXNrLmtleUNvZGUuRU5URVIgJiYgdW5kb1ZhbHVlICE9PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpKSB7XHJcblx0XHRcdFx0XHRcdHVuZG9WYWx1ZSA9IGdldEJ1ZmZlcigpLmpvaW4oXCJcIik7XHJcblx0XHRcdFx0XHRcdC8vIGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0JGlucHV0LnRyaWdnZXIoXCJjaGFuZ2VcIik7XHJcblx0XHRcdFx0XHRcdH0sIDApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmIChrKSB7XHJcblx0XHRcdFx0XHRcdC8vc3BlY2lhbCB0cmVhdCB0aGUgZGVjaW1hbCBzZXBhcmF0b3JcclxuXHRcdFx0XHRcdFx0aWYgKGsgPT09IDQ2ICYmIGUuc2hpZnRLZXkgPT09IGZhbHNlICYmIG9wdHMucmFkaXhQb2ludCA9PT0gXCIsXCIpIGsgPSA0NDtcclxuXHRcdFx0XHRcdFx0dmFyIHBvcyA9IGNoZWNrdmFsID8ge1xyXG5cdFx0XHRcdFx0XHRcdFx0YmVnaW46IG5keCxcclxuXHRcdFx0XHRcdFx0XHRcdGVuZDogbmR4XHJcblx0XHRcdFx0XHRcdFx0fSA6IGNhcmV0KGlucHV0KSxcclxuXHRcdFx0XHRcdFx0XHRmb3J3YXJkUG9zaXRpb24sIGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGspO1xyXG5cclxuXHRcdFx0XHRcdFx0Z2V0TWFza1NldCgpLndyaXRlT3V0QnVmZmVyID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0dmFyIHZhbFJlc3VsdCA9IGlzVmFsaWQocG9zLCBjLCBzdHJpY3QpO1xyXG5cdFx0XHRcdFx0XHRpZiAodmFsUmVzdWx0ICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJlc2V0TWFza1NldCh0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHRmb3J3YXJkUG9zaXRpb24gPSB2YWxSZXN1bHQuY2FyZXQgIT09IHVuZGVmaW5lZCA/IHZhbFJlc3VsdC5jYXJldCA6IGNoZWNrdmFsID8gdmFsUmVzdWx0LnBvcyArIDEgOiBzZWVrTmV4dCh2YWxSZXN1bHQucG9zKTtcclxuXHRcdFx0XHRcdFx0XHRnZXRNYXNrU2V0KCkucCA9IGZvcndhcmRQb3NpdGlvbjsgLy9uZWVkZWQgZm9yIGNoZWNrdmFsXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmICh3cml0ZU91dCAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRvcHRzLm9uS2V5VmFsaWRhdGlvbi5jYWxsKHNlbGYsIGssIHZhbFJlc3VsdCwgb3B0cyk7XHJcblx0XHRcdFx0XHRcdFx0fSwgMCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGdldE1hc2tTZXQoKS53cml0ZU91dEJ1ZmZlciAmJiB2YWxSZXN1bHQgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgYnVmZmVyID0gZ2V0QnVmZmVyKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR3cml0ZUJ1ZmZlcihpbnB1dCwgYnVmZmVyLCAob3B0cy5udW1lcmljSW5wdXQgJiYgdmFsUmVzdWx0LmNhcmV0ID09PSB1bmRlZmluZWQpID8gc2Vla1ByZXZpb3VzKGZvcndhcmRQb3NpdGlvbikgOiBmb3J3YXJkUG9zaXRpb24sIGUsIGNoZWNrdmFsICE9PSB0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChjaGVja3ZhbCAhPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgLy90aW1lb3V0IG5lZWRlZCBmb3IgSUVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoaXNDb21wbGV0ZShidWZmZXIpID09PSB0cnVlKSAkaW5wdXQudHJpZ2dlcihcImNvbXBsZXRlXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChjaGVja3ZhbCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhbFJlc3VsdC5mb3J3YXJkUG9zaXRpb24gPSBmb3J3YXJkUG9zaXRpb247XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZhbFJlc3VsdDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0cGFzdGVFdmVudDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHR2YXIgaW5wdXQgPSB0aGlzLFxyXG5cdFx0XHRcdFx0ZXYgPSBlLm9yaWdpbmFsRXZlbnQgfHwgZSxcclxuXHRcdFx0XHRcdCRpbnB1dCA9ICQoaW5wdXQpLFxyXG5cdFx0XHRcdFx0aW5wdXRWYWx1ZSA9IGlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQodHJ1ZSksXHJcblx0XHRcdFx0XHRjYXJldFBvcyA9IGNhcmV0KGlucHV0KSxcclxuXHRcdFx0XHRcdHRlbXBWYWx1ZTtcclxuXHJcblx0XHRcdFx0aWYgKGlzUlRMKSB7XHJcblx0XHRcdFx0XHR0ZW1wVmFsdWUgPSBjYXJldFBvcy5lbmQ7XHJcblx0XHRcdFx0XHRjYXJldFBvcy5lbmQgPSBjYXJldFBvcy5iZWdpbjtcclxuXHRcdFx0XHRcdGNhcmV0UG9zLmJlZ2luID0gdGVtcFZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIHZhbHVlQmVmb3JlQ2FyZXQgPSBpbnB1dFZhbHVlLnN1YnN0cigwLCBjYXJldFBvcy5iZWdpbiksXHJcblx0XHRcdFx0XHR2YWx1ZUFmdGVyQ2FyZXQgPSBpbnB1dFZhbHVlLnN1YnN0cihjYXJldFBvcy5lbmQsIGlucHV0VmFsdWUubGVuZ3RoKTtcclxuXHJcblx0XHRcdFx0aWYgKHZhbHVlQmVmb3JlQ2FyZXQgPT09IChpc1JUTCA/IGdldEJ1ZmZlclRlbXBsYXRlKCkucmV2ZXJzZSgpIDogZ2V0QnVmZmVyVGVtcGxhdGUoKSkuc2xpY2UoMCwgY2FyZXRQb3MuYmVnaW4pLmpvaW4oXCJcIikpIHZhbHVlQmVmb3JlQ2FyZXQgPSBcIlwiO1xyXG5cdFx0XHRcdGlmICh2YWx1ZUFmdGVyQ2FyZXQgPT09IChpc1JUTCA/IGdldEJ1ZmZlclRlbXBsYXRlKCkucmV2ZXJzZSgpIDogZ2V0QnVmZmVyVGVtcGxhdGUoKSkuc2xpY2UoY2FyZXRQb3MuZW5kKS5qb2luKFwiXCIpKSB2YWx1ZUFmdGVyQ2FyZXQgPSBcIlwiO1xyXG5cdFx0XHRcdGlmIChpc1JUTCkge1xyXG5cdFx0XHRcdFx0dGVtcFZhbHVlID0gdmFsdWVCZWZvcmVDYXJldDtcclxuXHRcdFx0XHRcdHZhbHVlQmVmb3JlQ2FyZXQgPSB2YWx1ZUFmdGVyQ2FyZXQ7XHJcblx0XHRcdFx0XHR2YWx1ZUFmdGVyQ2FyZXQgPSB0ZW1wVmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAod2luZG93LmNsaXBib2FyZERhdGEgJiYgd2luZG93LmNsaXBib2FyZERhdGEuZ2V0RGF0YSkgeyAvLyBJRVxyXG5cdFx0XHRcdFx0aW5wdXRWYWx1ZSA9IHZhbHVlQmVmb3JlQ2FyZXQgKyB3aW5kb3cuY2xpcGJvYXJkRGF0YS5nZXREYXRhKFwiVGV4dFwiKSArIHZhbHVlQWZ0ZXJDYXJldDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGV2LmNsaXBib2FyZERhdGEgJiYgZXYuY2xpcGJvYXJkRGF0YS5nZXREYXRhKSB7XHJcblx0XHRcdFx0XHRpbnB1dFZhbHVlID0gdmFsdWVCZWZvcmVDYXJldCArIGV2LmNsaXBib2FyZERhdGEuZ2V0RGF0YShcInRleHQvcGxhaW5cIikgKyB2YWx1ZUFmdGVyQ2FyZXQ7XHJcblx0XHRcdFx0fSBlbHNlIHJldHVybiB0cnVlOyAvL2FsbG93IG5hdGl2ZSBwYXN0ZSBldmVudCBhcyBmYWxsYmFjayB+IG1hc2tpbmcgd2lsbCBjb250aW51ZSBieSBpbnB1dGZhbGxiYWNrXHJcblxyXG5cdFx0XHRcdHZhciBwYXN0ZVZhbHVlID0gaW5wdXRWYWx1ZTtcclxuXHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKG9wdHMub25CZWZvcmVQYXN0ZSkpIHtcclxuXHRcdFx0XHRcdHBhc3RlVmFsdWUgPSBvcHRzLm9uQmVmb3JlUGFzdGUoaW5wdXRWYWx1ZSwgb3B0cyk7XHJcblx0XHRcdFx0XHRpZiAocGFzdGVWYWx1ZSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICghcGFzdGVWYWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRwYXN0ZVZhbHVlID0gaW5wdXRWYWx1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2hlY2tWYWwoaW5wdXQsIGZhbHNlLCBmYWxzZSwgaXNSVEwgPyBwYXN0ZVZhbHVlLnNwbGl0KFwiXCIpLnJldmVyc2UoKSA6IHBhc3RlVmFsdWUudG9TdHJpbmcoKS5zcGxpdChcIlwiKSk7XHJcblx0XHRcdFx0d3JpdGVCdWZmZXIoaW5wdXQsIGdldEJ1ZmZlcigpLCBzZWVrTmV4dChnZXRMYXN0VmFsaWRQb3NpdGlvbigpKSwgZSwgdW5kb1ZhbHVlICE9PSBnZXRCdWZmZXIoKS5qb2luKFwiXCIpKTtcclxuXHRcdFx0XHRpZiAoaXNDb21wbGV0ZShnZXRCdWZmZXIoKSkgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdCRpbnB1dC50cmlnZ2VyKFwiY29tcGxldGVcIik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRpbnB1dEZhbGxCYWNrRXZlbnQ6IGZ1bmN0aW9uIChlKSB7IC8vZmFsbGJhY2sgd2hlbiBrZXlwcmVzcyBmYWlsc1xyXG5cdFx0XHRcdHZhciBpbnB1dCA9IHRoaXMsXHJcblx0XHRcdFx0XHRpbnB1dFZhbHVlID0gaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpO1xyXG5cclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKGlucHV0VmFsdWUpO1xyXG5cdFx0XHRcdGlmIChnZXRCdWZmZXIoKS5qb2luKFwiXCIpICE9PSBpbnB1dFZhbHVlKSB7XHJcblx0XHRcdFx0XHR2YXIgY2FyZXRQb3MgPSBjYXJldChpbnB1dCk7XHJcblx0XHRcdFx0XHRpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXCIgKyBJbnB1dG1hc2suZXNjYXBlUmVnZXgoZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpKSArIFwiKSpcIiksIFwiXCIpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpZW1vYmlsZSkgeyAvL2llbW9iaWxlIGp1c3Qgc2V0IHRoZSBjaGFyYWN0ZXIgYXQgdGhlIGVuZCBhbHRob3VnaHQgdGhlIGNhcmV0IHBvc2l0aW9uIGlzIGNvcnJlY3RseSBzZXRcclxuXHRcdFx0XHRcdFx0dmFyIGlucHV0Q2hhciA9IGlucHV0VmFsdWUucmVwbGFjZShnZXRCdWZmZXIoKS5qb2luKFwiXCIpLCBcIlwiKTtcclxuXHRcdFx0XHRcdFx0aWYgKGlucHV0Q2hhci5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIga2V5cHJlc3MgPSBuZXcgJC5FdmVudChcImtleXByZXNzXCIpO1xyXG5cdFx0XHRcdFx0XHRcdGtleXByZXNzLndoaWNoID0gaW5wdXRDaGFyLmNoYXJDb2RlQXQoMCk7XHJcblx0XHRcdFx0XHRcdFx0RXZlbnRIYW5kbGVycy5rZXlwcmVzc0V2ZW50LmNhbGwoaW5wdXQsIGtleXByZXNzLCB0cnVlLCB0cnVlLCBmYWxzZSwgZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zW2NhcmV0UG9zLmJlZ2luIC0gMV0gPyBjYXJldFBvcy5iZWdpbiA6IGNhcmV0UG9zLmJlZ2luIC0gMSk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNhcmV0UG9zLmJlZ2luID4gaW5wdXRWYWx1ZS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0Y2FyZXQoaW5wdXQsIGlucHV0VmFsdWUubGVuZ3RoKTtcclxuXHRcdFx0XHRcdFx0Y2FyZXRQb3MgPSBjYXJldChpbnB1dCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvL2RldGVjdCAmIHRyZWF0IHBvc3NpYmxlIGJhY2tzcGFjZSBiZWZvcmUgc3RhdGljXHJcblx0XHRcdFx0XHRpZiAoKGdldEJ1ZmZlcigpLmxlbmd0aCAtIGlucHV0VmFsdWUubGVuZ3RoKSA9PT0gMSAmJiBpbnB1dFZhbHVlLmNoYXJBdChjYXJldFBvcy5iZWdpbikgIT09IGdldEJ1ZmZlcigpW2NhcmV0UG9zLmJlZ2luXSAmJiBpbnB1dFZhbHVlLmNoYXJBdChjYXJldFBvcy5iZWdpbiArIDEpICE9PSBnZXRCdWZmZXIoKVtjYXJldFBvcy5iZWdpbl0gJiYgIWlzTWFzayhjYXJldFBvcy5iZWdpbikpIHtcclxuXHRcdFx0XHRcdFx0ZS5rZXlDb2RlID0gSW5wdXRtYXNrLmtleUNvZGUuQkFDS1NQQUNFO1xyXG5cdFx0XHRcdFx0XHRFdmVudEhhbmRsZXJzLmtleWRvd25FdmVudC5jYWxsKGlucHV0LCBlKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHZhciBsdnAgPSBnZXRMYXN0VmFsaWRQb3NpdGlvbigpICsgMTtcclxuXHRcdFx0XHRcdFx0dmFyIGJ1ZmZlclRlbXBsYXRlID0gZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpOyAvL2dldEJ1ZmZlcigpLnNsaWNlKGx2cCkuam9pbignJyk7XHJcblx0XHRcdFx0XHRcdHdoaWxlIChpbnB1dFZhbHVlLm1hdGNoKElucHV0bWFzay5lc2NhcGVSZWdleChidWZmZXJUZW1wbGF0ZSkgKyBcIiRcIikgPT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRidWZmZXJUZW1wbGF0ZSA9IGJ1ZmZlclRlbXBsYXRlLnNsaWNlKDEpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnJlcGxhY2UoYnVmZmVyVGVtcGxhdGUsIFwiXCIpO1xyXG5cdFx0XHRcdFx0XHRpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5zcGxpdChcIlwiKTtcclxuXHRcdFx0XHRcdFx0Y2hlY2tWYWwoaW5wdXQsIHRydWUsIGZhbHNlLCBpbnB1dFZhbHVlLCBlLCBjYXJldFBvcy5iZWdpbiA8IGx2cCk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoaXNDb21wbGV0ZShnZXRCdWZmZXIoKSkgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdFx0XHQkKGlucHV0KS50cmlnZ2VyKFwiY29tcGxldGVcIik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldFZhbHVlRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0dGhpcy5pbnB1dG1hc2sucmVmcmVzaFZhbHVlID0gZmFsc2U7XHJcblx0XHRcdFx0dmFyIGlucHV0ID0gdGhpcyxcclxuXHRcdFx0XHRcdHZhbHVlID0gaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpO1xyXG5cdFx0XHRcdGNoZWNrVmFsKGlucHV0LCB0cnVlLCBmYWxzZSwgKCQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlTWFzaykgPyAob3B0cy5vbkJlZm9yZU1hc2sodmFsdWUsIG9wdHMpIHx8IHZhbHVlKSA6IHZhbHVlKS5zcGxpdChcIlwiKSk7XHJcblx0XHRcdFx0dW5kb1ZhbHVlID0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKTtcclxuXHRcdFx0XHRpZiAoKG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgfHwgb3B0cy5jbGVhckluY29tcGxldGUpICYmIGlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQoKSA9PT0gZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpKSB7XHJcblx0XHRcdFx0XHRpbnB1dC5pbnB1dG1hc2suX3ZhbHVlU2V0KFwiXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0Zm9jdXNFdmVudDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHR2YXIgaW5wdXQgPSB0aGlzLFxyXG5cdFx0XHRcdFx0bnB0VmFsdWUgPSBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCk7XHJcblx0XHRcdFx0aWYgKG9wdHMuc2hvd01hc2tPbkZvY3VzICYmICghb3B0cy5zaG93TWFza09uSG92ZXIgfHwgKG9wdHMuc2hvd01hc2tPbkhvdmVyICYmIG5wdFZhbHVlID09PSBcIlwiKSkpIHtcclxuXHRcdFx0XHRcdGlmIChpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkgIT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikpIHtcclxuXHRcdFx0XHRcdFx0d3JpdGVCdWZmZXIoaW5wdXQsIGdldEJ1ZmZlcigpLCBzZWVrTmV4dChnZXRMYXN0VmFsaWRQb3NpdGlvbigpKSk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG1vdXNlRW50ZXIgPT09IGZhbHNlKSB7IC8vb25seSBleGVjdXRlZCBvbiBmb2N1cyB3aXRob3V0IG1vdXNlZW50ZXJcclxuXHRcdFx0XHRcdFx0Y2FyZXQoaW5wdXQsIHNlZWtOZXh0KGdldExhc3RWYWxpZFBvc2l0aW9uKCkpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG9wdHMucG9zaXRpb25DYXJldE9uVGFiID09PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRFdmVudEhhbmRsZXJzLmNsaWNrRXZlbnQuYXBwbHkoaW5wdXQsIFtlLCB0cnVlXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHVuZG9WYWx1ZSA9IGdldEJ1ZmZlcigpLmpvaW4oXCJcIik7XHJcblx0XHRcdH0sXHJcblx0XHRcdG1vdXNlbGVhdmVFdmVudDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHR2YXIgaW5wdXQgPSB0aGlzO1xyXG5cdFx0XHRcdG1vdXNlRW50ZXIgPSBmYWxzZTtcclxuXHRcdFx0XHRpZiAob3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBpbnB1dCkge1xyXG5cdFx0XHRcdFx0dmFyIGJ1ZmZlciA9IGdldEJ1ZmZlcigpLnNsaWNlKCksXHJcblx0XHRcdFx0XHRcdG5wdFZhbHVlID0gaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpO1xyXG5cdFx0XHRcdFx0aWYgKG5wdFZhbHVlICE9PSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiKSAmJiBucHRWYWx1ZSAhPT0gXCJcIikge1xyXG5cdFx0XHRcdFx0XHRpZiAoZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSA9PT0gLTEgJiYgbnB0VmFsdWUgPT09IGdldEJ1ZmZlclRlbXBsYXRlKCkuam9pbihcIlwiKSkge1xyXG5cdFx0XHRcdFx0XHRcdGJ1ZmZlciA9IFtdO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgeyAvL2NsZWFyb3V0IG9wdGlvbmFsIHRhaWwgb2YgdGhlIG1hc2tcclxuXHRcdFx0XHRcdFx0XHRjbGVhck9wdGlvbmFsVGFpbChidWZmZXIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHdyaXRlQnVmZmVyKGlucHV0LCBidWZmZXIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0Y2xpY2tFdmVudDogZnVuY3Rpb24gKGUsIHRhYmJlZCkge1xyXG5cdFx0XHRcdGZ1bmN0aW9uIGRvUmFkaXhGb2N1cyhjbGlja1Bvcykge1xyXG5cdFx0XHRcdFx0aWYgKG9wdHMucmFkaXhQb2ludCAhPT0gXCJcIikge1xyXG5cdFx0XHRcdFx0XHR2YXIgdnBzID0gZ2V0TWFza1NldCgpLnZhbGlkUG9zaXRpb25zO1xyXG5cdFx0XHRcdFx0XHRpZiAodnBzW2NsaWNrUG9zXSA9PT0gdW5kZWZpbmVkIHx8ICh2cHNbY2xpY2tQb3NdLmlucHV0ID09PSBnZXRQbGFjZWhvbGRlcihjbGlja1BvcykpKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGNsaWNrUG9zIDwgc2Vla05leHQoLTEpKSByZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcmFkaXhQb3MgPSAkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBnZXRCdWZmZXIoKSk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHJhZGl4UG9zICE9PSAtMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgdnAgaW4gdnBzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChyYWRpeFBvcyA8IHZwICYmIHZwc1t2cF0uaW5wdXQgIT09IGdldFBsYWNlaG9sZGVyKHZwKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR2YXIgaW5wdXQgPSB0aGlzO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyAvL25lZWRlZCBmb3IgQ2hyb21lIH4gaW5pdGlhbCBzZWxlY3Rpb24gY2xlYXJzIGFmdGVyIHRoZSBjbGlja2V2ZW50XHJcblx0XHRcdFx0XHRpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gaW5wdXQpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkQ2FyZXQgPSBjYXJldChpbnB1dCk7XHJcblx0XHRcdFx0XHRcdGlmICh0YWJiZWQpIHNlbGVjdGVkQ2FyZXQuYmVnaW4gPSBzZWxlY3RlZENhcmV0LmVuZDtcclxuXHRcdFx0XHRcdFx0aWYgKHNlbGVjdGVkQ2FyZXQuYmVnaW4gPT09IHNlbGVjdGVkQ2FyZXQuZW5kKSB7XHJcblx0XHRcdFx0XHRcdFx0c3dpdGNoIChvcHRzLnBvc2l0aW9uQ2FyZXRPbkNsaWNrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFwibm9uZVwiOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJyYWRpeEZvY3VzXCI6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChkb1JhZGl4Rm9jdXMoc2VsZWN0ZWRDYXJldC5iZWdpbikpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgcmFkaXhQb3MgPSAkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBnZXRCdWZmZXIoKS5qb2luKFwiXCIpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXJldChpbnB1dCwgb3B0cy5udW1lcmljSW5wdXQgPyBzZWVrTmV4dChyYWRpeFBvcykgOiByYWRpeFBvcyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6IC8vbHZwOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgY2xpY2tQb3NpdGlvbiA9IHNlbGVjdGVkQ2FyZXQuYmVnaW4sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bHZjbGlja1Bvc2l0aW9uID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24oY2xpY2tQb3NpdGlvbiwgdHJ1ZSksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGFzdFBvc2l0aW9uID0gc2Vla05leHQobHZjbGlja1Bvc2l0aW9uKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjbGlja1Bvc2l0aW9uIDwgbGFzdFBvc2l0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FyZXQoaW5wdXQsICFpc01hc2soY2xpY2tQb3NpdGlvbikgJiYgIWlzTWFzayhjbGlja1Bvc2l0aW9uIC0gMSkgPyBzZWVrTmV4dChjbGlja1Bvc2l0aW9uKSA6IGNsaWNrUG9zaXRpb24pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IGdldFBsYWNlaG9sZGVyKGxhc3RQb3NpdGlvbik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKChwbGFjZWhvbGRlciAhPT0gXCJcIiAmJiBnZXRCdWZmZXIoKVtsYXN0UG9zaXRpb25dICE9PSBwbGFjZWhvbGRlciAmJiBnZXRUZXN0KGxhc3RQb3NpdGlvbikubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyICE9PSB0cnVlKSB8fCAoIWlzTWFzayhsYXN0UG9zaXRpb24pICYmIGdldFRlc3QobGFzdFBvc2l0aW9uKS5tYXRjaC5kZWYgPT09IHBsYWNlaG9sZGVyKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFzdFBvc2l0aW9uID0gc2Vla05leHQobGFzdFBvc2l0aW9uKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FyZXQoaW5wdXQsIGxhc3RQb3NpdGlvbik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSwgMCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGRibGNsaWNrRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0dmFyIGlucHV0ID0gdGhpcztcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGNhcmV0KGlucHV0LCAwLCBzZWVrTmV4dChnZXRMYXN0VmFsaWRQb3NpdGlvbigpKSk7XHJcblx0XHRcdFx0fSwgMCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGN1dEV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdHZhciBpbnB1dCA9IHRoaXMsXHJcblx0XHRcdFx0XHQkaW5wdXQgPSAkKGlucHV0KSxcclxuXHRcdFx0XHRcdHBvcyA9IGNhcmV0KGlucHV0KSxcclxuXHRcdFx0XHRcdGV2ID0gZS5vcmlnaW5hbEV2ZW50IHx8IGU7XHJcblxyXG5cdFx0XHRcdC8vY29ycmVjdCBjbGlwYm9hcmREYXRhXHJcblx0XHRcdFx0dmFyIGNsaXBib2FyZERhdGEgPSB3aW5kb3cuY2xpcGJvYXJkRGF0YSB8fCBldi5jbGlwYm9hcmREYXRhLFxyXG5cdFx0XHRcdFx0Y2xpcERhdGEgPSBpc1JUTCA/IGdldEJ1ZmZlcigpLnNsaWNlKHBvcy5lbmQsIHBvcy5iZWdpbikgOiBnZXRCdWZmZXIoKS5zbGljZShwb3MuYmVnaW4sIHBvcy5lbmQpO1xyXG5cdFx0XHRcdGNsaXBib2FyZERhdGEuc2V0RGF0YShcInRleHRcIiwgaXNSVEwgPyBjbGlwRGF0YS5yZXZlcnNlKCkuam9pbihcIlwiKSA6IGNsaXBEYXRhLmpvaW4oXCJcIikpO1xyXG5cdFx0XHRcdGlmIChkb2N1bWVudC5leGVjQ29tbWFuZCkgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpOyAvLyBjb3B5IHNlbGVjdGVkIGNvbnRlbnQgdG8gc3lzdGVtIGNsaXBiYW9yZFxyXG5cclxuXHRcdFx0XHRoYW5kbGVSZW1vdmUoaW5wdXQsIElucHV0bWFzay5rZXlDb2RlLkRFTEVURSwgcG9zKTtcclxuXHRcdFx0XHR3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QnVmZmVyKCksIGdldE1hc2tTZXQoKS5wLCBlLCB1bmRvVmFsdWUgIT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikpO1xyXG5cclxuXHRcdFx0XHRpZiAoaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpID09PSBnZXRCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oXCJcIikpIHtcclxuXHRcdFx0XHRcdCRpbnB1dC50cmlnZ2VyKFwiY2xlYXJlZFwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGJsdXJFdmVudDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHR2YXIgJGlucHV0ID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdGlucHV0ID0gdGhpcztcclxuXHRcdFx0XHRpZiAoaW5wdXQuaW5wdXRtYXNrKSB7XHJcblx0XHRcdFx0XHR2YXIgbnB0VmFsdWUgPSBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCksXHJcblx0XHRcdFx0XHRcdGJ1ZmZlciA9IGdldEJ1ZmZlcigpLnNsaWNlKCk7XHJcblx0XHRcdFx0XHRpZiAodW5kb1ZhbHVlICE9PSBidWZmZXIuam9pbihcIlwiKSkge1xyXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgLy9jaGFuZ2UgZXZlbnQgc2hvdWxkIGJlIHRyaWdnZXJlZCBhZnRlciB0aGUgb3RoZXIgYnVmZmVyIG1hbmlwdWxhdGlvbnMgb24gYmx1clxyXG5cdFx0XHRcdFx0XHRcdCRpbnB1dC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG5cdFx0XHRcdFx0XHRcdHVuZG9WYWx1ZSA9IGJ1ZmZlci5qb2luKFwiXCIpO1xyXG5cdFx0XHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChucHRWYWx1ZSAhPT0gXCJcIikge1xyXG5cdFx0XHRcdFx0XHRpZiAob3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cykge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChnZXRMYXN0VmFsaWRQb3NpdGlvbigpID09PSAtMSAmJiBucHRWYWx1ZSA9PT0gZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRidWZmZXIgPSBbXTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgeyAvL2NsZWFyb3V0IG9wdGlvbmFsIHRhaWwgb2YgdGhlIG1hc2tcclxuXHRcdFx0XHRcdFx0XHRcdGNsZWFyT3B0aW9uYWxUYWlsKGJ1ZmZlcik7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChpc0NvbXBsZXRlKGJ1ZmZlcikgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQkaW5wdXQudHJpZ2dlcihcImluY29tcGxldGVcIik7XHJcblx0XHRcdFx0XHRcdFx0fSwgMCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKG9wdHMuY2xlYXJJbmNvbXBsZXRlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNldE1hc2tTZXQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJ1ZmZlciA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnVmZmVyID0gZ2V0QnVmZmVyVGVtcGxhdGUoKS5zbGljZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0d3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlciwgdW5kZWZpbmVkLCBlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdG1vdXNlZW50ZXJFdmVudDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHR2YXIgaW5wdXQgPSB0aGlzO1xyXG5cdFx0XHRcdG1vdXNlRW50ZXIgPSB0cnVlO1xyXG5cdFx0XHRcdGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBpbnB1dCAmJiBvcHRzLnNob3dNYXNrT25Ib3Zlcikge1xyXG5cdFx0XHRcdFx0aWYgKGlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQoKSAhPT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSkge1xyXG5cdFx0XHRcdFx0XHR3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QnVmZmVyKCkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0c3VibWl0RXZlbnQ6IGZ1bmN0aW9uIChlKSB7IC8vdHJpZ2dlciBjaGFuZ2Ugb24gc3VibWl0IGlmIGFueVxyXG5cdFx0XHRcdGlmICh1bmRvVmFsdWUgIT09IGdldEJ1ZmZlcigpLmpvaW4oXCJcIikpIHtcclxuXHRcdFx0XHRcdCRlbC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAob3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyAmJiBnZXRMYXN0VmFsaWRQb3NpdGlvbigpID09PSAtMSAmJiBlbC5pbnB1dG1hc2suX3ZhbHVlR2V0ICYmIGVsLmlucHV0bWFzay5fdmFsdWVHZXQoKSA9PT0gZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpKSB7XHJcblx0XHRcdFx0XHRlbC5pbnB1dG1hc2suX3ZhbHVlU2V0KFwiXCIpOyAvL2NsZWFyIG1hc2t0ZW1wbGV0ZSBvbiBzdWJtaXQgYW5kIHN0aWxsIGhhcyBmb2N1c1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAob3B0cy5yZW1vdmVNYXNrT25TdWJtaXQpIHtcclxuXHRcdFx0XHRcdGVsLmlucHV0bWFzay5fdmFsdWVTZXQoZWwuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKSwgdHJ1ZSk7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0d3JpdGVCdWZmZXIoZWwsIGdldEJ1ZmZlcigpKTtcclxuXHRcdFx0XHRcdH0sIDApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0cmVzZXRFdmVudDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRlbC5pbnB1dG1hc2sucmVmcmVzaFZhbHVlID0gdHJ1ZTsgLy9pbmRpY2F0ZSBhIGZvcmNlZCByZWZyZXNoIHdoZW4gdGhlcmUgaXMgYSBjYWxsIHRvIHRoZSB2YWx1ZSBiZWZvcmUgbGVhdmluZyB0aGUgdHJpZ2dlcmluZyBldmVudCBmblxyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0JGVsLnRyaWdnZXIoXCJzZXR2YWx1ZVwiKTtcclxuXHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbG9yTWFzayhpbnB1dCkge1xyXG5cdFx0XHRmdW5jdGlvbiBmaW5kQ2FyZXRQb3MoY2xpZW50eCkge1xyXG5cdFx0XHRcdC8vY2FsY3VsYXRlIHRleHQgd2lkdGhcclxuXHRcdFx0XHR2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSwgY2FyZXRQb3M7XHJcblx0XHRcdFx0Zm9yICh2YXIgc3R5bGUgaW4gY29tcHV0ZWRTdHlsZSkgeyAvL2Nsb25lIHN0eWxlc1xyXG5cdFx0XHRcdFx0aWYgKGlzTmFOKHN0eWxlKSAmJiBzdHlsZS5pbmRleE9mKFwiZm9udFwiKSAhPT0gLTEpIHtcclxuXHRcdFx0XHRcdFx0ZS5zdHlsZVtzdHlsZV0gPSBjb21wdXRlZFN0eWxlW3N0eWxlXTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZS5zdHlsZS50ZXh0VHJhbnNmb3JtID0gY29tcHV0ZWRTdHlsZS50ZXh0VHJhbnNmb3JtO1xyXG5cdFx0XHRcdGUuc3R5bGUubGV0dGVyU3BhY2luZyA9IGNvbXB1dGVkU3R5bGUubGV0dGVyU3BhY2luZztcclxuXHRcdFx0XHRlLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG5cdFx0XHRcdGUuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCI7XHJcblx0XHRcdFx0ZS5zdHlsZS53aWR0aCA9IFwiYXV0b1wiO1xyXG5cdFx0XHRcdGUuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcblx0XHRcdFx0ZS5zdHlsZS53aGl0ZVNwYWNlID0gXCJub3dyYXBcIjtcclxuXHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlKTtcclxuXHRcdFx0XHR2YXIgaW5wdXRUZXh0ID0gaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpLCBwcmV2aW91c1dpZHRoID0gMCwgaXRsO1xyXG5cdFx0XHRcdGZvciAoY2FyZXRQb3MgPSAwLCBpdGwgPSBpbnB1dFRleHQubGVuZ3RoOyBjYXJldFBvcyA8PSBpdGw7IGNhcmV0UG9zKyspIHtcclxuXHRcdFx0XHRcdGUuaW5uZXJIVE1MICs9IGlucHV0VGV4dC5jaGFyQXQoY2FyZXRQb3MpIHx8IFwiX1wiO1xyXG5cdFx0XHRcdFx0aWYgKGUub2Zmc2V0V2lkdGggPj0gY2xpZW50eCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgb2Zmc2V0MSA9IChjbGllbnR4IC0gcHJldmlvdXNXaWR0aCk7XHJcblx0XHRcdFx0XHRcdHZhciBvZmZzZXQyID0gZS5vZmZzZXRXaWR0aCAtIGNsaWVudHg7XHJcblx0XHRcdFx0XHRcdGUuaW5uZXJIVE1MID0gaW5wdXRUZXh0LmNoYXJBdChjYXJldFBvcyk7XHJcblx0XHRcdFx0XHRcdG9mZnNldDEgLT0gKGUub2Zmc2V0V2lkdGggLyAzKTtcclxuXHRcdFx0XHRcdFx0Y2FyZXRQb3MgPSBvZmZzZXQxIDwgb2Zmc2V0MiA/IGNhcmV0UG9zIC0gMSA6IGNhcmV0UG9zO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHByZXZpb3VzV2lkdGggPSBlLm9mZnNldFdpZHRoO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGUpO1xyXG5cdFx0XHRcdHJldHVybiBjYXJldFBvcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gcG9zaXRpb24oKSB7XHJcblx0XHRcdFx0Y29sb3JNYXNrLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG5cdFx0XHRcdGNvbG9yTWFzay5zdHlsZS50b3AgPSBvZmZzZXQudG9wICsgXCJweFwiO1xyXG5cdFx0XHRcdGNvbG9yTWFzay5zdHlsZS5sZWZ0ID0gb2Zmc2V0LmxlZnQgKyBcInB4XCI7XHJcblx0XHRcdFx0Y29sb3JNYXNrLnN0eWxlLndpZHRoID0gcGFyc2VJbnQoaW5wdXQub2Zmc2V0V2lkdGgpIC0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nTGVmdCkgLSBwYXJzZUludChjb21wdXRlZFN0eWxlLnBhZGRpbmdSaWdodCkgLSBwYXJzZUludChjb21wdXRlZFN0eWxlLmJvcmRlckxlZnRXaWR0aCkgLSBwYXJzZUludChjb21wdXRlZFN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpICsgXCJweFwiO1xyXG5cdFx0XHRcdGNvbG9yTWFzay5zdHlsZS5oZWlnaHQgPSBwYXJzZUludChpbnB1dC5vZmZzZXRIZWlnaHQpIC0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nVG9wKSAtIHBhcnNlSW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ0JvdHRvbSkgLSBwYXJzZUludChjb21wdXRlZFN0eWxlLmJvcmRlclRvcFdpZHRoKSAtIHBhcnNlSW50KGNvbXB1dGVkU3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpICsgXCJweFwiO1xyXG5cclxuXHRcdFx0XHRjb2xvck1hc2suc3R5bGUubGluZUhlaWdodCA9IGNvbG9yTWFzay5zdHlsZS5oZWlnaHQ7XHJcblx0XHRcdFx0Y29sb3JNYXNrLnN0eWxlLnpJbmRleCA9IGlzTmFOKGNvbXB1dGVkU3R5bGUuekluZGV4KSA/IC0xIDogY29tcHV0ZWRTdHlsZS56SW5kZXggLSAxO1xyXG5cdFx0XHRcdGNvbG9yTWFzay5zdHlsZS53ZWJraXRBcHBlYXJhbmNlID0gXCJ0ZXh0ZmllbGRcIjtcclxuXHRcdFx0XHRjb2xvck1hc2suc3R5bGUubW96QXBwZWFyYW5jZSA9IFwidGV4dGZpZWxkXCI7XHJcblx0XHRcdFx0Y29sb3JNYXNrLnN0eWxlLkFwcGVhcmFuY2UgPSBcInRleHRmaWVsZFwiO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIG9mZnNldCA9ICQoaW5wdXQpLnBvc2l0aW9uKCksXHJcblx0XHRcdFx0Y29tcHV0ZWRTdHlsZSA9IChpbnB1dC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IHx8IHdpbmRvdykuZ2V0Q29tcHV0ZWRTdHlsZShpbnB1dCwgbnVsbCksXHJcblx0XHRcdFx0cGFyZW50Tm9kZSA9IGlucHV0LnBhcmVudE5vZGU7XHJcblxyXG5cdFx0XHRjb2xvck1hc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbG9yTWFzayk7IC8vaW5zZXJ0IGF0IGJvZHkgdG8gcHJldmVudCBjc3MgY2xhc2ggOmxhc3QtY2hpbGQgZm9yIGV4YW1wbGVcclxuXHRcdFx0Zm9yICh2YXIgc3R5bGUgaW4gY29tcHV0ZWRTdHlsZSkgeyAvL2Nsb25lIHN0eWxlc1xyXG5cdFx0XHRcdGlmIChpc05hTihzdHlsZSkgJiYgc3R5bGUgIT09IFwiY3NzVGV4dFwiICYmIHN0eWxlLmluZGV4T2YoXCJ3ZWJraXRcIikgPT0gLTEpIHtcclxuXHRcdFx0XHRcdGNvbG9yTWFzay5zdHlsZVtzdHlsZV0gPSBjb21wdXRlZFN0eWxlW3N0eWxlXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vcmVzdHlsZSBpbnB1dFxyXG5cdFx0XHRpbnB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCI7XHJcblx0XHRcdGlucHV0LnN0eWxlLmNvbG9yID0gXCJ0cmFuc3BhcmVudFwiO1xyXG5cdFx0XHRpbnB1dC5zdHlsZS53ZWJraXRBcHBlYXJhbmNlID0gXCJjYXJldFwiO1xyXG5cdFx0XHRpbnB1dC5zdHlsZS5tb3pBcHBlYXJhbmNlID0gXCJjYXJldFwiO1xyXG5cdFx0XHRpbnB1dC5zdHlsZS5BcHBlYXJhbmNlID0gXCJjYXJldFwiO1xyXG5cclxuXHRcdFx0cG9zaXRpb24oKTtcclxuXHJcblx0XHRcdC8vZXZlbnQgcGFzc3Rocm91Z2hcclxuXHRcdFx0JCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0b2Zmc2V0ID0gJChpbnB1dCkucG9zaXRpb24oKTtcclxuXHRcdFx0XHRjb21wdXRlZFN0eWxlID0gKGlucHV0Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93KS5nZXRDb21wdXRlZFN0eWxlKGlucHV0LCBudWxsKTtcclxuXHRcdFx0XHRwb3NpdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0JChpbnB1dCkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdGNhcmV0KGlucHV0LCBmaW5kQ2FyZXRQb3MoZS5jbGllbnRYKSk7XHJcblx0XHRcdFx0cmV0dXJuIEV2ZW50SGFuZGxlcnMuY2xpY2tFdmVudC5jYWxsKHRoaXMsIFtlXSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKGlucHV0KS5vbihcImtleWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRpZiAoIWUuc2hpZnRLZXkgJiYgb3B0cy5pbnNlcnRNb2RlICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdHJlbmRlckNvbG9yTWFzayhpbnB1dCk7XHJcblx0XHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJlbmRlckNvbG9yTWFzayhpbnB1dCwgYnVmZmVyLCBjYXJldFBvcykge1xyXG5cdFx0XHRmdW5jdGlvbiBoYW5kbGVTdGF0aWMoKSB7XHJcblx0XHRcdFx0aWYgKCFpc1N0YXRpYyAmJiAodGVzdC5mbiA9PT0gbnVsbCB8fCB0ZXN0UG9zLmlucHV0ID09PSB1bmRlZmluZWQpKSB7XHJcblx0XHRcdFx0XHRpc1N0YXRpYyA9IHRydWU7XHJcblx0XHRcdFx0XHRtYXNrVGVtcGxhdGUgKz0gXCI8c3BhbiBjbGFzcz0naW0tc3RhdGljJyc+XCJcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGlzU3RhdGljICYmICh0ZXN0LmZuICE9PSBudWxsICYmIHRlc3RQb3MuaW5wdXQgIT09IHVuZGVmaW5lZCkpIHtcclxuXHRcdFx0XHRcdGlzU3RhdGljID0gZmFsc2U7XHJcblx0XHRcdFx0XHRtYXNrVGVtcGxhdGUgKz0gXCI8L3NwYW4+XCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjb2xvck1hc2sgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGJ1ZmZlciA9IGJ1ZmZlciB8fCBnZXRCdWZmZXIoKTtcclxuXHRcdFx0XHRpZiAoY2FyZXRQb3MgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0Y2FyZXRQb3MgPSBjYXJldChpbnB1dCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChjYXJldFBvcy5iZWdpbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRjYXJldFBvcyA9IHtiZWdpbjogY2FyZXRQb3MsIGVuZDogY2FyZXRQb3N9O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIG1hc2tUZW1wbGF0ZSA9IFwiXCIsIGlzU3RhdGljID0gZmFsc2U7XHJcblx0XHRcdFx0aWYgKGJ1ZmZlciAhPSBcIlwiKSB7XHJcblx0XHRcdFx0XHR2YXIgbmR4SW50bHpyLCBwb3MgPSAwLFxyXG5cdFx0XHRcdFx0XHR0ZXN0LCB0ZXN0UG9zLCBsdnAgPSBnZXRMYXN0VmFsaWRQb3NpdGlvbigpO1xyXG5cdFx0XHRcdFx0ZG8ge1xyXG5cdFx0XHRcdFx0XHRpZiAocG9zID09PSBjYXJldFBvcy5iZWdpbiAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpbnB1dCkge1xyXG5cdFx0XHRcdFx0XHRcdG1hc2tUZW1wbGF0ZSArPSBcIjxzcGFuIGNsYXNzPSdpbS1jYXJldCcgc3R5bGU9J2JvcmRlci1yaWdodC13aWR0aDogMXB4O2JvcmRlci1yaWdodC1zdHlsZTogc29saWQ7Jz48L3NwYW4+XCI7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aWYgKGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdKSB7XHJcblx0XHRcdFx0XHRcdFx0dGVzdFBvcyA9IGdldE1hc2tTZXQoKS52YWxpZFBvc2l0aW9uc1twb3NdO1xyXG5cdFx0XHRcdFx0XHRcdHRlc3QgPSB0ZXN0UG9zLm1hdGNoO1xyXG5cdFx0XHRcdFx0XHRcdG5keEludGx6ciA9IHRlc3RQb3MubG9jYXRvci5zbGljZSgpO1xyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZVN0YXRpYygpO1xyXG5cdFx0XHRcdFx0XHRcdG1hc2tUZW1wbGF0ZSArPSB0ZXN0UG9zLmlucHV0O1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRlc3RQb3MgPSBnZXRUZXN0VGVtcGxhdGUocG9zLCBuZHhJbnRsenIsIHBvcyAtIDEpO1xyXG5cdFx0XHRcdFx0XHRcdHRlc3QgPSB0ZXN0UG9zLm1hdGNoO1xyXG5cdFx0XHRcdFx0XHRcdG5keEludGx6ciA9IHRlc3RQb3MubG9jYXRvci5zbGljZSgpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChvcHRzLmppdE1hc2tpbmcgPT09IGZhbHNlIHx8IHBvcyA8IGx2cCB8fCAodHlwZW9mIG9wdHMuaml0TWFza2luZyA9PT0gXCJudW1iZXJcIiAmJiBpc0Zpbml0ZShvcHRzLmppdE1hc2tpbmcpICYmIG9wdHMuaml0TWFza2luZyA+IHBvcykpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGhhbmRsZVN0YXRpYygpO1xyXG5cdFx0XHRcdFx0XHRcdFx0bWFza1RlbXBsYXRlICs9IGdldFBsYWNlaG9sZGVyKHBvcywgdGVzdCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHBvcysrO1xyXG5cdFx0XHRcdFx0fSB3aGlsZSAoKG1heExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IHBvcyA8IG1heExlbmd0aCkgJiYgKHRlc3QuZm4gIT09IG51bGwgfHwgdGVzdC5kZWYgIT09IFwiXCIpIHx8IGx2cCA+IHBvcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbG9yTWFzay5pbm5lckhUTUwgPSBtYXNrVGVtcGxhdGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBtYXNrKGVsZW0pIHtcclxuXHRcdFx0ZnVuY3Rpb24gaXNFbGVtZW50VHlwZVN1cHBvcnRlZChpbnB1dCwgb3B0cykge1xyXG5cdFx0XHRcdGZ1bmN0aW9uIHBhdGNoVmFsdWVQcm9wZXJ0eShucHQpIHtcclxuXHRcdFx0XHRcdHZhciB2YWx1ZUdldDtcclxuXHRcdFx0XHRcdHZhciB2YWx1ZVNldDtcclxuXHJcblx0XHRcdFx0XHRmdW5jdGlvbiBwYXRjaFZhbGhvb2sodHlwZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoJC52YWxIb29rcyAmJiAoJC52YWxIb29rc1t0eXBlXSA9PT0gdW5kZWZpbmVkIHx8ICQudmFsSG9va3NbdHlwZV0uaW5wdXRtYXNrcGF0Y2ggIT09IHRydWUpKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHZhbGhvb2tHZXQgPSAkLnZhbEhvb2tzW3R5cGVdICYmICQudmFsSG9va3NbdHlwZV0uZ2V0ID8gJC52YWxIb29rc1t0eXBlXS5nZXQgOiBmdW5jdGlvbiAoZWxlbSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0udmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgdmFsaG9va1NldCA9ICQudmFsSG9va3NbdHlwZV0gJiYgJC52YWxIb29rc1t0eXBlXS5zZXQgPyAkLnZhbEhvb2tzW3R5cGVdLnNldCA6IGZ1bmN0aW9uIChlbGVtLCB2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZWxlbS52YWx1ZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGVsZW07XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0JC52YWxIb29rc1t0eXBlXSA9IHtcclxuXHRcdFx0XHRcdFx0XHRcdGdldDogZnVuY3Rpb24gKGVsZW0pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGVsZW0uaW5wdXRtYXNrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGVsZW0uaW5wdXRtYXNrLm9wdHMuYXV0b1VubWFzaykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0uaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IHZhbGhvb2tHZXQoZWxlbSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZ2V0TGFzdFZhbGlkUG9zaXRpb24odW5kZWZpbmVkLCB1bmRlZmluZWQsIGVsZW0uaW5wdXRtYXNrLm1hc2tzZXQudmFsaWRQb3NpdGlvbnMpICE9PSAtMSB8fCBvcHRzLm51bGxhYmxlICE9PSB0cnVlID8gcmVzdWx0IDogXCJcIjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSByZXR1cm4gdmFsaG9va0dldChlbGVtKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uIChlbGVtLCB2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgJGVsZW0gPSAkKGVsZW0pLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gdmFsaG9va1NldChlbGVtLCB2YWx1ZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlbGVtLmlucHV0bWFzaykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRlbGVtLnRyaWdnZXIoXCJzZXR2YWx1ZVwiKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdGlucHV0bWFza3BhdGNoOiB0cnVlXHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZ1bmN0aW9uIGdldHRlcigpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuaW5wdXRtYXNrKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuaW5wdXRtYXNrLm9wdHMuYXV0b1VubWFzayA/XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCkgOlxyXG5cdFx0XHRcdFx0XHRcdFx0KGdldExhc3RWYWxpZFBvc2l0aW9uKCkgIT09IC0xIHx8IG9wdHMubnVsbGFibGUgIT09IHRydWUgP1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcyAmJiBvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzID9cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQoaXNSVEwgPyBjbGVhck9wdGlvbmFsVGFpbChnZXRCdWZmZXIoKS5zbGljZSgpKS5yZXZlcnNlKCkgOiBjbGVhck9wdGlvbmFsVGFpbChnZXRCdWZmZXIoKS5zbGljZSgpKSkuam9pbihcIlwiKSA6XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWVHZXQuY2FsbCh0aGlzKSkgOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIlwiKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHJldHVybiB2YWx1ZUdldC5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZ1bmN0aW9uIHNldHRlcih2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHR2YWx1ZVNldC5jYWxsKHRoaXMsIHZhbHVlKTtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuaW5wdXRtYXNrKSB7XHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS50cmlnZ2VyKFwic2V0dmFsdWVcIik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmdW5jdGlvbiBpbnN0YWxsTmF0aXZlVmFsdWVTZXRGYWxsYmFjayhucHQpIHtcclxuXHRcdFx0XHRcdFx0RXZlbnRSdWxlci5vbihucHQsIFwibW91c2VlbnRlclwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgJGlucHV0ID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdFx0XHRcdGlucHV0ID0gdGhpcyxcclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlID0gaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpO1xyXG5cdFx0XHRcdFx0XHRcdGlmICh2YWx1ZSAhPT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKSAvKiYmIGdldExhc3RWYWxpZFBvc2l0aW9uKCkgPiAwKi8pIHtcclxuXHRcdFx0XHRcdFx0XHRcdCRpbnB1dC50cmlnZ2VyKFwic2V0dmFsdWVcIik7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoIW5wdC5pbnB1dG1hc2suX192YWx1ZUdldCkge1xyXG5cdFx0XHRcdFx0XHRpZiAob3B0cy5ub1ZhbHVlUGF0Y2hpbmcgIT09IHRydWUpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcikge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBPYmplY3QuZ2V0UHJvdG90eXBlT2YgIT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRPYmplY3QuZ2V0UHJvdG90eXBlT2YgPSB0eXBlb2YgXCJ0ZXN0XCIuX19wcm90b19fID09PSBcIm9iamVjdFwiID8gZnVuY3Rpb24gKG9iamVjdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBvYmplY3QuX19wcm90b19fO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IDogZnVuY3Rpb24gKG9iamVjdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBvYmplY3QuY29uc3RydWN0b3IucHJvdG90eXBlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHZhciB2YWx1ZVByb3BlcnR5ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QuZ2V0UHJvdG90eXBlT2YobnB0KSwgXCJ2YWx1ZVwiKSA6IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICh2YWx1ZVByb3BlcnR5ICYmIHZhbHVlUHJvcGVydHkuZ2V0ICYmIHZhbHVlUHJvcGVydHkuc2V0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlR2V0ID0gdmFsdWVQcm9wZXJ0eS5nZXQ7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlU2V0ID0gdmFsdWVQcm9wZXJ0eS5zZXQ7XHJcblx0XHRcdFx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucHQsIFwidmFsdWVcIiwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGdldDogZ2V0dGVyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNldDogc2V0dGVyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAobnB0LnRhZ05hbWUgIT09IFwiSU5QVVRcIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZUdldCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy50ZXh0Q29udGVudDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWVTZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucHQsIFwidmFsdWVcIiwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGdldDogZ2V0dGVyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNldDogc2V0dGVyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18gJiYgbnB0Ll9fbG9va3VwR2V0dGVyX18oXCJ2YWx1ZVwiKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWVHZXQgPSBucHQuX19sb29rdXBHZXR0ZXJfXyhcInZhbHVlXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWVTZXQgPSBucHQuX19sb29rdXBTZXR0ZXJfXyhcInZhbHVlXCIpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdG5wdC5fX2RlZmluZUdldHRlcl9fKFwidmFsdWVcIiwgZ2V0dGVyKTtcclxuXHRcdFx0XHRcdFx0XHRcdG5wdC5fX2RlZmluZVNldHRlcl9fKFwidmFsdWVcIiwgc2V0dGVyKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0bnB0LmlucHV0bWFzay5fX3ZhbHVlR2V0ID0gdmFsdWVHZXQ7IC8vc3RvcmUgbmF0aXZlIHByb3BlcnR5IGdldHRlclxyXG5cdFx0XHRcdFx0XHRcdG5wdC5pbnB1dG1hc2suX192YWx1ZVNldCA9IHZhbHVlU2V0OyAvL3N0b3JlIG5hdGl2ZSBwcm9wZXJ0eSBzZXR0ZXJcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRucHQuaW5wdXRtYXNrLl92YWx1ZUdldCA9IGZ1bmN0aW9uIChvdmVycnVsZVJUTCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBpc1JUTCAmJiBvdmVycnVsZVJUTCAhPT0gdHJ1ZSA/IHZhbHVlR2V0LmNhbGwodGhpcy5lbCkuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiB2YWx1ZUdldC5jYWxsKHRoaXMuZWwpO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRucHQuaW5wdXRtYXNrLl92YWx1ZVNldCA9IGZ1bmN0aW9uICh2YWx1ZSwgb3ZlcnJ1bGVSVEwpIHsgLy9udWxsIGNoZWNrIGlzIG5lZWRlZCBmb3IgSUU4ID0+IG90aGVyd2lzZSBjb252ZXJ0cyB0byBcIm51bGxcIlxyXG5cdFx0XHRcdFx0XHRcdHZhbHVlU2V0LmNhbGwodGhpcy5lbCwgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIiA6ICgob3ZlcnJ1bGVSVEwgIT09IHRydWUgJiYgaXNSVEwpID8gdmFsdWUuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiB2YWx1ZSkpO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHZhbHVlR2V0ID09PSB1bmRlZmluZWQpIHsgLy9qcXVlcnkudmFsIGZhbGxiYWNrXHJcblx0XHRcdFx0XHRcdFx0dmFsdWVHZXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRcdHZhbHVlU2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0XHRwYXRjaFZhbGhvb2sobnB0LnR5cGUpO1xyXG5cdFx0XHRcdFx0XHRcdGluc3RhbGxOYXRpdmVWYWx1ZVNldEZhbGxiYWNrKG5wdCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciBlbGVtZW50VHlwZSA9IGlucHV0LmdldEF0dHJpYnV0ZShcInR5cGVcIik7XHJcblx0XHRcdFx0dmFyIGlzU3VwcG9ydGVkID0gKGlucHV0LnRhZ05hbWUgPT09IFwiSU5QVVRcIiAmJiAkLmluQXJyYXkoZWxlbWVudFR5cGUsIG9wdHMuc3VwcG9ydHNJbnB1dFR5cGUpICE9PSAtMSkgfHwgaW5wdXQuaXNDb250ZW50RWRpdGFibGUgfHwgaW5wdXQudGFnTmFtZSA9PT0gXCJURVhUQVJFQVwiO1xyXG5cdFx0XHRcdGlmICghaXNTdXBwb3J0ZWQpIHtcclxuXHRcdFx0XHRcdGlmIChpbnB1dC50YWdOYW1lID09PSBcIklOUFVUXCIpIHtcclxuXHRcdFx0XHRcdFx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG5cdFx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIGVsZW1lbnRUeXBlKTtcclxuXHRcdFx0XHRcdFx0aXNTdXBwb3J0ZWQgPSBlbC50eXBlID09PSBcInRleHRcIjsgLy9hcHBseSBtYXNrIG9ubHkgaWYgdGhlIHR5cGUgaXMgbm90IG5hdGl2ZWx5IHN1cHBvcnRlZFxyXG5cdFx0XHRcdFx0XHRlbCA9IG51bGw7XHJcblx0XHRcdFx0XHR9IGVsc2UgaXNTdXBwb3J0ZWQgPSBcInBhcnRpYWxcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGlzU3VwcG9ydGVkICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0cGF0Y2hWYWx1ZVByb3BlcnR5KGlucHV0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGlzU3VwcG9ydGVkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgaXNTdXBwb3J0ZWQgPSBpc0VsZW1lbnRUeXBlU3VwcG9ydGVkKGVsZW0sIG9wdHMpO1xyXG5cdFx0XHRpZiAoaXNTdXBwb3J0ZWQgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0ZWwgPSBlbGVtO1xyXG5cdFx0XHRcdCRlbCA9ICQoZWwpO1xyXG5cclxuXHRcdFx0XHRpZiAoZWwuZGlyID09PSBcInJ0bFwiIHx8IG9wdHMucmlnaHRBbGlnbikge1xyXG5cdFx0XHRcdFx0ZWwuc3R5bGUudGV4dEFsaWduID0gXCJyaWdodFwiO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGVsLmRpciA9PT0gXCJydGxcIiB8fCBvcHRzLm51bWVyaWNJbnB1dCkge1xyXG5cdFx0XHRcdFx0ZWwuZGlyID0gXCJsdHJcIjtcclxuXHRcdFx0XHRcdGVsLnJlbW92ZUF0dHJpYnV0ZShcImRpclwiKTtcclxuXHRcdFx0XHRcdGVsLmlucHV0bWFzay5pc1JUTCA9IHRydWU7XHJcblx0XHRcdFx0XHRpc1JUTCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAob3B0cy5jb2xvck1hc2sgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdGluaXRpYWxpemVDb2xvck1hc2soZWwpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGFuZHJvaWQpIHtcclxuXHRcdFx0XHRcdGlmIChlbC5oYXNPd25Qcm9wZXJ0eShcImlucHV0bW9kZVwiKSkge1xyXG5cdFx0XHRcdFx0XHRlbC5pbnB1dG1vZGUgPSBvcHRzLmlucHV0bW9kZTtcclxuXHRcdFx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKFwiaW5wdXRtb2RlXCIsIG9wdHMuaW5wdXRtb2RlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChvcHRzLmFuZHJvaWRIYWNrID09PSBcInJ0Zm1cIikge1xyXG5cdFx0XHRcdFx0XHRpZiAob3B0cy5jb2xvck1hc2sgIT09IHRydWUpIHtcclxuXHRcdFx0XHRcdFx0XHRpbml0aWFsaXplQ29sb3JNYXNrKGVsKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbC50eXBlID0gXCJwYXNzd29yZFwiO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly91bmJpbmQgYWxsIGV2ZW50cyAtIHRvIG1ha2Ugc3VyZSB0aGF0IG5vIG90aGVyIG1hc2sgd2lsbCBpbnRlcmZlcmUgd2hlbiByZS1tYXNraW5nXHJcblx0XHRcdFx0RXZlbnRSdWxlci5vZmYoZWwpO1xyXG5cdFx0XHRcdGlmIChpc1N1cHBvcnRlZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0Ly9iaW5kIGV2ZW50c1xyXG5cdFx0XHRcdFx0RXZlbnRSdWxlci5vbihlbCwgXCJzdWJtaXRcIiwgRXZlbnRIYW5kbGVycy5zdWJtaXRFdmVudCk7XHJcblx0XHRcdFx0XHRFdmVudFJ1bGVyLm9uKGVsLCBcInJlc2V0XCIsIEV2ZW50SGFuZGxlcnMucmVzZXRFdmVudCk7XHJcblxyXG5cdFx0XHRcdFx0RXZlbnRSdWxlci5vbihlbCwgXCJtb3VzZWVudGVyXCIsIEV2ZW50SGFuZGxlcnMubW91c2VlbnRlckV2ZW50KTtcclxuXHRcdFx0XHRcdEV2ZW50UnVsZXIub24oZWwsIFwiYmx1clwiLCBFdmVudEhhbmRsZXJzLmJsdXJFdmVudCk7XHJcblx0XHRcdFx0XHRFdmVudFJ1bGVyLm9uKGVsLCBcImZvY3VzXCIsIEV2ZW50SGFuZGxlcnMuZm9jdXNFdmVudCk7XHJcblx0XHRcdFx0XHRFdmVudFJ1bGVyLm9uKGVsLCBcIm1vdXNlbGVhdmVcIiwgRXZlbnRIYW5kbGVycy5tb3VzZWxlYXZlRXZlbnQpO1xyXG5cdFx0XHRcdFx0aWYgKG9wdHMuY29sb3JNYXNrICE9PSB0cnVlKVxyXG5cdFx0XHRcdFx0XHRFdmVudFJ1bGVyLm9uKGVsLCBcImNsaWNrXCIsIEV2ZW50SGFuZGxlcnMuY2xpY2tFdmVudCk7XHJcblx0XHRcdFx0XHRFdmVudFJ1bGVyLm9uKGVsLCBcImRibGNsaWNrXCIsIEV2ZW50SGFuZGxlcnMuZGJsY2xpY2tFdmVudCk7XHJcblx0XHRcdFx0XHRFdmVudFJ1bGVyLm9uKGVsLCBcInBhc3RlXCIsIEV2ZW50SGFuZGxlcnMucGFzdGVFdmVudCk7XHJcblx0XHRcdFx0XHRFdmVudFJ1bGVyLm9uKGVsLCBcImRyYWdkcm9wXCIsIEV2ZW50SGFuZGxlcnMucGFzdGVFdmVudCk7XHJcblx0XHRcdFx0XHRFdmVudFJ1bGVyLm9uKGVsLCBcImRyb3BcIiwgRXZlbnRIYW5kbGVycy5wYXN0ZUV2ZW50KTtcclxuXHRcdFx0XHRcdEV2ZW50UnVsZXIub24oZWwsIFwiY3V0XCIsIEV2ZW50SGFuZGxlcnMuY3V0RXZlbnQpO1xyXG5cdFx0XHRcdFx0RXZlbnRSdWxlci5vbihlbCwgXCJjb21wbGV0ZVwiLCBvcHRzLm9uY29tcGxldGUpO1xyXG5cdFx0XHRcdFx0RXZlbnRSdWxlci5vbihlbCwgXCJpbmNvbXBsZXRlXCIsIG9wdHMub25pbmNvbXBsZXRlKTtcclxuXHRcdFx0XHRcdEV2ZW50UnVsZXIub24oZWwsIFwiY2xlYXJlZFwiLCBvcHRzLm9uY2xlYXJlZCk7XHJcblx0XHRcdFx0XHRpZiAob3B0cy5pbnB1dEV2ZW50T25seSAhPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0XHRFdmVudFJ1bGVyLm9uKGVsLCBcImtleWRvd25cIiwgRXZlbnRIYW5kbGVycy5rZXlkb3duRXZlbnQpO1xyXG5cdFx0XHRcdFx0XHRFdmVudFJ1bGVyLm9uKGVsLCBcImtleXByZXNzXCIsIEV2ZW50SGFuZGxlcnMua2V5cHJlc3NFdmVudCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRFdmVudFJ1bGVyLm9uKGVsLCBcImNvbXBvc2l0aW9uc3RhcnRcIiwgJC5ub29wKTtcclxuXHRcdFx0XHRcdEV2ZW50UnVsZXIub24oZWwsIFwiY29tcG9zaXRpb251cGRhdGVcIiwgJC5ub29wKTtcclxuXHRcdFx0XHRcdEV2ZW50UnVsZXIub24oZWwsIFwiY29tcG9zaXRpb25lbmRcIiwgJC5ub29wKTtcclxuXHRcdFx0XHRcdEV2ZW50UnVsZXIub24oZWwsIFwia2V5dXBcIiwgJC5ub29wKTtcclxuXHRcdFx0XHRcdEV2ZW50UnVsZXIub24oZWwsIFwiaW5wdXRcIiwgRXZlbnRIYW5kbGVycy5pbnB1dEZhbGxCYWNrRXZlbnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRFdmVudFJ1bGVyLm9uKGVsLCBcInNldHZhbHVlXCIsIEV2ZW50SGFuZGxlcnMuc2V0VmFsdWVFdmVudCk7XHJcblxyXG5cdFx0XHRcdC8vYXBwbHkgbWFza1xyXG5cdFx0XHRcdGdldEJ1ZmZlclRlbXBsYXRlKCk7IC8vaW5pdGlhbGl6ZSB0aGUgYnVmZmVyIGFuZCBnZXRtYXNrbGVuZ3RoXHJcblx0XHRcdFx0aWYgKGVsLmlucHV0bWFzay5fdmFsdWVHZXQoKSAhPT0gXCJcIiB8fCBvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzID09PSBmYWxzZSB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBlbCkge1xyXG5cdFx0XHRcdFx0dmFyIGluaXRpYWxWYWx1ZSA9ICQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlTWFzaykgPyAob3B0cy5vbkJlZm9yZU1hc2soZWwuaW5wdXRtYXNrLl92YWx1ZUdldCgpLCBvcHRzKSB8fCBlbC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkpIDogZWwuaW5wdXRtYXNrLl92YWx1ZUdldCgpO1xyXG5cdFx0XHRcdFx0Y2hlY2tWYWwoZWwsIHRydWUsIGZhbHNlLCBpbml0aWFsVmFsdWUuc3BsaXQoXCJcIikpO1xyXG5cdFx0XHRcdFx0dmFyIGJ1ZmZlciA9IGdldEJ1ZmZlcigpLnNsaWNlKCk7XHJcblx0XHRcdFx0XHR1bmRvVmFsdWUgPSBidWZmZXIuam9pbihcIlwiKTtcclxuXHRcdFx0XHRcdC8vIFdyYXAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpbiBhIHRyeS9jYXRjaCBibG9jayBzaW5jZSBJRTkgdGhyb3cgXCJVbnNwZWNpZmllZCBlcnJvclwiIGlmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgaXMgdW5kZWZpbmVkIHdoZW4gd2UgYXJlIGluIGFuIElGcmFtZS5cclxuXHRcdFx0XHRcdGlmIChpc0NvbXBsZXRlKGJ1ZmZlcikgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChvcHRzLmNsZWFySW5jb21wbGV0ZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJlc2V0TWFza1NldCgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAob3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBlbCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoZ2V0TGFzdFZhbGlkUG9zaXRpb24oKSA9PT0gLTEpIHtcclxuXHRcdFx0XHRcdFx0XHRidWZmZXIgPSBbXTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRjbGVhck9wdGlvbmFsVGFpbChidWZmZXIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR3cml0ZUJ1ZmZlcihlbCwgYnVmZmVyKTtcclxuXHRcdFx0XHRcdGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBlbCkgeyAvL3Bvc2l0aW9uIHRoZSBjYXJldCB3aGVuIGluIGZvY3VzXHJcblx0XHRcdFx0XHRcdGNhcmV0KGVsLCBzZWVrTmV4dChnZXRMYXN0VmFsaWRQb3NpdGlvbigpKSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG4vL2FjdGlvbiBvYmplY3RcclxuXHRcdHZhciB2YWx1ZUJ1ZmZlcjtcclxuXHRcdGlmIChhY3Rpb25PYmogIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRzd2l0Y2ggKGFjdGlvbk9iai5hY3Rpb24pIHtcclxuXHRcdFx0XHRjYXNlIFwiaXNDb21wbGV0ZVwiOlxyXG5cdFx0XHRcdFx0ZWwgPSBhY3Rpb25PYmouZWw7XHJcblx0XHRcdFx0XHRyZXR1cm4gaXNDb21wbGV0ZShnZXRCdWZmZXIoKSk7XHJcblx0XHRcdFx0Y2FzZSBcInVubWFza2VkdmFsdWVcIjpcclxuXHRcdFx0XHRcdGlmIChlbCA9PT0gdW5kZWZpbmVkIHx8IGFjdGlvbk9iai52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdHZhbHVlQnVmZmVyID0gYWN0aW9uT2JqLnZhbHVlO1xyXG5cdFx0XHRcdFx0XHR2YWx1ZUJ1ZmZlciA9ICgkLmlzRnVuY3Rpb24ob3B0cy5vbkJlZm9yZU1hc2spID8gKG9wdHMub25CZWZvcmVNYXNrKHZhbHVlQnVmZmVyLCBvcHRzKSB8fCB2YWx1ZUJ1ZmZlcikgOiB2YWx1ZUJ1ZmZlcikuc3BsaXQoXCJcIik7XHJcblx0XHRcdFx0XHRcdGNoZWNrVmFsKHVuZGVmaW5lZCwgZmFsc2UsIGZhbHNlLCBpc1JUTCA/IHZhbHVlQnVmZmVyLnJldmVyc2UoKSA6IHZhbHVlQnVmZmVyKTtcclxuXHRcdFx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlV3JpdGUpKSBvcHRzLm9uQmVmb3JlV3JpdGUodW5kZWZpbmVkLCBnZXRCdWZmZXIoKSwgMCwgb3B0cyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdW5tYXNrZWR2YWx1ZShlbCk7XHJcblx0XHRcdFx0Y2FzZSBcIm1hc2tcIjpcclxuXHRcdFx0XHRcdG1hc2soZWwpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBcImZvcm1hdFwiOlxyXG5cdFx0XHRcdFx0dmFsdWVCdWZmZXIgPSAoJC5pc0Z1bmN0aW9uKG9wdHMub25CZWZvcmVNYXNrKSA/IChvcHRzLm9uQmVmb3JlTWFzayhhY3Rpb25PYmoudmFsdWUsIG9wdHMpIHx8IGFjdGlvbk9iai52YWx1ZSkgOiBhY3Rpb25PYmoudmFsdWUpLnNwbGl0KFwiXCIpO1xyXG5cdFx0XHRcdFx0Y2hlY2tWYWwodW5kZWZpbmVkLCBmYWxzZSwgZmFsc2UsIGlzUlRMID8gdmFsdWVCdWZmZXIucmV2ZXJzZSgpIDogdmFsdWVCdWZmZXIpO1xyXG5cdFx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbihvcHRzLm9uQmVmb3JlV3JpdGUpKSBvcHRzLm9uQmVmb3JlV3JpdGUodW5kZWZpbmVkLCBnZXRCdWZmZXIoKSwgMCwgb3B0cyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGFjdGlvbk9iai5tZXRhZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBpc1JUTCA/IGdldEJ1ZmZlcigpLnNsaWNlKCkucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiBnZXRCdWZmZXIoKS5qb2luKFwiXCIpLFxyXG5cdFx0XHRcdFx0XHRcdG1ldGFkYXRhOiBtYXNrU2NvcGUuY2FsbCh0aGlzLCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcImFjdGlvblwiOiBcImdldG1ldGFkYXRhXCJcclxuXHRcdFx0XHRcdFx0XHR9LCBtYXNrc2V0LCBvcHRzKVxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBpc1JUTCA/IGdldEJ1ZmZlcigpLnNsaWNlKCkucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiBnZXRCdWZmZXIoKS5qb2luKFwiXCIpO1xyXG5cdFx0XHRcdGNhc2UgXCJpc1ZhbGlkXCI6XHJcblx0XHRcdFx0XHRpZiAoYWN0aW9uT2JqLnZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdHZhbHVlQnVmZmVyID0gYWN0aW9uT2JqLnZhbHVlLnNwbGl0KFwiXCIpO1xyXG5cdFx0XHRcdFx0XHRjaGVja1ZhbCh1bmRlZmluZWQsIGZhbHNlLCB0cnVlLCBpc1JUTCA/IHZhbHVlQnVmZmVyLnJldmVyc2UoKSA6IHZhbHVlQnVmZmVyKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGFjdGlvbk9iai52YWx1ZSA9IGdldEJ1ZmZlcigpLmpvaW4oXCJcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR2YXIgYnVmZmVyID0gZ2V0QnVmZmVyKCk7XHJcblx0XHRcdFx0XHR2YXIgcmwgPSBkZXRlcm1pbmVMYXN0UmVxdWlyZWRQb3NpdGlvbigpLFxyXG5cdFx0XHRcdFx0XHRsbWliID0gYnVmZmVyLmxlbmd0aCAtIDE7XHJcblx0XHRcdFx0XHRmb3IgKDsgbG1pYiA+IHJsOyBsbWliLS0pIHtcclxuXHRcdFx0XHRcdFx0aWYgKGlzTWFzayhsbWliKSkgYnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRidWZmZXIuc3BsaWNlKHJsLCBsbWliICsgMSAtIHJsKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gaXNDb21wbGV0ZShidWZmZXIpICYmIGFjdGlvbk9iai52YWx1ZSA9PT0gZ2V0QnVmZmVyKCkuam9pbihcIlwiKTtcclxuXHRcdFx0XHRjYXNlIFwiZ2V0ZW1wdHltYXNrXCI6XHJcblx0XHRcdFx0XHRyZXR1cm4gZ2V0QnVmZmVyVGVtcGxhdGUoKS5qb2luKFwiXCIpO1xyXG5cdFx0XHRcdGNhc2UgXCJyZW1vdmVcIjpcclxuXHRcdFx0XHRcdGlmIChlbCkge1xyXG5cdFx0XHRcdFx0XHQkZWwgPSAkKGVsKTtcclxuXHRcdFx0XHRcdFx0Ly93cml0ZW91dCB0aGUgdW5tYXNrZWR2YWx1ZVxyXG5cdFx0XHRcdFx0XHRlbC5pbnB1dG1hc2suX3ZhbHVlU2V0KHVubWFza2VkdmFsdWUoZWwpKTtcclxuXHRcdFx0XHRcdFx0Ly91bmJpbmQgYWxsIGV2ZW50c1xyXG5cdFx0XHRcdFx0XHRFdmVudFJ1bGVyLm9mZihlbCk7XHJcblx0XHRcdFx0XHRcdC8vcmVzdG9yZSB0aGUgdmFsdWUgcHJvcGVydHlcclxuXHRcdFx0XHRcdFx0dmFyIHZhbHVlUHJvcGVydHk7XHJcblx0XHRcdFx0XHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZikge1xyXG5cdFx0XHRcdFx0XHRcdHZhbHVlUHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5nZXRQcm90b3R5cGVPZihlbCksIFwidmFsdWVcIik7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHZhbHVlUHJvcGVydHkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChlbC5pbnB1dG1hc2suX192YWx1ZUdldCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsIFwidmFsdWVcIiwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGdldDogZWwuaW5wdXRtYXNrLl9fdmFsdWVHZXQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0OiBlbC5pbnB1dG1hc2suX192YWx1ZVNldCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWVcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18gJiYgZWwuX19sb29rdXBHZXR0ZXJfXyhcInZhbHVlXCIpKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGVsLmlucHV0bWFzay5fX3ZhbHVlR2V0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRlbC5fX2RlZmluZUdldHRlcl9fKFwidmFsdWVcIiwgZWwuaW5wdXRtYXNrLl9fdmFsdWVHZXQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0ZWwuX19kZWZpbmVTZXR0ZXJfXyhcInZhbHVlXCIsIGVsLmlucHV0bWFzay5fX3ZhbHVlU2V0KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0Ly9jbGVhciBkYXRhXHJcblx0XHRcdFx0XHRcdGVsLmlucHV0bWFzayA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBlbDtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgXCJnZXRtZXRhZGF0YVwiOlxyXG5cdFx0XHRcdFx0aWYgKCQuaXNBcnJheShtYXNrc2V0Lm1ldGFkYXRhKSkge1xyXG5cdFx0XHRcdFx0XHR2YXIgbWFza1RhcmdldCA9IGdldE1hc2tUZW1wbGF0ZSh0cnVlLCAwLCBmYWxzZSkuam9pbihcIlwiKTtcclxuXHRcdFx0XHRcdFx0JC5lYWNoKG1hc2tzZXQubWV0YWRhdGEsIGZ1bmN0aW9uIChuZHgsIG10ZHQpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAobXRkdC5tYXNrID09PSBtYXNrVGFyZ2V0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRtYXNrVGFyZ2V0ID0gbXRkdDtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbWFza1RhcmdldDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbWFza3NldC5tZXRhZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbi8vbWFrZSBpbnB1dG1hc2sgYXZhaWxhYmxlXHJcblx0d2luZG93LklucHV0bWFzayA9IElucHV0bWFzaztcclxuXHRyZXR1cm4gSW5wdXRtYXNrO1xyXG59KSk7Il19
