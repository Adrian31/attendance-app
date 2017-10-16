/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* ========== Model ========== */

var model = {
  students: [
    {
      name: 'Slappy the Frog',
      days: [1,2,3,4,5,6,7,8,9,10,11,12],
      daysMissed: 0
    },
    {
      name: 'Lilly the Lizard',
      days: [1,2,3,4,5,6,7,8,9,10,11,12],
      daysMissed: 0
    },
    {
      name: 'Paulrus the Walrus',
      days: [1,2,3,4,5,6,7,8,9,10,11,12],
      daysMissed: 0
    },
    {
      name: 'Gregory the Goat',
      days: [1,2,3,4,5,6,7,8,9,10,11,12],
      daysMissed: 0
    },
    {
      name: 'Adam the Anaconda',
      days: [1,2,3,4,5,6,7,8,9,10,11,12],
      daysMissed: 0
    },
  ]
};


/* ========== Octopus ========== */
var octopus = {
  init:function() {
    //tell our views to initialize
    studentListView.init();
  },

  getStudents: function(){
    return model.students;
  }
};

var studentListView = {
  init: function() {
    // Store the DOM element for easy access later
    this.studentListElem = document.getElementById('table-data');

    //render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    // get the cats we'll be rendering from the octopus
    var students = octopus.getStudents();

    // loop over the students
    for(var i = 0; i < students.length; i++){
      // this is the cat we're currently looping over
      var student = students[i];

      //make a new cat list item and set its text
      var newTR = document.createElement('tr');
      newTR.setAttribute("id", "student");

      var elem = document.createElement('td');
      elem.textContent = student.name;

      var dayMissed = document.createElement('td');
      dayMissed.textContent = student.daysMissed;
      dayMissed.setAttribute("class", "missed-col");

      this.studentListElem.appendChild(newTR);



      newTR.appendChild(elem);

      //newTR.appendChild()
      for(var x = 0; x < 12; x++){
        var newTD = document.createElement('td');
        newTD.setAttribute("class", "attend-col");
        newTR.appendChild(newTD);

      };
            newTR.appendChild(dayMissed);
    };
    $(".attend-col").append('<input type="checkbox">');


  }
};

//make it go
octopus.init();


// Outside MVO

/* STUDENT APPLICATION */
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());
