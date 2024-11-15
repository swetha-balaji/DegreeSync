const whatifDropdown = document.getElementById('whatif-dropdown');
const whatifShown = document.getElementById('whatif-shown');
const whatifAngle = document.getElementById('whatif-angle');

whatifDropdown.addEventListener('click', (e)=>{
    if (whatifDropdown.classList.contains('selected')) {
        whatifAngle.classList.add('fa-angle-down');
        whatifAngle.classList.remove('fa-angle-up');
        whatifDropdown.classList.remove('selected');

        // Show dropdown
        whatifShown.classList.toggle('hidden');
    } else {
        whatifAngle.classList.add('fa-angle-up');
        whatifAngle.classList.remove('fa-angle-down');
        whatifDropdown.classList.add('selected');

        // Remove dropdown
        whatifShown.classList.toggle('hidden');
    }
});