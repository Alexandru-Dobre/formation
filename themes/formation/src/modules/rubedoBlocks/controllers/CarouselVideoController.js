angular.module("rubedoBlocks").lazy.controller("CarouselVideoController",["$scope","RubedoContentsService",function($scope,RubedoContentsService){
    var me=this;
    me.contents=[];
    var blockConfig=$scope.blockConfig;
    var queryOptions={
        start: blockConfig.resultsSkip ? blockConfig.resultsSkip : 0,
        limit: blockConfig.pageSize ? blockConfig.pageSize : 6,
        'fields[]' : ["text","summary",blockConfig.imageField],
        ismagic: blockConfig.magicQuery ? blockConfig.magicQuery : false
    };
    if (blockConfig.imageField && blockConfig.imageField!="") {
    	queryOptions['requiredFields[]'] = [blockConfig.imageField];
    }
    if(blockConfig.singlePage){
        queryOptions.detailPageId = blockConfig.singlePage;
    }
    var pageId=$scope.rubedo.current.page.id;
    var siteId=$scope.rubedo.current.site.id;
    $scope.isArray = angular.isArray;
    me.getContents=function(){
        RubedoContentsService.getContents(blockConfig.query,pageId,siteId, queryOptions).then(
            function(response){
                if (response.data.success){
                    me.contents=response.data.contents;
                    setTimeout(function(){me.initCarousel();},100);
                }
            }
        );
    };
    me.initCarousel=function(){
        var targetElSelector="#block"+$scope.block.id;
        var owlOptions={
            responsiveBaseWidth:targetElSelector,
            singleItem:true,
            pagination: blockConfig.showPager,
            navigation: blockConfig.showNavigation,
            autoPlay: blockConfig.autoPlay,
            stopOnHover: blockConfig.stopOnHover,
            paginationNumbers:blockConfig.showPagingNumbers,
            navigationText: ['<span class="glyphicon glyphicon-chevron-left"></span>','<span class="glyphicon glyphicon-chevron-right"></span>'],
            lazyLoad:true
        };
        angular.element(targetElSelector).owlCarousel(owlOptions);
        $scope.clearORPlaceholderHeight();
    };
    me.getImageOptions=function(){
        return({
            height:blockConfig.imageHeight,
            width:blockConfig.imageWidth ? blockConfig.imageWidth : angular.element("#block"+$scope.block.id).width(),
            mode:blockConfig.imageResizeMode
        });
    };
    if (blockConfig.query){
        me.getContents();
    }
}]);
angular.module("rubedoBlocks").lazy.controller("HybridExternalController",['$scope','$http','$sce',function($scope,$http,$sce){
    var me=this;
    var config=$scope.content.fields.externalMedia;
    if ((config)&&(config.url)){
        var url = "http://iframe.ly/api/oembed?url="+encodeURIComponent(config.url);
        if ($scope.rubedo.current.site.iframelyKey){
            url=url+"&api_key="+$scope.rubedo.current.site.iframelyKey;
        }
        url=url+"&callback=JSON_CALLBACK";
        $http.jsonp(url).success(function(response){
            me.html=$sce.trustAsHtml(response.html);
        });
    }
}]);