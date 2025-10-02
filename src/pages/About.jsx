function About() {
    return (
        <div>
            <h2>About This Todo App</h2>
            <p>
                This is a modern todo list application built with React and React Router.
                It allows you to manage your daily tasks efficiently with features like:
            </p>
            <ul>
                <li>Add, edit, and delete todos</li>
                <li>Mark todos as complete</li>
                <li>Search and filter your todos</li>
                <li>Sort todos by different criteria</li>
                <li>Paginated view for large todo lists</li>
            </ul>
            <p>
                The app uses Airtable as a backend to store your todos, ensuring your data
                is persistent and accessible from anywhere.
            </p>
            <p>
                <strong>Author:</strong> Built as part of a React Router learning exercise.
            </p>
        </div>
    );
}

export default About;