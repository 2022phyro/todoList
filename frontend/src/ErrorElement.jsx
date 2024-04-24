import './ErrorElement.css'

export function ErrorElement() {
    return (
        <div>
            <h1>Oopsies</h1>
            <p>Sorry about that. Something went wrong</p>
            <p>Go back home</p>
        </div>
    )
}

export function Error404Element () {
    return (
        <div>
            <h1>Oopsies 404</h1>
            <p>Page not found. You really need to make a note to stop running into things</p>
            <p>Go back home</p>
        </div>
    )
}