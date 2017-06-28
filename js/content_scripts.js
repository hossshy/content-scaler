$(function() {
    function getViewportWidth() {
        var $viewportSelector = $('head meta[name=viewport]');
        if ($viewportSelector.length > 0) {
            var $viewport = $viewportSelector[0];
            if ($viewport && $viewport.content) {
                var content = $viewport.content.split(',').filter(function (x) {
                    return x.startsWith("width=");
                });
                if (content.length > 0) {
                    var vw = content[0].substr("width=".length);
                    if ($.isNumeric(vw)) {
                        return parseInt(vw, 10);
                    }
                }
            }
        }
        return -1;
    }
    var $html = $("html");
    function scaleContent() {
        console.log("exec scaleContent");
        if (vw >= 0) {
            var w = document.documentElement.clientWidth;
            if ( vw > w ) {
                var scale = 1 / (vw / w);
                $html.css({
                    "transform-origin": "top left",
                    "transform": "scale(" + scale + ")",
                    "overflow-x": "hidden",
                    "overflow-y": "visible"
                });
            }
        }
        $html.css({"visibility": "visible"});
    }
    // リサイズ時の登録
    $(window).resize(scaleContent);
    var vw = getViewportWidth();
    // special condition for my company.
    var $vObj = $('#vObj');
    if ($vObj.length) {
        console.log('vObj found.');
        $vObj.css('display', 'none');
    }
    scaleContent();
});