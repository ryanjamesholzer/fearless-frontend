import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            maxPresentations: '',
            maxAttendees: '',
            locations: []
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartsChange = this.handleStartsChange.bind(this);
        this.handleEndsChange = this.handleEndsChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaxPresentations = this.handleMaxPresentations.bind(this);
        this.handleMaxAttendees = this.handleMaxAttendees.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.max_attendees = data.maxAttendees;
        data.max_presentations = data.maxPresentations;
        delete data.maxAttendees;
        delete data.maxPresentations;
        delete data.locations;
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            const cleared = {
                name: '',
                starts: '',
                ends: '',
                description: '',
                maxPresentations: '',
                maxAttendees: '',
                location: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }

    handleStartsChange(event) {
        const value = event.target.value;
        this.setState({starts: value});
    }

    handleEndsChange(event) {
        const value = event.target.value;
        this.setState({ends: value});
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({description: value});
    }

    handleMaxPresentations(event) {
        const value = event.target.value;
        this.setState({maxPresentations: value});
    }

    handleMaxAttendees(event) {
        const value = event.target.value;
        this.setState({maxAttendees: value});
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location: value});
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/locations';

        const response = await fetch(url);

        if(response.ok) {
            const data = await response.json();
            console.log(data.locations)
            this.setState({locations: data.locations});
        }
    }

    render() {
        return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" value={this.state.name} className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleStartsChange} placeholder="Starts" required type="date" name="starts" id="starts" value={this.state.starts} className="form-control" />
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleEndsChange} placeholder="Ends" required type="date" name="ends" id="ends" value={this.state.ends} className="form-control" />
                <label htmlFor="ends">Ends</label>
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea onChange={this.handleDescriptionChange} placeholder="Description" name="description" id="description" value={this.state.description} className="form-control" rows="3"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleMaxPresentations} placeholder="Maximum presentations" required type="number" name="max_presentations" value={this.state.maxPresentations} id="max_presentations" className="form-control" />
                <label htmlFor="max_presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleMaxAttendees} placeholder="Maximum attendees" required type="number" name="max_attendees" id="max_attendees" value={this.state.maxAttendees} className="form-control" />
                <label htmlFor="max_attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleLocationChange} required id="location" name="location" value={this.state.location} className="form-select">
                  <option value="">Choose a location</option>
                  {this.state.locations.map(location => {
                    return (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
        )
    };

}

export default ConferenceForm;
