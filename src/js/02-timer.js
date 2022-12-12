import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btnStartRef = document.querySelector('button[data-start]');
const dateTimeFieldRef = document.querySelector('#datetime-picker');
const daysRef = document.querySelector("span[data-days]")
const hoursRef = document.querySelector("span[data-hours]")
const minutesRef = document.querySelector("span[data-minutes]")
const secondsRef = document.querySelector("span[data-seconds]")


const date = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        // console.log(date);
        if (selectedDates[0] < date) {
            Notiflix.Notify.failure('Please choose a date in the future');
            btnStartRef.disabled = true;
        } else {
            btnStartRef.disabled = false;
        }
        
  },
};

flatpickr(dateTimeFieldRef, options)

const timer = {
    intervalId: null,
    refs: {
        days: document.querySelectorAll(".value")
    },
    start() {
        const selectDate = new Date(dateTimeFieldRef.value)
        // getRefs(timerRef);
        if (selectDate <= Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            return;
        }
        dateTimeFieldRef.disabled = true
        Notiflix.Notify.success('Peaceful and quiet skies very soon. Timer started successfully')

        btnStartRef.disabled = true;
        
        this.intervalId = setInterval(() => {
            const difference = selectDate - Date.now();
            
            if (difference <= 1000) {
                clearInterval(this.intervalId);
                btnStartRef.disabled = false;
                dateTimeFieldRef.disabled = false;
            }

            const data = convertMs(difference);
            console.log(data);
            daysRef.textContent = pad(data.days)
            hoursRef.textContent = pad(data.hours)
            minutesRef.textContent = pad(data.minutes)
            secondsRef.textContent = pad(data.seconds)


        }, 1000);

    },
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
    return String(value).padStart(2, '0');
}

btnStartRef.addEventListener('click', timer.start);