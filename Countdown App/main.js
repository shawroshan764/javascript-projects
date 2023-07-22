let countDownDate = new Date("Aug 01, 2023 00:00:00").getTime();
let x = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = (days < 10) ? "0" + days : days;
    document.getElementById("hours").innerHTML = (hours < 10) ? "0" + hours : hours;;
    document.getElementById("minutes").innerHTML = (minutes < 10) ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = (seconds < 10) ? "0" + seconds : seconds;

}, 1000)
