import { useState } from "react"
import styles from '../styles/uploadForm.css';

const UploadForm = () => {
   
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [gender, setGender] = useState('')
    const [condition, setCondition] = useState('')
    const [price, setPrice] = useState('')
    const [size, setSize] = useState('')
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    
    // categories
    const categories = [
        'Jackets & Coats', 
        'Dresses', 
        'Jumpers', 
        'Tops', 
        'Jumpsuits', 
        'ActiveWear', 
        'Accessories', 
        'Bags', 
        'Trousers', 
        'Jeans', 
        'Skirts', 
        'Shoes'
    ];
    
    // genders
    const genders = [
        'Man',
        'Woman'
    ]

    // conditions
    const conditions = [
        'Brand New',
        'Like New',
        'Used - Excellent',
        'Used - Good',
        'Used - Fair'
    ] 

    // sizes:
    const sizes = [
        'XS',
        'S',
        'M',
        'L',
        'XL',
        'XXL',
        'Details in Description'
    ]


    const handleSubmit = async (e) => {
        e.preventDefault()

        const item = {name, category, gender, condition, price, size, image, description}

        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/jason'
            }
        })
        const json = await response.json

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setCategory('')
            setGender('')
            setCondition('')
            setPrice('')
            setSize('')
            setImage(null)
            setDescription('')
            setError(null)
            console.log('new item added')
            //need to add here the 'seccessful add' page
        }
    }



    return(
        <div className="center-wrapper">
            <form className="creat" onSubmit={handleSubmit}>
                <h3 className="headline">Add a New Item</h3>

                {/* Name Field */}
                    <label>Name:</label>
                    <input 
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                {/* Category Field */}
                <label>Category:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select a category</option>
                    {categories.map((categoryOption, index) => (
                        <option key={index} value={categoryOption}>
                            {categoryOption}
                        </option>
                    ))}
                </select>


                {/* Gender Field */}
                <label>Gender:</label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select Gender</option>
                    {genders.map((genderOption, index) => (
                        <option key={index} value={genderOption}>
                            {genderOption}
                        </option>
                    ))}
                </select>  


                {/* Condition Field */}
                <label>Condition:</label>
                <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                >
                    <option value="">Select condition</option>
                    {conditions.map((conditionOption, index) => (
                        <option key={index} value={conditionOption}>
                            {conditionOption}
                        </option>
                    ))}
                </select>


                {/* Price Field */}
                <label>Price:</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>₪ / $</span>
                    <input 
                        type="Number"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        style={{ marginLeft: '5px' }}
                    />
                </div>   

                
                {/* Size Field */}
                <label>Size:</label>
                <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                >
                    <option value="">Select size</option>
                    {sizes.map((sizeOption, index) => (
                        <option key={index} value={sizeOption}>
                            {sizeOption}
                        </option>
                    ))}
                </select>   


                {/* Image Field */}
                <label>Upload Image:</label>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                {/* Preview image if selected */}
                {image && (
                    <div>
                        <h4>Image Preview:</h4>
                        <img src={URL.createObjectURL(image)} alt="Image Preview" style={{ width: '200px', height: 'auto' }} />
                    </div>
                )}   
                

                {/* Description Field */}
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="2"  // Number of rows (height)
                    cols="20" // Number of columns (width)
                    placeholder="describe your item"
                >
                </textarea>
                
                <button>Add My Item</button>
                {error && <div className="error">{error}</div>}

            </form>
        </div>
    )
}

export default UploadForm;