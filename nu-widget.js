var extend 	= require('extend');

global.nu = {
    nuWidget_counter : 0,
    nuWidget_objects : {},
    widget : function (widget_name,base) {
        var self                    = this;
        var namespace               = widget_name.split('.')[0];
        var widget                  = widget_name.split('.')[1];
        self[namespace]             = self[namespace]||{};
        self[namespace][widget]     = function(){};
        extend(true,self[namespace][widget].prototype,base);
        this[widget]                = function(){
            var args = [];
            Array.prototype.push.apply( args, arguments );
            var options     = args.shift();
            var widget_id   = 'nuWidget_' + widget;
            switch(typeof options){
                case 'object':
                    self.nuWidget_counter++;
                    self.nuWidget_objects[widget_id] = extend(true,{},self[namespace][widget].prototype);
                    extend(true,self.nuWidget_objects[widget_id],{
                        options : options,
                    });
                    self.nuWidget_objects[widget_id]._create();
                    return self.nuWidget_objects[widget_id];
                    break;
                case 'string':
                    if(typeof self.nuWidget_objects[widget_id]!='undefined')
                        self.nuWidget_objects[widget_id][options].apply(self.nuWidget_objects[widget_id],args);
                    break;
            }
            return self.nuWidget_objects[widget_id];
        }
    },
    extend : function(){
        extend.apply(this,arguments);
    }
}
