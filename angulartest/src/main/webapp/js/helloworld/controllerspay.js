angular.module('helloworldApp').controller(
  'PayCycleCtrl',   // name of the controller
  [
    '$scope',         // DI (Dependency Injection) modules
    function ($scope) { // definition of the controller
      this.books = [
        {
          'title': 'Mastering Web Application Development with AngularJS',
          'price': '35.99'
        },
        {
          'title': 'AngularJS for Dummies',
          'price': '10.95'
        },
        {
          'title': 'Learn AngularJS in 24 Hours',
          'price': '29.00'
        },
        {
          'title': 'Learn AngularJS in 24 Hours, 2nd Edition',
          'price': '9.95'
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
      
      var paycycleTypes = this.paycycleTypes;
      $scope.paycycleTypes = paycycleTypes;

      
      var availableSchedules = this.availableSchedules;
      $scope.availableSchedules = availableSchedules;

      
      var books = this.books;
      $scope.books = books;
      $scope.booksSortedBy = 'title-ascending';
      $scope.booksTitleContains = '';
      var searchAndSortBooks = function () {
        var i;
        var searchTitleRegExp;
        var result = [];
      
        // Searching for titles containing the search string
        if ($scope.booksTitleContains && $scope.booksTitleContains != '') {
          searchTitleRegExp = new RegExp($scope.booksTitleContains, 'i');
          for (i = 0; i < books.length; i++) {
            if (searchTitleRegExp.test(books[i].title)) {
              result.push(books[i]);
            }
          }
        } else {
          result = books;
        }
      
        // Sorting the books
        if ($scope.booksSortedBy.match(/title/)) {
          $scope.books.sort(function (a, b) {
            if (a.title < b.title) {
              return -1;
            } else if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
        } else if ($scope.booksSortedBy.match(/price/)) {
          $scope.books.sort(function (a, b) {
            if (parseFloat(a.price) < parseFloat(b.price)) {
              return -1;
            } else if (parseFloat(a.price) > parseFloat(b.price)) {
              return 1;
            }
            return 0;
          });
        }
      
        if ($scope.booksSortedBy.match(/descending/)) {
          $scope.books.reverse();
        }
      
        $scope.books = result;
      };
      
      searchAndSortBooks();
      $scope.$watch(
        'booksSortedBy + "," + booksTitleContains',
        function (newValue, oldValue) {
          searchAndSortBooks();
        }
      );
    }
  ]
);
