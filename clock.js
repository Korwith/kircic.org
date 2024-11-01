let clock = document.querySelector('.clock');
function updateClock() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds().toString().padStart(2, '0');
    var year = currentTime.getFullYear();

    var dayOfWeek = days[currentTime.getDay()];
    var month = months[currentTime.getMonth()];

    var amORpm = hours >= 12 ? 'PM' : 'AM';
    minutes = minutes < 10 ? '0' + minutes : minutes;

    if (hours > 12) {
        hours = hours - 12;
    }

    var timeString = hours + ':' + minutes + ':' + seconds + ' ' + amORpm;
    clock.innerHTML = dayOfWeek + ', ' + month + ' ' + currentTime.getDate() + ', ' + year + '<br>' + timeString;

    setTimeout(updateClock, 1000);
}
updateClock();
