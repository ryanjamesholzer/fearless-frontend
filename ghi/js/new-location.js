window.addEventListener('DOMContentLoaded', async () => {

    const stateUrl = "http://localhost:8000/api/states/";

    try {
        const response = await fetch(stateUrl);

        if (!response.ok) {
            console.error("error with url fetch");
        } else {
            const data = await response.json();

            const selectTag = document.getElementById('state')

            for (let state of data.states) {
                let option = document.createElement('option')
                option.value = Object.values(state)
                option.innerHTML = Object.keys(state)
                selectTag.appendChild(option)
                //console.log(state)
            }
            const formTag = document.getElementById('create-location-form');
            formTag.addEventListener('submit', async event => {
                event.preventDefault();
                const formData = new FormData(formTag);
                const json = JSON.stringify(Object.fromEntries(formData));
                console.log(json);
                const locationUrl = 'http://localhost:8000/api/locations/';
                const fetchConfig = {
                    method: "post",
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const response = await fetch(locationUrl, fetchConfig);
                if (response.ok) {
                    formTag.reset();
                    const newLocation = await response.json();
                    //console.log(newLocation);
                }
            });
        }
    } catch(e) {
        console.error(e);
    }

})
