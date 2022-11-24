window.addEventListener('DOMContentLoaded', async () => {

    const locationUrl = "http://localhost:8000/api/locations/";

    try {
        const response = await fetch(locationUrl);

        if (!response.ok) {
            console.error("error with url fetch");
        } else {
            const data = await response.json();
            //console.log(data);
            const selectTag = document.getElementById('location')

            for (let location of data.locations) {
                let option = document.createElement('option')
                option.value = location.id
                option.innerHTML = location.name
                selectTag.appendChild(option)
                //console.log(location.name)
            }

            const formTag = document.getElementById('create-conference-form');
            formTag.addEventListener('submit', async event => {
                event.preventDefault();
                const formData = new FormData(formTag);
                const json = JSON.stringify(Object.fromEntries(formData));
                //console.log(json);
                const conferenceUrl = 'http://localhost:8000/api/conferences/';
                const fetchConfig = {
                    method: "post",
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const response = await fetch(conferenceUrl, fetchConfig);
                if (response.ok) {
                    formTag.reset();
                    const newConference = await response.json();
                }
            })

        }
    } catch(e) {
        console.error(e);
    }
});
