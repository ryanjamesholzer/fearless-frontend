window.addEventListener('DOMContentLoaded', async () => {

    const conferenceUrl = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(conferenceUrl);

        if (!response.ok) {
            console.error("error with url fetch");
        } else {
            const data = await response.json();

            const selectTag = document.getElementById('conference');

            for (let conference of data.conferences) {
                let option = document.createElement('option')
                option.value = conference.id
                option.innerHTML = conference.name
                selectTag.appendChild(option)
                //console.log(conference.name)
            }

            const formTag = document.getElementById('create-presentation-form');
            formTag.addEventListener('submit', async event => {
                event.preventDefault();
                const formData = new FormData(formTag);
                const json = JSON.stringify(Object.fromEntries(formData));
                console.log(json);
                const conferenceData = JSON.parse(json);
                const presentationUrl = `http://localhost:8000/api/conferences/${conferenceData.conference}/presentations/`;
                const fetchConfig = {
                    method: "post",
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const response = await fetch(presentationUrl, fetchConfig);
                if (response.ok) {
                    formTag.reset();
                    const newPresentation = await response.json();
                }
            })
        }
    } catch(e) {
        console.error(e);
    }

});
