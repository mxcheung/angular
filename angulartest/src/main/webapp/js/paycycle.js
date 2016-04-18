(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.PaycycleCtrl = (function() {
    function PaycycleCtrl($scope, $state, $filter, $stateParams, $timeout, $rootScope, MessageService) {
      this.$scope = $scope;
      this.$state = $state;
      this.$filter = $filter;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.$rootScope = $rootScope;
      this.MessageService = MessageService;
      this.updateVisibleContributionHistory = __bind(this.updateVisibleContributionHistory, this);
      this.selectedPageChanged = __bind(this.selectedPageChanged, this);
      this.contributionFilename = __bind(this.contributionFilename, this);
      this.getContributionHistory = __bind(this.getContributionHistory, this);
      this.isSelected = __bind(this.isSelected, this);
      this.setSelection = __bind(this.setSelection, this);
      this.selectedItem = '';
      this.action = this.$stateParams.action;
      this.contributionHistory = {};
      this.contributionHistoryPageItems = [];
      this.currentPage = 1;
      this.itemsPerPage = 5;
      this.selectedPaycycleType = 'default';
      this.datesOption = 'predefined';
      if (this.$stateParams.action === 'selectFromPrevious') {
        this.getContributionHistory();
      }
      this.availableSchedules = [
        {
          label: 'Weekly',
          code: 'default',
          pc_frequency: 'Weekly',
          pc_number: '37',
          pc_start_date: '3 Nov 2014',
          cc_frequency: 'Weekly',
          cc_number: '38',
          cc_start_date: '10 Nov 2014',
          cc_end_date: '17 Nov 2014'
        }, {
          label: 'Quarterly',
          code: 'bonus',
          pc_frequency: 'Quarterly',
          pc_number: '3',
          pc_start_date: '1 Sep 2014',
          cc_frequency: 'Quarterly',
          cc_number: '4',
          cc_start_date: '1 Dec 2014',
          cc_end_date: '31 Dec 2014'
        }
      ];
      this.paycycleTypes = [
        {
          label: 'My Default Pay Cycle',
          code: 'default'
        }, {
          label: 'Choice Pay Cycle',
          code: 'choice'
        }
      ];
      this.selectSettingsSingle = {
        enableSearch: false,
        displayProp: "label",
        idProp: "code",
        externalIdProp: "",
        selectionLimit: 1,
        showCheckAll: false,
        showUncheckAll: false,
        closeOnSelect: true
      };
    }

    PaycycleCtrl.prototype.setSelection = function(item) {
      return this.selectedItem = item;
    };

    PaycycleCtrl.prototype.isSelected = function(item) {
      return this.selectedItem === item;
    };

    PaycycleCtrl.prototype.getContributionHistory = function() {
      return this.MessageService.getContributionHistory().then(((function(_this) {
        return function(data) {
          _this.contributionHistory = data;
          return _this.updateVisibleContributionHistory();
        };
      })(this)), ((function(_this) {
        return function(error) {
          if (DEBUG) {
            return console.log("PayCycleCtrl :: getContributionHistory :: failed ", error);
          }
        };
      })(this)));
    };

    PaycycleCtrl.prototype.contributionFilename = function() {
      var filename;
      return filename = _.result(_.find(this.contributionHistory.dataFiles, {
        'pvsDataFileId': parseInt(this.selectedContribution, 10)
      }), 'fileName');
    };

    PaycycleCtrl.prototype.selectedPageChanged = function(selectedPage) {
      this.currentPage = selectedPage;
      return this.updateVisibleContributionHistory();
    };

    PaycycleCtrl.prototype.updateVisibleContributionHistory = function() {
      return this.contributionHistoryPageItems = this.$filter('limitPagination')(this.contributionHistory.dataFiles, this.currentPage, this.itemsPerPage);
    };

    return PaycycleCtrl;

  })();

  PaycycleCtrl.$inject = ['$scope', '$state', '$filter', '$stateParams', '$timeout', '$rootScope', 'MessageService'];

  angular.module('superportal.app').controller('PaycycleCtrl', PaycycleCtrl);

}).call(this);
