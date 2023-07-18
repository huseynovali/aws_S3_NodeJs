import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([])
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post('http://localhost:8080/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setImages(per => [...per, res.data.Key]);
      console.log('file upload !');
    } catch (error) {
      console.error('Error !!!:', error);
    }
  };

  return (
    <div>
      <h1>Resim Yükleme Formu</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Yükle</button>
      </form>
      {
        images?.map(item => {
          console.log(item)
          return <video width="320" height="240" controls>
            <source src={"http://localhost:8080/images/" + images} type="video/mp4" />
          </video>
        })
      }
  
      {/* <img src="http://localhost:8080/images/5e8d78a68f2b9866be31a54924448c30" style={{ width: "100px", height: "100px" }} alt="" /> */}
    </div>
  );
};

export default App;
