define(function(require,exports){var a=require("utils/log"),b=require("configs/dict"),c=require("utils/timeformat"),d="LUNAR:",e="RRULE:",f="TT_SKIP=HOLIDAY",g=new CalendarConverter,h=(require("utils/server"),require("utils/calculate")),i=require("service/prefs"),j=require("dao/holidaydb").db,k=function(a,f,g,h,i){var k,l;if(g&&a){if(-1==g.indexOf(d)&&-1==g.indexOf(e)&&(g=e+g),_isLunarRepeatFlag(g)){var m=RRule.parseString(exports.sliceRepeatFlag(g)),q=c.prefMoment(a).toDate();l=n(q,m);for(var r=0;null!=l&&l<new Date&&(l=n(l,m),!(r++>1e3)););return k=l?c.prefMoment(l).format(b.format.atomTime):null}var s=!1,q=a,t=f;b.repeatFromType.completedTime===h&&t&&(q=t),q=c.prefMoment(q).toDate();var u=q;if(b.repeatFromType.defaultVal==h||null==h){var v=c.prefMoment(i||c.getStartOfToday()).toDate();v>q&&(u=v,s=!0)}var w;p(g)&&j.getHolidayDataSerious(function(a){w=a});var m=RRule.parseString(exports.sliceRepeatFlag(g));m.dtstart=q;var x=new RRule(m);return l=o(x,u,s,w),k=l?c.prefMoment(l).format(b.format.atomTime):null}},l=function(d,e,f,g,h,i){try{var n=k(d,e,f,g,h);n&&i&&(n=moment(n).startOf("day").format(b.format.atomTime));var o=f.match(/TT_WORKDAY=(.*);?/),p=j.getHolidayData();if(n&&o&&o[1]){for(var q=parseInt(o[1]);m(moment(n),p,!0);)if(1==q)n=c.formatToUtc(moment(n).add(1,"day"));else{if(-1!=q)break;n=c.formatToUtc(moment(n).subtract(1,"day"))}-1==q&&n==d&&(n=l(c.formatToUtc(moment(d).date(moment(d).endOf("month").date())),e,f,g,h))}else if(f.match(/TT_SKIP=HOLIDAY,WEEKEND/))for(;m(moment(n),p,!0);)n=k(n,n,f,g);else if(f.match(/TT_SKIP=HOLIDAY/))for(;m(moment(n),p,!1);)n=k(n,n,f,g);return n}catch(r){a.log(r)}},m=function(a,b,c){b=b||[];var d=a.format("YYYY-MM-DD"),e=_.find(b,function(a){return a.date==d});if(e){if(0==e.type)return!0}else if(c&&_.contains([6,0],a.day()))return!0;return!1},n=function(a,b){var c=g.solar2lunar(a);if(null!=b.bymonthday?lunarMonthDay=b.bymonthday:lunarMonthDay=c.lDay,lunarYear=c.lYear,lunarMonth=c.lMonth,g.leapMonth(lunarYear)==lunarMonth){var d=new Date(a);d.setDate(d.getDate()+g.daysOfMonth(lunarYear,lunarMonth));var e=g.solar2lunar(d);if(e.isLeap)return d;lunarYear++}else lunarYear++;(30==lunarMonthDay||-1==lunarMonthDay)&&(lunarMonthDay=g.daysOfMonth(lunarYear,lunarMonth));var f=g.lunar2solar(new Date(lunarYear,lunarMonth-1,lunarMonthDay),g.leapMonth(lunarYear)==lunarMonth);return new Date(f.sYear,f.sMonth-1,f.sDay,a.getHours(),a.getMinutes())},o=function(a,b,c,d){var e=a.after(b,!!c,d);return e?e:null};_isLunarRepeatFlag=function(a){return a&&-1!=a.indexOf(d)?!0:!1};var p=function(a){return a&&(-1!=a.indexOf(f)||-1!=a.indexOf("TT_WORKDAY"))?!0:!1};exports.getNextDueDate=function(a){var b=a.get("repeatFlag"),c=a.get("startDate"),d=a.get("repeatFrom"),e=a.get("isAllDay"),f=a.get("completedTime"),g=l(c,f,b,d,void 0,e);return g},exports.getNextSubtaskRemindTimes=function(a,b,d){var e=a.get("startDate"),f=c.startOfDay(),g=c.prefMoment(),i=f.clone().add(1,"days"),j=c.getDiffEnd(b.startDate,e,f,"days"),k=exports.calNextDueDates(d,a.get("startDate"),a.get("completedTime"),a.get("repeatFlag"),a.get("repeatFrom"),j),l=[];return k.forEach(function(a){var d=c.getDiffEnd(e,a,b.startDate,"days"),f=exports.getCalTime(d,b.isAllDay),a=h.remindTime(f,"TRIGGER:PT0S");if(a){var j=c.prefMoment(a);j>g&&i>j&&l.push(j.format("HH:mm"))}}),l},exports.calNextDueDates=function(a,b,d,e,f,g){var h=[],i=g||c.startOfDay();for(c.prefMoment(b)>=i&&h.push(b);h.length<a;){var k=l(b,d,e,f,g);if(!k)break;if(e.match(/TT_SKIP=HOLIDAY/)||e.match(/TT_WORKDAY/)){var m=j.getMaxDate(),n=moment(k);if(n>m)break}b=k,c.prefMoment(k)>=i&&h.push(k)}return h},exports.getNextRemindTimes=function(a,b){var d=a.get("repeatFlag"),e=a.get("startDate"),f=a.get("repeatFrom"),g=a.get("completedTime"),i=a.get("reminders"),j=a.get("isAllDay"),k=[],l=[],m=c.prefMoment(),n=c.startOfDay();k=exports.calNextDueDates(b,e,g,d,f);var o=n.clone().add(1,"d");return k.forEach(function(a){if(_.isEmpty(i))return!1;for(var b=exports.getCalTime(a,j),d=0;d<i.length;d++){var e=i[d],f=h.remindTime(b,e.trigger);if(f){var g=c.prefMoment(f);g>m&&o>g&&l.push(g.format("HH:mm"))}}}),l},exports.sliceRepeatFlag=function(a){return a.replace(e,"").replace(d,"")},exports.getCalTime=function(a,b){var d=a;if(b){var e=i.getDailyRemindTime(),f=c.prefMoment(d).format("YYYY-MM-DDT")+e;d=c.prefMomentUtc(f)}return d}});