"use strict";function SymbolDef(e,n,t){this.name=n.name,this.orig=[n],this.init=t,this.eliminated=0,this.scope=e,this.references=[],this.replaced=0,this.global=!1,this.export=!1,this.mangled_name=null,this.undeclared=!1,this.id=SymbolDef.next_id++}function next_mangled(e,n){var t=e.enclosed;e:for(;;){var i=base54(++e.cname);if(is_identifier(i)&&!member(i,n.reserved)){for(var a=t.length;0<=--a;){var s=t[a];if(i==(s.mangled_name||s.unmangleable(n)&&s.name))continue e}return i}}}SymbolDef.next_id=1,SymbolDef.prototype={unmangleable:function(e){return e||(e={}),this.global&&!e.toplevel||this.export||this.undeclared||!e.eval&&(this.scope.uses_eval||this.scope.uses_with)||e.keep_fnames&&(this.orig[0]instanceof AST_SymbolLambda||this.orig[0]instanceof AST_SymbolDefun)||this.orig[0]instanceof AST_SymbolMethod||e.keep_classnames&&(this.orig[0]instanceof AST_SymbolClass||this.orig[0]instanceof AST_SymbolDefClass)},mangle:function(e){var n=e.cache&&e.cache.props;if(this.global&&n&&n.has(this.name))this.mangled_name=n.get(this.name);else if(!this.mangled_name&&!this.unmangleable(e)){var t,i=this.scope,a=this.orig[0];e.ie8&&a instanceof AST_SymbolLambda&&(i=i.parent_scope),this.mangled_name=(t=this.redefined())?t.mangled_name||t.name:i.next_mangled(e,this),this.global&&n&&n.set(this.name,this.mangled_name)}},redefined:function(){return this.defun&&this.defun.variables.get(this.name)}},AST_Toplevel.DEFMETHOD("figure_out_scope",function(e){e=defaults(e,{cache:null,ie8:!1,safari10:!1});var n=this,t=n.parent_scope=null,i=new Dictionary,a=null,s=null,o=[],r=new TreeWalker(function(n,l){function c(e,n){if(s){var t=0;do{n++}while(r.parent(t++)!==s)}var i=r.parent(n);e.export=i instanceof AST_Export}if(n.is_block_scope()){var f=t;return n.block_scope=t=new AST_Scope(n),t.init_scope_vars(f),n instanceof AST_Scope||(t.uses_with=f.uses_with,t.uses_eval=f.uses_eval,t.directives=f.directives),e.safari10&&(n instanceof AST_For||n instanceof AST_ForIn)&&o.push(t),l(),t=f,!0}if(n instanceof AST_Destructuring)return s=n,l(),s=null,!0;if(n instanceof AST_Scope){n.init_scope_vars(t);f=t;var _=a,u=i;return a=t=n,i=new Dictionary,l(),t=f,a=_,i=u,!0}if(n instanceof AST_LabeledStatement){var h=n.label;if(i.has(h.name))throw new Error(string_template("Label {name} defined twice",h));return i.set(h.name,h),l(),i.del(h.name),!0}if(n instanceof AST_With)for(var m=t;m;m=m.parent_scope)m.uses_with=!0;else{if(n instanceof AST_Symbol&&(n.scope=t),n instanceof AST_Label&&(n.thedef=n,n.references=[]),n instanceof AST_SymbolLambda)a.def_function(n,"arguments"==n.name?void 0:a);else if(n instanceof AST_SymbolDefun)c((n.scope=a.parent_scope.get_defun_scope()).def_function(n,a),1);else if(n instanceof AST_SymbolClass)c(a.def_variable(n,a),1);else if(n instanceof AST_SymbolImport)t.def_variable(n);else if(n instanceof AST_SymbolDefClass)c((n.scope=a.parent_scope).def_function(n,a),1);else if(n instanceof AST_SymbolVar||n instanceof AST_SymbolLet||n instanceof AST_SymbolConst){if(p=n instanceof AST_SymbolBlockDeclaration?t.def_variable(n,null):a.def_variable(n,"SymbolVar"==n.TYPE?null:void 0),all(p.orig,function(e){return e===n||(n instanceof AST_SymbolBlockDeclaration?e instanceof AST_SymbolLambda:!(e instanceof AST_SymbolLet||e instanceof AST_SymbolConst))})||js_error(n.name+" redeclared",n.start.file,n.start.line,n.start.col,n.start.pos),n instanceof AST_SymbolFunarg||c(p,2),p.destructuring=s,a!==t){n.mark_enclosed(e);var p=t.find_variable(n);n.thedef!==p&&(n.thedef=p,n.reference(e))}}else if(n instanceof AST_SymbolCatch)t.def_variable(n).defun=a;else if(n instanceof AST_LabelRef){var S=i.get(n.name);if(!S)throw new Error(string_template("Undefined label {name} [{line},{col}]",{name:n.name,line:n.start.line,col:n.start.col}));n.thedef=S}!(t instanceof AST_Toplevel)&&(n instanceof AST_Export||n instanceof AST_Import)&&js_error(n.TYPE+" statement may only appear at top level",n.start.file,n.start.line,n.start.col,n.start.pos)}});n.walk(r),n.globals=new Dictionary;r=new TreeWalker(function(t){if(t instanceof AST_LoopControl&&t.label)return t.label.thedef.references.push(t),!0;if(t instanceof AST_SymbolRef){var i,a=t.name;if("eval"==a&&r.parent()instanceof AST_Call)for(var s=t.scope;s&&!s.uses_eval;s=s.parent_scope)s.uses_eval=!0;return r.parent()instanceof AST_NameMapping&&r.parent(1).module_name||!(i=t.scope.find_variable(a))?i=n.def_global(t):i.scope instanceof AST_Lambda&&"arguments"==a&&(i.scope.uses_arguments=!0),t.thedef=i,t.reference(e),t.scope.is_block_scope()&&!(i.orig[0]instanceof AST_SymbolBlockDeclaration)&&(t.scope=t.scope.get_defun_scope()),!0}var o;if(t instanceof AST_SymbolCatch&&(o=t.definition().redefined()))for(s=t.scope;s&&(push_uniq(s.enclosed,o),s!==o.scope);)s=s.parent_scope});if(n.walk(r),e.ie8&&n.walk(new TreeWalker(function(t){if(t instanceof AST_SymbolCatch){var i=t.name,a=t.thedef.references,s=t.thedef.defun,o=s.find_variable(i)||n.globals.get(i)||s.def_variable(t);return a.forEach(function(n){n.thedef=o,n.reference(e)}),t.thedef=o,t.reference(e),!0}})),e.safari10)for(var l=0;l<o.length;l++)(t=o[l]).parent_scope.variables.each(function(e){push_uniq(t.enclosed,e)})}),AST_Toplevel.DEFMETHOD("def_global",function(e){var n=this.globals,t=e.name;if(n.has(t))return n.get(t);var i=new SymbolDef(this,e);return i.undeclared=!0,i.global=!0,n.set(t,i),i}),AST_Scope.DEFMETHOD("init_scope_vars",function(e){this.variables=new Dictionary,this.functions=new Dictionary,this.uses_with=!1,this.uses_eval=!1,this.parent_scope=e,this.enclosed=[],this.cname=-1}),AST_Node.DEFMETHOD("is_block_scope",return_false),AST_Class.DEFMETHOD("is_block_scope",return_false),AST_Lambda.DEFMETHOD("is_block_scope",return_false),AST_Toplevel.DEFMETHOD("is_block_scope",return_false),AST_SwitchBranch.DEFMETHOD("is_block_scope",return_false),AST_Block.DEFMETHOD("is_block_scope",return_true),AST_IterationStatement.DEFMETHOD("is_block_scope",return_true),AST_Lambda.DEFMETHOD("init_scope_vars",function(){AST_Scope.prototype.init_scope_vars.apply(this,arguments),this.uses_arguments=!1,this.def_variable(new AST_SymbolFunarg({name:"arguments",start:this.start,end:this.end}))}),AST_Arrow.DEFMETHOD("init_scope_vars",function(){AST_Scope.prototype.init_scope_vars.apply(this,arguments),this.uses_arguments=!1}),AST_Symbol.DEFMETHOD("mark_enclosed",function(e){for(var n=this.definition(),t=this.scope;t&&(push_uniq(t.enclosed,n),e.keep_fnames&&t.functions.each(function(e){push_uniq(n.scope.enclosed,e)}),t!==n.scope);)t=t.parent_scope}),AST_Symbol.DEFMETHOD("reference",function(e){this.definition().references.push(this),this.mark_enclosed(e)}),AST_Scope.DEFMETHOD("find_variable",function(e){return e instanceof AST_Symbol&&(e=e.name),this.variables.get(e)||this.parent_scope&&this.parent_scope.find_variable(e)}),AST_Scope.DEFMETHOD("def_function",function(e,n){var t=this.def_variable(e,n);return(!t.init||t.init instanceof AST_Defun)&&(t.init=n),this.functions.set(e.name,t),t}),AST_Scope.DEFMETHOD("def_variable",function(e,n){var t=this.variables.get(e.name);return t?(t.orig.push(e),t.init&&(t.scope!==e.scope||t.init instanceof AST_Function)&&(t.init=n)):(t=new SymbolDef(this,e,n),this.variables.set(e.name,t),t.global=!this.parent_scope),e.thedef=t}),AST_Scope.DEFMETHOD("next_mangled",function(e){return next_mangled(this,e)}),AST_Toplevel.DEFMETHOD("next_mangled",function(e){var n;do{n=next_mangled(this,e)}while(member(n,this.mangled_names));return n}),AST_Function.DEFMETHOD("next_mangled",function(e,n){for(var t,i=n.orig[0]instanceof AST_SymbolFunarg&&this.name&&this.name.definition(),a=i?i.mangled_name||i.name:null;;)if(t=next_mangled(this,e),!a||a!=t)return t}),AST_Symbol.DEFMETHOD("unmangleable",function(e){var n=this.definition();return!n||n.unmangleable(e)}),AST_Label.DEFMETHOD("unmangleable",return_false),AST_Symbol.DEFMETHOD("unreferenced",function(){return 0==this.definition().references.length&&!(this.scope.uses_eval||this.scope.uses_with)}),AST_Symbol.DEFMETHOD("definition",function(){return this.thedef}),AST_Symbol.DEFMETHOD("global",function(){return this.definition().global}),AST_Toplevel.DEFMETHOD("_default_mangler_options",function(e){return e=defaults(e,{eval:!1,ie8:!1,keep_classnames:!1,keep_fnames:!1,reserved:[],toplevel:!1}),Array.isArray(e.reserved)||(e.reserved=[]),push_uniq(e.reserved,"arguments"),e}),AST_Toplevel.DEFMETHOD("mangle_names",function(e){function n(n){member(n.name,e.reserved)||i.push(n)}e=this._default_mangler_options(e);var t=-1,i=[],a=this.mangled_names=[];e.cache&&(this.globals.each(n),e.cache.props&&e.cache.props.each(function(e){push_uniq(a,e)}));var s=new TreeWalker(function(a,s){if(a instanceof AST_LabeledStatement){var o=t;return s(),t=o,!0}if(a instanceof AST_Scope)a.variables.each(n);else{if(!a.is_block_scope()){if(a instanceof AST_Label){var r;do{r=base54(++t)}while(!is_identifier(r));return a.mangled_name=r,!0}return!e.ie8&&a instanceof AST_SymbolCatch?void i.push(a.definition()):void 0}a.block_scope.variables.each(n)}});this.walk(s),i.forEach(function(n){n.mangle(e)})}),AST_Toplevel.DEFMETHOD("find_colliding_names",function(e){function n(e){a[e]=!0}function t(t){var a=t.name;if(t.global&&i&&i.has(a))a=i.get(a);else if(!t.unmangleable(e))return;n(a)}var i=e.cache&&e.cache.props,a=Object.create(null);return e.reserved.forEach(n),this.globals.each(t),this.walk(new TreeWalker(function(e){e instanceof AST_Scope&&e.variables.each(t),e instanceof AST_SymbolCatch&&t(e.definition())})),a}),AST_Toplevel.DEFMETHOD("expand_names",function(e){function n(){var e;do{e=base54(a++)}while(i[e]||!is_identifier(e));return e}function t(t){if(!(t.global&&e.cache||t.unmangleable(e)||member(t.name,e.reserved))){var i=t.redefined();t.name=i?i.name:n(),t.orig.forEach(function(e){e.name=t.name}),t.references.forEach(function(e){e.name=t.name})}}base54.reset(),base54.sort(),e=this._default_mangler_options(e);var i=this.find_colliding_names(e),a=0;this.globals.each(t),this.walk(new TreeWalker(function(e){e instanceof AST_Scope&&e.variables.each(t),e instanceof AST_SymbolCatch&&t(e.definition())}))}),AST_Node.DEFMETHOD("tail_node",return_this),AST_Sequence.DEFMETHOD("tail_node",function(){return this.expressions[this.expressions.length-1]}),AST_Toplevel.DEFMETHOD("compute_char_frequency",function(e){e=this._default_mangler_options(e);try{AST_Node.prototype.print=function(n,t){this._print(n,t),this instanceof AST_Symbol&&!this.unmangleable(e)?base54.consider(this.name,-1):e.properties&&(this instanceof AST_Dot?base54.consider(this.property,-1):this instanceof AST_Sub&&function e(n){n instanceof AST_String?base54.consider(n.value,-1):n instanceof AST_Conditional?(e(n.consequent),e(n.alternative)):n instanceof AST_Sequence&&e(n.tail_node())}(this.property))},base54.consider(this.print_to_string(),1)}finally{AST_Node.prototype.print=AST_Node.prototype._print}base54.sort()});var base54=function(){function e(){a=Object.create(null),s.forEach(function(e){a[e]=0}),o.forEach(function(e){a[e]=0})}function n(e,n){return a[n]-a[e]}function t(e){var n="",t=54;e++;do{n+=i[--e%t],e=Math.floor(e/t),t=64}while(0<e);return n}var i,a,s=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","$","_"],o=["0","1","2","3","4","5","6","7","8","9"];return t.consider=function(e,n){for(var t=e.length;0<=--t;)a[e[t]]+=n},t.sort=function(){i=mergeSort(s,n).concat(mergeSort(o,n))},t.reset=e,e(),t}();