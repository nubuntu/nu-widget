var extend 	= require('extend');

exports.nuWidget_counter    = exports.nuWidget_counter || 0;
exports.nuWidget_objects     = exports.nuWidget_objects || {};

global.nu = {
    widget : function (widget_name,base) {
        var namespace               = widget_name.split('.')[0];
        var widget                  = widget_name.split('.')[1];
        exports[namespace]          = exports[namespace]||{};
        exports[namespace][widget]  = function(){};
        extend(true,exports[namespace][widget].prototype,base);
        this[widget]                = function(){
            var args = [];
            Array.prototype.push.apply( args, arguments );
            var options     = args.shift();
            var widget_id   = 'nuWidget_' + widget;
            switch(typeof options){
                case 'object':
                    exports.nuWidget_counter++;
                    exports.nuWidget_objects[widget_id] = extend(true,{},exports[namespace][widget].prototype);
                    extend(true,exports.nuWidget_objects[widget_id],{
                        options : options,
                    });
                    exports.nuWidget_objects[widget_id]._create();
                    return exports.nuWidget_objects[widget_id];
                    break;
                case 'string':
                    if(typeof exports.nuWidget_objects[widget_id]!='undefined')
                        exports.nuWidget_objects[widget_id][options].apply(exports.nuWidget_objects[widget_id],args);
                    break;
            }
            return exports.nuWidget_objects[widget_id];
        }
    }
}

var base = {
    extend : extend,
}
exports.extend = function(){
    base.extend.apply(this,arguments);
}