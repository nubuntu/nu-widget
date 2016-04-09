var extend 	= require('extend');

var  nuWidget_counter = 0,
    nuWidget_objects = {};
var nu = nu || {};

exports.widget = function (widget_name,base) {
    var namespace           = widget_name.split('.')[0];
    var widget              = widget_name.split('.')[1];
    nu[namespace]           = nu[namespace]||{};
    nu[namespace][widget]    = function(){};
    extend(true,nu[namespace][widget].prototype,base);
    exports[widget]            = function(){
        var args = [];
        Array.prototype.push.apply( args, arguments );
        var options		= args.shift();
        var widget_id 	= 'nuWidget_' + widget;
        switch(typeof options){
            case 'object':
                nuWidget_counter++;
                nuWidget_objects[widget_id] = extend(true,{},nu[namespace][widget].prototype);
                extend(true,nuWidget_objects[widget_id],{
                    options : options,
                });
                nuWidget_objects[widget_id]._create();
                break;
            case 'string':
                if(typeof nuWidget_objects[widget_id]!='undefined')
                    nuWidget_objects[widget_id][options].apply(nuWidget_objects[widget_id],args);
                break;
        }
        return this;
    }
}

var base = {
    extend : extend,
}
exports.extend = function(){
    base.extend.apply(this,arguments);
}