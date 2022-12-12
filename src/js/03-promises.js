import Notiflix from 'notiflix';

const delayRef = document.querySelector("input[name=delay]")
const amountRef = document.querySelector("input[name=amount]")
const stepRef = document.querySelector("input[name=step]")
const formRef = document.querySelector(".form")

formRef.addEventListener('submit', submitForm)

function submitForm(e) {
  e.preventDefault();
  let startPos = 0;
  let startTime = 0;
  if ((Number(delayRef.value) < 0 ) || (Number(stepRef.value) < 0 )) {
      console.log(Number(delayRef.value), Number(stepRef.value))
      Notiflix.Notify.failure(`❌ Please enter correct values`);
      return;
  } else {
    for (let i = 0; i < amountRef.value; i++) {
    startPos += 1;
    
    const promiseDelay = Number(delayRef.value) + startTime;
    startTime += Number(stepRef.value);
    createPromise(startPos, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  }
  
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => { 
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({position, delay});
      } else {
        // Reject
        reject({position, delay});
      }
    }, delay)
  });
  
}
