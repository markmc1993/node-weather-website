const weather_form = document.querySelector('form')
const search_term = document.querySelector('input')
const message_one = document.querySelector('#error')
const message_two = document.querySelector('#forecast')

weather_form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search_term.value
    message_one.textContent = 'Loading'
    message_two.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message_one.textContent = data.error
            } else {
                message_one.textContent = data.location
                message_two.textContent =  data.forecast_data
            }
        })
    })
})