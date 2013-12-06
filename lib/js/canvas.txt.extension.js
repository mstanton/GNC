/**
 *    Canvas extension: drawHTMLText(txt, options)
 *    By Ken Fyrstenberg Nilsen, Abdias Software
 *    http://abdiassoftware.com/
 *
 *    USAGE:
 *        myContext.drawHTMLText(txt [, options]);
 *
 *    var options = {x: startPosition,
 *                   y: startPosition,
 *                   width: maxWidth,
 *                   height: maxHeight,
 *                   callback: myFunction,
 *                   callbackError: myErrorFunction}
 *
 *    Each individual option is optional in themself. The callback
 *    on success contains an object with reference to result and
 *    originalText. Error callback is provided with the error object.
 *
 *    License: MIT
 */
CanvasRenderingContext2D.prototype.drawHTMLText = function(txt, options) {
 
    /// make sure we have an object if none was provided
    options = options || {};
 
    var ctx = this,
 
        /// build inline SVG
        iSVG =
 
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + 
        (options.width ? options.width : ctx.canvas.width) +
 
        '" height="' +
        (options.height ? options.height : ctx.canvas.height) +
        '"><foreignObject width="100%" height="100%">' +
 
        '<div xmlns="http://www.w3.org/1999/xhtml" style="font:' +
        ctx.font + ';color:' + ctx.fillStyle + '">' +
 
        txt +
 
        "</div></foreignObject></svg>",
 
        /// create Blob of inlined SVG
        svg = new Blob([iSVG],{type:"image/svg+xml;charset=utf-8"}),
 
        /// create URL (handle prefixed version)
        domURL = self.URL || self.webkitURL || self,
        url = domURL.createObjectURL(svg),
 
        /// create Image
        img = new Image;
 
    /// handle image loading
    img.onload = function () {
 
        /// draw SVG to canvas
        ctx.drawImage(img,
                      (options.x ? options.x : 0),
                      (options.y ? options.y : 0));
 
        domURL.revokeObjectURL(url);
 
        /// invoke callback if provided
        if (typeof options.callback === 'function')
            options.callback({result: img,
                              originalText: txt});
    };
 
    /// handle potential errors
    img.onerror = function(e) {
        if (typeof options.callbackError === 'function') {
            options.callbackError(e);
        } else {
            console.log(e);
        }
    }
 
    img.src = url;
}