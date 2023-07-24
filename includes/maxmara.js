(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",s="second",i="minute",r="hour",o="day",a="week",u="month",h="quarter",c="year",d="date",f="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,$=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},y=function(t,e,n){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(n)+t},v={s:y,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),s=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+y(s,2,"0")+":"+y(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var s=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(s,u),r=n-i<0,o=e.clone().add(s+(r?-1:1),u);return+(-(s+(n-i)/(r?i-o:o-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:u,y:c,w:a,d:o,D:d,h:r,m:i,s,ms:n,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},M="en",p={};p[M]=m;var g=function(t){return t instanceof O},S=function t(e,n,s){var i;if(!e)return M;if("string"==typeof e){var r=e.toLowerCase();p[r]&&(i=r),n&&(p[r]=n,i=r);var o=e.split("-");if(!i&&o.length>1)return t(o[0])}else{var a=e.name;p[a]=e,i=a}return!s&&i&&(M=i),i||!s&&M},D=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new O(n)},w=v;w.l=S,w.i=g,w.w=function(t,e){return D(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var O=function(){function m(t){this.$L=S(t.locale,null,!0),this.parse(t)}var y=m.prototype;return y.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(l);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},y.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},y.$utils=function(){return w},y.isValid=function(){return!(this.$d.toString()===f)},y.isSame=function(t,e){var n=D(t);return this.startOf(e)<=n&&n<=this.endOf(e)},y.isAfter=function(t,e){return D(t)<this.startOf(e)},y.isBefore=function(t,e){return this.endOf(e)<D(t)},y.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(t,e){var n=this,h=!!w.u(e)||e,f=w.p(t),l=function(t,e){var s=w.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return h?s:s.endOf(o)},$=function(t,e){return w.w(n.toDate()[t].apply(n.toDate("s"),(h?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,y=this.$M,v=this.$D,M="set"+(this.$u?"UTC":"");switch(f){case c:return h?l(1,0):l(31,11);case u:return h?l(1,y):l(0,y+1);case a:var p=this.$locale().weekStart||0,g=(m<p?m+7:m)-p;return l(h?v-g:v+(6-g),y);case o:case d:return $(M+"Hours",0);case r:return $(M+"Minutes",1);case i:return $(M+"Seconds",2);case s:return $(M+"Milliseconds",3);default:return this.clone()}},y.endOf=function(t){return this.startOf(t,!1)},y.$set=function(t,e){var a,h=w.p(t),f="set"+(this.$u?"UTC":""),l=(a={},a[o]=f+"Date",a[d]=f+"Date",a[u]=f+"Month",a[c]=f+"FullYear",a[r]=f+"Hours",a[i]=f+"Minutes",a[s]=f+"Seconds",a[n]=f+"Milliseconds",a)[h],$=h===o?this.$D+(e-this.$W):e;if(h===u||h===c){var m=this.clone().set(d,1);m.$d[l]($),m.init(),this.$d=m.set(d,Math.min(this.$D,m.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},y.set=function(t,e){return this.clone().$set(t,e)},y.get=function(t){return this[w.p(t)]()},y.add=function(n,h){var d,f=this;n=Number(n);var l=w.p(h),$=function(t){var e=D(f);return w.w(e.date(e.date()+Math.round(t*n)),f)};if(l===u)return this.set(u,this.$M+n);if(l===c)return this.set(c,this.$y+n);if(l===o)return $(1);if(l===a)return $(7);var m=(d={},d[i]=t,d[r]=e,d[s]=1e3,d)[l]||1,y=this.$d.getTime()+n*m;return w.w(y,this)},y.subtract=function(t,e){return this.add(-1*t,e)},y.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var s=t||"YYYY-MM-DDTHH:mm:ssZ",i=w.z(this),r=this.$H,o=this.$m,a=this.$M,u=n.weekdays,h=n.months,c=function(t,n,i,r){return t&&(t[n]||t(e,s))||i[n].slice(0,r)},d=function(t){return w.s(r%12||12,t,"0")},l=n.meridiem||function(t,e,n){var s=t<12?"AM":"PM";return n?s.toLowerCase():s},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:w.s(a+1,2,"0"),MMM:c(n.monthsShort,a,h,3),MMMM:c(h,a),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,u,2),ddd:c(n.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(r),HH:w.s(r,2,"0"),h:d(1),hh:d(2),a:l(r,o,!0),A:l(r,o,!1),m:String(o),mm:w.s(o,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:i};return s.replace($,(function(t,e){return e||m[t]||i.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(n,d,f){var l,$=w.p(d),m=D(n),y=(m.utcOffset()-this.utcOffset())*t,v=this-m,M=w.m(this,m);return M=(l={},l[c]=M/12,l[u]=M,l[h]=M/3,l[a]=(v-y)/6048e5,l[o]=(v-y)/864e5,l[r]=v/e,l[i]=v/t,l[s]=v/1e3,l)[$]||v,f?M:w.a(M)},y.daysInMonth=function(){return this.endOf(u).$D},y.$locale=function(){return p[this.$L]},y.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),s=S(t,e,!0);return s&&(n.$L=s),n},y.clone=function(){return w.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},m}(),Y=O.prototype;return D.prototype=Y,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",o],["$M",u],["$y",c],["$D",d]].forEach((function(t){Y[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),D.extend=function(t,e){return t.$i||(t(e,O,D),t.$i=!0),D},D.locale=S,D.isDayjs=g,D.unix=function(t){return D(1e3*t)},D.en=p[M],D.Ls=p,D.p={},D}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,s=6e4,i=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,u=2592e6,h=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,c={years:a,months:u,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof M},f=function(t,e,n){return new M(t,n,e.$l)},l=function(t){return e.p(t)+"s"},$=function(t){return t<0},m=function(t){return $(t)?Math.ceil(t):Math.floor(t)},y=function(t){return Math.abs(t)},v=function(t,e){return t?$(t)?{negative:!0,format:""+y(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},M=function(){function $(t,e,n){var s=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return f(t*c[l(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){s.$d[l(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var i=t.match(h);if(i){var r=i.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var y=$.prototype;return y.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*c[n]}),0)},y.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=m(t/a),t%=a,this.$d.months=m(t/u),t%=u,this.$d.days=m(t/r),t%=r,this.$d.hours=m(t/i),t%=i,this.$d.minutes=m(t/s),t%=s,this.$d.seconds=m(t/n),t%=n,this.$d.milliseconds=t},y.toISOString=function(){var t=v(this.$d.years,"Y"),e=v(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=v(n,"D"),i=v(this.$d.hours,"H"),r=v(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=v(o,"S"),u=t.negative||e.negative||s.negative||i.negative||r.negative||a.negative,h=i.format||r.format||a.format?"T":"",c=(u?"-":"")+"P"+t.format+e.format+s.format+h+i.format+r.format+a.format;return"P"===c||"-P"===c?"P0D":c},y.toJSON=function(){return this.toISOString()},y.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(t,e){return e||String(s[t])}))},y.as=function(t){return this.$ms/c[l(t)]},y.get=function(t){var e=this.$ms,n=l(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?m(e/c[n]):this.$d[n],0===e?0:e},y.add=function(t,e,n){var s;return s=e?t*c[l(e)]:d(t)?t.$ms:f(t,this).$ms,f(this.$ms+s*(n?-1:1),this)},y.subtract=function(t,e){return this.add(t,e,!0)},y.locale=function(t){var e=this.clone();return e.$l=t,e},y.clone=function(){return f(this.$ms,this)},y.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},y.milliseconds=function(){return this.get("milliseconds")},y.asMilliseconds=function(){return this.as("milliseconds")},y.seconds=function(){return this.get("seconds")},y.asSeconds=function(){return this.as("seconds")},y.minutes=function(){return this.get("minutes")},y.asMinutes=function(){return this.as("minutes")},y.hours=function(){return this.get("hours")},y.asHours=function(){return this.as("hours")},y.days=function(){return this.get("days")},y.asDays=function(){return this.as("days")},y.weeks=function(){return this.get("weeks")},y.asWeeks=function(){return this.as("weeks")},y.months=function(){return this.get("months")},y.asMonths=function(){return this.as("months")},y.years=function(){return this.get("years")},y.asYears=function(){return this.as("years")},$}();return function(n,s,i){t=i,e=i().$utils(),i.duration=function(t,e){var n=i.locale();return f(t,{$l:n},e)},i.isDuration=d;var r=s.prototype.add,o=s.prototype.subtract;s.prototype.add=function(t,e){return d(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},s.prototype.subtract=function(t,e){return d(t)&&(t=t.asMilliseconds()),o.bind(this)(t,e)}}}()},542:function(t){t.exports=function(){"use strict";var t="day";return function(e,n,s){var i=function(e){return e.add(4-e.isoWeekday(),t)},r=n.prototype;r.isoWeekYear=function(){return i(this).year()},r.isoWeek=function(e){if(!this.$utils().u(e))return this.add(7*(e-this.isoWeek()),t);var n,r,o,a=i(this),u=(n=this.isoWeekYear(),o=4-(r=(this.$u?s.utc:s)().year(n).startOf("year")).isoWeekday(),r.isoWeekday()>4&&(o+=7),r.add(o,t));return a.diff(u,"week")+1},r.isoWeekday=function(t){return this.$utils().u(t)?this.day()||7:this.day(this.day()%7?t:t-7)};var o=r.startOf;r.startOf=function(t,e){var n=this.$utils(),s=!!n.u(e)||e;return"isoweek"===n.p(t)?s?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):o.bind(this)(t,e)}}}()},798:(t,e,n)=>{const s=n(484),i=n(542),r=n(646);s.extend(i),s.extend(r);const o={20192:["003","004","005","006","008","009","010","011"],20201:["007"]};t.exports.forYear=function(t,e=s()){const n=Number(t),i=[[n,1],[n,2],[n-1,2],[n+1,1]];const r=(t,e)=>{if(e<1||e>2)throw new Error("Season must be one of [1,2]");return{begin:{anno_retail:1==e?t-1:t,settimana_retail:1==e?40:14},end:{anno_retail:1==e?t:t+1,settimana_retail:1==e?39:13}}},a=s(`${n}-01-01`).subtract(s.duration({days:63})),u=a.format("YYYY-MM-01"),h=a.format("YYYY-MM-DD"),c=`'${n}0101' , '${n-1}0101'`;return{fCaricato:{whereClause:'P.stagionale = "STAGIONALE" AND '+((t,e)=>{const s=t.filter((t=>null!=t));if(0==s.length)throw new Error(`Query 'f_caricato' can't be computed using ${n} as year. It won't have data nor assigned shard`);return s.map((t=>`(${t})`)).join(" OR ")})(i.map((t=>function(t,[n,s]){const{begin:{anno_retail:i},end:{anno_retail:a},begin:{settimana_retail:u},end:{settimana_retail:h}}=r(n,s),{isoYear:c,isoWeek:d}={isoYear:e.isoWeekYear(),isoWeek:e.isoWeek()},f=`${c}${d}`;return t<c||f>=`${i}${u}`&&f<=`${a}${h}`?`_TABLE_SUFFIX IN (${[`${i}0101`,`${a}0101`].map((t=>`'${t}'`)).join(",")}) AND C.anno = ${n} AND C.stagione = ${s} AND contesto NOT IN (${Object.entries(o).reduce(((t,[e,i])=>e<=`${n}${s}`?t.concat(i):t),[]).map((t=>`'${t}'`)).join(",")})`:null}(n,t))))},inputPermanenti:{vars:{minDay:h,minMonth:u,yearsToCompute:c}}}}}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var r=e[s]={exports:{}};return t[s].call(r.exports,r,r.exports,n),r.exports}n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var s={};(()=>{"use strict";n.r(s),n.d(s,{matriceAssortimentale:()=>t});const t=n(798)})();var i=exports;for(var r in s)i[r]=s[r];s.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();