!function(e) {
    "function" == typeof define && define.amd ? define(["inputmask.dependencyLib", "inputmask"], e) : "object" == typeof exports ? module.exports = e(require("./inputmask.dependencyLib"), require("./inputmask")) : e(window.dependencyLib || jQuery, window.Inputmask)
}(function(e, r) {
    function a(e) {
        return isNaN(e) || 29 === new Date(e,2,0).getDate()
    }
    return r.extendAliases({
        "DD/MM/YYYY": {
            mask: "1/2/y",
            placeholder: "DD/MM/YYYY",
            regex: {
                val1pre: new RegExp("[0-3]"),
                val1: new RegExp("0[1-9]|[12][0-9]|3[01]"),
                val2pre: function(e) {
                    var a = r.escapeRegex.call(this, e);
                    return new RegExp("((0[1-9]|[12][0-9]|3[01])" + a + "[01])")
                },
                val2: function(e) {
                    var a = r.escapeRegex.call(this, e);
                    return new RegExp("((0[1-9]|[12][0-9])" + a + "(0[1-9]|1[012]))|(30" + a + "(0[13-9]|1[012]))|(31" + a + "(0[13578]|1[02]))")
                }
            },
            leapday: "29/02/",
            separator: "/",
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            },
            isInYearRange: function(e, r, a) {
                if (isNaN(e))
                    return !1;
                var t = parseInt(e.concat(r.toString().slice(e.length)))
                  , n = parseInt(e.concat(a.toString().slice(e.length)));
                return !isNaN(t) && r <= t && t <= a || !isNaN(n) && r <= n && n <= a
            },
            determinebaseyear: function(e, r, a) {
                var t = (new Date).getFullYear();
                if (e > t)
                    return e;
                if (r < t) {
                    for (var n = r.toString().slice(0, 2), i = r.toString().slice(2, 4); r < n + a; )
                        n--;
                    var s = n + i;
                    return e > s ? e : s
                }
                if (e <= t && t <= r) {
                    for (var o = t.toString().slice(0, 2); r < o + a; )
                        o--;
                    var l = o + a;
                    return l < e ? e : l
                }
                return t
            },
            onKeyDown: function(a, t, n, i) {
                var s = e(this);
                if (a.ctrlKey && a.keyCode === r.keyCode.RIGHT) {
                    var o = new Date;
                    s.val(o.getDate().toString() + (o.getMonth() + 1).toString() + o.getFullYear().toString()),
                    s.trigger("setvalue")
                }
            },
            getFrontValue: function(e, r, a) {
                for (var t = 0, n = 0, i = 0; i < e.length && "2" !== e.charAt(i); i++) {
                    var s = a.definitions[e.charAt(i)];
                    s ? (t += n,
                    n = s.cardinality) : n++
                }
                return r.join("").substr(t, n)
            },
            postValidation: function(e, r, t) {
                var n, i, s = e.join("");
                return 0 === t.mask.indexOf("y") ? (i = s.substr(0, 4),
                n = s.substr(4, 11)) : (i = s.substr(6, 11),
                n = s.substr(0, 6)),
                r && (n !== t.leapday || a(i))
            },
            definitions: {
                1: {
                    validator: function(e, r, a, t, n) {
                        var i = n.regex.val1.test(e);
                        return t || i || e.charAt(1) !== n.separator && "-./".indexOf(e.charAt(1)) === -1 || !(i = n.regex.val1.test("0" + e.charAt(0))) ? i : (r.buffer[a - 1] = "0",
                        {
                            refreshFromBuffer: {
                                start: a - 1,
                                end: a
                            },
                            pos: a,
                            c: e.charAt(0)
                        })
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(e, r, a, t, n) {
                            var i = e;
                            isNaN(r.buffer[a + 1]) || (i += r.buffer[a + 1]);
                            var s = 1 === i.length ? n.regex.val1pre.test(i) : n.regex.val1.test(i);
                            if (!t && !s) {
                                if (s = n.regex.val1.test(e + "0"))
                                    return r.buffer[a] = e,
                                    r.buffer[++a] = "0",
                                    {
                                        pos: a,
                                        c: "0"
                                    };
                                if (s = n.regex.val1.test("0" + e))
                                    return r.buffer[a] = "0",
                                    a++,
                                    {
                                        pos: a
                                    }
                            }
                            return s
                        },
                        cardinality: 1
                    }]
                },
                2: {
                    validator: function(e, r, a, t, n) {
                        var i = n.getFrontValue(r.mask, r.buffer, n);
                        i.indexOf(n.placeholder[0]) !== -1 && (i = "01" + n.separator);
                        var s = n.regex.val2(n.separator).test(i + e);
                        return t || s || e.charAt(1) !== n.separator && "-./".indexOf(e.charAt(1)) === -1 || !(s = n.regex.val2(n.separator).test(i + "0" + e.charAt(0))) ? s : (r.buffer[a - 1] = "0",
                        {
                            refreshFromBuffer: {
                                start: a - 1,
                                end: a
                            },
                            pos: a,
                            c: e.charAt(0)
                        })
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(e, r, a, t, n) {
                            isNaN(r.buffer[a + 1]) || (e += r.buffer[a + 1]);
                            var i = n.getFrontValue(r.mask, r.buffer, n);
                            i.indexOf(n.placeholder[0]) !== -1 && (i = "01" + n.separator);
                            var s = 1 === e.length ? n.regex.val2pre(n.separator).test(i + e) : n.regex.val2(n.separator).test(i + e);
                            return t || s || !(s = n.regex.val2(n.separator).test(i + "0" + e)) ? s : (r.buffer[a] = "0",
                            a++,
                            {
                                pos: a
                            })
                        },
                        cardinality: 1
                    }]
                },
                y: {
                    validator: function(e, r, a, t, n) {
                        return n.isInYearRange(e, n.yearrange.minyear, n.yearrange.maxyear)
                    },
                    cardinality: 4,
                    prevalidator: [{
                        validator: function(e, r, a, t, n) {
                            var i = n.isInYearRange(e, n.yearrange.minyear, n.yearrange.maxyear);
                            if (!t && !i) {
                                var s = n.determinebaseyear(n.yearrange.minyear, n.yearrange.maxyear, e + "0").toString().slice(0, 1);
                                if (i = n.isInYearRange(s + e, n.yearrange.minyear, n.yearrange.maxyear))
                                    return r.buffer[a++] = s.charAt(0),
                                    {
                                        pos: a
                                    };
                                if (s = n.determinebaseyear(n.yearrange.minyear, n.yearrange.maxyear, e + "0").toString().slice(0, 2),
                                i = n.isInYearRange(s + e, n.yearrange.minyear, n.yearrange.maxyear))
                                    return r.buffer[a++] = s.charAt(0),
                                    r.buffer[a++] = s.charAt(1),
                                    {
                                        pos: a
                                    }
                            }
                            return i
                        },
                        cardinality: 1
                    }, {
                        validator: function(e, r, a, t, n) {
                            var i = n.isInYearRange(e, n.yearrange.minyear, n.yearrange.maxyear);
                            if (!t && !i) {
                                var s = n.determinebaseyear(n.yearrange.minyear, n.yearrange.maxyear, e).toString().slice(0, 2);
                                if (i = n.isInYearRange(e[0] + s[1] + e[1], n.yearrange.minyear, n.yearrange.maxyear))
                                    return r.buffer[a++] = s.charAt(1),
                                    {
                                        pos: a
                                    };
                                if (s = n.determinebaseyear(n.yearrange.minyear, n.yearrange.maxyear, e).toString().slice(0, 2),
                                i = n.isInYearRange(s + e, n.yearrange.minyear, n.yearrange.maxyear))
                                    return r.buffer[a - 1] = s.charAt(0),
                                    r.buffer[a++] = s.charAt(1),
                                    r.buffer[a++] = e.charAt(0),
                                    {
                                        refreshFromBuffer: {
                                            start: a - 3,
                                            end: a
                                        },
                                        pos: a
                                    }
                            }
                            return i
                        },
                        cardinality: 2
                    }, {
                        validator: function(e, r, a, t, n) {
                            return n.isInYearRange(e, n.yearrange.minyear, n.yearrange.maxyear)
                        },
                        cardinality: 3
                    }]
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        "MM/DD/YYYY": {
            placeholder: "MM/DD/YYYY",
            alias: "DD/MM/YYYY",
            regex: {
                val2pre: function(e) {
                    var a = r.escapeRegex.call(this, e);
                    return new RegExp("((0[13-9]|1[012])" + a + "[0-3])|(02" + a + "[0-2])")
                },
                val2: function(e) {
                    var a = r.escapeRegex.call(this, e);
                    return new RegExp("((0[1-9]|1[012])" + a + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + a + "30)|((0[13578]|1[02])" + a + "31)")
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            leapday: "02/29/",
            onKeyDown: function(a, t, n, i) {
                var s = e(this);
                if (a.ctrlKey && a.keyCode === r.keyCode.RIGHT) {
                    var o = new Date;
                    s.val((o.getMonth() + 1).toString() + o.getDate().toString() + o.getFullYear().toString()),
                    s.trigger("setvalue")
                }
            }
        },
        "YYYY/MM/DD": {
            mask: "y/1/2",
            placeholder: "YYYY/MM/DD",
            alias: "MM/DD/YYYY",
            leapday: "/02/29",
            onKeyDown: function(a, t, n, i) {
                var s = e(this);
                if (a.ctrlKey && a.keyCode === r.keyCode.RIGHT) {
                    var o = new Date;
                    s.val(o.getFullYear().toString() + (o.getMonth() + 1).toString() + o.getDate().toString()),
                    s.trigger("setvalue")
                }
            }
        },
        "DD.MM.YYYY": {
            mask: "1.2.y",
            placeholder: "DD.MM.YYYY",
            leapday: "29.02.",
            separator: ".",
            alias: "DD/MM/YYYY"
        },
        "DD-MM-YYYY": {
            mask: "1-2-y",
            placeholder: "DD-MM-YYYY",
            leapday: "29-02-",
            separator: "-",
            alias: "DD/MM/YYYY"
        },
        "MM.DD.YYYY": {
            mask: "1.2.y",
            placeholder: "MM.DD.YYYY",
            leapday: "02.29.",
            separator: ".",
            alias: "MM/DD/YYYY"
        },
        "MM-DD-YYYY": {
            mask: "1-2-y",
            placeholder: "MM-DD-YYYY",
            leapday: "02-29-",
            separator: "-",
            alias: "MM/DD/YYYY"
        },
        "YYYY.MM.DD": {
            mask: "y.1.2",
            placeholder: "YYYY.MM.DD",
            leapday: ".02.29",
            separator: ".",
            alias: "YYYY/MM/DD"
        },
        "YYYY-MM-DD": {
            mask: "y-1-2",
            placeholder: "YYYY-MM-DD",
            leapday: "-02-29",
            separator: "-",
            alias: "YYYY/MM/DD"
        },
        datetime: {
            mask: "1/2/y h:s",
            placeholder: "DD/MM/YYYY hh:MM",
            alias: "DD/MM/YYYY",
            regex: {
                hrspre: new RegExp("[012]"),
                hrs24: new RegExp("2[0-4]|1[3-9]"),
                hrs: new RegExp("[01][0-9]|2[0-4]"),
                ampm: new RegExp("^[a|p|A|P][m|M]"),
                mspre: new RegExp("[0-5]"),
                ms: new RegExp("[0-5][0-9]")
            },
            timeseparator: ":",
            hourFormat: "24",
            definitions: {
                h: {
                    validator: function(e, r, a, t, n) {
                        if ("24" === n.hourFormat && 24 === parseInt(e, 10))
                            return r.buffer[a - 1] = "0",
                            r.buffer[a] = "0",
                            {
                                refreshFromBuffer: {
                                    start: a - 1,
                                    end: a
                                },
                                c: "0"
                            };
                        var i = n.regex.hrs.test(e);
                        if (!t && !i && (e.charAt(1) === n.timeseparator || "-.:".indexOf(e.charAt(1)) !== -1) && (i = n.regex.hrs.test("0" + e.charAt(0))))
                            return r.buffer[a - 1] = "0",
                            r.buffer[a] = e.charAt(0),
                            a++,
                            {
                                refreshFromBuffer: {
                                    start: a - 2,
                                    end: a
                                },
                                pos: a,
                                c: n.timeseparator
                            };
                        if (i && "24" !== n.hourFormat && n.regex.hrs24.test(e)) {
                            var s = parseInt(e, 10);
                            return 24 === s ? (r.buffer[a + 5] = "a",
                            r.buffer[a + 6] = "m") : (r.buffer[a + 5] = "p",
                            r.buffer[a + 6] = "m"),
                            s -= 12,
                            s < 10 ? (r.buffer[a] = s.toString(),
                            r.buffer[a - 1] = "0") : (r.buffer[a] = s.toString().charAt(1),
                            r.buffer[a - 1] = s.toString().charAt(0)),
                            {
                                refreshFromBuffer: {
                                    start: a - 1,
                                    end: a + 6
                                },
                                c: r.buffer[a]
                            }
                        }
                        return i
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(e, r, a, t, n) {
                            var i = n.regex.hrspre.test(e);
                            return t || i || !(i = n.regex.hrs.test("0" + e)) ? i : (r.buffer[a] = "0",
                            a++,
                            {
                                pos: a
                            })
                        },
                        cardinality: 1
                    }]
                },
                s: {
                    validator: "[0-5][0-9]",
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(e, r, a, t, n) {
                            var i = n.regex.mspre.test(e);
                            return t || i || !(i = n.regex.ms.test("0" + e)) ? i : (r.buffer[a] = "0",
                            a++,
                            {
                                pos: a
                            })
                        },
                        cardinality: 1
                    }]
                },
                t: {
                    validator: function(e, r, a, t, n) {
                        return n.regex.ampm.test(e + "m")
                    },
                    casing: "lower",
                    cardinality: 1
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        datetime12: {
            mask: "1/2/y h:s t\\m",
            placeholder: "DD/MM/YYYY hh:MM xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "MM/DD/YYYY hh:MM xm": {
            mask: "1/2/y h:s t\\m",
            placeholder: "MM/DD/YYYY hh:MM xm",
            alias: "datetime12",
            regex: {
                val2pre: function(e) {
                    var a = r.escapeRegex.call(this, e);
                    return new RegExp("((0[13-9]|1[012])" + a + "[0-3])|(02" + a + "[0-2])")
                },
                val2: function(e) {
                    var a = r.escapeRegex.call(this, e);
                    return new RegExp("((0[1-9]|1[012])" + a + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + a + "30)|((0[13578]|1[02])" + a + "31)")
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            leapday: "02/29/",
            onKeyDown: function(a, t, n, i) {
                var s = e(this);
                if (a.ctrlKey && a.keyCode === r.keyCode.RIGHT) {
                    var o = new Date;
                    s.val((o.getMonth() + 1).toString() + o.getDate().toString() + o.getFullYear().toString()),
                    s.trigger("setvalue")
                }
            }
        },
        "hh:MM t": {
            mask: "h:s t\\m",
            placeholder: "hh:MM xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "h:s t": {
            mask: "h:s t\\m",
            placeholder: "hh:MM xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "hh:MM:ss": {
            mask: "h:s:s",
            placeholder: "hh:MM:ss",
            alias: "datetime",
            autoUnmask: !1
        },
        "hh:MM": {
            mask: "h:s",
            placeholder: "hh:MM",
            alias: "datetime",
            autoUnmask: !1
        },
        date: {
            alias: "DD/MM/YYYY"
        },
        "MM/YYYY": {
            mask: "1/y",
            placeholder: "MM/YYYY",
            leapday: "donotuse",
            separator: "/",
            alias: "MM/DD/YYYY"
        },
        shamsi: {
            regex: {
                val2pre: function(e) {
                    var a = r.escapeRegex.call(this, e);
                    return new RegExp("((0[1-9]|1[012])" + a + "[0-3])")
                },
                val2: function(e) {
                    var a = r.escapeRegex.call(this, e);
                    return new RegExp("((0[1-9]|1[012])" + a + "(0[1-9]|[12][0-9]))|((0[1-9]|1[012])" + a + "30)|((0[1-6])" + a + "31)")
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            yearrange: {
                minyear: 1300,
                maxyear: 1499
            },
            mask: "y/1/2",
            leapday: "/12/30",
            placeholder: "YYYY/MM/DD",
            alias: "MM/DD/YYYY",
            clearIncomplete: !0
        },
        "YYYY-MM-DD hh:MM:ss": {
            mask: "y-1-2 h:s:s",
            placeholder: "YYYY-MM-DD hh:MM:ss",
            alias: "datetime",
            separator: "-",
            leapday: "-02-29",
            regex: {
                val2pre: function(e) {
                    var a = r.escapeRegex.call(this, e);
                    return new RegExp("((0[13-9]|1[012])" + a + "[0-3])|(02" + a + "[0-2])")
                },
                val2: function(e) {
                    var a = r.escapeRegex.call(this, e);
                    return new RegExp("((0[1-9]|1[012])" + a + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + a + "30)|((0[13578]|1[02])" + a + "31)")
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            onKeyDown: function(e, r, a, t) {}
        }
    }),
    r
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0bWFzay5kYXRlLmV4dGVuc2lvbnMuanMiXSwibmFtZXMiOlsiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJyZXF1aXJlIiwid2luZG93IiwiZGVwZW5kZW5jeUxpYiIsImpRdWVyeSIsIklucHV0bWFzayIsIiQiLCJpc0xlYXBZZWFyIiwieWVhciIsImlzTmFOIiwiRGF0ZSIsImdldERhdGUiLCJleHRlbmRBbGlhc2VzIiwiREQvTU0vWVlZWSIsIm1hc2siLCJwbGFjZWhvbGRlciIsInJlZ2V4IiwidmFsMXByZSIsIlJlZ0V4cCIsInZhbDEiLCJ2YWwycHJlIiwic2VwYXJhdG9yIiwiZXNjYXBlZFNlcGFyYXRvciIsImVzY2FwZVJlZ2V4IiwiY2FsbCIsInRoaXMiLCJ2YWwyIiwibGVhcGRheSIsInllYXJyYW5nZSIsIm1pbnllYXIiLCJtYXh5ZWFyIiwiaXNJblllYXJSYW5nZSIsImNocnMiLCJlbnRlcmVkeWVhciIsInBhcnNlSW50IiwiY29uY2F0IiwidG9TdHJpbmciLCJzbGljZSIsImxlbmd0aCIsImVudGVyZWR5ZWFyMiIsImRldGVybWluZWJhc2V5ZWFyIiwiaGludCIsImN1cnJlbnR5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtYXhZZWFyUHJlZml4IiwibWF4WWVhclBvc3RmaXgiLCJtYXh4WWVhciIsImN1cnJlbnRZZWFyUHJlZml4IiwiY3VycmVudFllYXJBbmRIaW50Iiwib25LZXlEb3duIiwiZSIsImJ1ZmZlciIsImNhcmV0UG9zIiwib3B0cyIsIiRpbnB1dCIsImN0cmxLZXkiLCJrZXlDb2RlIiwiUklHSFQiLCJ0b2RheSIsInZhbCIsImdldE1vbnRoIiwidHJpZ2dlciIsImdldEZyb250VmFsdWUiLCJzdGFydCIsImkiLCJjaGFyQXQiLCJkZWZpbml0aW9uIiwiZGVmaW5pdGlvbnMiLCJjYXJkaW5hbGl0eSIsImpvaW4iLCJzdWJzdHIiLCJwb3N0VmFsaWRhdGlvbiIsImN1cnJlbnRSZXN1bHQiLCJkYXlNb250aFZhbHVlIiwiYnVmZmVyU3RyIiwiaW5kZXhPZiIsIjEiLCJ2YWxpZGF0b3IiLCJtYXNrc2V0IiwicG9zIiwic3RyaWN0IiwiaXNWYWxpZCIsInRlc3QiLCJyZWZyZXNoRnJvbUJ1ZmZlciIsImVuZCIsImMiLCJwcmV2YWxpZGF0b3IiLCJwY2hycyIsIjIiLCJmcm9udFZhbHVlIiwieSIsInllYXJQcmVmaXgiLCJpbnNlcnRNb2RlIiwiYXV0b1VubWFzayIsIk1NL0REL1lZWVkiLCJhbGlhcyIsIllZWVkvTU0vREQiLCJERC5NTS5ZWVlZIiwiREQtTU0tWVlZWSIsIk1NLkRELllZWVkiLCJNTS1ERC1ZWVlZIiwiWVlZWS5NTS5ERCIsIllZWVktTU0tREQiLCJkYXRldGltZSIsImhyc3ByZSIsImhyczI0IiwiaHJzIiwiYW1wbSIsIm1zcHJlIiwibXMiLCJ0aW1lc2VwYXJhdG9yIiwiaG91ckZvcm1hdCIsImgiLCJ0bXAiLCJzIiwidCIsImNhc2luZyIsImRhdGV0aW1lMTIiLCJNTS9ERC9ZWVlZIGhoOk1NIHhtIiwiaGg6TU0gdCIsImg6cyB0IiwiaGg6TU06c3MiLCJoaDpNTSIsImRhdGUiLCJNTS9ZWVlZIiwic2hhbXNpIiwiY2xlYXJJbmNvbXBsZXRlIiwiWVlZWS1NTS1ERCBoaDpNTTpzcyJdLCJtYXBwaW5ncyI6IkNBT0MsU0FBU0EsR0FDTixrQkFBcUJDLFNBQVVBLE9BQU9DLElBQU1ELFFBQVMsMEJBQTJCLGFBQWVELEdBQVcsZ0JBQW1CRyxTQUFVQyxPQUFPRCxRQUFVSCxFQUFRSyxRQUFRLDZCQUE4QkEsUUFBUSxnQkFBa0JMLEVBQVFNLE9BQU9DLGVBQWlCQyxPQUFRRixPQUFPRyxZQUNqUixTQUFTQyxFQUFHRCxHQUNWLFFBQVNFLEdBQVdDLEdBQ2hCLE1BQU9DLE9BQU1ELElBQVMsS0FBTyxHQUFJRSxNQUFLRixFQUFNLEVBQUcsR0FBR0csVUFFdEQsTUFBT04sR0FBVU8sZUFDYkMsY0FDSUMsS0FBTSxRQUNOQyxZQUFhLGFBQ2JDLE9BQ0lDLFFBQVMsR0FBSUMsUUFBTyxT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U0FDVFosWUFBYSxhQUNiZ0YsTUFBTyxhQUNQK0IsaUJBQWlCLEdBRXJCQyx1QkFDSWpILEtBQU0sY0FDTkMsWUFBYSxzQkFDYmdGLE1BQU8sV0FDUDFFLFVBQVcsSUFDWE0sUUFBUyxTQUNUWCxPQUNJSSxRQUFTLFNBQVNDLEdBQ2QsR0FBSUMsR0FBbUJqQixFQUFVa0IsWUFBWUMsS0FBS0MsS0FBTUosRUFDeEQsT0FBTyxJQUFJSCxRQUFPLG9CQUFzQkksRUFBbUIsYUFBZUEsRUFBbUIsV0FFakdJLEtBQU0sU0FBU0wsR0FDWCxHQUFJQyxHQUFtQmpCLEVBQVVrQixZQUFZQyxLQUFLQyxLQUFNSixFQUN4RCxPQUFPLElBQUlILFFBQU8sbUJBQXFCSSxFQUFtQix3Q0FBMENBLEVBQW1CLHdCQUEwQkEsRUFBbUIsUUFFeEtMLFFBQVMsR0FBSUMsUUFBTyxRQUNwQkMsS0FBTSxHQUFJRCxRQUFPLGtCQUVyQitCLFVBQVcsU0FBU0MsRUFBR0MsRUFBUUMsRUFBVUMsUUFFN0NoRCIsImZpbGUiOiJpbnB1dG1hc2suZGF0ZS5leHRlbnNpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXHJcbiogaW5wdXRtYXNrLmRhdGUuZXh0ZW5zaW9ucy5qc1xyXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvanF1ZXJ5LmlucHV0bWFza1xyXG4qIENvcHlyaWdodCAoYykgMjAxMCAtIDIwMTcgUm9iaW4gSGVyYm90c1xyXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAoaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHApXHJcbiogVmVyc2lvbjogMy4zLjUtMTBcclxuKi9cclxuIWZ1bmN0aW9uKGZhY3RvcnkpIHtcclxuICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZGVmaW5lICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWyBcImlucHV0bWFzay5kZXBlbmRlbmN5TGliXCIsIFwiaW5wdXRtYXNrXCIgXSwgZmFjdG9yeSkgOiBcIm9iamVjdFwiID09IHR5cGVvZiBleHBvcnRzID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2lucHV0bWFzay5kZXBlbmRlbmN5TGliXCIpLCByZXF1aXJlKFwiLi9pbnB1dG1hc2tcIikpIDogZmFjdG9yeSh3aW5kb3cuZGVwZW5kZW5jeUxpYiB8fCBqUXVlcnksIHdpbmRvdy5JbnB1dG1hc2spO1xyXG59KGZ1bmN0aW9uKCQsIElucHV0bWFzaykge1xyXG4gICAgZnVuY3Rpb24gaXNMZWFwWWVhcih5ZWFyKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzTmFOKHllYXIpIHx8IDI5ID09PSBuZXcgRGF0ZSh5ZWFyLCAyLCAwKS5nZXREYXRlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gSW5wdXRtYXNrLmV4dGVuZEFsaWFzZXMoe1xyXG4gICAgICAgIFwiREQvTU0vWVlZWVwiOiB7XHJcbiAgICAgICAgICAgIG1hc2s6IFwiMS8yL3lcIixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiREQvTU0vWVlZWVwiLFxyXG4gICAgICAgICAgICByZWdleDoge1xyXG4gICAgICAgICAgICAgICAgdmFsMXByZTogbmV3IFJlZ0V4cChcIlswLTNdXCIpLFxyXG4gICAgICAgICAgICAgICAgdmFsMTogbmV3IFJlZ0V4cChcIjBbMS05XXxbMTJdWzAtOV18M1swMV1cIiksXHJcbiAgICAgICAgICAgICAgICB2YWwycHJlOiBmdW5jdGlvbihzZXBhcmF0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXNjYXBlZFNlcGFyYXRvciA9IElucHV0bWFzay5lc2NhcGVSZWdleC5jYWxsKHRoaXMsIHNlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCIoKDBbMS05XXxbMTJdWzAtOV18M1swMV0pXCIgKyBlc2NhcGVkU2VwYXJhdG9yICsgXCJbMDFdKVwiKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB2YWwyOiBmdW5jdGlvbihzZXBhcmF0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXNjYXBlZFNlcGFyYXRvciA9IElucHV0bWFzay5lc2NhcGVSZWdleC5jYWxsKHRoaXMsIHNlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCIoKDBbMS05XXxbMTJdWzAtOV0pXCIgKyBlc2NhcGVkU2VwYXJhdG9yICsgXCIoMFsxLTldfDFbMDEyXSkpfCgzMFwiICsgZXNjYXBlZFNlcGFyYXRvciArIFwiKDBbMTMtOV18MVswMTJdKSl8KDMxXCIgKyBlc2NhcGVkU2VwYXJhdG9yICsgXCIoMFsxMzU3OF18MVswMl0pKVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGVhcGRheTogXCIyOS8wMi9cIixcclxuICAgICAgICAgICAgc2VwYXJhdG9yOiBcIi9cIixcclxuICAgICAgICAgICAgeWVhcnJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICBtaW55ZWFyOiAxOTAwLFxyXG4gICAgICAgICAgICAgICAgbWF4eWVhcjogMjA5OVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc0luWWVhclJhbmdlOiBmdW5jdGlvbihjaHJzLCBtaW55ZWFyLCBtYXh5ZWFyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4oY2hycykpIHJldHVybiAhMTtcclxuICAgICAgICAgICAgICAgIHZhciBlbnRlcmVkeWVhciA9IHBhcnNlSW50KGNocnMuY29uY2F0KG1pbnllYXIudG9TdHJpbmcoKS5zbGljZShjaHJzLmxlbmd0aCkpKSwgZW50ZXJlZHllYXIyID0gcGFyc2VJbnQoY2hycy5jb25jYXQobWF4eWVhci50b1N0cmluZygpLnNsaWNlKGNocnMubGVuZ3RoKSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICFpc05hTihlbnRlcmVkeWVhcikgJiYgKG1pbnllYXIgPD0gZW50ZXJlZHllYXIgJiYgZW50ZXJlZHllYXIgPD0gbWF4eWVhcikgfHwgIWlzTmFOKGVudGVyZWR5ZWFyMikgJiYgKG1pbnllYXIgPD0gZW50ZXJlZHllYXIyICYmIGVudGVyZWR5ZWFyMiA8PSBtYXh5ZWFyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGV0ZXJtaW5lYmFzZXllYXI6IGZ1bmN0aW9uKG1pbnllYXIsIG1heHllYXIsIGhpbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50eWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChtaW55ZWFyID4gY3VycmVudHllYXIpIHJldHVybiBtaW55ZWFyO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1heHllYXIgPCBjdXJyZW50eWVhcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG1heFllYXJQcmVmaXggPSBtYXh5ZWFyLnRvU3RyaW5nKCkuc2xpY2UoMCwgMiksIG1heFllYXJQb3N0Zml4ID0gbWF4eWVhci50b1N0cmluZygpLnNsaWNlKDIsIDQpOyBtYXh5ZWFyIDwgbWF4WWVhclByZWZpeCArIGhpbnQ7ICkgbWF4WWVhclByZWZpeC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXh4WWVhciA9IG1heFllYXJQcmVmaXggKyBtYXhZZWFyUG9zdGZpeDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWlueWVhciA+IG1heHhZZWFyID8gbWlueWVhciA6IG1heHhZZWFyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1pbnllYXIgPD0gY3VycmVudHllYXIgJiYgY3VycmVudHllYXIgPD0gbWF4eWVhcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGN1cnJlbnRZZWFyUHJlZml4ID0gY3VycmVudHllYXIudG9TdHJpbmcoKS5zbGljZSgwLCAyKTsgbWF4eWVhciA8IGN1cnJlbnRZZWFyUHJlZml4ICsgaGludDsgKSBjdXJyZW50WWVhclByZWZpeC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50WWVhckFuZEhpbnQgPSBjdXJyZW50WWVhclByZWZpeCArIGhpbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRZZWFyQW5kSGludCA8IG1pbnllYXIgPyBtaW55ZWFyIDogY3VycmVudFllYXJBbmRIaW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnR5ZWFyO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbktleURvd246IGZ1bmN0aW9uKGUsIGJ1ZmZlciwgY2FyZXRQb3MsIG9wdHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuY3RybEtleSAmJiBlLmtleUNvZGUgPT09IElucHV0bWFzay5rZXlDb2RlLlJJR0hUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQudmFsKHRvZGF5LmdldERhdGUoKS50b1N0cmluZygpICsgKHRvZGF5LmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpICsgdG9kYXkuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJzZXR2YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0RnJvbnRWYWx1ZTogZnVuY3Rpb24obWFzaywgYnVmZmVyLCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzdGFydCA9IDAsIGxlbmd0aCA9IDAsIGkgPSAwOyBpIDwgbWFzay5sZW5ndGggJiYgXCIyXCIgIT09IG1hc2suY2hhckF0KGkpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmaW5pdGlvbiA9IG9wdHMuZGVmaW5pdGlvbnNbbWFzay5jaGFyQXQoaSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb24gPyAoc3RhcnQgKz0gbGVuZ3RoLCBsZW5ndGggPSBkZWZpbml0aW9uLmNhcmRpbmFsaXR5KSA6IGxlbmd0aCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlci5qb2luKFwiXCIpLnN1YnN0cihzdGFydCwgbGVuZ3RoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcG9zdFZhbGlkYXRpb246IGZ1bmN0aW9uKGJ1ZmZlciwgY3VycmVudFJlc3VsdCwgb3B0cykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheU1vbnRoVmFsdWUsIHllYXIsIGJ1ZmZlclN0ciA9IGJ1ZmZlci5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAgPT09IG9wdHMubWFzay5pbmRleE9mKFwieVwiKSA/ICh5ZWFyID0gYnVmZmVyU3RyLnN1YnN0cigwLCA0KSwgZGF5TW9udGhWYWx1ZSA9IGJ1ZmZlclN0ci5zdWJzdHIoNCwgMTEpKSA6ICh5ZWFyID0gYnVmZmVyU3RyLnN1YnN0cig2LCAxMSksIFxyXG4gICAgICAgICAgICAgICAgZGF5TW9udGhWYWx1ZSA9IGJ1ZmZlclN0ci5zdWJzdHIoMCwgNikpLCBjdXJyZW50UmVzdWx0ICYmIChkYXlNb250aFZhbHVlICE9PSBvcHRzLmxlYXBkYXkgfHwgaXNMZWFwWWVhcih5ZWFyKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBcIjFcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24oY2hycywgbWFza3NldCwgcG9zLCBzdHJpY3QsIG9wdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBvcHRzLnJlZ2V4LnZhbDEudGVzdChjaHJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmljdCB8fCBpc1ZhbGlkIHx8IGNocnMuY2hhckF0KDEpICE9PSBvcHRzLnNlcGFyYXRvciAmJiBcIi0uL1wiLmluZGV4T2YoY2hycy5jaGFyQXQoMSkpID09PSAtMSB8fCAhKGlzVmFsaWQgPSBvcHRzLnJlZ2V4LnZhbDEudGVzdChcIjBcIiArIGNocnMuY2hhckF0KDApKSkgPyBpc1ZhbGlkIDogKG1hc2tzZXQuYnVmZmVyW3BvcyAtIDFdID0gXCIwXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRnJvbUJ1ZmZlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBwb3MgLSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogcG9zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBwb3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjOiBjaHJzLmNoYXJBdCgwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZhbGlkYXRvcjogWyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24oY2hycywgbWFza3NldCwgcG9zLCBzdHJpY3QsIG9wdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwY2hycyA9IGNocnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc05hTihtYXNrc2V0LmJ1ZmZlcltwb3MgKyAxXSkgfHwgKHBjaHJzICs9IG1hc2tzZXQuYnVmZmVyW3BvcyArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gMSA9PT0gcGNocnMubGVuZ3RoID8gb3B0cy5yZWdleC52YWwxcHJlLnRlc3QocGNocnMpIDogb3B0cy5yZWdleC52YWwxLnRlc3QocGNocnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHJpY3QgJiYgIWlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCA9IG9wdHMucmVnZXgudmFsMS50ZXN0KGNocnMgKyBcIjBcIikpIHJldHVybiBtYXNrc2V0LmJ1ZmZlcltwb3NdID0gY2hycywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldC5idWZmZXJbKytwb3NdID0gXCIwXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBwb3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IFwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCA9IG9wdHMucmVnZXgudmFsMS50ZXN0KFwiMFwiICsgY2hycykpIHJldHVybiBtYXNrc2V0LmJ1ZmZlcltwb3NdID0gXCIwXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcysrLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMVxyXG4gICAgICAgICAgICAgICAgICAgIH0gXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiMlwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihjaHJzLCBtYXNrc2V0LCBwb3MsIHN0cmljdCwgb3B0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnJvbnRWYWx1ZSA9IG9wdHMuZ2V0RnJvbnRWYWx1ZShtYXNrc2V0Lm1hc2ssIG1hc2tzZXQuYnVmZmVyLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbnRWYWx1ZS5pbmRleE9mKG9wdHMucGxhY2Vob2xkZXJbMF0pICE9PSAtMSAmJiAoZnJvbnRWYWx1ZSA9IFwiMDFcIiArIG9wdHMuc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBvcHRzLnJlZ2V4LnZhbDIob3B0cy5zZXBhcmF0b3IpLnRlc3QoZnJvbnRWYWx1ZSArIGNocnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaWN0IHx8IGlzVmFsaWQgfHwgY2hycy5jaGFyQXQoMSkgIT09IG9wdHMuc2VwYXJhdG9yICYmIFwiLS4vXCIuaW5kZXhPZihjaHJzLmNoYXJBdCgxKSkgPT09IC0xIHx8ICEoaXNWYWxpZCA9IG9wdHMucmVnZXgudmFsMihvcHRzLnNlcGFyYXRvcikudGVzdChmcm9udFZhbHVlICsgXCIwXCIgKyBjaHJzLmNoYXJBdCgwKSkpID8gaXNWYWxpZCA6IChtYXNrc2V0LmJ1ZmZlcltwb3MgLSAxXSA9IFwiMFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaEZyb21CdWZmZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcG9zIC0gMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IHBvc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYzogY2hycy5jaGFyQXQoMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMixcclxuICAgICAgICAgICAgICAgICAgICBwcmV2YWxpZGF0b3I6IFsge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uKGNocnMsIG1hc2tzZXQsIHBvcywgc3RyaWN0LCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc05hTihtYXNrc2V0LmJ1ZmZlcltwb3MgKyAxXSkgfHwgKGNocnMgKz0gbWFza3NldC5idWZmZXJbcG9zICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZyb250VmFsdWUgPSBvcHRzLmdldEZyb250VmFsdWUobWFza3NldC5tYXNrLCBtYXNrc2V0LmJ1ZmZlciwgb3B0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9udFZhbHVlLmluZGV4T2Yob3B0cy5wbGFjZWhvbGRlclswXSkgIT09IC0xICYmIChmcm9udFZhbHVlID0gXCIwMVwiICsgb3B0cy5zZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSAxID09PSBjaHJzLmxlbmd0aCA/IG9wdHMucmVnZXgudmFsMnByZShvcHRzLnNlcGFyYXRvcikudGVzdChmcm9udFZhbHVlICsgY2hycykgOiBvcHRzLnJlZ2V4LnZhbDIob3B0cy5zZXBhcmF0b3IpLnRlc3QoZnJvbnRWYWx1ZSArIGNocnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmljdCB8fCBpc1ZhbGlkIHx8ICEoaXNWYWxpZCA9IG9wdHMucmVnZXgudmFsMihvcHRzLnNlcGFyYXRvcikudGVzdChmcm9udFZhbHVlICsgXCIwXCIgKyBjaHJzKSkgPyBpc1ZhbGlkIDogKG1hc2tzZXQuYnVmZmVyW3Bvc10gPSBcIjBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MrKywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDFcclxuICAgICAgICAgICAgICAgICAgICB9IF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihjaHJzLCBtYXNrc2V0LCBwb3MsIHN0cmljdCwgb3B0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5pc0luWWVhclJhbmdlKGNocnMsIG9wdHMueWVhcnJhbmdlLm1pbnllYXIsIG9wdHMueWVhcnJhbmdlLm1heHllYXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmFsaWRhdG9yOiBbIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihjaHJzLCBtYXNrc2V0LCBwb3MsIHN0cmljdCwgb3B0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBvcHRzLmlzSW5ZZWFyUmFuZ2UoY2hycywgb3B0cy55ZWFycmFuZ2UubWlueWVhciwgb3B0cy55ZWFycmFuZ2UubWF4eWVhcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0cmljdCAmJiAhaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB5ZWFyUHJlZml4ID0gb3B0cy5kZXRlcm1pbmViYXNleWVhcihvcHRzLnllYXJyYW5nZS5taW55ZWFyLCBvcHRzLnllYXJyYW5nZS5tYXh5ZWFyLCBjaHJzICsgXCIwXCIpLnRvU3RyaW5nKCkuc2xpY2UoMCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQgPSBvcHRzLmlzSW5ZZWFyUmFuZ2UoeWVhclByZWZpeCArIGNocnMsIG9wdHMueWVhcnJhbmdlLm1pbnllYXIsIG9wdHMueWVhcnJhbmdlLm1heHllYXIpKSByZXR1cm4gbWFza3NldC5idWZmZXJbcG9zKytdID0geWVhclByZWZpeC5jaGFyQXQoMCksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBwb3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ZWFyUHJlZml4ID0gb3B0cy5kZXRlcm1pbmViYXNleWVhcihvcHRzLnllYXJyYW5nZS5taW55ZWFyLCBvcHRzLnllYXJyYW5nZS5tYXh5ZWFyLCBjaHJzICsgXCIwXCIpLnRvU3RyaW5nKCkuc2xpY2UoMCwgMiksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBvcHRzLmlzSW5ZZWFyUmFuZ2UoeWVhclByZWZpeCArIGNocnMsIG9wdHMueWVhcnJhbmdlLm1pbnllYXIsIG9wdHMueWVhcnJhbmdlLm1heHllYXIpKSByZXR1cm4gbWFza3NldC5idWZmZXJbcG9zKytdID0geWVhclByZWZpeC5jaGFyQXQoMCksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXQuYnVmZmVyW3BvcysrXSA9IHllYXJQcmVmaXguY2hhckF0KDEpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihjaHJzLCBtYXNrc2V0LCBwb3MsIHN0cmljdCwgb3B0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBvcHRzLmlzSW5ZZWFyUmFuZ2UoY2hycywgb3B0cy55ZWFycmFuZ2UubWlueWVhciwgb3B0cy55ZWFycmFuZ2UubWF4eWVhcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0cmljdCAmJiAhaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB5ZWFyUHJlZml4ID0gb3B0cy5kZXRlcm1pbmViYXNleWVhcihvcHRzLnllYXJyYW5nZS5taW55ZWFyLCBvcHRzLnllYXJyYW5nZS5tYXh5ZWFyLCBjaHJzKS50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkID0gb3B0cy5pc0luWWVhclJhbmdlKGNocnNbMF0gKyB5ZWFyUHJlZml4WzFdICsgY2hyc1sxXSwgb3B0cy55ZWFycmFuZ2UubWlueWVhciwgb3B0cy55ZWFycmFuZ2UubWF4eWVhcikpIHJldHVybiBtYXNrc2V0LmJ1ZmZlcltwb3MrK10gPSB5ZWFyUHJlZml4LmNoYXJBdCgxKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHBvc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHllYXJQcmVmaXggPSBvcHRzLmRldGVybWluZWJhc2V5ZWFyKG9wdHMueWVhcnJhbmdlLm1pbnllYXIsIG9wdHMueWVhcnJhbmdlLm1heHllYXIsIGNocnMpLnRvU3RyaW5nKCkuc2xpY2UoMCwgMiksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBvcHRzLmlzSW5ZZWFyUmFuZ2UoeWVhclByZWZpeCArIGNocnMsIG9wdHMueWVhcnJhbmdlLm1pbnllYXIsIG9wdHMueWVhcnJhbmdlLm1heHllYXIpKSByZXR1cm4gbWFza3NldC5idWZmZXJbcG9zIC0gMV0gPSB5ZWFyUHJlZml4LmNoYXJBdCgwKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldC5idWZmZXJbcG9zKytdID0geWVhclByZWZpeC5jaGFyQXQoMSksIG1hc2tzZXQuYnVmZmVyW3BvcysrXSA9IGNocnMuY2hhckF0KDApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hGcm9tQnVmZmVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcG9zIC0gMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogcG9zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMlxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihjaHJzLCBtYXNrc2V0LCBwb3MsIHN0cmljdCwgb3B0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMuaXNJblllYXJSYW5nZShjaHJzLCBvcHRzLnllYXJyYW5nZS5taW55ZWFyLCBvcHRzLnllYXJyYW5nZS5tYXh5ZWFyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDNcclxuICAgICAgICAgICAgICAgICAgICB9IF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW5zZXJ0TW9kZTogITEsXHJcbiAgICAgICAgICAgIGF1dG9Vbm1hc2s6ICExXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIk1NL0REL1lZWVlcIjoge1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJNTS9ERC9ZWVlZXCIsXHJcbiAgICAgICAgICAgIGFsaWFzOiBcIkREL01NL1lZWVlcIixcclxuICAgICAgICAgICAgcmVnZXg6IHtcclxuICAgICAgICAgICAgICAgIHZhbDJwcmU6IGZ1bmN0aW9uKHNlcGFyYXRvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlc2NhcGVkU2VwYXJhdG9yID0gSW5wdXRtYXNrLmVzY2FwZVJlZ2V4LmNhbGwodGhpcywgc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChcIigoMFsxMy05XXwxWzAxMl0pXCIgKyBlc2NhcGVkU2VwYXJhdG9yICsgXCJbMC0zXSl8KDAyXCIgKyBlc2NhcGVkU2VwYXJhdG9yICsgXCJbMC0yXSlcIik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdmFsMjogZnVuY3Rpb24oc2VwYXJhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVzY2FwZWRTZXBhcmF0b3IgPSBJbnB1dG1hc2suZXNjYXBlUmVnZXguY2FsbCh0aGlzLCBzZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiKCgwWzEtOV18MVswMTJdKVwiICsgZXNjYXBlZFNlcGFyYXRvciArIFwiKDBbMS05XXxbMTJdWzAtOV0pKXwoKDBbMTMtOV18MVswMTJdKVwiICsgZXNjYXBlZFNlcGFyYXRvciArIFwiMzApfCgoMFsxMzU3OF18MVswMl0pXCIgKyBlc2NhcGVkU2VwYXJhdG9yICsgXCIzMSlcIik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdmFsMXByZTogbmV3IFJlZ0V4cChcIlswMV1cIiksXHJcbiAgICAgICAgICAgICAgICB2YWwxOiBuZXcgUmVnRXhwKFwiMFsxLTldfDFbMDEyXVwiKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsZWFwZGF5OiBcIjAyLzI5L1wiLFxyXG4gICAgICAgICAgICBvbktleURvd246IGZ1bmN0aW9uKGUsIGJ1ZmZlciwgY2FyZXRQb3MsIG9wdHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuY3RybEtleSAmJiBlLmtleUNvZGUgPT09IElucHV0bWFzay5rZXlDb2RlLlJJR0hUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQudmFsKCh0b2RheS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKSArIHRvZGF5LmdldERhdGUoKS50b1N0cmluZygpICsgdG9kYXkuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJzZXR2YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJZWVlZL01NL0REXCI6IHtcclxuICAgICAgICAgICAgbWFzazogXCJ5LzEvMlwiLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJZWVlZL01NL0REXCIsXHJcbiAgICAgICAgICAgIGFsaWFzOiBcIk1NL0REL1lZWVlcIixcclxuICAgICAgICAgICAgbGVhcGRheTogXCIvMDIvMjlcIixcclxuICAgICAgICAgICAgb25LZXlEb3duOiBmdW5jdGlvbihlLCBidWZmZXIsIGNhcmV0UG9zLCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLmN0cmxLZXkgJiYgZS5rZXlDb2RlID09PSBJbnB1dG1hc2sua2V5Q29kZS5SSUdIVCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LnZhbCh0b2RheS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkgKyAodG9kYXkuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkgKyB0b2RheS5nZXREYXRlKCkudG9TdHJpbmcoKSksIFxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwic2V0dmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiREQuTU0uWVlZWVwiOiB7XHJcbiAgICAgICAgICAgIG1hc2s6IFwiMS4yLnlcIixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiREQuTU0uWVlZWVwiLFxyXG4gICAgICAgICAgICBsZWFwZGF5OiBcIjI5LjAyLlwiLFxyXG4gICAgICAgICAgICBzZXBhcmF0b3I6IFwiLlwiLFxyXG4gICAgICAgICAgICBhbGlhczogXCJERC9NTS9ZWVlZXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiREQtTU0tWVlZWVwiOiB7XHJcbiAgICAgICAgICAgIG1hc2s6IFwiMS0yLXlcIixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiREQtTU0tWVlZWVwiLFxyXG4gICAgICAgICAgICBsZWFwZGF5OiBcIjI5LTAyLVwiLFxyXG4gICAgICAgICAgICBzZXBhcmF0b3I6IFwiLVwiLFxyXG4gICAgICAgICAgICBhbGlhczogXCJERC9NTS9ZWVlZXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiTU0uREQuWVlZWVwiOiB7XHJcbiAgICAgICAgICAgIG1hc2s6IFwiMS4yLnlcIixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTU0uREQuWVlZWVwiLFxyXG4gICAgICAgICAgICBsZWFwZGF5OiBcIjAyLjI5LlwiLFxyXG4gICAgICAgICAgICBzZXBhcmF0b3I6IFwiLlwiLFxyXG4gICAgICAgICAgICBhbGlhczogXCJNTS9ERC9ZWVlZXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiTU0tREQtWVlZWVwiOiB7XHJcbiAgICAgICAgICAgIG1hc2s6IFwiMS0yLXlcIixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTU0tREQtWVlZWVwiLFxyXG4gICAgICAgICAgICBsZWFwZGF5OiBcIjAyLTI5LVwiLFxyXG4gICAgICAgICAgICBzZXBhcmF0b3I6IFwiLVwiLFxyXG4gICAgICAgICAgICBhbGlhczogXCJNTS9ERC9ZWVlZXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiWVlZWS5NTS5ERFwiOiB7XHJcbiAgICAgICAgICAgIG1hc2s6IFwieS4xLjJcIixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiWVlZWS5NTS5ERFwiLFxyXG4gICAgICAgICAgICBsZWFwZGF5OiBcIi4wMi4yOVwiLFxyXG4gICAgICAgICAgICBzZXBhcmF0b3I6IFwiLlwiLFxyXG4gICAgICAgICAgICBhbGlhczogXCJZWVlZL01NL0REXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiWVlZWS1NTS1ERFwiOiB7XHJcbiAgICAgICAgICAgIG1hc2s6IFwieS0xLTJcIixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiWVlZWS1NTS1ERFwiLFxyXG4gICAgICAgICAgICBsZWFwZGF5OiBcIi0wMi0yOVwiLFxyXG4gICAgICAgICAgICBzZXBhcmF0b3I6IFwiLVwiLFxyXG4gICAgICAgICAgICBhbGlhczogXCJZWVlZL01NL0REXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGV0aW1lOiB7XHJcbiAgICAgICAgICAgIG1hc2s6IFwiMS8yL3kgaDpzXCIsXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkREL01NL1lZWVkgaGg6TU1cIixcclxuICAgICAgICAgICAgYWxpYXM6IFwiREQvTU0vWVlZWVwiLFxyXG4gICAgICAgICAgICByZWdleDoge1xyXG4gICAgICAgICAgICAgICAgaHJzcHJlOiBuZXcgUmVnRXhwKFwiWzAxMl1cIiksXHJcbiAgICAgICAgICAgICAgICBocnMyNDogbmV3IFJlZ0V4cChcIjJbMC00XXwxWzMtOV1cIiksXHJcbiAgICAgICAgICAgICAgICBocnM6IG5ldyBSZWdFeHAoXCJbMDFdWzAtOV18MlswLTRdXCIpLFxyXG4gICAgICAgICAgICAgICAgYW1wbTogbmV3IFJlZ0V4cChcIl5bYXxwfEF8UF1bbXxNXVwiKSxcclxuICAgICAgICAgICAgICAgIG1zcHJlOiBuZXcgUmVnRXhwKFwiWzAtNV1cIiksXHJcbiAgICAgICAgICAgICAgICBtczogbmV3IFJlZ0V4cChcIlswLTVdWzAtOV1cIilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGltZXNlcGFyYXRvcjogXCI6XCIsXHJcbiAgICAgICAgICAgIGhvdXJGb3JtYXQ6IFwiMjRcIixcclxuICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGg6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uKGNocnMsIG1hc2tzZXQsIHBvcywgc3RyaWN0LCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIjI0XCIgPT09IG9wdHMuaG91ckZvcm1hdCAmJiAyNCA9PT0gcGFyc2VJbnQoY2hycywgMTApKSByZXR1cm4gbWFza3NldC5idWZmZXJbcG9zIC0gMV0gPSBcIjBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXQuYnVmZmVyW3Bvc10gPSBcIjBcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaEZyb21CdWZmZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcG9zIC0gMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IHBvc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IFwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gb3B0cy5yZWdleC5ocnMudGVzdChjaHJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHJpY3QgJiYgIWlzVmFsaWQgJiYgKGNocnMuY2hhckF0KDEpID09PSBvcHRzLnRpbWVzZXBhcmF0b3IgfHwgXCItLjpcIi5pbmRleE9mKGNocnMuY2hhckF0KDEpKSAhPT0gLTEpICYmIChpc1ZhbGlkID0gb3B0cy5yZWdleC5ocnMudGVzdChcIjBcIiArIGNocnMuY2hhckF0KDApKSkpIHJldHVybiBtYXNrc2V0LmJ1ZmZlcltwb3MgLSAxXSA9IFwiMFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldC5idWZmZXJbcG9zXSA9IGNocnMuY2hhckF0KDApLCBwb3MrKywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaEZyb21CdWZmZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcG9zIC0gMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IHBvc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYzogb3B0cy50aW1lc2VwYXJhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkICYmIFwiMjRcIiAhPT0gb3B0cy5ob3VyRm9ybWF0ICYmIG9wdHMucmVnZXguaHJzMjQudGVzdChjaHJzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHBhcnNlSW50KGNocnMsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAyNCA9PT0gdG1wID8gKG1hc2tzZXQuYnVmZmVyW3BvcyArIDVdID0gXCJhXCIsIG1hc2tzZXQuYnVmZmVyW3BvcyArIDZdID0gXCJtXCIpIDogKG1hc2tzZXQuYnVmZmVyW3BvcyArIDVdID0gXCJwXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldC5idWZmZXJbcG9zICsgNl0gPSBcIm1cIiksIHRtcCAtPSAxMiwgdG1wIDwgMTAgPyAobWFza3NldC5idWZmZXJbcG9zXSA9IHRtcC50b1N0cmluZygpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXQuYnVmZmVyW3BvcyAtIDFdID0gXCIwXCIpIDogKG1hc2tzZXQuYnVmZmVyW3Bvc10gPSB0bXAudG9TdHJpbmcoKS5jaGFyQXQoMSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldC5idWZmZXJbcG9zIC0gMV0gPSB0bXAudG9TdHJpbmcoKS5jaGFyQXQoMCkpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaEZyb21CdWZmZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHBvcyAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogcG9zICsgNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYzogbWFza3NldC5idWZmZXJbcG9zXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNWYWxpZDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZhbGlkYXRvcjogWyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24oY2hycywgbWFza3NldCwgcG9zLCBzdHJpY3QsIG9wdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gb3B0cy5yZWdleC5ocnNwcmUudGVzdChjaHJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpY3QgfHwgaXNWYWxpZCB8fCAhKGlzVmFsaWQgPSBvcHRzLnJlZ2V4Lmhycy50ZXN0KFwiMFwiICsgY2hycykpID8gaXNWYWxpZCA6IChtYXNrc2V0LmJ1ZmZlcltwb3NdID0gXCIwXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zKyssIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHBvc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC01XVswLTldXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmFsaWRhdG9yOiBbIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihjaHJzLCBtYXNrc2V0LCBwb3MsIHN0cmljdCwgb3B0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBvcHRzLnJlZ2V4Lm1zcHJlLnRlc3QoY2hycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaWN0IHx8IGlzVmFsaWQgfHwgIShpc1ZhbGlkID0gb3B0cy5yZWdleC5tcy50ZXN0KFwiMFwiICsgY2hycykpID8gaXNWYWxpZCA6IChtYXNrc2V0LmJ1ZmZlcltwb3NdID0gXCIwXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zKyssIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHBvc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24oY2hycywgbWFza3NldCwgcG9zLCBzdHJpY3QsIG9wdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMucmVnZXguYW1wbS50ZXN0KGNocnMgKyBcIm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IFwibG93ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbnNlcnRNb2RlOiAhMSxcclxuICAgICAgICAgICAgYXV0b1VubWFzazogITFcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGV0aW1lMTI6IHtcclxuICAgICAgICAgICAgbWFzazogXCIxLzIveSBoOnMgdFxcXFxtXCIsXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkREL01NL1lZWVkgaGg6TU0geG1cIixcclxuICAgICAgICAgICAgYWxpYXM6IFwiZGF0ZXRpbWVcIixcclxuICAgICAgICAgICAgaG91ckZvcm1hdDogXCIxMlwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIk1NL0REL1lZWVkgaGg6TU0geG1cIjoge1xyXG4gICAgICAgICAgICBtYXNrOiBcIjEvMi95IGg6cyB0XFxcXG1cIixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTU0vREQvWVlZWSBoaDpNTSB4bVwiLFxyXG4gICAgICAgICAgICBhbGlhczogXCJkYXRldGltZTEyXCIsXHJcbiAgICAgICAgICAgIHJlZ2V4OiB7XHJcbiAgICAgICAgICAgICAgICB2YWwycHJlOiBmdW5jdGlvbihzZXBhcmF0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXNjYXBlZFNlcGFyYXRvciA9IElucHV0bWFzay5lc2NhcGVSZWdleC5jYWxsKHRoaXMsIHNlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCIoKDBbMTMtOV18MVswMTJdKVwiICsgZXNjYXBlZFNlcGFyYXRvciArIFwiWzAtM10pfCgwMlwiICsgZXNjYXBlZFNlcGFyYXRvciArIFwiWzAtMl0pXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHZhbDI6IGZ1bmN0aW9uKHNlcGFyYXRvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlc2NhcGVkU2VwYXJhdG9yID0gSW5wdXRtYXNrLmVzY2FwZVJlZ2V4LmNhbGwodGhpcywgc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChcIigoMFsxLTldfDFbMDEyXSlcIiArIGVzY2FwZWRTZXBhcmF0b3IgKyBcIigwWzEtOV18WzEyXVswLTldKSl8KCgwWzEzLTldfDFbMDEyXSlcIiArIGVzY2FwZWRTZXBhcmF0b3IgKyBcIjMwKXwoKDBbMTM1NzhdfDFbMDJdKVwiICsgZXNjYXBlZFNlcGFyYXRvciArIFwiMzEpXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHZhbDFwcmU6IG5ldyBSZWdFeHAoXCJbMDFdXCIpLFxyXG4gICAgICAgICAgICAgICAgdmFsMTogbmV3IFJlZ0V4cChcIjBbMS05XXwxWzAxMl1cIilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGVhcGRheTogXCIwMi8yOS9cIixcclxuICAgICAgICAgICAgb25LZXlEb3duOiBmdW5jdGlvbihlLCBidWZmZXIsIGNhcmV0UG9zLCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLmN0cmxLZXkgJiYgZS5rZXlDb2RlID09PSBJbnB1dG1hc2sua2V5Q29kZS5SSUdIVCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LnZhbCgodG9kYXkuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkgKyB0b2RheS5nZXREYXRlKCkudG9TdHJpbmcoKSArIHRvZGF5LmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKSksIFxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwic2V0dmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiaGg6TU0gdFwiOiB7XHJcbiAgICAgICAgICAgIG1hc2s6IFwiaDpzIHRcXFxcbVwiLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJoaDpNTSB4bVwiLFxyXG4gICAgICAgICAgICBhbGlhczogXCJkYXRldGltZVwiLFxyXG4gICAgICAgICAgICBob3VyRm9ybWF0OiBcIjEyXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiaDpzIHRcIjoge1xyXG4gICAgICAgICAgICBtYXNrOiBcImg6cyB0XFxcXG1cIixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiaGg6TU0geG1cIixcclxuICAgICAgICAgICAgYWxpYXM6IFwiZGF0ZXRpbWVcIixcclxuICAgICAgICAgICAgaG91ckZvcm1hdDogXCIxMlwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImhoOk1NOnNzXCI6IHtcclxuICAgICAgICAgICAgbWFzazogXCJoOnM6c1wiLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJoaDpNTTpzc1wiLFxyXG4gICAgICAgICAgICBhbGlhczogXCJkYXRldGltZVwiLFxyXG4gICAgICAgICAgICBhdXRvVW5tYXNrOiAhMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJoaDpNTVwiOiB7XHJcbiAgICAgICAgICAgIG1hc2s6IFwiaDpzXCIsXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcImhoOk1NXCIsXHJcbiAgICAgICAgICAgIGFsaWFzOiBcImRhdGV0aW1lXCIsXHJcbiAgICAgICAgICAgIGF1dG9Vbm1hc2s6ICExXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRlOiB7XHJcbiAgICAgICAgICAgIGFsaWFzOiBcIkREL01NL1lZWVlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJNTS9ZWVlZXCI6IHtcclxuICAgICAgICAgICAgbWFzazogXCIxL3lcIixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTU0vWVlZWVwiLFxyXG4gICAgICAgICAgICBsZWFwZGF5OiBcImRvbm90dXNlXCIsXHJcbiAgICAgICAgICAgIHNlcGFyYXRvcjogXCIvXCIsXHJcbiAgICAgICAgICAgIGFsaWFzOiBcIk1NL0REL1lZWVlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hhbXNpOiB7XHJcbiAgICAgICAgICAgIHJlZ2V4OiB7XHJcbiAgICAgICAgICAgICAgICB2YWwycHJlOiBmdW5jdGlvbihzZXBhcmF0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXNjYXBlZFNlcGFyYXRvciA9IElucHV0bWFzay5lc2NhcGVSZWdleC5jYWxsKHRoaXMsIHNlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCIoKDBbMS05XXwxWzAxMl0pXCIgKyBlc2NhcGVkU2VwYXJhdG9yICsgXCJbMC0zXSlcIik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdmFsMjogZnVuY3Rpb24oc2VwYXJhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVzY2FwZWRTZXBhcmF0b3IgPSBJbnB1dG1hc2suZXNjYXBlUmVnZXguY2FsbCh0aGlzLCBzZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiKCgwWzEtOV18MVswMTJdKVwiICsgZXNjYXBlZFNlcGFyYXRvciArIFwiKDBbMS05XXxbMTJdWzAtOV0pKXwoKDBbMS05XXwxWzAxMl0pXCIgKyBlc2NhcGVkU2VwYXJhdG9yICsgXCIzMCl8KCgwWzEtNl0pXCIgKyBlc2NhcGVkU2VwYXJhdG9yICsgXCIzMSlcIik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdmFsMXByZTogbmV3IFJlZ0V4cChcIlswMV1cIiksXHJcbiAgICAgICAgICAgICAgICB2YWwxOiBuZXcgUmVnRXhwKFwiMFsxLTldfDFbMDEyXVwiKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB5ZWFycmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgIG1pbnllYXI6IDEzMDAsXHJcbiAgICAgICAgICAgICAgICBtYXh5ZWFyOiAxNDk5XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1hc2s6IFwieS8xLzJcIixcclxuICAgICAgICAgICAgbGVhcGRheTogXCIvMTIvMzBcIixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiWVlZWS9NTS9ERFwiLFxyXG4gICAgICAgICAgICBhbGlhczogXCJNTS9ERC9ZWVlZXCIsXHJcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogITBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiWVlZWS1NTS1ERCBoaDpNTTpzc1wiOiB7XHJcbiAgICAgICAgICAgIG1hc2s6IFwieS0xLTIgaDpzOnNcIixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiWVlZWS1NTS1ERCBoaDpNTTpzc1wiLFxyXG4gICAgICAgICAgICBhbGlhczogXCJkYXRldGltZVwiLFxyXG4gICAgICAgICAgICBzZXBhcmF0b3I6IFwiLVwiLFxyXG4gICAgICAgICAgICBsZWFwZGF5OiBcIi0wMi0yOVwiLFxyXG4gICAgICAgICAgICByZWdleDoge1xyXG4gICAgICAgICAgICAgICAgdmFsMnByZTogZnVuY3Rpb24oc2VwYXJhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVzY2FwZWRTZXBhcmF0b3IgPSBJbnB1dG1hc2suZXNjYXBlUmVnZXguY2FsbCh0aGlzLCBzZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiKCgwWzEzLTldfDFbMDEyXSlcIiArIGVzY2FwZWRTZXBhcmF0b3IgKyBcIlswLTNdKXwoMDJcIiArIGVzY2FwZWRTZXBhcmF0b3IgKyBcIlswLTJdKVwiKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB2YWwyOiBmdW5jdGlvbihzZXBhcmF0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXNjYXBlZFNlcGFyYXRvciA9IElucHV0bWFzay5lc2NhcGVSZWdleC5jYWxsKHRoaXMsIHNlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCIoKDBbMS05XXwxWzAxMl0pXCIgKyBlc2NhcGVkU2VwYXJhdG9yICsgXCIoMFsxLTldfFsxMl1bMC05XSkpfCgoMFsxMy05XXwxWzAxMl0pXCIgKyBlc2NhcGVkU2VwYXJhdG9yICsgXCIzMCl8KCgwWzEzNTc4XXwxWzAyXSlcIiArIGVzY2FwZWRTZXBhcmF0b3IgKyBcIjMxKVwiKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB2YWwxcHJlOiBuZXcgUmVnRXhwKFwiWzAxXVwiKSxcclxuICAgICAgICAgICAgICAgIHZhbDE6IG5ldyBSZWdFeHAoXCIwWzEtOV18MVswMTJdXCIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uS2V5RG93bjogZnVuY3Rpb24oZSwgYnVmZmVyLCBjYXJldFBvcywgb3B0cykge31cclxuICAgICAgICB9XHJcbiAgICB9KSwgSW5wdXRtYXNrO1xyXG59KTsiXX0=
