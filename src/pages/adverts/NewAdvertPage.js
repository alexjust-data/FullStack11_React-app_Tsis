import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import Photo from '../../components/shared/Photo';
import Button from '../../components/shared/Button';
import { createAdvert } from './service'; // Asegúrate de que esta función esté definida en tus servicios


function NewAdvertPage() {
  const [advertData, setAdvertData] = useState({
    name: '',
    sale: true,
    price: '',
    tags: [],
    photo: null
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAdvertData({
      ...advertData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };  

  const handleTagsChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'create-option') {
      // Solo se toma la propiedad 'value' del nuevo tag creado.
      setAdvertData({ ...advertData, tags: [...advertData.tags, newValue[newValue.length - 1].value] });
    } else if (actionMeta.action === 'remove-value' || actionMeta.action === 'clear') {
      // Se actualiza con los tags restantes o se limpia el arreglo si es necesario.
      setAdvertData({ ...advertData, tags: newValue.map(option => option.value) });
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAdvertData({ ...advertData, photo: e.target.files[0] });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(formData)
    formData.append('name', advertData.name);
    formData.append('sale', advertData.sale);
    formData.append('price', Number(advertData.price));
    
    // Agregar cada tag al objeto FormData
    advertData.tags.forEach(tag => {
      formData.append('tags', tag); // Asegúrate de que 'tag' es una cadena de texto
    });
  
    // Añade la foto solo si ha sido seleccionada
    if (advertData.photo) {
      formData.append('photo', advertData.photo, advertData.photo.name);
    }
  
    try {
      console.log(createAdvert(formData))
      const response = await createAdvert(formData); // esta función debe manejar correctamente FormData
      const newAdvert = response.data;
      navigate(`/adverts/${newAdvert.id}`);
    } catch (error) {
      console.error('Failed to create the advert', error);
      // Maneja aquí los errores, como mostrar un mensaje al usuario
    }
  };
  


  return (
    <div className="new-advert-page">
        <h1>Create New Advert</h1>
        <form onSubmit={handleSubmit}>
            {/* ... otros campos del formulario ... */}
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"
                    value={advertData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="sale">For Sale:</label>
                <input
                    id="sale"
                    name="sale"
                    type="checkbox"
                    checked={advertData.sale}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    value={advertData.price}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Tags:</label>
                <CreatableSelect
                    isMulti
                    name="tags"
                    placeholder="Type and press enter to add tags"
                    value={advertData.tags.map(tag => ({ value: tag, label: tag }))}
                    onChange={handleTagsChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </div>
            <div>
                <label htmlFor="photo">Photo:</label>
                <input
                    id="photo"
                    name="photo"
                    type="file"
                    onChange={handlePhotoChange}
                />
                {advertData.photo && (
                    <Photo 
                        className="preview-photo" 
                        src={URL.createObjectURL(advertData.photo)} 
                        alt="Preview" 
                    />
                )}
            </div>
            <Button type="submit">Create Advert</Button>
        </form>
    </div>
  );
}

export default NewAdvertPage;

