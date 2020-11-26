
import React, { Component } from 'react';



class App extends Component{

    constructor() {
        super();
        this.state = {
            _id: '',
            title: '',
            description: '',
            tasks: []
        };
        this.addTask = this.addTask.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    addTask(e) {
        e.preventDefault()

        if (this.state._id) {
            fetch(`/api/task/${this.state._id}`,{
                method: "PUT",
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: data.status})
                    this.setState({
                        _id: '',
                        title : '',
                        description : ''
                    })
                    this.getTasks()
                })
        } else {
            fetch('/api/task',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: data.status}),
                this.setState({
                    id: '',
                    title : '',
                    description : ''
                })
                this.getTasks()
            })
            .catch(err => console.error(err))
        }
    }

    editTask(id){
        fetch(`/api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const { title, description, _id } = data
                this.setState({
                    title,
                    description,
                    _id
                })
            })
    }

    deleteTask(id){
        if (confirm('Are you sure you want to delete it?')){
            fetch(`/api/task/${id}`,{
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: data.status})
                this.getTasks()
            })
        }
    }

    componentDidMount() {
        this.getTasks()
    }

    getTasks() {
        fetch('/api/task')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data})
                console.log(this.state.tasks)
            });
    }

    handleInput(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div>
                { /* Navigation */}
                <nav className="blue-grey darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" name="title" value={this.state.title} placeholder="Task Title" onChange={this.handleInput} />
                                            </div>
                                            <div className="input-field col s12">
                                                <textarea name="description"value={this.state.description} placeholder="Task Description" onChange={this.handleInput} className="materialize-textarea">
                                                </textarea> 
                                            </div>
                                        </div>
                                        <button type="submit" className="btn blue-grey darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                           return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn blue-grey darken-4" style={{margin: '4px'}}
                                                        onClick={() => {
                                                            this.editTask(task._id)
                                                        }}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn blue-grey darken-4" style={{margin: '4px'}}
                                                        onClick={() => {
                                                            this.deleteTask(task._id)
                                                        }}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                           )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;