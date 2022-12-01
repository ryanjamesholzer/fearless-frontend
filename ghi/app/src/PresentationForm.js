import React from 'react';

class PresentationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            presenterName: '',
            presenterEmail: '',
            companyName: '',
            title: '',
            synopsis: '',
            conferences: []
        };
        this.handlePresenterChange = this.handlePresenterChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSynopsisChange = this.handleSynopsisChange.bind(this);
        this.handleConferenceChange = this.handleConferenceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        data.presenter_name = data.presenterName;
        data.presenter_email = data.presenterEmail;
        data.company_name = data.companyName;
        delete data.presenterName;
        delete data.presenterEmail;
        delete data.companyName;
        delete data.conferences;
        console.log(data);

        const presentationUrl = `http://localhost:8000/api/conferences/${data.conference}/presentations/`;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            const newPresentation = await response.json();
            console.log(newPresentation);

            const cleared = {
                presenterName: '',
                presenterEmail: '',
                companyName: '',
                title: '',
                synopsis: '',
                conference: '',
            };
            this.setState(cleared);
        }
    }

    handlePresenterChange(event) {
        const value = event.target.value;
        this.setState({presenterName: value});
    }

    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({presenterEmail: value});
    }

    handleCompanyChange(event) {
        const value = event.target.value;
        this.setState({companyName: value})
    }

    handleTitleChange(event) {
        const value = event.target.value;
        this.setState({title: value});
    }

    handleSynopsisChange(event) {
        const value = event.target.value;
        this.setState({synopsis: value});
    }

    handleConferenceChange(event) {
        const value = event.target.value;
        this.setState({conference: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            this.setState({conferences: data.conferences});
        }
    }


    render() {
        return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={this.handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input onChange={this.handlePresenterChange} placeholder="Presenter Name" required type="text" name="presenter_name" id="presenter_name" value={this.state.presenterName} className="form-control"/>
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleEmailChange} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" value={this.state.presenterEmail} className="form-control"/>
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleCompanyChange} placeholder="Company name" type="text" name="company_name" id="company_name" value={this.state.companyName} className="form-control"/>
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleTitleChange} placeholder="Title" required type="text" name="title" id="title" value={this.state.title} className="form-control"/>
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea onChange={this.handleSynopsisChange} placeholder="Synopsis" name="synopsis" id="synopsis" value={this.state.synopsis} className="form-control" rows="3"></textarea>
              </div>
              <div className="mb-3">
                <select onChange={this.handleConferenceChange} required id="conference" name="conference" value={this.state.conference} className="form-select">
                  <option value="">Choose a conference</option>
                  {this.state.conferences.map(conference => {
                    return (
                        <option key={conference.id} value={conference.id}>
                            {conference.name}
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
    }

}

export default PresentationForm;
