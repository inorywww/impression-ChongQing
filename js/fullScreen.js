(function (b) {
    b.fn.XSwitch = function (d) {
        return this.each(function () {
            var f = b(this), e = f.data("XSwitch");
            if (!e) {
                e = new c(f, d);
                f.data("XSwitch", e)
            }
            if (b.type(d) === "string") {
                return e[d]()
            }
        })
    };
    b.fn.XSwitch.defaults = {
        selectors: {sections: ".sections", section: ".section", page: ".pages", active: ".active"},
        index: 0,
        easing: "ease",
        duration: 500,
        loop: false,
        pagination: true,
        keyboard: true,
        direction: "vertical",
        callback: ""
    };
    var a = (function (e) {
        var h = ["webkit", "moz", "o", "ms"], g = "";
        for (var f = 0, d = h.length; f < d; f++) {
            g = h[f] + "Transition";
            if (e.style[g] !== undefined) {
                return "-" + h[f].toLowerCase() + "-"
            }
            return false
        }
    })(document.createElement("div"));
    var c = (function () {
        function g(j, i) {
            this.settings = b.extend(true, b.fn.XSwitch.defaults, i);
            this.element = j;
            this.init()
        }

        g.prototype = {
            init: function () {
                var i = this;
                this.selectors = this.settings.selectors;
                this.sections = this.element.find(this.selectors.sections);
                this.section = this.sections.find(this.selectors.section);
                this.direction = this.settings.direction === "vertical" ? true : false;
                this.pagesCount = this.pagesCount();
                this.index = (this.settings.index >= 0 && this.settings.index < this.pagesCount) ? this.settings.index : 0;
                this.canScroll = true;
                if (!this.direction) {
                    d(i)
                }
                if (this.settings.pagination) {
                    h(i)
                }
                f(i)
            }, pagesCount: function () {
                return this.section.size()
            }, switchLength: function () {
                return this.duration ? this.element.height() : this.element.width()
            }, prve: function () {
                var i = this;
                if (this.index > 0) {
                    this.index--
                } else {
                    if (this.settings.loop) {
                        this.index = this.pagesCount - 1
                    }
                }
                e(i)
            }, next: function () {
                var i = this;
                if (this.index < this.pagesCount) {
                    this.index++
                } else {
                    if (this.settings.loop) {
                        this.index = 0
                    }
                }
                e(i)
            }
        };

        function d(k) {
            var j = (k.pagesCount * 100) + "%", i = (100 / k.pagesCount).toFixed(2) + "%";
            k.sections.width(j);
            k.section.width(i).css("float", "left")
        }

        function h(o) {
            var n = o.selectors.page.substring(1), l = '<ul class="' + n + '">';
            o.activeClass = o.selectors.active.substring(1);
            for (var m = 0, k = o.pagesCount; m < k; m++) {
                l += "<li></li>"
            }
            l += "</ul>";
            o.element.append(l);
            var j = o.element.find(o.selectors.page);
            o.pageItem = j.find("li");
            o.pageItem.eq(o.index).addClass(o.activeClass);
            if (o.direction) {
                j.addClass("vertical")
            } else {
                j.addClass("horizontal")
            }
        }

        function f(i) {
            i.element.on("click touchstart", i.selectors.page + " li", function () {
                i.index = b(this).index();
                e(i)
            });
            i.element.on("mousewheel DOMMouseScroll", function (j) {
                if (!i.canScroll) {
                    return
                }
                var k = -j.originalEvent.detail || -j.originalEvent.deltaY || j.originalEvent.wheelDelta;
                if (k > 0 && (i.index && !i.settings.loop || i.settings.loop)) {
                    i.prve()
                } else {
                    if (k < 0 && (i.index < (i.pagesCount - 1) && !i.settings.loop || i.settings.loop)) {
                        i.next()
                    }
                }
            });
            i.element.on("touchstart", function (l) {
                var k = l.originalEvent.changedTouches[0].pageX, j = l.originalEvent.changedTouches[0].pageY;
                i.element.one("touchend", function (o) {
                    if (!i.canScroll) {
                        return
                    }
                    var n = o.originalEvent.changedTouches[0].pageX, m = o.originalEvent.changedTouches[0].pageY,
                        p = m - j;
                    if (p > 50) {
                        i.prve()
                    } else {
                        if (p < -50) {
                            i.next()
                        }
                    }
                });
                l.preventDefault()
            });
            if (i.settings.keyboard) {
                b(window).on("keydown", function (k) {
                    var j = k.keyCode;
                    if (j === 37 || j === 38) {
                        i.prve()
                    } else {
                        if (j === 39 || j === 40) {
                            i.next()
                        }
                    }
                })
            }
            b(window).resize(function () {
                var j = i.switchLength(),
                    k = i.settings.direction ? i.section.eq(i.index).offset().top : i.section.eq(i.index).offset().left;
                if (Math.abs(k) > j / 2 && i.index < (i.pagesCount - 1)) {
                    i.index++
                }
                if (i.index) {
                    e(i)
                }
            });
            i.sections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function () {
                i.canScroll = true;
                if (i.settings.callback && type(i.settings.callback) === "function") {
                    i.settings.callback()
                }
            })
        }

        function e(l) {
            var i = l.section.eq(l.index).position();
            if (!i) {
                return
            }
            l.canScroll = false;
            if (a) {
                l.sections.css(a + "transition", "all " + l.settings.duration + "ms " + l.settings.easing);
                var j = l.direction ? "translateY(-" + i.top + "px)" : "translateX(-" + i.left + "px)";
                l.sections.css(a + "transform", j)
            } else {
                var k = l.direction ? {top: -i.top} : {left: -i.left};
                l.sections.animate(k, l.settings.duration, function () {
                    l.canScroll = true;
                    if (l.settings.callback && type(l.settings.callback) === "function") {
                        l.settings.callback()
                    }
                })
            }
            if (l.settings.pagination) {
                l.pageItem.eq(l.index).addClass(l.activeClass).siblings("li").removeClass(l.activeClass)
            }
        }

        return g
    })()
})(jQuery);
$(function () {
    $("[data-XSwitch]").XSwitch()
});