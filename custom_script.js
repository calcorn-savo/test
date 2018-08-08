(function ($) {
    $( document ).ready(function() {
        
        /******************** READ MORE TEXT JS ********************/

        $('.readmore-text').each(function(){
            var maxHeight;
            var readMore = $(this);
            var classes = readMore.attr('class').split(' ');

            for (var i = 0; i < classes.length; i++) {
                var height = /^height\-(.+)/.exec(classes[i]);
                maxHeight = (height != null) ? (height[1] + 'px') : '70px';
            }
    
            readMore.height(maxHeight);

            readMore.next('.readmore-open').click(function(){
                readMore.height('auto');
                readMore.addClass('open');
                $(this).css('display','none');
                $(this).next('.readmore-close').css('display','block');
            });

            readMore.next().next('.readmore-close').click(function(){
                readMore.height(maxHeight);
                readMore.removeClass('open');
                $(this).css('display','none');
                $(this).prev('.readmore-open').css('display','block');
            });
            
        });

        /****************** END READ MORE TEXT JS ******************/
        
        /****************** SOCIAL MEDIA BUTTON JS *****************/
        
        var ACPDSocialButtons = (function() {
            /**
             * Returns all social media parameters entered by admin
             */
            var getSocialValues = function() {
                 var values = { 
                     "email" : { 
                         "url" : $("#outlook-url").text() == "" ? "" : $("#outlook-url").text()
                     }, 
                     "linkedin" : {
                         "shareprefix" : "https://www.linkedin.com/shareArticle?", 
                         "title" : $("#linkedin-title").text() == "" ? "" : $("#linkedin-title").text(), 
                         "summary" : $("#linkedin-summary").text() == "" ? "" : $("#linkedin-summary").text(), 
                         "url" : $("#linkedin-url").text().length < 5 ? String(window.location.href) : $("#linkedin-url").text()
                     }, 
                     "twitter" : {
                         "shareprefix" : "https://twitter.com/intent/tweet?", 
                         "text" : $("#twitter-text").text() == "" ? "" : $("#twitter-text").text(), 
                         "hashtags" : $("#twitter-hashtags").text() == "" ? "" : $("#twitter-hashtags").text(), 
                         "url" : $("#twitter-url").text() < 5 ? String(window.location.href) : $("#twitter-url").text()
                     }
                 };
                 return values;
            };
            /**
             * Generates social media links and returns HTML, including links.
             *
             * @param ref (object)
             *  - the parent element
             *
             * @param val (array)
             *  - an array of supported social media networks and their values
             *
             * @param key (string)
             *  - the amount of time (in ms) the transition should occupy
             */
            var generateLink = function (ref,val,key) {
                var link = "";
                if(key == "email") { 
                    return "<a href='"+val['url']+"' class='acpd-smb email-button' target='_blank'></a>";
                }
                else if (ref.find((".acpd-"+key+"-share-button-fields")).length) {
                    for (var i in val) {
                        link += i == "shareprefix" ? val[i] : i+"="+(encodeURIComponent(val[i])).replace(/'/g, "%27")+"&";
                    }
                    return "<a href='"+link.substr(0,(link.length-1))+"' class='acpd-smb "+key+"-button' target='_blank'></a>";
                }
                else return "";
            };
            /**
             * Generates HTML
             *
             * @param ref (object)
             *  - the parent element
             *
             * @param val (array)
             *  - an array of supported social media networks and their values
             */
            var generateHTML = function(ref,val) {
                var links = "";
                for (var i in val) {
                    links += generateLink(ref,val[i],i);
                }
                return "<div class='social-buttons'>"+links+"</div>";
            };
            /**
             * Creates buttons on the page on page load
             */
            var createButtons = function() {
                $(".acpd-socialmedia-buttons").each(function() {
                    this.innerHTML = generateHTML($(this),getSocialValues());
                });
            };
            return {
                create: function() {
                    createButtons();
                }
            };
        })();
        ACPDSocialButtons.create(); // Create social media buttons 
        
        /**************** END SOCIAL MEDIA BUTTON JS ***************/
        
        
        
        
        /**************** ALLOW FULLSCREEN YOUTUBE VIDEO JS ***************/
        
        $('.allowfullscreen').each(function() {
            $(this).replaceWith('<iframe src="' + $(this).attr('src') + '" class="' + $(this).attr('class') + '" frameborder="' + $(this).attr('frameborder') + '" height="' + $(this).attr('height') + '" width="' + $(this).attr('width') + '" allowfullscreen></iframe>');
        });
        
        /************** END ALLOW FULLSCREEN YOUTUBE VIDEO JS *************/
        
        
        
        /******* OPEN ACCORDION AND MOVE TO TARGET ON PAGE LOAD JS ********/
        
        // Get querystring parameter
        
        function qs(key) {
            key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
            var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
            return match && decodeURIComponent(match[1].replace(/\+/g, " "));
        }
        
        // Return target ID
        
        function accordionTarget(querystringId) {
            return qs(querystringId) == null ? false : qs(querystringId);
        }
        
        // Auto-expand the accordion
        
        function accordionAutoExpand() {
            if (!(accordionTarget('acOpen'))) {
                console.log("nope");
                //return;
            }
            else {
                console.log(accordionTarget('acOpen'));
                $(this).find('#' + accordionTarget('acOpen')).each(function() {
                    $(this).parent('.acpd-accordion-collapse').css('display','list-item');
                    $(this).parent('.acpd-accordion-collapse').prev().addClass('acpd-accordion-open');
                    $(this).parent('.acpd-accordion-collapse').prev().removeClass('acpd-accordion-closed');
                });
            }
        }
        
        // Run the actual function
        
        accordionAutoExpand();
        
        /***** END OPEN ACCORDION AND MOVE TO TARGET ON PAGE LOAD JS ******/
        
        
        
        /************************** REDIRECT JS ***************************/
        
        function redirectCountdown(countDown,noticePopup) {
            
            var countDownTime = countDown/1000;
            
            window.setTimeout(function(){
               window.top.location = $('#redirectURL').val();
            }, countDown);
            
            if(noticePopup) {
            
                $('body > form').css('opacity','0.5');
                $('body').prepend('<div class="redirectPopupContainer" style="display: flex; width: 100%; height: 100%; position: fixed; top: 0; left: 0; align-items: center; justify-content: center; z-index: 99;"><div class="redirectPopup" style="display: flex; flex-direction: column; width: 400px; text-align: center; height: 200px; background: #fefefe; border: solid #ccc 4px; justify-content: center; font-size:16px;"><span>You will be redirected in <span id="countDown">' + countDownTime + '</span> seconds...</span><br><span>If you are not redirected, please <a href="' + $('#redirectURL').val() + '">click here</a>.</span></div></div>');

                var timer = setInterval(function(){
                  var timeLeft = --countDownTime;
                  document.getElementById("countDown").innerHTML = timeLeft;
                  if(timeLeft <= 0)
                    clearInterval(timer);
                },1000);
            }
        }
        
        if($('#redirectURL').length && $('#redirectURL').val().length) {
            
            var countDown;
            
            if($("#redirectURL").prop('classList').length) {
            
                var classes = $('#redirectURL').attr('class').split(' ');
                var delay;
                for (var i = 0; i < classes.length; i++) {
                    delay = /^delay\-(.+)/.exec(classes[i]);
                    countDown = (delay != null) ? (delay[1] * 1000) : null;
                }
            }
            
            if(countDown != null) {
                redirectCountdown(countDown,true);
            }
            else {
                window.top.location = $('#redirectURL').val();
            }
        }
        
        
        /************************ END REDIRECT JS *************************/
        
        /**************************** RELOAD JS ***************************/
        
        $(this).find('.resourceLoad').each(function(){
            if($(this).hasClass('script'))
                jQuery.getScript($(this).val(),function(){});
            if($(this).hasClass('style')) 
                $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', $(this).val()) );
        });
        
        /************************ END RELOAD JS ***************************/
        
    });
})(jQuery);





// ================================ GOOGLE ANALYTICS ==================================================


// Copyright 2012 Google Inc. All rights reserved.
(function(){

var data = {
"resource": {
  "version":"1",
  "macros":[],
  "tags":[],
  "predicates":[],
  "rules":[]
},
"runtime":[
[],[]
]};

var aa=function(a,b){function c(){}c.prototype=b.prototype;a.se=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.be=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var g=function(a,b){this.s=a;this.Oc=b};g.prototype.bd=function(){return this.s};g.prototype.getType=g.prototype.bd;g.prototype.getData=function(){return this.Oc};g.prototype.getData=g.prototype.getData;var ba=function(a){return"number"===typeof a&&0<=a&&isFinite(a)&&0===a%1||"string"===typeof a&&"-"!==a[0]&&a===""+parseInt(a,10)},ca=function(){this.da={};this.qa=!1};ca.prototype.get=function(a){return this.da["dust."+a]};ca.prototype.set=function(a,b){!this.qa&&(this.da["dust."+a]=b)};ca.prototype.has=function(a){return this.da.hasOwnProperty("dust."+a)};var da=function(a){var b=[],c;for(c in a.da)a.da.hasOwnProperty(c)&&b.push(c.substr(5));return b};
ca.prototype.remove=function(a){!this.qa&&delete this.da["dust."+a]};ca.prototype.D=function(){this.qa=!0};var u=function(a){this.fa=new ca;this.h=[];a=a||[];for(var b in a)a.hasOwnProperty(b)&&(ba(b)?this.h[Number(b)]=a[Number(b)]:this.fa.set(b,a[b]))};u.prototype.toString=function(){for(var a=[],b=0;b<this.h.length;b++){var c=this.h[b];null===c||void 0===c?a.push(""):a.push(c.toString())}return a.join(",")};u.prototype.set=function(a,b){if("length"==a){if(!ba(b))throw"RangeError: Length property must be a valid integer.";this.h.length=Number(b)}else ba(a)?this.h[Number(a)]=b:this.fa.set(a,b)};
u.prototype.set=u.prototype.set;u.prototype.get=function(a){return"length"==a?this.length():ba(a)?this.h[Number(a)]:this.fa.get(a)};u.prototype.get=u.prototype.get;u.prototype.length=function(){return this.h.length};u.prototype.M=function(){for(var a=da(this.fa),b=0;b<this.h.length;b++)a.push(b+"");return new u(a)};u.prototype.getKeys=u.prototype.M;u.prototype.remove=function(a){ba(a)?delete this.h[Number(a)]:this.fa.remove(a)};u.prototype.remove=u.prototype.remove;u.prototype.pop=function(){return this.h.pop()};
u.prototype.pop=u.prototype.pop;u.prototype.push=function(a){return this.h.push.apply(this.h,Array.prototype.slice.call(arguments))};u.prototype.push=u.prototype.push;u.prototype.shift=function(){return this.h.shift()};u.prototype.shift=u.prototype.shift;u.prototype.splice=function(a,b,c){return new u(this.h.splice.apply(this.h,arguments))};u.prototype.splice=u.prototype.splice;u.prototype.unshift=function(a){return this.h.unshift.apply(this.h,Array.prototype.slice.call(arguments))};
u.prototype.unshift=u.prototype.unshift;u.prototype.has=function(a){return ba(a)&&this.h.hasOwnProperty(a)||this.fa.has(a)};var ea=function(){function a(a,b){c[a]=b}function b(){c={}}var c={},d={add:a,reset:b,create:function(d){var e={add:a,request:function(a,b){return c[a]?c[a].apply(d,Array.prototype.slice.call(arguments,1)):!1},reset:b};e.add=e.add;e.request=e.request;e.reset=e.reset;return e}};d.add=d.add;d.reset=d.reset;return d};var fa=function(){function a(a,c){if(b[a]){if(b[a].Ea+c>b[a].max)throw Error("Quota exceeded");b[a].Ea+=c}}var b={},c=void 0,d=void 0,e={xd:function(a){c=a},Db:function(){c&&a(c,1)},yd:function(a){d=a},O:function(b){d&&a(d,b)},Od:function(a,c){b[a]=b[a]||{Ea:0};b[a].max=c},ad:function(a){return b[a]&&b[a].Ea||0},reset:function(){b={}},Ic:a};e.onFnConsume=e.xd;e.consumeFn=e.Db;e.onStorageConsume=e.yd;e.consumeStorage=e.O;e.setMax=e.Od;e.getConsumed=e.ad;e.reset=e.reset;e.consume=e.Ic;return e};var ha=function(a,b,c){this.F=a;this.U=b;this.T=c;this.h=new ca};ha.prototype.add=function(a,b){this.h.qa||(this.F.O(("string"===typeof a?a.length:1)+("string"===typeof b?b.length:1)),this.h.set(a,b))};ha.prototype.add=ha.prototype.add;ha.prototype.set=function(a,b){this.h.qa||(this.T&&this.T.has(a)?this.T.set(a,b):(this.F.O(("string"===typeof a?a.length:1)+("string"===typeof b?b.length:1)),this.h.set(a,b)))};ha.prototype.set=ha.prototype.set;
ha.prototype.get=function(a){return this.h.has(a)?this.h.get(a):this.T?this.T.get(a):void 0};ha.prototype.get=ha.prototype.get;ha.prototype.has=function(a){return!!this.h.has(a)||!(!this.T||!this.T.has(a))};ha.prototype.has=ha.prototype.has;ha.prototype.C=function(){return this.F};ha.prototype.D=function(){this.h.D()};var ia=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},ja=function(a,b){if(Array.prototype.indexOf){var c=a.indexOf(b);return"number"==typeof c?c:-1}for(var d=0;d<a.length;d++)if(a[d]===b)return d;return-1};var v=function(a,b){ca.call(this);this.Pb=a;this.Zc=b};aa(v,ca);var la=function(a,b){for(var c,d=0;d<b.length&&!(c=ka(a,b[d]),c instanceof g);d++);return c},ka=function(a,b){var c=a.get(String(b[0]));if(!(c&&c instanceof v))throw"Attempting to execute non-function "+b[0]+".";return c.i.apply(c,[a].concat(b.slice(1)))};v.prototype.toString=function(){return this.Pb};v.prototype.getName=function(){return this.Pb};v.prototype.getName=v.prototype.getName;v.prototype.M=function(){return new u(da(this))};
v.prototype.getKeys=v.prototype.M;v.prototype.i=function(a,b){var c,d={A:function(){return a},evaluate:function(b){var c=a;return ia(b)?ka(c,b):b},ma:function(b){return la(a,b)},C:function(){return a.C()},fe:function(){c||(c=a.U.create(d));return c}};a.C().Db();return this.Zc.apply(d,Array.prototype.slice.call(arguments,1))};v.prototype.invoke=v.prototype.i;var x=function(){ca.call(this)};aa(x,ca);x.prototype.M=function(){return new u(da(this))};x.prototype.getKeys=x.prototype.M;/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var na=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,oa=function(a){if(null==a)return String(a);var b=na.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},pa=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},qa=function(a){if(!a||"object"!=oa(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!pa(a,"constructor")&&!pa(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}for(var b in a);return void 0===
b||pa(a,b)},ra=function(a,b){var c=b||("array"==oa(a)?[]:{}),d;for(d in a)if(pa(a,d)){var e=a[d];"array"==oa(e)?("array"!=oa(c[d])&&(c[d]=[]),c[d]=ra(e,c[d])):qa(e)?(qa(c[d])||(c[d]={}),c[d]=ra(e,c[d])):c[d]=e}return c};var sa=function(a){if(a instanceof u){for(var b=[],c=a.length(),d=0;d<c;d++)a.has(d)&&(b[d]=sa(a.get(d)));return b}if(a instanceof x){for(var e={},f=a.M(),h=f.length(),k=0;k<h;k++)e[f.get(k)]=sa(a.get(f.get(k)));return e}return a instanceof v?function(){for(var b=Array.prototype.slice.call(arguments,0),c=0;c<b.length;c++)b[c]=ta(b[c]);var d=new ha(fa(),ea());return sa(a.i.apply(a,[d].concat(b)))}:a},ta=function(a){if(ia(a)){for(var b=[],c=0;c<a.length;c++)a.hasOwnProperty(c)&&(b[c]=ta(a[c]));return new u(b)}if(qa(a)){var d=
new x,e;for(e in a)a.hasOwnProperty(e)&&d.set(e,ta(a[e]));return d}if("function"===typeof a)return new v("",function(b){for(var c=Array.prototype.slice.call(arguments,0),d=0;d<c.length;d++)c[d]=sa(this.evaluate(c[d]));return ta(a.apply(a,c))});var f=typeof a;if(null===a||"string"===f||"number"===f||"boolean"===f)return a};var ua={control:function(a,b){return new g(a,this.evaluate(b))},fn:function(a,b,c){var d=this.A(),e=this.evaluate(b);if(!(e instanceof u))throw"Error: non-List value given for Fn argument names.";var f=Array.prototype.slice.call(arguments,2);this.C().O(a.length+f.length);return new v(a,function(){return function(a){for(var b=new ha(d.F,d.U,d),c=Array.prototype.slice.call(arguments,0),h=0;h<c.length;h++)if(c[h]=this.evaluate(c[h]),c[h]instanceof g)return c[h];for(var n=e.get("length"),p=0;p<n;p++)p<
c.length?b.set(e.get(p),c[p]):b.set(e.get(p),void 0);b.set("arguments",new u(c));var q=la(b,f);if(q instanceof g)return"return"===q.s?q.getData():q}}())},list:function(a){var b=this.C();b.O(arguments.length);for(var c=new u,d=0;d<arguments.length;d++){var e=this.evaluate(arguments[d]);"string"===typeof e&&b.O(e.length?e.length-1:0);c.push(e)}return c},map:function(a){for(var b=this.C(),c=new x,d=0;d<arguments.length-1;d+=2){var e=this.evaluate(arguments[d])+"",f=this.evaluate(arguments[d+1]),h=e.length;
h+="string"===typeof f?f.length:1;b.O(h);c.set(e,f)}return c},undefined:function(){}};var y=function(){this.F=fa();this.U=ea();this.na=new ha(this.F,this.U)};y.prototype.N=function(a,b){var c=new v(a,b);c.D();this.na.set(a,c)};y.prototype.addInstruction=y.prototype.N;y.prototype.Cb=function(a,b){ua.hasOwnProperty(a)&&this.N(b||a,ua[a])};y.prototype.addNativeInstruction=y.prototype.Cb;y.prototype.C=function(){return this.F};y.prototype.getQuota=y.prototype.C;y.prototype.Ka=function(){this.F=fa();this.na.F=this.F};y.prototype.resetQuota=y.prototype.Ka;
y.prototype.Kd=function(){this.U=ea();this.na.U=this.U};y.prototype.resetPermissions=y.prototype.Kd;y.prototype.K=function(a,b){var c=Array.prototype.slice.call(arguments,0);return this.ib(c)};y.prototype.execute=y.prototype.K;y.prototype.ib=function(a){for(var b,c=0;c<arguments.length;c++){var d=ka(this.na,arguments[c]);b=d instanceof g||d instanceof v||d instanceof u||d instanceof x||null===d||void 0===d||"string"===typeof d||"number"===typeof d||"boolean"===typeof d?d:void 0}return b};
y.prototype.run=y.prototype.ib;y.prototype.D=function(){this.na.D()};y.prototype.makeImmutable=y.prototype.D;var va=function(a){for(var b=[],c=0;c<a.length();c++)a.has(c)&&(b[c]=a.get(c));return b};var wa={Rd:"concat every filter forEach hasOwnProperty indexOf join lastIndexOf map pop push reduce reduceRight reverse shift slice some sort splice unshift toString".split(" "),concat:function(a,b){for(var c=[],d=0;d<this.length();d++)c.push(this.get(d));for(d=1;d<arguments.length;d++)if(arguments[d]instanceof u)for(var e=arguments[d],f=0;f<e.length();f++)c.push(e.get(f));else c.push(arguments[d]);return new u(c)},every:function(a,b){for(var c=this.length(),d=0;d<this.length()&&d<c;d++)if(this.has(d)&&
!b.i(a,this.get(d),d,this))return!1;return!0},filter:function(a,b){for(var c=this.length(),d=[],e=0;e<this.length()&&e<c;e++)this.has(e)&&b.i(a,this.get(e),e,this)&&d.push(this.get(e));return new u(d)},forEach:function(a,b){for(var c=this.length(),d=0;d<this.length()&&d<c;d++)this.has(d)&&b.i(a,this.get(d),d,this)},hasOwnProperty:function(a,b){return this.has(b)},indexOf:function(a,b,c){var d=this.length(),e=void 0===c?0:Number(c);0>e&&(e=Math.max(d+e,0));for(var f=e;f<d;f++)if(this.has(f)&&this.get(f)===
b)return f;return-1},join:function(a,b){for(var c=[],d=0;d<this.length();d++)c.push(this.get(d));return c.join(b)},lastIndexOf:function(a,b,c){var d=this.length(),e=d-1;void 0!==c&&(e=0>c?d+c:Math.min(c,e));for(var f=e;0<=f;f--)if(this.has(f)&&this.get(f)===b)return f;return-1},map:function(a,b){for(var c=this.length(),d=[],e=0;e<this.length()&&e<c;e++)this.has(e)&&(d[e]=b.i(a,this.get(e),e,this));return new u(d)},pop:function(){return this.pop()},push:function(a,b){return this.push.apply(this,Array.prototype.slice.call(arguments,
1))},reduce:function(a,b,c){var d=this.length(),e,f;if(void 0!==c)e=c,f=0;else{if(0==d)throw"TypeError: Reduce on List with no elements.";for(var h=0;h<d;h++)if(this.has(h)){e=this.get(h);f=h+1;break}if(h==d)throw"TypeError: Reduce on List with no elements.";}for(h=f;h<d;h++)this.has(h)&&(e=b.i(a,e,this.get(h),h,this));return e},reduceRight:function(a,b,c){var d=this.length(),e,f;if(void 0!==c)e=c,f=d-1;else{if(0==d)throw"TypeError: ReduceRight on List with no elements.";for(var h=1;h<=d;h++)if(this.has(d-
h)){e=this.get(d-h);f=d-(h+1);break}if(h>d)throw"TypeError: ReduceRight on List with no elements.";}for(h=f;0<=h;h--)this.has(h)&&(e=b.i(a,e,this.get(h),h,this));return e},reverse:function(){for(var a=va(this),b=a.length-1,c=0;0<=b;b--,c++)a.hasOwnProperty(b)?this.set(c,a[b]):this.remove(c);return this},shift:function(){return this.shift()},slice:function(a,b,c){var d=this.length();void 0===b&&(b=0);b=0>b?Math.max(d+b,0):Math.min(b,d);c=void 0===c?d:0>c?Math.max(d+c,0):Math.min(c,d);c=Math.max(b,
c);for(var e=[],f=b;f<c;f++)e.push(this.get(f));return new u(e)},some:function(a,b){for(var c=this.length(),d=0;d<this.length()&&d<c;d++)if(this.has(d)&&b.i(a,this.get(d),d,this))return!0;return!1},sort:function(a,b){var c=va(this);void 0===b?c.sort():c.sort(function(c,d){return Number(b.i(a,c,d))});for(var d=0;d<c.length;d++)c.hasOwnProperty(d)?this.set(d,c[d]):this.remove(d)},splice:function(a,b,c,d){return this.splice.apply(this,Array.prototype.splice.call(arguments,1,arguments.length-1))},toString:function(){return this.toString()},
unshift:function(a,b){return this.unshift.apply(this,Array.prototype.slice.call(arguments,1))}};var z={Nb:{ADD:0,AND:1,APPLY:2,ASSIGN:3,BREAK:4,CASE:5,CONTINUE:6,CONTROL:49,CREATE_ARRAY:7,CREATE_OBJECT:8,DEFAULT:9,DEFN:50,DIVIDE:10,DO:11,EQUALS:12,EXPRESSION_LIST:13,FN:51,FOR:14,FOR_IN:47,GET:15,GET_CONTAINER_VARIABLE:48,GET_INDEX:16,GET_PROPERTY:17,GREATER_THAN:18,GREATER_THAN_EQUALS:19,IDENTITY_EQUALS:20,IDENTITY_NOT_EQUALS:21,IF:22,LESS_THAN:23,LESS_THAN_EQUALS:24,MODULUS:25,MULTIPLY:26,NEGATE:27,NOT:28,NOT_EQUALS:29,NULL:45,OR:30,PLUS_EQUALS:31,POST_DECREMENT:32,POST_INCREMENT:33,PRE_DECREMENT:34,
PRE_INCREMENT:35,QUOTE:46,RETURN:36,SET_PROPERTY:43,SUBTRACT:37,SWITCH:38,TERNARY:39,TYPEOF:40,UNDEFINED:44,VAR:41,WHILE:42}},xa="charAt concat indexOf lastIndexOf match replace search slice split substring toLowerCase toLocaleLowerCase toString toUpperCase toLocaleUpperCase trim".split(" "),ya=new g("break"),Aa=new g("continue");z.add=function(a,b){return this.evaluate(a)+this.evaluate(b)};z.and=function(a,b){return this.evaluate(a)&&this.evaluate(b)};
z.apply=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);if(!(c instanceof u))throw"Error: Non-List argument given to Apply instruction.";if(null===a||void 0===a)throw"TypeError: Can't read property "+b+" of "+a+".";if("boolean"==typeof a||"number"==typeof a){if("toString"==b)return a.toString();throw"TypeError: "+a+"."+b+" is not a function.";}if("string"==typeof a){if(0<=ja(xa,b))return ta(a[b].apply(a,va(c)));throw"TypeError: "+b+" is not a function";}if(a instanceof u){if(a.has(b)){var d=
a.get(b);if(d instanceof v){var e=va(c);e.unshift(this.A());return d.i.apply(d,e)}throw"TypeError: "+b+" is not a function";}if(0<=ja(wa.Rd,b))return e=va(c),e.unshift(this.A()),wa[b].apply(a,e)}if(a instanceof v||a instanceof x){if(a.has(b)){d=a.get(b);if(d instanceof v)return e=va(c),e.unshift(this.A()),d.i.apply(d,e);throw"TypeError: "+b+" is not a function";}if("toString"==b)return a instanceof v?a.getName():a.toString();if("hasOwnProperty"==b)return a.has.apply(a,va(c))}throw"TypeError: Object has no '"+
b+"' property.";};z.assign=function(a,b){a=this.evaluate(a);if("string"!=typeof a)throw"Invalid key name given for assignment.";var c=this.A();if(!c.has(a))throw"Attempting to assign to undefined value "+b;var d=this.evaluate(b);c.set(a,d);return d};z["break"]=function(){return ya};z["case"]=function(a){for(var b=this.evaluate(a),c=0;c<b.length;c++){var d=this.evaluate(b[c]);if(d instanceof g)return d}};z["continue"]=function(){return Aa};
z.Pc=function(a,b,c){var d=new u;b=this.evaluate(b);for(var e=0;e<b.length;e++)d.push(b[e]);var f=[z.Nb.FN,a,d].concat(Array.prototype.splice.call(arguments,2,arguments.length-2));this.A().set(a,this.evaluate(f))};z.Sc=function(a,b){return this.evaluate(a)/this.evaluate(b)};z.Vc=function(a,b){return this.evaluate(a)==this.evaluate(b)};z.Xc=function(a){for(var b,c=0;c<arguments.length;c++)b=this.evaluate(arguments[c]);return b};
z.$c=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);var d=this.A();if("string"==typeof b)for(var e=0;e<b.length;e++){d.set(a,e);var f=this.ma(c);if(f instanceof g){if("break"==f.s)break;if("return"==f.s)return f}}else if(b instanceof x||b instanceof u||b instanceof v){var h=b.M(),k=h.length();for(e=0;e<k;e++)if(d.set(a,h.get(e)),f=this.ma(c),f instanceof g){if("break"==f.s)break;if("return"==f.s)return f}}};z.get=function(a){return this.A().get(this.evaluate(a))};
z.Lb=function(a,b){var c;a=this.evaluate(a);b=this.evaluate(b);if(void 0===a||null===a)throw"TypeError: cannot access property of "+a+".";a instanceof x||a instanceof u||a instanceof v?c=a.get(b):"string"==typeof a&&("length"==b?c=a.length:ba(b)&&(c=a[b]));return c};z.cd=function(a,b){return this.evaluate(a)>this.evaluate(b)};z.dd=function(a,b){return this.evaluate(a)>=this.evaluate(b)};z.hd=function(a,b){return this.evaluate(a)===this.evaluate(b)};z.jd=function(a,b){return this.evaluate(a)!==this.evaluate(b)};
z["if"]=function(a,b,c){var d=[];this.evaluate(a)?d=this.evaluate(b):c&&(d=this.evaluate(c));var e=this.ma(d);if(e instanceof g)return e};z.qd=function(a,b){return this.evaluate(a)<this.evaluate(b)};z.rd=function(a,b){return this.evaluate(a)<=this.evaluate(b)};z.sd=function(a,b){return this.evaluate(a)%this.evaluate(b)};z.multiply=function(a,b){return this.evaluate(a)*this.evaluate(b)};z.td=function(a){return-this.evaluate(a)};z.ud=function(a){return!this.evaluate(a)};
z.vd=function(a,b){return this.evaluate(a)!=this.evaluate(b)};z["null"]=function(){return null};z.or=function(a,b){return this.evaluate(a)||this.evaluate(b)};z.Vb=function(a,b){var c=this.evaluate(a);this.evaluate(b);return c};z.Wb=function(a){return this.evaluate(a)};z.quote=function(a){return Array.prototype.slice.apply(arguments)};z["return"]=function(a){return new g("return",this.evaluate(a))};
z.setProperty=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);if(null===a||void 0===a)throw"TypeError: Can't set property "+b+" of "+a+".";(a instanceof v||a instanceof u||a instanceof x)&&a.set(b,c);return c};z.Qd=function(a,b){return this.evaluate(a)-this.evaluate(b)};
z["switch"]=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);if(!ia(b)||!ia(c))throw"Error: Malformed switch instruction.";for(var d,e=!1,f=0;f<b.length;f++)if(e||a===this.evaluate(b[f]))if(d=this.evaluate(c[f]),d instanceof g){var h=d.s;if("break"==h)return;if("return"==h||"continue"==h)return d}else e=!0;if(c.length==b.length+1&&(d=this.evaluate(c[c.length-1]),d instanceof g&&("return"==d.s||"continue"==d.s)))return d};
z.Sd=function(a,b,c){return this.evaluate(a)?this.evaluate(b):this.evaluate(c)};z["typeof"]=function(a){a=this.evaluate(a);return a instanceof v?"function":typeof a};z.undefined=function(){};z["var"]=function(a){for(var b=this.A(),c=0;c<arguments.length;c++){var d=arguments[c];"string"!=typeof d||b.add(d,void 0)}};
z["while"]=function(a,b,c,d){var e,f=this.evaluate(d);if(this.evaluate(c)&&(e=this.ma(f),e instanceof g)){if("break"==e.s)return;if("return"==e.s)return e}for(;this.evaluate(a);){e=this.ma(f);if(e instanceof g){if("break"==e.s)break;if("return"==e.s)return e}this.evaluate(b)}};var Ca=function(){this.Mb=!1;this.P=new y;Ba(this);this.Mb=!0};Ca.prototype.od=function(){return this.Mb};Ca.prototype.isInitialized=Ca.prototype.od;Ca.prototype.K=function(a){return this.P.ib(a)};Ca.prototype.execute=Ca.prototype.K;Ca.prototype.D=function(){this.P.D()};Ca.prototype.makeImmutable=Ca.prototype.D;
var Ba=function(a){function b(a,b){e.P.Cb(a,String(b))}function c(a,b){e.P.N(String(d[a]),b)}var d=z.Nb,e=a;b("control",d.CONTROL);b("fn",d.FN);b("list",d.CREATE_ARRAY);b("map",d.CREATE_OBJECT);b("undefined",d.UNDEFINED);c("ADD",z.add);c("AND",z.and);c("APPLY",z.apply);c("ASSIGN",z.assign);c("BREAK",z["break"]);c("CASE",z["case"]);c("CONTINUE",z["continue"]);c("DEFAULT",z["case"]);c("DEFN",z.Pc);c("DIVIDE",z.Sc);c("EQUALS",z.Vc);c("EXPRESSION_LIST",z.Xc);c("FOR_IN",z.$c);c("GET",z.get);c("GET_INDEX",
z.Lb);c("GET_PROPERTY",z.Lb);c("GREATER_THAN",z.cd);c("GREATER_THAN_EQUALS",z.dd);c("IDENTITY_EQUALS",z.hd);c("IDENTITY_NOT_EQUALS",z.jd);c("IF",z["if"]);c("LESS_THAN",z.qd);c("LESS_THAN_EQUALS",z.rd);c("MODULUS",z.sd);c("MULTIPLY",z.multiply);c("NEGATE",z.td);c("NOT",z.ud);c("NOT_EQUALS",z.vd);c("NULL",z["null"]);c("OR",z.or);c("POST_DECREMENT",z.Vb);c("POST_INCREMENT",z.Vb);c("PRE_DECREMENT",z.Wb);c("PRE_INCREMENT",z.Wb);c("QUOTE",z.quote);c("RETURN",z["return"]);c("SET_PROPERTY",z.setProperty);
c("SUBTRACT",z.Qd);c("SWITCH",z["switch"]);c("TERNARY",z.Sd);c("TYPEOF",z["typeof"]);c("VAR",z["var"]);c("WHILE",z["while"])};Ca.prototype.N=function(a,b){this.P.N(a,b)};Ca.prototype.addInstruction=Ca.prototype.N;Ca.prototype.C=function(){return this.P.C()};Ca.prototype.getQuota=Ca.prototype.C;Ca.prototype.Ka=function(){this.P.Ka()};Ca.prototype.resetQuota=Ca.prototype.Ka;var Da=function(){this.Ha={}};Da.prototype.get=function(a){return this.Ha.hasOwnProperty(a)?this.Ha[a]:void 0};Da.prototype.add=function(a,b){if(this.Ha.hasOwnProperty(a))throw"Attempting to add a function which already exists: "+a+".";var c=new v(a,function(){for(var a=Array.prototype.slice.call(arguments,0),c=0;c<a.length;c++)a[c]=this.evaluate(a[c]);return b.apply(this,a)});c.D();this.Ha[a]=c};Da.prototype.addAll=function(a){for(var b in a)a.hasOwnProperty(b)&&this.add(b,a[b])};var B=window,C=document,Ea=navigator,Fa=function(a,b){var c=B[a];B[a]=void 0===c?b:c;return B[a]},Ga=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},F=function(a,b,c){var d=C.createElement("script");d.type="text/javascript";d.async=!0;d.src=a;Ga(d,b);c&&(d.onerror=c);var e=C.getElementsByTagName("script")[0]||C.body||C.head;e.parentNode.insertBefore(d,e);return d},Ha=function(a,b){var c=C.createElement("iframe");
c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var d=C.body&&C.body.lastChild||C.body||C.head;d.parentNode.insertBefore(c,d);Ga(c,b);void 0!==a&&(c.src=a);return c},J=function(a,b,c){var d=new Image(1,1);d.onload=function(){d.onload=null;b&&b()};d.onerror=function(){d.onerror=null;c&&c()};d.src=a},Ia=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},Ja=function(a,b,c){a.removeEventListener?a.removeEventListener(b,
c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},P=function(a){B.setTimeout(a,0)},La=function(a){var b=C.getElementById(a);if(b&&Ka(b,"id")!=a)for(var c=1;c<document.all[a].length;c++)if(Ka(document.all[a][c],"id")==a)return document.all[a][c];return b},Ka=function(a,b){return a&&b&&a.attributes&&a.attributes[b]?a.attributes[b].value:null},Ma=function(a){var b=a.innerText||a.textContent||"";b&&" "!=b&&(b=b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));b&&(b=b.replace(/(\xa0+|\s{2,}|\n|\r\t)/g," "));return b},
Na=function(a){var b=C.createElement("div");b.innerHTML="A<div>"+a+"</div>";b=b.lastChild;for(var c=[];b.firstChild;)c.push(b.removeChild(b.firstChild));return c};var Oa=function(a,b){for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d].split("=");if(decodeURIComponent(e[0]).replace(/\+/g," ")==b)return decodeURIComponent(e.slice(1).join("=")).replace(/\+/g," ")}},Q=function(a,b,c,d,e){var f,h=a.protocol||B.location.protocol;h=h.replace(":","").toLowerCase();b&&(b=String(b).toLowerCase());switch(b){case "protocol":f=h;break;case "host":f=(a.hostname||B.location.hostname).split(":")[0].toLowerCase();if(c){var k=/^www\d*\./.exec(f);k&&k[0]&&(f=f.substr(k[0].length))}break;
case "port":f=String(1*(a.hostname?a.port:B.location.port)||("http"==h?80:"https"==h?443:""));break;case "path":f="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname;var l=f.split("/");0<=ja(d||[],l[l.length-1])&&(l[l.length-1]="");f=l.join("/");break;case "query":f=a.search.replace("?","");e&&(f=Oa(f,e));break;case "fragment":f=a.hash.replace("#","");break;default:f=a&&a.href}return f},Pa=function(a){var b="";a&&a.href&&(b=a.hash?a.href.replace(a.hash,""):a.href);return b},R=function(a){var b=
C.createElement("a");a&&(b.href=a);return b};var Sa=function(){this.Ub=new Ca;var a=new Da;a.addAll(Qa());Ra(this,function(b){return a.get(b)})},Qa=function(){return{callInWindow:Ta,getCurrentUrl:Ua,getInWindow:Va,getReferrer:Wa,getUrlComponent:Xa,getUrlFragment:Ya,isPlainObject:Za,loadIframe:ab,loadJavaScript:bb,removeUrlFragment:cb,replaceAll:db,sendTrackingBeacon:eb,setInWindow:fb}};Sa.prototype.K=function(a){return this.Ub.K(a)};Sa.prototype.execute=Sa.prototype.K;var Ra=function(a,b){a.Ub.N("require",b)};
function Ta(a,b){for(var c=a.split("."),d=B,e=d[c[0]],f=1;e&&f<c.length;f++)d=e,e=e[c[f]];if("function"==oa(e)){var h=[];for(f=1;f<arguments.length;f++)h.push(sa(arguments[f]));e.apply(d,h)}}function Ua(){return B.location.href}function Va(a,b,c){for(var d=a.split("."),e=B,f=0;f<d.length-1;f++)if(e=e[d[f]],void 0===e||null===e)return;b&&(void 0===e[d[f]]||c&&!e[d[f]])&&(e[d[f]]=sa(b));return ta(e[d[f]])}function Wa(){return C.referrer}
function Xa(a,b,c,d,e){var f;if(d&&d instanceof u){f=[];for(var h=0;h<d.length();h++){var k=d.get(h);"string"==typeof k&&f.push(k)}}return Q(R(a),b,c,f,e)}function Ya(a){return Q(R(a),"fragment")}function Za(a){return a instanceof x}function ab(a,b){var c=this.A();Ha(a,function(){b instanceof v&&b.i(c)})}var ib={};
function bb(a,b,c,d){var e=this.A(),f=function(){b instanceof v&&b.i(e)},h=function(){c instanceof v&&c.i(e)};d?ib[d]?(ib[d].onSuccess.push(f),ib[d].onFailure.push(h)):(ib[d]={onSuccess:[f],onFailure:[h]},f=function(){for(var a=ib[d].onSuccess,b=0;b<a.length;b++)P(a[b]);a.push=function(a){P(a);return 0}},h=function(){for(var a=ib[d].onFailure,b=0;b<a.length;b++)P(a[b]);ib[d]=null},F(a,f,h)):F(a,f,h)}function cb(a){return Pa(R(a))}function db(a,b,c){return a.replace(new RegExp(b,"g"),c)}
function eb(a,b,c){var d=this.A();J(a,function(){b instanceof v&&b.i(d)},function(){c instanceof v&&c.i(d)})}function fb(a,b,c){for(var d=a.split("."),e=B,f=0;f<d.length-1;f++)if(e=e[d[f]],void 0===e)return!1;return void 0===e[d[f]]||c?(e[d[f]]=sa(b),!0):!1};var Fb,Gb=[],Hb=[],Ib=[],Jb=[],Kb=[],Lb={},Mb,Nb,Ob,Pb=function(a){var b=a["function"];if(!b)throw"Error: No function name given for function call.";if(Lb[b]){var c={},d;for(d in a)a.hasOwnProperty(d)&&0===d.indexOf("vtp_")&&(c[d]=a[d]);return Lb[b](c)}var e=new x,f;for(f in a)a.hasOwnProperty(f)&&0===f.indexOf("vtp_")&&e.set(f.substr(4),ta(a[f]));var h=Fb([b,e]);h instanceof g&&"return"===h.s&&(h=h.getData());return sa(h)},Vb=function(a,b,c){c=c||[];var d={},e;for(e in a)a.hasOwnProperty(e)&&(d[e]=
Ub(a[e],b,c));return d},Ub=function(a,b,c){if(ia(a)){var d;switch(a[0]){case "function_id":return a[1];case "list":d=[];for(var e=1;e<a.length;e++)d.push(Ub(a[e],b,c));return d;case "macro":var f=a[1];if(c[f])return;var h=Gb[f];if(!h||b(h))return;c[f]=!0;try{var k=Vb(h,b,c);d=Pb(k);Ob&&(d=Ob.Kc(d,k))}catch(w){d=!1}c[f]=!1;return d;case "map":d={};for(var l=1;l<a.length;l+=2)d[Ub(a[l],b,c)]=Ub(a[l+1],b,c);return d;case "template":d=[];for(var m=!1,n=1;n<a.length;n++){var p=Ub(a[n],b,c);Nb&&(m=m||p===
Nb.ya);d.push(p)}return Nb&&m?Nb.Lc(d):d.join("");case "escape":d=Ub(a[1],b,c);if(Nb&&ia(a[1])&&"macro"===a[1][0]&&Nb.pd(a))return Nb.Cd(d);d=String(d);for(var q=2;q<a.length;q++)jb[a[q]]&&(d=jb[a[q]](d));return d;case "tag":var t=a[1];if(!Jb[t])throw Error("Unable to resolve tag reference "+t+".");return d={Ib:a[2],index:t};case "zb":var r=Wb({"function":a[1],arg0:a[2],arg1:a[3],ignore_case:a[5]},b,c);a[4]&&(r=!r);return r;default:throw Error("Attempting to expand unknown Value type: "+a[0]+".");
}}return a},Wb=function(a,b,c){try{return Mb(Vb(a,b,c))}catch(d){JSON.stringify(a)}return null};var Xb=null,$b=function(a){function b(a){for(var b=0;b<a.length;b++)d[a[b]]=!0}var c=[],d=[];Xb=Yb(a);for(var e=0;e<Hb.length;e++){var f=Hb[e],h=Zb(f);if(h){for(var k=f.add||[],l=0;l<k.length;l++)c[k[l]]=!0;b(f.block||[])}else null===h&&b(f.block||[])}var m=[];for(e=0;e<Jb.length;e++)c[e]&&!d[e]&&(m[e]=!0);return m},Zb=function(a){for(var b=a["if"]||[],c=0;c<b.length;c++){var d=Xb(b[c]);if(!d)return null===d?null:!1}var e=a.unless||[];for(c=0;c<e.length;c++){d=Xb(e[c]);if(null===d)return null;if(d)return!1}return!0};
var Yb=function(a){var b=[];return function(c){void 0===b[c]&&(b[c]=Wb(Ib[c],a));return b[c]}};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */
var cc={},dc=null;cc.m="UA-114042921-1";var ec=null,fc="//www.googletagmanager.com/a?id="+cc.m+"&cv=1",gc={},hc={};var ic=function(){},jc=function(a){return"function"==typeof a},kc=function(a){return"string"==oa(a)},lc=function(a){return"number"==oa(a)&&!isNaN(a)},mc=function(a){return Math.round(Number(a))||0},nc=function(a){return"false"==String(a).toLowerCase()?!1:!!a},oc=function(a){var b=[];if(ia(a))for(var c=0;c<a.length;c++)b.push(String(a[c]));return b},pc=function(a){return a?a.replace(/^\s+|\s+$/g,""):""},qc=function(a,b){if(!lc(a)||!lc(b)||a>b)a=0,b=2147483647;return Math.floor(Math.random()*(b-a+1)+
a)},rc=function(){this.prefix="gtm.";this.values={}};rc.prototype.set=function(a,b){this.values[this.prefix+a]=b};rc.prototype.get=function(a){return this.values[this.prefix+a]};rc.prototype.contains=function(a){return void 0!==this.get(a)};var sc=function(){var a=dc.sequence||0;dc.sequence=a+1;return a},tc=function(a,b,c){return a&&a.hasOwnProperty(b)?a[b]:c},uc=function(a){var b=!1;return function(){if(!b)try{a()}catch(c){}b=!0}};var S=function(){var a=function(a){return{toString:function(){return a}}};return{rb:a("convert_case_to"),sb:a("convert_false_to"),tb:a("convert_null_to"),ub:a("convert_true_to"),vb:a("convert_undefined_to"),I:a("function"),bc:a("instance_name"),cc:a("live_only"),ec:a("malware_disabled"),fc:a("once_per_event"),xb:a("once_per_load"),yb:a("setup_tags"),gc:a("tag_id"),zb:a("teardown_tags")}}();var vc=new rc,wc={},zc={set:function(a,b){ra(xc(a,b),wc)},get:function(a){return yc(a,2)},reset:function(){vc=new rc;wc={}}},yc=function(a,b){return 2!=b?vc.get(a):Ac(a)},Ac=function(a,b,c){var d=a.split(".");var e=function(a,b){for(var c=0;void 0!==a&&c<d.length;c++){if(null===a)return!1;a=a[d[c]]}return void 0!==a||1<c?a:b.length?e(Bc(b.pop()),b):Cc(d)};return e(wc.eventModel,[b,c]);return Cc(d)},Cc=function(a){for(var b=wc,c=0;c<a.length;c++){if(null===
b)return!1;if(void 0===b)break;b=b[a[c]]}return b};var Bc=function(a){if(a){var b=Cc(["gtag","targets",a]);return qa(b)?b:void 0}},Dc=function(a,b){function c(a){if(a)for(var b in a)a.hasOwnProperty(b)&&(d[b]=null)}var d={};c(wc);delete d.eventModel;c(Bc(a));c(Bc(b));c(wc.eventModel);var e=[],f;for(f in d)d.hasOwnProperty(f)&&e.push(f);return e};
var Ec=function(a,b){vc.set(a,b);ra(xc(a,b),wc)},xc=function(a,b){for(var c={},d=c,e=a.split("."),f=0;f<e.length-1;f++)d=d[e[f]]={};d[e[e.length-1]]=b;return c};var Hc=new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),Ic={customPixels:["nonGooglePixels"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},Jc={customPixels:["customScripts","html"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels",
"customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},Kc=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]),c.push.apply(c,b[a[d]]||[]);return c};
var Lc=function(a){var b=yc("gtm.whitelist");b="gtagaw gtagfl gtaggf gtagua et e oid op v cn css eq ew ge gt lc le lt re sw um".split(" ");var c=b&&Kc(oc(b),
Ic),d=yc("gtm.blacklist")||yc("tagTypeBlacklist")||[];Hc.test(B.location&&B.location.hostname)&&(d=oc(d),d.push("nonGooglePixels","nonGoogleScripts"));var e=d&&Kc(oc(d),Jc),f={};return function(h){var k=h&&h[S.I];if(!k||"string"!=typeof k)return!0;k=k.replace(/_/g,"");if(void 0!==f[k])return f[k];var l=hc[k]||[],m=a(k);if(b){var n;if(n=m)a:{if(0>ja(c,k))if(l&&0<l.length)for(var p=
0;p<l.length;p++){if(0>ja(c,l[p])){n=!1;break a}}else{n=!1;break a}n=!0}m=n}var q=!1;if(d){var t;if(!(t=0<=ja(e,k)))a:{for(var r=l||[],w=new rc,E=0;E<e.length;E++)w.set(e[E],!0);for(E=0;E<r.length;E++)if(w.get(r[E])){t=!0;break a}t=!1}q=t}return f[k]=!m||q}};var Mc={Kc:function(a,b){b[S.rb]&&"string"===typeof a&&(a=1==b[S.rb]?a.toLowerCase():a.toUpperCase());b.hasOwnProperty(S.tb)&&null===a&&(a=b[S.tb]);b.hasOwnProperty(S.vb)&&void 0===a&&(a=b[S.vb]);b.hasOwnProperty(S.ub)&&!0===a&&(a=b[S.ub]);b.hasOwnProperty(S.sb)&&!1===a&&(a=b[S.sb]);return a}};var Nc=function(a){var b=dc.zones;!b&&a&&(b=dc.zones=a());return b},Oc={active:!0,isWhitelisted:function(){return!0}};var Pc=!1,Qc=0,Rc=[];function Sc(a){if(!Pc){var b=C.createEventObject,c="complete"==C.readyState,d="interactive"==C.readyState;if(!a||"readystatechange"!=a.type||c||!b&&d){Pc=!0;for(var e=0;e<Rc.length;e++)P(Rc[e])}Rc.push=function(){for(var a=0;a<arguments.length;a++)P(arguments[a]);return 0}}}function Tc(){if(!Pc&&140>Qc){Qc++;try{C.documentElement.doScroll("left"),Sc()}catch(a){B.setTimeout(Tc,50)}}}var Uc=function(a){Pc?a():Rc.push(a)};var Vc=!1,Wc=function(){return B.GoogleAnalyticsObject&&B[B.GoogleAnalyticsObject]};var Xc=function(a){B.GoogleAnalyticsObject||(B.GoogleAnalyticsObject=a||"ga");var b=B.GoogleAnalyticsObject;if(!B[b]){var c=function(){c.q=c.q||[];c.q.push(arguments)};c.l=Number(new Date);B[b]=c}return B[b]},Yc=function(a,b,c,d){b=String(b).replace(/\s+/g,"").split(",");var e=Wc();e(a+"require","linker");e(a+"linker:autoLink",b,c,d)};
var bd=function(){return"&tc="+Jb.filter(function(a){return a}).length},cd="0.005000">Math.random(),dd="",ed=function(){dd=[fc,"&v=3&t=t","&pid="+qc(),"&rv=5o"].join("")},fd={},gd="",hd=void 0,id={},jd={},kd=void 0,ld=2,md=1E3,nd=function(){ld=2},od=function(){var a=hd;return void 0===a?"":[dd,fd[a]?"":"&es=1",id[a],bd(),gd,"&z=0"].join("")},pd=function(){kd&&(B.clearTimeout(kd),kd=void 0);void 0===hd||fd[hd]&&!gd||(jd[hd]||0>=ld--||0>=md--?jd[hd]=!0:(J(od()),fd[hd]=
!0,gd=""))},qd=function(a,b,c){if(cd&&!jd[a]&&b){a!==hd&&(pd(),hd=a);var d=c+String(b[S.I]||"").replace(/_/g,"");gd=gd?gd+"."+d:"&tr="+d;kd||(kd=B.setTimeout(pd,500));2022<=od().length&&pd()}};function rd(a,b,c,d,e,f){var h=Jb[a],k=sd(a,b,c,d,e,f);if(!k)return null;var l=Ub(h[S.yb],f.R,[]);if(l&&l.length){var m=l[0];k=rd(m.index,b,k,1===m.Ib?e:k,e,f)}return k}
function sd(a,b,c,d,e,f){function h(){var b=Vb(k,f.R);b.vtp_gtmOnSuccess=function(){qd(f.id,Jb[a],"5");c()};b.vtp_gtmOnFailure=function(){qd(f.id,Jb[a],"6");d()};b.vtp_gtmTagId=k.tag_id;if(k[S.ec])d();else{qd(f.id,k,"1");try{Pb(b)}catch(E){qd(f.id,
k,"7");e()}}}var k=Jb[a];if(f.R(k))return null;var l=Ub(k[S.zb],f.R,[]);if(l&&l.length){var m=l[0],n=rd(m.index,b,c,d,e,f);if(!n)return null;c=n;d=2===m.Ib?e:n}if(k[S.xb]||k[S.fc]){var p=k[S.xb]?Kb:b,q=c,t=d;if(!p[a]){h=uc(h);var r=td(a,p,h);c=r.H;d=r.S}return function(){p[a](q,t)}}return h}function td(a,b,c){var d=[],e=[];b[a]=ud(d,e,c);return{H:function(){b[a]=vd;for(var c=0;c<d.length;c++)d[c]()},S:function(){b[a]=wd;for(var c=0;c<e.length;c++)e[c]()}}}
function ud(a,b,c){return function(d,e){a.push(d);b.push(e);c()}}function vd(a){a()}function wd(a,b){b()};function xd(a){var b=0,c=0,d=!1;return{add:function(){c++;return uc(function(){b++;d&&b>=c&&a()})},rc:function(){d=!0;b>=c&&a()}}}function yd(a,b){if(!cd)return;var c=function(a){var d=b.R(Jb[a])?"3":"4",f=Ub(Jb[a][S.yb],b.R,[]);f&&f.length&&c(f[0].index);qd(b.id,Jb[a],d);var h=Ub(Jb[a][S.zb],b.R,[]);h&&h.length&&c(h[0].index)};c(a);}var zd=!1;var Ad=function(a,b){var c={};c[S.I]="__"+a;for(var d in b)b.hasOwnProperty(d)&&(c["vtp_"+d]=b[d]);for(d in void 0)(void 0).hasOwnProperty(d)&&(c[d]=(void 0)[d]);Jb.push(c);return Jb.length-1};var Bd=/[A-Z]+/,Cd=/\s/,Dd=function(a){if(kc(a)&&(a=a.trim(),!Cd.test(a))){var b=a.indexOf("-");if(!(0>b)){var c=a.substring(0,b);if(Bd.test(c)){for(var d=a.substring(b+1).split("/"),e=0;e<d.length;e++)if(!d[e])return;return{id:a,prefix:c,containerId:c+"-"+d[0],ca:d}}}}};var Ed=null,Fd={},Gd={},Hd;function Id(){Ed=Ed||!dc.gtagRegistered;dc.gtagRegistered=!0;return Ed}var Jd=function(a,b){var c={event:a};b&&(c.eventModel=ra(b,void 0),b.event_callback&&(c.eventCallback=b.event_callback),b.event_timeout&&(c.eventTimeout=b.event_timeout));return c};
function Kd(a){if(void 0===Gd[a.id]){var b;if("UA"==a.prefix)b=Ad("gtagua",{trackingId:a.id});else if("AW"==a.prefix)b=Ad("gtagaw",{conversionId:a});else if("DC"==a.prefix)b=Ad("gtagfl",{targetId:a.id});else if("GF"==a.prefix)b=Ad("gtaggf",{conversionId:a});else if("G"==a.prefix)b=Ad("get",{trackingId:a.id,isAutoTag:!0});else return;if(!Hd){var c={name:"send_to",dataLayerVersion:2},d={};d[S.I]="__v";for(var e in c)c.hasOwnProperty(e)&&(d["vtp_"+e]=c[e]);Gb.push(d);Hd=["macro",Gb.length-1]}var f={arg0:Hd,
arg1:a.id,ignore_case:!1};f[S.I]="_lc";Ib.push(f);var h={"if":[Ib.length-1],add:[b]};h["if"]&&(h.add||h.block)&&Hb.push(h);Gd[a.id]=b}}
var Md={event:function(a){var b=a[1];if(kc(b)&&!(3<a.length)){var c;if(2<a.length){if(!qa(a[2]))return;c=a[2]}var d=Jd(b,c);var e;var f=c,h=yc("gtag.fields.send_to",2);kc(h)||(h="send_to");var k=f&&f[h];void 0===k&&(k=yc(h,2),void 0===k&&(k="default"));if(kc(k)||ia(k)){for(var l,m=k.toString().replace(/\s+/g,"").split(","),n=[],p=0;p<m.length;p++)0<=m[p].indexOf("-")?n.push(m[p]):n=n.concat(Fd[m[p]]||[]);l=n;for(var q={},t=0;t<l.length;++t){var r=Dd(l[t]);r&&(q[r.id]=
r)}var w=[],E;for(E in q)if(q.hasOwnProperty(E)){var K=q[E];"AW"===K.prefix&&K.ca[1]&&w.push(K.containerId)}for(var A=0;A<w.length;++A)delete q[w[A]];var N=[],D;for(D in q)q.hasOwnProperty(D)&&N.push(q[D]);e=N}else e=void 0;if(!e)return;var O=Id();O||Ld();for(var I=[],L=0;O&&L<e.length;L++){var H=e[L];I.push(H.id);Kd(H)}d.eventModel=d.eventModel||{};0<e.length?d.eventModel.send_to=I.join():delete d.eventModel.send_to;return d}},set:function(a){var b;2==a.length&&qa(a[1])?
b=ra(a[1],void 0):3==a.length&&kc(a[1])&&(b={},b[a[1]]=a[2]);if(b)return b.eventModel=ra(b,void 0),b.event="gtag.set",b._clear=!0,b},js:function(a){if(2==a.length&&a[1].getTime)return{event:"gtm.js","gtm.start":a[1].getTime()}},config:function(a){var b=a[2]||{};if(2>a.length||!kc(a[1])||!qa(b))return;var c=Dd(a[1]);if(!c)return;Id()?Kd(c):Ld();var d=c.id,e;for(e in Fd)if(Fd.hasOwnProperty(e)){var f=ja(Fd[e],d);0<=f&&Fd[e].splice(f,1)}var h=c.id,k=b.groups||"default";
k=k.toString().split(",");for(var l=0;l<k.length;l++)Fd[k[l]]=Fd[k[l]]||[],Fd[k[l]].push(h);delete b.groups;Ec("gtag.targets."+c.id,void 0);Ec("gtag.targets."+c.id,ra(b,void 0));return Jd("gtag.config",{send_to:c.id});}},Ld=uc(function(){});var Ud=!1,Vd=[];function Wd(){if(!Ud){Ud=!0;for(var a=0;a<Vd.length;a++)P(Vd[a])}};var Xd=[],Yd=!1,Zd=function(a){var b=a.eventCallback,c=uc(function(){jc(b)&&P(function(){b(cc.m)})}),d=a.eventTimeout;d&&B.setTimeout(c,Number(d));return c},$d=function(){for(var a=!1;!Yd&&0<Xd.length;){Yd=!0;delete wc.eventModel;var b=Xd.shift();if(jc(b))try{b.call(zc)}catch(Nd){}else if(ia(b)){var c=b;if(kc(c[0])){var d=c[0].split("."),e=d.pop(),f=c.slice(1),h=yc(d.join("."),2);if(void 0!==h&&null!==h)try{h[e].apply(h,f)}catch(Nd){}}}else{var k=b;if(k&&("[object Arguments]"==Object.prototype.toString.call(k)||
Object.prototype.hasOwnProperty.call(k,"callee"))){a:{var l=b;if(l.length&&kc(l[0])){var m=Md[l[0]];if(m){b=m(l);break a}}b=void 0}if(!b){Yd=!1;continue}}var n;var p=void 0,q=b,t=q._clear;for(p in q)q.hasOwnProperty(p)&&"_clear"!==p&&(t&&Ec(p,void 0),Ec(p,q[p]));var r=q.event;if(r){var w=q["gtm.uniqueEventId"];w||(w=sc(),q["gtm.uniqueEventId"]=w,Ec("gtm.uniqueEventId",w));ec=r;var E;var K,A,N=q,D=N.event,O=N["gtm.uniqueEventId"],I=dc.zones;A=I?I.checkState(cc.m,O):Oc;if(A.active){var L=Zd(N);c:{var H=
A.isWhitelisted;if("gtm.js"==D){if(zd){K=!1;break c}zd=!0}var M=O,G=D;if(cd&&!(0>=md)&&hd!==M){pd();hd=M;gd="";var U=id,Z=M,ma,za=G;ma=0===za.indexOf("gtm.")?encodeURIComponent(za):"*";U[Z]="&e="+ma+"&eid="+M;kd||(kd=B.setTimeout(pd,500))}var gb=Lc(H),$a={id:O,name:D,Ec:L||ic,R:gb,La:$b(gb)};for(var Fc,Rb=$a,Qd=xd(Rb.Ec),Af=[],Sb=[],hb=0;hb<Jb.length;hb++)if(Rb.La[hb]){var Bf=Jb[hb];var vb=Qd.add();try{var Rd=rd(hb,Af,vb,vb,vb,Rb);Rd?Sb.push(Rd):(yd(hb,Rb),vb())}catch(Nd){vb()}}Qd.rc();for(var Gc=0;Gc<Sb.length;Gc++)Sb[Gc]();Fc=0<Sb.length;if("gtm.js"===D||"gtm.sync"===D)d:{}if(Fc){for(var Cf={__cl:!0,__evl:!0,__fsl:!0,__hl:!0,__jel:!0,__lcl:!0,__sdl:!0,__tl:!0,__ytl:!0},Tb=0;Tb<$a.La.length;Tb++)if($a.La[Tb]){var Td=Jb[Tb];if(Td&&!Cf[Td[S.I]]){K=!0;break c}}K=!1}else K=Fc}E=K?!0:!1}else E=!1;ec=null;n=E}else n=!1;a=n||a}Yd=!1}return!a},ae=function(){var a=$d();try{var b=B["dataLayer"].hide;if(b&&void 0!==b[cc.m]&&b.end){b[cc.m]=!1;var c=!0,d;for(d in b)if(b.hasOwnProperty(d)&&
!0===b[d]){c=!1;break}c&&(b.end(),b.end=null)}}catch(e){}return a},be=function(){var a=Fa("dataLayer",[]),b=Fa("google_tag_manager",{});b=b["dataLayer"]=b["dataLayer"]||{};Rc.push(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});Vd.push(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});var c=a.push;a.push=function(){var b=[].slice.call(arguments,0);c.apply(a,b);for(Xd.push.apply(Xd,b);300<this.length;)this.shift();return $d()};Xd.push.apply(Xd,a.slice(0));
P(ae)};var ce={};ce.ya=new String("undefined");ce.Pa={};var de=function(a){this.resolve=function(b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]===ce.ya?b:a[d]);return c.join("")}};de.prototype.toString=function(){return this.resolve("undefined")};de.prototype.valueOf=de.prototype.toString;ce.Lc=function(a){return new de(a)};var ee={};ce.Id=function(a,b){var c=sc();ee[c]=[a,b];return c};ce.Eb=function(a){var b=a?0:1;return function(a){var c=ee[a];if(c&&"function"===typeof c[b])c[b]();ee[a]=void 0}};
ce.pd=function(a){for(var b=!1,c=!1,d=2;d<a.length;d++)b=b||8===a[d],c=c||16===a[d];return b&&c};ce.Cd=function(a){if(a===ce.ya)return a;var b=sc();ce.Pa[b]=a;return'google_tag_manager["'+cc.m+'"].macro('+b+")"};ce.hc=de;var fe=new rc,ge=function(a,b){function c(a){var b=R(a),c=Q(b,"protocol"),d=Q(b,"host",!0),e=Q(b,"port"),f=Q(b,"path").toLowerCase().replace(/\/$/,"");if(void 0===c||"http"==c&&"80"==e||"https"==c&&"443"==e)c="web",e="default";return[c,d,e,f]}for(var d=c(String(a)),e=c(String(b)),f=0;f<d.length;f++)if(d[f]!==e[f])return!1;return!0};
function he(a){var b=a.arg0,c=a.arg1;switch(a["function"]){case "_cn":return 0<=String(b).indexOf(String(c));case "_css":var d;a:{if(b){var e=["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"];try{for(var f=0;f<e.length;f++)if(b[e[f]]){d=b[e[f]](c);break a}}catch(r){}}d=!1}return d;case "_ew":var h,k;h=String(b);k=String(c);var l=h.length-k.length;return 0<=l&&h.indexOf(k,l)==l;case "_eq":return String(b)==String(c);case "_ge":return Number(b)>=Number(c);
case "_gt":return Number(b)>Number(c);case "_lc":var m;m=String(b).split(",");return 0<=ja(m,String(c));case "_le":return Number(b)<=Number(c);case "_lt":return Number(b)<Number(c);case "_re":var n;var p=a.ignore_case?"i":void 0;try{var q=String(c)+p,t=fe.get(q);t||(t=new RegExp(c,p),fe.set(q,t));n=t.test(b)}catch(r){n=!1}return n;case "_sw":return 0==String(b).indexOf(String(c));case "_um":return ge(b,c)}return!1};function ie(a,b,c,d){return(d||"https:"==B.location.protocol?a:b)+c}function je(a,b){for(var c=b||(a instanceof u?new u:new x),d=a.M(),e=0;e<d.length();e++){var f=d.get(e);if(a.has(f)){var h=a.get(f);h instanceof u?(c.get(f)instanceof u||c.set(f,new u),je(h,c.get(f))):h instanceof x?(c.get(f)instanceof x||c.set(f,new x),je(h,c.get(f))):c.set(f,h)}}return c}function ke(){return cc.m}function le(){return(new Date).getTime()}function me(a,b){return ta(yc(a,b||2))}function ne(){return ec}
function oe(a){return Na('<a href="'+a+'"></a>')[0].href}function pe(a){return mc(sa(a))}function qe(a){return null===a?"null":void 0===a?"undefined":a.toString()}function re(a,b){return qc(a,b)}function se(a,b,c){if(!(a instanceof u))return null;for(var d=new x,e=!1,f=0;f<a.length();f++){var h=a.get(f);h instanceof x&&h.has(b)&&h.has(c)&&(d.set(h.get(b),h.get(c)),e=!0)}return e?d:null}
var te=function(){var a=new Da;a.addAll(Qa());a.addAll({buildSafeUrl:ie,decodeHtmlUrl:oe,copy:je,generateUniqueNumber:sc,getContainerId:ke,getCurrentTime:le,getDataLayerValue:me,getEventName:ne,makeInteger:pe,makeString:qe,randomInteger:re,tableToMap:se});return function(b){return a.get(b)}};var ue=new Sa,ve=function(){var a=data.runtime||[];Fb=function(a){return ue.K(a)};Mb=he;Ra(ue,te());for(var b=0;b<a.length;b++){var c=a[b];if(!ia(c)||3>c.length){if(0==c.length)continue;break}ue.K(c)}};var we=function(a,b){var c=function(){};c.prototype=a.prototype;var d=new c;a.apply(d,Array.prototype.slice.call(arguments,1));return d};var xe=function(a){return encodeURIComponent(a)},ye=function(a){var b=["veinteractive.com","ve-interactive.cn"];if(!a)return!1;var c=Q(R(a),"host");if(!c)return!1;for(var d=0;b&&d<b.length;d++){var e=b[d]&&b[d].toLowerCase();if(e){var f=c.length-e.length;0<f&&"."!=e.charAt(0)&&(f--,e="."+e);if(0<=f&&c.indexOf(e,f)==f)return!0}}return!1};
var T=function(a,b,c){for(var d={},e=!1,f=0;a&&f<a.length;f++)a[f]&&a[f].hasOwnProperty(b)&&a[f].hasOwnProperty(c)&&(d[a[f][b]]=a[f][c],e=!0);return e?d:null},ze=function(a,b){ra(a,b)},Ae=function(a){return mc(a)},Be=function(a,b){return ja(a,b)};var Ce=function(a){var b={"gtm.element":a,"gtm.elementClasses":a.className,"gtm.elementId":a["for"]||Ka(a,"id")||"","gtm.elementTarget":a.formTarget||a.target||""};b["gtm.elementUrl"]=(a.attributes&&a.attributes.formaction?a.formAction:"")||a.action||a.href||a.src||a.code||a.codebase||"";return b},De=function(a){dc.hasOwnProperty("autoEventsSettings")||(dc.autoEventsSettings={});var b=dc.autoEventsSettings;b.hasOwnProperty(a)||(b[a]={});return b[a]},Ee=function(a,b,c,d){var e=De(a),f=tc(e,b,d);e[b]=
c(f)},Fe=function(a,b,c){var d=De(a);return tc(d,b,c)};var Ge=/(^|\.)doubleclick\.net$/i,He=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,Ie=function(a,b,c){for(var d=String(b||C.cookie).split(";"),e=[],f=0;f<d.length;f++){var h=d[f].split("="),k=pc(h[0]);if(k&&k==a){var l=pc(h.slice(1).join("="));l&&!1!==c&&(l=decodeURIComponent(l));e.push(l)}}return e},Je=function(a,b,c,d,e,f){f&&(b=encodeURIComponent(b));var h=a+"="+b+"; ";c&&(h+="path="+c+"; ");e&&(h+="expires="+e.toGMTString()+"; ");var k,l;if("auto"==d){var m=Q(B.location,"host",!0).split(".");if(4==
m.length&&/^[0-9]*$/.exec(m[3]))l=["none"];else{for(var n=[],p=m.length-2;0<=p;p--)n.push(m.slice(p).join("."));n.push("none");l=n}}else l=[d||"none"];k=l;for(var q=C.cookie,t=0;t<k.length;t++){var r=h,w=k[t],E=c;if(Ge.test(B.location.hostname)||"/"==E&&He.test(w))break;"none"!=k[t]&&(r+="domain="+k[t]+";");C.cookie=r;if(q!=C.cookie||0<=ja(Ie(a),b))break}};var Ke=!1;if(C.querySelectorAll)try{var Le=C.querySelectorAll(":root");Le&&1==Le.length&&Le[0]==C.documentElement&&(Ke=!0)}catch(a){}var Me=Ke;var Ne=function(a){for(var b=[],c=document.cookie.split(";"),d=new RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$"),e=0;e<c.length;e++){var f=c[e].match(d);f&&b.push(f[1])}return b},Qe=function(a,b,c){var d=Oe(a);if(1===d.length)return d[0].id;if(0!==d.length){d=Pe(d,function(a){return a.Tc},b);if(1===d.length)return d[0].id;d=Pe(d,function(a){return a.Ad},c);return d[0]?d[0].id:void 0}},Te=function(a,b,c,d,e){c=void 0===c?"/":c;var f=d=void 0===d?"auto":d,h=c;if(Re.test(document.location.hostname)||"/"===h&&
Se.test(f))return!1;var k=b;k&&1200<k.length&&(k=k.substring(0,1200));b=k;var l=a+"="+b+"; path="+c+"; ";void 0!==e&&(l+="expires="+(new Date((new Date).getTime()+e)).toGMTString()+"; ");if("auto"===d){var m=!1,n;a:{var p=[],q=document.location.hostname.split(".");if(4===q.length){var t=q[q.length-1];if(parseInt(t,10).toString()===t){n=["none"];break a}}for(var r=q.length-2;0<=r;r--)p.push(q.slice(r).join("."));p.push("none");n=p}for(var w=n,E=0;E<w.length&&!m;E++)m=Te(a,b,c,w[E],e);return m}d&&"none"!==
d&&(l+="domain="+d+";");var K=document.cookie;document.cookie=l;return K!=document.cookie||0<=Ne(a).indexOf(b)};function Pe(a,b,c){for(var d=[],e=[],f,h=0;h<a.length;h++){var k=a[h],l=b(k);l===c?d.push(k):void 0===f||l<f?(e=[k],f=l):l===f&&e.push(k)}return 0<d.length?d:e}function Oe(a){for(var b=Ue,c=[],d=Ne(a),e=0;e<d.length;e++){var f=d[e].split("."),h=f.shift();if(!b||-1!==b.indexOf(h)){var k=f.shift();k&&(k=k.split("-"),c.push({id:f.join("."),Tc:1*k[0]||1,Ad:1*k[1]||1}))}}return c}
var Se=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,Re=/(^|\.)doubleclick\.net$/i;var Ve=window,We=document;function Xe(a){if(!a)return 1;a=0===a.indexOf(".")?a.substr(1):a;return a.split(".").length}function Ye(a){if(!a||"/"===a)return 1;"/"!==a[0]&&(a="/"+a);"/"!==a[a.length-1]&&(a+="/");return a.split("/").length-1};var Ue=["1"],Ze={},$e=function(a){return Ze[(void 0===a?"_gcl":a)+"_dcu"]},bf=function(a,b,c){b=void 0===b?"auto":b;c=void 0===c?"/":c;var d,e=void 0===a?"_gcl":a;d=(void 0===e?"_gcl":e)+"_dcu";if(!Ze[d]&&!af(d,b,c)){for(var f,h=Ve.navigator.userAgent+(We.cookie||"")+(We.referrer||""),k=h.length,l=Ve.history.length;0<l;)h+=l--^k++;var m=1,n,p,q;if(h)for(m=0,p=h.length-1;0<=p;p--)q=h.charCodeAt(p),m=(m<<6&268435455)+q+(q<<14),n=m&266338304,m=0!=n?m^n>>21:m;var t=[Math.round(2147483647*Math.random())^
m&2147483647,Math.round(Date.now()/1E3)].join("."),r=""+Xe(void 0),w=Ye(void 0);1<w&&(r+="-"+w);f=["1",r,t].join(".");Te(d,f,c,b,7776E6);af(d,b,c)}};function af(a,b,c){var d,e=Xe(b);(d=Qe(a,e,Ye(c)))&&(Ze[a]=d);return d};var cf=function(a){for(var b=[],c=C.cookie.split(";"),d=new RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$"),e=0;e<c.length;e++){var f=c[e].match(d);f&&b.push(f[1])}var h=[];if(!b||0==b.length)return h;for(var k=0;k<b.length;k++){var l=b[k].split(".");3==l.length&&"GCL"==l[0]&&l[1]&&h.push(l[2])}return h};var df=/^\w+$/,ef=/^[\w-]+$/,ff=/^\d+\.fls\.doubleclick\.net$/;function gf(a){return a&&"string"==typeof a&&a.match(df)?a:"_gcl"}function hf(a){if(a){if("string"==typeof a){var b=gf(a);return{la:b,ka:b}}if(a&&"object"==typeof a)return{la:gf(a.dc),ka:gf(a.aw)}}return{la:"_gcl",ka:"_gcl"}}function jf(a){var b=R(B.location.href),c=Q(b,"host",!1);if(c&&c.match(ff)){var d=Q(b,"path").split(a+"=");if(1<d.length)return d[1].split(";")[0].split("?")[0]}}
function kf(a){return a.filter(function(a){return ef.test(a)})}var mf=function(a){var b=jf("gclaw");if(b)return b.split(".");var c=hf(a);if("_gcl"==c.ka){var d=lf();if(d&&(null==d.G||"aw.ds"==d.G))return[d.ba]}return kf(cf(c.ka+"_aw"))},nf=function(a){var b=jf("gcldc");if(b)return b.split(".");var c=hf(a);if("_gcl"==c.la){var d=lf();if(d&&("ds"==d.G||"aw.ds"==d.G))return[d.ba]}return kf(cf(c.la+"_dc"))};
function lf(){var a=R(B.location.href),b=Q(a,"query",!1,void 0,"gclid"),c=Q(a,"query",!1,void 0,"gclsrc");if(!b||!c){var d=Q(a,"fragment");b=b||Oa(d,"gclid");c=c||Oa(d,"gclsrc")}return void 0!==b&&b.match(ef)?{ba:b,G:c}:null}
var of=function(a,b,c){var d=hf(a);c=c||"auto";b=b||"/";var e=lf();if(null!=e){var f=(new Date).getTime(),h=new Date(f+7776E6),k=["GCL",Math.round(f/1E3),e.ba].join(".");e.G&&"aw.ds"!=e.G||Je(d.ka+"_aw",k,b,c,h,!0);"aw.ds"!=e.G&&"ds"!=e.G||Je(d.la+"_dc",k,b,c,h,!0)}},pf=function(){var a=jf("gac");if(a)return decodeURIComponent(a);for(var b=[],c=C.cookie.split(";"),d=/^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/,e=0;e<c.length;e++){var f=c[e].match(d);f&&b.push({lb:f[1],value:f[2]})}var h={};if(b&&b.length)for(var k=
0;k<b.length;k++){var l=b[k].value.split(".");"1"==l[0]&&3==l.length&&l[1]&&(h[b[k].lb]||(h[b[k].lb]=[]),h[b[k].lb].push({timestamp:l[1],ba:l[2]}))}var m=[],n;for(n in h)if(h.hasOwnProperty(n)){for(var p=[],q=h[n],t=0;t<q.length;t++)p.push(q[t].ba);p=kf(p);p.length&&m.push(n+":"+p.join(","))}return m.join(";")},qf=function(a,b,c){};var rf;a:{rf="g";break a;rf="G"}var sf={"":"n",UA:"u",AW:"a",DC:"d",GTM:rf},tf=function(a){var b=cc.m.split("-"),c=b[0].toUpperCase();return(sf[c]||"i")+"5o"+(a&&"GTM"===c?b[1]:"")};
var uf=function(a){return!(void 0===a||null===a||0===(a+"").length)},vf=function(a,b){var c;if(2===b.B)return a("ord",qc(1E11,1E13)),!0;if(3===b.B)return a("ord","1"),a("num",qc(1E11,1E13)),!0;if(4===b.B)return uf(b.sessionId)&&a("ord",b.sessionId),!0;if(5===b.B)c="1";else if(6===b.B)c=b.Xb;else return!1;uf(c)&&a("qty",c);uf(b.Ta)&&a("cost",b.Ta);uf(b.mb)&&a("ord",b.mb);return!0},wf=encodeURIComponent,xf=function(a,b){function c(a,b,c){f.hasOwnProperty(a)||(b+="",e+=";"+a+"="+(c?b:wf(b)))}var d=a.Va,
e=a.protocol;e+=a.Ma?"//"+d+".fls.doubleclick.net/activityi":"//ad.doubleclick.net/activity";e+=";src="+wf(d)+(";type="+wf(a.Wa))+(";cat="+wf(a.ja));var f=a.Nc||{},h;for(h in f)f.hasOwnProperty(h)&&(e+=";"+wf(h)+"="+wf(f[h]+""));if(vf(c,a)){uf(a.u)&&c("u",a.u);uf(a.tran)&&c("tran",a.tran);c("gtm",tf());if(a.Sa){var k=nf(a.Z);k&&k.length&&c("gcldc",k.join("."));var l=mf(a.Z);l&&l.length&&c("gclaw",l.join("."));var m=pf();m&&c("gac",m);}uf(a.eb)&&c("prd",a.eb,!0);for(var p in a.va)a.va.hasOwnProperty(p)&&c(p,a.va[p]);e+=b||"";uf(a.Ia)&&c("~oref",a.Ia);a.Ma?Ha(e+"?",a.H):J(e+"?",a.H,a.S)}else P(a.S)};var yf=function(a){return null===a||void 0===a||0===String(a).length?"":encodeURIComponent(String(a))};var Df=!!B.MutationObserver,Ef=void 0,Ff=function(a){if(!Ef){var b=function(){var a=C.body;if(a)if(Df)(new MutationObserver(function(){for(var a=0;a<Ef.length;a++)P(Ef[a])})).observe(a,{childList:!0,subtree:!0});else{var b=!1;Ia(a,"DOMNodeInserted",function(){b||(b=!0,P(function(){b=!1;for(var a=0;a<Ef.length;a++)P(Ef[a])}))})}};Ef=[];C.body?b():P(b)}Ef.push(a)};var Pf="www.googletagmanager.com/gtm.js";Pf="www.googletagmanager.com/gtag/js";
var Qf=Pf,Rf=function(a,b,c,d){Ia(a,b,c,d)},Sf=function(a,b){return B.setTimeout(a,b)},Tf=function(a,b,c){F(a,b,c)},Uf={},Vf=function(a,b,c){var d=Uf[a];if(void 0===d){var e=function(a,b){return function(){a.status=b;for(var c=2==b?a.$b:a.Hb,d=0;d<c.length;d++)B.setTimeout(c[d],0)}};d={status:1,$b:[],Hb:[],Md:void 0};d.pe=F(a,e(d,2),e(d,3));Uf[a]=d}0===d.status&&(d.Md(),d.status=2);2===d.status?b&&b():3===d.status?c&&c():1===d.status&&(b&&d.$b.push(b),c&&d.Hb.push(c))},Wf=function(){return B.location.href},
Xf=function(a){return Q(R(a),"fragment")},V=function(a,b){return yc(a,b||2)},Yf=function(a,b,c){b&&(a.eventCallback=b,c&&(a.eventTimeout=c));return B["dataLayer"].push(a)},Zf=function(a,b){B[a]=b},W=function(a,b,c){b&&(void 0===B[a]||c&&!B[a])&&(B[a]=b);return B[a]},$f=function(a,b){var c;a:{var d;d=100;for(var e={},f=0;f<b.length;f++)e[b[f]]=!0;for(var h=a,k=0;h&&k<=d;k++){if(e[String(h.tagName).toLowerCase()]){c=h;break a}h=h.parentElement}c=null}return c},X=function(a,b,c,d){var e=!d&&"http:"==
B.location.protocol;e&&(e=2!==ag());return(e?b:a)+c};
var bg=function(a){var b=0;return b},cg=function(a){},dg=function(a){var b=!1;return b},eg=function(a,b){var c;a:{if(a&&
ia(a))for(var d=0;d<a.length;d++)if(a[d]&&b(a[d])){c=a[d];break a}c=void 0}return c},fg=function(a,b,c,d){Ee(a,b,c,d)},gg=function(a,b,c){return Fe(a,b,c)},hg=function(a){return!!Fe(a,"init",!1)},ig=function(a){De(a).init=!0};
var ag=function(){var a=Qf;a=a.toLowerCase();for(var b="https://"+a,c="http://"+a,d=1,e=C.getElementsByTagName("script"),f=0;f<e.length&&100>f;f++){var h=e[f].src;if(h){h=h.toLowerCase();if(0===h.indexOf(c))return 3;1===d&&0===h.indexOf(b)&&(d=2)}}return d};var kg=function(a,b){return Ac(a,b,void 0)};
var lg=function(a,b){var c=Qf+"?id="+encodeURIComponent(a)+"&l=dataLayer";if(b)for(var d in b)b[d]&&b.hasOwnProperty(d)&&(c+="&"+d+"="+encodeURIComponent(b[d]));var e=X("https://","http://",c);F(e,void 0,void 0)};
var ng=function(a,b,c){a instanceof ce.hc&&(a=a.resolve(ce.Id(b,c)),b=ic);return{Xa:a,H:b}};var og=function(a,b,c){var d=(new Date).getTime();this.n=a;this.t=d;this.p=b;this.u=c},pg=function(){this.c=1;this.e=[];this.p=null};function qg(a){var b=dc,c=b.gss=b.gss||{};return c[a]=c[a]||new pg}var rg=function(a,b){qg(a).p=b},sg=function(a){};var tg=function(a){};var Y={a:{}};

Y.a.e=["google"],function(){(function(a){Y.__e=a;Y.__e.b="e";Y.__e.g=!0})(function(){return ec})}();

Y.a.v=["google"],function(){(function(a){Y.__v=a;Y.__v.b="v";Y.__v.g=!0})(function(a){var b=a.vtp_name;if(!b||!b.replace)return!1;var c=V(b.replace(/\\\./g,"."),a.vtp_dataLayerVersion||1);return void 0!==c?c:a.vtp_defaultValue})}();

Y.a.gtagaw=["google"],function(){var a=!1,b=!1,c=[],d="send_to aw_remarketing aw_remarketing_only custom_params send_page_view language value currency transaction_id user_id conversion_linker conversion_cookie_prefix page_location page_referrer phone_conversion_number phone_conversion_callback phone_conversion_css_class items aw_merchant_id aw_feed_country aw_feed_language discount disable_merchant_reported_purchases".split(" "),e=function(a){var b=W("google_trackConversion"),c=a.gtm_onFailure;"function"==
typeof b?b(a)||c():c()},f=function(){for(;0<c.length;)e(c.shift())},h=function(){a||(a=!0,Tf(X("https://","http://","www.googleadservices.com/pagead/conversion_async.js"),function(){f();c={push:e}},function(){f();a=!1}))},k=function(a,c,d,e){if(c){var f=a.ca[0],h=a.ca[1],k=W("_googWcmImpl",function(){k.q=k.q||[];k.q.push(arguments)});W("_googWcmAk",f);b||(b=!0,Tf(X("https://","http://","www.gstatic.com/wcm/loader.js")));var l={ak:f,cl:h};void 0===d&&(l.autoreplace=c);k(2,d,l,c,e,new Date,e)}},l=function(a){if(a){for(var b=
[],c=0;c<a.length;++c){var d=a[c];d&&b.push({item_id:d.id,quantity:d.quantity,value:d.price})}return b}};(function(a){Y.__gtagaw=a;Y.__gtagaw.b="gtagaw";Y.__gtagaw.g=!0})(function(a){var b=a.vtp_conversionId,e=ec,f="gtag.config"==e,m=b.ca[0],r=b.ca[1],w=void 0!==r,E=b.containerId,K=w?b.id:void 0,A=function(a){return Ac(a,E,K)},N=!1!==A("conversion_linker"),D=A("conversion_cookie_prefix");f&&N&&of(D,void 0,void 0);if(f&&w){var O=A("phone_conversion_number"),I=A("phone_conversion_callback"),L=A("phone_conversion_css_class"),
H=A("phone_conversion_options");k(b,O,I||L,H)}var M=!1===A("aw_remarketing")||!1===A("send_page_view");if(!f||!w&&!M){!0===A("aw_remarketing_only")&&(w=!1);var G={google_conversion_id:m,google_remarketing_only:!w,onload_callback:a.vtp_gtmOnSuccess,gtm_onFailure:a.vtp_gtmOnFailure,google_conversion_format:"3",google_conversion_color:"ffffff",google_conversion_domain:"",google_conversion_label:r,google_conversion_language:A("language"),google_conversion_value:A("value"),google_conversion_currency:A("currency"),
google_conversion_order_id:A("transaction_id"),google_user_id:A("user_id"),google_conversion_page_url:A("page_location"),google_conversion_referrer_url:A("page_referrer"),google_gtm:tf(void 0),google_read_gcl_cookie_opt_out:!N};N&&D&&(qa(D)?G.google_gcl_cookie_prefix=D.aw:G.google_gcl_cookie_prefix=D);var U=function(){var a=A("custom_params"),b={event:e};if(ia(a)){for(var c=0;c<a.length;++c){var f=a[c],h=A(f);void 0!==h&&(b[f]=h)}return b}var k=A("eventModel");if(!k)return null;ra(k,b);for(var l=
0;l<d.length;++l)delete b[d[l]];return b}();U&&(G.google_custom_params=U);if(w&&"purchase"==e&&A("aw_merchant_id")){G.google_conversion_merchant_id=A("aw_merchant_id");G.google_basket_feed_country=A("aw_feed_country");G.google_basket_feed_language=A("aw_feed_language");G.google_basket_discount=A("discount");G.google_basket_transaction_type=e;G.google_disable_merchant_reported_conversions=!0===A("disable_merchant_reported_purchases");var Z=l(A("items"));Z&&(G.google_conversion_items=Z)}c.push(G)}h()})}();




Y.a.gtagfl=[],function(){function a(a){var b=/^DC-(\d+)(\/([\w-]+)\/([\w-]+)\+(\w+))?$/.exec(a);if(b){var c={standard:2,unique:3,per_session:4,transactions:5,items_sold:6,"":1}[(b[5]||"").toLowerCase()];if(c)return{containerId:"DC-"+b[1],ac:b[3]?a:"",kc:b[1],jc:b[3]||"",ja:b[4]||"",B:c}}}function b(a,b){function c(b,c,e){void 0!==e&&0!==(e+"").length&&d.push(b+c+":"+a(e+""))}var d=[],e=b("items")||[];if(ia(e))for(var l=0;l<e.length;l++){var m=e[l],n=l+1;c("i",n,m.id);c("p",n,m.price);c("q",n,m.quantity);
c("c",n,b("country"));c("l",n,b("language"))}return d.join("|")}function c(a,b,c){var d=/^u([1-9]\d?|100)$/,e=a("custom_map")||{},f=Dc(b,c),m={},n={};if(qa(e))for(var p in e)if(e.hasOwnProperty(p)&&d.test(p)){var q=e[p];kc(q)&&(m[p]=q)}for(var t=0;t<f.length;t++){var r=f[t];d.test(r)&&(m[r]=r)}for(var w in m)m.hasOwnProperty(w)&&(n[w]=a(m[w]));return n}(function(a){Y.__gtagfl=a;Y.__gtagfl.b="gtagfl";Y.__gtagfl.g=!0})(function(d){var e=d.vtp_gtmOnSuccess,f=d.vtp_gtmOnFailure,h=a(d.vtp_targetId);if(h){var k=
function(a){return Ac(a,h.containerId,h.ac||void 0)},l=!1!==k("conversion_linker"),m=k("conversion_cookie_prefix");if("gtag.config"===ec)l&&(of(m,void 0,void 0),qf(m,void 0,void 0)),P(e);else{var n={},p=k("dc_custom_params");if(qa(p))for(var q in p)if(p.hasOwnProperty(q)){var t=p[q];void 0!==t&&null!==t&&(n[q]=t)}var r="";if(5===h.B||6===h.B)r=b(xe,k);var w=c(k,h.containerId,h.ac),E=3===ag(),K=!0===k("allow_custom_scripts"),A={ja:h.ja,Sa:l,Z:m,Ta:k("value"),B:h.B,Nc:n,Va:h.kc,Wa:h.jc,S:f,H:e,Ia:Pa(R(Wf())),
eb:r,protocol:E?"http:":"https:",Xb:k("quantity"),Ma:K,sessionId:k("session_id"),mb:k("transaction_id"),va:w};xf(A,void 0)}}else P(f)})}();
Y.a.gtaggf=["google"],function(){var a=function(a){if(a){for(var b=[],d=0,e=0;e<a.length;++e){var f=a[e];f&&"FlightSegment"===f.category&&(b[d]={cabin:f.cabin,fare_product:f.fare_product,booking_code:f.booking_code,flight_number:f.flight_number,origin:f.origin,destination:f.destination,departure_date_time:f.start_date},d++)}return b}};(function(a){Y.__gtaggf=a;Y.__gtaggf.b="gtaggf";Y.__gtaggf.g=!0})(function(b){var c=ec,d=b.vtp_gtmOnSuccess,e=b.vtp_gtmOnFailure,f=function(a){return Ac(a,k,h.id)};
if("gtag.config"===c)P(d);else{var h=b.vtp_conversionId,k=h.containerId,l={conversion_id:h.ca[0],onFailure:e,onSuccess:d};if("purchase"===c){var m={partner_id:f("client_id"),trip_type:f("trip_type"),total_price:f("value"),currency:f("currency"),flight_segment:a(f("items"))},n=f("passengers");n&&"object"===typeof n&&(m.passengers_total=n.total,m.passengers_adult=n.adult,m.passengers_child=n.child,m.passengers_infant_in_seat=n.infant_in_seat,m.passengers_infant_on_lap=n.infant_on_lap,m.passengers_senior=
n.senior);l.conversion_data=m}if(l)try{l.conversion_id&&l.conversion_data&&J("https://www.googletraveladservices.com/travel/flights/clk"+("/pagead/conversion/"+yf(l.conversion_id)+"/?")+"&conversion_data="+yf(JSON.stringify(l.conversion_data)),l.H,l.S)}catch(p){}}})}();


Y.a.gtagua=["google"],function(){var a,b={client_id:1,client_storage:"storage",cookie_name:1,cookie_domain:1,cookie_expires:1,cookie_path:1,cookie_update:1,sample_rate:1,site_speed_sample_rate:1,use_amp_client_id:1,store_gac:1,conversion_linker:"storeGac"},c={anonymize_ip:1,app_id:1,app_installer_id:1,app_name:1,app_version:1,campaign:{name:"campaignName",source:"campaignSource",medium:"campaignMedium",term:"campaignTerm",content:"campaignContent",id:"campaignId"},currency:"currencyCode",description:"exDescription",
fatal:"exFatal",language:1,non_interaction:1,page_hostname:"hostname",page_referrer:"referrer",page_path:"page",page_location:"location",page_title:"title",screen_name:1,transport_type:"transport",user_id:1},d={content_id:1,event_category:1,event_action:1,event_label:1,link_attribution:1,linker:1,method:1,name:1,send_page_view:1,value:1},e={cookie_name:1,cookie_expires:"duration",levels:1},f={anonymize_ip:1,fatal:1,non_interaction:1,use_amp_client_id:1,send_page_view:1,store_gac:1,conversion_linker:1},
h=function(a,b,c,d){if(void 0!==c)if(f[b]&&(c=nc(c)),"anonymize_ip"!=b||c||(c=void 0),1===a)d[k(b)]=c;else if(kc(a))d[a]=c;else for(var e in a)a.hasOwnProperty(e)&&void 0!==c[e]&&(d[a[e]]=c[e])},k=function(a){return a&&kc(a)?a.replace(/(_[a-z])/g,function(a){return a[1].toUpperCase()}):a},l=function(a,b,c){a.hasOwnProperty(b)||(a[b]=c)},m=function(a,e,f){var k={},m={},n={},p=kg("custom_map",a);if(qa(p))for(var q in p)if(p.hasOwnProperty(q)&&/^(dimension|metric)\d+$/.test(q)){var r=kg(p[q],a);void 0!==
r&&l(m,q,r)}for(var w=Dc(a,void 0),t=0;t<w.length;++t){var H=w[t],M=kg(H,a);d.hasOwnProperty(H)?h(d[H],H,M,k):c.hasOwnProperty(H)?h(c[H],H,M,m):b.hasOwnProperty(H)?h(b[H],H,M,n):/^(dimension|metric|content_group)\d+$/.test(H)&&h(1,H,M,m)}var G=String(ec);l(n,"cookieDomain","auto");l(m,"forceSSL",!0);var U="general";0<=Be("add_payment_info add_to_cart add_to_wishlist begin_checkout checkout_progress purchase refund remove_from_cart set_checkout_option".split(" "),G)?U="ecommerce":0<=Be("generate_lead login search select_content share sign_up view_item view_item_list view_promotion view_search_results".split(" "),
G)?U="engagement":"exception"==G&&(U="error");l(k,"eventCategory",U);0<=Be(["view_item","view_item_list","view_promotion","view_search_results"],G)&&l(m,"nonInteraction",!0);"login"==G||"sign_up"==G||"share"==G?l(k,"eventLabel",kg("method",a)):"search"==G||"view_search_results"==G?l(k,"eventLabel",kg("search_term",a)):"select_content"==G&&l(k,"eventLabel",kg("content_type",a));var Z=k.linker||{};if(Z.accept_incoming||0!=Z.accept_incoming&&Z.domains)n.allowLinker=!0;!1===kg("allow_display_features",
a)&&(m.displayFeaturesTask=null);n.name=e;m["&gtm"]=tf(!0);m.hitCallback=f;k.L=m;k.Fb=n;return k},n=function(a){function b(a){var b=ra(a,void 0);b.list=a.list_name;b.listPosition=a.list_position;b.position=a.list_position||a.creative_slot;b.creative=a.creative_name;return b}function c(a){for(var c=[],d=0;a&&d<a.length;d++)a[d]&&c.push(b(a[d]));return c.length?c:void 0}function d(a){return{id:e("transaction_id"),affiliation:e("affiliation"),revenue:e("value"),tax:e("tax"),shipping:e("shipping"),coupon:e("coupon"),
list:e("list_name")||a}}for(var e=function(b){return Ac(b,a,void 0)},f=e("items"),h,k=0;f&&k<f.length&&!(h=f[k].list_name);k++);var m=e("custom_map");if(qa(m))for(k=0;f&&k<f.length;++k){var n=f[k],p;for(p in m)m.hasOwnProperty(p)&&/^(dimension|metric)\d+$/.test(p)&&l(n,p,n[m[p]])}var q=null,t=ec,G=e("promotions");"purchase"==t||"refund"==t?q={action:t,ia:d(),ea:c(f)}:"add_to_cart"==t?q={action:"add",ea:c(f)}:"remove_from_cart"==t?q={action:"remove",ea:c(f)}:"view_item"==t?q={action:"detail",ia:d(h),
ea:c(f)}:"view_item_list"==t?q={action:"impressions",kd:c(f)}:"view_promotion"==t?q={action:"promo_view",fb:c(G)}:"select_content"==t&&G&&0<G.length?q={action:"promo_click",fb:c(G)}:"select_content"==t?q={action:"click",ia:{list:e("list_name")||h},ea:c(f)}:"begin_checkout"==t||"checkout_progress"==t?q={action:"checkout",ea:c(f),ia:{step:"begin_checkout"==t?1:e("checkout_step"),option:e("checkout_option")}}:"set_checkout_option"==t&&(q={action:"checkout_option",ia:{step:e("checkout_step"),option:e("checkout_option")}});
q&&(q.ce=e("currency"));return q},p={},q=function(a,b){var c=p[a];p[a]=ra(b,void 0);if(!c)return!1;for(var d in b)if(b.hasOwnProperty(d)&&b[d]!==c[d])return!0;for(d in c)if(c.hasOwnProperty(d)&&c[d]!==b[d])return!0;return!1};(function(a){Y.__gtagua=a;Y.__gtagua.b="gtagua";Y.__gtagua.g=!0})(function(b){var c=b.vtp_trackingId,d=Xc(void 0),f="gtag_"+c.split("-").join("_"),p=function(a){var b=[].slice.call(arguments,0);b[0]=f+"."+b[0];d.apply(window,b)},t=function(){var a=function(a,b){for(var c=0;b&&
c<b.length;c++)p(a,b[c])},b=n(c);if(b){var d=b.action;if("impressions"==d)a("ec:addImpression",b.kd);else if("promo_click"==d||"promo_view"==d){var e=b.fb;a("ec:addPromo",b.fb);e&&0<e.length&&"promo_click"==d&&p("ec:setAction",d)}else a("ec:addProduct",b.ea),p("ec:setAction",d,b.ia)}},N=function(){var a=kg("optimize_id",c);a&&(p("require",a,{dataLayer:"dataLayer"}),p("require","render"))},D=m(c,f,b.vtp_gtmOnSuccess);q(f,D.Fb)&&d(function(){Wc()&&Wc().remove(f)});d("create",c,D.Fb);(function(){var a=
kg("custom_map",c);d(function(){if(qa(a)){var b=D.L,c=Wc().getByName(f),d;for(d in a)if(a.hasOwnProperty(d)&&/^(dimension|metric)\d+$/.test(d)){var e=c.get(k(a[d]));l(b,d,e)}}})})();(function(a){if(a){var b={};if(qa(a))for(var c in e)e.hasOwnProperty(c)&&h(e[c],c,a[c],b);p("require","linkid",b)}})(D.linkAttribution);var O=D.linker;O&&O.domains&&Yc(f+".",O.domains,!!O.use_anchor,!!O.decorate_forms);var I=function(a,b,c){c&&(b=""+b);D.L[a]=b},L=ec;"page_view"==L?(N(),p("send","pageview",D.L)):"gtag.config"==
L?(N(),0!=D.sendPageView&&p("send","pageview",D.L)):"screen_view"==L?p("send","screenview",D.L):"timing_complete"==L?(I("timingCategory",D.eventCategory,!0),I("timingVar",D.name,!0),I("timingValue",mc(D.value)),void 0!==D.eventLabel&&I("timingLabel",D.eventLabel,!0),p("send","timing",D.L)):"exception"==L?p("send","exception",D.L):(0<=Be("view_item_list select_content view_item add_to_cart remove_from_cart begin_checkout set_checkout_option purchase refund view_promotion checkout_progress".split(" "),
L)&&(p("require","ec","ec.js"),t()),I("eventCategory",D.eventCategory,!0),I("eventAction",D.eventAction||L,!0),void 0!==D.eventLabel&&I("eventLabel",D.eventLabel,!0),void 0!==D.value&&I("eventValue",mc(D.value)),p("send","event",D.L));a||(a=!0,Tf("https://www.google-analytics.com/analytics.js",function(){Wc().loaded||b.vtp_gtmOnFailure()},b.vtp_gtmOnFailure))})}();
var ug={macro:function(a){if(ce.Pa.hasOwnProperty(a))return ce.Pa[a]}};ug.dataLayer=zc;ug.onHtmlSuccess=ce.Eb(!0);ug.onHtmlFailure=ce.Eb(!1);ug.callback=function(a){gc.hasOwnProperty(a)&&jc(gc[a])&&gc[a]();delete gc[a]};ug.xc=function(){dc[cc.m]=ug;hc=Y.a;Nb=Nb||ce;Ob=Mc};
ug.ld=function(){dc=B.google_tag_manager=B.google_tag_manager||{};if(dc[cc.m]){var a=dc.zones;a&&a.unregisterChild(cc.m)}else{for(var b=data.resource||{},c=b.macros||[],d=0;d<c.length;d++)Gb.push(c[d]);for(var e=b.tags||[],f=0;f<e.length;f++)Jb.push(e[f]);for(var h=b.predicates||[],k=0;k<h.length;k++)Ib.push(h[k]);for(var l=b.rules||[],m=0;m<l.length;m++){for(var n=l[m],p={},q=0;q<n.length;q++)p[n[q][0]]=Array.prototype.slice.call(n[q],1);Hb.push(p)}Lb=Y;ve();ug.xc();be();Pc=!1;Qc=0;if("interactive"==
C.readyState&&!C.createEventObject||"complete"==C.readyState)Sc();else{Ia(C,"DOMContentLoaded",Sc);Ia(C,"readystatechange",Sc);if(C.createEventObject&&C.documentElement.doScroll){var t=!0;try{t=!B.frameElement}catch(w){}t&&Tc()}Ia(B,"load",Sc)}Ud=!1;"complete"===C.readyState?Wd():Ia(B,"load",Wd);a:{
if(!cd)break a;ed();ld=2;hd=void 0;id={};fd={};kd=void 0;jd={};gd="";B.setInterval(ed,864E5);B.setInterval(nd,1E3);}}};ug.ld();

})()



window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-114042921-1');