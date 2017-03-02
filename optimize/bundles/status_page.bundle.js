webpackJsonp([1],{0:function(module,exports,__webpack_require__){"use strict";__webpack_require__(1),__webpack_require__(1385),__webpack_require__(1368),__webpack_require__(1369),__webpack_require__(1273),__webpack_require__(1370),__webpack_require__(1).bootstrap()},1385:function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(2)["default"],_lodash=__webpack_require__(3),_uiNotify=(_interopRequireDefault(_lodash),__webpack_require__(347)),_uiNotify2=_interopRequireDefault(_uiNotify),_jquery=__webpack_require__(18);_interopRequireDefault(_jquery);__webpack_require__(760),__webpack_require__(1386),__webpack_require__(1391);var _uiModules=__webpack_require__(24),_uiModules2=_interopRequireDefault(_uiModules),chrome=__webpack_require__(1).setRootTemplate(__webpack_require__(1392)).setRootController("ui",function($http,$scope){var ui=this;ui.loading=!1,ui.refresh=function(){return ui.loading=!0,$http.get(chrome.addBasePath("/api/status")).then(function(resp){ui.fetchError&&(ui.fetchError.clear(),ui.fetchError=null);var data=resp.data;ui.metrics=data.metrics,ui.name=data.name,ui.statuses=data.status.statuses;var overall=data.status.overall;ui.serverState&&ui.serverState===overall.state||(ui.serverState=overall.state,ui.serverStateMessage=overall.title)})["catch"](function(){ui.fetchError||(ui.fetchError=_uiNotify2["default"].error("Failed to request server ui. Perhaps your server is down?"),ui.metrics=ui.statuses=ui.overall=null)}).then(function(){ui.loading=!1})},ui.refresh()});_uiModules2["default"].get("kibana").config(function(appSwitcherEnsureNavigationProvider){appSwitcherEnsureNavigationProvider.forceNavigation(!0)})},1386:function(module,exports,__webpack_require__){"use strict";function calcAvg(metricList,metricNumberType){return metricList.map(function(data){var uglySum=data.values.reduce(function(sumSoFar,vector){return sumSoFar+vector.y},0);return(0,_libFormat_number2["default"])(uglySum/data.values.length,metricNumberType)})}var _interopRequireDefault=__webpack_require__(2)["default"],_lodash=__webpack_require__(3),_moment=(_interopRequireDefault(_lodash),__webpack_require__(235)),_numeral=(_interopRequireDefault(_moment),__webpack_require__(624)),_libTo_title_case=(_interopRequireDefault(_numeral),__webpack_require__(1387)),_libTo_title_case2=_interopRequireDefault(_libTo_title_case),_libFormat_number=__webpack_require__(1388),_libFormat_number2=_interopRequireDefault(_libFormat_number),_libRead_stat_data=__webpack_require__(1389),_libRead_stat_data2=_interopRequireDefault(_libRead_stat_data),_uiModules=__webpack_require__(24),_uiModules2=_interopRequireDefault(_uiModules),_pluginsStatus_pageStatus_page_metricHtml=__webpack_require__(1390),_pluginsStatus_pageStatus_page_metricHtml2=_interopRequireDefault(_pluginsStatus_pageStatus_page_metricHtml);_uiModules2["default"].get("kibana",[]).directive("statusPageMetric",function(){return{restrict:"E",template:_pluginsStatus_pageStatus_page_metricHtml2["default"],scope:{name:"@",data:"="},controllerAs:"metric",controller:function($scope){var self=this;switch(self.name=$scope.name,self.title=(0,_libTo_title_case2["default"])(self.name),self.extendedTitle=self.title,self.numberType="precise",self.seriesNames=[],self.name){case"heapTotal":case"heapUsed":self.numberType="byte";break;case"responseTimeAvg":case"responseTimeMax":self.numberType="ms";break;case"load":self.seriesNames=["1min","5min","15min"]}$scope.$watch("data",function(data){self.rawData=data,self.chartData=(0,_libRead_stat_data2["default"])(self.rawData,self.seriesNames),self.averages=calcAvg(self.chartData,self.numberType);var unit="";self.averages=self.averages.map(function(average){var parts=average.split(" "),value=parts.shift();return unit=parts.join(" "),value}),self.extendedTitle=self.title,unit&&(self.extendedTitle=self.extendedTitle+" ("+unit+")")})}}})},1387:function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(2)["default"],_lodash=__webpack_require__(3),_lodash2=_interopRequireDefault(_lodash);module.exports=function(name){return name.split(/(?=[A-Z])/).map(function(word){return word[0].toUpperCase()+_lodash2["default"].rest(word).join("")}).join(" ")}},1388:function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(2)["default"],_moment=__webpack_require__(235),_moment2=_interopRequireDefault(_moment),_numeral=__webpack_require__(624),_numeral2=_interopRequireDefault(_numeral);module.exports=function(num,which){var format="0.00",postfix="";switch(which){case"time":return(0,_moment2["default"])(num).format("HH:mm:ss");case"byte":format+=" b";break;case"ms":postfix=" ms"}return(0,_numeral2["default"])(num).format(format)+postfix}},1389:function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(2)["default"],_lodash=__webpack_require__(3),_lodash2=_interopRequireDefault(_lodash);module.exports=function(data,seriesNames){var metricList=[];return seriesNames=seriesNames||[],data.forEach(function(vector){vector=_lodash2["default"].flatten(vector);var x=vector.shift();vector.forEach(function(yValue,i){var series=seriesNames[i]||"";metricList[i]||(metricList[i]={key:series,values:[]}),metricList[i].values.unshift({x:x,y:yValue})})}),metricList}},1390:function(module,exports){module.exports='<div class="status_metric_wrapper col-md-4">\n  <div class="content">\n    <h3 class="title">{{metric.extendedTitle}}</h3>\n    <h4 class="average">{{ metric.averages.join(\', \') }}</h4>\n  </div>\n</div>\n'},1391:function(module,exports){},1392:function(module,exports){module.exports='<div class="container overall_state_default overall_state_{{ui.serverState}}">\n  <header>\n    <h1>\n      Status: <span class="overall_state_color">{{ ui.serverStateMessage }}</span>\n      <i class="fa overall_state_color state_icon" />\n      <span class="pull-right">\n        {{ ui.name }}\n      </span>\n    </h1>\n  </header>\n\n  <div class="row metrics_wrapper">\n    <div ng-repeat="(name, data) in ui.metrics">\n      <status-page-metric name="{{name}}" data="data"></status-page-metric>\n    </div>\n  </div>\n\n  <div class="row statuses_wrapper">\n    <h3>Status Breakdown</h3>\n\n    <div ng-if="!ui.statuses && ui.loading" class="statuses_loading">\n      <span class="spinner"></span>\n    </div>\n\n    <h4 ng-if="!ui.statuses && !ui.loading" class="statuses_missing">\n      No status information available\n    </h4>\n\n    <table class="statuses" data-test-subj="statusBreakdown" ng-if="ui.statuses">\n      <tr class="row">\n        <th class="col-xs-4">ID</th>\n        <th class="col-xs-8">Status</th>\n      </tr>\n      <tr\n        ng-repeat="status in ui.statuses"\n        class="status status_state_default status_state_{{status.state}} row">\n\n        <td class="col-xs-4 status_id">{{status.id}}</td>\n        <td class="col-xs-8 status_message">\n          <i class="fa status_state_color status_state_icon" />\n          {{status.message}}\n        </td>\n      </tr>\n    </table>\n  </div>\n</div>\n'}});