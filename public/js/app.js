console.log('Client side script');

// const fetchFunction = (search) => {
//     fetch(`http://localhost:5000/weather?address=${search}`).then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error);
//         }
//         else {
//             const weatherData = {
//                 forecast: data.forecast,
//                 location: data.location
//             }

//             console.log(weatherData);
//         }
//     })
// });
// }

const weatherForm = document.querySelector('.main-content form');
const search = document.querySelector('.main-content form input');
const msg1 = document.getElementsByTagName('p')[1];
const msg2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // const fetchResult = fetchFunction(search.value);
    // setTimeout(() => console.log(fetchResult), 3000);
    msg1.textContent = "Loading data";
    fetch(`/weather?address=${search.value}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error);
        }
        else {
            const weatherData = {
                forecast: data.forecast,
                location: data.location
            }

            console.log(weatherData);

            msg1.textContent = weatherData.forecast;
            msg2.textContent = weatherData.location;
        }
    })
});
})