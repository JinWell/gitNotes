define(function(require,exports,module){var a=require("collection/project").Collection,b=require("model/project").Model,c=new a;exports.db={collection:c,flush:function(){this.collection.reset()},getProjectById:function(a){return~a.indexOf("inbox")?!1:c.get(a)},getNotInAllProjects:function(){return c.filter(function(a){return!a.get("inAll")})},getNotInAllProjectIds:function(){return _.pluck(this.getNotInAllProjects(),"id")},mergeSetToLocal:function(a){var c=this,d=this.collection.toJSON();_.each(d,function(b){if("inbox"!==b.taskType){var d=_.find(a,function(a){return a.id===b.id});return _.isUndefined(d)?void c.collection.get(b.id).destroy():b.etag!==d.etag?void c.collection.get(b.id).set(d):void 0}}),_.each(a,function(a){var e=_.find(d,function(b){return b.id===a.id});if(_.isUndefined(e)){var f=new b(a);return f.local=!0,c.collection.add(f),void(f.local=!1)}})}}});