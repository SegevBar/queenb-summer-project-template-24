const { useState } = require("react")

const ContentForm = () => {
    const [name, setName] = useState('')
    const [url, setURL] = useState('')
    const [workout_type, setType] = useState('')
    const [duration, setDuration] = useState('')
    const [difficulty_level, setDifficulty] = useState('Beginner')
    const [thumbnail_url, setTurl] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const content = {name, url, workout_type, duration, difficulty_level, thumbnail_url, description}

        const response = await fetch('/api/content/new', {
            method: 'POST',
            body: JSON.stringify(content),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setName('')
            setURL('')
            setType('')
            setDuration('')
            setDifficulty('Beginner')
            setTurl('')
            setDescription('')
            setError(null)
            console.log('New content added', json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Workout Name:</label>
            <input 
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            />

            <label>URL:</label>
            <input 
            type="url"
            onChange={(e) => setURL(e.target.value)}
            value={url}
            />

            <label>Workout Type:</label>
            <input 
            type="text"
            onChange= {(e) => setType(e.target.value)}
            value={workout_type}
            />


            <label>Duration:</label>
            <input 
            type="text"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            />

            <label>Difficulty Level:</label>
            <div>
            <select value={difficulty_level} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="Beginner">Beginner</option>  
                <option value="Medium">Medium</option>
                <option value="Advanced">Advanced</option>
            </select>
            </div>

            <label>Thumbnail URL:</label>
            <input 
            type="url"
            onChange={(e) => setTurl(e.target.value)}
            value={thumbnail_url}
            />

            <label>Description:</label>
            <input 
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
            
        </form>

    )
}


export default ContentForm