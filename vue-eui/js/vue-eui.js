(function(window,undefined) {
	var w = window,
		c = document;
	
	// 构造VE对象
	var VE = function(selector) {
		return new VE.prototype.init(selector);
	};
	
	//VE对象原型
	VE.prototype = {
		constructor : VE,
		init: function (selector) {//dom选择的一些判断
            if (!selector) {
                return this;
            }
            if (typeof selector == 'object') {
                var selector = [selector];
                for (var i = 0; i < selector.length; i++) {
                    this[i] = selector[i];
                }
                this.length = selector.length;
                return this;
            } else if (typeof selector == 'function') {
                VE.ready(selector);
                return;
            }
            var selector = selector.trim(),
                elm;
            if (selector.charAt(0) == '#' && !selector.match('\\s')) {
                selector = selector.substring(1);
                this.selector = selector;
                elm = c.getElementById(selector);
                this[0] = elm;
                this.length = 1;
                return this;
            } else {
                elm = c.querySelectorAll(selector);
                for (var i = 0; i < elm.length; i++) {
                    this[i] = elm[i];
                }
                this.selector = selector;
                this.length = elm.length;
                return this;
            }
        },
		css : function(attr,val) {
			for(var i = 0;i < this.length; i++) {
				if(arguments.length == 1) {
					return getComputedStyle(this[i],null)[attr];
				} 
				this[i].style[attr] = val;
			}
			return this;
		},
		hasClass : function(cls) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			for (var i = 0; i < this.length; i++) {
				if (this[i].className.match(reg)) return true;
					return false;
			}
			return this;
		},
		addClass : function(cls) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			for (var i = 0; i < this.length; i++) {
				if(!this[i].className.match(reg))
					this[i].className += ' ' + cls;
			}
			return this;
		},
		removeClass : function(cls) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			for (var i = 0; i < this.length; i++) {
				if (this[i].className.match(reg)) 
					this[i].className = this[i].className.replace(' ' + cls,'');
			}
			return this;
		}
	};
	
	VE.prototype.init.prototype = VE.prototype;
	
	VE.ready = function (fn) {
        c.addEventListener('DOMContentLoaded', function () {
            fn && fn();
        }, false);
        c.removeEventListener('DOMContentLoaded', fn, true);
    };

	w.VE = w.$ = VE;
	
})(window);

/**
 * function:chatlist
 */
Vue.component('ve-chatlist', {	
	props: ['listdata'],
	template:
		'<div class="{{item.type}}" v-for="item in listdata">'+
		    '<div class="eui-chat-avatar">'+
		    	'<img v-bind:src="item.logo">'+
		    '</div>'+
		    '<div class="eui-chat-content">'+
		    	'<div class="eui-chat-triangle"></div>'+
		    	'<span>{{item.msg}}</span>'+
		    '</div>'+
		'</div>'
})

/**
 * function:messagelist
 */
Vue.component('ve-messagelist', {	
	props: ['listdata'],
	template:
		'<ul class="eui-list-group eui-message">'+
			'<li class="eui-list-cell" v-for="item in listdata">'+
				'<a href="{{item.path}}">'+
					'<div class="list-item-body">'+
						'<img class="eui-message-logo" v-bind:src="item.logo">'+
						'<div class="eui-message-body">'+
							'<span class="eui-message-title">{{item.name}}</span>'+
							'<span class="eui-message-time">{{item.time}}</span>'+
							'<div class="eui-message-content-wrap">'+
								'<div class="eui-message-content eui-text-overflow">{{item.msg}}</div>'+
								'<div class="eui-list-badge">{{item.msgnum}}</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="list-item-del">删除</div>'+
				'</a>'+
			'</li>'+
		'</ul>'
})


/**
 * function:confirm
 * 
 * @param {Object} opt
 */
function VEdialog(opt){
	var title=opt.title;
		content=opt.content;
	    btn=opt.btn;
	    callback=opt.callback;
	    
	Vue.component('ve-confirm', {
	  	template:   
	  		'<div class="eui-dialog-mask" v-if="show" transition="dialog">'+
				'<div class="eui-dialog-wrapper">'+
					'<div class="eui-dialog">'+
					    '<div v-show="title?true:false" class="eui-dialog-title" v-bind:style="titleStyle">'+
					    	'<h3>{{title}}</h3>'+
					    	'<i class="eui-icon" @click="cancel">×</i>'+
					    '</div>'+
	    	            '<div v-show="content?true:false" class="eui-dialog-content"  v-bind:style="contentStyle">'+
	    	            	'{{{content}}}'+
	    	            '</div>'+
			            '<div v-show="btn?true:false" class="eui-dialog-btns">'+
			            	'<button v-for="item in btn" @click="fn($index)">{{item}}</button>'+
			            '</div>'+
					'</div>'+
				'</div>'+
		  	'</div>',
	  	props: {
		    show: {
		      	type: Boolean,
		      	required: true,
		      	twoWay: true    
		    }
	  	},
	  	data:function(){
    		return {
    			title:title[0],
    			titleStyle:title[1],
    			content: content[0],
    			contentStyle:content[1],
    			btn:btn
    		}
        },
        methods:{
        	cancel:function(){
        		this.show = false;
        	},
        	fn:function(index){
        		(callback[index])();
        		this.cancel();
        	}
	   	}
	});
	
}

/**
 * function:tabbar
 * 
 * @param {Object} opt
 */
function VEtabbar(opt){
	//base config
	var tplel=opt.config.el,
		init=opt.config.initIndex?(opt.config.initIndex-1):0,
		tplID=opt.config.tplID,	
		tplNum=tplID.length,
		headertpl=opt.config.header,
		footertpl=opt.config.footer,
		viewtpl={};
	
	//view render
	for(var i=0;i<tplNum;i++){
		viewtpl['view-'+i]=Vue.extend({
	        template: '#'+tplID[i],
	        data:function(){
	        	return opt.data
	        }
	    });
	}		
	
	new Vue({
	  	el: tplel,
	  	data: {
	  		header:'',view: '',footer:'',initIndex:init
	  	},
	  	components: viewtpl,
	  	created: function () {
	  		this.header = headertpl[init];	  		
	  		this.view = 'view-'+init;
	  		this.footer=footertpl;
     	},
     	methods: {
            tabbar: function(index){ 
            	this.header = headertpl[index];
            	this.view='view-'+index;
            	this.initIndex=index;
            }
        }
	})		
}