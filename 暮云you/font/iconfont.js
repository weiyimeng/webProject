!(function (e) {
  var t,
    n,
    o,
    i,
    c,
    d =
      '<svg><symbol id="icon-QQ" viewBox="0 0 1024 1024"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z"  ></path></symbol><symbol id="icon-weixin" viewBox="0 0 1024 1024"><path d="M686.6 372.5c4.5 0 9 0.1 13.4 0.3C676.5 246.1 544.2 149 384.5 149 208.2 149 65.3 267.3 65.3 413.2c0 85.6 49.1 161.6 125.3 209.9 1 0.6 2.9 1.8 2.9 1.8l-30.9 95.6L278 662.3l5.4 1.5c31.7 8.7 65.7 13.5 101 13.5 7.2 0 14.3-0.3 21.4-0.6-6.5-20.1-10.1-41.2-10.1-63 0.1-133.2 130.4-241.2 290.9-241.2z m-191-93.2c24.8 0 44.8 19.2 44.8 43 0 23.7-20 43-44.8 43s-44.8-19.3-44.8-43c0-23.8 20-43 44.8-43z m-222.2 85.9c-24.7 0-44.8-19.3-44.8-43s20.1-43 44.8-43c24.8 0 44.9 19.2 44.9 43 0 23.7-20.1 43-44.9 43z m685.3 250.1c0-123.3-120.7-223.2-269.6-223.2-149 0-269.7 99.9-269.7 223.2 0 123.3 120.8 223.2 269.7 223.2 29.8 0 58.5-4 85.3-11.4 1.5-0.4 4.6-1.3 4.6-1.3l97.4 49.2-26-80.8s1.7-1 2.5-1.5c64.3-40.8 105.8-105.1 105.8-177.4z m-363.5-40.6c-20.9 0-37.9-16.3-37.9-36.3 0-20 16.9-36.2 37.9-36.2 20.9 0 37.9 16.2 37.9 36.2 0 20.1-17 36.3-37.9 36.3z m187.6 0c-20.9 0-37.8-16.3-37.8-36.3 0-20 16.9-36.2 37.8-36.2 21 0 37.9 16.2 37.9 36.2 0 20.1-16.9 36.3-37.9 36.3z" fill="#333333" ></path></symbol></svg>',
    l = (l = document.getElementsByTagName("script"))[
      l.length - 1
    ].getAttribute("data-injectcss"),
    s = function (e, t) {
      t.parentNode.insertBefore(e, t);
    };
  if (l && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  function a() {
    c || ((c = !0), o());
  }
  function m() {
    try {
      i.documentElement.doScroll("left");
    } catch (e) {
      return void setTimeout(m, 50);
    }
    a();
  }
  (t = function () {
    var e,
      t = document.createElement("div");
    (t.innerHTML = d),
      (d = null),
      (t = t.getElementsByTagName("svg")[0]) &&
        (t.setAttribute("aria-hidden", "true"),
        (t.style.position = "absolute"),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = "hidden"),
        (t = t),
        (e = document.body).firstChild ? s(t, e.firstChild) : e.appendChild(t));
  }),
    document.addEventListener
      ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
        ? setTimeout(t, 0)
        : ((n = function () {
            document.removeEventListener("DOMContentLoaded", n, !1), t();
          }),
          document.addEventListener("DOMContentLoaded", n, !1))
      : document.attachEvent &&
        ((o = t),
        (i = e.document),
        (c = !1),
        m(),
        (i.onreadystatechange = function () {
          "complete" == i.readyState && ((i.onreadystatechange = null), a());
        }));
})(window);
