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
      days: [1,2,3,4,5,6,7,8,9,10,11,12]
    },
    {
      name: 'Lilly the Lizard',
      days: [1,2,3,4,5,6,7,8,9,10,11,12]
    },
    {
      name: 'Paulrus the Walrus',
      days: [1,2,3,4,5,6,7,8,9,10,11,12]
    },
    {
      name: 'Gregory the Goat',
      days: [1,2,3,4,5,6,7,8,9,10,11,12]
    },
    {
      name: 'Adam the Anaconda',
      days: [1,2,3,4,5,6,7,8,9,10,11,12]
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
    this.studentListElem = document.getElementById('student2');

    //render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    // get the cats we'll be rendering from the octopus
    var students = octopus.getStudents();

    //empty the cat list
    //this.studentListElem.innerHTML = '';

    // loop over the cats
    for(var i = 0; i < students.length; i++){
      // this is the cat we're currently looping over
      var student = students[i];

      //make a new cat list item and set its text
      var elem = document.createElement('td');
      elem.textContent = student.name;

      this.catListElem.appendChild(elem);
    };
  }
};

//make it go
octopus.init();
