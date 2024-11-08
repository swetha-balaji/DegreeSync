let compSciDropdown = document.getElementById('comp-sci-dropdown');
let compSciShown = document.getElementById('comp-sci-shown');
let concentrationDropdown = document.getElementById('concentration-dropdown');
let concentrationShown = document.getElementById('concentration-shown');
let angleOne = document.getElementById('angle-1');
let angleTwo = document.getElementById('angle-2');

compSciDropdown.addEventListener('click', (e)=>{
    if (compSciDropdown.classList.contains('selected')) {
        angleOne.classList.add('fa-angle-down');
        angleOne.classList.remove('fa-angle-up');
        compSciDropdown.classList.remove('selected');

        // Show dropdown
        compSciShown.classList.toggle('hidden');
    } else {
        angleOne.classList.add('fa-angle-up');
        angleOne.classList.remove('fa-angle-down');
        compSciDropdown.classList.add('selected');

        // Remove dropdown
        compSciShown.classList.toggle('hidden');
    }
});

concentrationDropdown.addEventListener('click', (e)=>{
    if (concentrationDropdown.classList.contains('selected')) {
        angleTwo.classList.add('fa-angle-down');
        angleTwo.classList.remove('fa-angle-up');
        concentrationDropdown.classList.remove('selected');

        // Show dropdown
        concentrationShown.classList.toggle('hidden');
    } else {
        angleTwo.classList.add('fa-angle-up');
        angleTwo.classList.remove('fa-angle-down');
        concentrationDropdown.classList.add('selected');

        // Remove dropdown
        concentrationShown.classList.toggle('hidden');
    }
});